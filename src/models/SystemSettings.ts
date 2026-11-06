import mongoose, { Document, Schema } from "mongoose";

export interface ISystemSettings extends Document {
  key: string;
  value: unknown;
  category: string;
  description?: string;
  isPublic: boolean;
  dataType: "STRING" | "NUMBER" | "BOOLEAN" | "OBJECT" | "ARRAY";
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    enum?: string[];
  };
  updatedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const SystemSettingsSchema = new Schema<ISystemSettings>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    value: {
      type: Schema.Types.Mixed,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    description: { type: String, trim: true },
    isPublic: {
      type: Boolean,
      default: false,
    },
    dataType: {
      type: String,
      enum: ["STRING", "NUMBER", "BOOLEAN", "OBJECT", "ARRAY"],
      default: "STRING",
    },
    validation: {
      min: { type: Number },
      max: { type: Number },
      pattern: { type: String },
      enum: [{ type: String }],
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

SystemSettingsSchema.index({ key: 1 }, { unique: true });
SystemSettingsSchema.index({ category: 1 });
SystemSettingsSchema.index({ isPublic: 1 });

export const defaultSettings = [
  {
    key: "company.name",
    value: "Shunyi Garments",
    category: "company",
    description: "Company name",
    isPublic: true,
    dataType: "STRING",
  },
  {
    key: "company.address.corporate",
    value: "",
    category: "company",
    description: "Corporate office address",
    isPublic: true,
    dataType: "STRING",
  },
  {
    key: "company.address.factory",
    value: "",
    category: "company",
    description: "Factory address",
    isPublic: true,
    dataType: "STRING",
  },
  {
    key: "company.phone",
    value: "",
    category: "company",
    description: "Company phone number",
    isPublic: true,
    dataType: "STRING",
  },
  {
    key: "company.email",
    value: "",
    category: "company",
    description: "Company email",
    isPublic: true,
    dataType: "STRING",
  },
  {
    key: "company.whatsapp",
    value: "",
    category: "company",
    description: "WhatsApp contact",
    isPublic: true,
    dataType: "STRING",
  },
  {
    key: "company.wechat",
    value: "",
    category: "company",
    description: "WeChat contact",
    isPublic: true,
    dataType: "STRING",
  },
  {
    key: "payroll.overtimeRateMultiplier",
    value: 1.5,
    category: "payroll",
    description: "Overtime rate multiplier",
    isPublic: false,
    dataType: "NUMBER",
    validation: { min: 1, max: 3 },
  },
  {
    key: "payroll.attendanceBonusAmount",
    value: 500,
    category: "payroll",
    description: "Monthly attendance bonus amount",
    isPublic: false,
    dataType: "NUMBER",
    validation: { min: 0 },
  },
  {
    key: "payroll.festivalBonusMonths",
    value: 2,
    category: "payroll",
    description: "Festival bonus equivalent months",
    isPublic: false,
    dataType: "NUMBER",
    validation: { min: 0, max: 12 },
  },
  {
    key: "attendance.lateThresholdMinutes",
    value: 15,
    category: "attendance",
    description: "Late threshold in minutes",
    isPublic: false,
    dataType: "NUMBER",
    validation: { min: 0, max: 120 },
  },
  {
    key: "attendance.halfDayThresholdHours",
    value: 4,
    category: "attendance",
    description: "Half day threshold in hours",
    isPublic: false,
    dataType: "NUMBER",
    validation: { min: 1, max: 8 },
  },
  {
    key: "worker.maxOvertimeHoursPerMonth",
    value: 60,
    category: "worker",
    description: "Maximum overtime hours per month",
    isPublic: false,
    dataType: "NUMBER",
    validation: { min: 0, max: 200 },
  },
  {
    key: "rfq.autoAssignEnabled",
    value: false,
    category: "rfq",
    description: "Auto-assign inquiries to buyer managers",
    isPublic: false,
    dataType: "BOOLEAN",
  },
  {
    key: "system.maintenanceMode",
    value: false,
    category: "system",
    description: "Enable maintenance mode",
    isPublic: false,
    dataType: "BOOLEAN",
  },
];

export default mongoose.models.SystemSettings || mongoose.model<ISystemSettings>("SystemSettings", SystemSettingsSchema);