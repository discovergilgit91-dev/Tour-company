"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

/* =========================================================
   COLORS
========================================================= */

const COLORS = {
  page: "#F4F4F2",
  card: "#FFFFFF",
  text: "#12241C",
  muted: "#6B7671",
  forest: "#14291F",
  forestDeep: "#0F1F17",
  gold: "#C9A15A",
  line: "#E3E3DF",
};

/* =========================================================
   FONTS
========================================================= */

const FONT_SERIF = "var(--font-fraunces)";
const FONT_SANS = "var(--font-work-sans)";

/* =========================================================
   TOUR DATA
========================================================= */

const TOURS = [
  {
    id: "hunza-spring",
    duration: "5 DAYS",
    location: "HUNZA VALLEY",
    title: "Blossoms of Hunza",
    subtitle: "Spring Tour",
    date: "25 May – 29 May, 2024",
    image: "/Images/tours/hunza-spring.jpg",
  },
  {
    id: "rakaposhi-trek",
    duration: "7 DAYS",
    location: "NAGAR – HOPAR – PASSU",
    title: "Rakaposhi Base Camp Trek",
    subtitle: "",
    date: "10 Jun – 16 Jun, 2024",
    image: "/Images/tours/rakaposhi-trek.jpg",
  },
  {
    id: "altit-baltit",
    duration: "4 DAYS",
    location: "ALTIT – BALTIT",
    title: "Cultural Heritage Tour",
    subtitle: "",
    date: "05 Jul – 08 Jul, 2024",
    image: "/Images/tours/altit-baltit.jpg",
  },
  {
    id: "shigar-camping",
    duration: "3 DAYS",
    location: "SHIGAR VALLEY",
    title: "Shigar Valley Camping Experience",
    subtitle: "",
    date: "20 Jul – 22 Jul, 2024",
    image: "/Images/tours/shigar-camping.jpg",
  },
];

/* =========================================================
   HEADER IMAGE  (image #1 in the reference)

   Put your file at:
   /public/Images/hero/upcoming-hero.jpg
========================================================= */

const HERO_IMAGE = "/Images/hero/upcoming-hero.jpg";

/* =========================================================
   ICONS
========================================================= */

function IconClock({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <path
        d="M12 7.5v4.8l3.2 1.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMapPin({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M19 10.5c0 5.2-7 10-7 10s-7-4.8-7-10a7 7 0 1 1 14 0Z"
        fill="currentColor"
      />

      <circle cx="12" cy="10.3" r="2.4" fill="#14291F" />
    </svg>
  );
}

function IconCalendar({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3.75"
        y="5"
        width="16.5"
        height="15"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M8 3.2v3.6M16 3.2v3.6M3.75 9.6h16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconArrow({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4.5 12h14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <path
        d="m13 6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCompass({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="24"
        cy="24"
        r="17"
        stroke="currentColor"
        strokeWidth="2.2"
      />

      <path
        d="m31 17-5.6 9.4-9.4 5.6 5.6-9.4L31 17Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Small twin-peak mark used beside the eyebrow and the CTA */

function IconPeaks({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 50 30"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 27 17 6l8 11 6-7 15 17H2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="m11 27 6-8 4 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   LAST IMAGE IN THE REFERENCE

   Gold line-art of the Baltit fort sitting on a ridge,
   anchored at the bottom of the Coming Soon card.
========================================================= */

function ArtFortRidge({ size = 300 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.52}
      viewBox="0 0 300 156"
      fill="none"
      aria-hidden="true"
    >
      {/* BACK RIDGE */}

      <path
        d="M0 150 44 96l20 24 23-31 26 33 24-19 33 41 27-24 38 44 65-38"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeOpacity="0.55"
        strokeLinejoin="round"
      />

      {/* FRONT RIDGE */}

      <path
        d="M4 156 56 112l22 18 25-22 29 26 30-14 26 20 34-20 74 36"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeOpacity="0.8"
        strokeLinejoin="round"
      />

      {/* SNOW LINES */}

      <path
        d="M36 104h16M84 100h14M148 92h12"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.45"
        strokeLinecap="round"
      />

      {/* FORT — BASE TERRACE */}

      <path
        d="M178 140v-22h74v22"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* FORT — MIDDLE BLOCK */}

      <path
        d="M186 118v-20h58v20"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* FORT — TOP BLOCK */}

      <path
        d="M198 98V80h34v18"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* FORT — ROOF LINE */}

      <path
        d="M194 80h42M182 98h66M174 118h82"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* FORT — WINDOWS */}

      <path
        d="M206 86v7M218 86v7M196 104v8M210 104v8M224 104v8M188 126v8M202 126v8M216 126v8M230 126v8"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.75"
        strokeLinecap="round"
      />

      {/* FORT — SIDE WING */}

      <path
        d="M252 140v-14h20v14M252 126h22"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Faint topographic contours behind the header */

function ArtContours({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 320"
      fill="none"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="none"
    >
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

/* =========================================================
   TOUR CARD
========================================================= */

function TourCard({ tour }: { tour: (typeof TOURS)[number] }) {
  return (
    <article
      className="
        group
        flex
        h-[470px]
        w-full
        flex-col
        overflow-hidden
        rounded-[18px]
        bg-white
        shadow-[0_2px_18px_rgba(18,36,28,0.07)]
        sm:h-[500px]
      "
    >
      {/* ===================================================
          IMAGE AREA
      =================================================== */}

      <div className="relative flex-1 overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          sizes="
            (max-width: 639px) 100vw,
            (max-width: 1023px) 50vw,
            25vw
          "
          className="
            object-cover
            transition-transform
            duration-[1200ms]
            ease-out
            group-hover:scale-[1.06]
          "
        />

        {/* BOTTOM SHADE */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#0F1F17]
            via-[#0F1F17]/25
            to-transparent
          "
        />

        {/* DURATION PILL */}

        <div
          className="
            absolute
            left-4
            top-4
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-[#14291F]/90
            px-3.5
            py-2
            text-[11px]
            font-semibold
            tracking-[0.06em]
            text-white
            backdrop-blur-sm
          "
          style={{ fontFamily: FONT_SANS }}
        >
          <IconClock size={14} />

          {tour.duration}
        </div>

        {/* LOCATION + TITLE */}

        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="mb-2.5 flex items-center gap-2 text-white">
            <IconMapPin size={15} />

            <span
              className="
                text-[10.5px]
                font-semibold
                uppercase
                tracking-[0.13em]
              "
              style={{ fontFamily: FONT_SANS }}
            >
              {tour.location}
            </span>
          </div>

          <h3
            className="
              text-[25px]
              leading-[1.15]
              text-white
              sm:text-[27px]
            "
            style={{ fontFamily: FONT_SERIF }}
          >
            {tour.title}
          </h3>

          {tour.subtitle && (
            <p
              className="mt-1 text-[14px] text-white/85"
              style={{ fontFamily: FONT_SANS }}
            >
              {tour.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* ===================================================
          WHITE FOOTER
      =================================================== */}

      <div
        className="
          flex
          shrink-0
          items-center
          justify-between
          gap-3
          bg-white
          px-5
          py-4
        "
      >
        <div className="flex min-w-0 items-center gap-2.5 text-[#12241C]">
          <IconCalendar size={16} />

          <span
            className="truncate text-[13px]"
            style={{ fontFamily: FONT_SANS }}
          >
            {tour.date}
          </span>
        </div>

        <button
          type="button"
          aria-label={`View ${tour.title}`}
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#14291F]
            text-white
            transition-transform
            duration-300
            hover:translate-x-0.5
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-[#14291F]
          "
        >
          <IconArrow size={17} />
        </button>
      </div>
    </article>
  );
}

/* =========================================================
   COMING SOON CARD
========================================================= */

function ComingSoonCard() {
  return (
    <article
      className="
        relative
        flex
        h-[470px]
        w-full
        flex-col
        overflow-hidden
        rounded-[18px]
        bg-[#14291F]
        p-7
        text-white
        sm:h-[500px]
      "
    >
      {/* CALENDAR BADGE */}

      <div
        className="
          mb-9
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-white/[0.07]
          text-white/85
        "
      >
        <IconCalendar size={24} />
      </div>

      <h3
        className="
          relative
          z-10
          max-w-[220px]
          text-[26px]
          leading-[1.2]
        "
        style={{ fontFamily: FONT_SERIF }}
      >
        More Experiences
        <br />
        Coming Soon
      </h3>

      <p
        className="
          relative
          z-10
          mt-4
          max-w-[215px]
          text-[14px]
          leading-[1.75]
          text-white/70
        "
        style={{ fontFamily: FONT_SANS }}
      >
        We are crafting more unforgettable journeys for you across the majestic
        landscapes of Gilgit Baltistan.
      </p>

      {/* ===================================================
          LINE ART — the last image in the reference
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          right-0
          text-[#C9A15A]/60
        "
      >
        <ArtFortRidge size={300} />
      </div>
    </article>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function UpcomingTours() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [activePage, setActivePage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(1);

  const totalItems = TOURS.length + 1;

  /* =======================================================
     RESPONSIVE CARDS PER PAGE
  ======================================================= */

  const updateCardsPerPage = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.innerWidth >= 1024) {
      setCardsPerPage(4);
    } else if (window.innerWidth >= 640) {
      setCardsPerPage(2);
    } else {
      setCardsPerPage(1);
    }
  }, []);

  useEffect(() => {
    updateCardsPerPage();

    window.addEventListener("resize", updateCardsPerPage);

    return () => {
      window.removeEventListener("resize", updateCardsPerPage);
    };
  }, [updateCardsPerPage]);

  /* =======================================================
     PAGE COUNT
  ======================================================= */

  const pageCount = Math.max(1, Math.ceil(totalItems / cardsPerPage));

  /* =======================================================
     TRACK SCROLL -> ACTIVE PAGE
  ======================================================= */

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const handleScroll = () => {
      const card = track.querySelector<HTMLElement>("[data-tour-card]");

      if (!card) {
        return;
      }

      const gap = 20;
      const cardWidth = card.offsetWidth;

      if (!cardWidth) {
        return;
      }

      const index = Math.round(track.scrollLeft / (cardWidth + gap));
      const page = Math.floor(index / cardsPerPage);

      setActivePage(Math.min(Math.max(page, 0), pageCount - 1));
    };

    track.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      track.removeEventListener("scroll", handleScroll);
    };
  }, [cardsPerPage, pageCount]);

  /* =======================================================
     SCROLL TO PAGE
  ======================================================= */

  const scrollToPage = (page: number) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const card = track.querySelector<HTMLElement>("[data-tour-card]");

    if (!card) {
      return;
    }

    const gap = 20;
    const cardWidth = card.offsetWidth;
    const safePage = Math.min(Math.max(page, 0), pageCount - 1);
    const index = safePage * cardsPerPage;

    track.scrollTo({
      left: index * (cardWidth + gap),
      behavior: "smooth",
    });

    setActivePage(safePage);
  };

  const previousPage = () => scrollToPage(activePage - 1);
  const nextPage = () => scrollToPage(activePage + 1);

  const progress = ((activePage + 1) / pageCount) * 100;

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#F4F4F2]
        px-5
        py-16
        sm:px-10
        sm:py-20
        lg:px-14
        lg:py-24
      "
    >
      {/* ===================================================
          HEADER IMAGE — image #1 in the reference.
          Bleeds off the top-right and fades into the page.
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          hidden
          h-[340px]
          w-[58%]
          select-none
          lg:block
        "
      >
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="60vw"
          className="object-cover"
        />

        {/* FADE INTO THE PAGE — LEFT */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#F4F4F2]
            via-[#F4F4F2]/70
            to-transparent
          "
        />

        {/* FADE INTO THE PAGE — BOTTOM */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-32
            bg-gradient-to-t
            from-[#F4F4F2]
            to-transparent
          "
        />
      </div>

      {/* CONTOUR TEXTURE */}

      <ArtContours
        className="
          pointer-events-none
          absolute
          right-[34%]
          top-0
          hidden
          h-[320px]
          w-[34%]
          text-[#C9A15A]/20
          lg:block
        "
      />

      {/* ===================================================
          CONTENT
      =================================================== */}

      <div className="relative mx-auto w-full max-w-[1240px]">
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            mb-10
            flex
            flex-col
            gap-8
            sm:mb-12
            lg:mb-14
            lg:flex-row
            lg:items-start
            lg:justify-between
          "
        >
          {/* LEFT */}

          <div className="max-w-xl">
            {/* EYEBROW */}

            <div className="mb-6 flex items-center gap-4">
              <span
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#12241C]
                "
                style={{ fontFamily: FONT_SANS }}
              >
                Upcoming
              </span>

              <span className="h-px w-8 bg-[#12241C]/35" />

              <span className="text-[#12241C]/70">
                <IconPeaks size={30} />
              </span>
            </div>

            {/* HEADING */}

            <h2
              className="
                text-[46px]
                leading-[1.04]
                tracking-[-0.01em]
                text-[#12241C]
                sm:text-[56px]
                lg:text-[62px]
              "
              style={{ fontFamily: FONT_SERIF }}
            >
              Upcoming Tours
              <br />
              &amp; Events
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mt-6
                max-w-[26rem]
                text-[15px]
                leading-[1.75]
                text-[#6B7671]
              "
              style={{ fontFamily: FONT_SANS }}
            >
              Explore the unmatched beauty of Gilgit Baltistan with our carefully
              planned tours and experiences.
            </p>
          </div>

          {/* RIGHT — COMPASS BADGE */}

          <div className="flex items-start gap-4 lg:mt-24 lg:pr-[18%]">
            <span
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#14291F]
                text-white
              "
            >
              <IconCompass size={20} />
            </span>

            <div>
              <p
                className="
                  max-w-[190px]
                  text-[15px]
                  leading-[1.5]
                  text-[#12241C]
                "
                style={{ fontFamily: FONT_SANS }}
              >
                Extraordinary Journeys in the Land of Giants
              </p>

              <span className="mt-4 block h-px w-10 bg-[#C9A15A]" />
            </div>
          </div>
        </div>

        {/* =================================================
            CAROUSEL
        ================================================= */}

        <div
          ref={trackRef}
          className="
            flex
            snap-x
            snap-mandatory
            gap-5
            overflow-x-auto
            overscroll-x-contain
            pb-2
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
          style={{ scrollBehavior: "smooth" }}
        >
          {TOURS.map((tour) => (
            <div
              key={tour.id}
              data-tour-card
              className="
                w-full
                shrink-0
                snap-start
                sm:w-[calc((100%-20px)/2)]
                lg:w-[calc((100%-60px)/4)]
              "
            >
              <TourCard tour={tour} />
            </div>
          ))}

          <div
            data-tour-card
            className="
              w-full
              shrink-0
              snap-start
              sm:w-[calc((100%-20px)/2)]
              lg:w-[calc((100%-60px)/4)]
            "
          >
            <ComingSoonCard />
          </div>
        </div>

        {/* =================================================
            CONTROLS
        ================================================= */}

        <div
          className="
            mt-10
            flex
            flex-col
            gap-7
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:gap-10
          "
        >
          {/* ARROWS */}

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={previousPage}
              disabled={activePage === 0}
              aria-label="Previous tours"
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-[#12241C]/20
                text-[#12241C]
                transition-colors
                duration-300
                hover:bg-[#14291F]
                hover:text-white
                disabled:pointer-events-none
                disabled:opacity-35
              "
            >
              <span className="rotate-180">
                <IconArrow size={17} />
              </span>
            </button>

            <button
              type="button"
              onClick={nextPage}
              disabled={activePage >= pageCount - 1}
              aria-label="Next tours"
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-[#14291F]
                text-white
                transition-transform
                duration-300
                hover:translate-x-0.5
                disabled:pointer-events-none
                disabled:opacity-35
              "
            >
              <IconArrow size={17} />
            </button>
          </div>

          {/* PROGRESS RAIL */}

          <div className="relative h-px flex-1 bg-[#12241C]/12">
            <span
              className="
                absolute
                left-0
                top-0
                h-px
                bg-[#14291F]
                transition-[width]
                duration-500
                ease-out
              "
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* VIEW ALL */}

          <button
            type="button"
            className="
              group
              inline-flex
              shrink-0
              items-center
              justify-center
              gap-4
              rounded-[10px]
              border
              border-[#12241C]/15
              bg-white
              px-7
              py-4
              text-[12px]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-[#12241C]
              transition-colors
              duration-300
              hover:border-[#12241C]/40
            "
            style={{ fontFamily: FONT_SANS }}
          >
            <span>View all tours &amp; events</span>

            <span className="text-[#12241C]/70">
              <IconPeaks size={28} />
            </span>
          </button>
        </div>
      </div>

      {/* ===================================================
          REDUCED MOTION
      =================================================== */}

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