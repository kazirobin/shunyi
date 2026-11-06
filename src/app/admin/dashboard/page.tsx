"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
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
import { formatNumber } from "@/lib/utils";

interface DashboardData {
  stats: {
    totalWorkers: number;
    presentToday: number;
    absentToday: number;
    onLeaveToday: number;
    monthlyProduction: number;
    overtimeExpenses: number;
  };
  recentInquiries: Array<{
    id: string;
    buyer: string;
    company: string;
    product: string;
    status: string;
    date: string;
  }>;
  attendanceChart: Array<{
    day: string;
    present: number;
    absent: number;
  }>;
  productionChart: Array<{
    week: string;
    target: number;
    actual: number;
  }>;
}

const statusStyles: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-800",
  CONTACTED: "bg-yellow-100 text-yellow-800",
  QUOTED: "bg-purple-100 text-purple-800",
  NEGOTIATING: "bg-orange-100 text-orange-800",
  CONFIRMED: "bg-green-100 text-green-800",
  CLOSED: "bg-gray-100 text-gray-800",
  LOST: "bg-red-100 text-red-800",
};

const statCardConfig = [
  { key: "totalWorkers", icon: Users, color: "text-primary", bgColor: "bg-primary/10", label: "totalWorkers" },
  { key: "presentToday", icon: CheckCircle, color: "text-green-600", bgColor: "bg-green-100", label: "presentToday" },
  { key: "absentToday", icon: XCircle, color: "text-red-600", bgColor: "bg-red-100", label: "absentToday" },
  { key: "onLeaveToday", icon: Clock, color: "text-yellow-600", bgColor: "bg-yellow-100", label: "onLeave" },
  { key: "monthlyProduction", icon: Package, color: "text-blue-600", bgColor: "bg-blue-100", label: "monthlyProduction" },
  { key: "overtimeExpenses", icon: DollarSign, color: "text-purple-600", bgColor: "bg-purple-100", label: "overtimeExpenses" },
];

export default function DashboardPage() {
  const t = useTranslations("admin.dashboard");
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((res) => res.json())
      .then((json) => {
        if (json.stats) setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("title")}</h1>
            <p className="text-muted-foreground mt-1">{t("overview")}</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {statCardConfig.map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="card animate-pulse"
            >
              <div className="card-content pt-4">
                <div className="h-12 w-12 rounded-lg bg-muted" />
                <div className="mt-4 h-8 w-3/4 bg-muted rounded" />
                <div className="mt-2 h-4 w-1/2 bg-muted rounded" />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div className="card animate-pulse" style={{ height: "400px" }} />
          <motion.div className="card animate-pulse" style={{ height: "400px" }} />
        </div>
        <motion.div className="card animate-pulse" style={{ height: "300px" }} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">{t("failedToLoad")}</p>
      </div>
    );
  }

  const stats = data.stats;
  const attendanceRate = stats.totalWorkers > 0
    ? ((stats.presentToday / stats.totalWorkers) * 100).toFixed(1)
    : "0";

  const statCards = [
    {
      title: t("totalWorkers"),
      value: formatNumber(stats.totalWorkers),
      change: `+${attendanceRate}%`,
      changeType: "positive" as const,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: t("presentToday"),
      value: formatNumber(stats.presentToday),
      change: `${attendanceRate}%`,
      changeType: "positive" as const,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: t("absentToday"),
      value: formatNumber(stats.absentToday),
      change: stats.absentToday > 0 ? "+0%" : "0%",
      changeType: "negative" as const,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: t("onLeave"),
      value: formatNumber(stats.onLeaveToday),
      change: "+0",
      changeType: "neutral" as const,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: t("monthlyProduction"),
      value: formatNumber(stats.monthlyProduction) + " pcs",
      change: "+0%",
      changeType: "positive" as const,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: t("overtimeExpenses"),
      value: `$${formatNumber(stats.overtimeExpenses)}`,
      change: "-0%",
      changeType: "negative" as const,
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

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
            {t("exportReport")}
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
              {data.attendanceChart.map((item, index) => (
                <div key={item.day} className="flex-1 flex flex-col items-center justify-end gap-1">
                  <div className="w-full flex justify-center gap-1">
                    <div
                      className="w-full max-h-48 bg-green-500 rounded-t transition-all hover:bg-green-600"
                      style={{ height: `${item.present}%` }}
                    />
                    <div
                      className="w-full max-h-48 bg-red-500 rounded-t transition-all hover:bg-red-600"
                      style={{ height: `${item.absent}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{item.day}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-green-500" />
                <span className="text-muted-foreground">{t("present")}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-red-500" />
                <span className="text-muted-foreground">{t("absent")}</span>
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
              {data.productionChart.map((item, index) => (
                <div key={item.week} className="flex-1 flex flex-col items-center justify-end gap-1">
                  <div className="w-full flex justify-center gap-1">
                    <div
                      className="w-full max-h-48 bg-primary/30 rounded-t transition-all"
                      style={{ height: `${Math.min(100, (item.target / Math.max(...data.productionChart.map(d => d.target))) * 100)}%` }}
                    />
                    <div
                      className="w-full max-h-48 bg-primary rounded-t transition-all hover:bg-primary/80"
                      style={{ height: `${Math.min(100, (item.actual / Math.max(...data.productionChart.map(d => d.target))) * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{item.week}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-primary/30" />
                <span className="text-muted-foreground">{t("target")}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-primary" />
                <span className="text-muted-foreground">{t("actual")}</span>
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
              {t("viewAll")}
            </a>
          </div>
        </div>
        <div className="card-content p-0">
          <div className="overflow-x-auto">
            <table className="w-full" role="table">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("inquiryId")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("buyer")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("company")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("product")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("status")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("date")}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.recentInquiries.length > 0 ? (
                  data.recentInquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{inquiry.id}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{inquiry.buyer}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{inquiry.company}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{inquiry.product}</td>
                      <td className="px-4 py-3">
                        <span className={`badge badge-outline ${statusStyles[inquiry.status] || "bg-gray-100 text-gray-800"}`}>
                          {inquiry.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{inquiry.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      {t("noInquiries")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}