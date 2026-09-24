"use client";

import { useState } from "react";
import { LinkButton } from "./ui/Button";
import { SearchBar } from "./Hero";
import { ArrowIcon, ClockIcon, PinIcon, UsersIcon, GaugeIcon, DownloadIcon } from "./ui/icons";
import { useRevealOnScroll } from "./DestinationCard";

/* ---------------------------------------------------------------------
   Trip facts — kept in one place so the hero strip, sidebar card, and
   downloadable itinerary all stay in sync.
   --------------------------------------------------------------------- */
const TRIP = {
  title: "Blossoms of Hunza",
  tagline: "Spring Tour · Blossoms & Peaks",
  dateRange: "25 May – 29 May, 2027",
  duration: "5 Days / 4 Nights",
  route: "Gilgit → Karimabad",
  groupSize: "Max 12 People",
  level: "Moderate Active",
  season: "Spring (April – May)",
  price: "$450",
};

const ITINERARY = [
  {
    day: "Day 1",
    title: "Arrival in Gilgit → Karimabad",
    tag: "Karakoram Highway",
    description:
      "Fly or drive into Gilgit, then wind along the Karakoram Highway into a valley just beginning to bloom. Settle in with a welcome dinner overlooking Rakaposhi.",
  },
  {
    day: "Day 2",
    title: "Baltit Fort & the Old Karimabad Blossom Walk",
    tag: "Karimabad",
    description:
      "A morning tour through 700-year-old Baltit Fort, followed by an afternoon on foot through Old Karimabad's terraced orchards, heavy with cherry and apricot blossom.",
  },
  {
    day: "Day 3",
    title: "Sunrise at Duikar & Eagle's Nest",
    tag: "Duikar Viewpoint",
    description:
      "Rise before dawn for Pakistan's finest valley panorama — Rakaposhi and Ultar Sar catching first light over an orchard floor turned pink and white.",
  },
  {
    day: "Day 4",
    title: "Altit Fort & the Riverside Orchards",
    tag: "Altit",
    description:
      "Explore Hunza's oldest fort, then wander the riverside orchard trails and share tea with a local family whose blossoms have bloomed for four generations.",
  },
  {
    day: "Day 5",
    title: "Farewell Breakfast & Departure",
    tag: "Gilgit",
    description:
      "One last unhurried morning among the blossoms before the transfer back to Gilgit for your onward journey.",
  },
];

const GUIDES = [
  {
    name: "Karim Nasir",
    role: "Lead Mountain Guide",
    bio: "Born and raised in Karimabad, Karim has guided trekkers through Hunza's valleys and passes for over fifteen years.",
    from: "from-rose-300",
    to: "to-forest",
  },
  {
    name: "Amina Baig",
    role: "Cultural Heritage Guide",
    bio: "A historian by training, Amina brings five centuries of Altit and Baltit's stories to life at every stop.",
    from: "from-amber-300",
    to: "to-forest",
  },
  {
    name: "Sher Ali",
    role: "Orchard & Homestay Host",
    bio: "Sher's family orchard has bloomed for four generations — he welcomes every group to share tea beneath the blossoms.",
    from: "from-teal-300",
    to: "to-forest",
  },
  {
    name: "Zarina Karim",
    role: "Logistics & Photography Guide",
    bio: "Zarina scouts the season's best blossom viewpoints and makes sure every transfer and timing runs smoothly.",
    from: "from-purple-300",
    to: "to-forest",
  },
];

const SPRING_STATS = [
  { value: "2–3 Wks", label: "Peak Bloom Window" },
  { value: "8,500 ft", label: "Valley Elevation" },
  { value: "400+ Yrs", label: "Orchard Heritage" },
  { value: "12", label: "Max Group Size" },
];

/* ---------------------------------------------------------------------
   Decorative motifs — no photography exists for this tour yet, so every
   visual here is an honest, clearly-decorative vector rather than a
   mislabeled placeholder image.
   --------------------------------------------------------------------- */
function BlossomBranch({ className = "" }: { className?: string }) {
  const blossoms = [
    [18, 58],
    [34, 42],
    [52, 50],
    [66, 30],
    [82, 38],
    [96, 18],
  ];
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden="true">
      <path
        d="M2 70C20 66 34 58 46 50S70 34 96 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.55"
      />
      {blossoms.map(([cx, cy], i) => (
        <g key={i} transform={`translate(${cx} ${cy})`}>
          {Array.from({ length: 5 }, (_, p) => {
            const angle = (p / 5) * Math.PI * 2;
            return (
              <circle
                key={p}
                cx={Math.cos(angle) * 3.4}
                cy={Math.sin(angle) * 3.4}
                r="2.6"
                className="fill-rose-300/70"
              />
            );
          })}
          <circle r="1.4" className="fill-gold" />
        </g>
      ))}
    </svg>
  );
}

function PeaksMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 200" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      <path
        d="M-40 180 60 100l60 60 70-100 70 90 60-50 100 110 90-70 130 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M-40 200 80 130l70 70 80-110 80 100 70-60 110 120 100-80 140 130"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------------
   Hero — same structural rhythm and search-bar overlap as the shared
   Hero component, but with a bespoke spring-blossom decorative
   background (no photography exists for this tour yet) and a trip
   facts strip in place of a generic secondary CTA.
   --------------------------------------------------------------------- */
function TourHero() {
  return (
    <section className="relative bg-forest pb-10 sm:pb-8 md:pb-6">
      <div className="relative min-h-[76svh] w-full sm:min-h-[82svh] md:min-h-[86svh]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="h-full w-full bg-gradient-to-br from-rose-950/40 via-forest to-night" />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-16 h-[420px] w-[420px] rounded-full bg-rose-400/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-1/3 h-[360px] w-[360px] rounded-full bg-gold/10 blur-3xl"
          />
          <PeaksMotif className="absolute inset-x-0 bottom-0 h-[45%] w-full text-cream/[0.05]" />
          <BlossomBranch className="absolute right-4 top-20 h-32 w-48 text-cream/30 sm:right-10 sm:h-44 sm:w-64 md:top-16 md:h-56 md:w-80" />
          <BlossomBranch className="absolute -left-6 bottom-8 h-28 w-44 rotate-[200deg] text-cream/20 sm:h-36 sm:w-56" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/50 via-transparent to-forest/20" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[76svh] max-w-6xl flex-col justify-center px-5 pt-28 pb-40 sm:min-h-[82svh] sm:px-6 sm:pb-16 sm:pt-32 md:min-h-[86svh] md:pb-20 md:pt-36 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-cream/95 px-4 py-1.5 text-[10px] font-semibold tracking-wide text-green sm:text-xs">
              SPRING SPECIAL · HUNZA VALLEY
            </span>

            <h1 className="mt-5 font-serif text-[30px] font-semibold leading-[1.12] tracking-tight text-cream sm:mt-6 sm:text-5xl md:text-[56px]">
              {TRIP.title}
              <br />
              <span className="heading-accent">Where Petals Meet Peaks</span>
            </h1>

            <p className="mt-5 max-w-xl text-[13.5px] leading-relaxed text-cream/85 sm:mt-6 sm:text-base md:text-lg">
              Walk beneath pink almond and cherry blossoms as they bloom against snow-capped peaks —
              five unforgettable days through Hunza Valley&rsquo;s most beautiful season.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-cream/15 pt-6 sm:mt-9">
              <div className="flex items-center gap-2.5 text-cream/90">
                <ClockIcon size={16} />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-cream/50">Duration</p>
                  <p className="text-[13px] font-semibold">{TRIP.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-cream/90">
                <PinIcon size={16} />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-cream/50">Start / End</p>
                  <p className="text-[13px] font-semibold">{TRIP.route}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-cream/90">
                <UsersIcon size={16} />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-cream/50">Group Size</p>
                  <p className="text-[13px] font-semibold">{TRIP.groupSize}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-cream/90">
                <GaugeIcon size={16} />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-cream/50">Physical Level</p>
                  <p className="text-[13px] font-semibold">{TRIP.level}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-30 translate-y-1/2 px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SearchBar />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------
   Sidebar — trip overview card with a real, working "Download
   Itinerary" feature (a plain-text file built from ITINERARY), the
   same honest-working-feature approach used elsewhere on the site.
   --------------------------------------------------------------------- */
function TripOverviewCard() {
  function handleDownloadItinerary() {
    const lines = [
      `${TRIP.title} — ${TRIP.tagline}`,
      TRIP.dateRange,
      `${TRIP.duration}  ·  ${TRIP.route}  ·  ${TRIP.groupSize}  ·  ${TRIP.level}`,
      "",
      "ITINERARY",
      "---------",
      ...ITINERARY.flatMap((day) => [`${day.day} — ${day.title} (${day.tag})`, day.description, ""]),
      "Discover Gilgit — Blossoms of Hunza",
    ];

    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "blossoms-of-hunza-itinerary.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="overflow-hidden rounded-[22px] border border-forest/10 bg-white shadow-[0_2px_18px_rgba(18,36,28,0.07)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-forest to-night">
        <PeaksMotif className="absolute inset-x-0 bottom-0 h-2/3 w-full text-cream/10" />
        <BlossomBranch className="absolute right-2 top-4 h-24 w-36 text-cream/30" />
        <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-cream/15 bg-night/50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-cream/70 backdrop-blur-sm">
          Photo coming soon
        </span>
      </div>

      <div className="p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Trip Overview</p>

        <dl className="mt-4 space-y-3.5">
          {[
            ["Dates", TRIP.dateRange],
            ["Duration", TRIP.duration],
            ["Route", TRIP.route],
            ["Season", TRIP.season],
            ["Group Size", TRIP.groupSize],
            ["Physical Level", TRIP.level],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-3 border-t border-forest/8 pt-3.5 first:border-t-0 first:pt-0">
              <dt className="text-xs text-muted">{label}</dt>
              <dd className="text-right text-[13px] font-semibold text-forest">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex items-baseline justify-between border-t border-forest/8 pt-4">
          <span className="text-xs text-muted">Starting from</span>
          <span className="font-serif text-2xl text-forest">
            {TRIP.price}
            <span className="ml-1 text-xs font-sans font-normal text-muted">/ person</span>
          </span>
        </div>

        <LinkButton href="/#contact" variant="primary" className="group mt-5 w-full gap-2">
          Reserve Your Spot
          <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
            <ArrowIcon size={14} />
          </span>
        </LinkButton>

        <button
          type="button"
          onClick={handleDownloadItinerary}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-forest/15 px-5 py-3 text-sm font-semibold text-forest transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-forest/30 active:translate-y-0 active:scale-[0.97]"
        >
          <DownloadIcon size={15} />
          Download Itinerary
        </button>
      </div>
    </div>
  );
}

export default function HunzaSpringTour() {
  return (
    <main className="bg-cream">
      <TourHero />

      {/* ---------------- About + Guides + Itinerary (main) / Trip Overview (sidebar) ---------------- */}
      <section className="relative w-full overflow-hidden bg-cream pb-16 pt-14 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_340px] lg:gap-14">
            <div className="relative">
              <BlossomBranch className="pointer-events-none absolute -right-6 -top-10 hidden h-32 w-48 text-rose-300 opacity-25 lg:block" />

              {/* About */}
              <Reveal>
                <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                  <span className="h-px w-8 bg-muted/60" />
                  About this journey
                </div>
                <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-forest sm:text-5xl">
                  Hunza in its
                  <br />
                  <span className="text-green">most beautiful season</span>
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                  For two or three weeks each spring, the terraced orchards of Hunza Valley turn white
                  and pink beneath the snow line of Rakaposhi and Ultar Sar. This five-day journey times
                  every stop to that brief, extraordinary window — walking trails, forts, and family
                  orchards at the exact moment the valley is in full bloom.
                </p>
              </Reveal>

              {/* Why Spring in Hunza — stat strip */}
              <Reveal delay={100}>
                <div className="relative mt-8 grid grid-cols-2 gap-x-6 gap-y-7 rounded-[22px] border border-forest/10 bg-white p-6 sm:grid-cols-4 sm:p-7">
                  {SPRING_STATS.map((stat) => (
                    <div key={stat.label}>
                      <p className="font-serif text-3xl text-forest sm:text-4xl">{stat.value}</p>
                      <p className="mt-1.5 min-h-[32px] text-xs uppercase leading-snug tracking-[0.08em] text-muted">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Guides */}
              <div className="mt-16">
                <Reveal>
                  <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                    <span className="h-px w-8 bg-muted/60" />
                    The guides
                  </div>
                  <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-forest sm:text-4xl">
                    Local guides leading the way
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                    Every group travels with people who call this valley home — leading you through
                    orchards, forts, and mountain passes, and sharing the quiet rhythms of
                    Gilgit-Baltistan along the way.
                  </p>
                </Reveal>

                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {GUIDES.map((guide, index) => (
                    <Reveal key={guide.name} delay={index * 90}>
                      <div className="flex h-full gap-4 rounded-[18px] border border-forest/10 bg-white p-5 shadow-[0_2px_18px_rgba(18,36,28,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_28px_-8px_rgba(18,36,28,0.16)]">
                        <div
                          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${guide.from} ${guide.to} font-serif text-lg text-white`}
                        >
                          {guide.name
                            .split(" ")
                            .map((w) => w[0])
                            .join("")}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-serif text-lg text-forest">{guide.name}</h3>
                          <p className="mt-0.5 min-h-[32px] text-xs font-semibold uppercase leading-snug tracking-[0.06em] text-green">
                            {guide.role}
                          </p>
                          <p className="mt-2 line-clamp-3 min-h-[54px] text-xs leading-relaxed text-muted">
                            {guide.bio}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div className="mt-16">
                <Reveal>
                  <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                    <span className="h-px w-8 bg-muted/60" />
                    The itinerary
                  </div>
                  <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-forest sm:text-4xl">
                    Five days among the blossoms
                  </h2>
                </Reveal>

                <div className="mt-8 divide-y divide-forest/8 border-t border-forest/8">
                  {ITINERARY.map((day, index) => (
                    <Reveal key={day.day} delay={index * 70}>
                      <div className="grid grid-cols-1 gap-4 rounded-2xl py-6 transition-colors duration-300 hover:bg-forest/[0.025] sm:-mx-4 sm:grid-cols-[110px_1fr] sm:gap-6 sm:px-4">
                        <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2.5">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest font-serif text-base text-cream">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-serif text-sm text-forest sm:text-base">{day.day}</p>
                            <span className="mt-0.5 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-green">
                              <PinIcon size={11} />
                              {day.tag}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-serif text-base text-forest sm:text-lg">{day.title}</h3>
                          <p className="mt-1.5 text-sm leading-relaxed text-muted">{day.description}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Reveal delay={120}>
                <TripOverviewCard />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Pull quote ---------------- */}
      <section className="relative w-full overflow-hidden bg-forest py-20 sm:py-24 lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-rose-400/10 blur-3xl"
        />
        <div className="relative mx-auto w-full max-w-3xl px-5 text-center sm:px-6 lg:px-8">
          <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="mx-auto text-gold/60" aria-hidden="true">
            <path
              d="M0 24V14.4Q0 7.2 4.2 3.6 8.4 0 14.4 0v4.8Q10.8 4.8 8.4 7.2 6 9.6 6 14.4h8.4V24ZM17.6 24V14.4q0-7.2 4.2-10.8Q26 0 32 0v4.8q-3.6 0-6 2.4-2.4 2.4-2.4 7.2h8.4V24Z"
              fill="currentColor"
            />
          </svg>
          <p className="mt-6 font-serif text-2xl leading-snug text-cream sm:text-3xl">
            We timed our whole trip around this one, and it was worth it — walking beneath blossoms
            with Rakaposhi behind them is something photographs never quite capture.
          </p>
          <p className="mt-5 text-sm uppercase tracking-[0.14em] text-cream/50">— A guest from Lahore</p>
        </div>
      </section>

      {/* ---------------- Closing CTA ---------------- */}
      <section className="relative w-full overflow-hidden bg-cream py-16 text-center sm:py-20">
        <div className="mx-auto w-full max-w-2xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto mb-5 flex w-fit items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              <span className="h-px w-8 bg-muted/60" />
              Limited spring dates
              <span className="h-px w-8 bg-muted/60" />
            </div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-forest sm:text-4xl">
              Ready to see Hunza in bloom?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              The bloom window is short and group size is capped at twelve — reserve your place before
              the season fills.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <LinkButton href="/#contact" variant="primary" className="group gap-2">
                Reserve Your Spot
                <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                  <ArrowIcon size={14} />
                </span>
              </LinkButton>
              <LinkButton href="/tours" variant="dark">
                See All Tours &amp; Events
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
