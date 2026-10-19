import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = "https://ydvamar.online";

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/amar.webp", "/assets/"],
      disallow: ["/api/", "/admin/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
