"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const SLIDES = [
  {
    src: "/Images/tours/hunza-valley.png",
    alt: "Shimshal Valley in upper Hunza",
    badge: "HUNZA VALLEY — THE KARAKORAM",
    title: (
      <>
        <span className="text-[#F8F4EA]">Where the mountains</span>
        <br />
        <span className="bg-gradient-to-r from-[#F8F4EA] via-[#E8C982] to-[#D6A84F] bg-clip-text text-transparent">
          touch the sky.
        </span>
      </>
    ),
    description:
      "Journey through Hunza's dramatic valleys, ancient villages, and towering peaks — guided by people who call these mountains home.",
  },

  {
    src: "/Images/tours/Fairy-meadows.png",
    alt: "Nanga Parbat, the Killer Mountain",
    badge: "FAIRY MEADOWS — NANGA PARBAT",
    title: (
      <>
        <span className="text-[#F8F4EA]">Stand beneath</span>
        <br />
        <span className="bg-gradient-to-r from-[#F8F4EA] via-[#E8C982] to-[#D6A84F] bg-clip-text text-transparent">
          the Killer Mountain.
        </span>
      </>
    ),
    description:
      "Walk through the legendary meadows beneath Nanga Parbat, where alpine forests, open skies, and one of the world's great peaks meet.",
  },

  {
    src: "/Images/tours/baltit-fort.png",
    alt: "Baltit Fort in Hunza",
    badge: "BALTIT FORT — HUNZA",
    title: (
      <>
        <span className="text-[#F8F4EA]">A fortress where</span>
        <br />
        <span className="bg-gradient-to-r from-[#F8F4EA] via-[#E8C982] to-[#D6A84F] bg-clip-text text-transparent">
          heritage meets the sky.
        </span>
      </>
    ),
    description:
      "Step inside centuries of Hunza's heritage at Baltit Fort — a remarkable mountain stronghold overlooking the ancient valley.",
  },

  {
    src: "/Images/tours/Kaptana-desert.png",
    alt: "Skardu Desert",
    badge: "SKARDU DESERT — SKARDU",
    title: (
      <>
        <span className="text-[#F8F4EA]">Where desert</span>
        <br />
        <span className="bg-gradient-to-r from-[#F8F4EA] via-[#E8C982] to-[#D6A84F] bg-clip-text text-transparent">
          meets the Himalayas.
        </span>
      </>
    ),
    description:
      "Cross the surreal golden dunes of Skardu, surrounded by towering mountains — a landscape that feels impossible until you see it yourself.",
  },

  {
    src: "/Images/tours/skardu.png",
    alt: "The high alpine plains of Deosai National Park",
    badge: "DEOSAI — THE ROOF OF THE WORLD",
    title: (
      <>
        <span className="text-[#F8F4EA]">Into the wild.</span>
        <br />
        <span className="bg-gradient-to-r from-[#F8F4EA] via-[#E8C982] to-[#D6A84F] bg-clip-text text-transparent">
          Above the clouds.
        </span>
      </>
    ),
    description:
      "Explore the vast high-altitude plains of Deosai, where endless horizons, wild landscapes, and Himalayan silence define the journey.",
  },
];

const SLIDE_DURATION_MS = 6000;

function SearchBar() {
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [travelers, setTravelers] = useState("2 Adults");

  return (
    <div className="hero-search w-full">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 sm:gap-0 rounded-2xl sm:rounded-full bg-white p-1.5 sm:p-2 shadow-[0_15px_40px_-12px_rgba(20,35,31,0.35)] sm:shadow-[0_25px_60px_-15px_rgba(20,35,31,0.4)]">

        {/* Destination */}
        <div className="flex items-center gap-3 flex-1 px-3.5 sm:px-4 py-2 min-w-0">
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1F6A4C"
            strokeWidth="1.8"
            className="shrink-0 sm:w-[18px] sm:h-[18px]"
          >
            <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
            <circle cx="12" cy="9.5" r="2.3" />
          </svg>

          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[12.5px] sm:text-[13px] font-semibold text-[#14231F]">
              Where do you want to go?
            </span>

            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Search destination..."
              className="text-[12.5px] sm:text-[13px] text-[#14231F]/50 placeholder:text-[#14231F]/40 bg-transparent outline-none w-full min-w-0"
            />
          </div>
        </div>

        <span className="hidden sm:block text-[#14231F]/25 text-sm px-1">
          →
        </span>

        <div className="hidden sm:block w-px h-9 bg-[#14231F]/10" />
        <div className="sm:hidden h-px w-full bg-[#14231F]/10" />

        {/* Dates */}
        <div className="flex items-center gap-3 flex-1 px-3.5 sm:px-4 py-2 min-w-0">
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1F6A4C"
            strokeWidth="1.8"
            className="shrink-0 sm:w-[18px] sm:h-[18px]"
          >
            <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
            <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" />
          </svg>

          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[12.5px] sm:text-[13px] font-semibold text-[#14231F]">
              Select Dates
            </span>

            <input
              type="text"
              value={dates}
              onChange={(e) => setDates(e.target.value)}
              placeholder="Check in – Check out"
              className="text-[12.5px] sm:text-[13px] text-[#14231F]/50 placeholder:text-[#14231F]/40 bg-transparent outline-none w-full min-w-0"
            />
          </div>
        </div>

        <span className="hidden sm:block text-[#14231F]/25 text-sm px-1">
          →
        </span>

        <div className="hidden sm:block w-px h-9 bg-[#14231F]/10" />
        <div className="sm:hidden h-px w-full bg-[#14231F]/10" />

        {/* Travelers */}
        <div className="flex items-center gap-3 flex-1 px-3.5 sm:px-4 py-2 min-w-0">
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1F6A4C"
            strokeWidth="1.8"
            className="shrink-0 sm:w-[18px] sm:h-[18px]"
          >
            <circle cx="9" cy="8" r="3" />
            <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
            <circle cx="17" cy="8.5" r="2.2" />
            <path d="M15 12.5c1.8.4 3.2 1.8 3.5 4" />
          </svg>

          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[12.5px] sm:text-[13px] font-semibold text-[#14231F]">
              Travelers
            </span>

            <select
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              className="text-[12.5px] sm:text-[13px] text-[#14231F]/50 bg-transparent outline-none w-full min-w-0 cursor-pointer appearance-none"
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
            stroke="#14231F"
            strokeOpacity="0.4"
            strokeWidth="2"
            className="shrink-0"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>

        {/* Search button */}
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-full bg-[#1F6A4C] px-5 sm:px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-[#16503A] hover:shadow-[0_10px_24px_-4px_rgba(31,106,76,0.5)] active:scale-[0.97] shrink-0"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>

          Search
        </button>
      </div>
    </div>
  );
}

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION_MS);

    return () => clearInterval(id);
  }, []);

  const currentSlide = SLIDES[active];

  return (
    <section className="relative bg-[#F6F1E7] text-[#F6F1E7] pb-10 sm:pb-8 md:pb-6">

      {/* Hero image container — full-bleed at every breakpoint (no
          max-width cap), so the slideshow always spans edge to edge.
          No overflow-hidden here so the search bar (absolutely
          positioned, translated -50%) can hang half outside its
          bottom edge. Clipping for the slideshow/Ken Burns zoom lives
          one level deeper instead. */}
      <div className="relative w-full min-h-[76svh] sm:min-h-[82svh] md:min-h-[86svh]">

        {/* Background Slideshow — clipped independently */}
        <div className="absolute inset-0 z-0 overflow-hidden">

          {SLIDES.map((slide, i) => (
            <div
              key={slide.src}
              className={`hero-slide absolute inset-0 opacity-0 motion-reduce:scale-100 ${
                i === active
                  ? "hero-slide--active motion-reduce:animate-none"
                  : ""
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

          {/* Dark overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#14231F]/70 via-[#14231F]/30 to-transparent sm:from-[#14231F]/65 sm:via-[#14231F]/25" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#14231F]/40 via-transparent to-[#14231F]/10" />
        </div>

        {/* Hero Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 flex min-h-[76svh] sm:min-h-[82svh] md:min-h-[86svh] flex-col justify-center pt-28 sm:pt-32 md:pt-36 pb-40 sm:pb-16 md:pb-20">

          <div
            key={active}
            className="hero-content max-w-3xl motion-reduce:animate-none"
          >

            {/* Badge */}
            <div className="hero-badge">
              <span className="inline-block rounded-full bg-[#F6F1E7]/95 px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs font-semibold tracking-wide text-[#1F6A4C]">
                {currentSlide.badge}
              </span>
            </div>

            {/* Hero Heading */}
            <div className="hero-heading-wrapper overflow-hidden">
              <h1 className="hero-heading text-[26px] sm:text-4xl md:text-5xl lg:text-[60px] font-semibold leading-[1.15] tracking-tight">
                {currentSlide.title}
              </h1>
            </div>

            {/* Description */}
            <div className="hero-description-wrapper overflow-hidden">
              <p className="hero-description mt-3 sm:mt-5 text-[12.5px] sm:text-base md:text-lg text-[#F6F1E7]/85 max-w-xl leading-snug sm:leading-relaxed">
                {currentSlide.description}
              </p>
            </div>

            {/* Buttons */}
            <div className="hero-buttons mt-4 sm:mt-8 flex flex-col gap-2.5 sm:flex-row sm:gap-3">

              <Link
                href="/journeys"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#1F6A4C] px-6 py-2.5 sm:py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-[#16503A] hover:shadow-[0_12px_28px_-6px_rgba(31,106,76,0.6)] hover:-translate-y-[2px] hover:scale-[1.03] active:scale-[0.97] active:translate-y-0"
              >
                Explore journeys

                <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/film"
                className="inline-flex items-center justify-center rounded-full border border-[#F6F1E7]/40 px-6 py-2.5 sm:py-3 text-sm font-medium text-[#F6F1E7]/90 transition-all duration-300 ease-out hover:text-[#14231F] hover:bg-white hover:border-white hover:scale-[1.03] active:scale-[0.97]"
              >
                Watch film
              </Link>

            </div>

            {/* Slide Indicators — inline, directly under the CTAs, so
                they sit wherever the content naturally ends rather than
                a guessed distance from the bottom. This is what keeps
                them from ever landing on top of the buttons, no matter
                how tall the stacked mobile layout gets or how long a
                given slide's description runs. */}
            <div className="hero-indicators mt-3 sm:mt-8 flex items-center gap-2">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.src}
                  aria-label={`Show slide ${i + 1}: ${slide.alt}`}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                    i === active
                      ? "w-6 bg-[#F6F1E7]"
                      : "w-1.5 bg-[#F6F1E7]/45 hover:w-3 hover:bg-[#F6F1E7]/80"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Search bar — pinned to the image's bottom edge, then pulled
            up by exactly 50% of its own rendered height via the
            transform. That ratio holds at every breakpoint, whether
            the bar is one row (desktop) or stacked (mobile), so it's
            always half sitting on the image and half below it. */}
        <div className="absolute inset-x-0 bottom-0 translate-y-1/2 z-30 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <SearchBar />
          </div>
        </div>

      </div>

      {/* Animations */}
      <style jsx>{`

        .hero-slide {
          transform: scale(1.08);
          transition: opacity 1.4s ease-in-out;
        }

        .hero-slide--active {
          opacity: 1 !important;
          animation: kenburns ${SLIDE_DURATION_MS + 1400}ms ease-out forwards;
        }

        @keyframes kenburns {
          0% {
            transform: scale(1.08) translate3d(0, 0, 0);
          }

          100% {
            transform: scale(1.18) translate3d(-1.5%, -1%, 0);
          }
        }

        .hero-content {
          animation: heroReveal 1400ms ease-out both;
        }

        .hero-badge {
          animation: heroReveal 1400ms ease-out both;
        }

        .hero-heading {
          animation: heroReveal 1400ms ease-out 120ms both;
        }

        .hero-description {
          animation: heroReveal 1400ms ease-out 240ms both;
        }

        .hero-buttons {
          animation: heroReveal 1400ms ease-out 360ms both;
        }

        .hero-indicators {
          animation: heroReveal 1400ms ease-out 420ms both;
        }

        .hero-search {
          animation: heroReveal 1400ms ease-out 480ms both;
        }

        @keyframes heroReveal {
          0% {
            opacity: 0;
            transform: translate3d(0, 24px, 0) scale(0.99);
          }

          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {

          .hero-slide--active {
            animation: none;
            transform: scale(1);
          }

          .hero-content,
          .hero-badge,
          .hero-heading,
          .hero-description,
          .hero-buttons,
          .hero-indicators,
          .hero-search {
            animation: none;
            opacity: 1;
            transform: none;
          }

        }

      `}</style>
    </section>
  );
}
