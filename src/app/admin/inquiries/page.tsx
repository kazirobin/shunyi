"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Search, Filter, Download, Mail, Eye, Edit, Flag } from "lucide-react";

const statusStyles: Record<string, string> = {
  NEW: "badge-info",
  CONTACTED: "badge-warning",
  QUOTED: "badge-purple",
  NEGOTIATING: "badge-orange",
  CONFIRMED: "badge-success",
  CLOSED: "badge-outline",
  LOST: "badge-destructive",
};

const mockInquiries = [
  { id: "RFQ-2024-001", buyer: "John Smith", company: "H&M", email: "john@hm.com", country: "Sweden", product: "Knitwear", qty: 50000, status: "NEW", priority: "HIGH", date: "2024-01-15", assigned: "Sarah Johnson" },
  { id: "RFQ-2024-002", buyer: "Maria Garcia", company: "Zara", email: "maria@inditex.com", country: "Spain", product: "Denim", qty: 30000, status: "QUOTED", priority: "HIGH", date: "2024-01-14", assigned: "Mike Chen" },
  { id: "RFQ-2024-003", buyer: "Yuki Tanaka", company: "Uniqlo", email: "yuki@fastretailing.com", country: "Japan", product: "Woven", qty: 25000, status: "CONTACTED", priority: "MEDIUM", date: "2024-01-13", assigned: "Sarah Johnson" },
  { id: "RFQ-2024-004", buyer: "David Brown", company: "Gap Inc.", email: "david@gap.com", country: "USA", product: "Outerwear", qty: 15000, status: "NEW", priority: "URGENT", date: "2024-01-12", assigned: "" },
  { id: "RFQ-2024-005", buyer: "Anna Mueller", company: "C&A Europe", email: "anna@c-a.com", country: "Germany", product: "Knitwear", qty: 40000, status: "CLOSED", priority: "MEDIUM", date: "2024-01-11", assigned: "Mike Chen" },
  { id: "RFQ-2024-006", buyer: "James Wilson", company: "Primark", email: "james@primark.com", country: "UK", product: "Denim", qty: 35000, status: "NEGOTIATING", priority: "HIGH", date: "2024-01-10", assigned: "Sarah Johnson" },
];

export default function InquiriesPage() {
  const t = useTranslations("admin.inquiries");

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("title")}</h1>
          <p className="text-muted-foreground mt-1">Manage buyer inquiries and RFQs</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-outline btn-sm">
            <Download className="h-4 w-4 mr-2" />
            Export
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
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="text" placeholder="Search inquiries..." className="input pl-10" />
              </div>
              <select className="input w-auto">
                <option value="">All Status</option>
                <option value="NEW">New</option>
                <option value="CONTACTED">Contacted</option>
                <option value="QUOTED">Quoted</option>
                <option value="NEGOTIATING">Negotiating</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="CLOSED">Closed</option>
                <option value="LOST">Lost</option>
              </select>
              <select className="input w-auto">
                <option value="">All Assignees</option>
                <option value="sarah">Sarah Johnson</option>
                <option value="mike">Mike Chen</option>
                <option value="unassigned">Unassigned</option>
              </select>
            </div>
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
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Qty</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Priority</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Assigned To</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mockInquiries.map((row, index) => (
                  <tr key={index} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 text-sm font-mono font-medium text-foreground">{row.id}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{row.buyer}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{row.company}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{row.product}</td>
                    <td className="px-4 py-3 text-right text-sm text-foreground">{row.qty.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`badge ${statusStyles[row.status]}`}>{row.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge ${row.priority === "URGENT" ? "badge-destructive" : row.priority === "HIGH" ? "badge-warning" : "badge-outline"}`}>
                        {row.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{row.assigned || "Unassigned"}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{row.date}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="btn btn-ghost btn-sm" aria-label="View">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="btn btn-ghost btn-sm" aria-label="Edit">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="btn btn-ghost btn-sm" aria-label="Flag">
                          <Flag className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Showing 6 of 24 inquiries</p>
            <div className="flex items-center gap-1">
              <button className="btn btn-outline btn-sm" disabled>Previous</button>
              <button className="btn btn-outline btn-sm">1</button>
              <button className="btn btn-outline btn-sm">2</button>
              <button className="btn btn-outline btn-sm">3</button>
              <button className="btn btn-outline btn-sm">Next</button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}