"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Plus, Download, Upload, Calendar, Filter } from "lucide-react";

export default function AttendancePage() {
  const t = useTranslations("admin.attendance");

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("title")}</h1>
          <p className="text-muted-foreground mt-1">Manage daily attendance records</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-outline btn-sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="btn btn-outline btn-sm">
            <Upload className="h-4 w-4 mr-2" />
            {t("bulkUpload")}
          </button>
          <button className="btn btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            {t("markAttendance")}
          </button>
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
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="date" className="input pl-10" defaultValue={new Date().toISOString().split("T")[0]} />
              </div>
              <select className="input w-auto">
                <option value="">All Departments</option>
                <option value="cutting">Cutting</option>
                <option value="sewing">Sewing</option>
                <option value="finishing">Finishing</option>
              </select>
              <select className="input w-auto">
                <option value="">All Shifts</option>
                <option value="morning">Morning</option>
                <option value="evening">Evening</option>
                <option value="night">Night</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card-content p-0">
          <div className="overflow-x-auto">
            <table className="w-full" role="table">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Worker ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Department</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Shift</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Check In</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Check Out</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Hours</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">OT Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  { id: "SHY-001", name: "Mohammad Rahman", dept: "Cutting", shift: "Morning", status: "PRESENT", checkIn: "06:00", checkOut: "14:30", hours: "8.0", ot: "0.5" },
                  { id: "SHY-002", name: "Fatima Begum", dept: "Sewing", shift: "Morning", status: "PRESENT", checkIn: "05:55", checkOut: "14:00", hours: "8.0", ot: "0" },
                  { id: "SHY-003", name: "Abdul Karim", dept: "Finishing", shift: "Evening", status: "LATE", checkIn: "14:15", checkOut: "22:30", hours: "8.0", ot: "0.25" },
                  { id: "SHY-004", name: "Rashida Khatun", dept: "Sewing", shift: "Morning", status: "PRESENT", checkIn: "06:00", checkOut: "14:00", hours: "8.0", ot: "0" },
                  { id: "SHY-005", name: "Kamal Hossain", dept: "Packing", shift: "Night", status: "ON_LEAVE", checkIn: "-", checkOut: "-", hours: "0", ot: "0" },
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 text-sm font-mono font-medium text-foreground">{row.id}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{row.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{row.dept}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{row.shift}</td>
                    <td className="px-4 py-3">
                      <span className={`badge ${row.status === "PRESENT" ? "badge-success" : row.status === "LATE" ? "badge-warning" : row.status === "ON_LEAVE" ? "badge-info" : "badge-destructive"}`}>
                        {row.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{row.checkIn}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{row.checkOut}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{row.hours}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{row.ot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Showing 5 of 50 workers</p>
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