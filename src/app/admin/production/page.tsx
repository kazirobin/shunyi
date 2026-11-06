"use client";

export const dynamic = "force-dynamic";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Plus, TrendingUp, Target, Users, Download } from "lucide-react";

export default function ProductionPage() {
  const t = useTranslations("admin.production");

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
            {t("addLine")}
          </button>
          <button className="btn btn-outline">
            <Download className="h-4 w-4 mr-2" />
            {t("monthlyReport")}
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="card-content pt-4">
            <div className="flex items-center justify-between">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-foreground">12,500</p>
              <p className="text-sm text-muted-foreground">{t("dailyTarget")}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-content pt-4">
            <div className="flex items-center justify-between">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-foreground">11,850</p>
              <p className="text-sm text-muted-foreground">{t("actualOutput")}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-content pt-4">
            <div className="flex items-center justify-between">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-foreground">94.8%</p>
              <p className="text-sm text-muted-foreground">{t("efficiency")}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-content pt-4">
            <div className="flex items-center justify-between">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-foreground">45</p>
              <p className="text-sm text-muted-foreground">{t("workersAssigned")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="ml-2">{t("dailyRecord")}</span>
            </div>
          </div>
        </div>
        <div className="card-content">
          <div className="overflow-x-auto">
            <table className="w-full" role="table">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("lineName")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("target")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("actual")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("efficiency")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("workersAssigned")}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    No production data available
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