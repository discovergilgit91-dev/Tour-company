"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LinkButton } from "./ui/Button";
import {
  ArrowIcon,
  ChevronDownIcon,
  CheckIcon,
  ClockIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "./ui/icons";
import { PeaksMotif, MOTIF_COMPONENTS } from "./tours/motifs";
import { useRevealOnScroll } from "./DestinationCard";
import type { TourDetail } from "@/lib/tourDetails";

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

const FIELD_CLASS =
  "w-full rounded-xl border border-forest/12 bg-white px-4 py-3 font-sans text-sm text-forest placeholder:text-muted/50 outline-none transition-colors focus:border-green/50";

const LABEL_CLASS = "mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-muted";

const INCLUDED = [
  "Local guide and driver throughout",
  "Accommodation per the itinerary",
  "All meals listed in the itinerary",
  "Airport and city transfers",
  "Permits and park entry fees",
];

const NOT_INCLUDED = ["International flights", "Travel insurance", "Personal expenses & souvenirs"];

const BOOKING_FAQS = [
  {
    question: "When will I hear back?",
    answer:
      "A local trip planner reviews every request personally and replies within one working day, usually sooner.",
  },
  {
    question: "Is a deposit required to submit this?",
    answer:
      "No — no payment is taken through this form. Once your spot is confirmed, we'll arrange a deposit and payment plan directly with you.",
  },
  {
    question: "Can I change the number of travellers later?",
    answer:
      "Yes. Mention it when your trip planner follows up and we'll adjust availability and pricing together before anything is confirmed.",
  },
  {
    question: "What's the cancellation policy?",
    answer:
      "Full terms are shared once your booking is confirmed, but most departures allow free cancellation up to 30 days before the trip starts.",
  },
  {
    question: "Can I request a different departure date?",
    answer:
      "Group departures run on the fixed dates listed for each trip. Note your preferred timing in special requests and we'll flag upcoming alternatives.",
  },
];

const CONTACT_DETAILS = [
  { label: "Email", value: "hello@discovergilgit.com", Icon: MailIcon },
  { label: "Phone", value: "+92 355 123 4567", Icon: PhoneIcon },
  { label: "Office", value: "Jutial Road, Gilgit, Gilgit-Baltistan", Icon: PinIcon },
];

const TRUST_POINTS = [
  {
    Icon: ShieldCheckIcon,
    title: "Secure reservation",
    description: "No payment is taken now — you'll confirm details and payment directly with a local trip planner.",
  },
  {
    Icon: ClockIcon,
    title: "Fast response",
    description: "A local trip planner reviews every request and replies within one working day.",
  },
  {
    Icon: UsersIcon,
    title: "Small, local-led groups",
    description: "Every departure is capped and guided by people who live in the valleys you're visiting.",
  },
];

function extractPrice(price: string): number {
  const match = price.replace(/,/g, "").match(/\d+(\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

function extractMaxTravelers(groupSize: string): number {
  const match = groupSize.match(/\d+/);
  return match ? Math.min(Number(match[0]), 16) : 10;
}

type SimpleTour = { slug: string; title: string };

export default function BookingPage({ tour, allTours }: { tour: TourDetail | null; allTours: SimpleTour[] }) {
  const router = useRouter();
  const [travelers, setTravelers] = useState(2);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const maxTravelers = tour ? extractMaxTravelers(tour.groupSize) : 10;
  const pricePerPerson = tour ? extractPrice(tour.price) : 0;
  const total = pricePerPerson * travelers;

  const AccentMotif = tour ? MOTIF_COMPONENTS[tour.theme.motif] : null;

  return (
    <main className="bg-cream">
      {/* ---------------- Intro band ---------------- */}
      <section className={`relative overflow-hidden bg-forest ${tour ? "" : ""}`}>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className={`h-full w-full bg-gradient-to-br ${tour ? tour.theme.heroFrom : "from-forest/60"} via-forest to-night`}
          />
          {tour && (
            <div
              aria-hidden
              className={`pointer-events-none absolute -left-24 top-10 h-[380px] w-[380px] rounded-full ${tour.theme.blob} blur-3xl`}
            />
          )}
          <PeaksMotif className="absolute inset-x-0 bottom-0 h-[55%] w-full text-cream/[0.05]" />
          {AccentMotif && (
            <AccentMotif className="absolute right-6 top-16 h-28 w-28 text-cream/20 sm:right-12 sm:h-40 sm:w-40" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-forest/20" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8 lg:pt-36">
          <div className="max-w-2xl">
            {tour ? (
              <LinkButton
                href={`/tours/${tour.slug}`}
                variant="dark"
                className="group mb-7 gap-2 text-[11px] uppercase tracking-[0.12em]"
              >
                <span className="rotate-180 transition-transform duration-300 ease-out group-hover:-translate-x-1">
                  <ArrowIcon size={13} />
                </span>
                Back to {tour.title}
              </LinkButton>
            ) : (
              <span className="mb-7 inline-flex items-center gap-2 rounded-full bg-cream/95 px-4 py-1.5 text-[10px] font-semibold tracking-wide text-green sm:text-xs">
                RESERVE YOUR SPOT
              </span>
            )}

            <h1 className="font-serif text-[30px] font-semibold leading-[1.12] tracking-tight text-cream sm:text-5xl">
              {tour ? (
                <>
                  Reserve <span className="heading-accent">{tour.title}</span>
                </>
              ) : (
                <>
                  Let&rsquo;s get your <span className="heading-accent">trip booked</span>
                </>
              )}
            </h1>

            <p className="mt-5 max-w-xl text-[13.5px] leading-relaxed text-cream/85 sm:text-base md:text-lg">
              {tour
                ? `${tour.dateRange} · ${tour.duration} · Starting from ${tour.price} per person.`
                : "Tell us which trip you're interested in and how many are travelling — a local trip planner will confirm availability and reply within one working day."}
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- Form + Summary ---------------- */}
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
                  <p className="mt-6 font-serif text-2xl text-forest sm:text-3xl">Reservation request received</p>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                    {tour
                      ? `We've noted your interest in ${tour.title}. A local trip planner will confirm availability and be in touch within one working day.`
                      : "A local trip planner will get back to you within one working day to help plan your trip."}
                  </p>

                  <div className="mt-8 grid w-full max-w-sm grid-cols-1 gap-3 text-left">
                    {[
                      "We check availability for your travel dates",
                      "You'll hear from a local trip planner within one working day",
                      "Once confirmed, we'll arrange secure payment together",
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
                    See All Tours &amp; Events
                    <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                      <ArrowIcon size={14} />
                    </span>
                  </LinkButton>
                </div>
              ) : (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSubmitted(true);
                  }}
                  className="rounded-[22px] border border-forest/10 bg-white p-6 shadow-[0_2px_18px_rgba(18,36,28,0.06)] sm:p-8"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    Traveller details
                  </p>
                  <h2 className="mt-1.5 font-serif text-2xl text-forest sm:text-3xl">
                    {tour ? "A few details to hold your spot" : "Tell us about your trip"}
                  </h2>

                  <div className="mt-7 space-y-5">
                    {!tour && (
                      <div>
                        <label htmlFor="tourSelect" className={LABEL_CLASS}>
                          Which trip are you interested in?
                        </label>
                        <select
                          id="tourSelect"
                          className={`${FIELD_CLASS} cursor-pointer`}
                          defaultValue=""
                          onChange={(event) => {
                            if (event.target.value) router.push(`/book?tour=${event.target.value}`);
                          }}
                        >
                          <option value="">I'm not sure yet — general inquiry</option>
                          {allTours.map((t) => (
                            <option key={t.slug} value={t.slug}>
                              {t.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className={LABEL_CLASS}>
                          Full name
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

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="phone" className={LABEL_CLASS}>
                          Phone / WhatsApp
                        </label>
                        <input id="phone" name="phone" type="tel" required placeholder="+92 300 1234567" className={FIELD_CLASS} />
                      </div>
                      <div>
                        <label htmlFor="travelers" className={LABEL_CLASS}>
                          Number of travellers
                        </label>
                        <select
                          id="travelers"
                          className={`${FIELD_CLASS} cursor-pointer`}
                          value={travelers}
                          onChange={(event) => setTravelers(Number(event.target.value))}
                        >
                          {Array.from({ length: maxTravelers }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>
                              {n} {n === 1 ? "Traveller" : "Travellers"}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="requests" className={LABEL_CLASS}>
                        Special requests <span className="normal-case text-muted/70">(optional)</span>
                      </label>
                      <textarea
                        id="requests"
                        name="requests"
                        rows={4}
                        placeholder="Dietary needs, room preferences, anything else we should know..."
                        className={`${FIELD_CLASS} resize-none`}
                      />
                    </div>

                    <label className="flex items-start gap-3 text-xs leading-relaxed text-muted">
                      <input
                        type="checkbox"
                        required
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-forest/25 text-green focus:ring-green/40"
                      />
                      I agree to be contacted about this reservation request. No payment is taken now.
                    </label>

                    <button
                      type="submit"
                      className="group flex w-full items-center justify-center gap-2 rounded-full bg-green px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-green-dark hover:shadow-[0_12px_28px_-6px_rgba(31,106,76,0.5)] active:translate-y-0 active:scale-[0.97]"
                    >
                      Submit Reservation Request
                      <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                        <ArrowIcon size={14} />
                      </span>
                    </button>
                  </div>
                </form>
              )}
              </Reveal>

              {/* Booking FAQ */}
              <Reveal delay={80}>
                <div className="mt-10 rounded-[22px] border border-forest/10 bg-white p-6 shadow-[0_2px_18px_rgba(18,36,28,0.06)] sm:p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    Common questions
                  </p>
                  <h3 className="mt-1.5 font-serif text-2xl text-forest">Before you submit</h3>

                  <div className="mt-6 divide-y divide-forest/8 border-t border-forest/8">
                    {BOOKING_FAQS.map((faq, index) => {
                      const isOpen = openFaq === index;
                      return (
                        <div key={faq.question}>
                          <button
                            type="button"
                            onClick={() => setOpenFaq(isOpen ? null : index)}
                            aria-expanded={isOpen}
                            className="flex w-full items-center justify-between gap-4 py-4 text-left"
                          >
                            <span className="font-serif text-base text-forest sm:text-lg">{faq.question}</span>
                            <span
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-forest transition-all duration-300 ${
                                isOpen ? "rotate-180 bg-forest text-cream" : "bg-forest/[0.06]"
                              }`}
                            >
                              <ChevronDownIcon size={14} />
                            </span>
                          </button>
                          <div
                            className={`grid transition-all duration-300 ease-out ${
                              isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                            }`}
                          >
                            <div className="overflow-hidden">
                              <p className="pb-4 pr-10 text-sm leading-relaxed text-muted">{faq.answer}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>

              {/* Prefer to talk to someone? */}
              <Reveal delay={140}>
                <div className="mt-6 rounded-[22px] border border-forest/10 bg-forest p-6 sm:p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
                    Prefer to talk it through?
                  </p>
                  <h3 className="mt-1.5 font-serif text-xl text-cream sm:text-2xl">
                    Reach a local trip planner directly
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-cream/65">
                    Happy to answer questions by phone, WhatsApp, or email before you commit to a reservation.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-x-10 gap-y-5">
                    {CONTACT_DETAILS.map(({ label, value, Icon }) => (
                      <div key={label} className="flex min-w-[220px] shrink-0 grow items-start gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream/[0.07] text-gold">
                          <Icon size={16} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-cream/50">
                            {label}
                          </p>
                          <p className="mt-0.5 whitespace-nowrap text-sm leading-snug text-cream/85">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Sidebar */}
            <div>
              <div className="lg:sticky lg:top-24">
                <Reveal delay={100}>
                  {tour ? (
                    <div className="overflow-hidden rounded-[22px] border border-forest/10 bg-white shadow-[0_2px_18px_rgba(18,36,28,0.07)]">
                      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-forest to-night">
                        <PeaksMotif className="absolute inset-x-0 bottom-0 h-2/3 w-full text-cream/10" />
                        {AccentMotif && <AccentMotif className="absolute right-2 top-4 h-24 w-24 text-cream/30" />}
                        <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-cream/15 bg-night/50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-cream/70 backdrop-blur-sm">
                          Photo coming soon
                        </span>
                      </div>

                      <div className="p-6">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                          Booking Summary
                        </p>
                        <h3 className="mt-1.5 font-serif text-xl text-forest">{tour.title}</h3>

                        <dl className="mt-4 space-y-3">
                          {[
                            ["Dates", tour.dateRange],
                            ["Duration", tour.duration],
                            ["Route", tour.route],
                            ["Physical Level", tour.level],
                          ].map(([label, value]) => (
                            <div
                              key={label}
                              className="flex items-center justify-between gap-3 border-t border-forest/8 pt-3 first:border-t-0 first:pt-0"
                            >
                              <dt className="text-xs text-muted">{label}</dt>
                              <dd className="text-right text-[13px] font-semibold text-forest">{value}</dd>
                            </div>
                          ))}
                        </dl>

                        <div className="mt-5 border-t border-forest/8 pt-4">
                          <div className="flex items-center justify-between text-sm text-muted">
                            <span>
                              {tour.price} &times; {travelers} {travelers === 1 ? "traveller" : "travellers"}
                            </span>
                            <span className="font-semibold text-forest">${total.toLocaleString()}</span>
                          </div>
                          <div className="mt-3 flex items-baseline justify-between border-t border-forest/8 pt-3">
                            <span className="text-xs uppercase tracking-[0.08em] text-muted">Estimated total</span>
                            <span className="font-serif text-2xl text-forest">
                              ${total.toLocaleString()}
                              <span className="ml-1 text-xs font-sans font-normal text-muted">USD</span>
                            </span>
                          </div>
                          <p className="mt-2 text-[11px] leading-relaxed text-muted/80">
                            An estimate only — your local trip planner will confirm final pricing when they reach out.
                          </p>
                        </div>

                        <div className="mt-5 border-t border-forest/8 pt-5">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-green">Included</p>
                          <ul className="mt-3 space-y-2">
                            {INCLUDED.map((item) => (
                              <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-muted">
                                <span className="mt-0.5 text-green">
                                  <CheckIcon size={13} />
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted/70">
                            Not included
                          </p>
                          <ul className="mt-2 space-y-1.5">
                            {NOT_INCLUDED.map((item) => (
                              <li key={item} className="text-xs leading-relaxed text-muted/70">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-[22px] border border-forest/10 bg-white p-6 shadow-[0_2px_18px_rgba(18,36,28,0.07)]">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                        Not sure which trip yet?
                      </p>
                      <h3 className="mt-1.5 font-serif text-xl text-forest">Browse the full calendar</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        Filter every guided tour and seasonal event by region, duration, or budget.
                      </p>
                      <LinkButton href="/tours" variant="primary" className="group mt-5 w-full gap-2">
                        See All Tours &amp; Events
                        <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                          <ArrowIcon size={14} />
                        </span>
                      </LinkButton>

                      <div className="mt-6 space-y-3 border-t border-forest/8 pt-5">
                        {allTours.slice(0, 4).map((t) => (
                          <a
                            key={t.slug}
                            href={`/book?tour=${t.slug}`}
                            className="flex items-center justify-between gap-2 text-sm text-forest transition-colors duration-200 hover:text-green"
                          >
                            {t.title}
                            <ArrowIcon size={13} />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Trust strip ---------------- */}
      <section className="relative w-full overflow-hidden bg-forest py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
            {TRUST_POINTS.map(({ Icon, title, description }, index) => (
              <Reveal key={title} delay={index * 90}>
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream/[0.07] text-gold">
                    <Icon size={20} />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg text-cream">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-cream/65">{description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
