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
      className={`inline-flex items-center gap-2.5 font-serif text-[22px] font-semibold tracking-[-0.02em] transition-opacity hover:opacity-80 ${className}`}
    >
      <PeakMark />
      Discover Gilgit
    </Link>
  );
}
