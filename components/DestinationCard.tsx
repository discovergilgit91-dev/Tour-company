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

        <h3 className="mt-4 font-serif text-2xl leading-tight tracking-tight text-forest">{name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{blurb}</p>
        <p className="mt-auto pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-green">{tag}</p>
      </div>
    </Link>
  );
}

/* ---------------------------------------------------------------------
   Route map section — the Rawalpindi-to-Khunjerab tourist map paired
   with a creative itinerary timeline. Lives here rather than its own
   file since it shares useRevealOnScroll with the cards above.
   --------------------------------------------------------------------- */

const ROUTE_STOPS: { name: string; note: string; km: number }[] = [
  {
    name: "Islamabad / Rawalpindi",
    note: "Where the journey begins, on the edge of the Potohar plateau.",
    km: 0,
  },
  {
    name: "Abbottabad",
    note: "The road starts to climb as the plains give way to pine-covered hills.",
    km: 120,
  },
  {
    name: "Naran & Babusar Top",
    note: "Over the Kaghan valley's high alpine pass, above 4,000 metres.",
    km: 130,
  },
  {
    name: "Chilas",
    note: "The route joins the Karakoram Highway, tracing the Indus gorge.",
    km: 110,
  },
  {
    name: "Jaglot — Three Mountain Junction",
    note: "Where the Himalaya, Karakoram, and Hindu Kush meet in view of each other.",
    km: 95,
  },
  {
    name: "Gilgit",
    note: "The region's hub, at the confluence of the Gilgit and Hunza rivers.",
    km: 25,
  },
  {
    name: "Karimabad, Hunza",
    note: "Terraced orchards and forts beneath Rakaposhi and Ultar Sar.",
    km: 100,
  },
  {
    name: "Attabad Lake",
    note: "A brilliant turquoise lake, crossed by boat beneath the highway.",
    km: 35,
  },
  {
    name: "Passu & Borith Lake",
    note: "Cathedral peaks above the valley, and a quiet saline lake beyond Hussaini.",
    km: 20,
  },
  {
    name: "Sost",
    note: "The last town before the border — customs, fuel, and a final night.",
    km: 20,
  },
  {
    name: "Khunjerab Pass",
    note: "The highest paved border crossing on earth, at 4,700 metres.",
    km: 85,
  },
];

const TOTAL_KM = ROUTE_STOPS.reduce((sum, stop) => sum + stop.km, 0);

const LEGEND = [
  { label: "Main road", swatch: "bg-forest" },
  { label: "Link road", swatch: "bg-green" },
  { label: "Motorway", swatch: "bg-red-500" },
  { label: "Lake / waterfall", swatch: "bg-sky-500" },
];

function TimelineRow({
  index,
  stop,
  isLast,
}: {
  index: number;
  stop: (typeof ROUTE_STOPS)[number];
  isLast: boolean;
}) {
  const { ref, visible } = useRevealOnScroll<HTMLLIElement>();
  const number = String(index + 1).padStart(2, "0");

  return (
    <li
      ref={ref}
      style={{ transitionDelay: visible ? `${(index % 6) * 80}ms` : "0ms" }}
      className={`relative flex gap-5 pb-10 transition-[opacity,transform] duration-700 ease-out last:pb-0 motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      {/* connecting line + dot */}
      <div className="relative flex w-9 shrink-0 flex-col items-center">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-night text-[11px] font-semibold text-gold">
          {number}
        </span>
        {!isLast && <span className="mt-1 w-px flex-1 bg-cream/15" />}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h4 className="font-serif text-xl leading-tight text-cream sm:text-[22px]">{stop.name}</h4>
          {index > 0 && (
            <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
              +{stop.km} km
            </span>
          )}
        </div>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-cream/60">{stop.note}</p>
      </div>
    </li>
  );
}

export function RouteMapSection() {
  const { ref: mapRef, visible: mapVisible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <section id="route-map" className="relative overflow-hidden bg-night py-16 sm:py-20 lg:py-28">
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
        {/* header */}
        <div className="mb-12 max-w-2xl lg:mb-16">
          <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
            <CompassIcon size={16} />
            Plan your route
          </div>
          <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-cream sm:text-5xl">
            Islamabad to <span className="text-gold">Khunjerab Pass</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-cream/60 sm:text-base">
            One road, eleven landmarks, and every ecosystem in the north — from the Potohar plains to
            the highest paved border crossing on earth. Here&rsquo;s the classic Karakoram Highway
            route our tours are built around.
          </p>

          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cream/40">Distance</dt>
              <dd className="mt-1 font-serif text-2xl text-cream">~{TOTAL_KM.toLocaleString()} km</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cream/40">Landmarks</dt>
              <dd className="mt-1 font-serif text-2xl text-cream">{ROUTE_STOPS.length}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cream/40">Highest point</dt>
              <dd className="mt-1 font-serif text-2xl text-cream">4,700 m</dd>
            </div>
          </dl>
        </div>

        {/* map + timeline */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
          {/* map card, sticky on desktop */}
          <div
            ref={mapRef}
            style={{ transitionDelay: mapVisible ? "80ms" : "0ms" }}
            className={`lg:sticky lg:top-28 lg:self-start transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
              mapVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <div className="relative overflow-hidden rounded-[26px] border border-cream/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
              <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-cream/20 bg-night/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream backdrop-blur-sm">
                Tourist map
              </span>
              <div className="relative aspect-[3/4] w-full bg-forest">
                <Image
                  src="/Images/tours/khunjerab-route-map.webp"
                  alt="Tourist map of the Karakoram Highway route from Rawalpindi to Khunjerab Pass, Gilgit-Baltistan"
                  fill
                  quality={90}
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* legend strip, echoing the map's own legend */}
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 rounded-2xl border border-cream/10 bg-cream/[0.03] px-5 py-4">
              {LEGEND.map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-xs text-cream/60">
                  <span className={`h-1.5 w-4 rounded-full ${item.swatch}`} />
                  {item.label}
                </div>
              ))}
            </div>

            <LinkButton
              href="/#contact"
              variant="outline"
              className="group mt-5 w-full justify-center gap-2 text-[11px] uppercase tracking-[0.12em]"
            >
              Plan this route with us
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                <ArrowIcon size={13} />
              </span>
            </LinkButton>
          </div>

          {/* itinerary timeline */}
          <ol className="relative">
            {ROUTE_STOPS.map((stop, index) => (
              <TimelineRow key={stop.name} index={index} stop={stop} isLast={index === ROUTE_STOPS.length - 1} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
