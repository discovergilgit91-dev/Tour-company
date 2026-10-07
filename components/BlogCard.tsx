"use client";

import Image from "next/image";
import Link from "next/link";
import { formatBlogDate, type BlogPost } from "@/lib/blog";
import { useRevealOnScroll } from "./DestinationCard";
import { ArrowIcon, CalendarIcon, ClockIcon } from "./ui/icons";

/**
 * Article card. Same family as the Traveler Stories and destination cards: a
 * white rounded-[22px] card with the site's soft shadow, a photo that slowly
 * zooms on hover, a card that lifts, and a hairline that fills green. The
 * title carries the weight; date and read time stay small and quiet beneath
 * the category. `featured` lays the same pieces out side by side for the
 * newest post.
 */

const CARD_SHADOW = "shadow-[0_2px_18px_rgba(18,36,28,0.06)]";
const CARD_HOVER =
  "transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_22px_44px_-18px_rgba(18,36,28,0.22)] motion-reduce:transition-none motion-reduce:hover:translate-y-0";
const FOCUS_RING =
  "outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-4 focus-visible:ring-offset-cream";

function Meta({ post, className = "" }: { post: BlogPost; className?: string }) {
  return (
    <p
      className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted ${className}`}
    >
      <span className="inline-flex items-center gap-1.5">
        <CalendarIcon size={12} />
        <time dateTime={post.publishDate}>{formatBlogDate(post.publishDate)}</time>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <ClockIcon size={12} />
        {post.readTime}
      </span>
    </p>
  );
}

function Hairline() {
  return (
    <div className="relative h-px bg-forest/10">
      <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-green transition-transform duration-500 ease-out group-hover:scale-x-100" />
    </div>
  );
}

export default function BlogCard({
  post,
  delay = 0,
  featured = false,
}: {
  post: BlogPost;
  delay?: number;
  featured?: boolean;
}) {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`h-full transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {featured ? (
        <Link
          href={`/blog/${post.slug}`}
          className={`group grid h-full overflow-hidden rounded-[22px] bg-white ring-1 ring-gold/25 lg:grid-cols-[1.15fr_1fr] ${CARD_SHADOW} ${CARD_HOVER} ${FOCUS_RING}`}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-forest lg:aspect-auto lg:min-h-[440px]">
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt}
              fill
              quality={85}
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2 sm:left-5 sm:top-5">
              <span className="inline-flex items-center rounded-full bg-gold px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-forest shadow-[0_4px_14px_rgba(0,0,0,0.18)]">
                {post.category}
              </span>
              <span className="inline-flex items-center rounded-full border border-cream/25 bg-night/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream backdrop-blur-sm">
                Latest
              </span>
            </div>
          </div>

          <div className="relative flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-gold/70 via-gold/20 to-transparent"
            />
            <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              <span className="h-px w-8 bg-muted/60" />
              Latest article
            </div>

            <h3 className="font-serif text-[28px] leading-[1.1] tracking-tight text-forest sm:text-4xl">{post.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{post.excerpt}</p>

            <div className="mt-6">
              <Hairline />
            </div>
            <Meta post={post} className="mt-4" />

            <span className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-green px-6 py-3 font-sans text-sm font-semibold text-white transition-colors duration-300 group-hover:bg-green-dark">
              Read article
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                <ArrowIcon size={14} />
              </span>
            </span>
          </div>
        </Link>
      ) : (
        <Link
          href={`/blog/${post.slug}`}
          className={`group flex h-full flex-col overflow-hidden rounded-[22px] bg-white ${CARD_SHADOW} ${CARD_HOVER} ${FOCUS_RING}`}
        >
          <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-forest">
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt}
              fill
              quality={85}
              sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-gold px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-forest shadow-[0_4px_14px_rgba(0,0,0,0.18)]">
              {post.category}
            </span>
            <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-cream text-forest shadow-[0_6px_20px_rgba(0,0,0,0.18)] transition-colors duration-300 group-hover:bg-green group-hover:text-white">
              <span className="transition-transform duration-300 ease-out group-hover:-rotate-45">
                <ArrowIcon size={16} />
              </span>
            </span>
          </div>

          <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
            <Meta post={post} />
            <div className="mt-4">
              <Hairline />
            </div>
            <h3 className="mt-4 line-clamp-2 font-serif text-2xl leading-tight tracking-tight text-forest">
              {post.title}
            </h3>
            <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
            <p className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-green">
              Read article
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                <ArrowIcon size={12} />
              </span>
            </p>
          </div>
        </Link>
      )}
    </div>
  );
}
