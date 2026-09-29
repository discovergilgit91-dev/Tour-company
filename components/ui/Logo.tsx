import Image from "next/image";
import Link from "next/link";

/**
 * Small inline accent for use next to text or inside a decorative ring —
 * the same logo-icon.png artwork the header/footer wordmark uses, not a
 * generic placeholder mountain glyph.
 */
export function LogoIcon({ className = "h-5 w-6" }: { className?: string }) {
  return (
    <span className={`relative inline-block shrink-0 ${className}`}>
      <Image src="/Images/tours/logo-icon.png" alt="" aria-hidden fill sizes="48px" className="object-contain" />
    </span>
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
  // The icon (mountain emblem) and the "Discover Gilgit-Baltistan" wordmark
  // are two separate crops of the original artwork, stacked with a real
  // margin between them — not one flattened image. The source image has
  // its own internal gap between the two, but that gap is a fixed fraction
  // of the whole canvas: shrunk down to this component's actual on-page
  // size (as small as 56px), it collapses to a sub-pixel sliver that
  // anti-aliasing (and the drop-shadow below) blurs into what reads as the
  // wordmark overlapping the icon. Laying them out as two elements with an
  // explicit `mt` gives a gap in real CSS pixels that can't shrink away.
  const iconSize = compact ? "h-11 w-14 sm:h-[50px] sm:w-16" : "h-16 w-20 sm:h-[76px] sm:w-24";
  const textSize = compact ? "h-3.5 w-14 sm:h-4 sm:w-16" : "h-5 w-20 sm:h-6 sm:w-24";

  return (
    <Link
      href="/"
      aria-label="Discover Gilgit-Baltistan — home"
      className={`group inline-flex shrink-0 flex-col items-center ${className}`}
    >
      {/* Just the artwork itself, no background at all — a drop-shadow
          (follows each crop's own silhouette, not a box) is the only thing
          keeping it readable over a photo or the footer's dark bg. */}
      <span className={`relative block shrink-0 transition-all duration-300 ${iconSize}`}>
        <Image
          src="/Images/tours/logo-icon.png"
          alt=""
          aria-hidden
          fill
          priority
          quality={90}
          sizes="96px"
          className="object-contain drop-shadow-[0_3px_8px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-105"
        />
      </span>
      <span className={`relative mt-1.5 block shrink-0 ${textSize}`}>
        <Image
          src="/Images/tours/logo-text.png"
          alt="Discover Gilgit-Baltistan"
          fill
          quality={90}
          sizes="96px"
          className="object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
        />
      </span>
    </Link>
  );
}