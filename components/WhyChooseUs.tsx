"use client";

import { useEffect, useRef, useState } from "react";

type Reason = {
  id: string;
  title: string;
  description: string;
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
    title: "Authentic Local Experiences",
    description:
      "Experience Gilgit-Baltistan through local culture, traditions, hidden gems, and authentic experiences.",
  },
  {
    id: "hidden-gems",
    Icon: IconGem,
    title: "Explore Hidden Gems",
    description:
      "Discover breathtaking places beyond the usual tourist destinations, from peaceful valleys to spectacular mountain landscapes.",
  },
  {
    id: "guidance",
    Icon: IconShieldCheck,
    title: "Trusted Local Guidance",
    description:
      "Get reliable information and practical guidance to help you explore Gilgit-Baltistan with confidence.",
  },
  {
    id: "adventure",
    Icon: IconMountainSun,
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

function ReasonCard({ reason, delay }: { reason: Reason; delay: number }) {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();
  const { Icon } = reason;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={[
        "group rounded-[24px] border border-forest/10 bg-white p-7 shadow-[0_2px_18px_rgba(18,36,28,0.06)]",
        "transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(20,35,31,0.12)]",
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      ].join(" ")}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green/10 text-green transition-colors duration-500 group-hover:bg-green group-hover:text-white">
        <Icon size={22} />
      </span>

      <h3 className="mt-6 font-serif text-xl leading-snug text-forest">{reason.title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted">{reason.description}</p>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="relative overflow-hidden bg-cream px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[460px] w-[460px] rounded-full bg-gold/5 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            <span className="h-px w-8 bg-muted/60" />
            Why choose us
          </div>

          <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-forest sm:text-5xl lg:text-6xl">
            Why explore Gilgit with us?
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            We are locals first and guides second. Every journey we plan draws on years
            of firsthand experience in these mountains — so you travel with confidence,
            not just a map.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {REASONS.map((reason, index) => (
            <ReasonCard key={reason.id} reason={reason} delay={index * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
