import mongoose, { Schema, type Model } from "mongoose";

export interface IEmployee {
  name: string;
  number: string;
  notes: string;
  photoUrl: string;
  serial: number;
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
  },
  { timestamps: true }
);

const EmployeeModel: Model<IEmployee> =
  (mongoose.models.Employee as Model<IEmployee> | undefined) ??
  mongoose.model<IEmployee>("Employee", EmployeeSchema);

export default EmployeeModel;
