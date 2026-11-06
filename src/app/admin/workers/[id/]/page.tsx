"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Edit, Mail, Phone, MapPin, Calendar, CreditCard, Building2, User, Shield, FileText } from "lucide-react";

const mockWorker = {
  id: "1",
  workerId: "SHY-001",
  name: "Mohammad Rahman",
  photo: null,
  gender: "MALE",
  dateOfBirth: "1990-05-15",
  phone: "+880-1712-345678",
  emergencyContact: { name: "Rahima Begum", relationship: "Wife", phone: "+880-1812-345678" },
  bloodGroup: "O+",
  nationalId: { number: "1234567890", type: "NID" },
  address: { present: "House 12, Road 5, Gulshan, Dhaka", permanent: "Village: Charpara, Upazila: Sreepur, District: Gazipur" },
  department: "Cutting",
  designation: "Cutting Operator",
  shift: "Morning (6:00 AM - 2:00 PM)",
  joiningDate: "2020-01-15",
  basicSalary: 15000,
  bankAccount: { bankName: "Dutch-Bangla Bank", accountNumber: "1234567890", accountHolderName: "Mohammad Rahman", branchName: "Gulshan Branch" },
  employmentStatus: "ACTIVE",
  documents: [
    { name: "NID Copy", url: "#", type: "application/pdf" },
    { name: "Educational Certificate", url: "#", type: "application/pdf" },
    { name: "Experience Letter", url: "#", type: "application/pdf" },
  ],
};

export default function WorkerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const t = useTranslations("admin.workers");
  const worker = mockWorker;

  return (
    <div className="space-y-6">
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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{worker.name}</h1>
          <p className="text-muted-foreground">{worker.workerId} • {worker.department} • {worker.designation}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Link href={`/admin/workers/${worker.id}/edit`} className="btn btn-outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Link>
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
            <div className="card-content pt-6">
              <div className="text-center space-y-4">
                <div className="relative mx-auto h-32 w-32">
                  <div className="h-full w-full rounded-full bg-primary/10 flex items-center justify-center text-primary text-4xl font-bold">
                    {worker.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  {worker.employmentStatus === "ACTIVE" && (
                    <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-500 border-2 border-card" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{worker.name}</h3>
                  <p className="text-sm text-muted-foreground">{worker.workerId}</p>
                  <span className={`badge badge-success`}>{worker.employmentStatus.replace("_", " ")}</span>
                </div>
                <div className="pt-4 border-t space-y-3 text-sm">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${"mohammad.rahman@shunyigarments.com"}`} className="hover:text-primary transition-colors">
                      mohammad.rahman@shunyigarments.com
                    </a>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{worker.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <User className="h-5 w-5 text-primary" />
              <span className="ml-2">{t("fullName")} Information</span>
            </div>
            <div className="card-content space-y-4">
              <InfoRow label={t("gender")} value={worker.gender} icon={User} />
              <InfoRow label={t("dateOfBirth")} value={`${worker.dateOfBirth} (${new Date().getFullYear() - new Date(worker.dateOfBirth).getFullYear()} years)`} icon={Calendar} />
              <InfoRow label={t("bloodGroup")} value={worker.bloodGroup} icon={Shield} />
              <InfoRow label={t("nationalId")} value={`${worker.nationalId.type}: ${worker.nationalId.number}`} icon={FileText} />
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <Mail className="h-5 w-5 text-primary" />
              <span className="ml-2">Emergency Contact</span>
            </div>
            <div className="card-content space-y-3">
              <InfoRow label={t("emergencyContact")} value={worker.emergencyContact.name} icon={User} />
              <InfoRow label={t("phone")} value={worker.emergencyContact.phone} icon={Phone} />
              <InfoRow label="Relationship" value={worker.emergencyContact.relationship} icon={User} />
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
              <MapPin className="h-5 w-5 text-primary" />
              <span className="ml-2">Address Information</span>
            </div>
            <div className="card-content grid gap-4 md:grid-cols-2">
              <div>
                <label className="label">Present Address</label>
                <p className="text-sm text-muted-foreground mt-1">{worker.address.present}</p>
              </div>
              <div>
                <label className="label">Permanent Address</label>
                <p className="text-sm text-muted-foreground mt-1">{worker.address.permanent}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <Building2 className="h-5 w-5 text-primary" />
              <span className="ml-2">Employment Details</span>
            </div>
            <div className="card-content grid gap-4 md:grid-cols-3">
              <InfoRow label={t("department")} value={worker.department} icon={Building2} />
              <InfoRow label={t("designation")} value={worker.designation} icon={User} />
              <InfoRow label={t("shift")} value={worker.shift} icon={Calendar} />
              <InfoRow label={t("joiningDate")} value={worker.joiningDate} icon={Calendar} />
              <InfoRow label={t("basicSalary")} value={`BDT ${worker.basicSalary.toLocaleString()}`} icon={CreditCard} />
              <InfoRow label={t("employmentStatus")} value={<span className="badge badge-success">{worker.employmentStatus.replace("_", " ")}</span>} icon={Shield} />
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <CreditCard className="h-5 w-5 text-primary" />
              <span className="ml-2">Bank Account</span>
            </div>
            <div className="card-content grid gap-4 md:grid-cols-3">
              <InfoRow label="Bank Name" value={worker.bankAccount.bankName} icon={Building2} />
              <InfoRow label="Account Number" value={worker.bankAccount.accountNumber} icon={CreditCard} />
              <InfoRow label="Account Holder" value={worker.bankAccount.accountHolderName} icon={User} />
              <InfoRow label="Branch" value={worker.bankAccount.branchName || "-"} icon={Building2} />
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <FileText className="h-5 w-5 text-primary" />
              <span className="ml-2">Documents</span>
            </div>
            <div className="card-content">
              <div className="space-y-2">
                {worker.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-foreground">{doc.name}</span>
                    </div>
                    <a href={doc.url} className="btn btn-ghost btn-sm" target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, icon: Icon }: { label: string; value: string | React.ReactNode; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm text-foreground">{value}</p>
      </div>
    </div>
  );
}