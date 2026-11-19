"use server";

import mongoose from "mongoose";
import { connectDB } from "@/lib/db-connect";
import EmployeeModel from "./employee-model";
import type { EmployeeInput } from "./employee-types";

const isValidId = (id: unknown): id is string =>
  typeof id === "string" && mongoose.Types.ObjectId.isValid(id);

function cleanInput(input: EmployeeInput) {
  if (!input || typeof input !== "object") throw new Error("Invalid employee data.");
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const number = typeof input.number === "string" ? input.number.trim() : "";
  const notes = typeof input.notes === "string" ? input.notes.trim() : "";
  const photoUrl = typeof input.photoUrl === "string" ? input.photoUrl.trim() : "";

  if (!name || !number) throw new Error("Name and phone number are required.");
  if (name.length > 120 || number.length > 40 || notes.length > 2000) {
    throw new Error("Some fields exceed the allowed length.");
  }
  if (photoUrl) {
    let parsed: URL;
    try { parsed = new URL(photoUrl); } catch { throw new Error("Please enter a valid photo URL."); }
    if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("Photo URL must start with http:// or https://.");
  }
  return { name, number, notes, photoUrl };
}

/** Rewrites every serial as a unique, gap-free sequence (1..N). */
async function saveEmployeeOrder(ids: string[]) {
  const current = await EmployeeModel.find().select("_id").lean();
  const currentIds = current.map((item) => item._id.toString());
  if (ids.length !== currentIds.length || new Set(ids).size !== ids.length || !ids.every((id) => currentIds.includes(id))) {
    throw new Error("Employee list changed. Refresh and try again.");
  }
  if (!ids.length) return;

  // Two phases prevent collisions if a unique serial index is added later.
  await EmployeeModel.bulkWrite(ids.map((id, index) => ({
    updateOne: { filter: { _id: id }, update: { $set: { serial: -(index + 1) } } },
  })));
  await EmployeeModel.bulkWrite(ids.map((id, index) => ({
    updateOne: { filter: { _id: id }, update: { $set: { serial: index + 1 } } },
  })));
}

async function getOrderedIds() {
  const rows = await EmployeeModel.find().sort({ serial: 1, createdAt: 1, _id: 1 }).select("_id").lean();
  return rows.map((row) => row._id.toString());
}

export async function getEmployees() {
  try {
    await connectDB();
    const rows = await EmployeeModel.find().sort({ serial: 1, createdAt: 1, _id: 1 }).lean();
    return {
      success: true as const,
      data: rows.map((row) => ({
        _id: row._id.toString(), serial: Number.isInteger(row.serial) ? row.serial : 0,
        name: row.name, number: row.number, notes: row.notes ?? "", photoUrl: row.photoUrl ?? "",
      })),
      message: "Employees loaded successfully.",
    };
  } catch (error) {
    console.error("Get employees error:", error);
    return { success: false as const, data: [], message: "Could not load employees. Check database connection." };
  }
}

export async function addEmployee(input: EmployeeInput) {
  try {
    const data = cleanInput(input);
    await connectDB();
    const existingIds = await getOrderedIds();
    await saveEmployeeOrder(existingIds);
    await EmployeeModel.create({ ...data, serial: existingIds.length + 1 });
    return { success: true, message: "Employee added successfully." };
  } catch (error) {
    console.error("Add employee error:", error);
    return { success: false, message: error instanceof Error ? error.message : "Failed to add employee." };
  }
}

export async function updateEmployee(id: string, input: EmployeeInput) {
  try {
    if (!isValidId(id)) return { success: false, message: "Invalid employee ID." };
    const data = cleanInput(input);
    const requestedSerial = Number(input.serial);
    if (!Number.isInteger(requestedSerial) || requestedSerial < 1) return { success: false, message: "Serial must be a positive whole number." };

    await connectDB();
    const employee = await EmployeeModel.findById(id).select("_id").lean();
    if (!employee) return { success: false, message: "Employee not found." };

    const ids = await getOrderedIds();
    const oldIndex = ids.indexOf(id);
    if (oldIndex < 0) return { success: false, message: "Employee not found in list." };
    ids.splice(oldIndex, 1);
    ids.splice(Math.min(requestedSerial - 1, ids.length), 0, id);

    await EmployeeModel.updateOne({ _id: id }, { $set: data }, { runValidators: true });
    await saveEmployeeOrder(ids);
    return { success: true, message: "Employee updated and serial saved." };
  } catch (error) {
    console.error("Update employee error:", error);
    return { success: false, message: error instanceof Error ? error.message : "Failed to update employee." };
  }
}

export async function reorderEmployees(ids: string[]) {
  try {
    if (!Array.isArray(ids) || !ids.every(isValidId)) return { success: false, message: "Invalid employee order." };
    await connectDB();
    await saveEmployeeOrder(ids);
    return { success: true, message: "Employee order saved successfully." };
  } catch (error) {
    console.error("Reorder employees error:", error);
    return { success: false, message: error instanceof Error ? error.message : "Failed to save employee order." };
  }
}

export async function deleteEmployee(id: string) {
  try {
    if (!isValidId(id)) return { success: false, message: "Invalid employee ID." };
    await connectDB();
    const deleted = await EmployeeModel.findByIdAndDelete(id);
    if (!deleted) return { success: false, message: "Employee not found." };
    await saveEmployeeOrder(await getOrderedIds());
    return { success: true, message: "Employee deleted. Serial numbers have been reorganized." };
  } catch (error) {
    console.error("Delete employee error:", error);
    return { success: false, message: error instanceof Error ? error.message : "Failed to delete employee." };
  }
}

/** Full repair: fixes missing, zero, negative, duplicate and gap serials. */
export async function repairOldEmployeeSerials() {
  try {
    await connectDB();
    const ids = await getOrderedIds();
    await saveEmployeeOrder(ids);
    return { success: true, message: ids.length ? `All ${ids.length} employee serials repaired (1–${ids.length}).` : "There are no employees to repair." };
  } catch (error) {
    console.error("Repair employee serials error:", error);
    return { success: false, message: error instanceof Error ? error.message : "Failed to repair employee serials." };
  }
}
