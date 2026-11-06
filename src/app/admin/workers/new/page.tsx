"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Upload, X } from "lucide-react";

const workerSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  phone: z.string().min(10, "Phone number is required"),
  emergencyContactName: z.string().min(1, "Emergency contact name is required"),
  emergencyContactRelationship: z.string().min(1, "Relationship is required"),
  emergencyContactPhone: z.string().min(10, "Emergency contact phone is required"),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  nationalIdNumber: z.string().min(1, "National ID is required"),
  nationalIdType: z.enum(["NID", "PASSPORT", "BIRTH_CERTIFICATE"]),
  presentAddress: z.string().min(1, "Present address is required"),
  permanentAddress: z.string().min(1, "Permanent address is required"),
  department: z.string().min(1, "Department is required"),
  designation: z.string().min(1, "Designation is required"),
  shift: z.string().min(1, "Shift is required"),
  joiningDate: z.string().min(1, "Joining date is required"),
  basicSalary: z.number().min(0, "Basic salary must be positive"),
  bankName: z.string().min(1, "Bank name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  accountHolderName: z.string().min(1, "Account holder name is required"),
  branchName: z.string().optional(),
});

type WorkerFormData = z.infer<typeof workerSchema>;

const departments = ["Cutting", "Sewing", "Finishing", "Packing", "Quality", "Maintenance", "Admin", "HR", "Accounts"];
const designations = ["Operator", "Supervisor", "Manager", "Quality Checker", "Line Leader", "Helper", "Master", "Inspector"];
const shifts = ["Morning (6:00 AM - 2:00 PM)", "Evening (2:00 PM - 10:00 PM)", "Night (10:00 PM - 6:00 AM)"];
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;
const nationalIdTypes = ["NID", "PASSPORT", "BIRTH_CERTIFICATE"] as const;

export default function NewWorkerPage() {
  const router = useRouter();
  const t = useTranslations("admin.workers");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [documents, setDocuments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<WorkerFormData>({
    resolver: zodResolver(workerSchema),
    defaultValues: {
      gender: "MALE",
      nationalIdType: "NID",
      bloodGroup: "O+",
      basicSalary: 0,
    },
  });

  const onSubmit = async (data: WorkerFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/admin/workers");
      router.refresh();
    } catch {
      console.error("Failed to create worker");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setDocuments((prev) => [...prev, ...files]);
  };

  const removeDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Link href="/admin/workers" className="btn btn-ghost btn-sm">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("addWorker")}</h1>
          <p className="text-muted-foreground">Create a new worker profile</p>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1 space-y-6"
        >
          <div className="card">
            <div className="card-header">
              <h3 className="card-title text-base">Profile Photo</h3>
            </div>
            <div className="card-content space-y-4">
              <div className="relative mx-auto h-32 w-32">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="h-full w-full rounded-full object-cover" />
                ) : (
                  <div className="h-full w-full rounded-full bg-primary/10 flex items-center justify-center text-primary text-4xl font-bold">
                    +
                  </div>
                )}
                <label className="absolute bottom-0 right-0 cursor-pointer">
                  <input type="file" accept="image/*" onChange={handlePhotoChange} className="sr-only" />
                  <Upload className="h-6 w-6 bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg hover:bg-primary/90 transition-colors" />
                </label>
              </div>
              <p className="text-center text-sm text-muted-foreground">Click to upload photo (max 5MB)</p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title text-base">Documents</h3>
            </div>
            <div className="card-content space-y-3">
              <label className="btn btn-outline w-full justify-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Documents
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" multiple onChange={handleDocumentChange} className="sr-only" />
              </label>
              {documents.length > 0 && (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded bg-muted/50 text-sm">
                      <span className="truncate flex-1 mr-2">{doc.name}</span>
                      <button type="button" onClick={() => removeDocument(index)} className="text-destructive hover:text-destructive/80">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="card">
            <div className="card-header">
              <h3 className="card-title text-base">Personal Information</h3>
            </div>
            <div className="card-content grid gap-4 md:grid-cols-2">
              <div>
                <label className="label">{t("fullName")} *</label>
                <input {...register("fullName")} className="input" placeholder="Full Name" />
                {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>}
              </div>
              <div>
                <label className="label">{t("gender")} *</label>
                <select {...register("gender")} className="input">
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <label className="label">{t("dateOfBirth")} *</label>
                <input type="date" {...register("dateOfBirth")} className="input" max={new Date().toISOString().split("T")[0]} />
                {errors.dateOfBirth && <p className="text-sm text-destructive mt-1">{errors.dateOfBirth.message}</p>}
              </div>
              <div>
                <label className="label">{t("bloodGroup")} *</label>
                <select {...register("bloodGroup")} className="input">
                  {bloodGroups.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
                </select>
              </div>
              <div>
                <label className="label">{t("phone")} *</label>
                <input type="tel" {...register("phone")} className="input" placeholder="+880-1XXX-XXXXXX" />
                {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="label">{t("nationalId")} *</label>
                <div className="flex gap-3">
                  <select {...register("nationalIdType")} className="input w-36">
                    {nationalIdTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                  </select>
                  <input {...register("nationalIdNumber")} className="input flex-1" placeholder="ID Number" />
                </div>
                {errors.nationalIdNumber && <p className="text-sm text-destructive mt-1">{errors.nationalIdNumber.message}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="label">{t("presentAddress")} *</label>
                <textarea {...register("presentAddress")} className="input min-h-[80px] resize-y" placeholder="Present Address" />
                {errors.presentAddress && <p className="text-sm text-destructive mt-1">{errors.presentAddress.message}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="label">{t("permanentAddress")} *</label>
                <textarea {...register("permanentAddress")} className="input min-h-[80px] resize-y" placeholder="Permanent Address" />
                {errors.permanentAddress && <p className="text-sm text-destructive mt-1">{errors.permanentAddress.message}</p>}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title text-base">Emergency Contact</h3>
            </div>
            <div className="card-content grid gap-4 md:grid-cols-3">
              <div>
                <label className="label">{t("emergencyContact")} *</label>
                <input {...register("emergencyContactName")} className="input" placeholder="Contact Name" />
                {errors.emergencyContactName && <p className="text-sm text-destructive mt-1">{errors.emergencyContactName.message}</p>}
              </div>
              <div>
                <label className="label">Relationship *</label>
                <input {...register("emergencyContactRelationship")} className="input" placeholder="Relationship" />
                {errors.emergencyContactRelationship && <p className="text-sm text-destructive mt-1">{errors.emergencyContactRelationship.message}</p>}
              </div>
              <div>
                <label className="label">{t("phone")} *</label>
                <input type="tel" {...register("emergencyContactPhone")} className="input" placeholder="+880-1XXX-XXXXXX" />
                {errors.emergencyContactPhone && <p className="text-sm text-destructive mt-1">{errors.emergencyContactPhone.message}</p>}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title text-base">Employment Details</h3>
            </div>
            <div className="card-content grid gap-4 md:grid-cols-3">
              <div>
                <label className="label">{t("department")} *</label>
                <select {...register("department")} className="input">
                  <option value="">Select Department</option>
                  {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                {errors.department && <p className="text-sm text-destructive mt-1">{errors.department.message}</p>}
              </div>
              <div>
                <label className="label">{t("designation")} *</label>
                <select {...register("designation")} className="input">
                  <option value="">Select Designation</option>
                  {designations.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                {errors.designation && <p className="text-sm text-destructive mt-1">{errors.designation.message}</p>}
              </div>
              <div>
                <label className="label">{t("shift")} *</label>
                <select {...register("shift")} className="input">
                  <option value="">Select Shift</option>
                  {shifts.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.shift && <p className="text-sm text-destructive mt-1">{errors.shift.message}</p>}
              </div>
              <div>
                <label className="label">{t("joiningDate")} *</label>
                <input type="date" {...register("joiningDate")} className="input" max={new Date().toISOString().split("T")[0]} />
                {errors.joiningDate && <p className="text-sm text-destructive mt-1">{errors.joiningDate.message}</p>}
              </div>
              <div>
                <label className="label">{t("basicSalary")} *</label>
                <input type="number" {...register("basicSalary", { valueAsNumber: true })} className="input" placeholder="0" min="0" step="100" />
                {errors.basicSalary && <p className="text-sm text-destructive mt-1">{errors.basicSalary.message}</p>}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title text-base">Bank Account</h3>
            </div>
            <div className="card-content grid gap-4 md:grid-cols-3">
              <div>
                <label className="label">Bank Name *</label>
                <input {...register("bankName")} className="input" placeholder="Bank Name" />
                {errors.bankName && <p className="text-sm text-destructive mt-1">{errors.bankName.message}</p>}
              </div>
              <div>
                <label className="label">Account Number *</label>
                <input {...register("accountNumber")} className="input" placeholder="Account Number" />
                {errors.accountNumber && <p className="text-sm text-destructive mt-1">{errors.accountNumber.message}</p>}
              </div>
              <div>
                <label className="label">Account Holder Name *</label>
                <input {...register("accountHolderName")} className="input" placeholder="Account Holder Name" />
                {errors.accountHolderName && <p className="text-sm text-destructive mt-1">{errors.accountHolderName.message}</p>}
              </div>
              <div>
                <label className="label">Branch Name</label>
                <input {...register("branchName")} className="input" placeholder="Branch Name (Optional)" />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-end gap-3 border-t pt-6"
          >
            <Link href="/admin/workers" className="btn btn-outline">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Worker"}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </form>
  );
}