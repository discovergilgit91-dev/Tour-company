"use client";

import { useMemo, useState } from "react";
import { LinkButton } from "./ui/Button";
import {
  ArrowIcon,
  CheckIcon,
  ClockIcon,
  CompassIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "./ui/icons";
import { PeaksMotif } from "./tours/motifs";
import { useRevealOnScroll } from "./DestinationCard";
import TravelerReviewsSection, { DEFAULT_REVIEWS } from "./TravelerReviewsSection";

/* ---------------------------------------------------------------------
   "Plan Your Trip" — a dedicated start-here page for people who don't
   yet know which tour they want, reached from every "Plan your journey"
   CTA on the site. Distinct from /book (which reserves one specific,
   already-chosen tour): this page is the discovery step before that —
   a rich trip-planning form plus a short "how it works" walkthrough.
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

/* ---- small interest-chip icons, same line-art stroke style used everywhere else ---- */
function TrekIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2.5 19 8 8l3 5.5L13.5 10l8 9H2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M17 6.5 18.4 4l1.4 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CultureIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20V11M9 20V11M15 20V11M20 20V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2.5 11 12 4l9.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 20h19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PhotoIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3.5 8a1.5 1.5 0 0 1 1.5-1.5h2l1.2-2h7.6l1.2 2H19a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 19 18.5H5A1.5 1.5 0 0 1 3.5 17V8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12.5" r="3.4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function FamilyIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="8.5" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="9" r="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 19c0-3 2.4-5.3 5.5-5.3S14 16 14 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14.3 14.2c2 .2 3.7 1.9 3.7 4.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function HoneymoonIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 20.5 3.9 12.7a4.6 4.6 0 0 1 0-6.6 4.8 4.8 0 0 1 6.7 0L12 7.4l1.4-1.3a4.8 4.8 0 0 1 6.7 0 4.6 4.6 0 0 1 0 6.6L12 20.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AdventureIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5c4 1.8 7 3.5 7 7.5 0 1.4-.4 2.4-1 3.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 3.5c-4 1.8-7 3.5-7 7.5 0 5 4 8 7 9.5 3-1.5 7-4.5 7-9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9.5 12 11 13.6l3.2-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CuisineIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.5 3v6.2a1.8 1.8 0 0 0 1.8 1.8V21M6.5 3v7M8.3 3v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.5 3c-1.3 1.3-1.3 4.5 0 6.3V21" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WildlifeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <ellipse cx="12" cy="16" rx="4.2" ry="3.4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6.3" cy="9.5" r="1.7" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="10.2" cy="6.2" r="1.7" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="14.8" cy="6.2" r="1.7" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="18.2" cy="9.8" r="1.7" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function QuestionIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9.3 9.4a2.7 2.7 0 1 1 3.9 2.4c-1 .5-1.2 1-1.2 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="17" r="0.9" className="fill-current" stroke="none" />
    </svg>
  );
}

const INTERESTS = [
  { id: "trek", label: "Trekking & Hiking", Icon: TrekIcon },
  { id: "culture", label: "Cultural Heritage", Icon: CultureIcon },
  { id: "photo", label: "Photography", Icon: PhotoIcon },
  { id: "family", label: "Family Trip", Icon: FamilyIcon },
  { id: "honeymoon", label: "Honeymoon", Icon: HoneymoonIcon },
  { id: "adventure", label: "Adventure Sports", Icon: AdventureIcon },
  { id: "food", label: "Food & Cuisine", Icon: CuisineIcon },
  { id: "wildlife", label: "Wildlife & Nature", Icon: WildlifeIcon },
  { id: "unsure", label: "Not Sure Yet", Icon: QuestionIcon },
];

const DESTINATIONS = [
  "Hunza Valley",
  "Skardu",
  "Deosai Plains",
  "Gilgit City",
  "Naltar Valley",
  "Fairy Meadows",
  "Khunjerab Pass",
  "Naran & Babusar",
];

const GROUP_SIZES = ["Solo traveller", "Couple", "Family (3–5)", "Group (6+)"];
const BUDGETS = ["Under $500", "$500 – $1,000", "$1,000 – $2,000", "$2,000+", "Not sure yet"];
const DURATIONS = ["Weekend (2–3 days)", "4–7 days", "8–14 days", "2+ weeks"];

const HOW_IT_WORKS = [
  {
    title: "Share your dream trip",
    description: "Tell us what you love, when you're free, and how many are coming along.",
  },
  {
    title: "A local expert reviews it",
    description: "Someone who actually knows the valleys studies your answers personally.",
  },
  {
    title: "Get a custom itinerary",
    description: "A tailored plan and price lands in your inbox within one working day.",
  },
  {
    title: "Travel with confidence",
    description: "Adjust anything you like, then set off with a local team behind you.",
  },
];

const TRUST_POINTS = [
  {
    Icon: ShieldCheckIcon,
    title: "No obligation",
    description: "This is a planning request, not a booking — nothing is charged until you say go.",
  },
  {
    Icon: ClockIcon,
    title: "Fast, human replies",
    description: "A real local trip planner reviews every request, usually within one working day.",
  },
  {
    Icon: UsersIcon,
    title: "Built around you",
    description: "Every itinerary is shaped by your interests, pace, and budget — nothing off the shelf.",
  },
];

const CONTACT_DETAILS = [
  { label: "Email", value: "hello@discovergilgit.com", Icon: MailIcon },
  { label: "Phone", value: "+92 355 123 4567", Icon: PhoneIcon },
  { label: "Office", value: "Jutial Road, Gilgit, Gilgit-Baltistan", Icon: PinIcon },
];

const FIELD_CLASS =
  "w-full rounded-xl border border-forest/12 bg-white px-4 py-3 font-sans text-sm text-forest placeholder:text-muted/50 outline-none transition-colors focus:border-green/50";

const LABEL_CLASS = "mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-muted";

/** Same field look, with a red border swapped in once a field has failed validation. */
function fieldClass(hasError?: boolean) {
  return `${FIELD_CLASS} ${hasError ? "border-red-300 focus:border-red-400" : ""}`;
}

/** Small inline message under a field — never a popup, per the design brief. */
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-[11px] font-medium text-red-600">{message}</p>;
}

/** Numbered section label, reusing the same gold-ring badge style as "How it works" below. */
function SectionHeading({ index, title }: { index: number; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/40 font-serif text-[11px] text-gold">
        {index}
      </span>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{title}</h3>
    </div>
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s-]{6,}$/;

type DateMode = "exact" | "flexible";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  interests: string[];
  destinations: string[];
  flexibleDestination: boolean;
  dateMode: DateMode;
  startDate: string;
  endDate: string;
  consent: boolean;
};

type FormErrors = Partial<Record<"name" | "email" | "phone" | "interests" | "destinations" | "dates" | "consent", string>>;

function computeErrors(v: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!v.name.trim()) errors.name = "Please enter your full name.";

  if (!v.email.trim()) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(v.email.trim())) errors.email = "Enter a valid email address.";

  if (!v.phone.trim()) errors.phone = "Please enter a phone or WhatsApp number.";
  else if (!PHONE_RE.test(v.phone.trim())) errors.phone = "Enter a valid phone number.";

  if (v.interests.length === 0) errors.interests = "Pick at least one interest, or “Not Sure Yet.”";

  if (!v.flexibleDestination && v.destinations.length === 0) {
    errors.destinations = "Pick at least one destination, or choose “I’m flexible.”";
  }

  if (v.dateMode === "exact") {
    if (!v.startDate || !v.endDate) errors.dates = "Pick both a start and end date.";
    else if (new Date(v.endDate).getTime() <= new Date(v.startDate).getTime()) {
      errors.dates = "End date must be after the start date.";
    }
  }

  if (!v.consent) errors.consent = "Please confirm to continue.";

  return errors;
}

function formatDateRange(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return "";
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  return `${s.toLocaleDateString("en-US", opts)} – ${e.toLocaleDateString("en-US", opts)}`;
}

export default function PlanYourTripPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [destinations, setDestinations] = useState<string[]>([]);
  const [flexibleDestination, setFlexibleDestination] = useState(true);
  const [dateMode, setDateMode] = useState<DateMode>("flexible");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [groupSize, setGroupSize] = useState(GROUP_SIZES[1]);
  const [duration, setDuration] = useState(DURATIONS[1]);
  const [budget, setBudget] = useState(BUDGETS[BUDGETS.length - 1]);
  const [consent, setConsent] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo<FormErrors>(
    () =>
      attempted
        ? computeErrors({
            name,
            email,
            phone,
            interests,
            destinations,
            flexibleDestination,
            dateMode,
            startDate,
            endDate,
            consent,
          })
        : {},
    [attempted, name, email, phone, interests, destinations, flexibleDestination, dateMode, startDate, endDate, consent]
  );

  function toggleInterest(id: string) {
    setInterests((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  }

  function toggleDestination(place: string) {
    setDestinations((prev) => (prev.includes(place) ? prev.filter((v) => v !== place) : [...prev, place]));
  }

  function toggleFlexibleDestination() {
    setFlexibleDestination((prev) => {
      const next = !prev;
      if (next) setDestinations([]);
      return next;
    });
  }

  function buildSummary() {
    const parts: string[] = [];

    if (flexibleDestination) parts.push("Flexible on destination");
    else if (destinations.length > 0) parts.push(`${destinations.length} destination${destinations.length > 1 ? "s" : ""}`);

    if (dateMode === "exact" && startDate && endDate) {
      const range = formatDateRange(startDate, endDate);
      parts.push(range || duration);
    } else {
      parts.push(duration);
    }

    parts.push(groupSize);

    const interestLabels = interests
      .filter((id) => id !== "unsure")
      .map((id) => INTERESTS.find((i) => i.id === id)?.label)
      .filter((label): label is string => Boolean(label));

    if (interestLabels.length > 0) {
      parts.push(
        interestLabels.length > 2
          ? `${interestLabels.slice(0, 2).join(", ")} +${interestLabels.length - 2} more`
          : interestLabels.join(", ")
      );
    } else if (interests.includes("unsure")) {
      parts.push("open to suggestions");
    }

    return parts.join(" · ");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = computeErrors({
      name,
      email,
      phone,
      interests,
      destinations,
      flexibleDestination,
      dateMode,
      startDate,
      endDate,
      consent,
    });
    setAttempted(true);
    if (Object.keys(result).length > 0) return;
    setSubmitted(true);
  }

  return (
    <main className="bg-cream">
      {/* ---------------- Intro band ---------------- */}
      <section className="relative overflow-hidden bg-forest">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="h-full w-full bg-gradient-to-br from-forest/60 via-forest to-night" />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-10 h-[380px] w-[380px] rounded-full bg-gold/10 blur-3xl"
          />
          <PeaksMotif className="absolute inset-x-0 bottom-0 h-[55%] w-full text-cream/[0.05]" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-forest/20" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8 lg:pt-36">
          <div className="max-w-2xl">
            <span className="mb-7 inline-flex items-center gap-2 rounded-full bg-cream/95 px-4 py-1.5 text-[10px] font-semibold tracking-wide text-green sm:text-xs">
              START PLANNING
            </span>

            <h1 className="font-serif text-[30px] font-semibold leading-[1.12] tracking-tight text-cream sm:text-5xl">
              Let&rsquo;s plan your <span className="heading-accent">journey</span>
            </h1>

            <p className="mt-5 max-w-xl text-[13.5px] leading-relaxed text-cream/85 sm:text-base md:text-lg">
              No fixed itinerary yet? Tell us what you love, when you&rsquo;re free, and who&rsquo;s coming —
              a local trip planner will shape the rest around you.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- Form + sidebar ---------------- */}
      <section className="relative w-full bg-cream py-14 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px] lg:gap-14">
            {/* Form column */}
            <div>
              <Reveal>
                {submitted ? (
                  <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[22px] border border-forest/10 bg-white p-10 text-center shadow-[0_2px_18px_rgba(18,36,28,0.06)]">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green/10 text-green">
                      <CheckIcon size={28} />
                    </span>
                    <p className="mt-6 font-serif text-2xl text-forest sm:text-3xl">Your trip plan request is in</p>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                      A local trip planner is already looking at what you shared. Expect a tailored itinerary and
                      price in your inbox within one working day.
                    </p>

                    <div className="mt-8 grid w-full max-w-sm grid-cols-1 gap-3 text-left">
                      {[
                        "We match your interests to the right region and season",
                        "A local trip planner drafts a custom itinerary and price",
                        "You review, tweak anything, and confirm when ready",
                      ].map((step, i) => (
                        <div key={step} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest font-serif text-xs text-cream">
                            {i + 1}
                          </span>
                          <p className="text-sm leading-snug text-muted">{step}</p>
                        </div>
                      ))}
                    </div>

                    <LinkButton href="/tours" variant="dark" className="group mt-8 gap-2">
                      Browse Tours &amp; Events Meanwhile
                      <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                        <ArrowIcon size={14} />
                      </span>
                    </LinkButton>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="rounded-[22px] border border-forest/10 bg-white p-6 shadow-[0_2px_18px_rgba(18,36,28,0.06)] sm:p-8"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                      Trip planning request
                    </p>
                    <h2 className="mt-1.5 font-serif text-2xl text-forest sm:text-3xl">Tell us about your trip</h2>

                    <div className="mt-7 space-y-7">
                      {/* ---- 1. Your details ---- */}
                      <div>
                        <SectionHeading index={1} title="Your details" />
                        <div className="space-y-5">
                          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                              <label htmlFor="name" className={LABEL_CLASS}>
                                Full name
                              </label>
                              <input
                                id="name"
                                name="name"
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Your full name"
                                className={fieldClass(Boolean(errors.name))}
                              />
                              <FieldError message={errors.name} />
                            </div>
                            <div>
                              <label htmlFor="email" className={LABEL_CLASS}>
                                Email
                              </label>
                              <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="you@example.com"
                                className={fieldClass(Boolean(errors.email))}
                              />
                              <FieldError message={errors.email} />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="phone" className={LABEL_CLASS}>
                              Phone / WhatsApp
                            </label>
                            <input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={phone}
                              onChange={(event) => setPhone(event.target.value)}
                              placeholder="+92 300 1234567"
                              className={fieldClass(Boolean(errors.phone))}
                            />
                            <FieldError message={errors.phone} />
                          </div>
                        </div>
                      </div>

                      {/* ---- 2. Trip preferences ---- */}
                      <div className="border-t border-forest/8 pt-7">
                        <SectionHeading index={2} title="Trip preferences" />
                        <div className="space-y-5">
                          {/* Interest chips — the distinctive centerpiece of this form */}
                          <div>
                            <label className={LABEL_CLASS}>What excites you most? Pick all that apply.</label>
                            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                              {INTERESTS.map(({ id, label, Icon }) => {
                                const active = interests.includes(id);
                                return (
                                  <button
                                    key={id}
                                    type="button"
                                    onClick={() => toggleInterest(id)}
                                    aria-pressed={active}
                                    className={`flex flex-col items-center gap-2 rounded-xl border px-3 py-4 text-center transition-all duration-200 ${
                                      active
                                        ? "border-green bg-green/[0.06] text-green shadow-[0_4px_14px_-6px_rgba(31,106,76,0.4)]"
                                        : "border-forest/12 bg-white text-muted hover:border-forest/25 hover:text-forest"
                                    }`}
                                  >
                                    <span
                                      className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 ${
                                        active ? "bg-green text-white" : "bg-forest/[0.05] text-forest/70"
                                      }`}
                                    >
                                      <Icon size={17} />
                                    </span>
                                    <span className="text-[11px] font-medium leading-snug">{label}</span>
                                  </button>
                                );
                              })}
                            </div>
                            <FieldError message={errors.interests} />
                          </div>

                          {/* Destination multi-select — same chip style as interests above,
                              plus a removable-chip summary and a mutually exclusive
                              "flexible" option that clears and disables the picks. */}
                          <div>
                            <label className={LABEL_CLASS}>Where in Gilgit-Baltistan? Pick as many as you like.</label>
                            <div
                              className={`grid grid-cols-2 gap-2.5 sm:grid-cols-4 transition-opacity duration-200 ${
                                flexibleDestination ? "opacity-40" : ""
                              }`}
                            >
                              {DESTINATIONS.map((place) => {
                                const active = destinations.includes(place);
                                return (
                                  <button
                                    key={place}
                                    type="button"
                                    onClick={() => toggleDestination(place)}
                                    disabled={flexibleDestination}
                                    aria-pressed={active}
                                    className={`rounded-xl border px-3 py-2.5 text-center text-[12px] font-medium leading-snug transition-all duration-200 disabled:cursor-not-allowed ${
                                      active
                                        ? "border-green bg-green/[0.06] text-green shadow-[0_4px_14px_-6px_rgba(31,106,76,0.4)]"
                                        : "border-forest/12 bg-white text-muted hover:border-forest/25 hover:text-forest"
                                    }`}
                                  >
                                    {place}
                                  </button>
                                );
                              })}
                            </div>

                            {destinations.length > 0 && !flexibleDestination && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {destinations.map((place) => (
                                  <span
                                    key={place}
                                    className="inline-flex items-center gap-1.5 rounded-full bg-forest/[0.06] py-1.5 pl-3 pr-2 text-[11px] font-medium text-forest"
                                  >
                                    {place}
                                    <button
                                      type="button"
                                      onClick={() => toggleDestination(place)}
                                      aria-label={`Remove ${place}`}
                                      className="flex h-4 w-4 items-center justify-center rounded-full text-forest/50 transition-colors hover:bg-forest/10 hover:text-forest"
                                    >
                                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                        <path
                                          d="M5 5l14 14M19 5 5 19"
                                          stroke="currentColor"
                                          strokeWidth="2.4"
                                          strokeLinecap="round"
                                        />
                                      </svg>
                                    </button>
                                  </span>
                                ))}
                              </div>
                            )}

                            <button
                              type="button"
                              onClick={toggleFlexibleDestination}
                              aria-pressed={flexibleDestination}
                              className={`mt-3 flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                                flexibleDestination
                                  ? "border-gold bg-gold/[0.08] text-forest"
                                  : "border-dashed border-forest/20 text-muted hover:border-forest/35 hover:text-forest"
                              }`}
                            >
                              <span
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                                  flexibleDestination ? "bg-gold text-forest" : "bg-forest/[0.05] text-forest/60"
                                }`}
                              >
                                <CompassIcon size={15} />
                              </span>
                              <span className="text-[12.5px] font-medium leading-snug">
                                I&rsquo;m flexible — surprise me with the best fit
                              </span>
                              {flexibleDestination && (
                                <span className="ml-auto text-gold">
                                  <CheckIcon size={15} />
                                </span>
                              )}
                            </button>

                            <FieldError message={errors.destinations} />
                          </div>

                          {/* Dates — exact range vs. flexible are mutually exclusive */}
                          <div>
                            <label className={LABEL_CLASS}>When are you traveling?</label>
                            <div className="flex gap-2.5">
                              <button
                                type="button"
                                onClick={() => setDateMode("exact")}
                                aria-pressed={dateMode === "exact"}
                                className={`flex-1 rounded-xl border px-4 py-2.5 text-[12.5px] font-medium transition-all duration-200 ${
                                  dateMode === "exact"
                                    ? "border-green bg-green/[0.06] text-green"
                                    : "border-forest/12 bg-white text-muted hover:border-forest/25 hover:text-forest"
                                }`}
                              >
                                I have exact dates
                              </button>
                              <button
                                type="button"
                                onClick={() => setDateMode("flexible")}
                                aria-pressed={dateMode === "flexible"}
                                className={`flex-1 rounded-xl border px-4 py-2.5 text-[12.5px] font-medium transition-all duration-200 ${
                                  dateMode === "flexible"
                                    ? "border-green bg-green/[0.06] text-green"
                                    : "border-forest/12 bg-white text-muted hover:border-forest/25 hover:text-forest"
                                }`}
                              >
                                I&rsquo;m flexible
                              </button>
                            </div>

                            {dateMode === "exact" && (
                              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div>
                                  <label
                                    htmlFor="startDate"
                                    className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-muted/70"
                                  >
                                    Start date
                                  </label>
                                  <input
                                    id="startDate"
                                    name="startDate"
                                    type="date"
                                    value={startDate}
                                    onChange={(event) => setStartDate(event.target.value)}
                                    className={`${fieldClass(Boolean(errors.dates))} cursor-pointer`}
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor="endDate"
                                    className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-muted/70"
                                  >
                                    End date
                                  </label>
                                  <input
                                    id="endDate"
                                    name="endDate"
                                    type="date"
                                    value={endDate}
                                    min={startDate || undefined}
                                    onChange={(event) => setEndDate(event.target.value)}
                                    className={`${fieldClass(Boolean(errors.dates))} cursor-pointer`}
                                  />
                                </div>
                              </div>
                            )}

                            <FieldError message={errors.dates} />
                          </div>
                        </div>
                      </div>

                      {/* ---- 3. Logistics & notes ---- */}
                      <div className="border-t border-forest/8 pt-7">
                        <SectionHeading index={3} title="Logistics & notes" />
                        <div className="space-y-5">
                          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                            <div>
                              <label htmlFor="groupSize" className={LABEL_CLASS}>
                                Group size
                              </label>
                              <select
                                id="groupSize"
                                name="groupSize"
                                value={groupSize}
                                onChange={(event) => setGroupSize(event.target.value)}
                                className={`${FIELD_CLASS} cursor-pointer`}
                              >
                                {GROUP_SIZES.map((size) => (
                                  <option key={size} value={size}>
                                    {size}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label htmlFor="duration" className={LABEL_CLASS}>
                                Trip duration
                              </label>
                              <select
                                id="duration"
                                name="duration"
                                value={duration}
                                onChange={(event) => setDuration(event.target.value)}
                                className={`${FIELD_CLASS} cursor-pointer`}
                              >
                                {DURATIONS.map((item) => (
                                  <option key={item} value={item}>
                                    {item}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label htmlFor="budget" className={LABEL_CLASS}>
                                Budget per person
                              </label>
                              <select
                                id="budget"
                                name="budget"
                                value={budget}
                                onChange={(event) => setBudget(event.target.value)}
                                className={`${FIELD_CLASS} cursor-pointer`}
                              >
                                {BUDGETS.map((item) => (
                                  <option key={item} value={item}>
                                    {item}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div>
                            <label htmlFor="notes" className={LABEL_CLASS}>
                              Anything else we should know? <span className="normal-case text-muted/70">(optional)</span>
                            </label>
                            <textarea
                              id="notes"
                              name="notes"
                              rows={4}
                              placeholder="Special occasions, accessibility needs, must-see places..."
                              className={`${FIELD_CLASS} resize-none`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* ---- Summary + consent + submit ---- */}
                      <div className="border-t border-forest/8 pt-7">
                        <div className="rounded-xl border border-gold/25 bg-gold/[0.06] px-4 py-3.5">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gold">
                            Quick summary
                          </p>
                          <p className="mt-1 text-[13px] leading-snug text-forest">{buildSummary()}</p>
                        </div>

                        <label className="mt-5 flex items-start gap-3 text-xs leading-relaxed text-muted">
                          <input
                            type="checkbox"
                            checked={consent}
                            onChange={(event) => setConsent(event.target.checked)}
                            className="mt-0.5 h-4 w-4 shrink-0 rounded border-forest/25 text-green focus:ring-green/40"
                          />
                          I agree to be contacted about this trip. No payment is taken now.
                        </label>
                        <FieldError message={errors.consent} />

                        <button
                          type="submit"
                          className="group mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-green px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-green-dark hover:shadow-[0_12px_28px_-6px_rgba(31,106,76,0.5)] active:translate-y-0 active:scale-[0.97]"
                        >
                          Start Planning My Trip
                          <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                            <ArrowIcon size={14} />
                          </span>
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </Reveal>
            </div>

            {/* Sidebar */}
            <div>
              <div className="space-y-6 lg:sticky lg:top-24">
                <Reveal delay={100}>
                  <div className="rounded-[22px] border border-forest/10 bg-white p-6 shadow-[0_2px_18px_rgba(18,36,28,0.07)]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Why plan with us</p>
                    <div className="mt-5 space-y-5">
                      {TRUST_POINTS.map(({ Icon, title, description }) => (
                        <div key={title} className="flex items-start gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green/10 text-green">
                            <Icon size={16} />
                          </span>
                          <div>
                            <h3 className="font-serif text-sm text-forest">{title}</h3>
                            <p className="mt-1 text-xs leading-relaxed text-muted">{description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={160}>
                  <div className="rounded-[22px] border border-forest/10 bg-forest p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
                      Prefer to talk it through?
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-cream/65">
                      Reach a local trip planner directly by phone, WhatsApp, or email.
                    </p>
                    <div className="mt-5 space-y-4">
                      {CONTACT_DETAILS.map(({ label, value, Icon }) => (
                        <div key={label} className="flex items-start gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream/[0.07] text-gold">
                            <Icon size={14} />
                          </span>
                          <div className="min-w-0">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-cream/50">{label}</p>
                            <p className="mt-0.5 text-[13px] leading-snug text-cream/85">{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- How we plan your trip ---------------- */}
      <section className="relative w-full overflow-hidden bg-forest py-16 sm:py-20 lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-28 top-0 h-[360px] w-[360px] rounded-full bg-gold/10 blur-3xl"
        />
        <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-xl text-center">
              <div className="mx-auto mb-5 flex w-fit items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/50">
                <span className="h-px w-8 bg-cream/30" />
                How it works
                <span className="h-px w-8 bg-cream/30" />
              </div>
              <h2 className="font-serif text-3xl leading-[1.12] tracking-tight text-cream sm:text-4xl">
                Your journey, <span className="heading-accent">planned in 4 steps</span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5">
            {HOW_IT_WORKS.map((step, index) => (
              <Reveal key={step.title} delay={index * 90}>
                <div className="relative flex h-full flex-col rounded-[18px] border border-cream/10 bg-cream/[0.04] p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 font-serif text-sm text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-serif text-base leading-snug text-cream">{step.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-cream/60">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Traveler stories ---------------- */}
      <TravelerReviewsSection id="plan-reviews" reviews={DEFAULT_REVIEWS} />
    </main>
  );
}
