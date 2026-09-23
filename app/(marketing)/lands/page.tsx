import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { DestinationCard, type Destination } from "@/components/DestinationCard";

export const metadata: Metadata = {
  title: "All Lands — Discover Gilgit",
  description:
    "Explore every destination across Gilgit-Baltistan — from the orchards of Hunza to the quiet valleys of Ghizer.",
};

// Structured with a `slug` on every entry so individual /destinations/[slug]
// detail pages can be built later without touching this data shape. Entries
// with no `image` yet render the shared "photo coming soon" placeholder
// (see components/DestinationCard.tsx) instead of a broken image — drop a
// real file in /public/Images/tours/ and set `image` here to activate it.
const LANDS: Destination[] = [
  {
    id: "hunza-valley",
    slug: "hunza-valley",
    name: "Hunza Valley",
    blurb: "Terraced orchards, ancient forts, and snow-capped peaks framing a valley of legend.",
    image: "/Images/tours/passu-cones.jpg",
    tag: "Discover Hunza Valley",
    href: "/destinations/hunza-valley",
    altitude: "2,500 m",
  },
  {
    id: "deosai-plains",
    slug: "deosai-plains",
    name: "Deosai Plains",
    blurb: "The Land of Giants — vast alpine plains where wild landscapes stretch beneath an endless sky.",
    image: "/Images/tours/deosai-plains.png",
    tag: "Discover Deosai Plains",
    href: "/destinations/deosai-plains",
    altitude: "4,114 m",
  },
  {
    id: "skardu-katpana",
    slug: "skardu-katpana",
    name: "Skardu & Katpana",
    blurb: "Cold desert dunes beside turquoise lakes, surrounded by dramatic mountain scenery.",
    image: "/Images/tours/cold-desert.png",
    tag: "Discover Skardu & Katpana",
    href: "/destinations/skardu-katpana",
    altitude: "2,230 m",
  },
  {
    id: "fairy-meadows",
    slug: "fairy-meadows",
    name: "Fairy Meadows",
    blurb: "Alpine meadows at the foot of Nanga Parbat, wrapped in pine forest and morning mist.",
    image: "/Images/tours/Fairy-meadows.png",
    tag: "Discover Fairy Meadows",
    href: "/destinations/fairy-meadows",
    altitude: "3,300 m",
  },
  {
    id: "ghizer-valley",
    slug: "ghizer-valley",
    name: "Ghizer Valley",
    blurb:
      "A peaceful landscape of turquoise rivers, mountain villages, and quiet valleys shaped by the waters of the north.",
    tag: "Discover Ghizer Valley",
    href: "/destinations/ghizer-valley",
    altitude: "2,150 m",
  },
  {
    id: "yasin-valley",
    slug: "yasin-valley",
    name: "Yasin Valley",
    blurb: "A secluded valley of green fields, traditional villages, and dramatic mountain scenery.",
    tag: "Discover Yasin Valley",
    href: "/destinations/yasin-valley",
    altitude: "2,500 m",
  },
  {
    id: "nagar-valley",
    slug: "nagar-valley",
    name: "Nagar Valley",
    blurb: "Glaciers, orchards, and towering peaks create a landscape rich in natural beauty and mountain culture.",
    image: "/Images/tours/rakaposhi-trek.jpg",
    tag: "Discover Nagar Valley",
    href: "/destinations/nagar-valley",
    altitude: "2,440 m",
  },
  {
    id: "astore-valley",
    slug: "astore-valley",
    name: "Astore Valley",
    blurb:
      "Remote mountain landscapes, lush valleys, and winding roads leading toward some of the region's most beautiful wilderness.",
    tag: "Discover Astore Valley",
    href: "/destinations/astore-valley",
    altitude: "2,600 m",
  },
  {
    id: "shigar-valley",
    slug: "shigar-valley",
    name: "Shigar Valley",
    blurb: "A historic valley of stone villages, fertile fields, and gateways to the high mountains of Baltistan.",
    image: "/Images/tours/shigar-camping.jpg",
    tag: "Discover Shigar Valley",
    href: "/destinations/shigar-valley",
    altitude: "2,290 m",
  },
  {
    id: "diamer",
    slug: "diamer",
    name: "Diamer",
    blurb: "A rugged mountain region of deep valleys, ancient routes, and dramatic mountain landscapes.",
    tag: "Discover Diamer",
    href: "/destinations/diamer",
    altitude: "1,250 m",
  },
];

export default function LandsPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Hero
        eyebrow="EXPLORE THE NORTH"
        title="Every journey begins somewhere extraordinary."
        description="Discover the valleys, plains, lakes, and mountain landscapes that make northern Pakistan unforgettable."
        image="/Images/tours/rakaposhi-trek.jpg"
        imageAlt="Rakaposhi peak rising above the Karakoram"
      />

      {/* Same structure/rhythm as FeaturedDestinations on the homepage:
          no horizontal padding on the section — it lives on the max-w-6xl
          wrapper (px-5 sm:px-6 lg:px-8), bottom padding matches the shared
          py-16 sm:py-20 lg:py-24 rhythm, top padding trimmed under the hero. */}
      <section className="relative w-full overflow-hidden bg-cream pb-16 pt-12 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-green/5 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
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

          <div className="mt-12 grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            {LANDS.map((destination, index) => (
              <DestinationCard key={destination.id} destination={destination} index={index} delay={index * 90} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
