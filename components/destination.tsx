"use client";

import { LinkButton } from "./ui/Button";
import { ArrowIcon } from "./ui/icons";
import { DestinationCard, type Destination } from "./DestinationCard";

// The four districts featured on the homepage. Hunza has its own guide page;
// the others link to their section on /lands until their district pages exist
// (then point `href` at /destinations/<district>). The elevation line is the
// lowest-to-highest of the listed places in that area, taken from their pages.
const DEFAULT_DESTINATIONS: Destination[] = [
  {
    id: "hunza",
    name: "Hunza Valley",
    slug: "hunza",
    blurb: "Terraced orchards, ancient forts, and snow-capped peaks framing a valley of legend.",
    image: "/Images/tours/passu-cones.jpg",
    tag: "Discover Hunza",
    href: "/destinations/hunza",
    altitude: "2,100 m – 4,700 m",
  },
  {
    id: "skardu",
    name: "Skardu",
    slug: "skardu",
    blurb: "Cold desert dunes, turquoise lakes and the high plains of Deosai — gateway to the world's highest peaks.",
    image: "/Images/tours/deosai-plains.jpg",
    tag: "Explore Skardu",
    href: "/lands#baltistan",
    altitude: "2,230 m – 4,114 m",
  },
  {
    id: "nagar",
    name: "Nagar",
    slug: "nagar",
    blurb: "Glaciers, high pastures, and the road to Rakaposhi.",
    image: "/Images/tours/nagar-glacier.png",
    // Keeps the trekker and the peak both inside the tall card crop.
    focus: "35% 50%",
    tag: "Discover Nagar",
    href: "/lands#nagar",
    altitude: "2,700 m – 4,694 m",
  },
  {
    id: "diamer",
    name: "Diamer",
    slug: "diamer",
    blurb: "Alpine meadows and quiet lakes at the foot of Nanga Parbat, wrapped in pine forest and morning mist.",
    image: "/Images/tours/nanga-parbat.png",
    tag: "Discover Diamer",
    href: "/lands#diamer-astore",
    altitude: "3,077 m – 3,300 m",
  },
];

export default function FeaturedDestinations({
  eyebrow = "Featured destinations",
  heading = "Places that stay",
  headingAccent = "with you",
  ctaLabel = "View all lands",
  ctaHref = "/lands",
  destinations = DEFAULT_DESTINATIONS,
}: {
  eyebrow?: string;
  heading?: string;
  headingAccent?: string;
  ctaLabel?: string;
  ctaHref?: string;
  destinations?: Destination[];
}) {
  return (
    /* Same structure as WhyChooseUs / UpcomingTours / Header / Hero:
       no horizontal padding on the section — it lives on the max-w-6xl wrapper
       (px-5 sm:px-6 lg:px-8). Bottom padding matches the shared py-16 sm:py-20
       lg:py-24 rhythm; top padding is trimmed so sections don't stack extra
       dead space below the header. */
    <section
      id="destinations"
      className="relative w-full overflow-hidden bg-cream section-b section-t-tight"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-green/5 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end lg:gap-12 head-gap-b">
          <div className="max-w-2xl lg:max-w-none lg:shrink-0">
            <div className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted lg:mb-[1.5vh]">
              <span className="h-px w-8 bg-muted/60" />
              {eyebrow}
            </div>

            <h2 className="section-title font-serif text-4xl leading-[1.05] tracking-tight text-forest sm:text-5xl lg:whitespace-nowrap lg:text-6xl">
              {heading}
              <br className="lg:hidden" /> <span className="text-green">{headingAccent}</span>
            </h2>
          </div>

          <div className="flex max-w-xl flex-col items-start gap-4 lg:items-end lg:pb-1 lg:text-right">
            <p className="text-[15px] leading-[1.55] text-muted sm:text-base">
              From legendary mountain valleys to landscapes that feel untouched by time —
              discover the places that make Pakistan unforgettable.
            </p>
            <LinkButton href={ctaHref} variant="dark" className="group w-fit shrink-0 text-[11px] uppercase tracking-[0.12em]">
              {ctaLabel}
              <ArrowIcon size={14} />
            </LinkButton>
          </div>
        </div>

        <div className="card-grid card-grid-4 card-grid-loose">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              index={index}
              delay={index * 120}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
