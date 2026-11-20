"use server";

import mongoose from "mongoose";
import { connectDB } from "@/lib/db-connect";
import { isLoggedIn } from "@/lib/auth";
import { getAdminT } from "@/lib/admin-locale";
import EmployeeModel from "../employee/employee-model";
import AttendanceModel from "./attendance-model";
import {
  ATTENDANCE_STATUSES,
  type AttendanceEmployee,
  type AttendanceInput,
  type AttendanceRecord,
} from "./attendance-types";

// Records saved before status existed have no field; the employee page treats those as active.
const ACTIVE = { status: { $in: ["active" as const, null] } };
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const MONTH = /^\d{4}-\d{2}$/;
const TIME = /^(\d{2}:\d{2})?$/;

type Fail = { success: false; message: string };
const fail = (message: string): Fail => ({ success: false, message });

async function guard(): Promise<Fail | null> {
  if (!(await isLoggedIn())) return fail((await getAdminT()).att.sessionExpired);
  await connectDB();
  return null;
}

async function activeEmployees(): Promise<AttendanceEmployee[]> {
  const rows = await EmployeeModel.find(ACTIVE).sort({ serial: 1, createdAt: 1, _id: 1 }).lean();
  return rows.map((r) => ({
    _id: r._id.toString(),
    serial: Number.isInteger(r.serial) ? r.serial : 0,
    name: r.name,
    number: r.number,
    photoUrl: r.photoUrl ?? "",
    grade: r.grade ?? "a",
  }));
}

function toRecord(r: { employee: mongoose.Types.ObjectId; date: string; status: AttendanceRecord["status"]; checkIn?: string; checkOut?: string; note?: string }): AttendanceRecord {
  return {
    employeeId: r.employee.toString(),
    date: r.date,
    status: r.status,
    checkIn: r.checkIn ?? "",
    checkOut: r.checkOut ?? "",
    note: r.note ?? "",
  };
}

export async function getAttendanceDay(date: string) {
  const t = (await getAdminT()).att;
  try {
    if (!DATE.test(date)) return { ...fail(t.invalidDate), employees: [], records: [] };
    const denied = await guard();
    if (denied) return { ...denied, employees: [], records: [] };
    const [employees, rows] = await Promise.all([activeEmployees(), AttendanceModel.find({ date }).lean()]);
    return { success: true as const, message: "", employees, records: rows.map(toRecord) };
  } catch (error) {
    console.error("Get attendance day error:", error);
    return { ...fail(t.loadFailed), employees: [], records: [] };
  }
}

export async function getAttendanceMonth(month: string) {
  const t = (await getAdminT()).att;
  try {
    if (!MONTH.test(month)) return { ...fail(t.invalidMonth), employees: [], records: [] };
    const denied = await guard();
    if (denied) return { ...denied, employees: [], records: [] };
    const [employees, rows] = await Promise.all([
      activeEmployees(),
      AttendanceModel.find({ date: { $gte: `${month}-01`, $lte: `${month}-31` } }).lean(),
    ]);
    return { success: true as const, message: "", employees, records: rows.map(toRecord) };
  } catch (error) {
    console.error("Get attendance month error:", error);
    return { ...fail(t.loadFailed), employees: [], records: [] };
  }
}

export async function setAttendance(employeeId: string, date: string, input: AttendanceInput) {
  const t = (await getAdminT()).att;
  try {
    if (!mongoose.Types.ObjectId.isValid(employeeId) || !DATE.test(date)) return fail(t.invalidEmployeeOrDate);
    if (!ATTENDANCE_STATUSES.includes(input?.status)) return fail(t.invalidStatus);
    const checkIn = input.checkIn ?? "";
    const checkOut = input.checkOut ?? "";
    const note = (input.note ?? "").trim();
    if (!TIME.test(checkIn) || !TIME.test(checkOut)) return fail(t.timeFormat);
    if (note.length > 500) return fail(t.noteTooLong);
    const denied = await guard();
    if (denied) return denied;

    const exists = await EmployeeModel.exists({ _id: employeeId });
    if (!exists) return fail(t.employeeGone);

    await AttendanceModel.updateOne(
      { employee: employeeId, date },
      { $set: { status: input.status, checkIn, checkOut, note } },
      { upsert: true, runValidators: true }
    );
    return { success: true as const, message: "" };
  } catch (error) {
    console.error("Set attendance error:", error);
    return fail(t.saveFailed);
  }
}

export async function clearAttendance(employeeId: string, date: string) {
  const t = (await getAdminT()).att;
  try {
    if (!mongoose.Types.ObjectId.isValid(employeeId) || !DATE.test(date)) return fail(t.invalidEmployeeOrDate);
    const denied = await guard();
    if (denied) return denied;
    await AttendanceModel.deleteOne({ employee: employeeId, date });
    return { success: true as const, message: "" };
  } catch (error) {
    console.error("Clear attendance error:", error);
    return fail(t.clearFailed);
  }
}

export async function markAllPresent(date: string) {
  const t = (await getAdminT()).att;
  try {
    if (!DATE.test(date)) return fail(t.invalidDate);
    const denied = await guard();
    if (denied) return denied;
    const employees = await activeEmployees();
    const marked = new Set(
      (await AttendanceModel.find({ date }).select("employee").lean()).map((r) => r.employee.toString())
    );
    const todo = employees.filter((e) => !marked.has(e._id));
    if (todo.length) {
      await AttendanceModel.bulkWrite(
        todo.map((e) => ({
          updateOne: {
            filter: { employee: new mongoose.Types.ObjectId(e._id), date },
            update: { $setOnInsert: { status: "present", checkIn: "", checkOut: "", note: "" } },
            upsert: true,
          },
        }))
      );
    }
    return { success: true as const, message: t.markedPresent(todo.length) };
  } catch (error) {
    console.error("Mark all present error:", error);
    return fail(t.markFailed);
  }
}

/** Most recent day with any attendance recorded, with per-status counts. */
export async function getLatestAttendanceSummary() {
  try {
    const denied = await guard();
    if (denied) return null;
    const latest = await AttendanceModel.findOne().sort({ date: -1 }).select("date").lean();
    if (!latest) return null;
    const [counts, active] = await Promise.all([
      AttendanceModel.aggregate<{ _id: string; n: number }>([
        { $match: { date: latest.date } },
        { $group: { _id: "$status", n: { $sum: 1 } } },
      ]),
      EmployeeModel.countDocuments(ACTIVE),
    ]);
    const by = Object.fromEntries(ATTENDANCE_STATUSES.map((s) => [s, counts.find((c) => c._id === s)?.n ?? 0])) as Record<
      (typeof ATTENDANCE_STATUSES)[number],
      number
    >;
    return { date: latest.date, active, ...by };
  } catch (error) {
    console.error("Attendance summary error:", error);
    return null;
  }
}
