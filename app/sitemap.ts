
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://shunyi.vercel.app";
  const languages = { en: baseUrl, "zh-CN": `${baseUrl}/zh` };

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${baseUrl}/zh`,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${baseUrl}/products`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
