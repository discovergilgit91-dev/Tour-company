"use client";

import { LinkButton } from "./ui/Button";
import { ArrowIcon, CalendarIcon, PinIcon } from "./ui/icons";
import { useRevealOnScroll } from "./DestinationCard";

/* ---------------------------------------------------------------------
   Featured Event — a single highlight banner for the flagship event on
   the calendar. Shared between the tours/events explorer and the
   homepage, so the two stay in sync instead of drifting copies.
   --------------------------------------------------------------------- */

/** Honest generated backdrop — no real photo exists for this event yet. */
function MountainBackdrop({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 bg-gradient-to-br from-green-dark via-forest to-night ${className}`}>
      <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMax slice" className="h-full w-full text-cream/[0.06]">
        <path
          d="M-20 210 40 130l35 45 45-70 45 65 40-35 60 80 50-45 70 90"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M-20 235 50 160l45 50 50-75 50 70 45-40 65 85 55-50 75 95"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}

const FEATURED_EVENT = {
  month: "Aug",
  day: "12",
  title: "Gilgit-Baltistan Cultural Festival",
  dateRange: "12 Aug – 14 Aug, 2027",
  location: "Gilgit City",
  description:
    "Immerse yourself in the vibrant culture, music, and traditional food of Gilgit-Baltistan — a celebration of our heritage and community spirit.",
  href: "/tours/gilgit-cultural-festival",
};

export default function FeaturedEvent() {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <section className="relative w-full overflow-hidden bg-cream pb-10 pt-2 sm:pb-12">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <div
          ref={ref}
          style={{ transitionDelay: visible ? "80ms" : "0ms" }}
          className={`grid grid-cols-1 overflow-hidden rounded-[26px] bg-forest shadow-[0_24px_60px_-24px_rgba(18,36,28,0.4)] transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none lg:grid-cols-2 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="relative aspect-[16/10] lg:aspect-auto">
            <MountainBackdrop />
            <span className="absolute left-5 top-5 flex flex-col items-center rounded-2xl bg-cream px-4 py-2.5 leading-none shadow-lg">
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-green">
                {FEATURED_EVENT.month}
              </span>
              <span className="mt-1 font-serif text-2xl text-forest">{FEATURED_EVENT.day}</span>
            </span>
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
            <div className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
              <span className="h-px w-8 bg-gold/60" />
              Featured Event
            </div>

            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-cream sm:text-4xl">
              {FEATURED_EVENT.title}
            </h2>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-cream/70">
              <span className="flex items-center gap-2">
                <CalendarIcon size={16} />
                {FEATURED_EVENT.dateRange}
              </span>
              <span className="flex items-center gap-2">
                <PinIcon size={16} />
                {FEATURED_EVENT.location}
              </span>
            </div>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/70 sm:text-base">
              {FEATURED_EVENT.description}
            </p>

            <LinkButton href={FEATURED_EVENT.href} variant="primary" className="group mt-7 w-fit gap-2">
              Learn More
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                <ArrowIcon size={14} />
              </span>
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
