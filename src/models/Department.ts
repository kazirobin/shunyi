import mongoose, { Document, Schema } from "mongoose";

export interface IDepartment extends Document {
  name: string;
  code: string;
  description?: string;
  manager?: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DepartmentSchema = new Schema<IDepartment>(
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
    description: {
      type: String,
      trim: true,
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: "Worker",
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

DepartmentSchema.index({ name: 1 }, { unique: true });
DepartmentSchema.index({ code: 1 }, { unique: true });
DepartmentSchema.index({ isActive: 1 });

export default mongoose.models.Department || mongoose.model<IDepartment>("Department", DepartmentSchema);