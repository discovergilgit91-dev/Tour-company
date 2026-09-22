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

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Discover Gilgit — home"
      className={`group inline-flex shrink-0 items-center ${className}`}
    >
      {/* Transparent Logo */}
      <div className="relative h-[90px] w-[90px] sm:h-[100px] sm:w-[100px]">
        <Image
          src="/Images/tours/logo.png"
          alt="Discover Gilgit-Baltistan"
          fill
          priority
          quality={100}
          sizes="100px"
          className="
            object-contain
            drop-shadow-[0_5px_15px_rgba(0,0,0,0.4)]
            transition-all
            duration-300
            group-hover:scale-105
            group-hover:drop-shadow-[0_7px_20px_rgba(0,0,0,0.5)]
          "
        />
      </div>
    </Link>
  );
}
