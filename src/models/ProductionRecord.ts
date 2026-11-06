import mongoose, { Document, Schema } from "mongoose";

export interface IProductionRecord extends Document {
  productionLine: mongoose.Types.ObjectId;
  date: Date;
  shift: mongoose.Types.ObjectId;
  targetQuantity: number;
  actualQuantity: number;
  defectQuantity: number;
  efficiency: number;
  workersPresent: number;
  totalHoursWorked: number;
  overtimeHours: number;
  notes?: string;
  recordedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProductionRecordSchema = new Schema<IProductionRecord>(
  {
    productionLine: {
      type: Schema.Types.ObjectId,
      ref: "ProductionLine",
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    shift: {
      type: Schema.Types.ObjectId,
      ref: "Shift",
      required: true,
      index: true,
    },
    targetQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    actualQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    defectQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    efficiency: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    workersPresent: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalHoursWorked: {
      type: Number,
      default: 0,
      min: 0,
    },
    overtimeHours: {
      type: Number,
      default: 0,
      min: 0,
    },
    notes: { type: String, trim: true },
    recordedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ProductionRecordSchema.index({ productionLine: 1, date: 1, shift: 1 }, { unique: true });
ProductionRecordSchema.index({ date: 1 });
ProductionRecordSchema.index({ productionLine: 1, date: -1 });
ProductionRecordSchema.index({ recordedBy: 1 });

export default mongoose.models.ProductionRecord || mongoose.model<IProductionRecord>("ProductionRecord", ProductionRecordSchema);