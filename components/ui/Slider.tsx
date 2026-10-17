"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Card list that is a normal wrapping grid on tablets and phones, and a single
 * horizontal row (scroll-snap, arrows, swipe / trackpad) on desktop and
 * laptop screens so a section with many cards stays within one screen.
 * The row/slide behaviour itself is pure CSS (.card-slider in globals.css);
 * this component only adds the arrow buttons and keeps them in sync.
 */
export default function Slider({
  children,
  className = "",
  label,
  as = "ul",
  spaced = false,
}: {
  children: ReactNode;
  /** Extra grid classes, e.g. "card-grid-4" */
  className?: string;
  /** Accessible name of the list, e.g. "Traditions" */
  label: string;
  /** "div" when the children are not <li> elements */
  as?: "ul" | "div";
  /** Add the standard heading→content gap above the row (when no SectionHeader sits right above it) */
  spaced?: boolean;
}) {
  const track = useRef<HTMLUListElement & HTMLDivElement>(null);
  const Tag = as as "ul";
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    // cards added / removed (e.g. a filter changed)
    const mutations = new MutationObserver(update);
    mutations.observe(el, { childList: true });
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
      mutations.disconnect();
    };
  }, [update]);

  const scrollBy = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: "smooth" });
  };

  const arrow =
    "absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-forest/10 bg-cream text-forest shadow-[0_0.375rem_1.25rem_rgba(0,0,0,0.18)] transition-colors duration-300 hover:bg-green hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green";

  return (
    <div className={`slider relative ${spaced ? "head-gap" : ""}`}>
      <Tag ref={track} aria-label={label} className={`card-grid card-slider ${className}`}>
        {children}
      </Tag>
      {canPrev && (
        <button type="button" aria-label={`Previous ${label}`} onClick={() => scrollBy(-1)} className={`${arrow} -left-5 slider-arrow`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      )}
      {canNext && (
        <button type="button" aria-label={`Next ${label}`} onClick={() => scrollBy(1)} className={`${arrow} -right-5 slider-arrow`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      )}
    </div>
  );
}
