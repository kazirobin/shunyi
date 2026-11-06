"use client";

export const dynamic = "force-dynamic";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Search, Filter, Download, Mail, Eye, Edit, Flag } from "lucide-react";

const statusStyles: Record<string, string> = {
  NEW: "badge-info",
  CONTACTED: "badge-warning",
  QUOTED: "badge-purple",
  NEGOTIATING: "badge-orange",
  CONFIRMED: "badge-success",
  CLOSED: "badge-gray",
  LOST: "badge-error",
};

const inquiries = [
  { id: "RFQ-2024-001", buyer: "H&M", company: "Hennes & Mauritz", product: "Knitwear", status: "NEW", date: "2024-01-15", assignedTo: "John Doe" },
  { id: "RFQ-2024-002", buyer: "Zara", company: "Inditex Group", product: "Denim", status: "QUOTED", date: "2024-01-14", assignedTo: "Jane Smith" },
  { id: "RFQ-2024-003", buyer: "Uniqlo", company: "Fast Retailing", product: "Woven", status: "CONTACTED", date: "2024-01-13", assignedTo: "Bob Wilson" },
  { id: "RFQ-2024-004", buyer: "Gap", company: "Gap Inc.", product: "Outerwear", status: "NEW", date: "2024-01-12", assignedTo: "Alice Brown" },
  { id: "RFQ-2024-005", buyer: "C&A", company: "C&A Europe", product: "Knitwear", status: "CLOSED", date: "2024-01-11", assignedTo: "Charlie Davis" },
];

export default function InquiriesPage() {
  const t = useTranslations("admin.inquiries");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("title")}</h1>
          <p className="text-muted-foreground mt-1">{t("overview")}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Mail className="h-5 w-5 text-primary" />
              <span className="ml-2">{t("allInquiries")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <select className="input input-sm w-auto">
                <option>All Status</option>
                <option>NEW</option>
                <option>CONTACTED</option>
                <option>QUOTED</option>
                <option>NEGOTIATING</option>
                <option>CONFIRMED</option>
                <option>CLOSED</option>
                <option>LOST</option>
              </select>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  className="input input-sm pl-10 w-64"
                />
              </div>
            </div>
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
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">{t("assignedTo")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{inquiry.id}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{inquiry.buyer}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{inquiry.company}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{inquiry.product}</td>
                    <td className="px-4 py-3">
                      <span className={`badge badge-outline ${statusStyles[inquiry.status] || "badge-gray"}`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{inquiry.date}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{inquiry.assignedTo}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="h-8 w-8 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="View">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="h-8 w-8 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="Edit">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="h-8 w-8 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="Flag">
                          <Flag className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}