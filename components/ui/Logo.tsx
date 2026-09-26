import Image from "next/image";
import Link from "next/link";

export function PeakMark({ className = "" }: { className?: string }) {
  return (
    <svg
      width="30"
      height="24"
      viewBox="0 0 34 28"
      fill="none"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M1 26L11 6L16 15L21 3L33 26H1Z"
        stroke="currentColor"
        strokeOpacity="0.9"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      <path
        d="M11 6L16 15L13 18.5L6.5 18.5L11 6Z"
        className="fill-gold"
        fillOpacity="0.9"
      />
    </svg>
  );
}

export function Logo({
  className = "",
  compact = false,
}: {
  className?: string;
  /** Smaller mark for the scrolled header, so the bar doesn't grow taller than it needs to. */
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Discover Gilgit-Baltistan — home"
      className={`group inline-flex shrink-0 items-center ${className}`}
    >
      {/* The full emblem (icon + baked-in wordmark) is drawn in a fixed dark
          green, so it only reads clearly on a light surface — a cream plate
          behind it keeps the mark legible whether the header is transparent
          over a hero photo, scrolled to its solid cream bar, or sitting on
          the footer's dark bg, instead of swapping colors per surface. */}
      <span
        className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-cream shadow-[0_4px_14px_rgba(0,0,0,0.22)] ring-1 ring-black/[0.04] transition-all duration-300 group-hover:shadow-[0_6px_18px_rgba(0,0,0,0.3)] ${
          compact ? "h-14 w-14 p-1.5 sm:h-16 sm:w-16 sm:p-2" : "h-20 w-20 p-2 sm:h-24 sm:w-24 sm:p-2.5"
        }`}
      >
        <Image
          src="/Images/tours/logo.png"
          alt="Discover Gilgit-Baltistan"
          fill
          priority
          quality={90}
          sizes="96px"
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </span>
    </Link>
  );
}