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
      {/* Fixed box + object-contain so the logo scales without distorting no
          matter the source file's aspect ratio, and object-left keeps its
          own left edge flush with the container edge (same as every other
          section) instead of centering inside the box. */}
      <span className="relative h-8 w-32 sm:h-9 sm:w-36">
        <Image
          src="/Images/tours/company-logo.png"
          alt="Discover Gilgit"
          fill
          priority
          quality={90}
          sizes="144px"
          className="object-contain object-left"
        />
      </span>
    </Link>
  );
}
