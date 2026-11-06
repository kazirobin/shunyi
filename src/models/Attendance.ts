import mongoose, { Document, Schema } from "mongoose";

export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "HALF_DAY" | "ON_LEAVE" | "HOLIDAY";

export interface IAttendance extends Document {
  worker: mongoose.Types.ObjectId;
  date: Date;
  status: AttendanceStatus;
  checkIn?: Date;
  checkOut?: Date;
  shift: mongoose.Types.ObjectId;
  regularHours: number;
  overtimeHours: number;
  lateMinutes: number;
  earlyLeaveMinutes: number;
  isManualEntry: boolean;
  enteredBy?: mongoose.Types.ObjectId;
  approvedBy?: mongoose.Types.ObjectId;
  approvedAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    worker: {
      type: Schema.Types.ObjectId,
      ref: "Worker",
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["PRESENT", "ABSENT", "LATE", "HALF_DAY", "ON_LEAVE", "HOLIDAY"],
      required: true,
      default: "ABSENT",
      index: true,
    },
    checkIn: { type: Date },
    checkOut: { type: Date },
    shift: {
      type: Schema.Types.ObjectId,
      ref: "Shift",
      required: true,
    },
    regularHours: {
      type: Number,
      default: 0,
      min: 0,
    },
    overtimeHours: {
      type: Number,
      default: 0,
      min: 0,
    },
    lateMinutes: {
      type: Number,
      default: 0,
      min: 0,
    },
    earlyLeaveMinutes: {
      type: Number,
      default: 0,
      min: 0,
    },
    isManualEntry: {
      type: Boolean,
      default: false,
    },
    enteredBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    approvedAt: { type: Date },
    notes: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

AttendanceSchema.index({ worker: 1, date: 1 }, { unique: true });
AttendanceSchema.index({ date: 1, status: 1 });
AttendanceSchema.index({ worker: 1, status: 1 });
AttendanceSchema.index({ createdAt: -1 });

export default mongoose.models.Attendance || mongoose.model<IAttendance>("Attendance", AttendanceSchema);