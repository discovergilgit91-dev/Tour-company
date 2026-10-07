import type { Metadata } from "next";
import Hero from "@/components/Hero";
import BlogExplorer from "@/components/BlogExplorer";
import JsonLd from "@/components/JsonLd";
import { BLOG_POSTS } from "@/lib/blog";
import { BLOG_LISTING_PATH, blogListingJsonLd, blogListingMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = blogListingMetadata();

const LISTING_CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Blog", path: BLOG_LISTING_PATH },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-cream">
      <JsonLd data={[blogListingJsonLd(BLOG_POSTS), breadcrumbJsonLd(LISTING_CRUMBS)]} />
      <Hero
        eyebrow="THE JOURNAL"
        title="Stories and notes from the high country."
        description="Planning guides, trek notes and good-to-know basics from the local guides who call these mountains home."
        image="/Images/tours/shimsal-valley2.png"
        imageAlt="A wide valley horizon ringed by snow-capped peaks in Gilgit-Baltistan"
      />

      <section className="relative isolate w-full overflow-hidden bg-cream pb-2 pt-12 sm:pt-14 lg:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-green/5 blur-3xl"
        />
        <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              <span className="h-px w-8 bg-muted/60" />
              Latest articles
            </div>
            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-forest sm:text-5xl lg:text-6xl">
              Read before you
              <br />
              <span className="text-green">go</span>
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              When to travel, what to expect on the trail and what a trip with us includes — written from the notes
              our guides keep for every destination.
            </p>
          </div>
        </div>
      </section>

      <BlogExplorer posts={BLOG_POSTS} />
    </main>
  );
}
