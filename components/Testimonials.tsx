"use client";

import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowIcon } from "./ui/icons";

const REVIEWS = [
  {
    name: "Ayesha Khan",
    location: "Lahore, Pakistan",
    quote:
      "Our guide knew every turn of the Hunza road by heart. It felt less like a tour and more like visiting family in the mountains — down to the orchard where we stopped for mulberries nobody else finds.",
    rating: 5,
    trip: "Blossoms of Hunza",
  },
  {
    name: "Daniel Reyes",
    location: "Madrid, Spain",
    quote:
      "Fairy Meadows at sunrise, arranged down to the last detail. The most well-run trip I've taken anywhere in the world.",
    rating: 5,
    trip: "Fairy Meadows Trek",
  },
  {
    name: "Meera Nair",
    location: "Bengaluru, India",
    quote:
      "Deosai felt endless in the best way. Small group, unhurried pace, and a team that clearly loves this land.",
    rating: 4,
    trip: "Deosai Plains",
  },
];

/** How long each review stays on screen before the next one replaces it. */
const AUTOPLAY_MS = 8000;

function Initials({ name, light = false }: { name: string; light?: boolean }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <span
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-serif text-sm ${
        light ? "bg-cream/10 text-cream" : "bg-forest text-cream"
      }`}
    >
      {initials}
    </span>
  );
}

function StarPath({ filled, className, style }: { filled: boolean; className?: string; style?: CSSProperties }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 20 20"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.2"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M10 1.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.8l-5.2 2.7 1-5.8L1.6 7.6l5.8-.8L10 1.5Z" />
    </svg>
  );
}

function StarRow({ rating, className = "text-gold" }: { rating: number; className?: string }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarPath key={i} filled={i < rating} className={className} />
      ))}
    </div>
  );
}

/** Stars that pop in one after another when their slide becomes active. */
function AnimatedStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarPath
          key={i}
          filled={i < rating}
          className="t-star text-gold"
          style={{ "--i": i } as CSSProperties}
        />
      ))}
    </div>
  );
}

/** Splits a quote into words so each one can rise + un-blur with a stagger. */
function SplitWords({ text }: { text: string }) {
  const words = `\u201C${text}\u201D`.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="t-word" style={{ "--i": i } as CSSProperties}>
            {word}
          </span>{" "}
        </Fragment>
      ))}
    </>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const cardRef = useRef<HTMLElement | null>(null);

  const count = REVIEWS.length;
  const multiple = count > 1;

  const goTo = (index: number) => setActive(((index % count) + count) % count);
  const next = () => setActive((current) => (current + 1) % count);
  const prev = () => setActive((current) => (current - 1 + count) % count);

  // Reveal the first review when the card scrolls into view, and only run the
  // autoplay timer while the card is actually visible.
  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setRevealed(true);
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // The two reviews that are NOT in the big card sit on the right and are clickable.
  const sideReviews = REVIEWS.map((review, index) => ({ review, index })).filter(
    ({ index }) => index !== active
  );

  return (
    /* No horizontal padding on the section: it lives in the container below,
       exactly like Header, Hero, FeaturedDestinations, AboutStory and UpcomingTours
       (max-w-6xl + px-4 sm:px-6). Vertical padding matches them too. */
    <section id="reviews" className="relative overflow-hidden bg-cream py-20 sm:py-24 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-gold/5 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mb-12 flex flex-col justify-between gap-8 lg:mb-14 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              <span className="h-px w-8 bg-muted/60" />
              Reviews
            </div>

            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-forest sm:text-5xl lg:text-6xl">
              Trusted by travelers
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              Real trips, real travelers — see what guests say about journeying with us
              across Gilgit-Baltistan.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-forest/10 bg-white px-5 py-4">
            <StarRow rating={5} />
            <span className="font-serif text-lg text-forest">4.9</span>
            <span className="text-xs text-muted">from 240+ reviews</span>
          </div>
        </div>

        <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Featured review — rotates through every review */}
          <article
            ref={cardRef}
            data-inview={inView}
            aria-roledescription="carousel"
            aria-label="Featured traveler reviews"
            style={{ "--t-dur": `${AUTOPLAY_MS}ms` } as CSSProperties}
            className="t-card relative flex flex-col overflow-hidden rounded-[28px] bg-forest p-8 text-cream sm:p-10 lg:col-span-7"
          >
            {/* ambient motion: drifting glow + floating quote mark */}
            <span
              aria-hidden
              className="t-drift pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-gold/10 blur-3xl"
            />
            <span
              aria-hidden
              className="t-float pointer-events-none absolute -right-4 -top-6 select-none font-serif text-[160px] leading-none text-gold/10"
            >
              &ldquo;
            </span>

            {/* All reviews are stacked in one grid cell, so the card keeps the height of the
                tallest one and never jumps when the text changes. */}
            <div className="relative grid flex-1">
              {REVIEWS.map((review, i) => {
                const wordCount = review.quote.split(" ").length;
                const authorDelay = 0.4 + Math.min(wordCount, 40) * 0.022;

                return (
                  <div
                    key={review.name}
                    data-active={revealed && i === active}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${count}`}
                    aria-hidden={i !== active}
                    className="t-slide col-start-1 row-start-1 flex flex-col justify-between"
                  >
                    <div>
                      <AnimatedStars rating={review.rating} />
                      <p className="mt-6 font-serif text-2xl leading-snug sm:text-[28px] lg:text-3xl">
                        <SplitWords text={review.quote} />
                      </p>
                    </div>

                    <div
                      className="t-fade mt-10 flex items-center gap-4 border-t border-cream/10 pt-6"
                      style={{ "--d": `${authorDelay}s` } as CSSProperties}
                    >
                      <Initials name={review.name} light />
                      <div className="min-w-0">
                        <p className="font-serif text-sm text-cream">{review.name}</p>
                        <p className="truncate text-xs text-cream/55">{review.location}</p>
                      </div>
                      <span className="ml-auto shrink-0 rounded-full border border-gold/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-gold">
                        {review.trip}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {multiple && (
              <div className="relative mt-8 flex items-center gap-4">
                {/* Story-style progress: each segment is a button, the active one fills over AUTOPLAY_MS */}
                <div className="flex flex-1 items-center gap-2">
                  {REVIEWS.map((review, i) => (
                    <button
                      key={review.name}
                      type="button"
                      aria-label={`Show review ${i + 1} of ${count}, by ${review.name}`}
                      aria-current={i === active}
                      onClick={() => goTo(i)}
                      className="group relative h-6 max-w-[88px] flex-1 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
                    >
                      <span className="absolute inset-x-0 top-1/2 block h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-cream/15 transition-[height] duration-300 group-hover:h-[5px]">
                        <span
                          className="t-fill absolute inset-0 block rounded-full bg-gold"
                          data-state={i < active ? "done" : i === active ? "active" : "idle"}
                          onAnimationEnd={i === active ? next : undefined}
                        />
                      </span>
                    </button>
                  ))}
                </div>

                <span className="font-serif text-xs tabular-nums text-cream/55">
                  {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous review"
                    onClick={prev}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors duration-300 hover:bg-cream hover:text-forest focus-visible:ring-2 focus-visible:ring-gold/70"
                  >
                    <span className="rotate-180">
                      <ArrowIcon size={14} />
                    </span>
                  </button>
                  <button
                    type="button"
                    aria-label="Next review"
                    onClick={next}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors duration-300 hover:bg-cream hover:text-forest focus-visible:ring-2 focus-visible:ring-gold/70"
                  >
                    <ArrowIcon size={14} />
                  </button>
                </div>
              </div>
            )}
          </article>

          {/* The other reviews — swap in with a stagger every time the big card changes; click to feature one */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {sideReviews.map(({ review, index }, slot) => (
              <div key={slot} className="group relative flex flex-1">
                <article
                  key={`${active}-${review.name}`}
                  className="t-card-in flex w-full flex-col rounded-[24px] bg-white p-6 shadow-[0_2px_18px_rgba(18,36,28,0.06)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_18px_40px_rgba(18,36,28,0.12)]"
                  style={{ "--d": `${0.15 + slot * 0.12}s` } as CSSProperties}
                >
                  <StarRow rating={review.rating} />

                  <p className="t-clamp mt-3 flex-1 text-sm leading-relaxed text-forest/80">
                    &ldquo;{review.quote}&rdquo;
                  </p>

                  <div className="mt-5 flex items-center gap-3 border-t border-forest/10 pt-4">
                    <Initials name={review.name} />
                    <div className="min-w-0">
                      <p className="font-serif text-sm text-forest">{review.name}</p>
                      <p className="truncate text-xs text-muted">{review.location}</p>
                    </div>
                    <span className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-forest/15 text-forest transition-all duration-300 group-hover:translate-x-1 group-hover:border-forest group-hover:bg-forest group-hover:text-cream">
                      <ArrowIcon size={13} />
                    </span>
                  </div>
                </article>

                {/* The button lives outside the keyed article so keyboard focus survives the swap */}
                <button
                  type="button"
                  aria-label={`Feature the review by ${review.name}`}
                  onClick={() => goTo(index)}
                  className="absolute inset-0 z-10 rounded-[24px] outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* ---------- slides: stacked in one grid cell, cross-fade with a word-by-word reveal ---------- */
        .t-slide { visibility: hidden; transition: visibility 0s linear .4s; }
        .t-slide[data-active="true"] { visibility: visible; transition-delay: 0s; }

        .t-word {
          display: inline-block;
          opacity: 0;
          transform: translateY(.6em);
          filter: blur(6px);
          transition: opacity .3s ease-in, transform .3s ease-in, filter .3s ease-in;
        }
        .t-slide[data-active="true"] .t-word {
          opacity: 1;
          transform: none;
          filter: blur(0);
          transition:
            opacity .7s ease-out calc(.3s + var(--i) * 22ms),
            transform .9s cubic-bezier(.2,.7,.2,1) calc(.3s + var(--i) * 22ms),
            filter .7s ease-out calc(.3s + var(--i) * 22ms);
        }

        .t-star {
          opacity: 0;
          transform: scale(.3) rotate(-40deg);
          transition: opacity .25s ease-in, transform .25s ease-in;
        }
        .t-slide[data-active="true"] .t-star {
          opacity: 1;
          transform: none;
          transition:
            opacity .4s ease-out calc(.15s + var(--i) * 70ms),
            transform .7s cubic-bezier(.34,1.56,.64,1) calc(.15s + var(--i) * 70ms);
        }

        .t-fade {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity .3s ease-in, transform .3s ease-in;
        }
        .t-slide[data-active="true"] .t-fade {
          opacity: 1;
          transform: none;
          transition:
            opacity .7s ease-out var(--d, .6s),
            transform .8s cubic-bezier(.2,.7,.2,1) var(--d, .6s);
        }

        /* ---------- story-style progress: the active fill drives the autoplay ---------- */
        .t-fill { transform: scaleX(0); transform-origin: left center; }
        .t-fill[data-state="done"] { transform: scaleX(1); }
        .t-fill[data-state="active"] { animation: t-fill var(--t-dur, 8000ms) linear forwards; }
        @keyframes t-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }

        /* pause while hovered, while off-screen, or while a keyboard user is focused inside */
        .t-card:not([data-inview="true"]) .t-fill[data-state="active"],
        .t-card:hover .t-fill[data-state="active"] { animation-play-state: paused; }
        .t-card:has(:focus-visible) .t-fill[data-state="active"] { animation-play-state: paused; }

        /* ---------- side cards ---------- */
        .t-card-in { animation: t-card-in .7s cubic-bezier(.2,.7,.2,1) backwards; animation-delay: var(--d, 0s); }
        @keyframes t-card-in {
          from { opacity: 0; transform: translateY(16px) scale(.98); }
          to   { opacity: 1; transform: none; }
        }
        .t-clamp {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          overflow: hidden;
          min-height: 91px; /* 4 lines, so every side card is the same height */
        }

        /* ---------- ambient motion ---------- */
        .t-drift { animation: t-drift 14s ease-in-out infinite alternate; }
        @keyframes t-drift {
          from { transform: translate3d(0, 0, 0) scale(1); }
          to   { transform: translate3d(36px, -24px, 0) scale(1.18); }
        }
        .t-float { animation: t-float 9s ease-in-out infinite alternate; }
        @keyframes t-float {
          from { transform: translate3d(0, 0, 0) rotate(0deg); }
          to   { transform: translate3d(-6px, 10px, 0) rotate(2deg); }
        }

        /* ---------- reduced motion: no autoplay, no movement, everything just appears ---------- */
        @media (prefers-reduced-motion: reduce) {
          .t-slide, .t-word, .t-star, .t-fade {
            transition-duration: .01ms !important;
            transition-delay: 0s !important;
          }
          .t-card-in, .t-drift, .t-float { animation: none !important; }
          .t-fill[data-state="active"] { animation: none; transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}
