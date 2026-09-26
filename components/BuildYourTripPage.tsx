"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { LinkButton } from "./ui/Button";
import { ArrowIcon, CheckIcon, ClockIcon, ShieldCheckIcon, UsersIcon } from "./ui/icons";
import { PeaksMotif } from "./tours/motifs";
import { useRevealOnScroll } from "./DestinationCard";

/* ---------------------------------------------------------------------
   "Build Your Own Trip" — the destination for the "Design Your Own
   Journey" card in Upcoming Tours & Events. Distinct from /plan-your-trip
   (which starts from "I don't know what I want yet"): here the visitor
   already knows they want a custom, multi-destination itinerary and picks
   the actual places, dates, pace, and budget themselves before a local
   planner turns it into a real plan.
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

type Destination = { id: string; name: string; image: string };

const DESTINATIONS: Destination[] = [
  { id: "hunza-valley", name: "Hunza Valley", image: "/Images/tours/hunza-valley.png" },
  { id: "skardu", name: "Skardu", image: "/Images/tours/skardu.png" },
  { id: "deosai-plains", name: "Deosai Plains", image: "/Images/tours/deosai-plains.png" },
  { id: "fairy-meadows", name: "Fairy Meadows", image: "/Images/tours/Fairy-meadows.png" },
  { id: "shigar-valley", name: "Shigar Valley", image: "/Images/tours/shigar-fort.png" },
  { id: "khunjerab-pass", name: "Khunjerab Pass", image: "/Images/tours/khunjerab.png" },
  { id: "attabad-lake", name: "Attabad Lake", image: "/Images/tours/attabad-lake.png" },
  { id: "passu-cones", name: "Passu Cones", image: "/Images/tours/passu-cones.jpg" },
];

const GROUP_SIZES = ["Solo traveller", "Couple", "Family (3–5)", "Group (6+)"];
const BUDGETS = ["Under $500", "$500 – $1,000", "$1,000 – $2,000", "$2,000 – $5,000", "$5,000+", "Not sure yet"];

type Pace = "relaxed" | "moderate" | "adventurous";

const PACE_OPTIONS: { id: Pace; label: string; description: string }[] = [
  { id: "relaxed", label: "Relaxed", description: "Slow mornings, a few stops a day, plenty of rest" },
  { id: "moderate", label: "Moderate", description: "A steady mix of travel days and time to explore" },
  { id: "adventurous", label: "Adventurous", description: "Early starts, more ground covered, more done" },
];

const TRUST_POINTS = [
  {
    Icon: UsersIcon,
    title: "Checked by a local guide",
    description: "Every custom route is reviewed by someone who has actually driven it, not just mapped it.",
  },
  {
    Icon: ShieldCheckIcon,
    title: "No obligation",
    description: "This is a planning request, not a booking — nothing is charged until you approve the plan.",
  },
  {
    Icon: ClockIcon,
    title: "Fast, human replies",
    description: "A real trip planner reviews every custom request personally, usually within one working day.",
  },
];

/* Numbered section label, reusing the same gold-ring badge style used
   across the site's own "how it works" style step markers. */
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

const FIELD_CLASS =
  "w-full rounded-xl border border-forest/12 bg-white px-4 py-3 font-sans text-sm text-forest placeholder:text-muted/50 outline-none transition-colors focus:border-green/50";

const LABEL_CLASS = "mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-muted";

function fieldClass(hasError?: boolean) {
  return `${FIELD_CLASS} ${hasError ? "border-red-300 focus:border-red-400" : ""}`;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-[11px] font-medium text-red-600">{message}</p>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s-]{6,}$/;

type DateMode = "exact" | "flexible";

type FormValues = {
  destinations: string[];
  dateMode: DateMode;
  startDate: string;
  endDate: string;
  groupSize: string;
  pace: Pace | "";
  budget: string;
  name: string;
  email: string;
  phone: string;
  consent: boolean;
};

type FormErrors = Partial<Record<"destinations" | "dates" | "pace" | "name" | "email" | "phone" | "consent", string>>;

function computeErrors(v: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (v.destinations.length === 0) errors.destinations = "Pick at least one destination.";

  if (v.dateMode === "exact") {
    if (!v.startDate || !v.endDate) errors.dates = "Pick both a start and end date.";
    else if (new Date(v.endDate).getTime() <= new Date(v.startDate).getTime()) {
      errors.dates = "End date must be after the start date.";
    }
  }

  if (!v.pace) errors.pace = "Pick the pace that fits you best.";

  if (!v.name.trim()) errors.name = "Please enter your full name.";

  if (!v.email.trim()) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(v.email.trim())) errors.email = "Enter a valid email address.";

  if (!v.phone.trim()) errors.phone = "Please enter a phone or WhatsApp number.";
  else if (!PHONE_RE.test(v.phone.trim())) errors.phone = "Enter a valid phone number.";

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

function DestinationPickCard({
  destination,
  selected,
  onToggle,
}: {
  destination: Destination;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className="group relative block overflow-hidden rounded-[22px] text-left outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
    >
      <div
        className={`relative aspect-[4/5] w-full overflow-hidden rounded-[22px] bg-forest transition-all duration-300 ${
          selected ? "ring-2 ring-gold ring-offset-2 ring-offset-cream" : ""
        }`}
      >
        <Image
          src={destination.image}
          // Decorative: the visible name label below already gives this
          // button its accessible name, so a repeated alt would announce
          // the destination twice to screen readers.
          alt=""
          fill
          quality={85}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className={`object-cover transition-transform duration-[1200ms] ease-out ${
            selected ? "scale-105" : "group-hover:scale-105"
          }`}
        />

        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            selected ? "bg-forest/30" : "bg-gradient-to-t from-forest/75 via-forest/15 to-transparent"
          }`}
        />

        <span
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
            selected
              ? "scale-100 border-gold bg-gold text-forest"
              : "scale-90 border-cream/50 bg-night/30 text-transparent backdrop-blur-sm group-hover:border-cream group-hover:scale-100"
          }`}
        >
          <CheckIcon size={15} />
        </span>

        <span className="absolute inset-x-3 bottom-3 font-serif text-base leading-snug text-white sm:text-lg">
          {destination.name}
        </span>
      </div>
    </button>
  );
}

export default function BuildYourTripPage() {
  const [destinations, setDestinations] = useState<string[]>([]);
  const [dateMode, setDateMode] = useState<DateMode>("flexible");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [groupSize, setGroupSize] = useState(GROUP_SIZES[1]);
  const [pace, setPace] = useState<Pace | "">("");
  const [budget, setBudget] = useState(BUDGETS[BUDGETS.length - 1]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo<FormErrors>(
    () =>
      attempted
        ? computeErrors({ destinations, dateMode, startDate, endDate, groupSize, pace, budget, name, email, phone, consent })
        : {},
    [attempted, destinations, dateMode, startDate, endDate, groupSize, pace, budget, name, email, phone, consent]
  );

  function toggleDestination(id: string) {
    setDestinations((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  }

  function buildSummary() {
    const parts: string[] = [];

    parts.push(`${destinations.length} destination${destinations.length === 1 ? "" : "s"}`);

    if (dateMode === "exact" && startDate && endDate) {
      const range = formatDateRange(startDate, endDate);
      if (range) parts.push(range);
    } else {
      parts.push("flexible dates");
    }

    parts.push(groupSize);

    const paceLabel = PACE_OPTIONS.find((p) => p.id === pace)?.label;
    if (paceLabel) parts.push(`${paceLabel} pace`);

    return parts.join(" · ");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = computeErrors({ destinations, dateMode, startDate, endDate, groupSize, pace, budget, name, email, phone, consent });
    setAttempted(true);
    if (Object.keys(result).length > 0) return;

    // Client-side only for now — everything the eventual backend needs is
    // already shaped as one plain object, ready to POST as-is once wired up.
    const payload = {
      destinations: destinations.map((id) => DESTINATIONS.find((d) => d.id === id)?.name ?? id),
      dateMode,
      startDate: dateMode === "exact" ? startDate : null,
      endDate: dateMode === "exact" ? endDate : null,
      groupSize,
      pace,
      budget,
      name,
      email,
      phone,
      notes,
    };
    console.log("Custom trip request (client-side only):", payload);

    setSubmitted(true);
  }

  return (
    <main className="bg-cream">
      {/* ---------------- Hero ---------------- */}
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
              CUSTOM TRIP
            </span>

            <h1 className="font-serif text-[30px] font-semibold leading-[1.12] tracking-tight text-cream sm:text-5xl">
              Build a trip that&rsquo;s <span className="heading-accent">entirely yours</span>
            </h1>

            <p className="mt-5 max-w-xl text-[13.5px] leading-relaxed text-cream/85 sm:text-base md:text-lg">
              Pick the places that call to you, tell us your pace and budget, and a local trip planner will turn it
              into a real itinerary — no fixed packages, no compromises.
            </p>
          </div>
        </div>
      </section>

      {submitted ? (
        <section className="relative w-full bg-cream py-16 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-2xl px-5 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center rounded-[22px] border border-forest/10 bg-white p-10 text-center shadow-[0_2px_18px_rgba(18,36,28,0.06)]">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green/10 text-green">
                <CheckIcon size={28} />
              </span>
              <p className="mt-6 font-serif text-2xl text-forest sm:text-3xl">Your custom trip request is in</p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                A local trip planner is already looking at the places you picked. Expect a tailored itinerary and
                price in your inbox within one working day.
              </p>

              <LinkButton href="/tours" variant="dark" className="group mt-8 gap-2">
                Browse Tours &amp; Events Meanwhile
                <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                  <ArrowIcon size={14} />
                </span>
              </LinkButton>
            </div>
          </div>
        </section>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {/* ---------------- Destination picker ---------------- */}
          <section className="relative w-full bg-cream py-14 sm:py-16 lg:py-20">
            <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
              <Reveal>
                <SectionHeading index={1} title="Destinations" />
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <h2 className="max-w-xl font-serif text-3xl leading-[1.08] tracking-tight text-forest sm:text-4xl">
                    Where do you want to go?
                  </h2>
                  <p className="text-sm font-medium text-green">
                    {destinations.length > 0
                      ? `${destinations.length} destination${destinations.length === 1 ? "" : "s"} selected`
                      : "Pick as many as you like"}
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-10 lg:grid-cols-4">
                  {DESTINATIONS.map((destination) => (
                    <DestinationPickCard
                      key={destination.id}
                      destination={destination}
                      selected={destinations.includes(destination.id)}
                      onToggle={() => toggleDestination(destination.id)}
                    />
                  ))}
                </div>

                <FieldError message={errors.destinations} />
              </Reveal>
            </div>
          </section>

          {/* ---------------- Trip details ---------------- */}
          <section className="relative w-full bg-white py-14 sm:py-16 lg:py-20">
            <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
              <Reveal>
                <SectionHeading index={2} title="Trip details" />
                <h2 className="max-w-xl font-serif text-3xl leading-[1.08] tracking-tight text-forest sm:text-4xl">
                  Shape the rest of the trip
                </h2>

                <div className="mt-8 grid grid-cols-1 gap-10 lg:mt-10 lg:grid-cols-[1.2fr_1fr]">
                  <div className="space-y-7">
                    {/* Dates */}
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

                    {/* Pace */}
                    <div>
                      <label className={LABEL_CLASS}>What pace suits you?</label>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {PACE_OPTIONS.map((option) => {
                          const active = pace === option.id;
                          return (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => setPace(option.id)}
                              aria-pressed={active}
                              className={`rounded-xl border px-4 py-3.5 text-left transition-all duration-200 ${
                                active
                                  ? "border-green bg-green/[0.06] shadow-[0_4px_14px_-6px_rgba(31,106,76,0.4)]"
                                  : "border-forest/12 bg-white hover:border-forest/25"
                              }`}
                            >
                              <span className={`block text-[13px] font-semibold ${active ? "text-green" : "text-forest"}`}>
                                {option.label}
                              </span>
                              <span className="mt-1 block text-[11.5px] leading-snug text-muted">
                                {option.description}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <FieldError message={errors.pace} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
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
                </div>
              </Reveal>
            </div>
          </section>

          {/* ---------------- Contact details + summary + submit ---------------- */}
          <section className="relative w-full bg-cream py-14 sm:py-16 lg:py-20">
            <div className="mx-auto w-full max-w-3xl px-5 sm:px-6 lg:px-8">
              <Reveal>
                <SectionHeading index={3} title="Contact details" />
                <h2 className="max-w-xl font-serif text-3xl leading-[1.08] tracking-tight text-forest sm:text-4xl">
                  Where should we send the plan?
                </h2>

                <div className="mt-8 rounded-[22px] border border-forest/10 bg-white p-6 shadow-[0_2px_18px_rgba(18,36,28,0.06)] sm:p-8 lg:mt-10">
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

                    <div>
                      <label htmlFor="notes" className={LABEL_CLASS}>
                        Anything else we should know? <span className="normal-case text-muted/70">(optional)</span>
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={4}
                        value={notes}
                        onChange={(event) => setNotes(event.target.value)}
                        placeholder="Must-see places, accessibility needs, special occasions..."
                        className={`${FIELD_CLASS} resize-none`}
                      />
                    </div>

                    {/* ---- Summary ---- */}
                    <div className="rounded-xl border border-gold/25 bg-gold/[0.06] px-4 py-3.5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gold">Quick summary</p>
                      <p className="mt-1 text-[13px] leading-snug text-forest">{buildSummary()}</p>
                    </div>

                    <label className="flex items-start gap-3 text-xs leading-relaxed text-muted">
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
                      className="group flex w-full items-center justify-center gap-2 rounded-full bg-green px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-green-dark hover:shadow-[0_12px_28px_-6px_rgba(31,106,76,0.5)] active:translate-y-0 active:scale-[0.97]"
                    >
                      Send My Custom Trip Request
                      <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                        <ArrowIcon size={14} />
                      </span>
                    </button>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </form>
      )}

      {/* ---------------- Trust / reassurance strip ---------------- */}
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
                Why build with us
                <span className="h-px w-8 bg-cream/30" />
              </div>
              <h2 className="font-serif text-3xl leading-[1.12] tracking-tight text-cream sm:text-4xl">
                A custom trip, <span className="heading-accent">without the guesswork</span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:mt-14 lg:gap-8">
            {TRUST_POINTS.map(({ Icon, title, description }, index) => (
              <Reveal key={title} delay={index * 90}>
                <div className="flex h-full flex-col rounded-[18px] border border-cream/10 bg-cream/[0.04] p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 text-gold">
                    <Icon size={19} />
                  </span>
                  <h3 className="mt-4 font-serif text-lg leading-snug text-cream">{title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-cream/60">{description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
