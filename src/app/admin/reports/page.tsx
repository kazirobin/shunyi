"use client";

export const dynamic = "force-dynamic";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Download, FileText, BarChart, Users, DollarSign, Calendar, Package } from "lucide-react";

const reports = [
  {
    id: "worker-list",
    title: "Worker List Report",
    description: "Complete list of all active workers with details",
    icon: Users,
    category: "HR",
  },
  {
    id: "attendance-summary",
    title: "Attendance Summary",
    description: "Monthly attendance overview by department",
    icon: Calendar,
    category: "HR",
  },
  {
    id: "payroll-summary",
    title: "Payroll Summary",
    description: "Monthly payroll expenses and breakdown",
    icon: DollarSign,
    category: "Finance",
  },
  {
    id: "production-report",
    title: "Production Report",
    description: "Daily/weekly/monthly production output",
    icon: Package,
    category: "Production",
  },
  {
    id: "efficiency-analysis",
    title: "Line Efficiency Analysis",
    description: "Production line efficiency trends",
    icon: BarChart,
    category: "Production",
  },
  {
    id: "compliance-audit",
    title: "Compliance Audit Report",
    description: "Certification and audit compliance status",
    icon: FileText,
    category: "Compliance",
  },
];

export default function ReportsPage() {
  const t = useTranslations("admin.reports");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("title")}</h1>
          <p className="text-muted-foreground mt-1">{t("overview")}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="card group hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => console.log("Generate report:", report.id)}
          >
            <div className="card-content pt-4">
              <div className="flex items-start justify-between">
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg">
                  <report.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="badge badge-outline text-xs">{report.category}</span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-foreground">{report.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Click to generate</span>
                <Download className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}