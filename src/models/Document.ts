import mongoose, { Document, Schema } from "mongoose";

export type DocumentCategory = "POLICY" | "PROCEDURE" | "FORM" | "REPORT" | "MANUAL" | "OTHER";
export type DocumentAccess = "PUBLIC" | "INTERNAL" | "RESTRICTED" | "CONFIDENTIAL";

export interface IDocument extends Document {
  title: string;
  titleZh?: string;
  category: DocumentCategory;
  description?: string;
  descriptionZh?: string;
  file: {
    public_id: string;
    secure_url: string;
    fileName: string;
    mimeType: string;
    size: number;
  };
  version: string;
  accessLevel: DocumentAccess;
  tags: string[];
  effectiveDate?: Date;
  expiryDate?: Date;
  uploadedBy: mongoose.Types.ObjectId;
  approvedBy?: mongoose.Types.ObjectId;
  approvedAt?: Date;
  downloadCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema = new Schema<IDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    titleZh: { type: String, trim: true },
    category: {
      type: String,
      enum: ["POLICY", "PROCEDURE", "FORM", "REPORT", "MANUAL", "OTHER"],
      required: true,
      index: true,
    },
    description: { type: String, trim: true },
    descriptionZh: { type: String, trim: true },
    file: {
      public_id: { type: String, required: true },
      secure_url: { type: String, required: true },
      fileName: { type: String, required: true },
      mimeType: { type: String, required: true },
      size: { type: Number, required: true },
    },
    version: {
      type: String,
      default: "1.0",
    },
    accessLevel: {
      type: String,
      enum: ["PUBLIC", "INTERNAL", "RESTRICTED", "CONFIDENTIAL"],
      default: "INTERNAL",
      index: true,
    },
    tags: [{ type: String, trim: true }],
    effectiveDate: { type: Date },
    expiryDate: { type: Date },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    approvedAt: { type: Date },
    downloadCount: {
      type: Number,
      default: 0,
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

DocumentSchema.index({ title: "text", description: "text", tags: "text" });
DocumentSchema.index({ category: 1, isActive: 1 });
DocumentSchema.index({ accessLevel: 1 });
DocumentSchema.index({ uploadedBy: 1 });
DocumentSchema.index({ effectiveDate: 1, expiryDate: 1 });

export default mongoose.models.Document || mongoose.model<IDocument>("Document", DocumentSchema);