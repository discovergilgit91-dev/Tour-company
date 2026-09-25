import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { type Destination, RouteMapSection } from "@/components/DestinationCard";
import LandsExplorer from "@/components/LandsExplorer";

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
  // ---- Hunza Valley: six of the valley's real, named landmarks instead
  // of one flat "Hunza Valley" card ----
  {
    id: "karimabad",
    slug: "karimabad",
    name: "Karimabad",
    blurb: "The heart of Hunza — terraced rooftops, apricot orchards, and clear views up to Rakaposhi and Ultar Sar.",
    image: "/Images/tours/hunza-valley.png",
    tag: "Discover Karimabad",
    href: "/destinations/karimabad",
    altitude: "2,200 m",
    category: "valleys",
    badge: "Most Popular",
  },
  {
    id: "baltit-fort",
    slug: "baltit-fort",
    name: "Baltit Fort",
    blurb: "A 700-year-old fort above Karimabad, once home to the Mirs of Hunza, with the whole valley spread out below.",
    image: "/Images/tours/baltit-fort.png",
    tag: "Discover Baltit Fort",
    href: "/destinations/baltit-fort",
    altitude: "2,220 m",
    category: "cultural",
    badge: "Cultural Heritage",
  },
  {
    id: "altit-fort",
    slug: "altit-fort",
    name: "Altit Fort",
    blurb: "The oldest monument in Hunza, perched on a sheer cliff above the river since the 11th century.",
    image: "/Images/tours/altit-baltit.jpg",
    tag: "Discover Altit Fort",
    href: "/destinations/altit-fort",
    altitude: "2,100 m",
    category: "cultural",
  },
  {
    id: "attabad-lake",
    slug: "attabad-lake",
    name: "Attabad Lake",
    blurb: "A brilliant turquoise lake born from a 2010 landslide, now crossed by boat beneath the Karakoram Highway.",
    tag: "Discover Attabad Lake",
    href: "/destinations/attabad-lake",
    altitude: "2,560 m",
    category: "lakes",
    badge: "Lake",
  },
  {
    id: "passu-cones",
    slug: "passu-cones",
    name: "Passu Cones",
    blurb: "Jagged cathedral peaks rising straight from the valley floor — one of the most photographed skylines in the north.",
    image: "/Images/tours/passu-cones.jpg",
    tag: "Discover Passu Cones",
    href: "/destinations/passu-cones",
    altitude: "2,400 m",
    category: "mountains",
  },
  {
    id: "khunjerab-pass",
    slug: "khunjerab-pass",
    name: "Khunjerab Pass",
    blurb: "The highest paved border crossing in the world, where the Karakoram Highway meets China at 4,700 metres.",
    tag: "Discover Khunjerab Pass",
    href: "/destinations/khunjerab-pass",
    altitude: "4,700 m",
    category: "national-parks",
    badge: "High Altitude",
  },
  {
    id: "borith-lake",
    slug: "borith-lake",
    name: "Borith Lake",
    blurb: "A saline lake above Hussaini, ringed by willow and sea buckthorn, with views up to the Passu glaciers.",
    tag: "Discover Borith Lake",
    href: "/destinations/borith-lake",
    altitude: "2,600 m",
    category: "lakes",
  },
  {
    id: "shimshal-valley",
    slug: "shimshal-valley",
    name: "Shimshal Valley",
    blurb: "One of the most remote settlements in the Karakoram, reached by a cliffside road above the Shimshal River.",
    tag: "Discover Shimshal Valley",
    href: "/destinations/shimshal-valley",
    altitude: "3,100 m",
    category: "valleys",
    badge: "Remote",
  },
  // ---- Nagar Valley: five named places across the valley ----
  {
    id: "rakaposhi-base-camp",
    slug: "rakaposhi-base-camp",
    name: "Rakaposhi Base Camp",
    blurb: "A trek through pine forest and high pasture to the foot of Rakaposhi, one of the world's most dramatic peaks.",
    image: "/Images/tours/rakaposhi-trek.jpg",
    tag: "Discover Rakaposhi Base Camp",
    href: "/destinations/rakaposhi-base-camp",
    altitude: "3,200 m",
    category: "trekking",
    badge: "Adventure",
  },
  {
    id: "hopar-glacier",
    slug: "hopar-glacier",
    name: "Hopar Glacier",
    blurb: "A glacier valley within walking distance of the village, framed by Diran and Spantik on either side.",
    tag: "Discover Hopar Glacier",
    href: "/destinations/hopar-glacier",
    altitude: "2,700 m",
    category: "mountains",
  },
  {
    id: "rush-lake",
    slug: "rush-lake",
    name: "Rush Lake",
    blurb: "One of the highest alpine lakes in the world, reached by a high-altitude trek above Nagar's glaciers.",
    tag: "Discover Rush Lake",
    href: "/destinations/rush-lake",
    altitude: "4,694 m",
    category: "trekking",
    badge: "High Altitude",
  },
  {
    id: "minapin-glacier",
    slug: "minapin-glacier",
    name: "Minapin Glacier",
    blurb: "A classic trailhead into the Karakoram, with Diran Peak rising directly above the ice.",
    tag: "Discover Minapin Glacier",
    href: "/destinations/minapin-glacier",
    altitude: "2,800 m",
    category: "trekking",
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
    category: "valleys",
  },
  {
    id: "yasin-valley",
    slug: "yasin-valley",
    name: "Yasin Valley",
    blurb: "A secluded valley of green fields, traditional villages, and dramatic mountain scenery.",
    tag: "Discover Yasin Valley",
    href: "/destinations/yasin-valley",
    altitude: "2,500 m",
    category: "valleys",
  },
  {
    id: "phander-valley",
    slug: "phander-valley",
    name: "Phander Valley",
    blurb: "A hidden valley of lakes and orchards in Ghizer, where still turquoise water sits beneath quiet peaks.",
    tag: "Discover Phander Valley",
    href: "/destinations/phander-valley",
    altitude: "2,900 m",
    category: "lakes",
  },
  {
    id: "naltar-valley",
    slug: "naltar-valley",
    name: "Naltar Valley",
    blurb: "Pine forests and a chain of colourful alpine lakes make Naltar one of the north's most vivid landscapes.",
    tag: "Discover Naltar Valley",
    href: "/destinations/naltar-valley",
    altitude: "2,800 m",
    category: "valleys",
    badge: "Seasonal",
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
    category: "mountains",
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
    category: "cultural",
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
    category: "national-parks",
    badge: "Wildlife",
  },
  {
    id: "kachura-lake",
    slug: "kachura-lake",
    name: "Kachura Lake",
    blurb: "A still turquoise lake near Skardu, its glassy water mirroring the pine forest and cliffs around it.",
    tag: "Discover Kachura Lake",
    href: "/destinations/kachura-lake",
    altitude: "2,500 m",
    category: "lakes",
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
    category: "trekking",
  },
  {
    id: "rama-lake",
    slug: "rama-lake",
    name: "Rama Lake",
    blurb: "A still alpine lake ringed by pine forest, framed by uninterrupted views of Nanga Parbat rising above.",
    tag: "Discover Rama Lake",
    href: "/destinations/rama-lake",
    altitude: "3,300 m",
    category: "lakes",
  },
  {
    id: "harmosh-valley",
    slug: "harmosh-valley",
    name: "Harmosh Valley",
    blurb: "A remote glacial valley below Haramosh Peak, reached through pine forest and high pasture far from the highway.",
    tag: "Discover Harmosh Valley",
    href: "/destinations/harmosh-valley",
    altitude: "3,100 m",
    category: "trekking",
  },
  {
    id: "rupal-valley",
    slug: "rupal-valley",
    name: "Rupal Valley",
    blurb: "Gateway to Nanga Parbat's Rupal Face, one of the tallest mountain walls on earth, deep in Astore district.",
    tag: "Discover Rupal Valley",
    href: "/destinations/rupal-valley",
    altitude: "3,200 m",
    category: "mountains",
  },
];

const REGIONS = [
  {
    id: "hunza",
    label: "Hunza Valley",
    note: "Orchards, forts, and the valley's iconic skyline",
    ids: [
      "karimabad",
      "baltit-fort",
      "altit-fort",
      "attabad-lake",
      "passu-cones",
      "khunjerab-pass",
      "borith-lake",
      "shimshal-valley",
    ],
  },
  {
    id: "nagar",
    label: "Nagar Valley",
    note: "Glaciers, high pastures, and the road to Rakaposhi",
    ids: ["rakaposhi-base-camp", "hopar-glacier", "rush-lake", "minapin-glacier"],
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
    ids: ["skardu-katpana", "shigar-valley", "deosai-plains", "kachura-lake"],
  },
  {
    id: "diamer-astore",
    label: "Diamer & Astore",
    note: "Meadows, valleys, and lakes beneath the Killer Mountain",
    ids: ["fairy-meadows", "rama-lake", "harmosh-valley", "rupal-valley"],
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

export default function LandsPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Hero
        eyebrow="EXPLORE THE NORTH"
        title="Every journey begins somewhere extraordinary."
        description="Discover the valleys, plains, lakes, and mountain landscapes that make northern Pakistan unforgettable."
        image="/Images/hero/lands-hero.jpg"
        imageAlt=""
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
        </div>
      </section>

      {/* Left sidebar (sticky region nav + quick facts) alongside the
          region-by-region grid — same card, same rhythm as the homepage
          teaser, organized like a proper travel directory. Client component
          because the sidebar tracks scroll position to highlight the
          active region. */}
      <LandsExplorer destinations={LANDS} regions={REGIONS} />

      <RouteMapSection />
    </main>
  );
}
