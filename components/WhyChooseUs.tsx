"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Reason = {
  id: string;
  title: string;
  description: string;
  /** Photo shown in the panel — swap these paths for any picture in /public/Images */
  image: string;
  /** Small label on the photo */
  place: string;
  Icon: (props: { size?: number }) => React.JSX.Element;
};

function IconHeritage({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 21V11.5C5 7.9 8.13 5 12 5s7 2.9 7 6.5V21"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 21v-6.5a3 3 0 0 1 6 0V21"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3.5 21h17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconGem({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 9 12 3.5 19.5 9 12 21 4.5 9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path
        d="M4.5 9h15M9 9 12 3.5 15 9M9 9l3 12 3-12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconShieldCheck({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5 19 6.3v5.4c0 4.6-3 7.9-7 9.3-4-1.4-7-4.7-7-9.3V6.3L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="m8.7 12.2 2.2 2.2 4.4-4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMountainSun({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="17.5" cy="6.5" r="2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M2.5 20 9 9l4 6 2.2-3L21.5 20H2.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

const REASONS: Reason[] = [
  {
    id: "authentic",
    Icon: IconHeritage,
    image: "/Images/tours/local-experience.png",
    place: "Baltit Fort",
    title: "Authentic Local Experiences",
    description:
      "Experience Gilgit-Baltistan through local culture, traditions-food, hidden gems, and authentic experiences.",
  },
  {
    id: "hidden-gems",
    Icon: IconGem,
    image: "/Images/tours/hidden-gems.png",
    place: "Passu Cones",
    title: "Explore Hidden Gems",
    description:
      "Discover breathtaking places beyond the usual tourist destinations, from peaceful valleys to spectacular mountain landscapes.",
  },
  {
    id: "guidance",
    Icon: IconShieldCheck,
    image: "/Images/tours/local-guidance.png",
    place: "Rakaposhi",
    title: "Trusted Local Guidance",
    description:
      "Get reliable information and practical guidance to help you explore Gilgit-Baltistan with confidence.",
  },
  {
    id: "adventure",
    Icon: IconMountainSun,
    image: "/Images/tours/adventure.png",
    place: "Nanga Parbat",
    title: "Adventure & Nature",
    description:
      "Experience mountains, lakes, rivers, valleys, hiking trails, and unforgettable outdoor adventures.",
  },
];

function useRevealOnScroll<T extends HTMLElement>() {
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

function Panel({
  reason,
  index,
  active,
  onActivate,
}: {
  reason: Reason;
  index: number;
  active: boolean;
  onActivate: () => void;
}) {
  const { Icon } = reason;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      onMouseEnter={onActivate}
      className={[
        "relative isolate overflow-hidden rounded-[24px] bg-forest",
        "transition-[flex,height,box-shadow] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none",
        active
          ? "h-[290px] shadow-[0_24px_55px_rgba(20,35,31,0.28)] ring-1 ring-gold/50 lg:h-full lg:flex-[3.4]"
          : "h-[76px] shadow-[0_2px_18px_rgba(18,36,28,0.10)] lg:h-full lg:flex-1",
      ].join(" ")}
    >
      {/* photo */}
      <Image
        src={reason.image}
        alt={reason.place}
        fill
        quality={85}
        sizes="(min-width: 1024px) 600px, 100vw"
        className={`object-cover transition-transform duration-[1400ms] ease-out motion-reduce:transition-none ${
          active ? "scale-100" : "scale-110"
        }`}
      />

      {/* shading: always a bottom gradient for text, plus a dimmer veil while collapsed */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/25 to-forest/10" />
      <div
        aria-hidden
        className={`absolute inset-0 bg-forest/50 transition-opacity duration-700 ${active ? "opacity-0" : "opacity-100"}`}
      />

      {/* number (large screens) + icon */}
      <span className="absolute left-6 top-6 z-10 hidden font-serif text-sm text-cream/75 lg:block">{number}</span>
      <span className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 bg-cream/10 text-cream backdrop-blur-md lg:right-5 lg:top-5">
        <Icon size={19} />
      </span>

      {/* collapsed label — horizontal on phones, vertical on large screens */}
      <div
        aria-hidden
        className={`absolute inset-0 z-10 flex items-center gap-3 px-5 pr-16 transition-opacity duration-500 lg:items-end lg:px-6 lg:pb-6 lg:pr-6 ${
          active ? "opacity-0" : "opacity-100 delay-300"
        }`}
      >
        <span className="font-serif text-sm text-cream/70 lg:hidden">{number}</span>
        <span className="font-serif text-base text-cream lg:whitespace-nowrap lg:text-lg lg:[writing-mode:vertical-rl] lg:rotate-180">
          {reason.title}
        </span>
      </div>

      {/* expanded content (fixed width on large screens so the text never reflows while the panel grows) */}
      <div
        className={`absolute inset-x-0 bottom-0 z-10 p-5 transition-all duration-500 sm:p-7 lg:w-[430px] lg:p-8 ${
          active ? "translate-y-0 opacity-100 delay-300" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <span className="inline-flex items-center gap-1.5 rounded-full border border-cream/25 bg-cream/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream backdrop-blur-sm">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
            <circle cx="12" cy="9.5" r="2.3" />
          </svg>
          {reason.place}
        </span>

        <h3 className="mt-3 font-serif text-2xl leading-tight text-cream sm:text-3xl">{reason.title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-cream/80">{reason.description}</p>
      </div>

      {/* one button covers the panel: click, tap or keyboard focus opens it */}
      <button
        type="button"
        aria-label={`Show: ${reason.title}`}
        aria-expanded={active}
        onClick={onActivate}
        onFocus={onActivate}
        className="absolute inset-0 z-20 rounded-[24px] outline-none focus-visible:ring-2 focus-visible:ring-gold"
      />
    </article>
  );
}

export default function WhyChooseUs() {
  const [active, setActive] = useState(0);
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();

  return (
    /* Horizontal padding lives on this same div as max-w-6xl (not on the
       section), matching Header/Hero/UpcomingTours exactly, so content
       here lines up with the logo/Sign Up edges instead of the wider
       "centered max-w-6xl inside a padded section" box. */
    <section
      id="why-choose-us"
      className="relative w-full overflow-hidden bg-cream pb-16 pt-40 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[460px] w-[460px] rounded-full bg-gold/5 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              <span className="h-px w-8 bg-muted/60" />
              Why choose us
            </div>

            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-forest sm:text-5xl lg:text-6xl">
              Why explore Gilgit
              <br />
              <span className="text-green">with us?</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              We are locals first and guides second. Every journey we plan draws on years
              of firsthand experience in these mountains — so you travel with confidence,
              not just a map.
            </p>
          </div>

          <p className="flex items-center gap-2 text-xs text-muted">
            <span className="h-px w-8 bg-muted/60" />
            <span className="lg:hidden">Tap a photo to explore</span>
            <span className="hidden lg:inline">Hover a photo to explore</span>
          </p>
        </div>

        <div
          ref={ref}
          className={`mt-10 flex flex-col gap-3 transition-all duration-700 ease-out motion-reduce:transition-none lg:mt-12 lg:h-[420px] lg:flex-row ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {REASONS.map((reason, index) => (
            <Panel
              key={reason.id}
              reason={reason}
              index={index}
              active={active === index}
              onActivate={() => setActive(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
