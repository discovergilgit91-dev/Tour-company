"use client";

import { LinkButton } from "./ui/Button";
import { ArrowIcon, CalendarIcon } from "./ui/icons";
import { useRevealOnScroll } from "./DestinationCard";
import CompleteExperience from "./CompleteExperience";
import TestimonialSection from "./TestimonialSection";

/* ---------------------------------------------------------------------
   Small line-icons in the established stroke style, specific to this page.
   --------------------------------------------------------------------- */
function MusicIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 17V5.8l10-2v10.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6.5" cy="17.5" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.5" cy="15.5" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function CuisineIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3v7a2 2 0 0 0 2 2v9M7 3v7M9 3v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 3c-1.5 1.5-1.5 5 0 7v11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HandicraftIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ExhibitionIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 15l3-3.5 2.5 2.5 3-4L19 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8" cy="8.5" r="1" fill="currentColor" />
    </svg>
  );
}

const HIGHLIGHTS = [
  { icon: MusicIcon, label: "Traditional Music & Dance" },
  { icon: CuisineIcon, label: "Local Cuisine" },
  { icon: HandicraftIcon, label: "Handicrafts & Artisans" },
  { icon: ExhibitionIcon, label: "Cultural Exhibitions" },
];

const CULTURES = [
  {
    name: "Shina",
    tagline: "Grace in Every Step",
    fact: "The most widely spoken language across Gilgit-Baltistan.",
    from: "from-rose-400/70",
    to: "to-forest",
  },
  {
    name: "Balti",
    tagline: "Strength in Unity",
    fact: "Rooted in Tibetan heritage, spoken throughout Baltistan.",
    from: "from-teal-400/70",
    to: "to-forest",
  },
  {
    name: "Burushaski",
    tagline: "Roots in the Mountains",
    fact: "A language isolate found nowhere else on Earth.",
    from: "from-orange-400/70",
    to: "to-forest",
  },
  {
    name: "Wakhi",
    tagline: "Pride in Simplicity",
    fact: "Spoken in the high valleys along the Pamir corridor.",
    from: "from-purple-400/70",
    to: "to-forest",
  },
  {
    name: "Khowar",
    tagline: "Spirit of the Valleys",
    fact: "The voice of Chitral and the region's western valleys.",
    from: "from-amber-400/70",
    to: "to-forest",
  },
];

const CULTURE_STATS = [
  { value: "5", label: "Languages celebrated" },
  { value: "100+", label: "Years of tradition" },
  { value: "3", label: "Days of festivities" },
  { value: "1", label: "Shared home" },
];

const FESTIVAL_STATS = [
  { value: "2015", label: "Festival established" },
  { value: "15K+", label: "Visitors each year" },
  { value: "5", label: "Communities represented" },
];

const MORE_HIGHLIGHTS = [
  { icon: MusicIcon, title: "Live Cultural Performances" },
  { icon: CuisineIcon, title: "Authentic Local Food" },
  { icon: HandicraftIcon, title: "Handicrafts & Artisan Market" },
  { icon: ExhibitionIcon, title: "Cultural Exhibitions" },
];

const GALLERY_TILES = [
  { caption: "Traditional Dance", from: "from-rose-400/40", to: "to-night" },
  { caption: "Local Cuisine", from: "from-teal-400/40", to: "to-night" },
  { caption: "Handicrafts Market", from: "from-orange-400/40", to: "to-forest" },
  { caption: "Community Spirit", from: "from-purple-400/40", to: "to-forest" },
];

const TESTIMONIALS = [
  {
    quote:
      "The Gilgit-Baltistan Cultural Festival is a beautiful reminder of how diverse and united our region is.",
    author: "A visitor from Islamabad",
  },
  {
    quote:
      "I have never seen so many traditions celebrated together, with so much warmth. It felt like the whole region opened its doors.",
    author: "A visitor from Lahore",
  },
  {
    quote: "The music alone was worth the trip — and then came the food, the crafts, the stories. Unforgettable.",
    author: "A visitor from Karachi",
  },
];

function SunMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="14" fill="none" stroke="currentColor" strokeWidth="1.4" />
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x1 = 50 + Math.cos(angle) * 20;
        const y1 = 50 + Math.sin(angle) * 20;
        const x2 = 50 + Math.cos(angle) * 34;
        const y2 = 50 + Math.sin(angle) * 34;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.4" />;
      })}
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

function EventDetailsCard() {
  function handleAddToCalendar() {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Discover Gilgit//Cultural Festival//EN",
      "BEGIN:VEVENT",
      "UID:gilgit-cultural-festival-2027@discovergilgit.com",
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
      "DTSTART;VALUE=DATE:20270812",
      "DTEND;VALUE=DATE:20270815",
      "SUMMARY:Gilgit-Baltistan Cultural Festival",
      "LOCATION:Gilgit City, Gilgit-Baltistan, Pakistan",
      "DESCRIPTION:Immerse yourself in the vibrant culture, music, and traditional food of Gilgit-Baltistan — a celebration of our heritage and community spirit.",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "gilgit-cultural-festival.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="rounded-[22px] border border-cream/10 bg-night p-5">
      <dl className="space-y-4">
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">Event Dates</dt>
          <dd className="mt-1 font-serif text-lg text-cream">12 Aug – 14 Aug, 2027</dd>
          <dd className="mt-0.5 text-xs text-cream/50">3 Days of Culture, Music &amp; Celebration</dd>
        </div>
        <div className="border-t border-cream/10 pt-4">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">Location</dt>
          <dd className="mt-1 font-serif text-lg text-cream">Gilgit City</dd>
          <dd className="mt-0.5 text-xs text-cream/50">Gilgit-Baltistan, Pakistan</dd>
        </div>
        <div className="border-t border-cream/10 pt-4">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">Organized By</dt>
          <dd className="mt-1 font-serif text-lg text-cream">Gilgit-Baltistan Cultural Council</dd>
          <dd className="mt-0.5 text-xs text-cream/50">Preserving Heritage, Inspiring Unity</dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={handleAddToCalendar}
        className="group mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-forest transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-6px_rgba(201,161,90,0.5)] active:translate-y-0 active:scale-[0.97]"
      >
        <CalendarIcon size={16} />
        Add to Calendar
        <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
          <ArrowIcon size={14} />
        </span>
      </button>
    </div>
  );
}

export default function FestivalPage() {
  return (
    <main className="bg-cream">
      {/* ---------------- Five Cultures, One Celebration ---------------- */}
      <section className="relative w-full overflow-hidden bg-cream pb-16 pt-14 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-14">
            <Reveal>
              <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                <span className="h-px w-8 bg-muted/60" />
                The highlights
              </div>
              <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-forest">
                Five Cultures
                <br />
                <span className="text-green">One Celebration</span>
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                Experience the rich traditions of Shina, Balti, Burushaski, Wakhi and Khowar — each with its own
                language, dress, dance and way of life.
              </p>

              <div className="mt-8 space-y-4">
                {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest/[0.06] text-forest">
                      <Icon size={19} />
                    </span>
                    <p className="text-[11px] font-semibold uppercase leading-snug tracking-[0.1em] text-muted">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {CULTURES.map((culture, index) => (
                  <Reveal key={culture.name} delay={index * 90}>
                    <div className="group">
                      <div
                        className={`relative aspect-[3/4] overflow-hidden rounded-[18px] bg-gradient-to-br ${culture.from} ${culture.to} transition-transform duration-500 ease-out group-hover:scale-[1.03]`}
                      >
                        <SunMotif className="absolute inset-0 h-full w-full p-6 text-cream/25" />
                      </div>
                      <h3 className="mt-3 font-serif text-lg text-forest">{culture.name}</h3>
                      <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.06em] text-green">
                        {culture.tagline}
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted">{culture.fact}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={200}>
                <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 rounded-[22px] border border-forest/10 bg-white p-6 sm:grid-cols-4 sm:p-7">
                  {CULTURE_STATS.map((stat) => (
                    <div key={stat.label}>
                      <p className="font-serif text-3xl text-forest sm:text-4xl">{stat.value}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.08em] text-muted">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- More Than a Festival ---------------- */}
      <section className="relative w-full overflow-hidden bg-night py-14 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr_320px] lg:gap-12">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] border border-cream/10 bg-gradient-to-br from-green-dark to-night shadow-[0_24px_60px_-24px_rgba(0,0,0,0.5)] lg:aspect-auto lg:h-full">
                <svg
                  viewBox="0 0 500 600"
                  preserveAspectRatio="xMidYMid slice"
                  className="h-full w-full text-cream/[0.06]"
                  aria-hidden="true"
                >
                  <path
                    d="M-40 480 60 340l60 80 70-120 70 110 60-60 100 140 90-80 130 150"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M-40 540 80 400l70 90 80-130 80 120 70-70 110 150 100-90 140 160"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                <SunMotif className="absolute inset-0 h-full w-full p-16 text-gold/10" />
                <span className="absolute left-5 top-5 inline-flex items-center rounded-full border border-cream/15 bg-night/60 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-cream/70 backdrop-blur-sm">
                  Photo coming soon
                </span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/50">
                <span className="h-px w-8 bg-cream/30" />
                About the festival
              </div>
              <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-cream sm:text-4xl">
                More Than a Festival
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-cream/65">
                The Gilgit-Baltistan Cultural Festival is not just an event, it&rsquo;s a heartfelt celebration of
                our people, their stories, traditions, and resilient spirit. It brings together local communities,
                artists, and visitors to promote cultural exchange and preserve our unique heritage for generations
                to come.
              </p>
              <LinkButton href="/#contact" variant="outline" className="group mt-6 w-fit gap-2">
                Discover the Story
                <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                  <ArrowIcon size={14} />
                </span>
              </LinkButton>

              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-5 border-t border-cream/10 pt-6">
                {FESTIVAL_STATS.map((stat) => (
                  <div key={stat.label} className="min-w-[90px] shrink-0 grow">
                    <p className="whitespace-nowrap font-serif text-3xl text-gold sm:text-4xl">{stat.value}</p>
                    <p className="mt-1.5 text-xs leading-snug text-cream/50">{stat.label}</p>
                  </div>
                ))}
              </div>

              <blockquote className="mt-6 border-l-2 border-gold/40 pl-5">
                <p className="font-serif text-base italic leading-relaxed text-cream/80">
                  &ldquo;Every language sung, every dish shared, every dance performed — it all says the same
                  thing: we belong to each other.&rdquo;
                </p>
                <cite className="mt-2 block text-xs not-italic uppercase tracking-[0.1em] text-cream/40">
                  Festival Organizing Committee
                </cite>
              </blockquote>
            </Reveal>

            <Reveal delay={180}>
              <div className="space-y-3">
                {MORE_HIGHLIGHTS.map(({ icon: Icon, title }) => (
                  <div key={title} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream/[0.06] text-gold">
                      <Icon size={16} />
                    </span>
                    <h3 className="font-serif text-sm leading-snug text-cream">{title}</h3>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <EventDetailsCard />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Festival Gallery ---------------- */}
      <section className="relative w-full overflow-hidden bg-cream py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                  <span className="h-px w-8 bg-muted/60" />
                  Festival gallery
                </div>
                <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-forest">
                  Moments, colors <span className="text-green">and culture</span>
                </h2>
              </div>
              <LinkButton
                href="/tours/gilgit-cultural-festival/gallery"
                variant="dark"
                className="group gap-2 text-[11px] uppercase tracking-[0.12em]"
              >
                View All Photos
                <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                  <ArrowIcon size={13} />
                </span>
              </LinkButton>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:mt-12">
            {GALLERY_TILES.map((tile, index) => (
              <Reveal key={tile.caption} delay={index * 90}>
                <div className="group relative aspect-square overflow-hidden rounded-[18px]">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${tile.from} ${tile.to} transition-transform duration-500 ease-out group-hover:scale-[1.06]`}
                  >
                    <SunMotif className="absolute inset-0 h-full w-full p-8 text-cream/15" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent" />
                  <span className="absolute inset-x-4 bottom-4 text-[10px] font-semibold uppercase tracking-[0.1em] text-cream/85">
                    {tile.caption}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CompleteExperience />

      {/* ---------------- Testimonial ---------------- */}
      <TestimonialSection testimonials={TESTIMONIALS} eyebrow="What visitors say" />

      {/* ---------------- Closing CTA ---------------- */}
      <section className="relative w-full overflow-hidden bg-cream py-16 text-center sm:py-20">
        <div className="mx-auto w-full max-w-2xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto mb-5 flex w-fit items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              <span className="h-px w-8 bg-muted/60" />
              Join us
              <span className="h-px w-8 bg-muted/60" />
            </div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-forest sm:text-4xl">
              Be part of the celebration
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              Plan your trip around the festival and experience the culture of Gilgit-Baltistan first-hand.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <LinkButton href="/tours" variant="primary" className="group gap-2">
                See All Tours &amp; Events
                <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                  <ArrowIcon size={14} />
                </span>
              </LinkButton>
              <LinkButton href="/plan-your-trip" variant="dark">
                Plan Your Trip
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
