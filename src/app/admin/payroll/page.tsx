"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Plus, Download, FileText, Calculator, DollarSign } from "lucide-react";

export default function PayrollPage() {
  const t = useTranslations("admin.payroll");

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("title")}</h1>
          <p className="text-muted-foreground mt-1">Manage monthly payroll and salary processing</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-outline btn-sm">
            <Download className="h-4 w-4 mr-2" />
            {t("exportExcel")}
          </button>
          <button className="btn btn-primary">
            <Calculator className="h-4 w-4 mr-2" />
            {t("processPayroll")}
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {[
          { title: "Total Payroll", value: "$125,430", change: "+5.2%", icon: DollarSign, color: "text-green-600", bg: "bg-green-100" },
          { title: "Workers Paid", value: "2,431", change: "98%", icon: FileText, color: "text-blue-600", bg: "bg-blue-100" },
          { title: "Pending", value: "45", change: "-12", icon: Calculator, color: "text-yellow-600", bg: "bg-yellow-100" },
          { title: "Overtime Cost", value: "$18,750", change: "+3.1%", icon: DollarSign, color: "text-purple-600", bg: "bg-purple-100" },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="card"
          >
            <div className="card-content pt-4">
              <div className="flex items-center justify-between">
                <div className={`${stat.bg} dark:bg-opacity-20 p-3 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <div className="card-header">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <FileText className="h-5 w-5 text-primary" />
              <span className="ml-2">Payroll Records</span>
            </div>
            <div className="flex items-center gap-2">
              <select className="input w-auto">
                <option value="2024-01">January 2024</option>
                <option value="2023-12">December 2023</option>
                <option value="2023-11">November 2023</option>
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
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Basic Salary</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Overtime</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Bonus</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Deductions</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Net Payable</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  { id: "SHY-001", name: "Mohammad Rahman", dept: "Cutting", basic: 15000, ot: 2500, bonus: 1500, deductions: 500, net: 18500, status: "PAID" },
                  { id: "SHY-002", name: "Fatima Begum", dept: "Sewing", basic: 14500, ot: 1800, bonus: 1500, deductions: 300, net: 17500, status: "PAID" },
                  { id: "SHY-003", name: "Abdul Karim", dept: "Finishing", basic: 16000, ot: 3200, bonus: 1500, deductions: 800, net: 19900, status: "PROCESSED" },
                  { id: "SHY-004", name: "Rashida Khatun", dept: "Sewing", basic: 18000, ot: 2000, bonus: 2000, deductions: 500, net: 21500, status: "PAID" },
                  { id: "SHY-005", name: "Kamal Hossain", dept: "Packing", basic: 13500, ot: 0, bonus: 1500, deductions: 200, net: 14800, status: "DRAFT" },
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 text-sm font-mono font-medium text-foreground">{row.id}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{row.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{row.dept}</td>
                    <td className="px-4 py-3 text-right text-sm text-foreground">BDT {row.basic.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-sm text-muted-foreground">BDT {row.ot.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-sm text-muted-foreground">BDT {row.bonus.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-sm text-muted-foreground">BDT {row.deductions.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-sm font-bold text-foreground">BDT {row.net.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`badge ${row.status === "PAID" ? "badge-success" : row.status === "PROCESSED" ? "badge-info" : "badge-outline"}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="btn btn-ghost btn-sm">Payslip</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}