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
      <path d="M11 6L16 15L13 18.5L6.5 18.5L11 6Z" className="fill-gold" fillOpacity="0.9" />
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
      className={`inline-flex shrink-0 items-center transition-opacity hover:opacity-80 ${className}`}
    >
      {/* No background behind the mark at all — just the artwork itself.
          A drop-shadow (follows the logo's own silhouette, not a box)
          keeps it legible over the hero photo and the scrolled bar alike. */}
      <span
        className={`relative shrink-0 transition-all duration-300 ${
          compact ? "h-12 w-12 sm:h-14 sm:w-14" : "h-16 w-16 sm:h-20 sm:w-20"
        }`}
      >
        <Image
          src="/Images/tours/company-logo.png"
          alt="Discover Gilgit"
          fill
          priority
          quality={90}
          sizes={compact ? "56px" : "80px"}
          className="object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
        />
      </span>
    </Link>
  );
}
