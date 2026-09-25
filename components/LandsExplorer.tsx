"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LinkButton } from "./ui/Button";
import { ArrowIcon, CompassIcon } from "./ui/icons";
import { DestinationCard, type Destination, type LandCategory, LAND_CATEGORY_LABELS } from "./DestinationCard";

export type Region = {
  id: string;
  label: string;
  note: string;
  ids: string[];
};

// Flagship card for the whole page — gets a "Featured" badge and ring
// (see DestinationCard), but the exact same size/grid cell as every
// other card, so all photos in the grid stay perfectly aligned.
const FEATURED_ID = "karimabad";

// Static, literal class strings so Tailwind's build-time scanner can find
// them (it can't see through a dynamically-built `lg:grid-cols-${n}`).
const GRID_COLS: Record<number, string> = {
  2: "sm:grid-cols-2 lg:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

const CATEGORY_ORDER: LandCategory[] = ["valleys", "mountains", "lakes", "cultural", "national-parks", "trekking"];

function parseAltitude(value: string): number {
  return Number(value.replace(/[^\d]/g, "")) || 0;
}

function SearchIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="m20 20-4.3-4.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 5 19 19M19 5 5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function LandsExplorer({ destinations, regions }: { destinations: Destination[]; regions: Region[] }) {
  const byId = useMemo(() => new Map(destinations.map((d) => [d.id, d])), [destinations]);
  const [activeRegion, setActiveRegion] = useState(regions[0]?.id);
  const [activeCategory, setActiveCategory] = useState<LandCategory | "all">("all");
  const [search, setSearch] = useState("");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveRegion(entry.target.id);
          }
        }
      },
      { rootMargin: "-110px 0px -65% 0px", threshold: 0 }
    );

    Object.values(sectionRefs.current).forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [regions]);

  const stats = useMemo(() => {
    const withAltitude = destinations.map((d) => ({ ...d, meters: parseAltitude(d.altitude) }));
    const highest = withAltitude.reduce((a, b) => (b.meters > a.meters ? b : a));
    const lowest = withAltitude.reduce((a, b) => (b.meters < a.meters ? b : a));
    return { total: destinations.length, regionCount: regions.length, highest, lowest };
  }, [destinations, regions]);

  const isFiltering = activeCategory !== "all" || search.trim().length > 0;

  const filteredResults = useMemo(() => {
    if (!isFiltering) return null;
    const query = search.trim().toLowerCase();
    return destinations.filter((d) => {
      const matchesCategory = activeCategory === "all" || d.category === activeCategory;
      const matchesQuery = query.length === 0 || d.name.toLowerCase().includes(query) || d.blurb.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [destinations, activeCategory, search, isFiltering]);

  let cardIndex = 0;

  return (
    <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8 lg:pb-24 lg:pt-14">
      {/* ---------------- Category filter + search ---------------- */}
      <div className="mb-10 flex flex-col gap-4 rounded-[22px] border border-forest/10 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors duration-200 ${
              activeCategory === "all" ? "bg-green text-white" : "bg-forest/[0.05] text-muted hover:text-forest"
            }`}
          >
            All
          </button>
          {CATEGORY_ORDER.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-200 ${
                activeCategory === category ? "bg-green text-white" : "bg-forest/[0.05] text-muted hover:text-forest"
              }`}
            >
              {LAND_CATEGORY_LABELS[category]}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64 sm:shrink-0">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/60">
            <SearchIcon size={15} />
          </span>
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search destinations..."
            className="w-full rounded-full border border-forest/12 bg-cream/40 py-2.5 pl-10 pr-9 text-sm text-forest placeholder:text-muted/50 outline-none transition-colors focus:border-green/50"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted/60 hover:text-forest"
            >
              <CloseIcon size={13} />
            </button>
          )}
        </div>
      </div>

      {isFiltering ? (
        /* ---------------- Filtered flat grid ---------------- */
        <div>
          <div className="mb-8 flex items-center justify-between gap-4">
            <p className="text-sm text-muted">
              <span className="font-semibold text-forest">{filteredResults?.length ?? 0}</span>{" "}
              {filteredResults?.length === 1 ? "destination" : "destinations"} found
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setSearch("");
              }}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-green hover:text-green-dark"
            >
              Clear filters
              <CloseIcon size={12} />
            </button>
          </div>

          {filteredResults && filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {filteredResults.map((destination, index) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  index={index}
                  delay={(index % 6) * 90}
                  featured={destination.id === FEATURED_ID}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-[22px] border border-dashed border-forest/15 bg-white py-16 text-center">
              <p className="font-serif text-xl text-forest">No destinations match that search</p>
              <p className="mt-2 max-w-sm text-sm text-muted">
                Try a different category or search term — or clear the filters to browse everything by region.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
          {/* ---------------- left sidebar: sticky region nav + quick facts ---------------- */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Explore by region</p>

            <nav className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:flex-nowrap lg:gap-1.5">
              {regions.map((region) => {
                const isActive = activeRegion === region.id;
                return (
                  <a
                    key={region.id}
                    href={`#${region.id}`}
                    className={`inline-flex items-center justify-between gap-3 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-300 lg:rounded-xl ${
                      isActive
                        ? "border-green/30 bg-green/10 text-forest"
                        : "border-forest/12 bg-white text-muted hover:border-forest/25 hover:text-forest"
                    }`}
                  >
                    <span>{region.label}</span>
                    <span className={`text-xs ${isActive ? "text-green" : "text-muted/70"}`}>
                      {region.ids.length.toString().padStart(2, "0")}
                    </span>
                  </a>
                );
              })}
            </nav>

            <div className="mt-6 rounded-2xl border border-forest/10 bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">At a glance</p>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted">Destinations</dt>
                  <dd className="font-semibold text-forest">{stats.total}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted">Regions</dt>
                  <dd className="font-semibold text-forest">{stats.regionCount}</dd>
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-forest/10 pt-3">
                  <dt className="text-muted">Highest point</dt>
                  <dd className="text-right font-semibold text-forest">
                    {stats.highest.name}
                    <span className="block text-xs font-normal text-muted">{stats.highest.altitude}</span>
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted">Lowest point</dt>
                  <dd className="text-right font-semibold text-forest">
                    {stats.lowest.name}
                    <span className="block text-xs font-normal text-muted">{stats.lowest.altitude}</span>
                  </dd>
                </div>
              </dl>
            </div>

            <LinkButton
              href="/plan-your-trip"
              variant="dark"
              className="group mt-5 w-full justify-center gap-2 text-[11px] uppercase tracking-[0.12em]"
            >
              Need help choosing?
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                <ArrowIcon size={13} />
              </span>
            </LinkButton>
          </aside>

          {/* ---------------- right: region sections ---------------- */}
          <div>
            {regions.map((region, regionIndex) => {
              const totalCols = Math.min(region.ids.length, 4);
              const gridColsClass = GRID_COLS[totalCols] ?? GRID_COLS[4];

              return (
                <section
                  key={region.id}
                  id={region.id}
                  ref={(node) => {
                    sectionRefs.current[region.id] = node;
                  }}
                  className={regionIndex === 0 ? "" : "pt-14 lg:pt-16"}
                >
                  <div className="mb-8 flex items-end justify-between gap-4 border-b border-forest/10 pb-4 lg:mb-10">
                    <div>
                      <span className="font-serif text-lg text-green">{String(regionIndex + 1).padStart(2, "0")}</span>
                      <h3 className="mt-1 font-serif text-2xl leading-tight tracking-tight text-forest sm:text-3xl">
                        {region.label}
                      </h3>
                    </div>
                    <p className="hidden text-right text-xs uppercase tracking-[0.12em] text-muted sm:block">
                      {region.note}
                    </p>
                  </div>

                  <div className={`grid grid-cols-1 gap-x-5 gap-y-12 ${gridColsClass}`}>
                    {region.ids.map((id) => {
                      const destination = byId.get(id);
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
                </section>
              );
            })}
          </div>
        </div>
      )}

      {/* ---------------- Closing stats banner ---------------- */}
      <div className="relative mt-16 overflow-hidden rounded-[26px] bg-forest px-6 py-10 sm:mt-20 sm:px-10 sm:py-12 lg:mt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-[320px] w-[320px] rounded-full bg-gold/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-16 h-[280px] w-[280px] rounded-full bg-green/15 blur-3xl"
        />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
              Your next adventure awaits
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-[1.1] tracking-tight text-cream sm:text-4xl">
              Explore All Destinations
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cream/65">
              From iconic mountains to hidden valleys, plan your journey through the most beautiful places in
              Gilgit-Baltistan.
            </p>
            <LinkButton href="/plan-your-trip" variant="primary" className="group mt-6 w-fit gap-2">
              Plan Your Trip
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                <ArrowIcon size={14} />
              </span>
            </LinkButton>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-6 lg:shrink-0">
            {[
              { label: "Stunning Destinations", value: `${stats.total}+` },
              { label: "Seasons of Beauty", value: "4" },
              { label: "Memories", value: "Endless" },
            ].map(({ label, value }) => (
              <div key={label} className="min-w-[120px] shrink-0 grow">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/[0.08] text-gold">
                  <CompassIcon size={16} />
                </span>
                <p className="mt-3 whitespace-nowrap font-serif text-3xl text-cream">{value}</p>
                <p className="mt-1 text-xs uppercase leading-snug tracking-[0.08em] text-cream/50">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
