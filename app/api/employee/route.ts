// app/api/employee/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/app/admin/employee/db-connect";
import EmployeeModel from "@/app/admin/employee/employee-model";

const VALID_STATUSES = ["active", "inactive", "pending", "rejected"] as const;
const VALID_GRADES = ["a", "b", "c", "d", "e"] as const;

type CleanedInput = {
  name: string;
  number: string;
  notes: string;
  photoUrl: string;
  status: (typeof VALID_STATUSES)[number];
  grade: (typeof VALID_GRADES)[number];
};

function cleanInput(body: any): CleanedInput {
  if (!body || typeof body !== "object") throw new Error("Invalid employee data.");
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const number = typeof body.number === "string" ? body.number.trim() : "";
  const notes = typeof body.notes === "string" ? body.notes.trim() : "";
  const photoUrl = typeof body.photoUrl === "string" ? body.photoUrl.trim() : "";
  const status = body.status ?? "active";
  const grade = body.grade ?? "a";

  if (!VALID_STATUSES.includes(status)) throw new Error("Invalid employee status.");
  if (!VALID_GRADES.includes(grade)) throw new Error("Invalid employee grade.");
  if (!name || !number) throw new Error("Name and phone number are required.");
  if (name.length > 120 || number.length > 40 || notes.length > 2000)
    throw new Error("Some fields exceed the allowed length.");
  if (photoUrl) {
    let parsed: URL;
    try { parsed = new URL(photoUrl); } catch { throw new Error("Please enter a valid photo URL."); }
    if (!["http:", "https:"].includes(parsed.protocol))
      throw new Error("Photo URL must start with http:// or https://.");
  }
  return { name, number, notes, photoUrl, status, grade };
}

async function saveEmployeeOrder(ids: string[]) {
  const current = await EmployeeModel.find().select("_id").lean();
  const currentIds = current.map((i) => i._id.toString());
  if (
    ids.length !== currentIds.length ||
    new Set(ids).size !== ids.length ||
    !ids.every((id) => currentIds.includes(id))
  ) {
    throw new Error("Employee list changed. Refresh and try again.");
  }
  if (!ids.length) return;
  await EmployeeModel.bulkWrite(
    ids.map((id, i) => ({
      updateOne: { filter: { _id: id }, update: { $set: { serial: -(i + 1) } } },
    }))
  );
  await EmployeeModel.bulkWrite(
    ids.map((id, i) => ({
      updateOne: { filter: { _id: id }, update: { $set: { serial: i + 1 } } },
    }))
  );
}

async function getOrderedIds() {
  const rows = await EmployeeModel.find()
    .sort({ serial: 1, createdAt: 1, _id: 1 })
    .select("_id")
    .lean();
  return rows.map((r) => r._id.toString());
}

// ✅ GET /api/employee  → list all
export async function GET() {
  try {
    await connectDB();
    const rows = await EmployeeModel.find()
      .sort({ serial: 1, createdAt: 1, _id: 1 })
      .lean();
    return NextResponse.json({
      success: true,
      message: "Employees loaded successfully.",
      data: rows.map((r) => ({
        _id: r._id.toString(),
        serial: Number.isInteger(r.serial) ? r.serial : 0,
        name: r.name,
        number: r.number,
        notes: r.notes ?? "",
        photoUrl: r.photoUrl ?? "",
        status: r.status ?? "active",
        grade: r.grade ?? "a",
      })),
    });
  } catch (error) {
    console.error("GET /api/employee error:", error);
    return NextResponse.json(
      { success: false, message: "Could not load employees.", data: [] },
      { status: 500 }
    );
  }
}

// ✅ POST /api/employee  → create
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = cleanInput(body);
    await connectDB();
    const existingIds = await getOrderedIds();
    await saveEmployeeOrder(existingIds);
    const created = await EmployeeModel.create({ ...data, serial: existingIds.length + 1 });
    return NextResponse.json(
      {
        success: true,
        message: "Employee added successfully.",
        data: { _id: created._id.toString(), serial: created.serial },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/employee error:", error);
    const message = error instanceof Error ? error.message : "Failed to add employee.";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}