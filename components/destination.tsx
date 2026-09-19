"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LinkButton } from "./ui/Button";
import { ArrowIcon } from "./ui/icons";

type Destination = {
  id: string;
  name: string;
  blurb: string;
  image: string;
  tag: string;
  href: string;
  span: string;
};

const DEFAULT_DESTINATIONS: Destination[] = [
  {
    id: "hunza",
    name: "Hunza Valley",
    blurb: "Terraced orchards, ancient forts, and snow-capped peaks framing a valley of legend.",
    image: "/Images/tours/passu-cones.jpg",
    tag: "Discover Hunza",
    href: "/destinations/hunza-valley",
    span: "lg:col-span-7",
  },
  {
    id: "deosai",
    name: "Deosai Plains",
    blurb:
      "The 'Land of Giants' — vast alpine plateau where brown bears roam beneath endless sky.",
    image: "/Images/tours/deosai-plains.png",
    tag: "Explore Deosai",
    href: "/destinations/deosai-plains",
    span: "lg:col-span-5",
  },
  {
    id: "skardu",
    name: "Skardu & Katpana",
    blurb: "Cold desert dunes beside turquoise lakes, gateway to the world's highest peaks.",
    image: "/Images/tours/cold-desert.png",
    tag: "Discover Skardu",
    href: "/destinations/skardu-katpana",
    span: "lg:col-span-5",
  },
  {
    id: "fairy-meadows",
    name: "Fairy Meadows",
    blurb: "Alpine meadows at the foot of Nanga Parbat, wrapped in pine forest and morning mist.",
    image: "/Images/tours/nanga-parbat.png",
    tag: "Discover Fairy Meadows",
    href: "/destinations/fairy-meadows",
    span: "lg:col-span-7",
  },
];

const DESTINATION_NUMBERS: Record<string, string> = {
  hunza: "01",
  deosai: "02",
  skardu: "03",
  "fairy-meadows": "04",
};

function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

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
  className = "",
  delay = 0,
}: {
  destination: Destination;
  className?: string;
  delay?: number;
}) {
  const { name, blurb, image, tag, href } = destination;
  const { ref, visible } = useRevealOnScroll<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      href={href}
      style={visible ? { animationDelay: `${delay}ms` } : undefined}
      className={[
        "destination-card group relative isolate block min-h-[330px] overflow-hidden rounded-[28px] outline-none",
        "transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(20,35,31,0.25)]",
        "focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-4 focus-visible:ring-offset-cream",
        "sm:min-h-[370px] md:min-h-[390px] lg:min-h-[410px]",
        visible ? "destination-card-visible" : "",
        className,
      ].join(" ")}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-gradient-to-t from-forest/95 via-forest/35 to-transparent opacity-90 transition-all duration-700 group-hover:via-forest/20"
      />

      <div className="absolute left-6 top-6 z-10 sm:left-7 sm:top-7">
        <span className="inline-flex items-center rounded-full border border-cream/20 bg-cream/10 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream backdrop-blur-md transition-all duration-500 group-hover:bg-cream/20">
          Pakistan
        </span>
      </div>

      <div className="absolute right-6 top-6 z-10 font-serif text-sm text-cream/60 transition-all duration-500 group-hover:text-cream sm:right-7 sm:top-7">
        {DESTINATION_NUMBERS[destination.id]}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 p-6 transition-transform duration-700 ease-out group-hover:-translate-y-1 sm:p-8">
        <div className="max-w-xl">
          <h3 className="font-serif text-3xl leading-[1.05] tracking-tight text-cream sm:text-4xl">
            {name}
          </h3>

          <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-cream/75 transition-all duration-500 group-hover:text-cream/90">
            {blurb}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-gold transition-colors duration-300 group-hover:text-cream">
              {tag}
            </span>

            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-cream/25 bg-cream/10 text-cream backdrop-blur-sm transition-all duration-500 group-hover:translate-x-2 group-hover:border-cream/60 group-hover:bg-cream group-hover:text-forest">
              <ArrowIcon size={13} />
            </span>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-[28px] border border-cream/0 transition-all duration-700 group-hover:border-cream/25"
      />
    </Link>
  );
}

export default function FeaturedDestinations({
  eyebrow = "Featured destinations",
  heading = "Places that stay with you",
  ctaLabel = "View all lands",
  ctaHref = "/destinations",
  destinations = DEFAULT_DESTINATIONS,
}: {
  eyebrow?: string;
  heading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  destinations?: Destination[];
}) {
  return (
    /* No horizontal padding on the section: it lives inside the container below,
       exactly like Header.tsx and Hero.tsx (max-w-6xl + px-4 sm:px-6). */
    <section className="relative overflow-hidden bg-cream py-20 sm:py-24 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-green/5 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mb-12 flex flex-col justify-between gap-8 lg:mb-14 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              <span className="h-px w-8 bg-muted/60" />
              {eyebrow}
            </div>

            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-forest sm:text-5xl lg:text-6xl">
              {heading}
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

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              className={destination.span}
              delay={index * 140}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
