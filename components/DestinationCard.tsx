"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowIcon } from "./ui/icons";

export type Destination = {
  id: string;
  name: string;
  blurb: string;
  /** Path under /public. Leave unset to show the "photo coming soon" placeholder instead of a broken image. */
  image?: string;
  tag: string;
  href: string;
  /** Approximate elevation shown under the photo, e.g. "2,500 m" */
  altitude: string;
  /** Optional CSS object-position for the photo crop, e.g. "50% 30%" */
  focus?: string;
  /** Route-ready identifier for a future /destinations/[slug] detail page */
  slug?: string;
  /** No longer used by the layout — kept so existing callers still type-check */
  span?: string;
};

export function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function PhotoPlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-forest to-night text-cream/50">
      <svg width="28" height="18" viewBox="0 0 50 30" fill="none" aria-hidden="true">
        <path d="M2 27 17 6l8 11 6-7 15 17H2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em]">Photo coming soon</span>
    </div>
  );
}

export function DestinationCard({
  destination,
  index,
  delay = 0,
  featured = false,
}: {
  destination: Destination;
  index: number;
  delay?: number;
  /** Marks the card with a "Featured" badge and a gold ring. Same size and grid cell as every other card — only the badge/ring set it apart, so every photo in the grid stays perfectly aligned. */
  featured?: boolean;
}) {
  const { name, blurb, image, tag, href, altitude, focus } = destination;
  const { ref, visible } = useRevealOnScroll<HTMLAnchorElement>();
  const number = String(index + 1).padStart(2, "0");

  return (
    <Link
      ref={ref}
      href={href}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={[
        "group block rounded-[22px] outline-none",
        "focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-4 focus-visible:ring-offset-cream",
        "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      ].join(" ")}
    >
      {/* photo — every card uses the exact same box (aspect-[4/5], same
          rounded corners) so widths and heights line up perfectly across
          the whole grid; "featured" only adds a badge and a ring, never a
          different size. */}
      <div
        className={`relative aspect-[4/5] overflow-hidden rounded-[22px] bg-forest ${
          featured ? "ring-2 ring-gold ring-offset-2 ring-offset-cream" : ""
        }`}
      >
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            quality={85}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            style={focus ? { objectPosition: focus } : undefined}
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
        ) : (
          <PhotoPlaceholder />
        )}

        {featured && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-cream/25 bg-night/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream backdrop-blur-sm">
            Featured
          </span>
        )}

        <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-cream text-forest shadow-[0_6px_20px_rgba(0,0,0,0.18)] transition-colors duration-300 group-hover:bg-green group-hover:text-white">
          <span className="transition-transform duration-300 ease-out group-hover:-rotate-45">
            <ArrowIcon size={16} />
          </span>
        </span>
      </div>

      {/* caption: number + elevation, a hairline that turns green on hover, then the text */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          <span>{number}</span>
          <span className="flex items-center gap-1.5">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-green">
              <path d="M2 20 9.5 7l4 6.5L16 10l6 10H2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            {altitude}
          </span>
        </div>

        <div className="relative mt-3 h-px bg-forest/10">
          <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-green transition-transform duration-500 ease-out group-hover:scale-x-100" />
        </div>

        <h3 className="mt-4 font-serif text-2xl leading-tight tracking-tight text-forest">{name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{blurb}</p>
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-green">{tag}</p>
      </div>
    </Link>
  );
}
