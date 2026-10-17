import type { ReactNode } from "react";

/**
 * The one section header used across the site.
 *
 * Wide screens: two columns inside the shared page container. Left = label +
 * two-colour heading, right = intro paragraph (+ optional small note / action),
 * both bottom-aligned, with the right column's right edge on the container
 * edge (same as the card row below). Tablet and phones: stacked, left-aligned.
 * Layout lives in .section-header (globals.css).
 */
export default function SectionHeader({
  eyebrow,
  heading,
  intro,
  note,
  actions,
  tone = "light",
  className = "",
}: {
  eyebrow: ReactNode;
  /** Heading content; wrap the accent words in <span className="text-green"> (or heading-accent on dark). */
  heading: ReactNode;
  intro?: ReactNode;
  /** Small quiet line under the intro, e.g. "Hover a photo to explore" */
  note?: ReactNode;
  /** Button(s) shown under the intro */
  actions?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={`section-header ${intro || note || actions ? "" : "section-header--solo"} ${className}`}>
      <div className="min-w-0">
        <div
          className={`mb-3 flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] lg:mb-[1.2vh] ${
            dark ? "text-cream/60" : "text-muted"
          }`}
        >
          <span className={`h-px w-8 ${dark ? "bg-cream/30" : "bg-muted/60"}`} />
          {eyebrow}
        </div>
        <h2
          className={`section-title font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl ${
            dark ? "text-cream" : "text-forest"
          }`}
        >
          {heading}
        </h2>
      </div>

      {(intro || note || actions) && (
        <div className="section-header__side">
          {intro && (
            <div className={`space-y-3 text-[0.9375rem] leading-[1.6] sm:text-base ${dark ? "text-cream/70" : "text-muted"}`}>
              {typeof intro === "string" ? <p>{intro}</p> : intro}
            </div>
          )}
          {note && (
            <p className={`flex items-center gap-2 text-xs ${dark ? "text-cream/55" : "text-muted"}`}>
              <span className={`h-px w-8 ${dark ? "bg-cream/30" : "bg-muted/60"}`} />
              {note}
            </p>
          )}
          {actions}
        </div>
      )}
    </div>
  );
}
