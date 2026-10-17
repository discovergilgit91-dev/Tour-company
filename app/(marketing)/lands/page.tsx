import type { Metadata } from "next";
import Image from "next/image";
import Hero from "@/components/Hero";
import { DestinationCard, RouteMapSection, type Destination } from "@/components/DestinationCard";
import LandsExplorer from "@/components/LandsExplorer";
import { DESTINATIONS, REGIONS } from "@/lib/destinations";
import { DISTRICTS, districtHref } from "@/lib/districts";
import { getAltitudeRange, getDistrictPlaces } from "@/lib/districtQueries";

// Each district guide shown as a destination card, so it sits in the same grid
// style as every other card on this page.
const DISTRICT_CARDS: Destination[] = DISTRICTS.map((district) => ({
  id: `district-${district.slug}`,
  slug: district.slug,
  name: district.name,
  blurb: district.tagline,
  image: district.hero.src,
  focus: district.hero.focus,
  tag: `Explore ${district.shortName}`,
  href: districtHref(district),
  altitude: getAltitudeRange(getDistrictPlaces(district)) ?? "",
  badge: "District guide",
}));

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
      <section className="relative isolate w-full overflow-hidden bg-cream pb-8 section-t">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-0 h-[31.25rem] w-[31.25rem] rounded-full bg-green/5 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* photo — same fade-in treatment as the "Upcoming Tours &
              Events" hero image: a full-bleed photo blending into the
              cream background via gradient, rather than a boxed card
              with a shadow. Position/size unchanged from before (right-8
              to align with the filter bar below; right-0 would ignore
              this section's own lg:px-8 padding — see the filter bar's
              alignment for why). */}
          <div className="pointer-events-none absolute right-8 top-0 -z-10 hidden h-[15rem] w-[17.5rem] select-none overflow-hidden rounded-[1.125rem] lg:block xl:w-[23.75rem]">
            <Image
              src="/Images/tours/shimsal-valley2.png"
              alt="A wide valley horizon ringed by snow-capped peaks in Gilgit-Baltistan"
              fill
              quality={85}
              sizes="(min-width: 1280px) 380px, 280px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream to-transparent" />
          </div>

          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted">
              <span className="h-px w-8 bg-muted/60" />
              All destinations
            </div>

            <h2 className="section-title font-serif text-4xl leading-[1.05] tracking-tight text-forest sm:text-5xl lg:text-6xl">
              Find your next
              <br />
              <span className="text-green">horizon</span>
            </h2>

            <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-muted sm:text-base">
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
      {DISTRICT_CARDS.length > 0 && (
        <section className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 section-t-tight">
          <div className="mb-8 flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted">
            <span className="h-px w-8 bg-muted/60" />
            Explore by district
          </div>
          <h2 className="sr-only">District guides</h2>
          <div className="card-grid card-grid-loose">
            {DISTRICT_CARDS.map((card, index) => (
              <DestinationCard key={card.id} destination={card} index={index} delay={index * 90} />
            ))}
          </div>
        </section>
      )}

      <LandsExplorer destinations={DESTINATIONS} regions={REGIONS} />

      <RouteMapSection />
    </main>
  );
}
