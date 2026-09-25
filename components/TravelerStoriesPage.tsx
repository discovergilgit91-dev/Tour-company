"use client";

import Image from "next/image";
import { LinkButton } from "./ui/Button";
import { ArrowIcon } from "./ui/icons";
import { PeaksMotif } from "./tours/motifs";
import { useRevealOnScroll } from "./DestinationCard";

/* ---------------------------------------------------------------------
   Dedicated "Traveler Stories" page — the destination for every "Read
   More Stories" link (see PlanYourTripPage.tsx). A fuller, premium
   version of the same review-card idea: each story pairs a real trip
   photo with the traveler's own words, name, and rating.
   --------------------------------------------------------------------- */

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

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 20 20"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.2"
          className="text-gold"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.8l-5.2 2.7 1-5.8L1.6 7.6l5.8-.8L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

const STORIES = [
  {
    name: "Sarah Khan",
    location: "Lahore, Pakistan",
    region: "Hunza Valley",
    quote:
      "The entire trip was beyond our expectations. The guides were amazing and Gilgit-Baltistan is truly magical!",
    rating: 5,
    photo: "/Images/tours/hunza-spring.jpg",
    avatar: "/Images/avatars/sarah-khan.jpg",
  },
  {
    name: "Ali Raza",
    location: "Karachi, Pakistan",
    region: "Rakaposhi Trek",
    quote: "Well planned, safe and incredibly beautiful. Every day felt like a new adventure.",
    rating: 5,
    photo: "/Images/tours/rakaposhi-trek.jpg",
    avatar: "/Images/avatars/ali-raza.jpg",
  },
  {
    name: "Ayesha Malik",
    location: "Islamabad, Pakistan",
    region: "Altit & Baltit Forts",
    quote: "I've travelled a lot, but this was special. The local culture, food and landscapes are unforgettable!",
    rating: 5,
    photo: "/Images/tours/altit-baltit.jpg",
    avatar: "/Images/avatars/ayesha-malik.jpg",
  },
  {
    name: "Ayesha Khan",
    location: "Lahore, Pakistan",
    region: "Hunza Valley",
    quote:
      "Our guide knew every turn of the Hunza road by heart. It felt less like a tour and more like visiting family in the mountains.",
    rating: 5,
    photo: "/Images/tours/hunza-valley.png",
    avatar: "/Images/avatars/ayesha-khan.jpg",
  },
  {
    name: "Daniel Reyes",
    location: "Madrid, Spain",
    region: "Fairy Meadows",
    quote:
      "Fairy Meadows at sunrise, arranged down to the last detail. The most well-run trip I've taken anywhere in the world.",
    rating: 5,
    photo: "/Images/tours/Fairy-meadows.png",
    avatar: "/Images/avatars/daniel-reyes.jpg",
  },
  {
    name: "Meera Nair",
    location: "Bengaluru, India",
    region: "Deosai Plains",
    quote: "Deosai felt endless in the best way. Small group, unhurried pace, and a team that clearly loves this land.",
    rating: 4,
    photo: "/Images/tours/deosai-plains.png",
    avatar: "/Images/avatars/meera-nair.jpg",
  },
];

export default function TravelerStoriesPage() {
  return (
    <main className="bg-cream">
      {/* ---------------- Intro band ---------------- */}
      <section className="relative overflow-hidden bg-forest">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="h-full w-full bg-gradient-to-br from-forest/60 via-forest to-night" />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 top-10 h-[380px] w-[380px] rounded-full bg-gold/10 blur-3xl"
          />
          <PeaksMotif className="absolute inset-x-0 bottom-0 h-[55%] w-full text-cream/[0.05]" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-forest/20" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-14 pt-28 text-center sm:px-6 sm:pb-16 sm:pt-32 lg:px-8 lg:pt-36">
          <span className="mb-7 inline-flex items-center gap-2 rounded-full bg-cream/95 px-4 py-1.5 text-[10px] font-semibold tracking-wide text-green sm:text-xs">
            TRAVELER STORIES
          </span>

          <h1 className="mx-auto max-w-2xl font-serif text-[30px] font-semibold leading-[1.12] tracking-tight text-cream sm:text-5xl">
            Real trips. <span className="heading-accent">Real stories.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-[13.5px] leading-relaxed text-cream/85 sm:text-base md:text-lg">
            Honest words from the people who&rsquo;ve walked these valleys with us — no scripts, no stock
            reviews, just what they told us afterward.
          </p>
        </div>
      </section>

      {/* ---------------- Story cards ---------------- */}
      <section className="relative w-full bg-cream py-14 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {STORIES.map((story, index) => (
              <Reveal key={story.name} delay={(index % 6) * 70}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_2px_18px_rgba(18,36,28,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_22px_44px_-18px_rgba(18,36,28,0.22)]">
                  <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
                    <Image
                      src={story.photo}
                      alt={story.region}
                      fill
                      quality={85}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                    <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/25 bg-night/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-cream backdrop-blur-sm">
                      {story.region}
                    </span>
                  </div>

                  <div className="relative flex flex-1 flex-col px-6 pb-6 pt-9">
                    <div className="absolute -top-7 left-6 h-14 w-14 overflow-hidden rounded-full border-4 border-white shadow-[0_4px_14px_rgba(18,36,28,0.18)]">
                      <Image src={story.avatar} alt={story.name} fill sizes="56px" className="object-cover" />
                    </div>

                    <p className="flex-1 text-sm leading-relaxed text-forest/80">&ldquo;{story.quote}&rdquo;</p>

                    <div className="mt-6 border-t border-forest/10 pt-5">
                      <p className="font-serif text-sm text-forest">{story.name}</p>
                      <p className="text-xs text-muted">{story.location}</p>
                      <div className="mt-2.5">
                        <StarRow rating={story.rating} />
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Closing CTA ---------------- */}
      <section className="relative w-full overflow-hidden bg-forest py-16 text-center sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-0 h-[340px] w-[340px] rounded-full bg-gold/10 blur-3xl"
        />
        <div className="relative mx-auto w-full max-w-2xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto mb-5 flex w-fit items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/50">
              <span className="h-px w-8 bg-cream/30" />
              Your turn
              <span className="h-px w-8 bg-cream/30" />
            </div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-cream sm:text-4xl">
              Ready to write your <span className="heading-accent">own story?</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-cream/70 sm:text-base">
              Tell us what you&rsquo;re dreaming of and a local trip planner will shape the rest around you.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <LinkButton href="/plan-your-trip" variant="outline" className="group gap-2">
                Plan Your Trip
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
