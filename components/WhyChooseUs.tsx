"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SectionHeader from "./ui/SectionHeader";

type Reason = {
  id: string;
  title: string;
  description: string;
  /** Photo shown in the panel — swap these paths for any picture in /public/Images */
  image: string;
  /** Small label on the photo */
  place: string;
  /** The source files are photo collages — this crops to ONE photo of the collage (CSS object-view-box inset: top right bottom left) */
  crop?: string;
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
    crop: "0.7% 37.5% 32.2% 18.5%",
    place: "Passu Cones",
    title: "Explore Hidden Gems",
    description:
      "Discover breathtaking places beyond the usual tourist destinations, from peaceful valleys to spectacular mountain landscapes.",
  },
  {
    id: "guidance",
    Icon: IconShieldCheck,
    image: "/Images/tours/local-guidance.png",
    crop: "0 0 48.4% 0",
    place: "Rakaposhi",
    title: "Trusted Local Guidance",
    description:
      "Get reliable information and practical guidance to help you explore Gilgit-Baltistan with confidence.",
  },
  {
    id: "adventure",
    Icon: IconMountainSun,
    image: "/Images/tours/adventure.png",
    crop: "51.8% 33.9% 0.5% 33.9%",
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
          ? "h-[340px] shadow-[0_24px_55px_rgba(20,35,31,0.28)] ring-1 ring-gold/50 lg:h-full lg:flex-[3.4]"
          : "h-[76px] shadow-[0_2px_18px_rgba(18,36,28,0.10)] lg:h-full lg:flex-1",
      ].join(" ")}
    >
      {/* one photo per card — the source files are collages, so crop to a single tile */}
      <Image
        src={reason.image}
        alt=""
        fill
        quality={85}
        sizes="(min-width: 1024px) 560px, 100vw"
        style={reason.crop ? ({ objectViewBox: `inset(${reason.crop})` } as React.CSSProperties) : undefined}
        className={`object-cover transition-transform duration-[1400ms] ease-out motion-reduce:transition-none ${
          active ? "scale-100" : "scale-[1.04]"
        }`}
      />

      {/* same dark overlay on every card: transparent at the top, ~80% dark at the bottom */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/35 to-night/5"
      />
      {/* collapsed cards sit a little darker so their vertical title always reads */}
      <div
        aria-hidden
        className={`absolute inset-0 bg-night/25 transition-opacity duration-700 ${active ? "opacity-0" : "opacity-100"}`}
      />

      {/* number + icon share one top line and the same 24px padding in every card */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 lg:p-6">
        <span className="font-serif text-sm text-white lg:text-base">{number}</span>
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-500 ${
            active ? "border-gold/70 bg-black/40 text-gold" : "border-white/30 bg-black/25 text-white"
          }`}
        >
          <Icon size={19} />
        </span>
      </div>

      {/* collapsed title — identical in every collapsed card: solid white, same size, same left/bottom offset */}
      <div
        aria-hidden={active}
        className={`absolute inset-0 z-10 flex items-end px-5 pb-0 transition-opacity duration-300 lg:px-6 lg:pb-6 ${
          active ? "pointer-events-none opacity-0" : "opacity-100 delay-300"
        }`}
      >
        <span className="absolute inset-y-0 left-12 right-16 flex items-center font-serif text-lg text-white lg:static lg:inset-auto lg:max-h-[calc(100%-5.5rem)] lg:leading-tight lg:[writing-mode:vertical-rl] lg:rotate-180">
          {reason.title}
        </span>
      </div>

      {/* expanded text — fades in only once the card has finished growing, bottom-left at the same 24px inset */}
      <div
        className={`absolute bottom-0 left-0 z-10 p-5 transition-opacity lg:w-[min(100%,30rem)] lg:p-6 ${
          active ? "opacity-100 duration-300 delay-[650ms]" : "pointer-events-none opacity-0 duration-150"
        }`}
      >
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
            <circle cx="12" cy="9.5" r="2.3" />
          </svg>
          {reason.place}
        </span>

        <h3 className="mt-2 font-serif text-2xl leading-tight text-white sm:text-3xl">{reason.title}</h3>
        <p className="mt-2 max-w-md text-[15px] leading-[1.5] text-white/90">{reason.description}</p>
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
    <section
      id="why-choose-us"
      className="section-b relative w-full overflow-hidden bg-cream pt-40 sm:pt-24 lg:pt-[calc(3.5rem+var(--space-section-tight))]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[460px] w-[460px] rounded-full bg-gold/5 blur-3xl"
      />

      {/* shared page container: same width and side padding as every other section */}
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why choose us"
          heading={
            <>
              Why explore Gilgit
              <br />
              <span className="text-green">with us?</span>
            </>
          }
        />

        <div
          ref={ref}
          className={`flex flex-col gap-3 transition-all duration-700 ease-out motion-reduce:transition-none lg:h-[var(--media-h)] lg:flex-row ${
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
