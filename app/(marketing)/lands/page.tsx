import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { DestinationCard, type Destination } from "@/components/DestinationCard";

export const metadata: Metadata = {
  title: "All Lands — Discover Gilgit",
  description:
    "Explore every destination across Gilgit-Baltistan, region by region — from the orchards of Hunza to the quiet valleys of Ghizer.",
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
    id: "phander-valley",
    slug: "phander-valley",
    name: "Phander Valley",
    blurb: "A hidden valley of lakes and orchards in Ghizer, where still turquoise water sits beneath quiet peaks.",
    tag: "Discover Phander Valley",
    href: "/destinations/phander-valley",
    altitude: "2,900 m",
  },
  {
    id: "naltar-valley",
    slug: "naltar-valley",
    name: "Naltar Valley",
    blurb: "Pine forests and a chain of colourful alpine lakes make Naltar one of the north's most vivid landscapes.",
    tag: "Discover Naltar Valley",
    href: "/destinations/naltar-valley",
    altitude: "2,800 m",
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
    id: "rama-lake",
    slug: "rama-lake",
    name: "Rama Lake",
    blurb: "A still alpine lake ringed by pine forest, framed by uninterrupted views of Nanga Parbat rising above.",
    tag: "Discover Rama Lake",
    href: "/destinations/rama-lake",
    altitude: "3,300 m",
  },
];

const BY_ID = new Map(LANDS.map((d) => [d.id, d]));

const REGIONS = [
  {
    id: "hunza-nagar",
    label: "Hunza & Nagar",
    note: "The Karakoram's orchard valleys",
    ids: ["hunza-valley", "nagar-valley"],
  },
  {
    id: "gilgit-ghizer",
    label: "Gilgit & Ghizer",
    note: "Rivers, lakes, and quiet villages",
    ids: ["ghizer-valley", "yasin-valley", "phander-valley", "naltar-valley"],
  },
  {
    id: "baltistan",
    label: "Baltistan",
    note: "Deserts, plains, and stone forts",
    ids: ["skardu-katpana", "shigar-valley", "deosai-plains"],
  },
  {
    id: "nanga-parbat",
    label: "Nanga Parbat",
    note: "Meadows and lakes beneath the Killer Mountain",
    ids: ["fairy-meadows", "rama-lake"],
  },
];

/* ---- faint topographic contour lines behind the intro (same technique as AboutStory) ---- */
function ring(cx: number, cy: number, r: number, seed: number, squash = 1) {
  const points: string[] = [];
  const steps = 60;
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const wobble =
      1 + 0.16 * Math.sin(3 * t + seed) + 0.09 * Math.sin(5 * t + seed * 1.7) + 0.05 * Math.sin(9 * t + seed * 0.6);
    const x = cx + Math.cos(t) * r * wobble;
    const y = cy + Math.sin(t) * r * wobble * squash;
    points.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return `${points.join(" ")}Z`;
}
const CONTOURS = Array.from({ length: 8 }, (_, i) => ring(560, 260, 30 + (260 * i) / 7, 1.2 + i * 0.4, 0.8));

// Flagship card for the whole page — gets the larger, horizontal "Featured"
// treatment (see DestinationCard) and spans 2 grid columns. Its region's
// column count is bumped by 1 below so that span (2) plus the rest of the
// region's cards (1 each) always fill the row exactly, with no empty gap.
const FEATURED_ID = "hunza-valley";

// Static, literal class strings so Tailwind's build-time scanner can find
// them (it can't see through a dynamically-built `lg:grid-cols-${n}`).
const GRID_COLS: Record<number, string> = {
  2: "sm:grid-cols-2 lg:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-5",
};

export default function LandsPage() {
  let cardIndex = 0;

  return (
    <main className="min-h-screen bg-cream">
      <Hero
        eyebrow="EXPLORE THE NORTH"
        title="Every journey begins somewhere extraordinary."
        description="Discover the valleys, plains, lakes, and mountain landscapes that make northern Pakistan unforgettable."
        image="/Images/tours/rakaposhi-trek.jpg"
        imageAlt="Rakaposhi peak rising above the Karakoram"
      />

      {/* Intro — same rhythm as FeaturedDestinations on the homepage */}
      <section className="relative w-full overflow-hidden bg-cream pb-8 pt-12 sm:pt-14 lg:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-green/5 blur-3xl"
        />
        <svg
          aria-hidden
          viewBox="0 0 900 500"
          preserveAspectRatio="xMaxYMin slice"
          className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-2/3 text-forest/[0.035] lg:block"
        >
          <g fill="none" stroke="currentColor" strokeWidth="1">
            {CONTOURS.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>
        </svg>

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

          {/* jump-to-region nav — a small in-page table of contents */}
          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            {REGIONS.map((region) => (
              <a
                key={region.id}
                href={`#${region.id}`}
                className="group inline-flex items-center gap-2 rounded-full border border-forest/15 bg-white px-4 py-2 text-xs font-semibold text-forest transition-colors duration-300 hover:border-green/50 hover:bg-green hover:text-white"
              >
                {region.label}
                <span className="text-muted transition-colors group-hover:text-white/80">
                  {region.ids.length.toString().padStart(2, "0")}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Region-by-region grid — same card, same rhythm as the homepage teaser, organized like a proper travel directory instead of one flat grid. */}
      {REGIONS.map((region, regionIndex) => (
        <section
          key={region.id}
          id={region.id}
          className={`relative w-full bg-cream ${
            regionIndex === REGIONS.length - 1 ? "pb-16 pt-10 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-14" : "pb-10 pt-10 sm:pb-12 sm:pt-12 lg:pb-14 lg:pt-14"
          }`}
        >
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between gap-4 border-b border-forest/10 pb-4 lg:mb-10">
              <div>
                <span className="font-serif text-lg text-green">
                  {String(regionIndex + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 font-serif text-2xl leading-tight tracking-tight text-forest sm:text-3xl">
                  {region.label}
                </h3>
              </div>
              <p className="hidden text-right text-xs uppercase tracking-[0.12em] text-muted sm:block">
                {region.note}
              </p>
            </div>

            {(() => {
              const hasFeatured = region.ids.includes(FEATURED_ID);
              const totalCols = region.ids.length + (hasFeatured ? 1 : 0);
              const gridColsClass = GRID_COLS[totalCols] ?? GRID_COLS[4];

              return (
                <div className={`grid grid-cols-1 gap-x-5 gap-y-12 ${gridColsClass}`}>
                  {region.ids.map((id) => {
                    const destination = BY_ID.get(id);
                    if (!destination) return null;
                    const thisIndex = cardIndex++;
                    return (
                      <DestinationCard
                        key={destination.id}
                        destination={destination}
                        index={thisIndex}
                        delay={(thisIndex % 4) * 90}
                        featured={id === FEATURED_ID}
                      />
                    );
                  })}
                </div>
              );
            })()}
          </div>
        </section>
      ))}
    </main>
  );
}
