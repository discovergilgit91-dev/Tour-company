import type { Metadata } from "next";
import { BLOG_POSTS, type BlogPost } from "@/lib/blog";
import { SITE_LEGAL_NAME, SITE_LOGO_PATH, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

/* ------------------------------------------------------------------ *
 * Metadata
 *
 * A page's own `openGraph` replaces the root layout's wholesale (Next only
 * shallow-merges), so siteName and locale are repeated here on purpose.
 * `metadataBase` is set per blog page so relative URLs resolve to the real
 * origin without changing how any other page's metadata is resolved.
 * ------------------------------------------------------------------ */

const OPEN_GRAPH_BASE = { siteName: SITE_NAME, locale: "en_US" } as const;

export const BLOG_LISTING_PATH = "/blog";

export function blogPostPath(post: Pick<BlogPost, "slug">): string {
  return `${BLOG_LISTING_PATH}/${post.slug}`;
}

/** "<title> | Discover Gilgit" — uses the post's shorter `seoTitle` when the full title would run past ~60 characters. */
export function blogPostTitle(post: BlogPost): string {
  return `${post.seoTitle ?? post.title} | ${SITE_NAME}`;
}

export function blogPostMetadata(post: BlogPost): Metadata {
  const title = blogPostTitle(post);
  const url = absoluteUrl(blogPostPath(post));
  const image = {
    url: absoluteUrl(post.featuredImage),
    width: post.featuredImageSize.width,
    height: post.featuredImageSize.height,
    alt: post.featuredImageAlt,
  };

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: post.seoDescription,
    keywords: post.keywords,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    alternates: { canonical: url },
    openGraph: {
      ...OPEN_GRAPH_BASE,
      type: "article",
      url,
      title,
      description: post.seoDescription,
      publishedTime: post.publishDate,
      modifiedTime: post.modifiedDate ?? post.publishDate,
      section: post.category,
      tags: post.keywords,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.seoDescription,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}

const LISTING_TITLE = `Gilgit-Baltistan Travel Blog & Guides | ${SITE_NAME}`;
const LISTING_DESCRIPTION =
  "Travel guides for Gilgit-Baltistan: best time to visit, the Fairy Meadows trek, Deosai Plains and what's included on a guided trip.";
const LISTING_KEYWORDS = [
  "Gilgit-Baltistan travel blog",
  "Gilgit-Baltistan travel guide",
  "northern Pakistan trekking guides",
  "Hunza travel tips",
];

export function blogListingMetadata(): Metadata {
  const url = absoluteUrl(BLOG_LISTING_PATH);
  // The newest post's photo stands in as the listing's share image.
  const lead = BLOG_POSTS[0];
  const images = lead
    ? [
        {
          url: absoluteUrl(lead.featuredImage),
          width: lead.featuredImageSize.width,
          height: lead.featuredImageSize.height,
          alt: lead.featuredImageAlt,
        },
      ]
    : undefined;

  return {
    metadataBase: new URL(SITE_URL),
    title: LISTING_TITLE,
    description: LISTING_DESCRIPTION,
    keywords: LISTING_KEYWORDS,
    alternates: { canonical: url },
    openGraph: {
      ...OPEN_GRAPH_BASE,
      type: "website",
      url,
      title: LISTING_TITLE,
      description: LISTING_DESCRIPTION,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: LISTING_TITLE,
      description: LISTING_DESCRIPTION,
      images: images?.map(({ url: src, alt }) => ({ url: src, alt })),
    },
  };
}

/* ------------------------------------------------------------------ *
 * Structured data (schema.org JSON-LD). Plain builders returning objects —
 * render them with <JsonLd data={...} />.
 * ------------------------------------------------------------------ */

export type JsonLdObject = Record<string, unknown>;

export function organizationJsonLd({ withLogo = true }: { withLogo?: boolean } = {}): JsonLdObject {
  return {
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: SITE_LEGAL_NAME,
    url: SITE_URL,
    ...(withLogo ? { logo: { "@type": "ImageObject", url: absoluteUrl(SITE_LOGO_PATH) } } : {}),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function blogPostCrumbs(post: BlogPost): Crumb[] {
  return [
    { name: "Home", path: "/" },
    { name: "Blog", path: BLOG_LISTING_PATH },
    { name: post.title, path: blogPostPath(post) },
  ];
}

export function blogPostingJsonLd(post: BlogPost): JsonLdObject {
  const url = absoluteUrl(blogPostPath(post));
  const publisher = organizationJsonLd();

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline: post.title,
    description: post.seoDescription,
    image: [absoluteUrl(post.featuredImage)],
    datePublished: post.publishDate,
    dateModified: post.modifiedDate ?? post.publishDate,
    author: organizationJsonLd({ withLogo: false }),
    publisher,
    articleSection: post.category,
    keywords: post.keywords.join(", "),
    wordCount: post.wordCount,
    timeRequired: `PT${post.readMinutes}M`,
    inLanguage: "en",
  };
}

export function blogListingJsonLd(posts: BlogPost[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Journal`,
    description: LISTING_DESCRIPTION,
    url: absoluteUrl(BLOG_LISTING_PATH),
    inLanguage: "en",
    publisher: organizationJsonLd(),
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: absoluteUrl(blogPostPath(post)),
      datePublished: post.publishDate,
      image: absoluteUrl(post.featuredImage),
    })),
  };
}
