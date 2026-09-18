"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Destination = {
  id: string;
  name: string;
  blurb: string;
  image: string;
  tag: string;
  href: string;
  span: string;
};

const DEFAULT_DESTINATIONS: Destination[] = [
  {
    id: "hunza",
    name: "Hunza Valley",
    blurb:
      "Terraced orchards, ancient forts, and snow-capped peaks framing a valley of legend.",
    image: "/Images/tours/passu-cones.jpg",
    tag: "Discover Hunza",
    href: "/destinations/hunza-valley",
    span: "lg:col-span-7",
  },

  {
    id: "deosai",
    name: "Deosai Plains",
    blurb:
      "The 'Land of Giants' — vast alpine plateau where brown bears roam beneath endless sky.",
    image: "/Images/tours/deosai-plains.png",
    tag: "Explore Deosai",
    href: "/destinations/deosai-plains",
    span: "lg:col-span-5",
  },

  {
    id: "skardu",
    name: "Skardu & Katpana",
    blurb:
      "Cold desert dunes beside turquoise lakes, gateway to the world's highest peaks.",
    image: "/Images/tours/cold-desert.png",
    tag: "Discover Skardu",
    href: "/destinations/skardu-katpana",
    span: "lg:col-span-5",
  },

  {
    id: "fairy-meadows",
    name: "Fairy Meadows",
    blurb:
      "Alpine meadows at the foot of Nanga Parbat, wrapped in pine forest and morning mist.",
    image: "/Images/tours/nanga-parbat.png",
    tag: "Discover Fairy Meadows",
    href: "/destinations/fairy-meadows",
    span: "lg:col-span-7",
  },
];

/* =========================================================
   REVEAL ON SCROLL
   ========================================================= */

function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/* =========================================================
   DESTINATION CARD
   ========================================================= */

function DestinationCard({
  destination,
  className = "",
  delay = 0,
}: {
  destination: Destination;
  className?: string;
  delay?: number;
}) {
  const { name, blurb, image, tag, href } = destination;

  const { ref, visible } =
    useRevealOnScroll<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      href={href}
      className={[
        "destination-card group relative isolate block",

        // Responsive height
        "min-h-[330px]",
        "sm:min-h-[370px]",
        "md:min-h-[390px]",
        "lg:min-h-[410px]",

        // Shape
        "overflow-hidden",
        "rounded-[28px]",

        // Accessibility
        "outline-none",

        // Animation
        "transition-all",
        "duration-700",
        "ease-out",

        // Hover
        "hover:-translate-y-2",
        "hover:shadow-[0_30px_70px_rgba(28,43,46,0.25)]",

        // Focus
        "focus-visible:ring-2",
        "focus-visible:ring-[#3E6E6B]",
        "focus-visible:ring-offset-4",
        "focus-visible:ring-offset-[#F6F1E7]",

        visible ? "destination-card-visible" : "",

        className,
      ].join(" ")}
      style={
        visible
          ? {
              animationDelay: `${delay}ms`,
            }
          : undefined
      }
    >
      {/* =====================================================
          IMAGE
          ===================================================== */}

      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            scale-100
            opacity-100
            transition-transform
            duration-1000
            ease-out
            group-hover:scale-105
          "
        />
      </div>

      {/* =====================================================
          GRADIENT OVERLAY
          ===================================================== */}

      <div
        aria-hidden
        className="
          absolute
          inset-0
          z-[1]
          bg-gradient-to-t
          from-[#102124]/95
          via-[#1C2B2E]/35
          to-transparent
          opacity-90
          transition-all
          duration-700
          group-hover:from-[#102124]/95
          group-hover:via-[#1C2B2E]/20
        "
      />

      {/* =====================================================
          TOP COUNTRY TAG
          ===================================================== */}

      <div className="absolute left-6 top-6 z-10 sm:left-7 sm:top-7">
        <span
          className="
            inline-flex
            items-center
            rounded-full
            border
            border-white/20
            bg-white/10
            px-3.5
            py-1.5
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.16em]
            text-white
            backdrop-blur-md
            transition-all
            duration-500
            group-hover:bg-white/20
          "
        >
          Pakistan
        </span>
      </div>

      {/* =====================================================
          DESTINATION NUMBER
          ===================================================== */}

      <div
        className="
          absolute
          right-6
          top-6
          z-10
          font-[family-name:var(--font-fraunces)]
          text-sm
          text-white/60
          transition-all
          duration-500
          group-hover:text-white
          sm:right-7
          sm:top-7
        "
      >
        {destination.id === "hunza" && "01"}
        {destination.id === "deosai" && "02"}
        {destination.id === "skardu" && "03"}
        {destination.id === "fairy-meadows" && "04"}
      </div>

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-10
          p-6
          transition-transform
          duration-700
          ease-out
          group-hover:-translate-y-1
          sm:p-8
        "
      >
        <div className="max-w-xl">

          {/* TITLE */}

          <h3
            className="
              font-[family-name:var(--font-fraunces)]
              text-3xl
              leading-[1.05]
              tracking-tight
              text-white
              sm:text-4xl
            "
          >
            {name}
          </h3>

          {/* DESCRIPTION */}

          <p
            className="
              mt-3
              max-w-[42ch]
              text-sm
              leading-relaxed
              text-white/75
              transition-all
              duration-500
              group-hover:text-white/90
            "
          >
            {blurb}
          </p>

          {/* =================================================
              CTA
              ================================================= */}

          <div className="mt-5 flex items-center gap-3">
            <span
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.12em]
                text-[#B7D9C0]
                transition-colors
                duration-300
                group-hover:text-white
              "
            >
              {tag}
            </span>

            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                border
                border-white/25
                bg-white/10
                backdrop-blur-sm
                transition-all
                duration-500
                group-hover:translate-x-2
                group-hover:border-white/60
                group-hover:bg-white
              "
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                className="
                  text-white
                  transition-colors
                  duration-300
                  group-hover:text-[#1C2B2E]
                "
              >
                <path
                  d="M2.5 6.5h7.5M7 3l3.5 3.5L7 10"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          HOVER BORDER
          ===================================================== */}

      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          inset-0
          z-20
          rounded-[28px]
          border
          border-white/0
          transition-all
          duration-700
          group-hover:border-white/25
        "
      />
    </Link>
  );
}

/* =========================================================
   MAIN SECTION
   ========================================================= */

export default function FeaturedDestinations({
  eyebrow = "Featured destinations",
  heading = "Places that stay with you",
  ctaLabel = "View all lands",
  ctaHref = "/destinations",
  destinations = DEFAULT_DESTINATIONS,
}: {
  eyebrow?: string;
  heading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  destinations?: Destination[];
}) {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#F6F1E7]
        px-5
        py-20
        sm:px-10
        sm:py-24
        lg:px-16
        lg:py-28
      "
    >
      {/* =====================================================
          DECORATIVE BACKGROUND
          ===================================================== */}

      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          -right-40
          top-20
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#3E6E6B]/5
          blur-3xl
        "
      />

      <div className="relative mx-auto w-full max-w-6xl">

        {/* ===================================================
            HEADER
            =================================================== */}

        <div
          className="
            mb-12
            flex
            flex-col
            justify-between
            gap-8
            lg:mb-14
            lg:flex-row
            lg:items-end
          "
        >
          <div className="max-w-2xl">

            {/* EYEBROW */}

            <div
              className="
                mb-5
                flex
                items-center
                gap-3
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#8A8377]
              "
            >
              <span className="h-px w-8 bg-[#8A8377]/60" />

              {eyebrow}
            </div>

            {/* HEADING */}

            <h2
              className="
                font-[family-name:var(--font-fraunces)]
                text-4xl
                leading-[1.05]
                tracking-tight
                text-[#1C2B2E]
                sm:text-5xl
                lg:text-6xl
              "
            >
              {heading}
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mt-5
                max-w-xl
                text-sm
                leading-relaxed
                text-[#8A8377]
                sm:text-base
              "
            >
              From legendary mountain valleys to landscapes that feel
              untouched by time — discover the places that make Pakistan
              unforgettable.
            </p>
          </div>

          {/* =================================================
              VIEW ALL BUTTON
              ================================================= */}

          <Link
            href={ctaHref}
            className="
              group
              inline-flex
              w-fit
              shrink-0
              items-center
              gap-3
              rounded-full
              border
              border-[#1C2B2E]/15
              bg-white/40
              px-5
              py-3
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-[#1C2B2E]
              backdrop-blur-sm
              transition-all
              duration-500
              hover:border-[#1C2B2E]
              hover:bg-[#1C2B2E]
              hover:text-white
            "
          >
            {ctaLabel}

            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              <path
                d="M2.5 7h8.5M8 3.5 11.5 7 8 10.5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* ===================================================
            DESTINATION GRID
            =================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            lg:grid-cols-12
          "
        >
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              className={destination.span}
              delay={index * 140}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
