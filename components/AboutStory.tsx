"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { LinkButton } from "./ui/Button";
import { PeakMark } from "./ui/Logo";
import { CompassIcon } from "./ui/icons";

const STATS = [
  { value: 12, suffix: "+", label: "Years guiding these valleys" },
  { value: 3500, suffix: "+", label: "Travelers hosted" },
  { value: 40, suffix: "+", label: "Curated journeys" },
];

/** Straight from the story: every route is scouted, hosted and driven by local guides. */
const STEPS = ["Scouted", "Hosted", "Driven"];

/* ---- faint topographic lines behind the text (pure maths, no randomness) ---- */
function ring(cx: number, cy: number, r: number, seed: number, squash = 1) {
  const points: string[] = [];
  const steps = 64;
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const wobble =
      1 + 0.16 * Math.sin(3 * t + seed) + 0.09 * Math.sin(5 * t + seed * 1.7) + 0.05 * Math.sin(9 * t + seed * 0.6);
    const x = cx + Math.cos(t) * r * wobble;
    const y = cy + Math.sin(t) * r * wobble * squash;
    points.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return `${points.join(" ")}Z`;
}

const CONTOURS = Array.from({ length: 11 }, (_, i) => ring(560, 300, 30 + (310 * i) / 10, 1.4 + i * 0.35, 0.85));

/* ---- small hooks ---- */
function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduced;
}

/** Counts up from 0 once `start` is true (shows the final number straight away if motion is reduced). */
function CountUp({ to, suffix, start }: { to: number; suffix: string; start: boolean }) {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(to);

  useEffect(() => {
    setValue(reduced ? to : 0);
  }, [reduced, to]);

  useEffect(() => {
    if (!start || reduced) return;

    let frame = 0;
    const startedAt = performance.now();
    const duration = 1900;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(to * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, reduced, to]);

  return (
    <>
      {value.toLocaleString("en-US")}
      {suffix}
    </>
  );
}

export default function AboutStory() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  /* small helper: fade-up with a delay, driven by the same `inView` flag */
  const reveal = (delay: number) => ({
    className: `transition-all duration-700 ease-out motion-reduce:transition-none ${
      inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
    }`,
    style: { transitionDelay: inView ? `${delay}ms` : "0ms" },
  });

  return (
    <section id="our-story" className="relative overflow-hidden bg-night pb-20 pt-10 text-cream sm:pb-24 sm:pt-12 lg:pb-28 lg:pt-14">
      {/* background: glow + faint topographic lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-green/10 blur-3xl"
      />
      <svg
        aria-hidden
        viewBox="0 0 800 600"
        preserveAspectRatio="xMaxYMid slice"
        className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-2/3 text-cream/[0.045] lg:block"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1">
          {CONTOURS.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      </svg>

      <div
        ref={ref}
        className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8"
      >
        {/* ------------------------------ photo side ------------------------------ */}
        <div className="relative order-2 w-full lg:order-1">
          {/* offset gold frame that slides out from behind the photo */}
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 rounded-[28px] border border-gold/35 transition-all duration-[1400ms] ease-out motion-reduce:transition-none ${
              inView
                ? "translate-x-3 translate-y-3 opacity-100 sm:translate-x-4 sm:translate-y-4"
                : "translate-x-0 translate-y-0 opacity-0"
            }`}
            style={{ transitionDelay: inView ? "500ms" : "0ms" }}
          />

          {/* the photo: revealed like a curtain, with a slow settle-in zoom */}
          <div
            className={`relative aspect-[4/5] w-full overflow-hidden rounded-[28px] transition-[clip-path] duration-[1400ms] ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none ${
              inView ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(100%_0_0_0)]"
            }`}
          >
            <Image
              src="/images/tours/our-story.png"
              alt="Our team guiding a journey through Gilgit-Baltistan"
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className={`object-cover transition-transform duration-[2400ms] ease-out motion-reduce:transition-none ${
                inView ? "scale-100" : "scale-[1.15]"
              }`}
            />

            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night/80 to-transparent" />

            {/* glass caption */}
            <div
              className={`absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl border border-cream/15 bg-night/55 px-4 py-3 backdrop-blur-md transition-all duration-700 ease-out motion-reduce:transition-none sm:bottom-5 sm:left-5 sm:right-auto ${
                inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: inView ? "1000ms" : "0ms" }}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                <CompassIcon size={18} />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">On the trail</p>
                <p className="mt-0.5 truncate text-[11px] text-cream/70">35.9° N, 74.3° E — Gilgit-Baltistan</p>
              </div>
            </div>
          </div>

          {/* slowly rotating badge that straddles the photo edge on large screens */}
          <div
            aria-hidden
            className={`absolute right-3 top-3 z-10 flex h-24 w-24 items-center justify-center rounded-full border border-gold/30 bg-night/70 backdrop-blur-md transition-all duration-700 ease-out motion-reduce:transition-none sm:h-28 sm:w-28 lg:-right-10 lg:top-10 ${
              inView ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
            style={{ transitionDelay: inView ? "900ms" : "0ms" }}
          >
            <svg viewBox="0 0 120 120" className="about-spin absolute inset-0 h-full w-full text-cream/70">
              <defs>
                <path id="about-ring" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
              </defs>
              <text fontSize="9" fontWeight="600" fill="currentColor">
                <textPath href="#about-ring" textLength="270" lengthAdjust="spacing">
                  LOCAL GUIDES • BORN IN THE MOUNTAINS •
                </textPath>
              </text>
            </svg>
            <PeakMark className="relative h-7 w-7 text-gold" />
          </div>
        </div>

        {/* ------------------------------ text side ------------------------------ */}
        <div className="order-1 lg:order-2">
          <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/60">
            <span
              className={`h-px bg-cream/30 transition-[width] duration-700 ease-out motion-reduce:transition-none ${
                inView ? "w-8" : "w-0"
              }`}
            />
            Our story
          </div>

          {/* each line slides up from behind a mask */}
          <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl">
            <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
              <span
                className={`block transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none ${
                  inView ? "translate-y-0" : "translate-y-full"
                }`}
                style={{ transitionDelay: inView ? "150ms" : "0ms" }}
              >
                Born in these valleys,
              </span>
            </span>
            <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
              <span
                className={`block transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none ${
                  inView ? "translate-y-0" : "translate-y-full"
                }`}
                style={{ transitionDelay: inView ? "300ms" : "0ms" }}
              >
                <span className="heading-accent">built for travelers.</span>
              </span>
            </span>
          </h2>

          <p
            className={`mt-6 max-w-xl text-sm leading-relaxed text-cream/70 sm:text-base ${reveal(450).className}`}
            style={reveal(450).style}
          >
            Discover Gilgit started with a simple belief: the best way to see
            Gilgit-Baltistan is with the people who grew up in it. Every route we run
            is scouted, hosted, and driven by local guides who know each pass, orchard,
            and fort by name — so your journey feels less like a tour and more like
            being shown home.
          </p>

          {/* the three promises from the paragraph, as a tiny route */}
          <div
            className={`mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 ${reveal(600).className}`}
            style={reveal(600).style}
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/45">Every route is</span>
            {STEPS.map((step, i) => (
              <Fragment key={step}>
                {i > 0 && <span aria-hidden className="h-px w-4 bg-gold/40" />}
                <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/[0.04] px-3 py-1.5 text-xs text-cream/85 transition-colors duration-300 hover:border-gold/50 hover:text-gold">
                  <span className="font-serif text-[11px] text-gold">{String(i + 1).padStart(2, "0")}</span>
                  {step}
                </span>
              </Fragment>
            ))}
            <span className="text-xs text-cream/45">by local guides</span>
          </div>

          {/* stats count up, and a gold line draws across the top */}
          <div className="relative mt-10 grid grid-cols-3 gap-6 border-t border-cream/10 pt-8">
            <span
              aria-hidden
              className={`absolute -top-px left-0 h-px bg-gradient-to-r from-gold to-transparent transition-[width] duration-[1600ms] ease-out motion-reduce:transition-none ${
                inView ? "w-full" : "w-0"
              }`}
              style={{ transitionDelay: inView ? "700ms" : "0ms" }}
            />
            {STATS.map((stat, i) => (
              <div key={stat.label} className={reveal(750 + i * 120).className} style={reveal(750 + i * 120).style}>
                <p className="font-serif text-2xl tabular-nums text-gold sm:text-3xl">
                  <CountUp to={stat.value} suffix={stat.suffix} start={inView} />
                </p>
                <p className="mt-1 text-[11px] leading-snug text-cream/55">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className={`mt-10 ${reveal(1100).className}`} style={reveal(1100).style}>
            <LinkButton href="/plan-your-trip" variant="outline" className="group">
              <PeakMark className="text-cream" />
              Plan your journey
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
            </LinkButton>
          </div>
        </div>
      </div>

      <style>{`
        .about-spin { animation: about-spin 28s linear infinite; }
        @keyframes about-spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .about-spin { animation: none; }
        }
      `}</style>
    </section>
  );
}
