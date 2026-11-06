import mongoose, { Document, Schema } from "mongoose";

export type Gender = "MALE" | "FEMALE" | "OTHER";
export type EmploymentStatus = "ACTIVE" | "INACTIVE" | "ON_LEAVE" | "TERMINATED" | "RESIGNED";
export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export interface IWorkerDocument extends Document {
  name: string;
  url: string;
  type: string;
  uploadedAt: Date;
}

export interface IBankAccount {
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  branchName?: string;
  routingNumber?: string;
}

export interface IWorker extends Document {
  workerId: string;
  fullName: string;
  photo?: {
    public_id: string;
    secure_url: string;
  };
  gender: Gender;
  dateOfBirth: Date;
  phone: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  bloodGroup: BloodGroup;
  nationalId: {
    number: string;
    type: "NID" | "PASSPORT" | "BIRTH_CERTIFICATE";
    expiryDate?: Date;
  };
  address: {
    present: string;
    permanent: string;
  };
  department: mongoose.Types.ObjectId;
  designation: mongoose.Types.ObjectId;
  shift: mongoose.Types.ObjectId;
  joiningDate: Date;
  basicSalary: number;
  bankAccount: IBankAccount;
  employmentStatus: EmploymentStatus;
  terminationDate?: Date;
  terminationReason?: string;
  documents: IWorkerDocument[];
  createdAt: Date;
  updatedAt: Date;
}

const WorkerDocumentSchema = new Schema<IWorkerDocument>({
  name: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const BankAccountSchema = new Schema<IBankAccount>({
  bankName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  accountHolderName: { type: String, required: true },
  branchName: { type: String },
  routingNumber: { type: String },
});

const WorkerSchema = new Schema<IWorker>(
  {
    workerId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    photo: {
      public_id: { type: String },
      secure_url: { type: String },
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    emergencyContact: {
      name: { type: String, required: true },
      relationship: { type: String, required: true },
      phone: { type: String, required: true },
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
    nationalId: {
      number: { type: String, required: true, unique: true, index: true },
      type: { type: String, enum: ["NID", "PASSPORT", "BIRTH_CERTIFICATE"], required: true },
      expiryDate: { type: Date },
    },
    address: {
      present: { type: String, required: true },
      permanent: { type: String, required: true },
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
      index: true,
    },
    designation: {
      type: Schema.Types.ObjectId,
      ref: "Designation",
      required: true,
      index: true,
    },
    shift: {
      type: Schema.Types.ObjectId,
      ref: "Shift",
      required: true,
      index: true,
    },
    joiningDate: {
      type: Date,
      required: true,
      index: true,
    },
    basicSalary: {
      type: Number,
      required: true,
      min: 0,
    },
    bankAccount: {
      type: BankAccountSchema,
      required: true,
    },
    employmentStatus: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "ON_LEAVE", "TERMINATED", "RESIGNED"],
      default: "ACTIVE",
      index: true,
    },
    terminationDate: { type: Date },
    terminationReason: { type: String },
    documents: [WorkerDocumentSchema],
  },
  {
    timestamps: true,
  }
);

WorkerSchema.index({ workerId: 1 }, { unique: true });
WorkerSchema.index({ "nationalId.number": 1 }, { unique: true });
WorkerSchema.index({ department: 1, employmentStatus: 1 });
WorkerSchema.index({ fullName: "text", workerId: "text", phone: "text" });

export default mongoose.models.Worker || mongoose.model<IWorker>("Worker", WorkerSchema);