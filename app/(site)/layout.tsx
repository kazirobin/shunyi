import "../globals.css";
import "@/components/public/shunyi.css";
import type { Metadata } from "next";

import PublicNav from "@/components/public/nav";
import { interTight, plexMono } from "@/lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://shunyi.vercel.app"),
  title: {
    default: "Shunyi Garments",
    template: "%s | Shunyi Garments",
  },
  applicationName: "Shunyi Garments",
  robots: { index: false, follow: false },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interTight.variable} ${plexMono.variable}`}>
      <body suppressHydrationWarning>
        <PublicNav />
        <main>{children}</main>
      </body>
    </html>
  );
}
