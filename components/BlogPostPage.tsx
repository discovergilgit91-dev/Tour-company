import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { formatBlogDate, getMorePosts, type BlogBlock, type BlogPost } from "@/lib/blog";
import { blogPostCrumbs, blogPostPath, blogPostingJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { TOUR_HERO_IMAGES, getTourDetail } from "@/lib/tourDetails";
import BlogCard from "./BlogCard";
import BlogShare from "./BlogShare";
import JsonLd from "./JsonLd";
import { LinkButton } from "./ui/Button";
import { ArrowIcon, CalendarIcon, ClockIcon, CompassIcon } from "./ui/icons";

const INLINE_LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

/** Turns [label](/path) markup in body text into real internal links; everything else stays plain text. */
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(INLINE_LINK)) {
    const start = match.index ?? 0;
    if (start > last) nodes.push(text.slice(last, start));
    nodes.push(
      <Link
        key={start}
        href={match[2]}
        className="font-medium text-green underline decoration-green/30 underline-offset-[3px] transition-colors duration-300 hover:text-green-dark hover:decoration-green-dark/60"
      >
        {match[1]}
      </Link>
    );
    last = start + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/** "Day 1 — …", "Easy: …", "Hunza blossom: …" — gives a short lead-in label a little weight. */
const LEAD_IN = /^([^—:[\]]{2,32}?)(\s—|:)\s/;

function renderListItem(item: string): ReactNode {
  const match = item.match(LEAD_IN);
  if (!match) return renderInline(item);
  return (
    <>
      <span className="font-semibold text-forest">
        {match[1]}
        {match[2]}
      </span>{" "}
      {renderInline(item.slice(match[0].length))}
    </>
  );
}

// Same gold button the homepage closing banner uses.
const GOLD_BUTTON =
  "group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-sans text-sm font-semibold text-forest transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-gold/90 active:translate-y-0 active:scale-[0.97]";

const BODY_TEXT = "text-[16px] leading-[1.85] text-forest/80 sm:text-[17.5px] sm:leading-[1.9]";

function renderBlock(block: BlogBlock, index: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={index}
          className="mt-14 font-serif text-[28px] leading-[1.15] tracking-tight text-forest before:mb-5 before:block before:h-[3px] before:w-10 before:rounded-full before:bg-gold before:content-[''] sm:mt-16 sm:text-[34px]"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={index} className="mt-10 font-serif text-xl leading-snug tracking-tight text-forest sm:text-2xl">
          {block.text}
        </h3>
      );
    case "list":
      return (
        <ul key={index} className="mt-6 space-y-3.5">
          {block.items.map((item) => (
            <li key={item} className={`flex items-start gap-3.5 ${BODY_TEXT}`}>
              <span className="mt-[0.82em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              <span>{renderListItem(item)}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <figure
          key={index}
          className="relative mt-12 overflow-hidden rounded-[22px] border border-forest/10 bg-white px-6 py-9 text-center shadow-[0_2px_18px_rgba(18,36,28,0.06)] sm:px-10 sm:py-11"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute left-4 top-0 select-none font-serif text-[96px] leading-none text-gold/20 sm:left-7 sm:text-[120px]"
          >
            &ldquo;
          </span>
          <blockquote className="relative font-serif text-xl italic leading-snug text-forest sm:text-[26px]">
            {block.text}
          </blockquote>
          {block.cite && (
            <figcaption className="relative mt-6">
              <span className="mx-auto mb-4 flex w-fit items-center gap-3">
                <span className="h-px w-8 bg-gold/40" />
                <span className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
                <span className="h-px w-8 bg-gold/40" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{block.cite}</span>
            </figcaption>
          )}
        </figure>
      );
    case "callout":
      return (
        <aside
          key={index}
          className="relative mt-12 flex gap-4 overflow-hidden rounded-[22px] border border-gold/30 bg-gold/[0.07] p-5 sm:gap-5 sm:p-7"
        >
          <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-gold" />
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-white/60 text-gold">
            <CompassIcon size={18} />
          </span>
          <div className="min-w-0">
            <h3 className="font-serif text-xl leading-snug text-forest">{block.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-forest/80 sm:text-base">{renderInline(block.text)}</p>
          </div>
        </aside>
      );
    default:
      // The opening paragraph reads as a standfirst: larger and darker than the body copy.
      return index === 0 ? (
        <p key={index} className="text-[19px] leading-[1.7] text-forest/90 sm:text-[22px] sm:leading-[1.65]">
          {renderInline(block.text)}
        </p>
      ) : (
        <p key={index} className={`mt-6 ${BODY_TEXT}`}>
          {renderInline(block.text)}
        </p>
      );
  }
}

/** The tour (if any) this article points at, so the closing banner can sell that specific trip. */
function featuredTour(post: BlogPost) {
  for (const link of post.related) {
    const match = link.href.match(/^\/tours\/([a-z0-9-]+)$/);
    const tour = match ? getTourDetail(match[1]) : undefined;
    if (tour) return { tour, image: TOUR_HERO_IMAGES[tour.slug] };
  }
  return undefined;
}

/**
 * One article: a full-bleed photo hero (same pattern as the destination pages,
 * with a stronger overlay), a single readable column of long-form copy, then
 * share, "plan it" links, more reading and a closing call to action.
 */
export default function BlogPostPage({ post }: { post: BlogPost }) {
  const more = getMorePosts(post, 3);
  const pick = featuredTour(post);
  const ctaImage = pick?.image ?? { src: post.featuredImage, alt: post.featuredImageAlt };

  return (
    <main className="bg-cream">
      <JsonLd data={[blogPostingJsonLd(post), breadcrumbJsonLd(blogPostCrumbs(post))]} />

      {/* The hero and the body are one <article>: the header carries the single
          <h1>, the body's section headings are <h2>/<h3> beneath it. */}
      <article>
        {/* ---------------- Hero ---------------- */}
        <header className="relative overflow-hidden bg-forest">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt}
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-forest/45" />
            <div className="absolute inset-0 bg-gradient-to-r from-forest/60 via-forest/10 to-transparent" />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-24 bottom-0 h-[380px] w-[380px] rounded-full bg-gold/10 blur-3xl"
            />
          </div>

          <div className="relative z-10 mx-auto flex min-h-[72svh] max-w-6xl flex-col justify-end px-5 pb-24 pt-40 sm:min-h-[76svh] sm:px-6 sm:pb-28 sm:pt-44 lg:px-8 lg:pb-32">
            <Link
              href="/blog"
              className="group mb-auto inline-flex w-fit items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-cream/75 transition-colors duration-300 hover:text-cream"
            >
              <span className="rotate-180 transition-transform duration-300 ease-out group-hover:-translate-x-1">
                <ArrowIcon size={13} />
              </span>
              Back to the blog
            </Link>

            <div className="mt-10 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center rounded-full bg-cream/95 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-green sm:text-xs">
                  {post.category}
                </span>
                <p className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-cream/20 bg-night/40 px-3.5 py-1.5 text-[11px] font-semibold text-cream/90 backdrop-blur-sm sm:text-xs">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarIcon size={13} />
                    <time dateTime={post.publishDate}>{formatBlogDate(post.publishDate)}</time>
                  </span>
                  <span aria-hidden className="h-1 w-1 rounded-full bg-gold" />
                  <span className="inline-flex items-center gap-1.5">
                    <ClockIcon size={13} />
                    {post.readTime}
                  </span>
                </p>
              </div>

              <h1 className="mt-6 font-serif text-[34px] font-semibold leading-[1.08] tracking-tight text-cream [text-shadow:0_2px_16px_rgba(0,0,0,0.5)] sm:text-5xl md:text-6xl">
                {post.title}
              </h1>
              <span aria-hidden className="mt-6 block h-px w-16 bg-gold/70" />
              <p className="mt-5 max-w-2xl text-[13.5px] leading-relaxed text-cream/85 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] sm:text-base md:text-lg">
                {post.excerpt}
              </p>
            </div>
          </div>
        </header>

        {/* ---------------- Article body — sits over the hero's lower edge ---------------- */}
        <div className="relative -mt-10 rounded-t-[32px] bg-cream pb-8 pt-12 sm:-mt-12 sm:pt-16 lg:pt-20">
          <div className="mx-auto w-full max-w-[776px] px-5 sm:px-6 lg:px-8">
            <div>{post.body.map(renderBlock)}</div>

            <div className="mt-16 border-t border-forest/10 pt-8">
              <BlogShare url={absoluteUrl(blogPostPath(post))} title={post.title} />
            </div>

            {post.related.length > 0 && (
              <div className="mt-10 rounded-[22px] border border-forest/10 bg-white p-5 shadow-[0_2px_18px_rgba(18,36,28,0.06)] sm:p-7">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Plan it</h2>
                <ul className="mt-3 divide-y divide-forest/10">
                  {post.related.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group relative -mx-3 flex items-center justify-between gap-4 rounded-xl px-3 py-3.5 outline-none transition-colors duration-200 hover:bg-gold/[0.09] focus-visible:bg-gold/[0.09] focus-visible:ring-2 focus-visible:ring-green"
                      >
                        <span className="min-w-0 transition-transform duration-300 ease-out group-hover:translate-x-1">
                          <span className="block font-serif text-lg text-forest transition-colors duration-300 group-hover:text-green">
                            {link.label}
                          </span>
                          <span className="mt-0.5 block text-sm leading-relaxed text-muted">{link.description}</span>
                        </span>
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest/[0.06] text-forest transition-colors duration-300 group-hover:bg-green group-hover:text-white">
                          <ArrowIcon size={14} />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* ---------------- More reading ---------------- */}
      {more.length > 0 && (
        <section className="pb-20 pt-16 sm:pb-24 sm:pt-20 lg:pb-28">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              <span className="h-px w-8 bg-muted/60" />
              Keep reading
            </div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-forest sm:text-4xl">
              More from the <span className="text-green">blog</span>
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-12">
              {more.map((item, index) => (
                <BlogCard key={item.slug} post={item} delay={index * 90} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- Closing call to action — same banner pattern as the homepage ---------------- */}
      <section className="relative w-full overflow-hidden">
        <div className="relative min-h-[420px] w-full bg-night sm:min-h-[460px]">
          <Image
            src={ctaImage.src}
            alt=""
            aria-hidden
            fill
            quality={85}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-night/90 via-night/60 to-night/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-night/50 via-transparent to-transparent" />

          <div className="relative z-10 mx-auto flex min-h-[420px] w-full max-w-6xl items-center px-5 sm:min-h-[460px] sm:px-6 lg:px-8">
            <div className="max-w-xl py-16 sm:py-20">
              {pick ? (
                <>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">Take this trip</p>
                  <h2 className="mt-3 font-serif text-3xl leading-[1.1] tracking-tight text-cream sm:text-4xl lg:text-[44px]">
                    {pick.tour.title}
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/80 sm:text-base">
                    {pick.tour.tagline}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {[pick.tour.duration, pick.tour.level, pick.tour.dateRange].map((fact) => (
                      <li
                        key={fact}
                        className="rounded-full border border-cream/20 bg-cream/[0.06] px-3.5 py-1.5 text-xs text-cream/85 backdrop-blur-sm"
                      >
                        {fact}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/book?tour=${pick.tour.slug}`}
                      className={GOLD_BUTTON}
                    >
                      Reserve your spot
                      <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                        <ArrowIcon size={14} />
                      </span>
                    </Link>
                    <LinkButton href={pick.tour.href} variant="outline">
                      View the trip
                    </LinkButton>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">Ready when you are</p>
                  <h2 className="mt-3 font-serif text-3xl leading-[1.1] tracking-tight text-cream sm:text-4xl lg:text-[44px]">
                    Turn the reading into a <span className="text-gold">journey</span>
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/80 sm:text-base">
                    Tell us when you want to go and what you want to see — our local guides will take it from there.
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      href="/plan-your-trip"
                      className={GOLD_BUTTON}
                    >
                      Plan Your Trip
                      <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                        <ArrowIcon size={14} />
                      </span>
                    </Link>
                    <LinkButton href="/tours" variant="outline">
                      Browse tours
                    </LinkButton>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
