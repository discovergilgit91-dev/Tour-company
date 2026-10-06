"use client";

import Image from "next/image";
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
  alt: string;
  src: string;
  featured: boolean;
};

const G = "/Images/tours/gallery";

// Photos are cropped from the festival and heritage pictures on the site; the
// first photo in each category is the featured (wide) tile.
const PHOTO_DATA: Record<string, { caption: string; alt: string; file: string }[]> = {
  dance: [
    { caption: "Torchlit Dance at Dusk", alt: "Dancers circling a bonfire with flaming torches at night", file: "dance-torch-procession" },
    { caption: "Sword Dance in Red Brocade", alt: "A dancer in a red brocade coat holding a sword and shield", file: "dance-red-coat" },
    { caption: "Gold Brocade Steps", alt: "A dancer in a gold brocade coat mid-step on the dance ground", file: "dance-gold-coat" },
    { caption: "Shield & Sword Dancer", alt: "A dancer in a green coat and white cap with a shield", file: "dance-green-coat" },
  ],
  cuisine: [
    { caption: "A Festival Feast Table", alt: "A table spread with traditional dishes, breads and sauces", file: "food-table" },
    { caption: "Fresh Flatbreads & Dumplings", alt: "Stacked flatbreads and steamed dumplings", file: "food-flatbreads" },
    { caption: "Fresh-Baked Mountain Bread", alt: "Sliced loaves of mountain bread on a plate", file: "food-bread-loaves" },
    { caption: "Golden Skillet Bread", alt: "A large golden skillet-baked flatbread", file: "food-brown-bread" },
  ],
  handicrafts: [
    { caption: "Handwoven Wool Rugs", alt: "A row of handwoven wool rugs hung above a stall", file: "craft-rug-row" },
    { caption: "Shawls & Woollen Garments", alt: "Woollen garments and shawls hanging in a handicraft stall", file: "craft-garments" },
    { caption: "Woven Baskets & Cushions", alt: "Woven baskets and embroidered cushions", file: "craft-baskets" },
    { caption: "Carpets & Kilim Cushions", alt: "A patterned carpet with cushions and baskets", file: "craft-centre-rug" },
  ],
  performances: [
    { caption: "Drums on the Hillside", alt: "Musicians with a large drum and a flute on a grassy hillside", file: "perf-musicians" },
    { caption: "The Festival Arena", alt: "Dancers in the arena in front of the festival crowd", file: "perf-stage-crowd" },
    { caption: "Travellers of the High Pass", alt: "Two men in fur and wool coats looking up at a snow peak", file: "perf-mountain-men" },
    { caption: "Dressed for the Celebration", alt: "Women laughing together in colourful embroidered festival dress", file: "perf-festival-dress" },
  ],
  exhibitions: [
    { caption: "Heritage Costume Display", alt: "A traditional feathered cap with embroidered and beaded trim", file: "exh-heritage-cap" },
    { caption: "Baltit Fort Pavilion", alt: "A carved timber pavilion at Baltit Fort with mountains behind", file: "exh-baltit-balcony" },
    { caption: "Altit & the Hunza River", alt: "Altit village above the turquoise Hunza River", file: "exh-altit-gorge" },
    { caption: "Artifacts of the Silk Road", alt: "Shelves of textiles and crafts in a heritage market", file: "exh-market-shelves" },
  ],
  community: [
    { caption: "Polo on the High Meadow", alt: "Riders at a polo match on a mountain meadow with a crowd looking on", file: "community-polo" },
    { caption: "Festival Crowd in Colour", alt: "A crowd gathered in colourful traditional dress", file: "community-crowd" },
    { caption: "Shared Community Feast", alt: "A family-style meal shared on the floor of a timber hall", file: "community-feast" },
    { caption: "Dressed in Festival Colours", alt: "Close view of festival-goers in embroidered headwear and shawls", file: "community-crowd-detail" },
  ],
};

const PHOTOS: Photo[] = CATEGORIES.flatMap((category) =>
  PHOTO_DATA[category.id].map((photo, photoIndex) => ({
    id: `${category.id}-${photoIndex}`,
    category: category.id,
    caption: photo.caption,
    alt: photo.alt,
    src: `${G}/${photo.file}.jpg`,
    featured: photoIndex === 0,
  }))
);

const GALLERY_STATS = [
  { value: "24", label: "Moments Captured" },
  { value: "6", label: "Living Traditions" },
  { value: "3", label: "Days of Color" },
  { value: "1", label: "Festival to Remember" },
];

function LinkIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M10 14a4 4 0 0 0 5.66 0l2.83-2.83a4 4 0 1 0-5.66-5.66L11.5 6.84"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 10a4 4 0 0 0-5.66 0L5.5 12.83a4 4 0 1 0 5.66 5.66l1.34-1.33"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

function GalleryTile({ photo, category, onOpen }: { photo: Photo; category: Category; onOpen: () => void }) {
  const { ref, visible } = useRevealOnScroll<HTMLButtonElement>();
  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      className={`group relative row-span-2 block h-full w-full overflow-hidden rounded-[16px] text-left outline-none transition-[opacity,transform] duration-700 ease-out focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-cream motion-reduce:transition-none ${
        photo.featured ? "col-span-2" : ""
      } ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
    >
      <div className="absolute inset-0 bg-forest/10 transition-transform duration-500 ease-out group-hover:scale-[1.06]">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          quality={80}
          sizes={
            photo.featured
              ? "(min-width: 1024px) 400px, (min-width: 640px) 66vw, 100vw"
              : "(min-width: 1024px) 200px, (min-width: 640px) 33vw, 50vw"
          }
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-night/75 via-transparent to-transparent" />
      {photo.featured && (
        <span className="absolute right-3 top-3 inline-flex items-center rounded-full bg-gold px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-forest">
          Featured
        </span>
      )}
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
        <div className="absolute inset-0 bg-night">
          {/* blurred copy fills the frame; the sharp photo sits whole on top */}
          <Image src={photo.src} alt="" aria-hidden fill sizes="448px" className="scale-110 object-cover opacity-60 blur-2xl" />
          <Image src={photo.src} alt={photo.alt} fill quality={85} sizes="448px" className="object-contain" />
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
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(
    () => (activeCategory ? PHOTOS.filter((p) => p.category === activeCategory) : PHOTOS),
    [activeCategory]
  );

  function navigate(delta: number) {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + delta + filtered.length) % filtered.length);
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable in this context — button simply won't confirm
    }
  }

  return (
    <main className="bg-cream">
      {/* ---------------- Header + Filters + Grid ---------------- */}
      <section className="relative w-full overflow-hidden bg-cream pb-16 pt-12 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <LinkButton
            href="/tours/gilgit-cultural-festival"
            variant="dark"
            className="group gap-2 text-[11px] uppercase tracking-[0.12em]"
          >
            <span className="rotate-180 transition-transform duration-300 ease-out group-hover:-translate-x-1">
              <ArrowIcon size={13} />
            </span>
            Back to the Festival
          </LinkButton>

          {/* filter pills */}
          <div className="mt-8 flex flex-wrap gap-2">
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

          {/* aligned grid — fixed row units so every tile snaps to the same
              rows/columns; featured tiles simply span two columns rather
              than floating independently the way a masonry layout would */}
          <div className="mt-10 grid grid-flow-row-dense grid-cols-2 gap-4 auto-rows-[130px] sm:grid-cols-3 sm:auto-rows-[140px] lg:mt-12 lg:grid-cols-4 lg:auto-rows-[160px]">
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

      {/* ---------------- Behind the Lens + Stats ---------------- */}
      <section className="relative w-full overflow-hidden bg-forest py-16 sm:py-20 lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-gold/10 blur-3xl"
        />
        <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <Reveal>
              <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/50">
                <span className="h-px w-8 bg-cream/30" />
                Behind the lens
              </div>
              <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-cream sm:text-4xl">
                Every frame tells <span className="text-gold">a story</span>
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-cream/65 sm:text-base">
                From the first sword strike of the opening dance to the last shared plate of chapshoro, our
                volunteers and visiting photographers capture the festival exactly as it feels — warm, loud,
                colorful, and deeply human. This gallery grows a little more with every celebration.
              </p>
              <button
                type="button"
                onClick={handleCopyLink}
                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-forest transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-6px_rgba(201,161,90,0.5)] active:translate-y-0 active:scale-[0.97]"
              >
                <LinkIcon size={15} />
                {copied ? "Link Copied!" : "Share This Gallery"}
              </button>
            </Reveal>

            <Reveal delay={120}>
              <div className="grid grid-cols-2 gap-6 rounded-[22px] border border-cream/10 bg-night/40 p-6 sm:p-8">
                {GALLERY_STATS.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-serif text-4xl text-gold sm:text-5xl">{stat.value}</p>
                    <p className="mt-1.5 text-xs leading-snug uppercase tracking-[0.08em] text-cream/60">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Closing CTA ---------------- */}
      <section className="relative w-full overflow-hidden bg-cream py-16 text-center sm:py-20">
        <div className="mx-auto w-full max-w-2xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto mb-5 flex w-fit items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              <span className="h-px w-8 bg-muted/60" />
              Join us
              <span className="h-px w-8 bg-muted/60" />
            </div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-forest sm:text-4xl">
              See it all in person
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              Photos only capture so much — the music, the food, and the warmth of the festival are best
              experienced firsthand.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <LinkButton href="/tours/gilgit-cultural-festival" variant="primary" className="group gap-2">
                Back to the Festival
                <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                  <ArrowIcon size={14} />
                </span>
              </LinkButton>
              <LinkButton href="/tours" variant="dark">
                See All Tours &amp; Events
              </LinkButton>
            </div>
          </Reveal>
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
