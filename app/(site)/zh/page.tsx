import type { Metadata } from "next";
import { getDict } from "@/components/public/content";
import { Landing } from "@/components/public/landing";

const t = getDict("zh");

export const metadata: Metadata = {
  title: { absolute: t.meta.title },
  description: t.meta.description,
  alternates: {
    canonical: "/zh",
    languages: { en: "/", "zh-CN": "/zh" },
  },
};

export default function HomePageZh() {
  return <Landing locale="zh" />;
}
