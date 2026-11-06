"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
} from "lucide-react";

const mockWorkers = [
  { id: "1", workerId: "SHY-001", name: "Mohammad Rahman", department: "Cutting", designation: "Cutting Operator", shift: "Morning", status: "ACTIVE", joiningDate: "2020-01-15" },
  { id: "2", workerId: "SHY-002", name: "Fatima Begum", department: "Sewing", designation: "Sewing Operator", shift: "Morning", status: "ACTIVE", joiningDate: "2019-03-22" },
  { id: "3", workerId: "SHY-003", name: "Abdul Karim", department: "Finishing", designation: "Quality Checker", shift: "Evening", status: "ACTIVE", joiningDate: "2021-07-10" },
  { id: "4", workerId: "SHY-004", name: "Rashida Khatun", department: "Sewing", designation: "Line Supervisor", shift: "Morning", status: "ACTIVE", joiningDate: "2018-11-05" },
  { id: "5", workerId: "SHY-005", name: "Kamal Hossain", department: "Packing", designation: "Packing Operator", shift: "Night", status: "ON_LEAVE", joiningDate: "2022-02-28" },
  { id: "6", workerId: "SHY-006", name: "Salma Akter", department: "Quality", designation: "QC Inspector", shift: "Morning", status: "ACTIVE", joiningDate: "2020-09-12" },
  { id: "7", workerId: "SHY-007", name: "Rahim Uddin", department: "Cutting", designation: "Cutting Master", shift: "Evening", status: "ACTIVE", joiningDate: "2017-05-20" },
  { id: "8", workerId: "SHY-008", name: "Ayesha Siddika", department: "Finishing", designation: "Finishing Operator", shift: "Morning", status: "INACTIVE", joiningDate: "2021-01-15" },
];

const statusStyles: Record<string, string> = {
  ACTIVE: "badge-success",
  INACTIVE: "badge-outline",
  ON_LEAVE: "badge-warning",
  TERMINATED: "badge-destructive",
  RESIGNED: "badge-outline",
};

export default function WorkersPage() {
  const t = useTranslations("admin.workers");
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredWorkers = mockWorkers.filter((worker) => {
    const matchesSearch = worker.name.toLowerCase().includes(search.toLowerCase()) ||
      worker.workerId.toLowerCase().includes(search.toLowerCase());
    const matchesDepartment = !departmentFilter || worker.department === departmentFilter;
    const matchesStatus = !statusFilter || worker.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const departments = [...new Set(mockWorkers.map((w) => w.department))];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("title")}</h1>
          <p className="text-muted-foreground mt-1">Manage worker records and profiles</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-outline btn-sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="btn btn-outline btn-sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </button>
          <Link href="/admin/workers/new" className="btn btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            {t("addWorker")}
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <div className="card-header">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input pl-10"
                />
              </div>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="input w-auto"
              >
                <option value="">{t("filterDepartment")}</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input w-auto"
              >
                <option value="">{t("filterStatus")}</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="ON_LEAVE">On Leave</option>
                <option value="TERMINATED">Terminated</option>
                <option value="RESIGNED">Resigned</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card-content p-0">
          <div className="overflow-x-auto">
            <table className="w-full" role="table">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("workerId")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("fullName")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("department")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("designation")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("shift")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("joiningDate")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("employmentStatus")}</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">{t("action")}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredWorkers.map((worker) => (
                  <tr key={worker.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 text-sm font-mono font-medium text-foreground">{worker.workerId}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                          {worker.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span className="text-sm font-medium text-foreground">{worker.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{worker.department}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{worker.designation}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{worker.shift}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{worker.joiningDate}</td>
                    <td className="px-4 py-3">
                      <span className={`badge ${statusStyles[worker.status]}`}>{worker.status.replace("_", " ")}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/workers/${worker.id}`} className="btn btn-ghost btn-sm" aria-label={t("edit")}>
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link href={`/admin/workers/${worker.id}/edit`} className="btn btn-ghost btn-sm" aria-label={t("edit")}>
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button className="btn btn-ghost btn-sm text-destructive hover:bg-destructive/10" aria-label={t("delete")}>
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredWorkers.length === 0 && (
            <div className="py-12 text-center">
              <Search className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">{t("noData")}</p>
            </div>
          )}

          <div className="px-4 py-3 border-t flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredWorkers.length} of {mockWorkers.length} workers
            </p>
            <div className="flex items-center gap-1">
              <button className="btn btn-outline btn-sm" disabled>Previous</button>
              <button className="btn btn-outline btn-sm" disabled>Next</button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
