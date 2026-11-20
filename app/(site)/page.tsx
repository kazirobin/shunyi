import type { Metadata } from "next";
import { getDict } from "@/components/public/content";
import { Landing } from "@/components/public/landing";

const t = getDict("en");

export const metadata: Metadata = {
  title: { absolute: t.meta.title },
  description: t.meta.description,
  alternates: {
    canonical: "/",
    languages: { en: "/", "zh-CN": "/zh" },
  },
};

export default function HomePage() {
  return <Landing locale="en" />;
}
