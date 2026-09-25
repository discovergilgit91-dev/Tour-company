"use client";

import { useState } from "react";
import { ArrowIcon } from "./ui/icons";

export type Testimonial = { quote: string; author: string };

/* ---------------------------------------------------------------------
   Reusable premium testimonial / quote section — dropped into both tour
   and event detail pages (see TourDetailPage.tsx / FestivalPage.tsx) so
   the design stays identical and in one place. Works with a single quote
   (no carousel controls rendered) or a list (adds prev/next + counter).
   --------------------------------------------------------------------- */
export default function TestimonialSection({
  testimonials,
  eyebrow = "In their words",
}: {
  testimonials: Testimonial[];
  eyebrow?: string;
}) {
  const [index, setIndex] = useState(0);
  const multi = testimonials.length > 1;
  const current = testimonials[index];

  function go(delta: number) {
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length);
  }

  return (
    <section className="relative w-full overflow-hidden border-b border-cream/10 bg-forest py-20 sm:py-24 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 top-0 h-[380px] w-[380px] rounded-full bg-gold/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-[320px] w-[320px] rounded-full bg-green/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-4xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 flex w-fit items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/50">
          <span className="h-px w-8 bg-cream/30" />
          {eyebrow}
          <span className="h-px w-8 bg-cream/30" />
        </div>

        <div className="relative rounded-[28px] border border-cream/10 bg-cream/[0.035] px-6 py-12 text-center sm:px-12 sm:py-14 lg:px-16 lg:py-16">
          <span
            aria-hidden
            className="pointer-events-none absolute left-5 top-1 select-none font-serif text-[100px] leading-none text-gold/15 sm:left-8 sm:text-[130px]"
          >
            &ldquo;
          </span>

          <p className="relative mx-auto max-w-2xl font-serif text-2xl italic leading-snug text-cream sm:text-[28px] lg:text-3xl">
            {current.quote}
          </p>

          <div className="relative mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold/40" />
            <span className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
            <span className="h-px w-10 bg-gold/40" />
          </div>
          <p className="relative mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-cream/55">
            &mdash; {current.author}
          </p>

          {multi && (
            <div className="relative mt-10 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-colors duration-300 hover:border-gold/40 hover:text-gold"
              >
                <span className="rotate-180">
                  <ArrowIcon size={14} />
                </span>
              </button>

              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-cream/40">
                <span className="text-gold">{String(index + 1).padStart(2, "0")}</span>
                <span className="h-px w-6 bg-cream/20" />
                <span>{String(testimonials.length).padStart(2, "0")}</span>
              </div>

              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-colors duration-300 hover:border-gold/40 hover:text-gold"
              >
                <ArrowIcon size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
