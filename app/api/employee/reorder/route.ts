// app/api/employee/reorder/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/app/admin/employee/db-connect";
import EmployeeModel from "@/app/admin/employee/employee-model";

const isValidId = (id: unknown): id is string =>
  typeof id === "string" && mongoose.Types.ObjectId.isValid(id);

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

// ✅ POST /api/employee/reorder  → body: { ids: string[] }
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ids = body?.ids;
    if (!Array.isArray(ids) || !ids.every(isValidId))
      return NextResponse.json({ success: false, message: "Invalid employee order." }, { status: 400 });

    await connectDB();
    await saveEmployeeOrder(ids);
    return NextResponse.json({ success: true, message: "Employee order saved successfully." });
  } catch (error) {
    console.error("POST /api/employee/reorder error:", error);
    return NextResponse.json({ success: false, message: "Failed to save employee order." }, { status: 400 });
  }
}