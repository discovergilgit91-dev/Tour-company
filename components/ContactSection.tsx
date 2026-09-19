"use client";

import { useState } from "react";
import { Button } from "./ui/Button";

const CONTACT_DETAILS = [
  { label: "Email", value: "hello@discovergilgit.com" },
  { label: "Phone", value: "+92 355 123 4567" },
  { label: "Office", value: "Jutial Road, Gilgit, Gilgit-Baltistan" },
];

const FIELD_CLASS =
  "w-full rounded-xl border border-cream/15 bg-cream/[0.04] px-4 py-3 font-sans text-sm text-cream placeholder:text-cream/40 outline-none transition-colors focus:border-gold/60";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="relative overflow-hidden bg-forest px-5 py-20 text-cream sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/60">
            <span className="h-px w-8 bg-cream/30" />
            Contact
          </div>

          <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl">
            Let&apos;s plan your trip
          </h2>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/70 sm:text-base">
            Tell us where you'd like to go and when. A local trip planner will get
            back to you within one working day.
          </p>

          <dl className="mt-10 space-y-5 border-t border-cream/10 pt-8">
            {CONTACT_DETAILS.map((item) => (
              <div key={item.label} className="flex items-baseline gap-4">
                <dt className="w-16 shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
                  {item.label}
                </dt>
                <dd className="text-sm text-cream/80">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
          className="rounded-[24px] border border-cream/10 bg-cream/[0.03] p-7 sm:p-8"
        >
          {submitted ? (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
              <p className="font-serif text-2xl text-cream">Thank you!</p>
              <p className="mt-2 max-w-xs text-sm text-cream/70">
                We&apos;ve received your message and will reply within one working day.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-cream/60">
                  Name
                </label>
                <input id="name" name="name" type="text" required placeholder="Your full name" className={FIELD_CLASS} />
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-cream/60">
                  Email
                </label>
                <input id="email" name="email" type="email" required placeholder="you@example.com" className={FIELD_CLASS} />
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-cream/60">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
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
