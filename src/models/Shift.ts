import mongoose, { Document, Schema } from "mongoose";

export interface IShift extends Document {
  name: string;
  code: string;
  startTime: string;
  endTime: string;
  breakDuration: number;
  workingHours: number;
  overtimeThreshold: number;
  isNightShift: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ShiftSchema = new Schema<IShift>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    startTime: {
      type: String,
      required: true,
      match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
    },
    endTime: {
      type: String,
      required: true,
      match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
    },
    breakDuration: {
      type: Number,
      default: 60,
      min: 0,
    },
    workingHours: {
      type: Number,
      required: true,
      min: 1,
      max: 16,
    },
    overtimeThreshold: {
      type: Number,
      default: 8,
      min: 0,
    },
    isNightShift: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

ShiftSchema.index({ name: 1 }, { unique: true });
ShiftSchema.index({ code: 1 }, { unique: true });
ShiftSchema.index({ isActive: 1 });

export default mongoose.models.Shift || mongoose.model<IShift>("Shift", ShiftSchema);