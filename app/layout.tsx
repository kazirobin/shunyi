
import "./globals.css";
import "@/components/public/shunyi.css";
import { Suspense } from "react";
import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter_Tight } from "next/font/google";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

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
    <html lang="en" className={`${interTight.variable} ${plexMono.variable}`}>
      <body suppressHydrationWarning>
        <Suspense fallback={<div className="h-18" />}>
          <NavbarWrapper />
        </Suspense>

        <main>{children}</main>
      </body>
    </html>
  );
}
