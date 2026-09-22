"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LinkButton } from "./ui/Button";
import { ArrowIcon } from "./ui/icons";

type Destination = {
  id: string;
  name: string;
  blurb: string;
  image: string;
  tag: string;
  href: string;
  /** Approximate elevation shown under the photo */
  altitude: string;
  /** Optional CSS object-position for the photo crop, e.g. "50% 30%" */
  focus?: string;
  /** No longer used by the layout — kept so existing callers still type-check */
  span?: string;
};

const DEFAULT_DESTINATIONS: Destination[] = [
  {
    id: "hunza",
    name: "Hunza Valley",
    blurb: "Terraced orchards, ancient forts, and snow-capped peaks framing a valley of legend.",
    image: "/Images/tours/passu-cones.jpg",
    tag: "Discover Hunza",
    href: "/destinations/hunza-valley",
    altitude: "2,500 m",
  },
  {
    id: "deosai",
    name: "Deosai Plains",
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
    blurb: "Cold desert dunes beside turquoise lakes, gateway to the world's highest peaks.",
    image: "/Images/tours/cold-desert.png",
    tag: "Discover Skardu",
    href: "/destinations/skardu-katpana",
    altitude: "2,230 m",
  },
  {
    id: "fairy-meadows",
    name: "Fairy Meadows",
    blurb: "Alpine meadows at the foot of Nanga Parbat, wrapped in pine forest and morning mist.",
    image: "/Images/tours/nanga-parbat.png",
    tag: "Discover Fairy Meadows",
    href: "/destinations/fairy-meadows",
    altitude: "3,300 m",
  },
];

function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function DestinationCard({
  destination,
  index,
  delay = 0,
}: {
  destination: Destination;
  index: number;
  delay?: number;
}) {
  const { name, blurb, image, tag, href, altitude, focus } = destination;
  const { ref, visible } = useRevealOnScroll<HTMLAnchorElement>();
  const number = String(index + 1).padStart(2, "0");

  return (
    <Link
      ref={ref}
      href={href}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={[
        "group block rounded-[22px] outline-none",
        "focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-4 focus-visible:ring-offset-cream",
        "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      ].join(" ")}
    >
      {/* photo — clean, just a round button in the corner */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-forest">
        <Image
          src={image}
          alt={name}
          fill
          quality={85}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          style={focus ? { objectPosition: focus } : undefined}
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />

        <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-cream text-forest shadow-[0_6px_20px_rgba(0,0,0,0.18)] transition-colors duration-300 group-hover:bg-green group-hover:text-white">
          <span className="transition-transform duration-300 ease-out group-hover:-rotate-45">
            <ArrowIcon size={16} />
          </span>
        </span>
      </div>

      {/* caption: number + elevation, a hairline that turns green on hover, then the text */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          <span>{number}</span>
          <span className="flex items-center gap-1.5">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-green">
              <path d="M2 20 9.5 7l4 6.5L16 10l6 10H2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            {altitude}
          </span>
        </div>

        <div className="relative mt-3 h-px bg-forest/10">
          <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-green transition-transform duration-500 ease-out group-hover:scale-x-100" />
        </div>

        <h3 className="mt-4 font-serif text-2xl leading-tight tracking-tight text-forest">{name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{blurb}</p>
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-green">{tag}</p>
      </div>
    </Link>
  );
}

export default function FeaturedDestinations({
  eyebrow = "Featured destinations",
  heading = "Places that stay",
  headingAccent = "with you",
  ctaLabel = "View all lands",
  ctaHref = "/destinations",
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
