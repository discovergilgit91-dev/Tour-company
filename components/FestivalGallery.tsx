"use client";

import { useMemo, useState } from "react";
import { LinkButton } from "./ui/Button";
import { ArrowIcon } from "./ui/icons";
import { useRevealOnScroll } from "./DestinationCard";

type Category = {
  id: string;
  label: string;
  from: string;
  to: string;
};

const CATEGORIES: Category[] = [
  { id: "dance", label: "Traditional Dance", from: "from-rose-400/60", to: "to-night" },
  { id: "cuisine", label: "Local Cuisine", from: "from-teal-400/60", to: "to-night" },
  { id: "handicrafts", label: "Handicrafts", from: "from-orange-400/60", to: "to-forest" },
  { id: "performances", label: "Live Performances", from: "from-purple-400/60", to: "to-night" },
  { id: "exhibitions", label: "Cultural Exhibitions", from: "from-amber-400/60", to: "to-forest" },
  { id: "community", label: "Community Spirit", from: "from-emerald-400/60", to: "to-night" },
];

type Photo = {
  id: string;
  category: string;
  caption: string;
  aspect: string;
};

const ASPECTS = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[3/5]", "aspect-[4/3]"];

const PHOTO_TITLES: Record<string, string[]> = {
  dance: ["Sword Dance at Dusk", "Circle of Drums", "Children's Folk Dance", "The Whirling Steps"],
  cuisine: ["Apricot Harvest Feast", "Fresh-Baked Chapshoro", "Mountain Tea Ceremony", "Walnut & Honey Sweets"],
  handicrafts: [
    "Handwoven Wool Rugs",
    "Silver Filigree Jewelry",
    "Wood-Carved Lattice Work",
    "Embroidered Pattu Shawls",
  ],
  performances: ["Rubab Under the Stars", "The Storyteller's Circle", "Highland Flute Ensemble", "Evening Drum Procession"],
  exhibitions: [
    "Heritage Costume Display",
    "Ancient Manuscripts Corner",
    "Photography of the Five Valleys",
    "Artifacts of the Silk Road",
  ],
  community: ["Elders' Welcome Circle", "Children at Play", "Shared Community Feast", "Festival Volunteers"],
};

const PHOTOS: Photo[] = CATEGORIES.flatMap((category, categoryIndex) =>
  PHOTO_TITLES[category.id].map((caption, photoIndex) => ({
    id: `${category.id}-${photoIndex}`,
    category: category.id,
    caption,
    aspect: ASPECTS[(categoryIndex + photoIndex) % ASPECTS.length],
  }))
);

function SunMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="14" fill="none" stroke="currentColor" strokeWidth="1.4" />
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x1 = 50 + Math.cos(angle) * 20;
        const y1 = 50 + Math.sin(angle) * 20;
        const x2 = 50 + Math.cos(angle) * 34;
        const y2 = 50 + Math.sin(angle) * 34;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.4" />;
      })}
    </svg>
  );
}

function PeaksMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <path
        d="M-10 78 14 50l12 16 14-24 14 22 12-12 20 26 16-14 22 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M-10 90 16 62l13 17 15-25 15 23 13-13 21 27 17-15 23 21"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function GalleryTile({ photo, category, onOpen }: { photo: Photo; category: Category; onOpen: () => void }) {
  const { ref, visible } = useRevealOnScroll<HTMLButtonElement>();
  const Motif = photo.id.length % 2 === 0 ? SunMotif : PeaksMotif;

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      className={`group relative mb-4 block w-full overflow-hidden rounded-[16px] text-left outline-none transition-[opacity,transform] duration-700 ease-out focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-cream motion-reduce:transition-none ${photo.aspect} ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${category.from} ${category.to} transition-transform duration-500 ease-out group-hover:scale-[1.06]`}>
        <Motif className="absolute inset-0 h-full w-full p-8 text-cream/15" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-night/75 via-transparent to-transparent" />
      <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-night/50 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-cream/85 backdrop-blur-sm">
        {category.label}
      </span>
      <span className="absolute inset-x-3 bottom-3 font-serif text-sm leading-snug text-cream sm:text-base">
        {photo.caption}
      </span>
    </button>
  );
}

function Lightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (delta: number) => void;
}) {
  const photo = photos[index];
  const category = CATEGORIES.find((c) => c.id === photo.category)!;
  const Motif = photo.id.length % 2 === 0 ? SunMotif : PeaksMotif;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-night/85 p-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors duration-300 hover:bg-cream hover:text-forest"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(-1);
        }}
        aria-label="Previous photo"
        className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors duration-300 hover:bg-cream hover:text-forest sm:left-8"
      >
        <span className="rotate-180">
          <ArrowIcon size={17} />
        </span>
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(1);
        }}
        aria-label="Next photo"
        className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors duration-300 hover:bg-cream hover:text-forest sm:right-8"
      >
        <ArrowIcon size={17} />
      </button>

      <div
        className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[22px] border border-cream/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] sm:aspect-[3/4]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${category.from} ${category.to}`}>
          <Motif className="absolute inset-0 h-full w-full p-14 text-cream/15" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent" />
        <span className="absolute left-5 top-5 inline-flex items-center rounded-full bg-night/50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-cream/85 backdrop-blur-sm">
          {category.label}
        </span>
        <div className="absolute inset-x-5 bottom-5">
          <p className="font-serif text-2xl text-cream">{photo.caption}</p>
          <p className="mt-1 text-xs text-cream/50">
            {index + 1} of {photos.length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FestivalGallery() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (activeCategory ? PHOTOS.filter((p) => p.category === activeCategory) : PHOTOS),
    [activeCategory]
  );

  function navigate(delta: number) {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + delta + filtered.length) % filtered.length);
  }

  return (
    <main className="bg-cream">
      <section className="relative w-full overflow-hidden bg-cream pb-16 pt-12 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <LinkButton
              href="/tours/gilgit-cultural-festival"
              variant="dark"
              className="group mb-8 gap-2 text-[11px] uppercase tracking-[0.12em]"
            >
              <span className="rotate-180 transition-transform duration-300 ease-out group-hover:-translate-x-1">
                <ArrowIcon size={13} />
              </span>
              Back to the Festival
            </LinkButton>

            <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              <span className="h-px w-8 bg-muted/60" />
              Festival gallery
            </div>
            <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-forest sm:text-5xl">
              Moments, colors <span className="text-green">and culture</span>
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
              Every dance, dish, and handmade craft from the Gilgit-Baltistan Cultural Festival — browse by category
              or take it all in.
            </p>
          </div>

          {/* filter pills */}
          <div className="mt-10 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              aria-pressed={activeCategory === null}
              className={`inline-flex items-center rounded-full border px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${
                activeCategory === null
                  ? "border-forest bg-forest text-white"
                  : "border-forest/12 bg-white text-muted hover:border-forest/25 hover:text-forest"
              }`}
            >
              All Photos
              <span className="ml-1.5 text-xs opacity-60">{PHOTOS.length}</span>
            </button>
            {CATEGORIES.map((category) => {
              const count = PHOTOS.filter((p) => p.category === category.id).length;
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center rounded-full border px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${
                    isActive
                      ? "border-green/30 bg-green/10 text-forest"
                      : "border-forest/12 bg-white text-muted hover:border-forest/25 hover:text-forest"
                  }`}
                >
                  {category.label}
                  <span className="ml-1.5 text-xs opacity-60">{count}</span>
                </button>
              );
            })}
          </div>

          {/* masonry grid */}
          <div className="mt-10 columns-2 gap-4 sm:columns-3 lg:mt-12 lg:columns-4">
            {filtered.map((photo, i) => (
              <GalleryTile
                key={photo.id}
                photo={photo}
                category={CATEGORIES.find((c) => c.id === photo.category)!}
                onOpen={() => setLightboxIndex(i)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-12 rounded-2xl border border-dashed border-forest/15 bg-white/60 px-6 py-16 text-center">
              <p className="font-serif text-xl text-forest">No photos in this category yet</p>
              <p className="mt-2 text-sm text-muted">Check back soon, or browse another category.</p>
            </div>
          )}
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          photos={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={navigate}
        />
      )}
    </main>
  );
}
