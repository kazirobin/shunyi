import mongoose, { Document, Schema } from "mongoose";

export type CertificateCategory = "COMPLIANCE" | "ENVIRONMENTAL" | "SOCIAL" | "QUALITY" | "SAFETY" | "OTHER";

export interface ICertificate extends Document {
  name: string;
  nameZh: string;
  category: CertificateCategory;
  issuingBody: string;
  certificateNumber: string;
  issueDate: Date;
  expiryDate?: Date;
  scope: string;
  scopeZh: string;
  image?: {
    public_id: string;
    secure_url: string;
  };
  documentUrl?: {
    public_id: string;
    secure_url: string;
  };
  isActive: boolean;
  isPublic: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const CertificateSchema = new Schema<ICertificate>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    nameZh: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["COMPLIANCE", "ENVIRONMENTAL", "SOCIAL", "QUALITY", "SAFETY", "OTHER"],
      required: true,
      index: true,
    },
    issuingBody: {
      type: String,
      required: true,
      trim: true,
    },
    certificateNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    issueDate: {
      type: Date,
      required: true,
    },
    expiryDate: { type: Date },
    scope: {
      type: String,
      required: true,
    },
    scopeZh: {
      type: String,
      required: true,
    },
    image: {
      public_id: { type: String },
      secure_url: { type: String },
    },
    documentUrl: {
      public_id: { type: String },
      secure_url: { type: String },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

CertificateSchema.index({ name: 1 }, { unique: true });
CertificateSchema.index({ certificateNumber: 1 }, { unique: true });
CertificateSchema.index({ category: 1, isActive: 1 });
CertificateSchema.index({ isPublic: 1, isActive: 1, displayOrder: 1 });
CertificateSchema.index({ expiryDate: 1 });

export default mongoose.models.Certificate || mongoose.model<ICertificate>("Certificate", CertificateSchema);