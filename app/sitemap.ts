import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog";
import { DESTINATIONS } from "@/lib/destinations";
import { blogPostPath, BLOG_LISTING_PATH } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { getAllTourSlugs } from "@/lib/tourDetails";

// Public pages that aren't generated from a data file. Sign-in/sign-up,
// password reset and /account are left out on purpose (see app/robots.ts).
const STATIC_PATHS = [
  "/",
  "/lands",
  "/tours",
  "/tours/gilgit-cultural-festival",
  "/tours/gilgit-cultural-festival/gallery",
  "/plan-your-trip",
  "/build-your-trip",
  "/book",
  "/traveler-stories",
  "/terms",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = BLOG_POSTS.reduce<string | undefined>(
    (latest, post) => {
      const changed = post.modifiedDate ?? post.publishDate;
      return !latest || changed > latest ? changed : latest;
    },
    undefined
  );

  const staticEntries = STATIC_PATHS.map((path) => ({ url: absoluteUrl(path) }));

  const destinationEntries = DESTINATIONS.filter((destination) => destination.slug).map((destination) => ({
    url: absoluteUrl(`/destinations/${destination.slug}`),
  }));

  const tourEntries = getAllTourSlugs().map((slug) => ({ url: absoluteUrl(`/tours/${slug}`) }));

  const blogEntries: MetadataRoute.Sitemap = [
    { url: absoluteUrl(BLOG_LISTING_PATH), lastModified: latestPost, changeFrequency: "weekly", priority: 0.7 },
    ...BLOG_POSTS.map((post) => ({
      url: absoluteUrl(blogPostPath(post)),
      lastModified: post.modifiedDate ?? post.publishDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return [...staticEntries, ...destinationEntries, ...tourEntries, ...blogEntries];
}
