"use client";

import Image from "next/image";
import { LinkButton } from "./ui/Button";
import { ArrowIcon, CheckIcon, ClockIcon, CompassIcon, PinIcon } from "./ui/icons";
import { PeaksMotif } from "./tours/motifs";
import { useRevealOnScroll, DestinationCard, LAND_CATEGORY_LABELS, type Destination } from "./DestinationCard";
import TestimonialSection from "./TestimonialSection";
import type { Region } from "@/lib/destinations";
import type { DestinationDetailContent } from "@/lib/destinationDetails";

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function DestinationDetailPage({
  destination,
  content,
  region,
  nearby,
}: {
  destination: Destination;
  content: DestinationDetailContent;
  region?: Region;
  nearby: Destination[];
}) {
  const categoryLabel = destination.category ? LAND_CATEGORY_LABELS[destination.category] : undefined;

  return (
    <main className="bg-cream">
      {/* ---------------- Hero ---------------- */}
      <section className="relative bg-forest">
        <div className="relative min-h-[62svh] w-full sm:min-h-[68svh] md:min-h-[72svh]">
          {/* A shared, generic journeys photo (no baked-in text, unlike the
              per-destination tour placeholders in public/Images/README.md, which
              would collide with the heading below) — the same photo for every
              destination, not this one specifically. Any real photo for this
              destination is still surfaced as the lead tile in the "Photo
              highlights" gallery further down the page. */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="/Images/tours/upcoming-journey.png"
              alt=""
              fill
              priority
              quality={85}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-green-dark/85 via-forest/80 to-night/90" />
            <PeaksMotif className="absolute inset-x-0 bottom-0 h-[45%] w-full text-cream/[0.05]" />
          </div>

          <div className="relative z-10 mx-auto flex min-h-[62svh] max-w-6xl flex-col justify-end px-5 pb-10 pt-28 sm:min-h-[68svh] sm:px-6 sm:pt-32 md:min-h-[72svh] md:pt-36 lg:px-8">
            <LinkButton
              href="/lands"
              variant="dark"
              className="group mb-6 w-fit gap-2 text-[11px] uppercase tracking-[0.12em]"
            >
              <span className="rotate-180 transition-transform duration-300 ease-out group-hover:-translate-x-1">
                <ArrowIcon size={13} />
              </span>
              Back to All Destinations
            </LinkButton>

            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                {region && (
                  <span className="inline-flex items-center rounded-full bg-cream/95 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-green sm:text-xs">
                    {region.label}
                  </span>
                )}
                {categoryLabel && (
                  <span className="inline-flex items-center rounded-full border border-cream/30 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-cream sm:text-xs">
                    {categoryLabel}
                  </span>
                )}
              </div>

              <h1 className="mt-5 font-serif text-[32px] font-semibold leading-[1.1] tracking-tight text-cream sm:text-5xl md:text-[56px]">
                {destination.name}
              </h1>
              <p className="mt-4 max-w-xl text-[13.5px] leading-relaxed text-cream/85 sm:text-base md:text-lg">
                {content.tagline}
              </p>

              <div className="mt-7 flex items-center gap-2.5 text-cream/90">
                <span className="text-green">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M2 20 9.5 7l4 6.5L16 10l6 10H2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-[13px] font-semibold">{destination.altitude} above sea level</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- About + quick facts ---------------- */}
      <section className="relative w-full bg-cream pb-16 pt-14 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px] lg:gap-14">
            <div>
              <Reveal>
                <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                  <span className="h-px w-8 bg-muted/60" />
                  About this destination
                </div>
                <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-forest sm:text-5xl">
                  Why {destination.name} <span className="text-green">is special</span>
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{content.intro}</p>
              </Reveal>

              <Reveal delay={80}>
                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {content.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-start gap-3 rounded-2xl border border-forest/10 bg-white p-4"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green/10 text-green">
                        <CheckIcon size={13} />
                      </span>
                      <p className="text-sm leading-relaxed text-forest/80">{highlight}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* ---------------- Quick facts sidebar ---------------- */}
            <div>
              <Reveal delay={120}>
                <div className="rounded-[22px] border border-forest/10 bg-white p-6 shadow-[0_2px_18px_rgba(18,36,28,0.06)] lg:sticky lg:top-24">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Trip planning</p>
                  <h3 className="mt-1.5 font-serif text-xl text-forest">Quick facts</h3>

                  <dl className="mt-5 space-y-4">
                    <div className="flex items-start gap-3 border-t border-forest/8 pt-4 first:border-t-0 first:pt-0">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green/10 text-green">
                        <PinIcon size={16} />
                      </span>
                      <div>
                        <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">Region</dt>
                        <dd className="mt-0.5 text-sm font-semibold text-forest">{region?.label ?? "Gilgit-Baltistan"}</dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 border-t border-forest/8 pt-4">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green/10 text-green">
                        <ClockIcon size={16} />
                      </span>
                      <div>
                        <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                          Best time to visit
                        </dt>
                        <dd className="mt-0.5 text-sm font-semibold text-forest">{content.bestTime}</dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 border-t border-forest/8 pt-4">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green/10 text-green">
                        <CompassIcon size={16} />
                      </span>
                      <div>
                        <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                          How to reach
                        </dt>
                        <dd className="mt-0.5 text-sm leading-relaxed text-forest">{content.howToReach}</dd>
                      </div>
                    </div>
                  </dl>

                  <LinkButton
                    href="/plan-your-trip"
                    variant="primary"
                    className="group mt-6 w-full justify-center gap-2"
                  >
                    Plan Your Trip
                    <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                      <ArrowIcon size={14} />
                    </span>
                  </LinkButton>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- What it's famous for ---------------- */}
      <section className="relative w-full overflow-hidden bg-forest py-16 sm:py-20 lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-28 top-0 h-[360px] w-[360px] rounded-full bg-gold/10 blur-3xl"
        />
        <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-xl text-center">
              <div className="mx-auto mb-5 flex w-fit items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/50">
                <span className="h-px w-8 bg-cream/30" />
                What it&rsquo;s famous for
                <span className="h-px w-8 bg-cream/30" />
              </div>
              <h2 className="font-serif text-3xl leading-[1.12] tracking-tight text-cream sm:text-4xl">
                The best of <span className="heading-accent">{destination.name}</span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:mt-14 lg:gap-5">
            {content.famousFor.map((item, index) => (
              <Reveal key={item.title} delay={index * 90}>
                <div className="flex h-full flex-col rounded-[18px] border border-cream/10 bg-cream/[0.04] p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 font-serif text-sm text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-serif text-lg leading-snug text-cream">{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-cream/60">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Photo gallery ---------------- */}
      <section className="relative w-full overflow-hidden bg-cream pb-16 pt-14 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              <span className="h-px w-8 bg-muted/60" />
              Scenes from {destination.name}
            </div>
            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-forest sm:text-5xl">
              Photo <span className="text-green">highlights</span>
            </h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:mt-12">
            {destination.image && (
              <Reveal className="col-span-2">
                <div className="group relative aspect-[16/11] overflow-hidden rounded-[18px] sm:aspect-[8/5]">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    quality={85}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    style={destination.focus ? { objectPosition: destination.focus } : undefined}
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/75 via-night/5 to-transparent" />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-gold/95 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-forest">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2 14.9 8.9 22 9.5 16.7 14.1 18.2 21 12 17.3 5.8 21 7.3 14.1 2 9.5 9.1 8.9 12 2Z" />
                    </svg>
                    Featured
                  </span>
                  <span className="absolute inset-x-4 bottom-4 font-serif text-lg leading-snug text-cream sm:text-xl">
                    {destination.name}
                  </span>
                </div>
              </Reveal>
            )}
            {content.gallery.map((photo, index) => {
              const isWide = Boolean(destination.image) && index >= 2;
              return (
                <Reveal
                  key={photo.caption}
                  delay={(index % 4) * 80}
                  className={isWide ? "sm:col-span-2" : undefined}
                >
                  <div
                    className={`group relative overflow-hidden rounded-[18px] ${
                      isWide ? "aspect-[4/5] sm:aspect-[8/5]" : "aspect-[4/5]"
                    }`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${photo.from} ${photo.to} transition-transform duration-500 ease-out group-hover:scale-[1.06]`}
                    >
                      <PeaksMotif className="absolute inset-x-0 bottom-0 h-2/3 w-full p-4 text-cream/15" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
                    <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-night/50 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-cream/85 backdrop-blur-sm">
                      {photo.tag}
                    </span>
                    <span className="absolute inset-x-3 bottom-3 font-serif text-sm leading-snug text-cream sm:text-base">
                      {photo.caption}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Pull quote ---------------- */}
      <TestimonialSection
        eyebrow={`In their words: ${destination.name}`}
        testimonials={[{ quote: content.quote, author: content.quoteAuthor }]}
      />

      {/* ---------------- Nearby destinations ---------------- */}
      {nearby.length > 0 && (
        <section className="relative w-full bg-cream pb-16 pt-14 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                <span className="h-px w-8 bg-muted/60" />
                Keep exploring
              </div>
              <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-forest sm:text-5xl">
                Nearby in {region?.label ?? "the region"}
              </h2>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
              {nearby.map((item, index) => (
                <DestinationCard key={item.id} destination={item} index={index} delay={(index % 3) * 90} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- Closing CTA ---------------- */}
      <section className="relative w-full overflow-hidden bg-forest py-16 text-center sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-0 h-[340px] w-[340px] rounded-full bg-gold/10 blur-3xl"
        />
        <div className="relative mx-auto w-full max-w-2xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto mb-5 flex w-fit items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/50">
              <span className="h-px w-8 bg-cream/30" />
              Ready when you are
              <span className="h-px w-8 bg-cream/30" />
            </div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-cream sm:text-4xl">
              Ready to visit <span className="heading-accent">{destination.name}?</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-cream/70 sm:text-base">
              Tell us what you&rsquo;re dreaming of and a local trip planner will shape the rest around you.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <LinkButton href="/plan-your-trip" variant="outline" className="group gap-2">
                Plan Your Trip
                <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                  <ArrowIcon size={14} />
                </span>
              </LinkButton>
              <LinkButton href="/lands" variant="dark">
                See All Destinations
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
