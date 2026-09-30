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

        <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6 lg:min-h-[320px] lg:px-8 xl:min-h-[380px]">
          {/* photo — a full-width banner stacked above the text on mobile
              and tablet, then moves beside it from lg up. The soft offset
              frame behind it (same touch as the About Story photo) and the
              bigger, softer shadow (the same one FeaturedEvent uses for its
              photo panel) are what make it read as a real, elevated photo
              rather than a small boxed-in placeholder. */}
          <div className="relative mb-8 aspect-[16/10] w-full sm:aspect-[2/1] lg:absolute lg:inset-y-4 lg:right-8 lg:mb-0 lg:aspect-auto lg:w-[280px] xl:w-[380px]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 rounded-[26px] border border-gold/35"
            />
            <div className="relative h-full w-full overflow-hidden rounded-[26px] shadow-[0_24px_60px_-24px_rgba(18,36,28,0.4)]">
              <Image
                src="/Images/tours/shimsal-valley2.png"
                alt="A wide valley horizon ringed by snow-capped peaks in Gilgit-Baltistan"
                fill
                sizes="(min-width: 1280px) 380px, (min-width: 1024px) 280px, 100vw"
                className="object-cover"
              />
            </div>
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
