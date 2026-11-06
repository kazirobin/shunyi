import mongoose, { Document, Schema } from "mongoose";

export type InquiryStatus = "NEW" | "CONTACTED" | "QUOTED" | "NEGOTIATING" | "CONFIRMED" | "CLOSED" | "LOST";
export type InquiryPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface IInquiryAttachment {
  public_id: string;
  secure_url: string;
  originalName: string;
  mimeType: string;
  size: number;
}

export interface IInquiry extends Document {
  inquiryNumber: string;
  buyerName: string;
  companyName: string;
  email: string;
  phone?: string;
  country: string;
  product?: mongoose.Types.ObjectId;
  productType?: string;
  estimatedQuantity: number;
  targetPrice?: number;
  currency: string;
  specifications: string;
  attachments: IInquiryAttachment[];
  status: InquiryStatus;
  priority: InquiryPriority;
  assignedTo?: mongoose.Types.ObjectId;
  source: "WEBSITE" | "EMAIL" | "PHONE" | "EXHIBITION" | "REFERRAL" | "OTHER";
  notes: Array<{
    content: string;
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    isInternal: boolean;
  }>;
  quotedAt?: Date;
  quotedPrice?: number;
  closedAt?: Date;
  closeReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InquiryAttachmentSchema = new Schema<IInquiryAttachment>({
  public_id: { type: String, required: true },
  secure_url: { type: String, required: true },
  originalName: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
});

const InquiryNoteSchema = new Schema({
  content: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  isInternal: { type: Boolean, default: true },
});

const InquirySchema = new Schema<IInquiry>(
  {
    inquiryNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    buyerName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    phone: { type: String, trim: true },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      index: true,
    },
    productType: {
      type: String,
      enum: ["KNITWEAR", "WOVEN", "DENIM", "OUTERWEAR"],
      index: true,
    },
    estimatedQuantity: {
      type: Number,
      required: true,
      min: 1,
    },
    targetPrice: { type: Number, min: 0 },
    currency: {
      type: String,
      default: "USD",
    },
    specifications: {
      type: String,
      required: true,
    },
    attachments: [InquiryAttachmentSchema],
    status: {
      type: String,
      enum: ["NEW", "CONTACTED", "QUOTED", "NEGOTIATING", "CONFIRMED", "CLOSED", "LOST"],
      default: "NEW",
      index: true,
    },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "URGENT"],
      default: "MEDIUM",
      index: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    source: {
      type: String,
      enum: ["WEBSITE", "EMAIL", "PHONE", "EXHIBITION", "REFERRAL", "OTHER"],
      default: "WEBSITE",
    },
    notes: [InquiryNoteSchema],
    quotedAt: { type: Date },
    quotedPrice: { type: Number, min: 0 },
    closedAt: { type: Date },
    closeReason: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

InquirySchema.index({ inquiryNumber: 1 }, { unique: true });
InquirySchema.index({ email: 1, createdAt: -1 });
InquirySchema.index({ status: 1, createdAt: -1 });
InquirySchema.index({ assignedTo: 1, status: 1 });
InquirySchema.index({ buyerName: "text", companyName: "text", email: "text" });

export default mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);