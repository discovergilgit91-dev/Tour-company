import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ToursExplorer, { type Tour } from "@/components/ToursExplorer";

export const metadata: Metadata = {
  title: "Upcoming Tours & Events — Discover Gilgit",
  description:
    "Browse every upcoming guided tour and seasonal event across Gilgit-Baltistan — filter by region, duration, or budget to find your next journey.",
};

const TOURS: Tour[] = [
  {
    id: "hunza-spring",
    slug: "hunza-spring",
    title: "Blossoms of Hunza",
    subtitle: "Spring Tour",
    location: "Hunza Valley",
    region: "Hunza Valley",
    category: "Cultural",
    duration: 5,
    dateRange: "25 May – 29 May, 2027",
    price: 450,
    image: "/Images/tours/hunza-blossom.png",
    href: "/tours/hunza-spring",
  },
  {
    id: "rakaposhi-trek",
    slug: "rakaposhi-trek",
    title: "Rakaposhi Base Camp Trek",
    location: "Nagar – Hopar – Passu",
    region: "Nagar Valley",
    category: "Trekking",
    duration: 7,
    dateRange: "10 Jun – 16 Jun, 2027",
    price: 780,
    image: "/Images/tours/rakaposhi-trek.jpg",
    href: "/tours/rakaposhi-trek",
  },
  {
    id: "altit-baltit",
    slug: "altit-baltit",
    title: "Cultural Heritage Tour",
    location: "Altit – Baltit",
    region: "Hunza Valley",
    category: "Cultural",
    duration: 4,
    dateRange: "05 Jul – 08 Jul, 2027",
    price: 360,
    image: "/Images/tours/altit-baltit.jpg",
    href: "/tours/altit-baltit",
  },
  {
    id: "nanga-parbat-camping",
    slug: "nanga-parbat-camping",
    title: "Nanga Parbat Camping Experience",
    location: "Diamer – Nanga Parbat",
    region: "Diamer & Astore",
    category: "Camping",
    duration: 3,
    dateRange: "20 Jul – 22 Jul, 2027",
    price: 310,
    image: "/Images/tours/meadows.png",
    href: "/tours/nanga-parbat-camping",
  },
  {
    id: "passu-cathedral-trek",
    slug: "passu-cathedral-trek",
    title: "Passu Cathedral Peaks Trek",
    location: "Passu – Hunza",
    region: "Hunza Valley",
    category: "Trekking",
    duration: 6,
    dateRange: "02 Aug – 07 Aug, 2027",
    price: 690,
    href: "/tours/passu-cathedral-trek",
  },
  {
    id: "fairy-meadows-trek",
    slug: "fairy-meadows-trek",
    title: "Fairy Meadows Basecamp Trek",
    location: "Diamer – Astore",
    region: "Diamer & Astore",
    category: "Trekking",
    duration: 4,
    dateRange: "14 Aug – 17 Aug, 2027",
    price: 420,
    image: "/Images/tours/Fairy-meadows.png",
    href: "/tours/fairy-meadows-trek",
  },
  {
    id: "deosai-wildlife-safari",
    slug: "deosai-wildlife-safari",
    title: "Deosai Wildlife Safari",
    location: "Baltistan – Deosai",
    region: "Baltistan",
    category: "Wildlife & Nature",
    duration: 3,
    dateRange: "22 Aug – 24 Aug, 2027",
    price: 340,
    image: "/Images/tours/deosai.png",
    href: "/tours/deosai-wildlife-safari",
  },
  {
    id: "skardu-cold-desert",
    slug: "skardu-cold-desert",
    title: "Skardu Cold Desert Expedition",
    location: "Baltistan – Skardu",
    region: "Baltistan",
    category: "Adventure",
    duration: 5,
    dateRange: "05 Sep – 09 Sep, 2027",
    price: 500,
    image: "/Images/tours/Kaptana-desert.png",
    href: "/tours/skardu-cold-desert",
  },
  {
    id: "shigar-heritage-trail",
    slug: "shigar-heritage-trail",
    title: "Shigar Valley Heritage Trail",
    location: "Baltistan – Shigar",
    region: "Baltistan",
    category: "Cultural",
    duration: 4,
    dateRange: "18 Sep – 21 Sep, 2027",
    price: 380,
    image: "/Images/tours/shigar-fort.png",
    href: "/tours/shigar-heritage-trail",
  },
  {
    id: "attabad-karimabad-escape",
    slug: "attabad-karimabad-escape",
    title: "Attabad & Karimabad Lake Escape",
    location: "Hunza Valley",
    region: "Hunza Valley",
    category: "Lake & Leisure",
    duration: 3,
    dateRange: "01 Oct – 03 Oct, 2027",
    price: 300,
    image: "/Images/tours/attabad-lake.png",
    href: "/tours/attabad-karimabad-escape",
  },
  {
    id: "khunjerab-border-expedition",
    slug: "khunjerab-border-expedition",
    title: "Khunjerab Pass Border Expedition",
    location: "Hunza – Khunjerab",
    region: "Hunza Valley",
    category: "Adventure",
    duration: 2,
    dateRange: "12 Oct – 13 Oct, 2027",
    price: 260,
    image: "/Images/tours/khunjerab.png",
    href: "/tours/khunjerab-border-expedition",
  },
  {
    id: "phander-naltar-circuit",
    slug: "phander-naltar-circuit",
    title: "Phander & Naltar Lakes Circuit",
    location: "Gilgit & Ghizer",
    region: "Gilgit & Ghizer",
    category: "Lake & Leisure",
    duration: 4,
    dateRange: "25 Oct – 28 Oct, 2027",
    price: 340,
    href: "/tours/phander-naltar-circuit",
  },
];

/* ---- faint topographic contour lines behind the intro (same technique as /lands and AboutStory) ---- */
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

export default function ToursPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Hero
        eyebrow="UPCOMING JOURNEYS"
        title="Every trip, mapped and ready to book."
        description="Browse our full calendar of guided tours and seasonal events across Gilgit-Baltistan — filter by region, duration, or budget to find your next journey."
        primaryCta={{ label: "Talk to a Trip Planner", href: "/#contact" }}
        secondaryCta={null}
      />

      {/* Intro — same rhythm as the /lands page intro */}
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
              All tours &amp; events
            </div>

            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-forest sm:text-5xl lg:text-6xl">
              Plan your next
              <br />
              <span className="text-green">departure</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              From spring blossom tours to high-altitude treks, every trip on our calendar is
              guided, seasonal, and ready to book — filter below to find the one that fits.
            </p>
          </div>
        </div>
      </section>

      <ToursExplorer tours={TOURS} />
    </main>
  );
}
