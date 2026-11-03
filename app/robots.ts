import type { MetadataRoute } from "next";

const siteUrl = "https://www.prethim.name.ng";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/signin/",
          "/api/",
          "/reden-addstore/",
          "/installation/",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
