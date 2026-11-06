"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Plus, TrendingUp, Target, Users, Download } from "lucide-react";

export default function ProductionPage() {
  const t = useTranslations("admin.production");

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("title")}</h1>
          <p className="text-muted-foreground mt-1">Track daily production targets and efficiency</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-outline btn-sm">
            <Download className="h-4 w-4 mr-2" />
            {t("monthlyReport")}
          </button>
          <button className="btn btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            {t("addLine")}
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
          { title: "Active Lines", value: "12", icon: Target, color: "text-blue-600", bg: "bg-blue-100" },
          { title: "Today's Target", value: "45,000", icon: Target, color: "text-green-600", bg: "bg-green-100" },
          { title: "Achieved", value: "41,250", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-100" },
          { title: "Efficiency", value: "91.7%", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-100" },
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
          <div className="flex items-center justify-between">
            <div>
              <Target className="h-5 w-5 text-primary" />
              <span className="ml-2">Production Lines Overview</span>
            </div>
          </div>
        </div>

        <div className="card-content p-0">
          <div className="overflow-x-auto">
            <table className="w-full" role="table">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Line</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Department</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Supervisor</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Target/Day</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actual</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Efficiency</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Workers</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">OT Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  { line: "Line A-1", dept: "Cutting", supervisor: "Rahim Uddin", target: 5000, actual: 4850, efficiency: 97.0, workers: 25, ot: 12 },
                  { line: "Line B-1", dept: "Sewing", supervisor: "Rashida Khatun", target: 8000, actual: 7200, efficiency: 90.0, workers: 40, ot: 28 },
                  { line: "Line B-2", dept: "Sewing", supervisor: "Fatima Begum", target: 8000, actual: 7600, efficiency: 95.0, workers: 38, ot: 15 },
                  { line: "Line C-1", dept: "Finishing", supervisor: "Abdul Karim", target: 6000, actual: 5400, efficiency: 90.0, workers: 30, ot: 20 },
                  { line: "Line D-1", dept: "Packing", supervisor: "Kamal Hossain", target: 10000, actual: 9500, efficiency: 95.0, workers: 35, ot: 8 },
                  { line: "Line D-2", dept: "Packing", supervisor: "Salma Akter", target: 10000, actual: 8800, efficiency: 88.0, workers: 32, ot: 22 },
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{row.line}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{row.dept}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{row.supervisor}</td>
                    <td className="px-4 py-3 text-right text-sm text-foreground">{row.target.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-sm font-bold text-foreground">{row.actual.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-medium ${row.efficiency >= 95 ? "text-green-600" : row.efficiency >= 90 ? "text-yellow-600" : "text-red-600"}`}>
                        {row.efficiency}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-muted-foreground">{row.workers}</td>
                    <td className="px-4 py-3 text-right text-sm text-muted-foreground">{row.ot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <div className="card-header">
          <div className="flex items-center justify-between">
            <div>
              <Users className="h-5 w-5 text-primary" />
              <span className="ml-2">Daily Production Record</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="date" className="input w-auto" defaultValue={new Date().toISOString().split("T")[0]} />
            </div>
          </div>
        </div>

        <div className="card-content p-0">
          <div className="overflow-x-auto">
            <table className="w-full" role="table">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Line</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Style</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Target</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Output</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Defects</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Efficiency</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Workers</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  { line: "Line A-1", style: "T-Shirt Basic", target: 500, output: 485, defects: 8, efficiency: 97.0, workers: 25 },
                  { line: "Line B-1", style: "Polo Shirt", target: 800, output: 720, defects: 15, efficiency: 90.0, workers: 40 },
                  { line: "Line B-2", style: "Polo Shirt", target: 800, output: 760, defects: 12, efficiency: 95.0, workers: 38 },
                  { line: "Line C-1", style: "Trousers", target: 600, output: 540, defects: 20, efficiency: 90.0, workers: 30 },
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{row.line}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{row.style}</td>
                    <td className="px-4 py-3 text-right text-sm text-foreground">{row.target}</td>
                    <td className="px-4 py-3 text-right text-sm font-bold text-foreground">{row.output}</td>
                    <td className="px-4 py-3 text-right text-sm text-muted-foreground">{row.defects}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-medium ${row.efficiency >= 95 ? "text-green-600" : row.efficiency >= 90 ? "text-yellow-600" : "text-red-600"}`}>
                        {row.efficiency}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-muted-foreground">{row.workers}</td>
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