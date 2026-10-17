import Image from "next/image";
import Link from "next/link";

/**
 * `light` is the cream-and-sage artwork, for dark or photographic
 * backgrounds; `dark` is the forest-and-green artwork, for cream ones.
 * Both are the supplied logo with its background removed.
 */
export type LogoTone = "light" | "dark";

/**
 * Small inline accent for use next to text or inside a decorative ring —
 * the crest (mountain emblem) from the company logo, without the wordmark.
 */
export function LogoIcon({
  className = "h-5 w-6",
  sizes = "48px",
  quality,
  tone = "dark",
}: {
  className?: string;
  /** Hint for the rendered width — raise it when the icon is shown larger than ~48px so a sharper source is picked. */
  sizes?: string;
  quality?: number;
  tone?: LogoTone;
}) {
  return (
    <span className={`relative inline-block shrink-0 ${className}`}>
      <Image
        src={`/Images/tours/crest-${tone}.png`}
        alt=""
        aria-hidden
        fill
        sizes={sizes}
        quality={quality}
        className="object-contain"
      />
    </span>
  );
}

export function Logo({
  className = "",
  compact = false,
  tone = "light",
}: {
  className?: string;
  /** Smaller mark for the scrolled header, so the bar doesn't grow taller than it needs to. */
  compact?: boolean;
  tone?: LogoTone;
}) {
  // The full lockup (crest + "Discover Gilgit-Baltistan") is one image, so
  // it only needs a height; the width follows from its 900:668 ratio.
  const size = compact ? "h-[4.25rem] sm:h-[4.75rem]" : "h-[5.5rem] sm:h-[6.5rem]";

  return (
    <Link
      href="/"
      aria-label="Discover Gilgit-Baltistan — home"
      className={`group inline-flex shrink-0 items-center ${className}`}
    >
      <span className={`relative block aspect-[900/668] shrink-0 transition-all duration-300 ${size}`}>
        <Image
          src={`/Images/tours/logo-${tone}.png`}
          alt="Discover Gilgit-Baltistan"
          fill
          priority
          quality={90}
          sizes="140px"
          className={`object-contain transition-transform duration-300 group-hover:scale-105 ${
            tone === "light" ? "drop-shadow-[0_0.125rem_0.5rem_rgba(0,0,0,0.45)]" : ""
          }`}
        />
      </span>
    </Link>
  );
}
