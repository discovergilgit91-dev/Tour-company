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
      <section className="relative isolate w-full overflow-hidden bg-cream pb-8 pt-12 sm:pt-14 lg:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-green/5 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          {/* photo — a clean, properly cropped rectangle (no fade/vignette
              into the cream background). Anchored with right-8 (not
              right-0): absolutely-positioned elements align to their
              container's padding edge, not its content edge, so right-0
              was ignoring this section's own lg:px-8 and sitting 32px
              further right than the filter bar below, which — as a normal
              in-flow element — does respect that padding. right-8 matches
              it exactly. Narrowed from 56% to a fixed width at the same
              time: at that old width, with no fade left to mask it, the
              photo's own left edge could sit close enough to overlap the
              real paragraph text. */}
          <div className="pointer-events-none absolute right-8 top-0 -z-10 hidden h-[240px] w-[280px] select-none overflow-hidden rounded-[18px] shadow-[0_24px_60px_-24px_rgba(18,36,28,0.4)] lg:block xl:w-[380px]">
            <Image
              src="/Images/tours/shimsal-valley2.png"
              alt="A wide valley horizon ringed by snow-capped peaks in Gilgit-Baltistan"
              fill
              quality={85}
              sizes="(min-width: 1280px) 380px, 280px"
              className="object-cover"
            />
          </div>

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
