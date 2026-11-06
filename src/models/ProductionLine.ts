import mongoose, { Document, Schema } from "mongoose";

export interface IProductionLine extends Document {
  name: string;
  code: string;
  department: mongoose.Types.ObjectId;
  supervisor?: mongoose.Types.ObjectId;
  targetPerDay: number;
  targetPerHour?: number;
  workers: mongoose.Types.ObjectId[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductionLineSchema = new Schema<IProductionLine>(
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
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
      index: true,
    },
    supervisor: {
      type: Schema.Types.ObjectId,
      ref: "Worker",
      index: true,
    },
    targetPerDay: {
      type: Number,
      required: true,
      min: 1,
    },
    targetPerHour: {
      type: Number,
      min: 1,
    },
    workers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Worker",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

ProductionLineSchema.index({ name: 1 }, { unique: true });
ProductionLineSchema.index({ code: 1 }, { unique: true });
ProductionLineSchema.index({ department: 1, isActive: 1 });
ProductionLineSchema.index({ supervisor: 1 });

export default mongoose.models.ProductionLine || mongoose.model<IProductionLine>("ProductionLine", ProductionLineSchema);