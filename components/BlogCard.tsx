"use client";

import Image from "next/image";
import Link from "next/link";
import { formatBlogDate, type BlogPost } from "@/lib/blog";
import { useRevealOnScroll } from "./DestinationCard";
import { ArrowIcon } from "./ui/icons";

/**
 * Article card — same anatomy as DestinationCard (rounded photo with a gold
 * pill and a round arrow button, a hairline that fills green on hover, serif
 * title, muted excerpt, green uppercase tag). `featured` lays the same pieces
 * out side by side on large screens for the newest post.
 */
export default function BlogCard({
  post,
  delay = 0,
  featured = false,
}: {
  post: BlogPost;
  delay?: number;
  featured?: boolean;
}) {
  const { ref, visible } = useRevealOnScroll<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      href={`/blog/${post.slug}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={[
        "group flex h-full rounded-[22px] outline-none",
        featured ? "flex-col lg:flex-row lg:items-center lg:gap-10" : "flex-col",
        "focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-4 focus-visible:ring-offset-cream",
        "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      ].join(" ")}
    >
      <div
        className={`relative shrink-0 overflow-hidden rounded-[22px] bg-forest ${
          featured ? "aspect-[4/3] w-full lg:aspect-[16/11] lg:w-[58%]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={post.featuredImage}
          alt={post.featuredImageAlt}
          fill
          quality={85}
          sizes={
            featured
              ? "(min-width: 1024px) 620px, 100vw"
              : "(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
          }
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-gold px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-forest shadow-[0_4px_14px_rgba(0,0,0,0.18)]">
          {post.category}
        </span>

        <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-cream text-forest shadow-[0_6px_20px_rgba(0,0,0,0.18)] transition-colors duration-300 group-hover:bg-green group-hover:text-white">
          <span className="transition-transform duration-300 ease-out group-hover:-rotate-45">
            <ArrowIcon size={16} />
          </span>
        </span>
      </div>

      <div className={`flex flex-1 flex-col ${featured ? "mt-5 lg:mt-0" : "mt-4"}`}>
        <div className="flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          <time dateTime={post.publishDate}>{formatBlogDate(post.publishDate)}</time>
          <span>{post.readTime}</span>
        </div>

        <div className="relative mt-3 h-px bg-forest/10">
          <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-green transition-transform duration-500 ease-out group-hover:scale-x-100" />
        </div>

        <h3
          className={`mt-4 font-serif leading-tight tracking-tight text-forest ${
            featured ? "text-3xl sm:text-4xl" : "line-clamp-2 min-h-[60px] text-2xl"
          }`}
        >
          {post.title}
        </h3>
        <p
          className={`mt-2 text-sm leading-relaxed text-muted ${
            featured ? "sm:text-base" : "line-clamp-4 min-h-24"
          }`}
        >
          {post.excerpt}
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-green">
          Read article
          <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
            <ArrowIcon size={12} />
          </span>
        </p>
      </div>
    </Link>
  );
}
