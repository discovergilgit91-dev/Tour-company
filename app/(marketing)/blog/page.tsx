import type { Metadata } from "next";
import Image from "next/image";
import BlogExplorer from "@/components/BlogExplorer";
import JsonLd from "@/components/JsonLd";
import { PeaksMotif } from "@/components/tours/motifs";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/lib/blog";
import { BLOG_LISTING_PATH, blogListingJsonLd, blogListingMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = blogListingMetadata();

const LISTING_CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Blog", path: BLOG_LISTING_PATH },
];

export default function BlogPage() {
  const topicCount = BLOG_CATEGORIES.filter((category) => BLOG_POSTS.some((post) => post.category === category)).length;
  const stats = [
    { value: String(BLOG_POSTS.length), label: "Articles" },
    { value: String(topicCount), label: "Topics" },
    { value: "Local", label: "Guides' notes" },
  ];

  return (
    <main className="min-h-screen bg-cream">
      <JsonLd data={[blogListingJsonLd(BLOG_POSTS), breadcrumbJsonLd(LISTING_CRUMBS)]} />

      {/* ---------------- Hero — same photo treatment as the Traveler Stories page ---------------- */}
      <section className="relative overflow-hidden bg-forest">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/Images/tours/shimsal-valley2.png"
            alt="A wide valley horizon ringed by snow-capped peaks in Gilgit-Baltistan"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/75 via-forest/35 to-transparent sm:from-forest/70 sm:via-forest/25" />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 top-10 h-[380px] w-[380px] rounded-full bg-gold/10 blur-3xl"
          />
          <PeaksMotif className="absolute inset-x-0 bottom-0 h-[55%] w-full text-cream/[0.05]" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/55 via-transparent to-forest/10" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8 lg:pb-24 lg:pt-44">
          <div className="max-w-2xl">
            <span className="mb-7 inline-flex items-center gap-2 rounded-full bg-cream/95 px-4 py-1.5 text-[10px] font-semibold tracking-wide text-green sm:text-xs">
              THE JOURNAL
            </span>

            <h1 className="font-serif text-[34px] font-semibold leading-[1.1] tracking-tight text-cream sm:text-5xl lg:text-6xl">
              Stories from the <span className="heading-accent">high country.</span>
            </h1>

            <p className="mt-5 max-w-xl text-[13.5px] leading-relaxed text-cream/85 sm:text-base md:text-lg">
              Planning guides, trek notes and good-to-know basics from the local guides who call these mountains home.
            </p>

            <ul className="mt-9 flex items-center gap-x-8 gap-y-4 border-t border-cream/15 pt-6 sm:gap-x-10">
              {stats.map((stat) => (
                <li key={stat.label}>
                  <p className="font-serif text-2xl text-gold sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-[11px] leading-snug text-cream/60">{stat.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 z-10 h-px bg-gradient-to-r from-gold/60 via-gold/20 to-transparent"
        />
      </section>

      <BlogExplorer posts={BLOG_POSTS} />
    </main>
  );
}
