
import "./globals.css";
import { Suspense } from "react";
import type { Metadata } from "next";

import { isLoggedIn } from "@/lib/auth";
import Navbar from "@/components/layout/navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://shunyi.vercel.app"),

  title: {
    default: "Shunyi Garments | Factory Management",
    template: "%s | Shunyi Garments",
  },

  description:
    "Shunyi Garments factory management system for employee management, attendance, payroll, production, inventory and orders.",

  applicationName: "Shunyi Garments",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: false,
    follow: false,
  },
};

async function NavbarWrapper() {
  const loggedIn = await isLoggedIn();
  return <Navbar loggedIn={loggedIn} />;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Suspense fallback={<div className="h-16 border-b" />}>
          <NavbarWrapper />
        </Suspense>

        <main>{children}</main>
      </body>
    </html>
  );
}
