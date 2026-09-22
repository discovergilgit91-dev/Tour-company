"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button, LinkButton } from "./ui/Button";
import { CompassIcon } from "./ui/icons";
import { PeakMark } from "./ui/Logo";

/* =========================================================
   ICONS — small, local, stroke-based to match the site's
   existing icon language (1.6 stroke, 24x24 viewBox).
========================================================= */

type IconFn = (props: { size?: number }) => React.JSX.Element;

function IconFort({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 21V11l3-2.2 3 2.2V6.8L12 4.5l2 2.3V11l3-2.2 3 2.2v10H4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M4 21h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconLeafLake({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3c5 2 7 6.2 5 11-2 4.4-7.2 6-10 3-2.5-2.6-1.5-7.2 1-9.7C9.4 6 10.4 4.5 12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9 17c1-3.2 3.2-6.2 7-9.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconSunburst({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 2.5v3M12 18.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconWeek({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7.7 14h2M12 14h2M7.7 17h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconRange({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="17.5" cy="6.5" r="1.8" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M2.2 19.5 8.5 9l3.6 5.5 2-2.7 7.7 7.7H2.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconSolo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconDuo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="8.6" r="2.1" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3.4 20c0-3.2 2.5-5.5 5.9-5.5M13.3 20c.3-2.7 2.3-4.7 4.9-4.7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconGroup({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="7" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12.2" cy="7.3" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.3" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M2.6 20c.3-2.9 2.2-4.9 4.6-4.9M20.9 20c-.3-2.9-2.2-4.9-4.6-4.9M7.9 20c.4-3.3 2-5.6 3.9-5.6s3.5 2.3 3.9 5.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconFamily({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="8" cy="7.3" r="2.6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.5" cy="9" r="1.9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M2.6 20c.3-3.4 2.6-5.9 5.4-5.9M13.3 20c.4-2.6 1.8-4.5 3.3-4.7M21.3 20c-.2-2.1-1.4-3.7-2.9-4.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* =========================================================
   QUIZ DATA
========================================================= */

type MoodId = "adventure" | "heritage" | "nature";
type DurationId = "short" | "medium" | "long";
type TravelerId = "solo" | "partner" | "friends" | "family";

type QuizOption<T extends string> = { id: T; label: string; sub: string; Icon: IconFn };

const MOODS: QuizOption<MoodId>[] = [
  { id: "adventure", label: "Adventure & Thrill", sub: "Peaks, treks, open trails", Icon: CompassIcon },
  { id: "heritage", label: "Culture & Heritage", sub: "Forts, villages, old stories", Icon: IconFort },
  { id: "nature", label: "Peace & Nature", sub: "Lakes, plains, quiet skies", Icon: IconLeafLake },
];

const DURATIONS: QuizOption<DurationId>[] = [
  { id: "short", label: "A Quick Escape", sub: "2–3 days", Icon: IconSunburst },
  { id: "medium", label: "A Full Week", sub: "5–7 days", Icon: IconWeek },
  { id: "long", label: "The Whole Journey", sub: "10+ days", Icon: IconRange },
];

const TRAVELERS: QuizOption<TravelerId>[] = [
  { id: "solo", label: "Just Me", sub: "Solo explorer", Icon: IconSolo },
  { id: "partner", label: "Me & My Person", sub: "The two of us", Icon: IconDuo },
  { id: "friends", label: "The Squad", sub: "Friends along", Icon: IconGroup },
  { id: "family", label: "The Whole Family", sub: "Kids included", Icon: IconFamily },
];

type Recommendation = { image: string; place: string; title: string; blurb: string };

const RECOMMENDATIONS: Record<MoodId, Record<DurationId, Recommendation>> = {
  adventure: {
    short: {
      image: "/Images/tours/rakaposhi-trek.jpg",
      place: "Rakaposhi Base Camp",
      title: "Rakaposhi Sunrise Trek",
      blurb:
        "A short, sharp climb to a base camp view that earns every step — perfect when time is tight but the pull to the mountains isn't.",
    },
    medium: {
      image: "/Images/tours/nanga-parbat.png",
      place: "Fairy Meadows",
      title: "Nanga Parbat Base Camp Trek",
      blurb:
        "A week beneath the Killer Mountain, walking through alpine forest to a base camp view few ever stand in front of.",
    },
    long: {
      image: "/Images/tours/hunza-valley.png",
      place: "Upper Hunza & Shimshal",
      title: "The Karakoram Traverse",
      blurb:
        "A full expedition through Hunza's highest valleys — glaciers, passes, and villages that only reveal themselves to those who stay long enough.",
    },
  },
  heritage: {
    short: {
      image: "/Images/tours/baltit-fort.png",
      place: "Baltit & Altit Forts",
      title: "Forts of Hunza Weekend",
      blurb: "Two ancient forts, centuries of stories, and golden-hour views over the valley — all in a long weekend.",
    },
    medium: {
      image: "/Images/tours/altit-baltit.jpg",
      place: "Hunza Heritage Trail",
      title: "Hunza Heritage Circuit",
      blurb: "A week tracing old trade routes, mountain villages, and the forts that once guarded them.",
    },
    long: {
      image: "/Images/tours/passu-cones.jpg",
      place: "Passu & the Old Silk Road",
      title: "The Silk Road Deep Dive",
      blurb:
        "A slow, unhurried journey along the ancient Silk Road, staying long enough in each village to actually know it.",
    },
  },
  nature: {
    short: {
      image: "/Images/tours/cold-desert.png",
      place: "Skardu Cold Desert",
      title: "Skardu Desert Escape",
      blurb: "Golden dunes against snow-capped peaks — a short trip to somewhere that still feels unreal.",
    },
    medium: {
      image: "/Images/tours/deosai-plains.png",
      place: "Deosai National Park",
      title: "Deosai Plains Retreat",
      blurb:
        "A week above the clouds on the Roof of the World, camping under some of the darkest skies you'll ever see.",
    },
    long: {
      image: "/Images/tours/skardu.png",
      place: "Skardu Valley & Beyond",
      title: "The Slow Skardu Journey",
      blurb: "Lakes, glaciers, and valleys at an unhurried pace — enough time to actually rest, not just travel.",
    },
  },
};

const TRAVELER_NOTE: Record<TravelerId, string> = {
  solo: "Built for going at your own pace, solo.",
  partner: "An easy, unhurried pace for two.",
  friends: "Loud, memorable, and made for a group.",
  family: "Paced comfortably enough for the whole family.",
};

const GREETINGS: Record<number, (m?: MoodId, d?: DurationId) => string> = {
  0: () => "Hi, I'm your local travel partner. Answer three quick questions and I'll match you to a journey.",
  1: (m) =>
    m === "adventure"
      ? "Adventure it is. Now — how much time can you give the mountains?"
      : m === "heritage"
        ? "Heritage and stories — good choice. How much time do you have?"
        : "Peace and open skies. How much time do you have?",
  2: () => "Almost there — who's coming along?",
  3: () => "Here's what I'd plan for you.",
};

const STEPS = [
  { key: "mood" as const, options: MOODS },
  { key: "duration" as const, options: DURATIONS },
  { key: "travelers" as const, options: TRAVELERS },
];

/* =========================================================
   HOOKS
========================================================= */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduced;
}

function useInView<T extends HTMLElement>(threshold = 0.15) {
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
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* =========================================================
   COMPONENT
========================================================= */

type Answers = { mood?: MoodId; duration?: DurationId; travelers?: TravelerId };

export default function TravelPartner() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [thinking, setThinking] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();

  const isResult = stepIndex >= STEPS.length;
  const recommendation =
    isResult && answers.mood && answers.duration ? RECOMMENDATIONS[answers.mood][answers.duration] : null;

  function handleSelect<T extends string>(key: "mood" | "duration" | "travelers", id: T) {
    if (thinking) return;
    setAnswers((prev) => ({ ...prev, [key]: id }));

    if (reducedMotion) {
      setStepIndex((i) => i + 1);
      return;
    }

    setThinking(true);
    window.setTimeout(() => {
      setThinking(false);
      setStepIndex((i) => i + 1);
    }, 550);
  }

  function goBack() {
    if (thinking || stepIndex === 0) return;
    setStepIndex((i) => i - 1);
  }

  function restart() {
    setAnswers({});
    setStepIndex(0);
    setThinking(false);
  }

  const greeting = GREETINGS[Math.min(stepIndex, 3)](answers.mood, answers.duration);
  const progressCount = Math.min(stepIndex, STEPS.length);

  return (
    <section id="travel-partner" className="relative overflow-hidden bg-cream py-16 sm:py-20 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] rounded-full bg-green/5 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            <span className="h-px w-8 bg-muted/60" />
            Plan with a local
          </div>

          <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-forest sm:text-5xl lg:text-6xl">
            Meet your
            <br />
            <span className="text-green">travel partner.</span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            No forms, no browsing forty tours — just three quick questions, and we&apos;ll match you
            to a journey built for what you actually want.
          </p>
        </div>

        <div
          ref={ref}
          className={`mt-10 overflow-hidden rounded-[28px] bg-forest text-cream shadow-[0_30px_70px_-25px_rgba(20,35,31,0.45)] transition-all duration-700 ease-out motion-reduce:transition-none sm:mt-12 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr]">
            {/* ---------------- conversation panel ---------------- */}
            <div className="relative flex flex-col justify-between gap-8 border-b border-cream/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cream/20 bg-cream/10">
                    <PeakMark className="h-6 w-6 text-gold" />
                  </span>
                  <div>
                    <p className="font-serif text-lg leading-tight text-cream">Your travel partner</p>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-cream/50">Online now</p>
                  </div>
                </div>

                <div aria-live="polite" className="mt-6">
                  <p key={Math.min(stepIndex, 3)} className="partner-line text-[15px] leading-relaxed text-cream/85 motion-reduce:animate-none">
                    {greeting}
                  </p>

                  {thinking && (
                    <span className="mt-3 inline-flex items-center gap-1" aria-hidden="true">
                      <span className="partner-dot h-1.5 w-1.5 rounded-full bg-cream/60" />
                      <span className="partner-dot h-1.5 w-1.5 rounded-full bg-cream/60" />
                      <span className="partner-dot h-1.5 w-1.5 rounded-full bg-cream/60" />
                    </span>
                  )}
                </div>
              </div>

              <div>
                {!isResult && stepIndex > 0 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="mb-4 text-xs text-cream/55 underline-offset-4 transition-colors hover:text-cream hover:underline"
                  >
                    ← Back
                  </button>
                )}

                <div className="flex items-center gap-2">
                  {STEPS.map((step, i) => (
                    <span
                      key={step.key}
                      className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                        i < progressCount || isResult
                          ? "w-6 bg-gold"
                          : i === progressCount
                            ? "w-6 bg-cream/70"
                            : "w-1.5 bg-cream/25"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-cream/45">
                  {isResult ? "Your match" : `Question ${stepIndex + 1} of ${STEPS.length}`}
                </p>
              </div>
            </div>

            {/* ---------------- options / result panel ---------------- */}
            <div className="p-6 sm:p-8 lg:p-10">
              {!isResult ? (
                <div
                  key={stepIndex}
                  className={`grid grid-cols-1 gap-3 sm:grid-cols-2 ${thinking ? "pointer-events-none opacity-50" : ""} partner-step motion-reduce:animate-none`}
                >
                  {STEPS[stepIndex].options.map((option) => {
                    const { Icon } = option;
                    const isSelected = answers[STEPS[stepIndex].key] === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleSelect(STEPS[stepIndex].key, option.id)}
                        aria-pressed={isSelected}
                        className={`group flex items-center gap-3.5 rounded-2xl border px-4 py-4 text-left transition-all duration-300 ease-out ${
                          isSelected
                            ? "border-gold bg-cream/10"
                            : "border-cream/12 bg-cream/[0.03] hover:border-gold/50 hover:bg-cream/[0.07]"
                        }`}
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors duration-300 group-hover:border-gold/60 group-hover:text-gold">
                          <Icon size={19} />
                        </span>
                        <span>
                          <span className="block font-serif text-base text-cream">{option.label}</span>
                          <span className="block text-xs text-cream/55">{option.sub}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : recommendation ? (
                <div className="partner-step grid grid-cols-1 gap-6 motion-reduce:animate-none sm:grid-cols-[240px_1fr] sm:gap-8">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl sm:aspect-auto sm:h-full">
                    <Image
                      src={recommendation.image}
                      alt={recommendation.place}
                      fill
                      sizes="(min-width: 640px) 240px, 100vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col">
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
                      {recommendation.place}
                    </span>

                    <h3 className="mt-3 font-serif text-2xl leading-tight text-cream sm:text-3xl">
                      {recommendation.title}
                    </h3>

                    <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/80">
                      {recommendation.blurb} {answers.travelers ? TRAVELER_NOTE[answers.travelers] : ""}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {answers.duration && (
                        <span className="rounded-full border border-cream/15 bg-cream/[0.05] px-3 py-1 text-xs text-cream/70">
                          {DURATIONS.find((d) => d.id === answers.duration)?.sub}
                        </span>
                      )}
                      {answers.travelers && (
                        <span className="rounded-full border border-cream/15 bg-cream/[0.05] px-3 py-1 text-xs text-cream/70">
                          {TRAVELERS.find((t) => t.id === answers.travelers)?.label}
                        </span>
                      )}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <LinkButton href="/journeys" variant="primary" className="group">
                        Plan this journey
                        <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
                      </LinkButton>
                      <Button type="button" variant="outline" onClick={restart}>
                        Start over
                      </Button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .partner-step { animation: partnerStepIn 500ms cubic-bezier(.2,.7,.2,1) both; }
        .partner-line { animation: partnerStepIn 450ms ease-out both; }
        @keyframes partnerStepIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .partner-dot { animation: partnerBounce 1200ms ease-in-out infinite; }
        .partner-dot:nth-child(2) { animation-delay: 160ms; }
        .partner-dot:nth-child(3) { animation-delay: 320ms; }
        @keyframes partnerBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .partner-step, .partner-line, .partner-dot { animation: none; }
        }
      `}</style>
    </section>
  );
}
