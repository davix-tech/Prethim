import type { MetadataRoute } from "next";

const siteUrl = "https://prethim.site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/reden`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/docs`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/docs/reden`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
