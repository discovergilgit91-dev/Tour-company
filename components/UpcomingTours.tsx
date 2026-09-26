"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { IconButton, LinkButton } from "./ui/Button";
import { ArrowIcon, CalendarIcon, ClockIcon, CompassIcon, PinIcon } from "./ui/icons";

const TOURS = [
  {
    id: "hunza-spring",
    duration: "5 DAYS",
    location: "HUNZA VALLEY",
    title: "Blossoms of Hunza",
    subtitle: "Spring Tour",
    date: "25 May – 29 May, 2027",
    image: "/Images/tours/hunza-blossom.png",
  },
  {
    id: "rakaposhi-trek",
    duration: "7 DAYS",
    location: "NAGAR – HOPAR – PASSU",
    title: "Rakaposhi Base Camp Trek",
    subtitle: "",
    date: "10 Jun – 16 Jun, 2027",
    image: "/Images/tours/Rakaposhi-camp.png",
  },
  {
    id: "altit-baltit",
    duration: "4 DAYS",
    location: "ALTIT – BALTIT",
    title: "Cultural Heritage Tour",
    subtitle: "",
    date: "05 Jul – 08 Jul, 2027",
    image: "/Images/tours/altit-baltit.jpg",
  },
  {
    id: "nanga-parbat-camping",
    duration: "3 DAYS",
    location: "DIAMER – NANGA PARBAT",
    title: "Nanga Parbat Camping Experience",
    subtitle: "",
    date: "20 Jul – 22 Jul, 2027",
    image: undefined as string | undefined,
  },
];

const HERO_IMAGE = "/Images/tours/hunza-valley.png";

function IconPeaks({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 50 30" fill="none" aria-hidden="true">
      <path d="M2 27 17 6l8 11 6-7 15 17H2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="m11 27 6-8 4 5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function ArtFortRidge({ size = 300 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.52} viewBox="0 0 300 156" fill="none" aria-hidden="true">
      <path
        d="M0 150 44 96l20 24 23-31 26 33 24-19 33 41 27-24 38 44 65-38"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeOpacity="0.55"
        strokeLinejoin="round"
      />
      <path
        d="M4 156 56 112l22 18 25-22 29 26 30-14 26 20 34-20 74 36"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeOpacity="0.8"
        strokeLinejoin="round"
      />
      <path
        d="M36 104h16M84 100h14M148 92h12"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.45"
        strokeLinecap="round"
      />
      <path d="M178 140v-22h74v22" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M186 118v-20h58v20" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M198 98V80h34v18" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path
        d="M194 80h42M182 98h66M174 118h82"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M206 86v7M218 86v7M196 104v8M210 104v8M224 104v8M188 126v8M202 126v8M216 126v8M230 126v8"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.75"
        strokeLinecap="round"
      />
      <path d="M252 140v-14h20v14M252 126h22" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function ArtContours({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 320" fill="none" aria-hidden="true" className={className} preserveAspectRatio="none">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <path
          key={i}
          d={`M-20 ${250 - i * 26}
             C 90 ${200 - i * 24}, 150 ${290 - i * 22}, 250 ${230 - i * 26}
             S 420 ${140 - i * 22}, 540 ${190 - i * 26}`}
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

function TourPhotoPlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-forest to-night text-cream/50">
      <IconPeaks size={30} />
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em]">Photo coming soon</span>
    </div>
  );
}

function TourCard({ tour }: { tour: (typeof TOURS)[number] }) {
  return (
    <Link
      href={`/tours/${tour.id}`}
      className="group flex h-[470px] w-full flex-col overflow-hidden rounded-[18px] bg-white shadow-[0_2px_18px_rgba(18,36,28,0.07)] outline-none transition-shadow duration-300 focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-4 focus-visible:ring-offset-cream sm:h-[500px]"
    >
      <div className="relative flex-1 overflow-hidden">
        {tour.image ? (
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <TourPhotoPlaceholder />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/25 to-transparent" />

        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-forest/90 px-3.5 py-2 font-sans text-[11px] font-semibold tracking-[0.06em] text-white backdrop-blur-sm">
          <ClockIcon size={14} />
          {tour.duration}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="mb-2.5 flex items-center gap-2 text-white">
            <PinIcon size={15} />
            <span className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.13em]">
              {tour.location}
            </span>
          </div>

          <h3 className="font-serif text-[25px] leading-[1.15] text-white sm:text-[27px]">
            {tour.title}
          </h3>

          {tour.subtitle && (
            <p className="mt-1 font-sans text-[14px] text-white/85">{tour.subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between gap-3 bg-white px-5 py-4">
        <div className="flex min-w-0 items-center gap-2.5 text-forest">
          <CalendarIcon size={16} />
          <span className="truncate font-sans text-[13px]">{tour.date}</span>
        </div>

        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-white shadow-[0_6px_20px_rgba(0,0,0,0.18)] transition-colors duration-300 group-hover:bg-green">
          <span className="transition-transform duration-300 ease-out group-hover:-rotate-45">
            <ArrowIcon size={17} />
          </span>
        </span>
      </div>
    </Link>
  );
}

/* Same shape, size, and hover behavior as TourCard (rounded corners,
   image/gradient panel, badge, footer row, arrow button) so it sits in the
   row without looking out of place — but every distinguishing detail
   (badge, copy, footer line, link target) signals it's not a fixed
   itinerary. No real destination photo fits a build-your-own trip, so the
   image panel reuses TourCard's own "no photo" gradient pattern instead of
   introducing a new visual language. */
function BuildYourOwnCard() {
  return (
    <Link
      href="/build-your-trip"
      className="group flex h-[470px] w-full flex-col overflow-hidden rounded-[18px] bg-white shadow-[0_2px_18px_rgba(18,36,28,0.07)] outline-none transition-shadow duration-300 focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-4 focus-visible:ring-offset-cream sm:h-[500px]"
    >
      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-forest via-forest to-green-dark text-gold/20 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]">
          <CompassIcon size={110} />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/25 to-transparent" />

        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-gold px-3.5 py-2 font-sans text-[11px] font-semibold tracking-[0.06em] text-forest">
          <CompassIcon size={14} />
          CUSTOM
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="mb-2.5 flex items-center gap-2 text-white">
            <PinIcon size={15} />
            <span className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.13em]">
              ANYWHERE IN GILGIT-BALTISTAN
            </span>
          </div>

          <h3 className="font-serif text-[25px] leading-[1.15] text-white sm:text-[27px]">Design Your Own Journey</h3>

          <p className="mt-1 font-sans text-[13px] leading-snug text-white/85">
            Pick your destinations, dates, and pace — we&rsquo;ll build the trip around you.
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between gap-3 bg-white px-5 py-4">
        <div className="flex min-w-0 items-center gap-2.5 text-forest">
          <CalendarIcon size={16} />
          <span className="truncate font-sans text-[13px]">Fully customizable</span>
        </div>

        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-white shadow-[0_6px_20px_rgba(0,0,0,0.18)] transition-colors duration-300 group-hover:bg-green">
          <span className="transition-transform duration-300 ease-out group-hover:-rotate-45">
            <ArrowIcon size={17} />
          </span>
        </span>
      </div>
    </Link>
  );
}

function ComingSoonCard() {
  return (
    <article className="relative flex h-[470px] w-full flex-col overflow-hidden rounded-[18px] bg-forest p-7 text-white sm:h-[500px]">
      <div className="mb-9 flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.07] text-white/85">
        <CalendarIcon size={24} />
      </div>

      <h3 className="relative z-10 max-w-[220px] font-serif text-[26px] leading-[1.2]">
        More Experiences
        <br />
        Coming Soon
      </h3>

      <p className="relative z-10 mt-4 max-w-[215px] font-sans text-[14px] leading-[1.75] text-white/70">
        We are crafting more unforgettable journeys for you across the majestic landscapes of
        Gilgit Baltistan.
      </p>

      <div className="pointer-events-none absolute bottom-0 right-0 text-gold/60">
        <ArtFortRidge size={300} />
      </div>
    </article>
  );
}

export default function UpcomingTours() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activePage, setActivePage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(1);
  // +1 for the "Build Your Own Trip" card, +1 for the "Coming Soon" card.
  const totalItems = TOURS.length + 2;

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

  const pageCount = Math.max(1, Math.ceil(totalItems / cardsPerPage));

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const card = track.querySelector<HTMLElement>("[data-tour-card]");
      if (!card) return;

      const gap = 20;
      const cardWidth = card.offsetWidth;
      if (!cardWidth) return;

      const index = Math.round(track.scrollLeft / (cardWidth + gap));
      const page = Math.floor(index / cardsPerPage);
      setActivePage(Math.min(Math.max(page, 0), pageCount - 1));
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, [cardsPerPage, pageCount]);

  const scrollToPage = (page: number) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector<HTMLElement>("[data-tour-card]");
    if (!card) return;

    const gap = 20;
    const cardWidth = card.offsetWidth;
    const safePage = Math.min(Math.max(page, 0), pageCount - 1);
    const index = safePage * cardsPerPage;

    track.scrollTo({ left: index * (cardWidth + gap), behavior: "smooth" });
    setActivePage(safePage);
  };

  const progress = ((activePage + 1) / pageCount) * 100;

  return (
    /* Section itself carries no horizontal padding — it lives on the
       max-w-6xl + px-5 sm:px-6 lg:px-8 container below, the same one
       Header, Hero and every other section use, so this section's
       content lines up edge-to-edge with the rest of the page. */
    <section
      id="tours"
      className="relative isolate w-full overflow-hidden bg-cream pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-24 lg:pt-12"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        {/* Decorative image/contours are positioned against this wrapper's
            edges, i.e. the same content edge the cards align to. */}
        <div className="relative">
          <div className="pointer-events-none absolute right-0 top-0 -z-10 hidden h-[340px] w-[56%] select-none overflow-hidden rounded-[18px] lg:block">
            <Image
              src={HERO_IMAGE}
              alt=""
              fill
              priority
              sizes="(min-width: 1152px) 620px, 56vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream to-transparent" />
          </div>

          <ArtContours className="pointer-events-none absolute right-[38%] top-0 -z-10 hidden h-[320px] w-[36%] text-gold/20 lg:block" />

          <div className="mb-10 flex flex-col gap-8 sm:mb-12 lg:mb-14 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl">
              <div className="mb-6 flex items-center gap-4">
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-forest">
                  Upcoming
                </span>
                <span className="h-px w-8 bg-forest/35" />
                <span className="text-forest/70">
                  <IconPeaks size={30} />
                </span>
              </div>

              <h2 className="font-serif text-[46px] leading-[1.04] tracking-[-0.01em] text-forest sm:text-[56px] lg:text-[62px]">
                Upcoming Tours
                <br />
                <span className="text-green">&amp; Events</span>
              </h2>

              <p className="mt-6 max-w-[26rem] font-sans text-[15px] leading-[1.75] text-muted">
                Explore the unmatched beauty of Gilgit Baltistan with our carefully planned tours
                and experiences.
              </p>
            </div>

            <div className="flex items-start gap-4 lg:mt-24 lg:pr-[18%]">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest text-white">
                <CompassIcon size={20} />
              </span>
              <div>
                <p className="max-w-[190px] font-sans text-[15px] leading-[1.5] text-forest">
                  Extraordinary Journeys in the Land of Giants
                </p>
                <span className="mt-4 block h-px w-10 bg-gold" />
              </div>
            </div>
          </div>

          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ scrollBehavior: "smooth" }}
          >
            {TOURS.map((tour) => (
              <div
                key={tour.id}
                data-tour-card
                className="w-full shrink-0 snap-start sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-60px)/4)]"
              >
                <TourCard tour={tour} />
              </div>
            ))}

            {/* Placed after the fixed tours (so the curated lineup reads first)
                but before the passive "Coming Soon" teaser — this card is
                actionable right now, so it leads the "not a fixed tour"
                tail rather than trailing behind a card with nothing to
                click. */}
            <div
              data-tour-card
              className="w-full shrink-0 snap-start sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-60px)/4)]"
            >
              <BuildYourOwnCard />
            </div>

            <div
              data-tour-card
              className="w-full shrink-0 snap-start sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-60px)/4)]"
            >
              <ComingSoonCard />
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
            <div className="flex shrink-0 items-center gap-3">
              <IconButton
                variant="outline"
                onClick={() => scrollToPage(activePage - 1)}
                disabled={activePage === 0}
                aria-label="Previous tours"
              >
                <span className="rotate-180">
                  <ArrowIcon size={17} />
                </span>
              </IconButton>

              <IconButton
                onClick={() => scrollToPage(activePage + 1)}
                disabled={activePage >= pageCount - 1}
                aria-label="Next tours"
              >
                <ArrowIcon size={17} />
              </IconButton>
            </div>

            <div className="relative h-px flex-1 bg-forest/12">
              <span
                className="absolute left-0 top-0 h-px bg-forest transition-[width] duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <LinkButton href="/tours" variant="dark" className="group shrink-0 gap-4 rounded-[10px] text-[12px] uppercase tracking-[0.12em]">
              <span>View all tours &amp; events</span>
              <span className="text-forest/70">
                <IconPeaks size={28} />
              </span>
            </LinkButton>
          </div>
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
