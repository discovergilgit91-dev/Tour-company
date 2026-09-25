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
      aria-label="Discover Gilgit — home"
      className={`group inline-flex shrink-0 items-center ${className}`}
    >
      {/* No background behind the mark at all — just the artwork itself.
          A drop-shadow (follows the logo's own silhouette, not a box)
          keeps it legible over the hero photo and the scrolled bar alike.
          Reuses the PeakMark vector mark (defined above) instead of a
          raster image, so it also adapts to the header's cream/forest
          color swap for free via currentColor, the same way the nav
          links and Sign In text already do. */}
      <span
        className={`relative flex shrink-0 items-center justify-center transition-all duration-300 ${
          compact ? "h-12 w-12 sm:h-14 sm:w-14" : "h-16 w-16 sm:h-20 sm:w-20"
        }`}
      >
        <PeakMark
          className="h-full w-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
        />
      </span>
    </Link>
  );
}