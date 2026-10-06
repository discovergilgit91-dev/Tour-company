import type { ReactNode } from "react";
import Link from "next/link";

export type LegalSection = { heading: string; body: ReactNode };

/**
 * Shared layout for the Terms and Privacy pages: the same forest intro band
 * the other inner pages open with (the header floats over it), then a
 * readable single column of numbered sections.
 */
export default function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  /** Human-readable "last updated" date. */
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <main className="bg-cream">
      <section className="relative overflow-hidden bg-forest">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-10 h-[380px] w-[380px] rounded-full bg-gold/10 blur-3xl"
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-12 pt-28 sm:px-6 sm:pb-14 sm:pt-32 lg:px-8 lg:pt-36">
          <span className="inline-flex items-center rounded-full bg-cream/95 px-4 py-1.5 text-[10px] font-semibold tracking-wide text-green sm:text-xs">
            {eyebrow}
          </span>
          <h1 className="mt-5 font-serif text-[30px] font-semibold leading-[1.12] tracking-tight text-cream sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-[13.5px] leading-relaxed text-cream/80 sm:text-base">{intro}</p>
          <p className="mt-4 text-xs text-cream/50">Last updated {updated}</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {sections.map((section, index) => (
              <section key={section.heading}>
                <h2 className="flex items-baseline gap-3 font-serif text-xl text-forest sm:text-2xl">
                  <span className="text-sm text-gold">{String(index + 1).padStart(2, "0")}</span>
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted sm:text-base">{section.body}</div>
              </section>
            ))}
          </div>

          <p className="mt-14 border-t border-forest/10 pt-6 text-sm text-muted">
            Questions? Write to{" "}
            <a href="mailto:hello@discovergilgit.com" className="font-semibold text-green hover:text-green-dark">
              hello@discovergilgit.com
            </a>
            . Back to{" "}
            <Link href="/" className="font-semibold text-green hover:text-green-dark">
              the homepage
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
