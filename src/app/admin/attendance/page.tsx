"use client";

export const dynamic = "force-dynamic";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Plus, Download, Upload, Calendar, Filter } from "lucide-react";

export default function AttendancePage() {
  const t = useTranslations("admin.attendance");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("title")}</h1>
          <p className="text-muted-foreground mt-1">{t("overview")}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            {t("markAttendance")}
          </button>
          <button className="btn btn-outline">
            <Download className="h-4 w-4 mr-2" />
            {t("reports")}
          </button>
          <button className="btn btn-outline">
            <Upload className="h-4 w-4 mr-2" />
            {t("bulkUpload")}
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Calendar className="h-5 w-5 text-primary" />
              <span className="ml-2">{t("dailyAttendance")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <select className="input input-sm w-auto">
                <option>{t("filterDepartment")}</option>
                <option>Cutting</option>
                <option>Sewing</option>
                <option>Finishing</option>
                <option>Quality</option>
              </select>
              <select className="input input-sm w-auto">
                <option>{t("filterStatus")}</option>
                <option>Present</option>
                <option>Absent</option>
                <option>Late</option>
                <option>On Leave</option>
              </select>
            </div>
          </div>
        </div>
        <div className="card-content">
          <div className="overflow-x-auto">
            <table className="w-full" role="table">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("worker")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("department")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("shift")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("status")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("checkIn")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("checkOut")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("hoursWorked")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("overtimeHours")}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                    No attendance data available
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}