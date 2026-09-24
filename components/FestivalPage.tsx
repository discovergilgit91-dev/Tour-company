"use client";

import { useState } from "react";
import { LinkButton } from "./ui/Button";
import { ArrowIcon, CalendarIcon } from "./ui/icons";
import { useRevealOnScroll } from "./DestinationCard";

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
  { name: "Shina", tagline: "Grace in Every Step", from: "from-rose-400/70", to: "to-forest" },
  { name: "Balti", tagline: "Strength in Unity", from: "from-teal-400/70", to: "to-forest" },
  { name: "Burushaski", tagline: "Roots in the Mountains", from: "from-orange-400/70", to: "to-forest" },
  { name: "Wakhi", tagline: "Pride in Simplicity", from: "from-purple-400/70", to: "to-forest" },
  { name: "Khowar", tagline: "Spirit of the Valleys", from: "from-amber-400/70", to: "to-forest" },
];

const MORE_HIGHLIGHTS = [
  {
    icon: MusicIcon,
    title: "Live Cultural Performances",
    description: "Music, dance, and traditional arts from across the region.",
  },
  {
    icon: CuisineIcon,
    title: "Authentic Local Food",
    description: "Taste the flavors of Gilgit-Baltistan in one place.",
  },
  {
    icon: HandicraftIcon,
    title: "Handicrafts & Artisan Market",
    description: "Support local artisans and take home a piece of heritage.",
  },
  {
    icon: ExhibitionIcon,
    title: "Cultural Exhibitions",
    description: "Explore the history, lifestyle, and traditions of our communities.",
  },
];

const GALLERY_TILES = [
  { from: "from-green-dark", to: "to-night" },
  { from: "from-forest", to: "to-night" },
  { from: "from-green-dark", to: "to-forest" },
  { from: "from-night", to: "to-forest" },
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
    <div className="rounded-[22px] border border-cream/10 bg-night p-6">
      <dl className="space-y-5">
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">Event Dates</dt>
          <dd className="mt-1.5 font-serif text-lg text-cream">12 Aug – 14 Aug, 2027</dd>
          <dd className="mt-0.5 text-xs text-cream/50">3 Days of Culture, Music &amp; Celebration</dd>
        </div>
        <div className="border-t border-cream/10 pt-5">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">Location</dt>
          <dd className="mt-1.5 font-serif text-lg text-cream">Gilgit City</dd>
          <dd className="mt-0.5 text-xs text-cream/50">Gilgit-Baltistan, Pakistan</dd>
        </div>
        <div className="border-t border-cream/10 pt-5">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">Organized By</dt>
          <dd className="mt-1.5 font-serif text-lg text-cream">Gilgit-Baltistan Cultural Council</dd>
          <dd className="mt-0.5 text-xs text-cream/50">Preserving Heritage, Inspiring Unity</dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={handleAddToCalendar}
        className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-forest transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-6px_rgba(201,161,90,0.5)] active:translate-y-0 active:scale-[0.97]"
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
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonial = TESTIMONIALS[testimonialIndex];

  function changeTestimonial(delta: number) {
    setTestimonialIndex((i) => (i + delta + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

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

              <div className="mt-8 grid grid-cols-4 gap-4 lg:grid-cols-2">
                {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                  <div key={label} className="text-forest/70">
                    <Icon size={22} />
                    <p className="mt-2 text-[11px] font-semibold uppercase leading-snug tracking-[0.06em] text-muted">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

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
                    <p className="mt-0.5 text-xs text-muted">{culture.tagline}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- More Than a Festival ---------------- */}
      <section className="relative w-full overflow-hidden bg-night py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr_320px] lg:gap-12">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-gradient-to-br from-green-dark to-night lg:aspect-auto lg:h-full">
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
            </Reveal>

            <Reveal delay={180}>
              <div className="space-y-6">
                {MORE_HIGHLIGHTS.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex items-start gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream/[0.06] text-gold">
                      <Icon size={18} />
                    </span>
                    <div>
                      <h3 className="font-serif text-base text-cream">{title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-cream/55">{description}</p>
                    </div>
                  </div>
                ))}

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
              <LinkButton href="/#contact" variant="dark" className="group gap-2 text-[11px] uppercase tracking-[0.12em]">
                View All Photos
                <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                  <ArrowIcon size={13} />
                </span>
              </LinkButton>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:mt-12">
            {GALLERY_TILES.map((tile, index) => (
              <Reveal key={index} delay={index * 90}>
                <div
                  className={`relative aspect-square overflow-hidden rounded-[18px] bg-gradient-to-br ${tile.from} ${tile.to}`}
                >
                  <SunMotif className="absolute inset-0 h-full w-full p-8 text-cream/15" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Testimonial ---------------- */}
      <section className="relative w-full overflow-hidden bg-forest py-20 sm:py-24 lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-gold/10 blur-3xl"
        />
        <div className="relative mx-auto w-full max-w-3xl px-5 text-center sm:px-6 lg:px-8">
          <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="mx-auto text-gold/60" aria-hidden="true">
            <path
              d="M0 24V14.4Q0 7.2 4.2 3.6 8.4 0 14.4 0v4.8Q10.8 4.8 8.4 7.2 6 9.6 6 14.4h8.4V24ZM17.6 24V14.4q0-7.2 4.2-10.8Q26 0 32 0v4.8q-3.6 0-6 2.4-2.4 2.4-2.4 7.2h8.4V24Z"
              fill="currentColor"
            />
          </svg>

          <p className="mt-6 font-serif text-2xl leading-snug text-cream sm:text-3xl">{testimonial.quote}</p>
          <p className="mt-5 text-sm uppercase tracking-[0.14em] text-cream/50">— {testimonial.author}</p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => changeTestimonial(-1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors duration-300 hover:bg-cream hover:text-forest"
            >
              <span className="rotate-180">
                <ArrowIcon size={16} />
              </span>
            </button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.author}
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => setTestimonialIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                    i === testimonialIndex ? "w-6 bg-gold" : "w-1.5 bg-cream/30 hover:bg-cream/60"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => changeTestimonial(1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-forest transition-colors duration-300 hover:bg-green hover:text-white"
            >
              <ArrowIcon size={16} />
            </button>
          </div>
        </div>
      </section>

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
              <LinkButton href="/#contact" variant="dark">
                Contact Us
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
