"use client";

import { useState, type CSSProperties, type FormEvent, type KeyboardEvent } from "react";
import { Button } from "./ui/Button";

/* -------------------------------------------------------------------------- */
/*  Content                                                                   */
/* -------------------------------------------------------------------------- */

const CONTACT_DETAILS = [
  { label: "Email", value: "hello@discovergilgit.com", href: "mailto:hello@discovergilgit.com" },
  { label: "Phone", value: "+92 355 123 4567", href: "tel:+923551234567" },
  { label: "Office", value: "Jutial Road, Gilgit, Gilgit-Baltistan", href: undefined },
];

const SEASONS = [
  { id: "spring", label: "Spring", note: "Blossoms" },
  { id: "summer", label: "Summer", note: "Trek season" },
  { id: "autumn", label: "Autumn", note: "Golden valleys" },
  { id: "winter", label: "Winter", note: "Snow & silence" },
];

/**
 * Stylised map of the region. Coordinates are projected from real latitude/longitude
 * (about 1.7 units per km), so relative positions are right but it is an illustration, not a survey map.
 */
type Stop = {
  id: string;
  label: string;
  short: string; // compact name used on the map
  x: number;
  y: number;
  lx: number; // label offset
  ly: number;
  anchor: "start" | "middle" | "end";
};

const BASE = { x: 76, y: 201 }; // Gilgit

const STOPS: Stop[] = [
  { id: "hunza", label: "Hunza Valley", short: "Hunza", x: 129, y: 127, lx: 9, ly: 3, anchor: "start" },
  { id: "naltar", label: "Naltar Valley", short: "Naltar", x: 57, y: 155, lx: -9, ly: 3, anchor: "end" },
  { id: "khunjerab", label: "Khunjerab Pass", short: "Khunjerab", x: 243, y: 29, lx: -9, ly: 3, anchor: "end" },
  { id: "fairy-meadows", label: "Fairy Meadows", short: "Fairy Meadows", x: 117, y: 299, lx: 9, ly: 3, anchor: "start" },
  { id: "skardu", label: "Skardu", short: "Skardu", x: 274, y: 316, lx: 9, ly: 3, anchor: "start" },
  { id: "shigar", label: "Shigar Valley", short: "Shigar", x: 290, y: 292, lx: 0, ly: -9, anchor: "middle" },
  { id: "deosai", label: "Deosai Plains", short: "Deosai", x: 240, y: 362, lx: 9, ly: 3, anchor: "start" },
];

/* ---- deterministic topographic contours (pure maths, no randomness) ---- */

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

function rings(cx: number, cy: number, from: number, to: number, count: number, seed: number, squash = 1) {
  return Array.from({ length: count }, (_, i) =>
    ring(cx, cy, from + ((to - from) * i) / (count - 1), seed + i * 0.35, squash)
  );
}

const MAP_CONTOURS = [
  ...rings(118, 327, 8, 62, 7, 1.2), // Nanga Parbat massif
  ...rings(103, 159, 8, 56, 6, 3.4), // Rakaposhi range
  ...rings(318, 210, 10, 70, 7, 5.1), // towards K2 / Baltoro
  ...rings(240, 350, 20, 70, 4, 2.2, 0.55), // Deosai plateau (broad and flat)
];

const BG_CONTOURS = [...rings(600, 200, 40, 380, 12, 0.7, 0.8), ...rings(120, 480, 30, 260, 8, 2.9)];

/** A gentle curve from Gilgit to a stop. Uses the stop's fixed index so the curve never changes. */
function routePath(to: { x: number; y: number }, index: number) {
  const dx = to.x - BASE.x;
  const dy = to.y - BASE.y;
  const len = Math.hypot(dx, dy) || 1;
  const bend = len * 0.22 * (index % 2 === 0 ? 1 : -1);
  const cx = BASE.x + dx / 2 + (-dy / len) * bend;
  const cy = BASE.y + dy / 2 + (dx / len) * bend;
  return `M${BASE.x} ${BASE.y} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${to.x} ${to.y}`;
}

/* -------------------------------------------------------------------------- */
/*  Styles                                                                    */
/* -------------------------------------------------------------------------- */

const LABEL_CLASS = "mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-cream/60";

const FIELD_CLASS =
  "w-full rounded-xl border border-cream/15 bg-cream/[0.04] px-4 py-3 font-sans text-sm text-cream placeholder:text-cream/40 outline-none transition-colors focus:border-gold/60";

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function ContactSection() {
  const [selected, setSelected] = useState<string[]>([]);
  const [season, setSeason] = useState<string | null>(null);
  const [travelers, setTravelers] = useState(2);
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");

  const toggleStop = (id: string) =>
    setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  const onPinKey = (event: KeyboardEvent<SVGGElement>, id: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleStop(id);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setFirstName(String(data.get("name") ?? "").trim().split(" ")[0]);
    // TODO: send `data` (name, email, message, destinations, season, travelers) to your API here.
    setSubmitted(true);
  };

  const reset = () => {
    setSelected([]);
    setSeason(null);
    setTravelers(2);
    setSubmitted(false);
  };

  const selectedStops = STOPS.filter((stop) => selected.includes(stop.id));
  const seasonLabel = SEASONS.find((item) => item.id === season)?.label;

  const summary = [
    selectedStops.length ? `${selectedStops.length} stop${selectedStops.length > 1 ? "s" : ""}` : null,
    seasonLabel ?? null,
    `${travelers} traveler${travelers > 1 ? "s" : ""}`,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    /* No horizontal padding on the section: it lives in the container below,
       exactly like Header, Hero, FeaturedDestinations, AboutStory, UpcomingTours and Testimonials
       (max-w-6xl + px-4 sm:px-6). Vertical padding matches them too. */
    <section id="contact" className="relative overflow-hidden bg-forest py-20 text-cream sm:py-24 lg:py-28">
      {/* background: faint topographic lines + soft glow */}
      <svg
        aria-hidden
        viewBox="0 0 800 600"
        preserveAspectRatio="xMaxYMin slice"
        className="pointer-events-none absolute inset-0 h-full w-full text-cream/[0.05]"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1">
          {BG_CONTOURS.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      </svg>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-gold/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* header */}
        <div className="mb-12 flex flex-col justify-between gap-8 lg:mb-14 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/60">
              <span className="h-px w-8 bg-cream/30" />
              Contact
            </div>

            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl">
              Let&apos;s plan your
              <br />
              <span className="heading-accent">Gilgit-Baltistan trip.</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-cream/70 sm:text-base">
              Tap your stops on the map, tell us when you&apos;d like to travel, and a local trip
              planner will get back to you within one working day.
            </p>
          </div>

          <div className="shrink-0">
            <dl className="space-y-4 lg:border-l lg:border-cream/10 lg:pl-8">
              {CONTACT_DETAILS.map((item) => (
                <div key={item.label} className="flex items-baseline gap-4">
                  <dt className="w-16 shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
                    {item.label}
                  </dt>
                  <dd className="text-sm text-cream/80">
                    {item.href ? (
                      <a href={item.href} className="transition-colors duration-300 hover:text-gold">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* ------------------------------ route map ------------------------------ */}
          <div className="relative flex flex-col overflow-hidden rounded-[24px] border border-cream/10 bg-gradient-to-br from-cream/[0.06] to-cream/[0.02] lg:col-span-5">
            <div className="relative z-10 flex items-start justify-between gap-4 px-6 pt-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">Route planner</p>
                <p className="mt-1 font-serif text-lg text-cream">
                  {selectedStops.length === 0
                    ? "Choose your stops"
                    : `${selectedStops.length} stop${selectedStops.length > 1 ? "s" : ""} from Gilgit`}
                </p>
              </div>

              {selectedStops.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelected([])}
                  className="rounded-full border border-cream/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-cream/70 transition-colors duration-300 hover:border-gold/60 hover:text-gold"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="relative min-h-[360px] flex-1 px-2 pb-2 pt-2">
              <svg
                viewBox="0 0 340 400"
                className="h-full w-full"
                role="group"
                aria-label="Illustrated map of Gilgit-Baltistan. Select destinations to add them to your trip."
              >
                {/* contours */}
                <g className="text-cream/[0.09]" fill="none" stroke="currentColor" strokeWidth="0.8">
                  {MAP_CONTOURS.map((d, i) => (
                    <path key={i} d={d} />
                  ))}
                </g>

                {/* rivers */}
                <g className="text-cream/25" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                  <path
                    id="c-indus"
                    d="M14 312 C20 290 30 273 42 262 C70 235 100 225 118 240 C128 250 150 256 175 272 C205 292 240 300 276 314"
                  />
                  <path d="M243 32 C215 60 175 80 150 105 C130 125 100 165 80 198" />
                </g>
                <text className="text-cream/35" fill="currentColor" fontSize="7" letterSpacing="2.4" fontStyle="italic">
                  <textPath href="#c-indus" startOffset="58%">
                    INDUS
                  </textPath>
                </text>

                {/* peaks */}
                <g className="text-cream/45" fill="currentColor" fontSize="7.5" letterSpacing="1.2">
                  <path d="M114 331 L118 323 L122 331Z" />
                  <text x="118" y="344" textAnchor="middle">
                    NANGA PARBAT · 8,126 M
                  </text>
                  <path d="M99 163 L103 155 L107 163Z" />
                  <text x="112" y="162">
                    RAKAPOSHI · 7,788 M
                  </text>
                  <path d="M318 218 L322 210 L326 218Z" />
                  <text x="330" y="203" textAnchor="end">
                    K2 · 8,611 M ›
                  </text>
                </g>

                {/* compass + scale */}
                <g className="text-cream/50" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M318 40 V16 M313 22 L318 15 L323 22" />
                  <text x="318" y="52" textAnchor="middle" fill="currentColor" stroke="none" fontSize="8" letterSpacing="1">
                    N
                  </text>
                  <path d="M20 386 H103 M20 383 V389 M103 383 V389" />
                  <text x="20" y="378" fill="currentColor" stroke="none" fontSize="7" letterSpacing="1.4">
                    50 KM
                  </text>
                </g>

                {/* routes from Gilgit to every selected stop */}
                {STOPS.map((stop, index) => {
                  if (!selected.includes(stop.id)) return null;
                  const d = routePath(stop, index);
                  return (
                    <g key={stop.id} className="text-gold">
                      <path d={d} pathLength={1} className="c-route" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <circle r="2.6" className="c-traveler text-cream" fill="currentColor">
                        <animateMotion dur="3.4s" begin="1.2s" repeatCount="indefinite" path={d} />
                      </circle>
                    </g>
                  );
                })}

                {/* base: Gilgit */}
                <g transform={`translate(${BASE.x} ${BASE.y})`} className="text-gold">
                  <circle r="9" className="c-pulse" fill="none" stroke="currentColor" strokeWidth="1.2" />
                  <circle r="9" fill="none" stroke="currentColor" strokeOpacity="0.45" />
                  <circle r="4.5" fill="currentColor" />
                  <text x="0" y="22" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="600" letterSpacing="1.6">
                    GILGIT · BASE
                  </text>
                </g>

                {/* stops (also clickable on the map) */}
                {STOPS.map((stop) => {
                  const on = selected.includes(stop.id);
                  return (
                    <g
                      key={stop.id}
                      transform={`translate(${stop.x} ${stop.y})`}
                      role="button"
                      tabIndex={0}
                      aria-pressed={on}
                      aria-label={`${on ? "Remove" : "Add"} ${stop.label}`}
                      onClick={() => toggleStop(stop.id)}
                      onKeyDown={(event) => onPinKey(event, stop.id)}
                      className={`c-pin transition-colors duration-300 ${on ? "text-gold" : "text-cream/60 hover:text-cream"}`}
                    >
                      <circle r="18" fill="transparent" />
                      <circle r="13" className="c-focus" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      {on && <circle r="6" className="c-pulse" fill="none" stroke="currentColor" strokeWidth="1.2" />}
                      <circle r="5.5" fill="none" stroke="currentColor" strokeOpacity="0.5" />
                      <circle r="3" className="c-dot" data-on={on} fill="currentColor" />
                      <text
                        x={stop.lx}
                        y={stop.ly}
                        textAnchor={stop.anchor}
                        fill="currentColor"
                        fontSize="8.5"
                        fontWeight={on ? 700 : 500}
                        letterSpacing="1"
                        className="pointer-events-none select-none uppercase"
                      >
                        {stop.short}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <p className="relative z-10 px-6 pb-5 text-[11px] text-cream/40">
              Illustrative map — positions are approximate and not to scale.
            </p>
          </div>

          {/* --------------------------------- form --------------------------------- */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col rounded-[24px] border border-cream/10 bg-cream/[0.03] p-6 sm:p-8 lg:col-span-7"
          >
            {submitted ? (
              <div className="flex min-h-[420px] flex-1 flex-col items-center justify-center text-center">
                <svg viewBox="0 0 120 90" className="h-28 w-36 text-gold" aria-hidden="true">
                  <path
                    d="M6 84 L44 28 L58 46 L74 20 L114 84 Z"
                    pathLength={1}
                    className="c-peak"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <rect x="73.4" y="3" width="1.2" height="17" rx="0.6" className="c-pole" fill="currentColor" />
                  <path d="M74.6 3.5 L93 8.5 L74.6 13.5 Z" className="c-flag" fill="currentColor" />
                </svg>

                <p className="c-fade-up mt-6 font-serif text-3xl text-cream" style={{ animationDelay: "1.5s" }}>
                  Thank you{firstName ? `, ${firstName}` : ""}!
                </p>

                {selectedStops.length > 0 && (
                  <div
                    className="c-fade-up mt-5 flex flex-wrap items-center justify-center gap-2"
                    style={{ animationDelay: "1.7s" }}
                  >
                    <span className="text-[11px] uppercase tracking-[0.14em] text-cream/50">Your route</span>
                    {selectedStops.map((stop) => (
                      <span
                        key={stop.id}
                        className="rounded-full border border-gold/30 px-3 py-1 text-[11px] font-semibold text-gold"
                      >
                        {stop.label}
                      </span>
                    ))}
                  </div>
                )}

                <p
                  className="c-fade-up mt-4 max-w-xs text-sm leading-relaxed text-cream/70"
                  style={{ animationDelay: "1.9s" }}
                >
                  We&apos;ve received your message and will reply within one working day.
                </p>

                <button
                  type="button"
                  onClick={reset}
                  className="c-fade-up mt-8 text-xs font-semibold uppercase tracking-[0.12em] text-gold transition-colors duration-300 hover:text-cream"
                  style={{ animationDelay: "2.1s" }}
                >
                  Plan another trip →
                </button>
              </div>
            ) : (
              <div className="flex flex-1 flex-col gap-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={LABEL_CLASS}>
                      Name
                    </label>
                    <input id="name" name="name" type="text" required placeholder="Your full name" className={FIELD_CLASS} />
                  </div>

                  <div>
                    <label htmlFor="email" className={LABEL_CLASS}>
                      Email
                    </label>
                    <input id="email" name="email" type="email" required placeholder="you@example.com" className={FIELD_CLASS} />
                  </div>
                </div>

                <div>
                  <span className={LABEL_CLASS} id="stops-label">
                    Where to? <span className="ml-1 normal-case tracking-normal text-cream/40">— pick as many as you like</span>
                  </span>
                  <div className="flex flex-wrap gap-2" role="group" aria-labelledby="stops-label">
                    {STOPS.map((stop) => {
                      const on = selected.includes(stop.id);
                      return (
                        <button
                          key={stop.id}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggleStop(stop.id)}
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] transition-all duration-300 ${
                            on
                              ? "border-gold bg-gold font-semibold text-forest"
                              : "border-cream/15 bg-cream/[0.04] text-cream/75 hover:border-gold/60 hover:text-cream"
                          }`}
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                            {on ? <path d="M5 12.5l4.5 4.5L19 7.5" /> : <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />}
                          </svg>
                          {stop.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <span className={LABEL_CLASS} id="season-label">
                    When?
                  </span>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-labelledby="season-label">
                    {SEASONS.map((item) => {
                      const on = season === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          aria-pressed={on}
                          onClick={() => setSeason(on ? null : item.id)}
                          className={`rounded-xl border px-3 py-2.5 text-left transition-all duration-300 ${
                            on
                              ? "border-gold bg-gold/10"
                              : "border-cream/15 bg-cream/[0.04] hover:border-gold/60"
                          }`}
                        >
                          <span className={`block text-[13px] font-semibold ${on ? "text-gold" : "text-cream"}`}>{item.label}</span>
                          <span className="block text-[11px] text-cream/50">{item.note}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-cream/15 bg-cream/[0.04] px-4 py-2.5">
                  <span className="text-xs font-semibold uppercase tracking-[0.1em] text-cream/60">Travelers</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Fewer travelers"
                      disabled={travelers <= 1}
                      onClick={() => setTravelers((n) => Math.max(1, n - 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors duration-300 hover:bg-cream hover:text-forest disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-cream"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-serif text-lg tabular-nums text-cream" aria-live="polite">
                      {travelers}
                    </span>
                    <button
                      type="button"
                      aria-label="More travelers"
                      disabled={travelers >= 20}
                      onClick={() => setTravelers((n) => Math.min(20, n + 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors duration-300 hover:bg-cream hover:text-forest disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-cream"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-1 flex-col">
                  <label htmlFor="message" className={LABEL_CLASS}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us about the trip you're planning..."
                    className={`${FIELD_CLASS} min-h-[110px] flex-1 resize-none`}
                  />
                </div>

                {/* hidden fields so the selections travel with the form */}
                <input type="hidden" name="destinations" value={selectedStops.map((stop) => stop.label).join(", ")} />
                <input type="hidden" name="season" value={seasonLabel ?? ""} />
                <input type="hidden" name="travelers" value={travelers} />

                <div>
                  <p className="mb-3 text-center text-[11px] uppercase tracking-[0.14em] text-cream/45">{summary}</p>
                  <Button type="submit" className="w-full">
                    Send trip request
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      <style>{`
        /* route lines draw themselves from Gilgit to the chosen stop */
        .c-route { stroke-dasharray: 1; stroke-dashoffset: 1; animation: c-draw 1.2s cubic-bezier(.4,0,.2,1) forwards; }
        @keyframes c-draw { to { stroke-dashoffset: 0; } }

        /* the little traveller dot appears once the line has been drawn */
        .c-traveler { opacity: 0; animation: c-show 0s 1.2s forwards; }
        @keyframes c-show { to { opacity: 1; } }

        /* pins */
        .c-pin { cursor: pointer; outline: none; }
        .c-focus { opacity: 0; }
        .c-pin:focus-visible .c-focus { opacity: 1; }
        .c-dot { transform-box: fill-box; transform-origin: center; transition: transform .35s cubic-bezier(.34,1.56,.64,1); }
        .c-dot[data-on="true"] { transform: scale(1.6); }
        .c-pin:hover .c-dot { transform: scale(1.35); }
        .c-pin:hover .c-dot[data-on="true"] { transform: scale(1.7); }

        .c-pulse { transform-box: fill-box; transform-origin: center; animation: c-pulse 2.4s ease-out infinite; }
        @keyframes c-pulse {
          0%   { transform: scale(.7); opacity: .8; }
          100% { transform: scale(2.6); opacity: 0; }
        }

        /* success: the peak draws, a flag is raised and unfurls */
        .c-peak { stroke-dasharray: 1; stroke-dashoffset: 1; animation: c-draw 1.3s ease-out forwards; }
        .c-pole { transform-box: fill-box; transform-origin: bottom; transform: scaleY(0); animation: c-rise .6s .9s cubic-bezier(.2,.8,.2,1) forwards; }
        @keyframes c-rise { to { transform: scaleY(1); } }
        .c-flag {
          transform-box: fill-box; transform-origin: left center; transform: scaleX(0);
          animation: c-unfurl .6s 1.3s cubic-bezier(.2,.8,.2,1) forwards, c-wave 3s 1.9s ease-in-out infinite alternate;
        }
        @keyframes c-unfurl { to { transform: scaleX(1); } }
        @keyframes c-wave {
          from { transform: scaleX(1) skewY(0deg); }
          to   { transform: scaleX(.9) skewY(-6deg); }
        }
        .c-fade-up { opacity: 0; animation: c-fade-up .7s cubic-bezier(.2,.7,.2,1) forwards; }
        @keyframes c-fade-up {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .c-route, .c-peak { animation: none; stroke-dashoffset: 0; }
          .c-traveler { display: none; }
          .c-pulse { animation: none; opacity: 0; }
          .c-pole { animation: none; transform: none; }
          .c-flag { animation: none; transform: none; }
          .c-fade-up { animation: none; opacity: 1; }
          .c-dot { transition: none; }
        }
      `}</style>
    </section>
  );
}
