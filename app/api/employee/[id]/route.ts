// app/api/employee/[id]/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/app/admin/employee/db-connect";
import EmployeeModel from "@/app/admin/employee/employee-model";

const VALID_STATUSES = ["active", "inactive", "pending", "rejected"] as const;
const VALID_GRADES = ["a", "b", "c", "d", "e"] as const;

const isValidId = (id: unknown): id is string =>
  typeof id === "string" && mongoose.Types.ObjectId.isValid(id);

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

// ✅ GET /api/employee/:id  → single
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!isValidId(id))
      return NextResponse.json({ success: false, message: "Invalid employee ID." }, { status: 400 });

    await connectDB();
    const row = await EmployeeModel.findById(id).lean();
    if (!row)
      return NextResponse.json({ success: false, message: "Employee not found." }, { status: 404 });

    return NextResponse.json({
      success: true,
      message: "Employee loaded.",
      data: {
        _id: row._id.toString(),
        serial: Number.isInteger(row.serial) ? row.serial : 0,
        name: row.name,
        number: row.number,
        notes: row.notes ?? "",
        photoUrl: row.photoUrl ?? "",
        status: row.status ?? "active",
        grade: row.grade ?? "a",
      },
    });
  } catch (error) {
    console.error("GET /api/employee/[id] error:", error);
    return NextResponse.json({ success: false, message: "Could not load employee." }, { status: 500 });
  }
}

// ✅ PATCH /api/employee/:id  → update (includes reorder-by-serial)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!isValidId(id))
      return NextResponse.json({ success: false, message: "Invalid employee ID." }, { status: 400 });

    const body = await req.json();
    const data = cleanInput(body);

    const requestedSerial = Number(body.serial);
    if (!Number.isInteger(requestedSerial) || requestedSerial < 1)
      return NextResponse.json(
        { success: false, message: "Serial must be a positive whole number." },
        { status: 400 }
      );

    await connectDB();
    const employee = await EmployeeModel.findById(id).select("_id").lean();
    if (!employee)
      return NextResponse.json({ success: false, message: "Employee not found." }, { status: 404 });

    const ids = await getOrderedIds();
    const oldIndex = ids.indexOf(id);
    if (oldIndex < 0)
      return NextResponse.json(
        { success: false, message: "Employee not found in list." },
        { status: 404 }
      );
    ids.splice(oldIndex, 1);
    ids.splice(Math.min(requestedSerial - 1, ids.length), 0, id);

    await EmployeeModel.updateOne({ _id: id }, { $set: data }, { runValidators: true });
    await saveEmployeeOrder(ids);

    return NextResponse.json({ success: true, message: "Employee updated and serial saved." });
  } catch (error) {
    console.error("PATCH /api/employee/[id] error:", error);
    const message = error instanceof Error ? error.message : "Failed to update employee.";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}

// ✅ DELETE /api/employee/:id  → delete + repair serials
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!isValidId(id))
      return NextResponse.json({ success: false, message: "Invalid employee ID." }, { status: 400 });

    await connectDB();
    const deleted = await EmployeeModel.findByIdAndDelete(id);
    if (!deleted)
      return NextResponse.json({ success: false, message: "Employee not found." }, { status: 404 });

    await saveEmployeeOrder(await getOrderedIds());
    return NextResponse.json({
      success: true,
      message: "Employee deleted. Serial numbers have been reorganized.",
    });
  } catch (error) {
    console.error("DELETE /api/employee/[id] error:", error);
    return NextResponse.json({ success: false, message: "Failed to delete employee." }, { status: 500 });
  }
}