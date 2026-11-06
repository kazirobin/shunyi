import mongoose, { Document, Schema } from "mongoose";

export type LeaveType = "ANNUAL" | "SICK" | "CASUAL" | "MATERNITY" | "PATERNITY" | "EMERGENCY" | "UNPAID" | "OTHER";
export type LeaveStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";

export interface ILeaveRequest extends Document {
  worker: mongoose.Types.ObjectId;
  leaveType: LeaveType;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  reason: string;
  supportingDocument?: {
    public_id: string;
    secure_url: string;
  };
  status: LeaveStatus;
  appliedBy: mongoose.Types.ObjectId;
  approvedBy?: mongoose.Types.ObjectId;
  approvedAt?: Date;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeaveRequestSchema = new Schema<ILeaveRequest>(
  {
    worker: {
      type: Schema.Types.ObjectId,
      ref: "Worker",
      required: true,
      index: true,
    },
    leaveType: {
      type: String,
      enum: ["ANNUAL", "SICK", "CASUAL", "MATERNITY", "PATERNITY", "EMERGENCY", "UNPAID", "OTHER"],
      required: true,
      index: true,
    },
    startDate: {
      type: Date,
      required: true,
      index: true,
    },
    endDate: {
      type: Date,
      required: true,
      index: true,
    },
    totalDays: {
      type: Number,
      required: true,
      min: 0.5,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    supportingDocument: {
      public_id: { type: String },
      secure_url: { type: String },
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED", "CANCELLED"],
      default: "PENDING",
      index: true,
    },
    appliedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    approvedAt: { type: Date },
    rejectionReason: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

LeaveRequestSchema.index({ worker: 1, startDate: 1, endDate: 1 });
LeaveRequestSchema.index({ status: 1, startDate: 1 });
LeaveRequestSchema.index({ appliedBy: 1 });

export default mongoose.models.LeaveRequest || mongoose.model<ILeaveRequest>("LeaveRequest", LeaveRequestSchema);