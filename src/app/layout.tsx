import type { Metadata } from "next";
import { Inter, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sans-sc",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shunyi Garments - Excellence in Garment Manufacturing",
  description: "Leading garment manufacturer with international compliance standards, sustainable practices, and world-class production capabilities.",
  keywords: ["garment manufacturing", "textile", "apparel", "knitwear", "woven", "denim", "outerwear", "Bangladesh"],
  authors: [{ name: "Shunyi Garments" }],
  creator: "Shunyi Garments",
  publisher: "Shunyi Garments",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shunyigarments.com",
    siteName: "Shunyi Garments",
    title: "Shunyi Garments - Excellence in Garment Manufacturing",
    description: "Leading garment manufacturer with international compliance standards, sustainable practices, and world-class production capabilities.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansSC.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}