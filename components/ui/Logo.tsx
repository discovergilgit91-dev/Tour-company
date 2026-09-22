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
      {/* A soft, tonal circle — not a stark white box — in the site's own
          night/gold palette, so it reads as one mark whether it's sitting
          on the transparent header over the hero photo or the solid
          forest bar once scrolled, instead of a mismatched white square
          dropped on top of either. */}
      <span
        className={`relative flex shrink-0 items-center justify-center rounded-full bg-night/25 ring-1 ring-gold/25 backdrop-blur-sm transition-all duration-300 ${
          compact ? "h-10 w-10 p-1.5 sm:h-11 sm:w-11" : "h-16 w-16 p-2 sm:h-20 sm:w-20"
        }`}
      >
        <Image
          src="/Images/tours/company-logo.png"
          alt="Discover Gilgit"
          fill
          priority
          quality={90}
          sizes={compact ? "44px" : "80px"}
          className="object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
        />
      </span>
    </Link>
  );
}
