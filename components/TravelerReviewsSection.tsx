"use client";

import Image from "next/image";
import { LinkButton } from "./ui/Button";
import { ArrowIcon } from "./ui/icons";
import { useRevealOnScroll } from "./DestinationCard";

/* ---------------------------------------------------------------------
   Reusable "traveler stories" review grid — a photo/quote/star card with
   a circular avatar badge overlapping the top edge. Shared between the
   homepage and the Plan Your Trip page (see TravelerStoriesPage.tsx for
   the fuller, photo-backed version used on its own dedicated page).
   --------------------------------------------------------------------- */

export type Review = {
  name: string;
  location: string;
  quote: string;
  rating: number;
  avatar: string;
};

export const DEFAULT_REVIEWS: Review[] = [
  {
    name: "Sarah Khan",
    location: "Lahore, Pakistan",
    quote:
      "The entire trip was beyond our expectations. The guides were amazing and Gilgit-Baltistan is truly magical!",
    rating: 5,
    avatar: "/Images/avatars/sarah-khan.jpg",
  },
  {
    name: "Ali Raza",
    location: "Karachi, Pakistan",
    quote: "Well planned, safe and incredibly beautiful. Every day felt like a new adventure.",
    rating: 5,
    avatar: "/Images/avatars/ali-raza.jpg",
  },
  {
    name: "Ayesha Malik",
    location: "Islamabad, Pakistan",
    quote: "I've travelled a lot, but this was special. The local culture, food and landscapes are unforgettable!",
    rating: 5,
    avatar: "/Images/avatars/ayesha-malik.jpg",
  },
];

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

export default function TravelerReviewsSection({
  id,
  eyebrow = "Traveler stories",
  heading = "What Our Travelers Say",
  subtitle = "Real people. Real experiences. Hear how our journeys have made a difference.",
  ctaLabel = "Read More Stories",
  ctaHref = "/traveler-stories",
  reviews,
}: {
  id?: string;
  eyebrow?: string;
  heading?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  reviews: Review[];
}) {
  return (
    <section id={id} className="relative overflow-hidden bg-cream pb-20 pt-16 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-xl">
            <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              <span className="h-px w-8 bg-muted/60" />
              {eyebrow}
            </div>
            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-forest sm:text-5xl">{heading}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{subtitle}</p>
            <LinkButton href={ctaHref} variant="primary" className="group mt-7 gap-2">
              {ctaLabel}
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                <ArrowIcon size={14} />
              </span>
            </LinkButton>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal key={review.name} delay={index * 90}>
              <article className="relative mt-8 flex h-full flex-col rounded-[22px] bg-white p-6 pt-12 shadow-[0_2px_18px_rgba(18,36,28,0.06)]">
                <div className="absolute -top-8 left-6 h-16 w-16 overflow-hidden rounded-full border-4 border-cream shadow-[0_4px_14px_rgba(18,36,28,0.15)]">
                  <Image src={review.avatar} alt={review.name} fill sizes="64px" className="object-cover" />
                </div>

                <p className="flex-1 text-sm leading-relaxed text-forest/80">&ldquo;{review.quote}&rdquo;</p>

                <div className="mt-6 border-t border-forest/10 pt-5">
                  <p className="font-serif text-sm text-forest">{review.name}</p>
                  <p className="text-xs text-muted">{review.location}</p>
                  <div className="mt-2.5">
                    <StarRow rating={review.rating} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
