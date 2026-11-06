"use client";

export const dynamic = "force-dynamic";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Plus, Download, FileText, Calculator, DollarSign } from "lucide-react";

export default function PayrollPage() {
  const t = useTranslations("admin.payroll");

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
            {t("processPayroll")}
          </button>
          <button className="btn btn-outline">
            <Download className="h-4 w-4 mr-2" />
            {t("exportExcel")}
          </button>
          <button className="btn btn-outline">
            <FileText className="h-4 w-4 mr-2" />
            {t("generatePayslips")}
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="card-content pt-4">
            <div className="flex items-center justify-between">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                <Calculator className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-foreground">$125,430</p>
              <p className="text-sm text-muted-foreground">{t("totalPayroll")}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-content pt-4">
            <div className="flex items-center justify-between">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-foreground">$18,250</p>
              <p className="text-sm text-muted-foreground">{t("overtimePay")}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-content pt-4">
            <div className="flex items-center justify-between">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                <Calculator className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-foreground">2,547</p>
              <p className="text-sm text-muted-foreground">{t("workersProcessed")}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-content pt-4">
            <div className="flex items-center justify-between">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">{t("pendingPayslips")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <FileText className="h-5 w-5 text-primary" />
              <span className="ml-2">{t("payrollHistory")}</span>
            </div>
          </div>
        </div>
        <div className="card-content">
          <div className="overflow-x-auto">
            <table className="w-full" role="table">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("period")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("workersProcessed")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("totalPayroll")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("overtimePay")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("status")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                    No payroll data available
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