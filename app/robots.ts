import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Signed-in and API-only areas have nothing for a search engine to index.
      disallow: ["/api/", "/account", "/auth/", "/reset-password"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
