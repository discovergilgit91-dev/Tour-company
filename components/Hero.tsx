"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LinkButton } from "./ui/Button";
import { savePendingSubmission } from "@/lib/pendingSubmission";
import { DESTINATIONS, GROUP_SIZES } from "@/lib/tripPlanningOptions";

export type HeroSlide = {
  src: string;
  alt: string;
  /** Small pill above the heading, e.g. "HUNZA VALLEY — THE KARAKORAM" */
  badge: string;
  titleLine1: string;
  /** Second heading line, rendered with the gold heading-accent gradient. Leave empty for a single-line heading. */
  titleLine2: string;
  description: string;
};

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    src: "/Images/tours/hunza-valley.png",
    alt: "Shimshal Valley in upper Hunza",
    badge: "HUNZA VALLEY — THE KARAKORAM",
    titleLine1: "Where the mountains",
    titleLine2: "touch the sky.",
    description:
      "Journey through Hunza's dramatic valleys, ancient villages, and towering peaks — guided by people who call these mountains home.",
  },
  {
    src: "/Images/tours/Fairy-meadows.jpg",
    alt: "Nanga Parbat, the Killer Mountain",
    badge: "FAIRY MEADOWS — NANGA PARBAT",
    titleLine1: "Stand beneath",
    titleLine2: "the Killer Mountain.",
    description:
      "Walk through the legendary meadows beneath Nanga Parbat, where alpine forests, open skies, and one of the world's great peaks meet.",
  },
  {
    src: "/Images/tours/baltit-fort.png",
    alt: "Baltit Fort in Hunza",
    badge: "BALTIT FORT — HUNZA",
    titleLine1: "A fortress where",
    titleLine2: "heritage meets the sky.",
    description:
      "Step inside centuries of Hunza's heritage at Baltit Fort — a remarkable mountain stronghold overlooking the ancient valley.",
  },
  {
    src: "/Images/tours/Kaptana-desert.png",
    alt: "Skardu Desert",
    badge: "SKARDU DESERT — SKARDU",
    titleLine1: "Where desert",
    titleLine2: "meets the Himalayas.",
    description:
      "Cross the surreal golden dunes of Skardu, surrounded by towering mountains — a landscape that feels impossible until you see it yourself.",
  },
  {
    src: "/Images/tours/skardu.png",
    alt: "The high alpine plains of Deosai National Park",
    badge: "DEOSAI — THE ROOF OF THE WORLD",
    titleLine1: "Into the wild.",
    titleLine2: "Above the clouds.",
    description:
      "Explore the vast high-altitude plains of Deosai, where endless horizons, wild landscapes, and Himalayan silence define the journey.",
  },
];

const SLIDE_DURATION_MS = 6000;

type HeroCta = { label: string; href: string };

const DEFAULT_PRIMARY_CTA: HeroCta = { label: "Explore journeys", href: "/lands" };
// There is no film page yet; send the second button somewhere real until there is one.
const DEFAULT_SECONDARY_CTA: HeroCta = { label: "Plan Your Trip", href: "/plan-your-trip" };

export type HeroProps = {
  /** Full slideshow (defaults to the homepage's 5-slide carousel). Omit and use the shorthand props below for a single static hero instead. */
  slides?: HeroSlide[];
  /** Shorthand for a single, non-rotating hero slide — e.g. for /lands. Ignored if `slides` is passed. */
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  /** Defaults to the homepage's "Explore journeys" button. Pass `null` to hide it. */
  primaryCta?: HeroCta | null;
  /** Defaults to the homepage's "Plan Your Trip" button. Pass `null` to hide it. */
  secondaryCta?: HeroCta | null;
  /** A single self-contained "watch video" button — opens a lightbox within Hero itself,
      no wiring required from the calling page. Typically used instead of primary/secondaryCta. */
  videoCta?: { label: string } | null;
  /** Defaults to shown for the multi-slide carousel, hidden for a single static hero. */
  showSearch?: boolean;
};

function PlayIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 8.5 15.5 12 10 15.5V8.5Z" fill="currentColor" />
    </svg>
  );
}

function VideoModal({ label, onClose }: { label: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-night/80 p-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-[22px] border border-cream/10 bg-forest shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors duration-300 hover:bg-cream hover:text-forest"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <div className="relative flex aspect-video w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-green-dark via-forest to-night">
          <svg
            viewBox="0 0 800 400"
            preserveAspectRatio="xMidYMax slice"
            className="pointer-events-none absolute inset-0 h-full w-full text-cream/[0.05]"
            aria-hidden="true"
          >
            <path
              d="M-40 340 80 200l70 90 90-140 90 130 80-70 120 160 100-90 140 170"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-cream/10 text-cream">
            <PlayIcon size={26} />
          </span>
          <p className="relative font-serif text-xl text-cream">{label}</p>
          <p className="relative text-sm text-cream/60">Video coming soon</p>
        </div>
      </div>
    </div>
  );
}

const TRAVELER_OPTIONS = ["1 Adult", "2 Adults", "2 Adults, 1 Child", "3 Adults", "4+ Adults"];

/** Hero keeps its own "N Adults" wording (visual design is frozen), so this
    bridges it to Plan Your Trip's different "group size" vocabulary. */
const TRAVELER_TO_GROUP_SIZE: Record<string, string> = {
  "1 Adult": GROUP_SIZES[0],
  "2 Adults": GROUP_SIZES[1],
  "2 Adults, 1 Child": GROUP_SIZES[2],
  "3 Adults": GROUP_SIZES[2],
  "4+ Adults": GROUP_SIZES[3],
};

type DateMode = "exact" | "flexible";

function formatDateRange(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return "";
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  return `${s.toLocaleDateString("en-US", opts)} – ${e.toLocaleDateString("en-US", opts)}`;
}

/** Closes a popover on outside click or Escape — same pattern as AccountMenu. */
function usePopoverClose(open: boolean, onClose: () => void, ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) onClose();
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
}

const TOGGLE_BUTTON_CLASS = (active: boolean) =>
  `flex-1 rounded-xl border px-3 py-2 text-[12px] font-medium transition-all duration-200 ${
    active
      ? "border-green bg-green/[0.06] text-green"
      : "border-forest/12 bg-white text-muted hover:border-forest/25 hover:text-forest"
  }`;

export function SearchBar() {
  const router = useRouter();

  const [destination, setDestination] = useState("");
  const [destinationOpen, setDestinationOpen] = useState(false);
  const destinationRef = useRef<HTMLDivElement>(null);
  usePopoverClose(destinationOpen, () => setDestinationOpen(false), destinationRef);

  const [dateMode, setDateMode] = useState<DateMode>("flexible");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [datesOpen, setDatesOpen] = useState(false);
  const datesRef = useRef<HTMLDivElement>(null);
  usePopoverClose(datesOpen, () => setDatesOpen(false), datesRef);

  const [travelers, setTravelers] = useState("2 Adults");

  const filteredDestinations = destination.trim()
    ? DESTINATIONS.filter((place) => place.toLowerCase().includes(destination.trim().toLowerCase()))
    : DESTINATIONS;

  function handleSearch() {
    const trimmed = destination.trim();
    const matched = trimmed
      ? DESTINATIONS.find((place) => place.toLowerCase() === trimmed.toLowerCase())
      : undefined;

    savePendingSubmission({
      formId: "plan-your-trip",
      returnTo: "/plan-your-trip",
      values: {
        destinations: matched ? [matched] : [],
        flexibleDestination: !matched,
        dateMode,
        startDate: dateMode === "exact" ? startDate : "",
        endDate: dateMode === "exact" ? endDate : "",
        groupSize: TRAVELER_TO_GROUP_SIZE[travelers] ?? GROUP_SIZES[1],
      },
    });
    router.push("/plan-your-trip");
  }

  const datesLabel =
    dateMode === "flexible"
      ? "I'm flexible"
      : startDate && endDate
        ? formatDateRange(startDate, endDate)
        : "";

  return (
    <div className="hero-search w-full">
      <div className="flex flex-col items-stretch gap-1.5 rounded-2xl bg-white p-1.5 shadow-[0_15px_40px_-12px_rgba(20,35,31,0.35)] sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:p-2 sm:shadow-[0_25px_60px_-15px_rgba(20,35,31,0.4)]">
        <div ref={destinationRef} className="relative flex min-w-0 flex-1 items-center gap-3 px-3.5 py-2 sm:px-4">
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            className="shrink-0 text-green sm:h-[18px] sm:w-[18px]"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
            <circle cx="12" cy="9.5" r="2.3" />
          </svg>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-[12.5px] font-semibold text-forest sm:text-[13px]">
              Where do you want to go?
            </span>
            <input
              type="text"
              value={destination}
              onChange={(event) => {
                setDestination(event.target.value);
                setDestinationOpen(true);
              }}
              onFocus={() => setDestinationOpen(true)}
              placeholder="Search destination..."
              autoComplete="off"
              className="w-full min-w-0 bg-transparent text-[12.5px] text-forest/50 outline-none placeholder:text-forest/40 sm:text-[13px]"
            />
          </div>

          {destinationOpen && (
            <div className="absolute left-0 top-full z-[60] mt-2 max-h-64 w-full min-w-[220px] overflow-y-auto rounded-2xl bg-white p-2 shadow-[0_20px_45px_-12px_rgba(7,23,25,0.35)] ring-1 ring-black/5">
              {filteredDestinations.length > 0 ? (
                filteredDestinations.map((place) => (
                  <button
                    key={place}
                    type="button"
                    onClick={() => {
                      setDestination(place);
                      setDestinationOpen(false);
                    }}
                    className="flex w-full items-center rounded-xl px-3 py-2 text-left text-[13px] text-forest/80 transition-colors hover:bg-forest/[0.06] hover:text-forest"
                  >
                    {place}
                  </button>
                ))
              ) : (
                <p className="px-3 py-2 text-[12.5px] text-forest/40">No matching destinations</p>
              )}
            </div>
          )}
        </div>

        <div className="hidden h-9 w-px bg-forest/10 sm:block" />
        <div className="h-px w-full bg-forest/10 sm:hidden" />

        <div ref={datesRef} className="relative flex min-w-0 flex-1 items-center gap-3 px-3.5 py-2 sm:px-4">
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            className="shrink-0 text-green sm:h-[18px] sm:w-[18px]"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
            <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" />
          </svg>
          <button
            type="button"
            onClick={() => setDatesOpen((prev) => !prev)}
            className="flex min-w-0 flex-1 flex-col text-left"
          >
            <span className="text-[12.5px] font-semibold text-forest sm:text-[13px]">
              Select Dates
            </span>
            <span className="w-full min-w-0 truncate text-[12.5px] text-forest/50 sm:text-[13px]">
              {datesLabel || <span className="text-forest/40">Check in – Check out</span>}
            </span>
          </button>

          {datesOpen && (
            <div className="absolute left-0 top-full z-[60] mt-2 w-[290px] rounded-2xl bg-white p-4 shadow-[0_20px_45px_-12px_rgba(7,23,25,0.35)] ring-1 ring-black/5">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setDateMode("exact")}
                  aria-pressed={dateMode === "exact"}
                  className={TOGGLE_BUTTON_CLASS(dateMode === "exact")}
                >
                  Exact dates
                </button>
                <button
                  type="button"
                  onClick={() => setDateMode("flexible")}
                  aria-pressed={dateMode === "flexible"}
                  className={TOGGLE_BUTTON_CLASS(dateMode === "flexible")}
                >
                  I&rsquo;m flexible
                </button>
              </div>

              {dateMode === "exact" && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div>
                    <label
                      htmlFor="hero-start-date"
                      className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-muted/70"
                    >
                      Start
                    </label>
                    <input
                      id="hero-start-date"
                      type="date"
                      value={startDate}
                      onChange={(event) => setStartDate(event.target.value)}
                      className="w-full cursor-pointer rounded-lg border border-forest/12 bg-white px-2.5 py-2 text-[12px] text-forest outline-none focus:border-green/50"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="hero-end-date"
                      className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-muted/70"
                    >
                      End
                    </label>
                    <input
                      id="hero-end-date"
                      type="date"
                      value={endDate}
                      min={startDate || undefined}
                      onChange={(event) => setEndDate(event.target.value)}
                      className="w-full cursor-pointer rounded-lg border border-forest/12 bg-white px-2.5 py-2 text-[12px] text-forest outline-none focus:border-green/50"
                    />
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => setDatesOpen(false)}
                className="mt-3 w-full rounded-xl bg-forest/[0.06] py-2 text-[12px] font-semibold text-forest transition-colors hover:bg-forest/[0.1]"
              >
                Done
              </button>
            </div>
          )}
        </div>

        <div className="hidden h-9 w-px bg-forest/10 sm:block" />
        <div className="h-px w-full bg-forest/10 sm:hidden" />

        <div className="flex min-w-0 flex-1 items-center gap-3 px-3.5 py-2 sm:px-4">
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            className="shrink-0 text-green sm:h-[18px] sm:w-[18px]"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="9" cy="8" r="3" />
            <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
            <circle cx="17" cy="8.5" r="2.2" />
            <path d="M15 12.5c1.8.4 3.2 1.8 3.5 4" />
          </svg>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-[12.5px] font-semibold text-forest sm:text-[13px]">
              Travelers
            </span>
            <select
              value={travelers}
              onChange={(event) => setTravelers(event.target.value)}
              className="w-full min-w-0 cursor-pointer appearance-none bg-transparent text-[12.5px] text-forest/50 outline-none sm:text-[13px]"
            >
              {TRAVELER_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            className="shrink-0 text-forest/40"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>

        <button
          type="button"
          onClick={handleSearch}
          className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-green px-5 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-green-dark hover:shadow-[0_10px_24px_-4px_rgba(31,106,76,0.5)] active:scale-[0.97] sm:px-6"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          Search
        </button>
      </div>
    </div>
  );
}

export default function Hero({
  slides,
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  primaryCta,
  secondaryCta,
  videoCta,
  showSearch,
}: HeroProps) {
  // A single static slide (eyebrow/title/description/image) instead of the
  // homepage's rotating carousel — used by pages like /lands. Falls back to
  // the homepage's DEFAULT_SLIDES whenever nothing custom is passed, so
  // `<Hero />` with no props (the homepage's call) is byte-for-byte the
  // same experience as before this component took props. `image` is
  // optional within custom mode — omit it for a decorative gradient
  // background instead of a photo, for pages that don't have one yet.
  const isCustom = !slides && Boolean(title);

  const resolvedSlides: HeroSlide[] =
    slides ??
    (isCustom
      ? [
          {
            src: image ?? "",
            alt: imageAlt ?? (title as string),
            badge: eyebrow ?? "",
            titleLine1: title as string,
            titleLine2: "",
            description: description ?? "",
          },
        ]
      : DEFAULT_SLIDES);

  const showSearchBar = showSearch ?? !isCustom;
  const resolvedPrimaryCta = primaryCta !== undefined ? primaryCta : isCustom ? null : DEFAULT_PRIMARY_CTA;
  const resolvedSecondaryCta = secondaryCta !== undefined ? secondaryCta : isCustom ? null : DEFAULT_SECONDARY_CTA;

  const [active, setActive] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (resolvedSlides.length <= 1) return;

    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % resolvedSlides.length);
    }, SLIDE_DURATION_MS);

    return () => clearInterval(id);
  }, [resolvedSlides.length]);

  const currentSlide = resolvedSlides[active] ?? resolvedSlides[0];

  return (
    <section className="relative bg-forest">
      <div className="relative min-h-[76svh] w-full sm:min-h-[82svh] md:min-h-[86svh]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {resolvedSlides.map((slide, i) => (
            <div
              key={`${slide.src}-${i}`}
              className={`hero-slide absolute inset-0 opacity-0 motion-reduce:scale-100 ${
                i === active ? "hero-slide--active motion-reduce:animate-none" : ""
              }`}
            >
              {slide.src ? (
                // next/image: the source photos are 2–3 MB, so let Next resize and
                // re-encode them for the visitor's screen. Only the first slide is
                // preloaded; the rest load as the slideshow reaches them.
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  quality={80}
                  sizes="100vw"
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-forest via-night to-forest" aria-hidden="true">
                  <svg
                    viewBox="0 0 800 500"
                    preserveAspectRatio="xMidYMax slice"
                    className="h-full w-full text-cream/[0.04]"
                    aria-hidden="true"
                  >
                    <path
                      d="M-40 420 80 260l70 90 90-140 90 130 80-70 120 160 100-90 140 170"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M-40 470 100 320l90 100 100-150 100 140 90-80 130 170 110-100 150 180"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}

          <div className="absolute inset-0 bg-gradient-to-r from-forest/70 via-forest/30 to-transparent sm:from-forest/65 sm:via-forest/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/40 via-transparent to-forest/10" />
        </div>

        <div
          className={`relative z-10 mx-auto flex min-h-[76svh] max-w-6xl flex-col justify-center px-5 pt-28 sm:min-h-[82svh] sm:px-6 sm:pt-32 md:min-h-[86svh] md:pt-36 lg:px-8 ${
            showSearchBar
              ? "pb-40 sm:pb-16 md:pb-20"
              : "pb-16 sm:pb-20 md:pb-24"
          }`}
        >
          <div key={active} className="hero-content max-w-3xl motion-reduce:animate-none">
            {currentSlide.badge && (
              <div className="hero-badge">
                <span className="inline-block rounded-full bg-cream/95 px-4 py-1.5 text-[10px] font-semibold tracking-wide text-green sm:text-xs">
                  {currentSlide.badge}
                </span>
              </div>
            )}

            <div className="mt-4 overflow-hidden sm:mt-5">
              <h1 className="hero-heading font-serif text-[30px] font-semibold leading-[1.12] tracking-tight sm:text-5xl">
                <span className="text-cream">{currentSlide.titleLine1}</span>
                {currentSlide.titleLine2 && (
                  <>
                    <br />
                    <span className="heading-accent">{currentSlide.titleLine2}</span>
                  </>
                )}
              </h1>
            </div>

            {currentSlide.description && (
              <div className="overflow-hidden">
                <p className="hero-description mt-4 max-w-xl text-[13.5px] leading-relaxed text-cream/85 sm:mt-5 sm:text-base md:text-lg">
                  {currentSlide.description}
                </p>
              </div>
            )}

            {(resolvedPrimaryCta || resolvedSecondaryCta || videoCta) && (
              <div className="hero-buttons mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:gap-3">
                {resolvedPrimaryCta && (
                  <LinkButton href={resolvedPrimaryCta.href} variant="primary" className="group">
                    {resolvedPrimaryCta.label}
                    <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
                  </LinkButton>
                )}
                {resolvedSecondaryCta && (
                  <LinkButton href={resolvedSecondaryCta.href} variant="outline">
                    {resolvedSecondaryCta.label}
                  </LinkButton>
                )}
                {videoCta && (
                  <button
                    type="button"
                    onClick={() => setVideoOpen(true)}
                    className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-cream/40 px-6 py-3 font-sans text-sm font-semibold text-cream transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-cream hover:bg-cream hover:text-forest active:translate-y-0 active:scale-[0.97]"
                  >
                    <PlayIcon size={17} />
                    {videoCta.label}
                  </button>
                )}
              </div>
            )}

            {resolvedSlides.length > 1 && (
              <div className="hero-indicators mt-3 flex items-center gap-2 sm:mt-8">
                {resolvedSlides.map((slide, i) => (
                  <button
                    key={slide.src}
                    aria-label={`Show slide ${i + 1}: ${slide.alt}`}
                    onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                      i === active ? "w-6 bg-cream" : "w-1.5 bg-cream/45 hover:w-3 hover:bg-cream/80"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Straddles the section's true bottom edge (photo + the extra pb-10/8/6
          buffer below it), not the inner min-h wrapper's edge — anchoring to
          the wrapper left most of the bar sitting inside the still-dark
          buffer instead of overlapping 50/50 onto the section that follows. */}
      {showSearchBar && (
        <div className="absolute inset-x-0 bottom-0 z-30 translate-y-1/2 px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SearchBar />
          </div>
        </div>
      )}

      {videoCta && videoOpen && <VideoModal label={videoCta.label} onClose={() => setVideoOpen(false)} />}
    </section>
  );
}
