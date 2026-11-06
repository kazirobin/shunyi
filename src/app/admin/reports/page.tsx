"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Download, FileText, BarChart, Users, DollarSign, Calendar, Package } from "lucide-react";

const reports = [
  {
    id: "worker-list",
    title: "Worker List Report",
    description: "Complete list of all workers with personal and employment details",
    icon: Users,
    category: "Workers",
    formats: ["PDF", "Excel", "CSV"],
  },
  {
    id: "daily-attendance",
    title: "Daily Attendance Report",
    description: "Daily attendance records with check-in/out times and hours worked",
    icon: Calendar,
    category: "Attendance",
    formats: ["PDF", "Excel", "CSV"],
  },
  {
    id: "monthly-attendance",
    title: "Monthly Attendance Summary",
    description: "Monthly attendance summary with present, absent, late, and leave counts",
    icon: Calendar,
    category: "Attendance",
    formats: ["PDF", "Excel", "CSV"],
  },
  {
    id: "leave-records",
    title: "Leave Records Report",
    description: "All leave requests with status, dates, and approval details",
    icon: FileText,
    category: "Attendance",
    formats: ["PDF", "Excel", "CSV"],
  },
  {
    id: "monthly-payroll",
    title: "Monthly Payroll Report",
    description: "Complete payroll details for selected month with all components",
    icon: DollarSign,
    category: "Payroll",
    formats: ["PDF", "Excel", "CSV"],
  },
  {
    id: "payslips",
    title: "Individual Payslips",
    description: "Generate individual payslips for all workers or selected department",
    icon: FileText,
    category: "Payroll",
    formats: ["PDF"],
  },
  {
    id: "overtime-expenses",
    title: "Overtime Expenses Report",
    description: "Detailed overtime hours and costs by department and worker",
    icon: DollarSign,
    category: "Payroll",
    formats: ["PDF", "Excel", "CSV"],
  },
  {
    id: "production-performance",
    title: "Production Performance Report",
    description: "Daily and monthly production targets vs actual with efficiency",
    icon: Package,
    category: "Production",
    formats: ["PDF", "Excel", "CSV"],
  },
  {
    id: "buyer-inquiries",
    title: "Buyer Inquiries Report",
    description: "All RFQs with status, buyer details, and response timeline",
    icon: FileText,
    category: "Inquiries",
    formats: ["PDF", "Excel", "CSV"],
  },
];

export default function ReportsPage() {
  const t = useTranslations("admin.reports");

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("title")}</h1>
          <p className="text-muted-foreground mt-1">Generate and export business reports</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="card hover:shadow-md transition-shadow"
          >
            <div className="card-content pt-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <report.icon className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{report.title}</h3>
                    <span className="badge badge-outline text-xs">{report.category}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{report.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {report.formats.map((fmt) => (
                      <span key={fmt} className="badge badge-outline text-xs">
                        {fmt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="btn btn-primary btn-sm">
                  <Download className="h-4 w-4 mr-1" />
                  Generate
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}