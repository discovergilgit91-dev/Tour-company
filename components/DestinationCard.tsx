"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LinkButton } from "./ui/Button";
import { ArrowIcon, CompassIcon } from "./ui/icons";

export type Destination = {
  id: string;
  name: string;
  blurb: string;
  /** Path under /public. Leave unset to show the "photo coming soon" placeholder instead of a broken image. */
  image?: string;
  tag: string;
  href: string;
  /** Approximate elevation shown under the photo, e.g. "2,500 m" */
  altitude: string;
  /** Optional CSS object-position for the photo crop, e.g. "50% 30%" */
  focus?: string;
  /** Route-ready identifier for a future /destinations/[slug] detail page */
  slug?: string;
  /** No longer used by the layout — kept so existing callers still type-check */
  span?: string;
};

export function useRevealOnScroll<T extends HTMLElement>() {
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

function PhotoPlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-forest to-night text-cream/50">
      <svg width="28" height="18" viewBox="0 0 50 30" fill="none" aria-hidden="true">
        <path d="M2 27 17 6l8 11 6-7 15 17H2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em]">Photo coming soon</span>
    </div>
  );
}

export function DestinationCard({
  destination,
  index,
  delay = 0,
  featured = false,
}: {
  destination: Destination;
  index: number;
  delay?: number;
  /** Marks the card with a "Featured" badge and a gold ring. Same size and grid cell as every other card — only the badge/ring set it apart, so every photo in the grid stays perfectly aligned. */
  featured?: boolean;
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
        "group flex h-full flex-col rounded-[22px] outline-none",
        "focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-4 focus-visible:ring-offset-cream",
        "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      ].join(" ")}
    >
      {/* photo — every card uses the exact same box (aspect-[4/5], same
          rounded corners) so widths and heights line up perfectly across
          the whole grid; "featured" only adds a badge and a ring, never a
          different size. */}
      <div
        className={`relative aspect-[4/5] shrink-0 overflow-hidden rounded-[22px] bg-forest ${
          featured ? "ring-2 ring-gold ring-offset-2 ring-offset-cream" : ""
        }`}
      >
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            quality={85}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            style={focus ? { objectPosition: focus } : undefined}
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
        ) : (
          <PhotoPlaceholder />
        )}

        {featured && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-cream/25 bg-night/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream backdrop-blur-sm">
            Featured
          </span>
        )}

        <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-cream text-forest shadow-[0_6px_20px_rgba(0,0,0,0.18)] transition-colors duration-300 group-hover:bg-green group-hover:text-white">
          <span className="transition-transform duration-300 ease-out group-hover:-rotate-45">
            <ArrowIcon size={16} />
          </span>
        </span>
      </div>

      {/* caption: number + elevation, a hairline that turns green on hover, then the text.
          Flex column filling the grid-stretched card height, with the tag pushed to the
          bottom via mt-auto — keeps "DISCOVER X" aligned across a row regardless of how
          many lines the blurb wraps to. */}
      <div className="mt-4 flex flex-1 flex-col">
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

        <h3 className="mt-4 line-clamp-2 min-h-[60px] font-serif text-2xl leading-tight tracking-tight text-forest">
          {name}
        </h3>
        <p className="mt-2 line-clamp-4 min-h-24 text-sm leading-relaxed text-muted">{blurb}</p>
        <p className="mt-auto pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-green">{tag}</p>
      </div>
    </Link>
  );
}

/* ---------------------------------------------------------------------
   Route map section — the Rawalpindi-to-Khunjerab tourist map paired
   with a compact, horizontally-scrolling itinerary strip. Lives here
   rather than its own file since it shares useRevealOnScroll with the
   cards above.
   --------------------------------------------------------------------- */

const ROUTE_STOPS: { name: string; note: string; km: number }[] = [
  { name: "Islamabad", note: "The journey begins", km: 0 },
  { name: "Abbottabad", note: "Pine hills, first climb", km: 120 },
  { name: "Naran & Babusar Top", note: "4,000 m alpine pass", km: 130 },
  { name: "Chilas", note: "Joins the Karakoram Highway", km: 110 },
  { name: "Jaglot", note: "Three mountain ranges meet", km: 95 },
  { name: "Gilgit", note: "River-side regional hub", km: 25 },
  { name: "Karimabad, Hunza", note: "Orchards beneath Rakaposhi", km: 100 },
  { name: "Attabad Lake", note: "Turquoise water by boat", km: 35 },
  { name: "Passu & Borith Lake", note: "Cathedral peaks, still water", km: 20 },
  { name: "Sost", note: "Last stop before the border", km: 20 },
  { name: "Khunjerab Pass", note: "Highest crossing on earth", km: 85 },
];

const TOTAL_KM = ROUTE_STOPS.reduce((sum, stop) => sum + stop.km, 0);

const HIGHLIGHTS = [
  "Every ecosystem in the north, on one road",
  "Guided support at each stop along the way",
  "From 500 m plains to the 4,700 m pass",
];

function StopChip({ index, stop }: { index: number; stop: (typeof ROUTE_STOPS)[number] }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <li className="group flex w-[168px] shrink-0 snap-start flex-col gap-4 rounded-2xl border border-cream/10 bg-cream/[0.03] p-4 transition-colors duration-300 hover:border-gold/30 hover:bg-cream/[0.06] sm:w-[188px]">
      <div className="flex items-center justify-between">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 text-[11px] font-semibold text-gold">
          {number}
        </span>
        {index > 0 && (
          <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-cream/35">+{stop.km} km</span>
        )}
      </div>
      <div>
        <h4 className="font-serif text-base leading-snug text-cream">{stop.name}</h4>
        <p className="mt-1 text-xs leading-snug text-cream/50">{stop.note}</p>
      </div>
    </li>
  );
}

export function RouteMapSection() {
  const { ref: mapRef, visible: mapVisible } = useRevealOnScroll<HTMLDivElement>();
  const scrollRef = useRef<HTMLUListElement>(null);

  function scrollStrip(delta: number) {
    scrollRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  }

  return (
    <section id="route-map" className="relative overflow-hidden bg-night py-16 sm:py-20 lg:py-24">
      {/* faint road-line texture in the background */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]"
        preserveAspectRatio="none"
      >
        <pattern id="route-grid" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M56 0H0V56" fill="none" stroke="#f6f1e7" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#route-grid)" />
      </svg>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-gold/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        {/* header + map + highlights */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,300px)_1fr] lg:items-center lg:gap-14">
          {/* map card */}
          <div
            ref={mapRef}
            style={{ transitionDelay: mapVisible ? "80ms" : "0ms" }}
            className={`order-2 mx-auto w-full max-w-[300px] transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none lg:order-1 lg:mx-0 ${
              mapVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <div className="relative overflow-hidden rounded-[22px] border border-cream/10 shadow-[0_24px_50px_-16px_rgba(0,0,0,0.6)]">
              <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-cream/20 bg-night/70 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-cream backdrop-blur-sm">
                Tourist map
              </span>
              <div className="relative aspect-[3/4] w-full bg-forest">
                <Image
                  src="/Images/tours/khunjerab-route-map.webp"
                  alt="Tourist map of the Karakoram Highway route from Rawalpindi to Khunjerab Pass, Gilgit-Baltistan"
                  fill
                  quality={90}
                  sizes="300px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* header + highlights + stats */}
          <div className="order-1 lg:order-2">
            <div className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
              <CompassIcon size={16} />
              Plan your route
            </div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-cream sm:text-4xl">
              Islamabad to <span className="text-gold">Khunjerab Pass</span>
            </h2>

            <ul className="mt-5 space-y-2">
              {HIGHLIGHTS.map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-sm leading-relaxed text-cream/60">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cream/40">Distance</p>
                <p className="mt-0.5 font-serif text-xl text-cream">~{TOTAL_KM.toLocaleString()} km</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cream/40">Landmarks</p>
                <p className="mt-0.5 font-serif text-xl text-cream">{ROUTE_STOPS.length}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cream/40">Highest</p>
                <p className="mt-0.5 font-serif text-xl text-cream">4,700 m</p>
              </div>

              <LinkButton
                href="/#contact"
                variant="outline"
                className="group ml-auto gap-2 text-[11px] uppercase tracking-[0.12em]"
              >
                Plan this route
                <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                  <ArrowIcon size={13} />
                </span>
              </LinkButton>
            </div>
          </div>
        </div>

        {/* itinerary strip — horizontal scroll instead of a long vertical list */}
        <div className="relative mt-12 lg:mt-14">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cream/40">
              The full itinerary
            </p>
            <div className="hidden gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scrollStrip(-220)}
                aria-label="Scroll to previous stops"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/15 text-cream/60 transition-colors duration-300 hover:border-gold/40 hover:text-gold"
              >
                <span className="rotate-180">
                  <ArrowIcon size={13} />
                </span>
              </button>
              <button
                type="button"
                onClick={() => scrollStrip(220)}
                aria-label="Scroll to next stops"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/15 text-cream/60 transition-colors duration-300 hover:border-gold/40 hover:text-gold"
              >
                <ArrowIcon size={13} />
              </button>
            </div>
          </div>

          <ul
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ maskImage: "linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)" }}
          >
            {ROUTE_STOPS.map((stop, index) => (
              <StopChip key={stop.name} index={index} stop={stop} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
