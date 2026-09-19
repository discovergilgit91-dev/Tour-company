"use client";

import { useState, type FormEvent } from "react";
import { Button } from "./ui/Button";

const CONTACT_DETAILS = [
  { label: "Email", value: "hello@discovergilgit.com", href: "mailto:hello@discovergilgit.com" },
  { label: "Phone", value: "+92 355 123 4567", href: "tel:+923551234567" },
  { label: "Office", value: "Jutial Road, Gilgit, Gilgit-Baltistan", href: undefined },
];

const DESTINATIONS = ["Hunza Valley", "Skardu", "Fairy Meadows", "Deosai Plains", "Shigar Valley", "Khunjerab Pass"];

const LABEL_CLASS = "mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-cream/60";

const FIELD_CLASS =
  "w-full rounded-xl border border-cream/15 bg-cream/[0.04] px-4 py-3 font-sans text-sm text-cream placeholder:text-cream/40 outline-none transition-colors focus:border-gold/60";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (place: string) =>
    setSelected((current) => (current.includes(place) ? current.filter((item) => item !== place) : [...current, place]));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setFirstName(String(data.get("name") ?? "").trim().split(" ")[0]);
    // TODO: send `data` (name, email, message, destinations) to your API here.
    setSubmitted(true);
  };

  const reset = () => {
    setSelected([]);
    setSubmitted(false);
  };

  return (
    /* Same container as Header, Hero, FeaturedDestinations, AboutStory, UpcomingTours and Testimonials:
       max-w-6xl + px-4 sm:px-6 (no horizontal padding on the section itself). */
    <section id="contact" className="relative overflow-hidden bg-forest py-16 text-cream sm:py-20 lg:py-24">
      {/* soft mountain ridge along the bottom edge — decoration only, adds no height */}
      <svg
        aria-hidden
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 w-full text-cream/[0.06]"
      >
        <path
          d="M0 120V88l90-28 60 24 110-54 70 40 90-26 100 52 120-56 80 32 100-54 80 46 100-26 100 42 100-28V120Z"
          fill="currentColor"
        />
      </svg>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/60">
            <span className="h-px w-8 bg-cream/30" />
            Contact
          </div>

          <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl">
            Let&apos;s plan
            <br />
            <span className="heading-accent">your trip.</span>
          </h2>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/70 sm:text-base">
            Tell us where you&apos;d like to go and when. A local trip planner will get back to you
            within one working day.
          </p>

          <dl className="mt-8 space-y-4 border-t border-cream/10 pt-6">
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

        <form
          onSubmit={handleSubmit}
          className="rounded-[24px] border border-cream/10 bg-cream/[0.03] p-6 sm:p-7"
        >
          {submitted ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </span>
              <p className="mt-5 font-serif text-2xl text-cream">
                Thank you{firstName ? `, ${firstName}` : ""}!
              </p>
              <p className="mt-2 max-w-xs text-sm text-cream/70">
                We&apos;ve received your message and will reply within one working day.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-gold transition-colors duration-300 hover:text-cream"
              >
                Send another message
              </button>
            </div>
          ) : (
            <div className="space-y-4">
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
                <span id="where-label" className={LABEL_CLASS}>
                  Where to? <span className="ml-1 normal-case tracking-normal text-cream/40">(optional)</span>
                </span>
                <div className="flex flex-wrap gap-2" role="group" aria-labelledby="where-label">
                  {DESTINATIONS.map((place) => {
                    const on = selected.includes(place);
                    return (
                      <button
                        key={place}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle(place)}
                        className={`rounded-full border px-3 py-1.5 text-[12.5px] transition-colors duration-300 ${
                          on
                            ? "border-gold bg-gold font-semibold text-forest"
                            : "border-cream/15 bg-cream/[0.04] text-cream/75 hover:border-gold/60 hover:text-cream"
                        }`}
                      >
                        {place}
                      </button>
                    );
                  })}
                </div>
                <input type="hidden" name="destinations" value={selected.join(", ")} />
              </div>

              <div>
                <label htmlFor="message" className={LABEL_CLASS}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={3}
                  placeholder="Tell us about the trip you're planning..."
                  className={`${FIELD_CLASS} resize-none`}
                />
              </div>

              <Button type="submit" className="w-full">
                Send message
              </Button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
