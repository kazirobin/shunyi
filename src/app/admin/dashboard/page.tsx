"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  DollarSign,
  TrendingUp,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const statCards = [
  {
    title: "Total Workers",
    value: "2,547",
    change: "+2.3%",
    changeType: "positive",
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Present Today",
    value: "2,341",
    change: "91.9%",
    changeType: "positive",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Absent Today",
    value: "156",
    change: "-1.2%",
    changeType: "negative",
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    title: "On Leave",
    value: "50",
    change: "+5",
    changeType: "neutral",
    icon: Clock,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Monthly Production",
    value: "4.2M pcs",
    change: "+8.5%",
    changeType: "positive",
    icon: Package,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Overtime Expenses",
    value: "$45,230",
    change: "-3.2%",
    changeType: "negative",
    icon: DollarSign,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
];

const recentInquiries = [
  { id: "RFQ-2024-001", buyer: "H&M", company: "Hennes & Mauritz", product: "Knitwear", status: "NEW", date: "2024-01-15" },
  { id: "RFQ-2024-002", buyer: "Zara", company: "Inditex Group", product: "Denim", status: "QUOTED", date: "2024-01-14" },
  { id: "RFQ-2024-003", buyer: "Uniqlo", company: "Fast Retailing", product: "Woven", status: "CONTACTED", date: "2024-01-13" },
  { id: "RFQ-2024-004", buyer: "Gap", company: "Gap Inc.", product: "Outerwear", status: "NEW", date: "2024-01-12" },
  { id: "RFQ-2024-005", buyer: "C&A", company: "C&A Europe", product: "Knitwear", status: "CLOSED", date: "2024-01-11" },
];

const statusStyles: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-800",
  CONTACTED: "bg-yellow-100 text-yellow-800",
  QUOTED: "bg-purple-100 text-purple-800",
  NEGOTIATING: "bg-orange-100 text-orange-800",
  CONFIRMED: "bg-green-100 text-green-800",
  CLOSED: "bg-gray-100 text-gray-800",
  LOST: "bg-red-100 text-red-800",
};

export default function DashboardPage() {
  const t = useTranslations("admin.dashboard");

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("title")}</h1>
          <p className="text-muted-foreground mt-1">{t("overview")}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-outline btn-sm">
            <FileText className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
      >
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="card"
          >
            <div className="card-content pt-4">
              <div className="flex items-center justify-between">
                <div className={`${stat.bgColor} dark:bg-opacity-20 p-3 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} aria-hidden="true" />
                </div>
                <div className="flex items-center gap-1 text-sm font-medium">
                  {stat.changeType === "positive" && <ArrowUpRight className="h-4 w-4 text-green-600" />}
                  {stat.changeType === "negative" && <ArrowDownRight className="h-4 w-4 text-red-600" />}
                  {stat.changeType === "neutral" && <span className="h-4 w-4 text-gray-400">−</span>}
                  <span className={stat.changeType === "positive" ? "text-green-600" : stat.changeType === "negative" ? "text-red-600" : "text-gray-500"}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="card-header">
            <div className="flex items-center justify-between">
              <div>
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="ml-2">{t("attendanceChart")}</span>
              </div>
            </div>
          </div>
          <div className="card-content">
            <div className="h-64 flex items-end justify-around gap-2 px-2">
              {[
                { day: "Mon", present: 85, absent: 15 },
                { day: "Tue", present: 92, absent: 8 },
                { day: "Wed", present: 88, absent: 12 },
                { day: "Thu", present: 90, absent: 10 },
                { day: "Fri", present: 87, absent: 13 },
                { day: "Sat", present: 75, absent: 25 },
                { day: "Sun", present: 10, absent: 90 },
              ].map((data, index) => (
                <div key={data.day} className="flex-1 flex flex-col items-center justify-end gap-1">
                  <div className="w-full flex justify-center gap-1">
                    <div
                      className="w-full max-h-48 bg-green-500 rounded-t transition-all hover:bg-green-600"
                      style={{ height: `${data.present}%` }}
                    />
                    <div
                      className="w-full max-h-48 bg-red-500 rounded-t transition-all hover:bg-red-600"
                      style={{ height: `${data.absent}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{data.day}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-green-500" />
                <span className="text-muted-foreground">Present</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-red-500" />
                <span className="text-muted-foreground">Absent</span>
              </div>
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
                <Package className="h-5 w-5 text-primary" />
                <span className="ml-2">{t("productionChart")}</span>
              </div>
            </div>
          </div>
          <div className="card-content">
            <div className="h-64 flex items-end justify-around gap-2 px-2">
              {[
                { week: "W1", target: 100, actual: 92 },
                { week: "W2", target: 100, actual: 95 },
                { week: "W3", target: 100, actual: 88 },
                { week: "W4", target: 100, actual: 102 },
              ].map((data, index) => (
                <div key={data.week} className="flex-1 flex flex-col items-center justify-end gap-1">
                  <div className="w-full flex justify-center gap-1">
                    <div
                      className="w-full max-h-48 bg-primary/30 rounded-t transition-all"
                      style={{ height: `${data.target}%` }}
                    />
                    <div
                      className="w-full max-h-48 bg-primary rounded-t transition-all hover:bg-primary/80"
                      style={{ height: `${data.actual}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{data.week}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-primary/30" />
                <span className="text-muted-foreground">Target</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-primary" />
                <span className="text-muted-foreground">Actual</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <div className="card-header">
          <div className="flex items-center justify-between">
            <div>
              <FileText className="h-5 w-5 text-primary" />
              <span className="ml-2">{t("recentInquiries")}</span>
            </div>
            <a href="/admin/inquiries" className="btn btn-outline btn-sm">
              View All
            </a>
          </div>
        </div>
        <div className="card-content p-0">
          <div className="overflow-x-auto">
            <table className="w-full" role="table">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Inquiry ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Buyer</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Company</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Product</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{inquiry.id}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{inquiry.buyer}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{inquiry.company}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{inquiry.product}</td>
                    <td className="px-4 py-3">
                      <span className={`badge badge-outline ${statusStyles[inquiry.status]}`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{inquiry.date}</td>
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