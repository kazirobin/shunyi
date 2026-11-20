import mongoose, { Schema, type Model, type Types } from "mongoose";
import { ATTENDANCE_STATUSES, type AttendanceStatus } from "./attendance-types";

export interface IAttendance {
  employee: Types.ObjectId;
  date: string;
  status: AttendanceStatus;
  checkIn: string;
  checkOut: string;
  note: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    employee: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    date: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
    status: { type: String, enum: ATTENDANCE_STATUSES, required: true },
    checkIn: { type: String, default: "", match: /^(\d{2}:\d{2})?$/ },
    checkOut: { type: String, default: "", match: /^(\d{2}:\d{2})?$/ },
    note: { type: String, default: "", trim: true, maxlength: 500 },
  },
  { timestamps: true }
);

AttendanceSchema.index({ employee: 1, date: 1 }, { unique: true });
AttendanceSchema.index({ date: 1 });

const AttendanceModel: Model<IAttendance> =
  (mongoose.models.Attendance as Model<IAttendance> | undefined) ??
  mongoose.model<IAttendance>("Attendance", AttendanceSchema);

export default AttendanceModel;
