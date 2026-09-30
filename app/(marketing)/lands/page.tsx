import type { Metadata } from "next";
import Image from "next/image";
import Hero from "@/components/Hero";
import { RouteMapSection } from "@/components/DestinationCard";
import LandsExplorer from "@/components/LandsExplorer";
import { DESTINATIONS, REGIONS } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "All Lands — Discover Gilgit",
  description:
    "Explore every destination across Gilgit-Baltistan, region by region — from the orchards of Hunza to the quiet valleys of Ghizer.",
};

/* Same faint squiggle-contour motif UpcomingTours draws behind its own
   bleeding hero photo — copied locally rather than imported since it's a
   small, self-contained decoration (matches how AboutStory keeps its own
   local contour-line generator instead of sharing one). */
function ArtContours({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 320" fill="none" aria-hidden="true" className={className} preserveAspectRatio="none">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <path
          key={i}
          d={`M-20 ${250 - i * 26}
             C 90 ${200 - i * 24}, 150 ${290 - i * 22}, 250 ${230 - i * 26}
             S 420 ${140 - i * 22}, 540 ${190 - i * 26}`}
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

export default function LandsPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Hero
        eyebrow="EXPLORE THE NORTH"
        title="Every journey begins somewhere extraordinary."
        description="Discover the valleys, plains, lakes, and mountain landscapes that make northern Pakistan unforgettable."
        image="/Images/tours/Journeys.png"
        imageAlt="A collage of northern Pakistan's valleys, suspension bridges, and lakes"
      />

      {/* Intro — same rhythm as FeaturedDestinations on the homepage */}
      <section className="relative isolate w-full overflow-hidden bg-cream pb-8 pt-12 sm:pt-14 lg:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-green/5 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          {/* photo — same treatment as the "Upcoming Tours & Events" intro:
              bleeds in from the right behind the text, fading into the
              cream background via gradient rather than sitting in its own
              hard-edged box, with the same faint contour-line motif
              layered just to its left. */}
          <div className="pointer-events-none absolute right-0 top-0 -z-10 hidden h-[240px] w-[56%] select-none overflow-hidden rounded-[18px] lg:block">
            <Image
              src="/Images/tours/shimsal-valley2.png"
              alt=""
              fill
              sizes="(min-width: 1152px) 620px, 56vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream to-transparent" />
          </div>

          <ArtContours className="pointer-events-none absolute right-[38%] top-0 -z-10 hidden h-[220px] w-[36%] text-gold/20 lg:block" />

          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              <span className="h-px w-8 bg-muted/60" />
              All destinations
            </div>

            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-forest sm:text-5xl lg:text-6xl">
              Find your next
              <br />
              <span className="text-green">horizon</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              From the orchards of Hunza to the quiet valleys of Ghizer, explore the places that
              reveal the beauty, culture, and wild landscapes of Gilgit-Baltistan.
            </p>
          </div>
        </div>
      </section>

      {/* Left sidebar (sticky region nav + quick facts) alongside the
          region-by-region grid — same card, same rhythm as the homepage
          teaser, organized like a proper travel directory. Client component
          because the sidebar tracks scroll position to highlight the
          active region. */}
      <LandsExplorer destinations={DESTINATIONS} regions={REGIONS} />

      <RouteMapSection />
    </main>
  );
}
