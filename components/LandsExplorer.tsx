"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LinkButton } from "./ui/Button";
import { ArrowIcon } from "./ui/icons";
import { DestinationCard, type Destination } from "./DestinationCard";

export type Region = {
  id: string;
  label: string;
  note: string;
  ids: string[];
};

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

function parseAltitude(value: string): number {
  return Number(value.replace(/[^\d]/g, "")) || 0;
}

export default function LandsExplorer({ destinations, regions }: { destinations: Destination[]; regions: Region[] }) {
  const byId = useMemo(() => new Map(destinations.map((d) => [d.id, d])), [destinations]);
  const [activeRegion, setActiveRegion] = useState(regions[0]?.id);
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

  let cardIndex = 0;

  return (
    <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8 lg:pb-24 lg:pt-14">
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
            href="/#contact"
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
            const hasFeatured = region.ids.includes(FEATURED_ID);
            const totalCols = region.ids.length + (hasFeatured ? 1 : 0);
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
    </div>
  );
}
