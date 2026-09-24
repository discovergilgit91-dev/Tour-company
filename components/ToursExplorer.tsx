"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IconButton, LinkButton } from "./ui/Button";
import { ArrowIcon, CalendarIcon, ClockIcon, PinIcon } from "./ui/icons";
import { useRevealOnScroll } from "./DestinationCard";

export type Tour = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  /** Display string shown on the card, e.g. "Nagar – Hopar – Passu" */
  location: string;
  /** Coarser bucket used for filtering, matching the /lands region taxonomy */
  region: string;
  category: string;
  /** Trip length in days */
  duration: number;
  dateRange: string;
  /** Starting price in USD */
  price: number;
  image?: string;
  href: string;
};

const DURATION_BUCKETS = [
  { label: "1–3 Days", test: (d: number) => d <= 3 },
  { label: "4–6 Days", test: (d: number) => d >= 4 && d <= 6 },
  { label: "7+ Days", test: (d: number) => d >= 7 },
];

const PRICE_BUCKETS = [
  { label: "Under $350", test: (p: number) => p < 350 },
  { label: "$350 – $600", test: (p: number) => p >= 350 && p <= 600 },
  { label: "$600+", test: (p: number) => p > 600 },
];

function FilterGroup({
  label,
  options,
  active,
  onToggle,
}: {
  label: string;
  options: string[];
  active: string[];
  onToggle: (value: string) => void;
}) {
  if (options.length === 0) return null;

  return (
    <div className="border-t border-forest/10 pt-5 first:border-t-0 first:pt-0">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = active.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={isActive}
              onClick={() => onToggle(option)}
              className={`inline-flex items-center rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 ${
                isActive
                  ? "border-green/30 bg-green/10 text-forest"
                  : "border-forest/12 bg-white text-muted hover:border-forest/25 hover:text-forest"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
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

function TourCard({ tour, index }: { tour: Tour; index: number }) {
  const { ref, visible } = useRevealOnScroll<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      href={tour.href}
      style={{ transitionDelay: visible ? `${(index % 6) * 80}ms` : "0ms" }}
      className={`group flex h-[430px] w-full flex-col overflow-hidden rounded-[18px] bg-white shadow-[0_2px_18px_rgba(18,36,28,0.07)] outline-none transition-[opacity,transform] duration-700 ease-out focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-4 focus-visible:ring-offset-cream motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className="relative flex-1 overflow-hidden">
        {tour.image ? (
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <PhotoPlaceholder />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/25 to-transparent" />

        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-forest/90 px-3.5 py-2 font-sans text-[11px] font-semibold tracking-[0.06em] text-white backdrop-blur-sm">
          <ClockIcon size={14} />
          {tour.duration} {tour.duration === 1 ? "DAY" : "DAYS"}
        </div>

        <div className="absolute right-4 top-4 inline-flex items-center rounded-full bg-gold px-3.5 py-2 font-sans text-[11px] font-semibold tracking-[0.06em] text-forest">
          From ${tour.price}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="mb-2.5 flex items-center gap-2 text-white">
            <PinIcon size={15} />
            <span className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.13em]">
              {tour.location}
            </span>
          </div>

          <h3 className="font-serif text-[23px] leading-[1.15] text-white">{tour.title}</h3>

          {tour.subtitle && <p className="mt-1 font-sans text-[14px] text-white/85">{tour.subtitle}</p>}
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between gap-3 bg-white px-5 py-4">
        <div className="flex min-w-0 items-center gap-2.5 text-forest">
          <CalendarIcon size={16} />
          <span className="truncate font-sans text-[13px]">{tour.dateRange}</span>
        </div>

        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-white shadow-[0_6px_20px_rgba(0,0,0,0.18)] transition-colors duration-300 group-hover:bg-green">
          <span className="transition-transform duration-300 ease-out group-hover:-rotate-45">
            <ArrowIcon size={16} />
          </span>
        </span>
      </div>
    </Link>
  );
}

/* ---------------------------------------------------------------------
   Decorative gradient + line-art background — used anywhere a "photo" box
   doesn't have a real, correctly-captioned image to show (see the note in
   DestinationCard's PhotoPlaceholder). Keeps every placeholder box in this
   file honest instead of borrowing a mismatched stock asset.
   --------------------------------------------------------------------- */
function MountainBackdrop({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 bg-gradient-to-br from-green-dark via-forest to-night ${className}`}>
      <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMax slice" className="h-full w-full text-cream/[0.06]">
        <path
          d="M-20 210 40 130l35 45 45-70 45 65 40-35 60 80 50-45 70 90"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M-20 235 50 160l45 50 50-75 50 70 45-40 65 85 55-50 75 95"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Featured Event — a single highlight banner for the flagship event on
   the calendar, above the browsable grid.
   --------------------------------------------------------------------- */
const FEATURED_EVENT = {
  month: "Aug",
  day: "12",
  title: "Gilgit-Baltistan Cultural Festival",
  dateRange: "12 Aug – 14 Aug, 2027",
  location: "Gilgit City",
  description:
    "Immerse yourself in the vibrant culture, music, and traditional food of Gilgit-Baltistan — a celebration of our heritage and community spirit.",
  href: "/tours/gilgit-cultural-festival",
};

function FeaturedEvent() {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <section className="relative w-full overflow-hidden bg-cream pb-10 pt-2 sm:pb-12">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <div
          ref={ref}
          style={{ transitionDelay: visible ? "80ms" : "0ms" }}
          className={`grid grid-cols-1 overflow-hidden rounded-[26px] bg-forest shadow-[0_24px_60px_-24px_rgba(18,36,28,0.4)] transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none lg:grid-cols-2 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="relative aspect-[16/10] lg:aspect-auto">
            <MountainBackdrop />
            <span className="absolute left-5 top-5 flex flex-col items-center rounded-2xl bg-cream px-4 py-2.5 leading-none shadow-lg">
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-green">
                {FEATURED_EVENT.month}
              </span>
              <span className="mt-1 font-serif text-2xl text-forest">{FEATURED_EVENT.day}</span>
            </span>
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
            <div className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
              <span className="h-px w-8 bg-gold/60" />
              Featured Event
            </div>

            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-cream sm:text-4xl">
              {FEATURED_EVENT.title}
            </h2>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-cream/70">
              <span className="flex items-center gap-2">
                <CalendarIcon size={16} />
                {FEATURED_EVENT.dateRange}
              </span>
              <span className="flex items-center gap-2">
                <PinIcon size={16} />
                {FEATURED_EVENT.location}
              </span>
            </div>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/70 sm:text-base">
              {FEATURED_EVENT.description}
            </p>

            <LinkButton href={FEATURED_EVENT.href} variant="primary" className="group mt-7 w-fit gap-2">
              Learn More
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                <ArrowIcon size={14} />
              </span>
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------
   Coming Soon — a horizontal-scroll teaser strip built from the real
   tours that don't have a confirmed photo yet, so it's live data rather
   than invented copy.
   --------------------------------------------------------------------- */
function ComingSoonCard({ tour, index }: { tour: Tour; index: number }) {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-coming-card
      style={{ transitionDelay: visible ? `${(index % 4) * 90}ms` : "0ms" }}
      className={`flex h-full w-full shrink-0 snap-start flex-col transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-60px)/4)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className="relative aspect-[4/3] shrink-0 overflow-hidden rounded-[18px]">
        <MountainBackdrop />
        <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-cream/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-forest">
          Coming Soon
        </span>
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="line-clamp-2 min-h-[46px] font-serif text-lg leading-tight text-forest">{tour.title}</h3>
        <p className="mt-auto pt-1.5 text-sm leading-relaxed text-muted">{tour.location}</p>
      </div>
    </div>
  );
}

function ComingSoonSection({ tours }: { tours: Tour[] }) {
  const teasers = useMemo(() => tours.filter((t) => !t.image).slice(0, 8), [tours]);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activePage, setActivePage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(1);

  const updateCardsPerPage = useCallback(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth >= 1024) setCardsPerPage(4);
    else if (window.innerWidth >= 640) setCardsPerPage(2);
    else setCardsPerPage(1);
  }, []);

  useEffect(() => {
    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, [updateCardsPerPage]);

  const pageCount = Math.max(1, Math.ceil(teasers.length / cardsPerPage));

  const scrollToPage = (page: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-coming-card]");
    if (!card) return;

    const gap = 20;
    const cardWidth = card.offsetWidth;
    const safePage = Math.min(Math.max(page, 0), pageCount - 1);

    track.scrollTo({ left: safePage * cardsPerPage * (cardWidth + gap), behavior: "smooth" });
    setActivePage(safePage);
  };

  if (teasers.length === 0) return null;

  return (
    <section className="relative w-full overflow-hidden bg-cream pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-24 lg:pt-12">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between lg:mb-12">
          <div className="max-w-xl">
            <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              <span className="h-px w-8 bg-muted/60" />
              Future experiences
            </div>
            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-forest sm:text-5xl">
              Coming <span className="text-green">soon</span>
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <p className="max-w-[220px] text-sm leading-relaxed text-muted">
              More incredible tours and events are on the way. Stay tuned for new adventures!
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <IconButton
                variant="outline"
                onClick={() => scrollToPage(activePage - 1)}
                disabled={activePage === 0}
                aria-label="Previous experiences"
              >
                <span className="rotate-180">
                  <ArrowIcon size={16} />
                </span>
              </IconButton>
              <IconButton
                onClick={() => scrollToPage(activePage + 1)}
                disabled={activePage >= pageCount - 1}
                aria-label="Next experiences"
              >
                <ArrowIcon size={16} />
              </IconButton>
            </div>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollBehavior: "smooth" }}
        >
          {teasers.map((tour, index) => (
            <ComingSoonCard key={tour.id} tour={tour} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------
   Why Travel With Us — a simple 4-column trust grid.
   --------------------------------------------------------------------- */
function GuideIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 11 12 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ChecklistIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4.5" y="3.5" width="15" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.5 9.5l1.8 1.8 3.2-3.6M8.5 16h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeartIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 19.5s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 6.8 4.3 4.3 0 0 1 19.5 9.5c0 5.4-7.5 10-7.5 10Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GroupIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8.5" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="17" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15 12.5c1.8.4 3.2 1.8 3.5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const ADVANTAGES = [
  { icon: GuideIcon, title: "Local Guides", description: "Passionate locals who know every trail." },
  { icon: ChecklistIcon, title: "Carefully Planned", description: "Well-organized itineraries for a worry-free journey." },
  { icon: HeartIcon, title: "Authentic Experiences", description: "Real culture, real people, real memories." },
  { icon: GroupIcon, title: "Small Groups", description: "More connection, less crowd." },
];

function WhyTravelWithUs() {
  return (
    <section className="relative w-full overflow-hidden bg-cream pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-24 lg:pt-12">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            <span className="h-px w-8 bg-muted/60" />
            The Discover Gilgit advantage
          </div>
          <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-forest sm:text-5xl">
            Why travel <span className="text-green">with us</span>
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-10">
          {ADVANTAGES.map(({ icon: Icon, title, description }) => (
            <div key={title}>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest text-white">
                <Icon size={20} />
              </span>
              <h3 className="mt-4 font-serif text-xl leading-tight text-forest">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------
   Closing CTA banner.
   --------------------------------------------------------------------- */
function ClosingCta() {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-forest">
      <div
        ref={ref}
        style={{ transitionDelay: visible ? "80ms" : "0ms" }}
        className={`relative mx-auto w-full max-w-6xl px-5 py-16 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none sm:px-6 sm:py-20 lg:px-8 lg:py-24 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-gold/10 blur-3xl lg:block"
        />
        <svg
          aria-hidden
          viewBox="0 0 600 400"
          preserveAspectRatio="xMaxYMid slice"
          className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-1/2 text-cream/[0.05] lg:block"
        >
          <path
            d="M-40 300 60 190l60 75 75-115 75 105 65-55 100 130 85-75 120 145"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>

        <div className="relative max-w-xl">
          <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/60">
            <span className="h-px w-8 bg-cream/30" />
            Your next mountain story
          </div>
          <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-cream sm:text-5xl">
            <span className="heading-accent">Starts here.</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/70 sm:text-base">
            Explore our upcoming tours and events, and be part of something extraordinary.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/lands" variant="primary" className="group gap-2">
              Explore Destinations
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                <ArrowIcon size={14} />
              </span>
            </LinkButton>
            <LinkButton href="/#contact" variant="outline">
              Contact Us
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ToursExplorer({ tours }: { tours: Tour[] }) {
  const [regions, setRegions] = useState<string[]>([]);
  const [durations, setDurations] = useState<string[]>([]);
  const [prices, setPrices] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const regionOptions = useMemo(() => Array.from(new Set(tours.map((t) => t.region))), [tours]);
  const categoryOptions = useMemo(() => Array.from(new Set(tours.map((t) => t.category))), [tours]);

  function toggle(value: string, list: string[], setList: (v: string[]) => void) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  const filtered = useMemo(() => {
    return tours.filter((tour) => {
      if (regions.length && !regions.includes(tour.region)) return false;
      if (categories.length && !categories.includes(tour.category)) return false;
      if (durations.length) {
        const matches = durations.some((label) => DURATION_BUCKETS.find((b) => b.label === label)?.test(tour.duration));
        if (!matches) return false;
      }
      if (prices.length) {
        const matches = prices.some((label) => PRICE_BUCKETS.find((b) => b.label === label)?.test(tour.price));
        if (!matches) return false;
      }
      return true;
    });
  }, [tours, regions, categories, durations, prices]);

  const stats = useMemo(() => {
    const cheapest = tours.reduce((a, b) => (b.price < a.price ? b : a));
    const longest = tours.reduce((a, b) => (b.duration > a.duration ? b : a));
    return { total: tours.length, regionCount: regionOptions.length, cheapest, longest };
  }, [tours, regionOptions]);

  const activeCount = regions.length + durations.length + prices.length + categories.length;

  function clearAll() {
    setRegions([]);
    setDurations([]);
    setPrices([]);
    setCategories([]);
  }

  return (
    <>
      <FeaturedEvent />
      <ComingSoonSection tours={tours} />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-2 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
        {/* ---------------- left sidebar: filters + quick facts ---------------- */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Filter tours</p>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="text-[11px] font-semibold uppercase tracking-[0.12em] text-green underline-offset-4 hover:underline"
              >
                Clear ({activeCount})
              </button>
            )}
          </div>

          <div className="mt-4 space-y-5 rounded-2xl border border-forest/10 bg-white p-5">
            <FilterGroup label="Region" options={regionOptions} active={regions} onToggle={(v) => toggle(v, regions, setRegions)} />
            <FilterGroup
              label="Duration"
              options={DURATION_BUCKETS.map((b) => b.label)}
              active={durations}
              onToggle={(v) => toggle(v, durations, setDurations)}
            />
            <FilterGroup
              label="Budget"
              options={PRICE_BUCKETS.map((b) => b.label)}
              active={prices}
              onToggle={(v) => toggle(v, prices, setPrices)}
            />
            <FilterGroup label="Trip type" options={categoryOptions} active={categories} onToggle={(v) => toggle(v, categories, setCategories)} />
          </div>

          <div className="mt-6 rounded-2xl border border-forest/10 bg-white p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">At a glance</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted">Tours &amp; events</dt>
                <dd className="font-semibold text-forest">{stats.total}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted">Regions</dt>
                <dd className="font-semibold text-forest">{stats.regionCount}</dd>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-forest/10 pt-3">
                <dt className="text-muted">Most affordable</dt>
                <dd className="text-right font-semibold text-forest">
                  {stats.cheapest.title}
                  <span className="block text-xs font-normal text-muted">From ${stats.cheapest.price}</span>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted">Longest trip</dt>
                <dd className="text-right font-semibold text-forest">
                  {stats.longest.title}
                  <span className="block text-xs font-normal text-muted">{stats.longest.duration} days</span>
                </dd>
              </div>
            </dl>
          </div>

          <LinkButton
            href="/#contact"
            variant="dark"
            className="group mt-5 w-full justify-center gap-2 text-[11px] uppercase tracking-[0.12em]"
          >
            Need a custom itinerary?
            <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
              <ArrowIcon size={13} />
            </span>
          </LinkButton>
        </aside>

        {/* ---------------- right: filtered grid ---------------- */}
        <div>
          <div className="mb-6 flex items-center justify-between gap-4 border-b border-forest/10 pb-4">
            <p className="text-sm text-muted">
              Showing <span className="font-semibold text-forest">{filtered.length}</span> of {tours.length} tours
            </p>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((tour, index) => (
                <TourCard key={tour.id} tour={tour} index={index} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-forest/15 bg-white/60 px-6 py-16 text-center">
              <p className="font-serif text-xl text-forest">No tours match those filters</p>
              <p className="mt-2 text-sm text-muted">Try clearing a filter or two to see more journeys.</p>
              <button
                type="button"
                onClick={clearAll}
                className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-green underline-offset-4 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
      </div>

      <WhyTravelWithUs />
      <ClosingCta />
    </>
  );
}
