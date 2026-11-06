import mongoose, { Document, Schema } from "mongoose";

export type AuditAction =
  | "CREATE"
  | "READ"
  | "UPDATE"
  | "DELETE"
  | "LOGIN"
  | "LOGOUT"
  | "LOGIN_FAILED"
  | "EXPORT"
  | "IMPORT"
  | "APPROVE"
  | "REJECT"
  | "PAYMENT"
  | "STATUS_CHANGE"
  | "PASSWORD_CHANGE"
  | "PERMISSION_CHANGE";

export interface IAuditLog extends Document {
  user?: mongoose.Types.ObjectId;
  userEmail?: string;
  action: AuditAction;
  resource: string;
  resourceId?: string;
  resourceName?: string;
  oldData?: Record<string, unknown>;
  newData?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
  success: boolean;
  errorMessage?: string;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    userEmail: { type: String, index: true },
    action: {
      type: String,
      enum: [
        "CREATE",
        "READ",
        "UPDATE",
        "DELETE",
        "LOGIN",
        "LOGOUT",
        "LOGIN_FAILED",
        "EXPORT",
        "IMPORT",
        "APPROVE",
        "REJECT",
        "PAYMENT",
        "STATUS_CHANGE",
        "PASSWORD_CHANGE",
        "PERMISSION_CHANGE",
      ],
      required: true,
      index: true,
    },
    resource: {
      type: String,
      required: true,
      index: true,
    },
    resourceId: { type: String, index: true },
    resourceName: { type: String },
    oldData: { type: Schema.Types.Mixed },
    newData: { type: Schema.Types.Mixed },
    ipAddress: { type: String },
    userAgent: { type: String },
    metadata: { type: Schema.Types.Mixed },
    success: {
      type: Boolean,
      required: true,
      default: true,
    },
    errorMessage: { type: String },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

AuditLogSchema.index({ user: 1, createdAt: -1 });
AuditLogSchema.index({ action: 1, createdAt: -1 });
AuditLogSchema.index({ resource: 1, resourceId: 1 });
AuditLogSchema.index({ createdAt: -1 });
AuditLogSchema.index({ success: 1 });

AuditLogSchema.set("autoIndex", true);

export default mongoose.models.AuditLog || mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);