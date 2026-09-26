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
      {/* No plate/box behind the mark — just a soft, blurred glow (not a hard
          edge) so the emblem's dark green still lifts off a photo or the
          footer's dark bg, without reading as a sticker. */}
      <span
        className={`relative flex shrink-0 items-center justify-center transition-all duration-300 ${
          compact ? "h-14 w-14 sm:h-16 sm:w-16" : "h-20 w-20 sm:h-24 sm:w-24"
        }`}
      >
        <span aria-hidden className="absolute inset-[10%] rounded-full bg-cream/85 blur-lg" />
        <Image
          src="/Images/tours/logo.png"
          alt="Discover Gilgit-Baltistan"
          fill
          priority
          quality={90}
          sizes="96px"
          className="relative object-contain drop-shadow-[0_2px_5px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-105"
        />
      </span>
    </Link>
  );
}