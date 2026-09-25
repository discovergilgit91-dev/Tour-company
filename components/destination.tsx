"use client";

import { LinkButton } from "./ui/Button";
import { ArrowIcon } from "./ui/icons";
import { DestinationCard, type Destination } from "./DestinationCard";

const DEFAULT_DESTINATIONS: Destination[] = [
  {
    id: "hunza",
    name: "Hunza Valley",
    slug: "hunza-valley",
    blurb: "Terraced orchards, ancient forts, and snow-capped peaks framing a valley of legend.",
    image: "/Images/tours/passu-cones.jpg",
    tag: "Discover Hunza",
    href: "/destinations/karimabad",
    altitude: "2,500 m",
  },
  {
    id: "deosai",
    name: "Deosai Plains",
    slug: "deosai-plains",
    blurb:
      "The 'Land of Giants' — vast alpine plateau where brown bears roam beneath endless sky.",
    image: "/Images/tours/deosai-plains.png",
    tag: "Explore Deosai",
    href: "/destinations/deosai-plains",
    altitude: "4,114 m",
  },
  {
    id: "skardu",
    name: "Skardu & Katpana",
    slug: "skardu-katpana",
    blurb: "Cold desert dunes beside turquoise lakes, gateway to the world's highest peaks.",
    image: "/Images/tours/sarfaranga-desert.png",
    tag: "Discover Skardu",
    href: "/destinations/skardu-katpana",
    altitude: "2,230 m",
  },
  {
    id: "fairy-meadows",
    name: "Fairy Meadows",
    slug: "fairy-meadows",
    blurb: "Alpine meadows at the foot of Nanga Parbat, wrapped in pine forest and morning mist.",
    image: "/Images/tours/nanga-parbat.png",
    tag: "Discover Fairy Meadows",
    href: "/destinations/fairy-meadows",
    altitude: "3,300 m",
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
      className="relative w-full overflow-hidden bg-cream pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-24 lg:pt-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-green/5 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-8 lg:mb-14 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              <span className="h-px w-8 bg-muted/60" />
              {eyebrow}
            </div>

            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-forest sm:text-5xl lg:text-6xl">
              {heading}
              <br />
              <span className="text-green">{headingAccent}</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              From legendary mountain valleys to landscapes that feel untouched by time —
              discover the places that make Pakistan unforgettable.
            </p>
          </div>

          <LinkButton href={ctaHref} variant="dark" className="group w-fit shrink-0 text-[11px] uppercase tracking-[0.12em]">
            {ctaLabel}
            <ArrowIcon size={14} />
          </LinkButton>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
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
