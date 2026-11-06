import mongoose, { Document, Schema } from "mongoose";

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "HR_MANAGER" | "ACCOUNTS" | "LINE_SUPERVISOR" | "BUYER_MANAGER";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  image?: string;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "ADMIN", "HR_MANAGER", "ACCOUNTS", "LINE_SUPERVISOR", "BUYER_MANAGER"],
      required: true,
      default: "HR_MANAGER",
    },
    image: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLoginAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1 });
UserSchema.index({ isActive: 1 });

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);