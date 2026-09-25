"use client";

import { useRevealOnScroll } from "./DestinationCard";

/* ---------------------------------------------------------------------
   Reusable "Complete Experience" section — dropped into both tour and
   event detail pages (see TourDetailPage.tsx / FestivalPage.tsx) so the
   six-service promise stays identical and in one place instead of being
   copy-pasted per page. Self-contained: its own icons and mountain
   motif, no props required.
   --------------------------------------------------------------------- */

function TransportIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 16V9.5a2 2 0 0 1 1.6-2L8 7l1.3-2.2A2 2 0 0 1 11 4h4.4a2 2 0 0 1 1.8 1.1L18.5 7l2.4.5A2 2 0 0 1 22.5 9.5V16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 16h18.5v2a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-.5H8v.5A1.5 1.5 0 0 1 6.5 19.5h-1A1.5 1.5 0 0 1 4 18v-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="7.5" cy="16" r="1.6" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="18.5" cy="16" r="1.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 11h18.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function StayIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3.5 19V6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M3.5 13.5h16a1.5 1.5 0 0 1 1.5 1.5v4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 13.5V10a2 2 0 0 1 2-2h5.5a2 2 0 0 1 2 2v3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="9" r="1.2" fill="currentColor" />
    </svg>
  );
}

function FoodIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3v7a2 2 0 0 0 2 2v9M7 3v7M9 3v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 3c-1.5 1.5-1.5 5 0 7v11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GuideIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 6.5 14 12 12 17.5 10 12 12 6.5Z" fill="currentColor" />
      <circle cx="12" cy="12" r="1" className="fill-forest" />
    </svg>
  );
}

function ActivitiesIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 19 9 8l3.5 5.5L15 10l6 9H3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="17.5" cy="6.5" r="2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function SupportIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5 19 6.3v5.4c0 4.6-3 7.9-7 9.3-4-1.4-7-4.7-7-9.3V6.3L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="m8.7 12.2 2.2 2.2 4.4-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Faint banner mountain silhouette, matching the line-art style already used across tour/event hero backgrounds. */
function MountainBanner({ className = "" }: { className?: string }) {
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

const SERVICES = [
  {
    Icon: TransportIcon,
    title: "Transportation",
    description: "Private transfers and 4x4s for every mountain road, door to door.",
  },
  {
    Icon: StayIcon,
    title: "Stay",
    description: "Handpicked guesthouses and heritage stays at every altitude.",
  },
  {
    Icon: FoodIcon,
    title: "Local Food",
    description: "Fresh, home-style meals rooted in Gilgit-Baltistan's own kitchens.",
  },
  {
    Icon: GuideIcon,
    title: "Guided Experiences",
    description: "Local guides who know every valley, pass, and story worth telling.",
  },
  {
    Icon: ActivitiesIcon,
    title: "Activities",
    description: "Treks, safaris, and cultural visits, paced around your group.",
  },
  {
    Icon: SupportIcon,
    title: "Complete Support",
    description: "One team, one point of contact, from booking to the final drive home.",
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

export default function CompleteExperience() {
  return (
    <section className="relative w-full overflow-hidden border-b border-cream/10 bg-forest py-16 sm:py-20 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 top-0 h-[360px] w-[360px] rounded-full bg-gold/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-[300px] w-[300px] rounded-full bg-green/10 blur-3xl"
      />
      <MountainBanner className="absolute inset-x-0 bottom-0 h-[40%] w-full text-cream/[0.04]" />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-5 flex w-fit items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/50">
              <span className="h-px w-8 bg-cream/30" />
              Complete experience
              <span className="h-px w-8 bg-cream/30" />
            </div>
            <h2 className="font-serif text-3xl leading-[1.12] tracking-tight text-cream sm:text-4xl lg:text-[44px]">
              Everything You Need.
              <br />
              <span className="heading-accent">One Trusted Team.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-cream/65 sm:text-base">
              From the moment you land to the moment you leave, every detail is planned, guided, and looked
              after by people who call these mountains home.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-14 lg:grid-cols-6">
          {SERVICES.map(({ Icon, title, description }, index) => (
            <Reveal key={title} delay={(index % 6) * 70}>
              <div className="group flex h-full flex-col items-center rounded-[18px] border border-cream/10 bg-cream/[0.04] p-5 text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gold/30 hover:bg-cream/[0.06] hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.4)]">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-forest">
                  <Icon size={21} />
                </span>
                <h3 className="mt-4 font-serif text-[15px] leading-snug text-cream sm:text-base">{title}</h3>
                <p className="mt-2 min-h-[52px] text-xs leading-relaxed text-cream/60 sm:text-[13px]">
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
