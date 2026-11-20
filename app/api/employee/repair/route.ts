// app/api/employee/repair/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/app/(admin)/admin/(panel)/employee/db-connect";
import EmployeeModel from "@/app/(admin)/admin/(panel)/employee/employee-model";

async function getOrderedIds() {
  const rows = await EmployeeModel.find()
    .sort({ serial: 1, createdAt: 1, _id: 1 })
    .select("_id")
    .lean();
  return rows.map((r) => r._id.toString());
}

async function saveEmployeeOrder(ids: string[]) {
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

// ✅ POST /api/employee/repair
export async function POST() {
  try {
    await connectDB();
    const ids = await getOrderedIds();
    await saveEmployeeOrder(ids);
    return NextResponse.json({
      success: true,
      message: ids.length
        ? `All ${ids.length} employee serials repaired (1–${ids.length}).`
        : "There are no employees to repair.",
    });
  } catch (error) {
    console.error("POST /api/employee/repair error:", error);
    return NextResponse.json({ success: false, message: "Failed to repair serials." }, { status: 500 });
  }
}