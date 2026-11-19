
import Link from "next/link";
import Navbar from "@/components/layout/navbar";

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-[#0B1120] text-white">
      <Navbar variant="admin" />

      <div className="mx-auto max-w-7xl space-y-8 p-6 md:p-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-slate-400">
            Welcome to Shunyi Garments Management Portal.
          </p>
        </div>

        {/* Dashboard Overview */}
        <div className="rounded-xl border border-slate-800 bg-[#111827] p-6">
          <h2 className="text-xl font-semibold">
            Dashboard Overview
          </h2>

          <p className="mt-2 text-slate-400">
            Your management dashboard is ready.
          </p>

          <Link
            href="/"
            className="mt-5 inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
