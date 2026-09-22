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

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Discover Gilgit — home"
      className={`inline-flex shrink-0 items-center transition-opacity hover:opacity-80 ${className}`}
    >
      {/* A cream badge — not a bare image — so the mark reads as a
          deliberate emblem (with shadow + edge) instead of a small,
          washed-out square floating over the hero photo or dark footer. */}
      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-cream p-1.5 shadow-[0_10px_24px_-10px_rgba(7,23,25,0.5)] ring-1 ring-black/5 sm:h-14 sm:w-14">
        <Image
          src="/Images/tours/company-logo.png"
          alt="Discover Gilgit"
          fill
          priority
          quality={90}
          sizes="56px"
          className="object-contain"
        />
      </span>
    </Link>
  );
}
