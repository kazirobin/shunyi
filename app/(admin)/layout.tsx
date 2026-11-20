import "../globals.css";
import "@/components/admin/admin.css";
import type { Metadata } from "next";

import { TooltipProvider } from "@/components/ui/tooltip";
import { interTight, notoBengali, plexMono } from "@/lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://shunyi.vercel.app"),
  title: {
    default: "Admin | Shunyi Garments",
    template: "%s | Shunyi Admin",
  },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`admin ${interTight.variable} ${plexMono.variable} ${notoBengali.variable}`}>
      <body suppressHydrationWarning>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
