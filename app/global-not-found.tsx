import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { interTight } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Page not found | Shunyi Garments",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={interTight.variable}>
      <body className="flex min-h-svh flex-col items-center justify-center gap-4 bg-[#0c1a33] px-6 text-center text-white [font-family:var(--font-inter-tight)]">
        <p className="text-sm text-[#ff5a1f]">404</p>
        <h1 className="text-3xl font-semibold tracking-tight">This page does not exist</h1>
        <p className="max-w-sm text-white/60">The link may be out of date. Head back to the Shunyi home page.</p>
        <Link href="/" className="mt-2 rounded-full bg-[#ff5a1f] px-5 py-2.5 text-sm font-medium">
          Go to home page
        </Link>
      </body>
    </html>
  );
}
