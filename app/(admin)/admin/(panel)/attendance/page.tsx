import type { Metadata } from "next";
import { AttendanceBoard } from "./attendance-board";

export const metadata: Metadata = { title: "Attendance" };

export default function AttendancePage() {
  return <AttendanceBoard />;
}
