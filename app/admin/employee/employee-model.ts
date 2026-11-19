import mongoose, { Schema, type Model } from "mongoose";

export interface IEmployee {
  name: string;
  number: string;
  notes: string;
  photoUrl: string;
  serial: number;
  status: "active" | "inactive" | "pending" | "rejected";
  grade: "a" | "b" | "c" | "d" | "e";
  createdAt?: Date;
  updatedAt?: Date;
}

const EmployeeSchema = new Schema<IEmployee>(
  {
    serial: { type: Number, required: true, default: 0, index: true },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    number: { type: String, required: true, trim: true, maxlength: 40 },
    notes: { type: String, default: "", trim: true, maxlength: 2000 },
    photoUrl: { type: String, default: "", trim: true, maxlength: 2048 },
    status: { type: String, enum: ["active", "inactive", "pending", "rejected"], default: "active", lowercase: true, index: true },
    grade: { type: String, enum: ["a", "b", "c", "d", "e"], default: "a", lowercase: true, index: true },
  },
  { timestamps: true }
);

const EmployeeModel: Model<IEmployee> =
  (mongoose.models.Employee as Model<IEmployee> | undefined) ??
  mongoose.model<IEmployee>("Employee", EmployeeSchema);

export default EmployeeModel;
