import type { MetadataRoute } from "next";
import { clinic } from "@/data/clinic";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: clinic.siteUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${clinic.siteUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
