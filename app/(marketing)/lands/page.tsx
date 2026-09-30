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
      <section className="relative w-full overflow-hidden bg-cream pb-8 pt-12 sm:pt-14 lg:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-green/5 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6 lg:min-h-[240px] lg:px-8">
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

          {/* real photo, standing in for the old decorative contour-line SVG —
              same right-of-text placement, only shown once there's room for it. */}
          <div className="absolute inset-y-8 right-0 hidden w-[280px] overflow-hidden rounded-[22px] shadow-[0_20px_45px_-15px_rgba(18,36,28,0.25)] lg:block xl:w-[340px]">
            <Image
              src="/Images/tours/shimsal-valley2.png"
              alt="A wide valley horizon ringed by snow-capped peaks in Gilgit-Baltistan"
              fill
              sizes="(min-width: 1280px) 340px, (min-width: 1024px) 280px, 0px"
              className="object-cover"
            />
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
