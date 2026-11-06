import mongoose, { Document, Schema } from "mongoose";

export type PayrollStatus = "DRAFT" | "PROCESSED" | "PAID" | "CANCELLED";

export interface IPayrollComponent {
  name: string;
  amount: number;
  type: "EARNING" | "DEDUCTION";
  isTaxable?: boolean;
}

export interface IPayroll extends Document {
  worker: mongoose.Types.ObjectId;
  payrollPeriod: {
    startDate: Date;
    endDate: Date;
    month: number;
    year: number;
  };
  basicSalary: number;
  workedDays: number;
  presentDays: number;
  absentDays: number;
  leaveDays: number;
  overtimeHours: number;
  overtimeRate: number;
  components: IPayrollComponent[];
  grossEarnings: number;
  totalDeductions: number;
  netPayable: number;
  status: PayrollStatus;
  paymentDate?: Date;
  paymentMethod?: string;
  transactionId?: string;
  payslipUrl?: {
    public_id: string;
    secure_url: string;
  };
  processedBy?: mongoose.Types.ObjectId;
  processedAt?: Date;
  paidBy?: mongoose.Types.ObjectId;
  paidAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PayrollComponentSchema = new Schema<IPayrollComponent>({
  name: { type: String, required: true, trim: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["EARNING", "DEDUCTION"], required: true },
  isTaxable: { type: Boolean, default: false },
});

const PayrollSchema = new Schema<IPayroll>(
  {
    worker: {
      type: Schema.Types.ObjectId,
      ref: "Worker",
      required: true,
      index: true,
    },
    payrollPeriod: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      month: { type: Number, required: true, min: 1, max: 12 },
      year: { type: Number, required: true },
    },
    basicSalary: {
      type: Number,
      required: true,
      min: 0,
    },
    workedDays: {
      type: Number,
      default: 0,
      min: 0,
    },
    presentDays: {
      type: Number,
      default: 0,
      min: 0,
    },
    absentDays: {
      type: Number,
      default: 0,
      min: 0,
    },
    leaveDays: {
      type: Number,
      default: 0,
      min: 0,
    },
    overtimeHours: {
      type: Number,
      default: 0,
      min: 0,
    },
    overtimeRate: {
      type: Number,
      default: 0,
      min: 0,
    },
    components: [PayrollComponentSchema],
    grossEarnings: {
      type: Number,
      default: 0,
    },
    totalDeductions: {
      type: Number,
      default: 0,
    },
    netPayable: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["DRAFT", "PROCESSED", "PAID", "CANCELLED"],
      default: "DRAFT",
      index: true,
    },
    paymentDate: { type: Date },
    paymentMethod: { type: String },
    transactionId: { type: String },
    payslipUrl: {
      public_id: { type: String },
      secure_url: { type: String },
    },
    processedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    processedAt: { type: Date },
    paidBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    paidAt: { type: Date },
    notes: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

PayrollSchema.index({ worker: 1, "payrollPeriod.month": 1, "payrollPeriod.year": 1 }, { unique: true });
PayrollSchema.index({ "payrollPeriod.month": 1, "payrollPeriod.year": 1, status: 1 });
PayrollSchema.index({ status: 1 });
PayrollSchema.index({ processedAt: -1 });

export default mongoose.models.Payroll || mongoose.model<IPayroll>("Payroll", PayrollSchema);