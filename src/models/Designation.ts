import mongoose, { Document, Schema } from "mongoose";

export interface IDesignation extends Document {
  name: string;
  code: string;
  department: mongoose.Types.ObjectId;
  grade: number;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DesignationSchema = new Schema<IDesignation>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
      index: true,
    },
    grade: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    description: {
      type: String,
      trim: true,
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

DesignationSchema.index({ department: 1, code: 1 }, { unique: true });
DesignationSchema.index({ department: 1, isActive: 1 });
DesignationSchema.index({ name: 1 });

export default mongoose.models.Designation || mongoose.model<IDesignation>("Designation", DesignationSchema);