"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Reveal from "./district/Reveal";

/**
 * "Photo highlights" gallery used on destination and tour pages.
 *
 * Sizing rules (no screen-height sizing anywhere): tiles are sized from the
 * gallery's WIDTH — about 4:3 (rows are 80% of a column's width, never under
 * 260px on desktop / 240px on tablet and phone). A featured first tile spans
 * 2 columns × 2 rows. The column count is picked from the number of photos so
 * the grid always closes with no empty cells; see pickLayout().
 * Clicking a photo opens it large in a lightbox (arrows, Esc, swipe-free).
 */

export type GalleryPhoto = {
  /** Missing → a gradient + motif placeholder (not clickable). */
  src?: string;
  alt: string;
  caption: string;
  tag?: string;
  /** Tailwind gradient classes used by the placeholder, e.g. "from-green-dark" / "to-forest". */
  from?: string;
  to?: string;
  /** CSS object-position, e.g. "50% 40%". Default keeps the middle slightly high. */
  focus?: string;
  /** Marks the big first tile (gold "Featured" label). */
  featured?: boolean;
};

type Span = { col: number; row: number };
type Layout = { cols: number; featured: boolean; spans: Span[] };

const one: Span = { col: 1, row: 1 };
const big: Span = { col: 2, row: 2 };
const singles = (n: number): Span[] => Array.from({ length: n }, () => one);

/**
 * Picks the desktop column count, whether the first photo is the big one, and
 * every tile's span — always closing the grid with no empty cell.
 */
function pickLayout(total: number, wantsFeatured: boolean): Layout {
  if (total <= 1) return { cols: 1, featured: false, spans: singles(total) };

  if (!wantsFeatured) {
    if (total % 3 === 0) return { cols: 3, featured: false, spans: singles(total) };
    if (total === 2 || total === 4) return { cols: 2, featured: false, spans: singles(total) };
    if (total % 4 === 0) return { cols: 4, featured: false, spans: singles(total) };
    // 5, 7, 10 …: the first photo becomes the big one
    return pickLayout(total, true);
  }

  const rest = total - 1;
  if (rest === 1) return { cols: 3, featured: true, spans: [big, { col: 1, row: 2 }] };
  if (rest === 4) return { cols: 4, featured: true, spans: [big, ...singles(4)] };
  if (rest % 3 === 2) return { cols: 3, featured: true, spans: [big, ...singles(rest)] };
  if (rest === 3) return { cols: 4, featured: true, spans: [big, one, one, { col: 2, row: 1 }] };

  // 3 columns: two tiles beside the big one, then rows of three; stretch the last tiles to close the final row
  const spans: Span[] = [big, ...singles(rest)];
  const below = rest - 2;
  if (below % 3 === 2) spans[spans.length - 2] = { col: 2, row: 1 };
  else if (below % 3 === 1) {
    spans[spans.length - 4] = { col: 2, row: 1 };
    spans[spans.length - 1] = { col: 2, row: 1 };
  }
  return { cols: 3, featured: true, spans };
}

function ArrowButton({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous photo" : "Next photo"}
      className={`absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 bg-night/60 text-cream backdrop-blur-sm transition-colors hover:bg-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
        direction === "prev" ? "left-3 sm:left-6" : "right-3 sm:right-6"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={direction === "prev" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
      </svg>
    </button>
  );
}

function Lightbox({
  photos,
  index,
  onClose,
  onChange,
}: {
  photos: GalleryPhoto[];
  index: number;
  onClose: () => void;
  onChange: (next: number) => void;
}) {
  const photo = photos[index];
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const count = photos.length;

  const go = useCallback((delta: number) => onChange((index + delta + count) % count), [index, count, onChange]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowLeft") go(-1);
      else if (event.key === "ArrowRight") go(1);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [go, onClose]);

  if (!photo?.src) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${count}: ${photo.caption}`}
      className="fixed inset-0 z-[100] flex flex-col bg-night/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-5 py-4 text-cream" onClick={(event) => event.stopPropagation()}>
        <p className="text-sm text-cream/70">
          {index + 1} / {count}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close photo"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 transition-colors hover:bg-cream/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <div className="relative min-h-0 flex-1" onClick={(event) => event.stopPropagation()}>
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          fill
          quality={90}
          sizes="100vw"
          className="object-contain px-2 sm:px-16"
        />
        {count > 1 && (
          <>
            <ArrowButton direction="prev" onClick={() => go(-1)} />
            <ArrowButton direction="next" onClick={() => go(1)} />
          </>
        )}
      </div>

      <p className="px-5 py-4 text-center font-serif text-lg text-cream" onClick={(event) => event.stopPropagation()}>
        {photo.caption}
      </p>
    </div>
  );
}

export default function PhotoGallery({
  photos,
  renderFallback,
}: {
  photos: GalleryPhoto[];
  /** Decoration inside a placeholder tile (photos with no src) */
  renderFallback?: (index: number) => ReactNode;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const layout = pickLayout(photos.length, Boolean(photos[0]?.featured));
  const tiles = photos.map((photo, i) => ({ ...photo, featured: layout.featured && i === 0 }));
  const clickable = tiles.map((tile, i) => ({ tile, i })).filter(({ tile }) => Boolean(tile.src));
  const lightboxPhotos = clickable.map(({ tile }) => tile);

  const close = useCallback(() => setOpenIndex(null), []);

  return (
    <div className="photo-gallery">
      <div
        className="photo-gallery__grid"
        style={{ ["--lg-cols" as string]: layout.cols } as React.CSSProperties}
      >
        {tiles.map((photo, index) => {
          const span = layout.spans[index] ?? one;
          const isFeatured = Boolean(photo.featured);
          const style = {
            ["--lg-col" as string]: span.col,
            ["--lg-row" as string]: span.row,
            // tablet: 2 columns — the featured tile is 2×2, a last odd tile spans both columns
            ["--md-col" as string]:
              isFeatured || (index === tiles.length - 1 && (tiles.length - (layout.featured ? 1 : 0)) % 2 === 1) ? 2 : 1,
            ["--md-row" as string]: isFeatured ? 2 : 1,
          } as React.CSSProperties;
          const lightboxIndex = clickable.findIndex(({ i }) => i === index);

          const inner = (
            <>
              {photo.src ? (
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  quality={85}
                  sizes={
                    isFeatured
                      ? "(min-width: 1024px) 66vw, (min-width: 640px) 100vw, 100vw"
                      : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  }
                  style={{ objectPosition: photo.focus ?? "50% 40%" }}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />
              ) : (
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${photo.from ?? "from-green-dark"} ${photo.to ?? "to-forest"} transition-transform duration-500 ease-out group-hover:scale-[1.05]`}
                >
                  {renderFallback?.(index)}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-night/75 via-night/5 to-transparent" />
              {isFeatured ? (
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-gold/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-forest">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2 14.9 8.9 22 9.5 16.7 14.1 18.2 21 12 17.3 5.8 21 7.3 14.1 2 9.5 9.1 8.9 12 2Z" />
                  </svg>
                  Featured
                </span>
              ) : (
                photo.tag && (
                  <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-night/55 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-cream/90 backdrop-blur-sm">
                    {photo.tag}
                  </span>
                )
              )}
              <span
                className={`absolute inset-x-4 bottom-4 text-left font-serif leading-snug text-cream ${
                  isFeatured ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
                }`}
              >
                {photo.caption}
              </span>
            </>
          );

          return (
            <Reveal key={`${photo.caption}-${index}`} delay={(index % 4) * 80} className="photo-gallery__item" style={style}>
              {photo.src ? (
                <button
                  type="button"
                  onClick={() => setOpenIndex(lightboxIndex)}
                  aria-label={`Open photo: ${photo.caption}`}
                  className="group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-[18px] outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
                >
                  {inner}
                </button>
              ) : (
                <div className="group relative block h-full w-full overflow-hidden rounded-[18px]">{inner}</div>
              )}
            </Reveal>
          );
        })}
      </div>

      {openIndex !== null && (
        <Lightbox photos={lightboxPhotos} index={openIndex} onClose={close} onChange={setOpenIndex} />
      )}
    </div>
  );
}
