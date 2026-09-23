"use client";

import { useEffect, useState } from "react";
import { LinkButton } from "./ui/Button";

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
    src: "/Images/tours/Fairy-meadows.png",
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

const DEFAULT_PRIMARY_CTA: HeroCta = { label: "Explore journeys", href: "/journeys" };
const DEFAULT_SECONDARY_CTA: HeroCta = { label: "Watch film", href: "/film" };

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
  /** Defaults to the homepage's "Watch film" button. Pass `null` to hide it. */
  secondaryCta?: HeroCta | null;
  /** Defaults to shown for the multi-slide carousel, hidden for a single static hero. */
  showSearch?: boolean;
};

function SearchBar() {
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [travelers, setTravelers] = useState("2 Adults");

  return (
    <div className="hero-search w-full">
      <div className="flex flex-col items-stretch gap-1.5 rounded-2xl bg-white p-1.5 shadow-[0_15px_40px_-12px_rgba(20,35,31,0.35)] sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:p-2 sm:shadow-[0_25px_60px_-15px_rgba(20,35,31,0.4)]">
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
              onChange={(event) => setDestination(event.target.value)}
              placeholder="Search destination..."
              className="w-full min-w-0 bg-transparent text-[12.5px] text-forest/50 outline-none placeholder:text-forest/40 sm:text-[13px]"
            />
          </div>
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
            <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
            <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" />
          </svg>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-[12.5px] font-semibold text-forest sm:text-[13px]">
              Select Dates
            </span>
            <input
              type="text"
              value={dates}
              onChange={(event) => setDates(event.target.value)}
              placeholder="Check in – Check out"
              className="w-full min-w-0 bg-transparent text-[12.5px] text-forest/50 outline-none placeholder:text-forest/40 sm:text-[13px]"
            />
          </div>
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
              <option>1 Adult</option>
              <option>2 Adults</option>
              <option>2 Adults, 1 Child</option>
              <option>3 Adults</option>
              <option>4+ Adults</option>
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
  showSearch,
}: HeroProps) {
  // A single static slide (eyebrow/title/description/image) instead of the
  // homepage's rotating carousel — used by pages like /lands. Falls back to
  // the homepage's DEFAULT_SLIDES whenever nothing custom is passed, so
  // `<Hero />` with no props (the homepage's call) is byte-for-byte the
  // same experience as before this component took props.
  const isCustom = !slides && Boolean(title && image);

  const resolvedSlides: HeroSlide[] =
    slides ??
    (isCustom
      ? [
          {
            src: image as string,
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

  useEffect(() => {
    if (resolvedSlides.length <= 1) return;

    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % resolvedSlides.length);
    }, SLIDE_DURATION_MS);

    return () => clearInterval(id);
  }, [resolvedSlides.length]);

  const currentSlide = resolvedSlides[active] ?? resolvedSlides[0];

  return (
    <section className={`relative bg-forest ${showSearchBar ? "pb-10 sm:pb-8 md:pb-6" : ""}`}>
      <div className="relative min-h-[76svh] w-full sm:min-h-[82svh] md:min-h-[86svh]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {resolvedSlides.map((slide, i) => (
            <div
              key={slide.src}
              className={`hero-slide absolute inset-0 opacity-0 motion-reduce:scale-100 ${
                i === active ? "hero-slide--active motion-reduce:animate-none" : ""
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={slide.alt}
                loading={i === 0 ? "eager" : "lazy"}
                className="h-full w-full object-cover"
              />
            </div>
          ))}

          <div className="absolute inset-0 bg-gradient-to-r from-forest/70 via-forest/30 to-transparent sm:from-forest/65 sm:via-forest/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/40 via-transparent to-forest/10" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[76svh] max-w-6xl flex-col justify-center px-5 pb-40 pt-28 sm:min-h-[82svh] sm:px-6 sm:pb-16 sm:pt-32 md:min-h-[86svh] md:pb-20 md:pt-36 lg:px-8">
          <div key={active} className="hero-content max-w-3xl motion-reduce:animate-none">
            {currentSlide.badge && (
              <div className="hero-badge">
                <span className="inline-block rounded-full bg-cream/95 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-green sm:px-4 sm:text-xs">
                  {currentSlide.badge}
                </span>
              </div>
            )}

            <div className="overflow-hidden">
              <h1 className="hero-heading font-serif text-[26px] font-semibold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl lg:text-[60px]">
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
                <p className="hero-description mt-3 max-w-xl text-[12.5px] leading-snug text-cream/85 sm:mt-5 sm:text-base sm:leading-relaxed md:text-lg">
                  {currentSlide.description}
                </p>
              </div>
            )}

            {(resolvedPrimaryCta || resolvedSecondaryCta) && (
              <div className="hero-buttons mt-4 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:gap-3">
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

        {showSearchBar && (
          <div className="absolute inset-x-0 bottom-0 z-30 translate-y-1/2 px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <SearchBar />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
