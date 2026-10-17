import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { DestinationCard } from "../DestinationCard";
import BlogCard from "../BlogCard";
import JsonLd from "../JsonLd";
import { LinkButton } from "../ui/Button";
import Slider from "../ui/Slider";
import SectionHeader from "../ui/SectionHeader";
import { ArrowIcon, CalendarIcon, CheckIcon, ClockIcon, PinIcon } from "../ui/icons";
import { PeaksMotif } from "../tours/motifs";
import { DISTRICT_ICONS } from "./icons";
import Reveal from "./Reveal";
import type { District, DistrictImage } from "@/lib/districts";
import {
  getAltitudeRange,
  getDistrictEvents,
  getDistrictPlaces,
  getDistrictPosts,
  getDistrictTours,
} from "@/lib/districtQueries";
import { districtBreadcrumbs, districtJsonLd } from "@/lib/districtSeo";
import { breadcrumbJsonLd } from "@/lib/seo";

/**
 * The district / region page template. Everything on it comes from one entry
 * in lib/districts.ts plus the site's own destination, tour, event and blog
 * data (see lib/districtQueries.ts) — there is no per-district code.
 *
 * Section order: hero · why visit · traditions · culture · food · best spots ·
 * upcoming tours & events · travel tips · related reading · closing call to
 * action. Sections that have nothing to show (tours, events, articles) are left
 * out rather than rendered empty.
 */

const CARD =
  "rounded-[1.375rem] border border-forest/10 bg-white shadow-[0_0.125rem_1.125rem_rgba(18,36,28,0.05)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-gold/30 hover:shadow-[0_1.25rem_2.5rem_-1rem_rgba(18,36,28,0.18)] motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const GOLD_BUTTON =
  "group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-sans text-sm font-semibold text-forest transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-gold/90 active:translate-y-0 active:scale-[0.97]";

function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <div
      className={`mb-3 flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] lg:mb-[1.2vh] ${
        tone === "dark" ? "text-cream/60" : "text-muted"
      }`}
    >
      <span className={`h-px w-8 ${tone === "dark" ? "bg-cream/30" : "bg-muted/60"}`} />
      {children}
    </div>
  );
}

function Heading({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <h2
      className={`section-title font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl ${
        tone === "dark" ? "text-cream" : "text-forest"
      }`}
    >
      {children}
    </h2>
  );
}

function SectionHead({
  eyebrow,
  tone = "light",
  heading,
  intro,
  aside,
}: {
  eyebrow: string;
  tone?: "light" | "dark";
  heading: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <Reveal>
      <SectionHeader eyebrow={eyebrow} tone={tone} heading={heading} intro={intro} actions={aside} />
    </Reveal>
  );
}

/** A photo with the offset gold frame used on the Our Story section. */
function FramedPhoto({ image, className = "" }: { image: DistrictImage; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 rounded-[1.75rem] border border-gold/35 sm:translate-x-4 sm:translate-y-4"
      />
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] bg-forest">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          quality={85}
          sizes="(min-width: 1024px) 560px, 100vw"
          style={image.focus ? { objectPosition: image.focus } : undefined}
          className="object-cover"
        />
      </div>
    </div>
  );
}

export default function DistrictPage({ district }: { district: District }) {
  const places = getDistrictPlaces(district);
  const altitude = getAltitudeRange(places);
  const tours = getDistrictTours(district);
  const events = getDistrictEvents(district);
  const posts = getDistrictPosts(district);

  const facts = [
    { label: "Region", value: district.regionLabel },
    { label: "Main town", value: district.mainTown },
    ...(altitude ? [{ label: "Altitude", value: altitude }] : []),
    { label: "Best time", value: district.bestTime },
  ];

  const foodTip = district.food.tip ? (
    <aside className="relative flex gap-3 overflow-hidden rounded-[1.375rem] border border-gold/30 bg-gold/[0.07] p-4">
      <span aria-hidden className="absolute inset-y-0 left-0 w-[0.1875rem] bg-gold" />
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-white/60 text-gold">
        <PinIcon size={16} />
      </span>
      <div>
        <h3 className="font-serif text-lg text-forest">Where to try</h3>
        <p className="mt-1 text-sm leading-[1.5] text-forest/80">{district.food.tip}</p>
      </div>
    </aside>
  ) : null;

  return (
    <main className="bg-cream">
      <JsonLd data={[districtJsonLd(district, places), breadcrumbJsonLd(districtBreadcrumbs(district))]} />

      {/* ---------------- 1. Hero ---------------- */}
      <header className="relative overflow-hidden bg-forest">
        <div className="absolute inset-0 z-0">
          <Image
            src={district.hero.src}
            alt={district.hero.alt}
            fill
            priority
            quality={90}
            sizes="100vw"
            style={district.hero.focus ? { objectPosition: district.hero.focus } : undefined}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/45 via-forest/20 to-forest/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/55 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[max(82svh,32.5rem)] max-w-7xl flex-col justify-end px-5 pb-12 pt-36 sm:min-h-[max(86svh,32.5rem)] sm:px-6 sm:pb-14 sm:pt-40 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-auto">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-cream/75">
              <li>
                <Link href="/" className="transition-colors duration-300 hover:text-cream">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-cream/40">
                /
              </li>
              <li>
                <Link href="/lands" className="transition-colors duration-300 hover:text-cream">
                  Destinations
                </Link>
              </li>
              <li aria-hidden className="text-cream/40">
                /
              </li>
              <li aria-current="page" className="text-cream">
                {district.name}
              </li>
            </ol>
          </nav>

          <div className="mt-10 max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-cream/95 px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-green sm:text-xs">
              District guide
            </span>
            <h1 className="mt-5 font-serif text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-cream [text-shadow:0_0.125rem_1rem_rgba(0,0,0,0.5)] sm:text-6xl md:text-7xl">
              {district.name}
            </h1>
            <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-cream/90 [text-shadow:0_0.0625rem_0.625rem_rgba(0,0,0,0.5)] sm:text-lg md:text-xl">
              {district.tagline}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <LinkButton href="/plan-your-trip" className="group">
                Plan your trip
                <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                  <ArrowIcon size={14} />
                </span>
              </LinkButton>
              <LinkButton href="#spots" variant="outline">
                See the best spots
              </LinkButton>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4 head-gap">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl border border-cream/15 bg-night/45 px-4 py-3 backdrop-blur-md"
              >
                <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gold">{fact.label}</dt>
                <dd className="mt-1 font-serif text-base leading-snug text-cream sm:text-lg">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* ---------------- 2. Why visit ---------------- */}
      <section id="why" className="relative bg-cream section-y">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHead
            eyebrow="Why visit"
            heading={
              <>
                Why visit <span className="text-green">{district.shortName}</span>
              </>
            }
            intro={
              <>
                {district.why.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </>
            }
          />

          <Slider label="highlights">
            {district.why.highlights.map((item, index) => {
              const Icon = DISTRICT_ICONS[item.icon];
              return (
                <li key={item.title}>
                  <Reveal delay={(index % 3) * 70} className="h-full">
                    <div className={`group h-full p-6 ${CARD}`}>
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green/10 text-green transition-colors duration-300 group-hover:bg-green group-hover:text-white">
                        <Icon size={20} />
                      </span>
                      <h3 className="mt-3 font-serif text-xl text-forest sm:text-[1.375rem]">{item.title}</h3>
                      <p className="mt-2 text-[0.9375rem] leading-[1.55] text-muted">{item.text}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </Slider>
        </div>
      </section>

      {/* ---------------- 3. Traditions ---------------- */}
      <section id="traditions" className="relative overflow-hidden bg-night text-cream section-y">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-1/4 h-[26.25rem] w-[26.25rem] rounded-full bg-green/10 blur-3xl"
        />
        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal className="order-2 lg:order-1">
              <FramedPhoto image={district.traditions.image} />
            </Reveal>
            <Reveal delay={80} className="order-1 lg:order-2">
              <Eyebrow tone="dark">Traditions</Eyebrow>
              <Heading tone="dark">
                Customs of the <span className="heading-accent">valley</span>
              </Heading>
              <p className="mt-3 max-w-xl text-[0.9375rem] leading-[1.55] text-cream/70 sm:text-base lg:mt-[1.5vh]">
                {district.traditions.intro}
              </p>
            </Reveal>
          </div>

          <Slider label="traditions" spaced>
            {district.traditions.items.map((item, index) => (
              <li key={item.title}>
                <Reveal delay={(index % 3) * 70} className="h-full">
                  <div className="h-full rounded-[1.375rem] border border-cream/10 bg-cream/[0.04] transition-colors duration-300 hover:border-gold/30 hover:bg-cream/[0.06] p-5 sm:p-6">
                    <span className="font-serif text-[0.6875rem] text-gold">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="mt-2 font-serif text-xl text-cream sm:text-[1.375rem]">{item.title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-[1.55] text-cream/70">{item.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </Slider>
        </div>
      </section>

      {/* ---------------- 4. Culture ---------------- */}
      <section id="culture" className="relative bg-cream section-y">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <Reveal>
              <Eyebrow>Culture</Eyebrow>
              <Heading>
                People, language &amp; <span className="text-green">heritage</span>
              </Heading>
              <p className="mt-3 max-w-xl text-[0.9375rem] leading-[1.55] text-muted sm:text-base lg:mt-[1.5vh]">{district.culture.intro}</p>
            </Reveal>
            <Reveal delay={80}>
              <FramedPhoto image={district.culture.image} />
            </Reveal>
          </div>

          <Slider label="culture" spaced>
            {district.culture.items.map((item, index) => (
              <li key={item.title}>
                <Reveal delay={(index % 2) * 70} className="h-full">
                  <div className={`h-full p-6 sm:p-7 ${CARD}`}>
                    <h3 className="font-serif text-xl text-forest sm:text-[1.375rem]">{item.title}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-[1.55] text-muted sm:text-[0.9375rem]">{item.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </Slider>
        </div>
      </section>

      {/* ---------------- 5. Food ---------------- */}
      <section id="food" className="relative bg-white section-y">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHead
            eyebrow="Food"
            heading={
              <>
                What to <span className="text-green">taste</span>
              </>
            }
            intro={district.food.intro}
            aside={foodTip && <div className="hidden lg:block">{foodTip}</div>}
          />

          <Slider label="dishes">
            {district.food.items.map((dish, index) => (
              <li key={dish.name}>
                <Reveal delay={(index % 3) * 70} className="h-full">
                  <article className="group flex h-full flex-col overflow-hidden rounded-[1.375rem] bg-cream shadow-[0_0.125rem_1.125rem_rgba(18,36,28,0.06)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_1.375rem_2.75rem_-1.125rem_rgba(18,36,28,0.22)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                    <div className="relative aspect-[4/3] min-h-[15rem] w-full overflow-hidden bg-forest">
                      <Image
                        src={dish.image.src}
                        alt={dish.image.alt}
                        fill
                        quality={85}
                        sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl leading-tight text-forest sm:text-2xl">{dish.name}</h3>
                      <p className="mt-2 text-[0.9375rem] leading-[1.55] text-muted">{dish.text}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </Slider>

          {foodTip && <div className="mt-6 lg:hidden">{foodTip}</div>}
        </div>
      </section>

      {/* ---------------- 6. Best spots ---------------- */}
      {places.length > 0 && (
        <section id="spots" className="relative bg-cream section-y">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionHead
              eyebrow="Places"
              heading={
                <>
                  Best spots in <span className="text-green">{district.shortName}</span>
                </>
              }
              intro="Each place has its own guide, with photos, practical tips and the best time to go."
            />

            <Slider as="div" label="places" className="card-grid-loose">
              {places.map((place, index) => (
                <DestinationCard key={place.id} destination={place} index={index} delay={(index % 3) * 90} />
              ))}
            </Slider>
          </div>
        </section>
      )}

      {/* ---------------- 7. Upcoming tours and events ---------------- */}
      {(tours.length > 0 || events.length > 0) && (
        <section id="tours" className="relative bg-white section-y">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionHead
              eyebrow="Coming up"
              heading={
                <>
                  Upcoming in <span className="text-green">{district.shortName}</span>
                </>
              }
            />

            <Slider label="tours and events">
              {tours.map(({ tour, image }, index) => (
                <li key={tour.slug}>
                  <Reveal delay={(index % 3) * 70} className="h-full">
                    <Link
                      href={tour.href}
                      className="group flex h-full flex-col overflow-hidden rounded-[1.375rem] bg-cream shadow-[0_0.125rem_1.125rem_rgba(18,36,28,0.06)] outline-none transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_1.375rem_2.75rem_-1.125rem_rgba(18,36,28,0.22)] focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-4 focus-visible:ring-offset-white motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    >
                      {image && (
                        <div className="relative aspect-[4/3] min-h-[15rem] w-full overflow-hidden bg-forest">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            quality={85}
                            sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                          />
                          <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-gold px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-forest">
                            Tour
                          </span>
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="font-serif text-xl leading-tight text-forest sm:text-[1.375rem]">{tour.title}</h3>
                        <ul className="mt-4 space-y-1.5 text-sm text-forest/80">
                          <li className="flex items-center gap-2">
                            <span className="text-green">
                              <CalendarIcon size={15} />
                            </span>
                            {tour.dateRange}
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-green">
                              <ClockIcon size={15} />
                            </span>
                            {tour.duration} · {tour.level}
                          </li>
                        </ul>
                        <p className="mt-5 flex items-center justify-between gap-3 border-t border-forest/10 pt-4 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-green">
                          <span>{tour.price ? `From ${tour.price}` : "View the tour"}</span>
                          <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                            <ArrowIcon size={13} />
                          </span>
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                </li>
              ))}

              {events.map(({ event, datesLabel }, index) => (
                <li key={event.slug}>
                  <Reveal delay={((tours.length + index) % 3) * 70} className="h-full">
                    <Link
                      href={event.href}
                      className="group flex h-full flex-col rounded-[1.375rem] bg-forest text-cream shadow-[0_0.125rem_1.125rem_rgba(18,36,28,0.06)] outline-none transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_1.375rem_2.75rem_-1.125rem_rgba(18,36,28,0.3)] focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-4 focus-visible:ring-offset-white motion-reduce:transition-none motion-reduce:hover:translate-y-0 p-5 sm:p-6"
                    >
                      <span className="inline-flex w-fit items-center rounded-full bg-gold px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-forest">
                        Event
                      </span>
                      <h3 className="mt-3 font-serif text-xl leading-tight sm:text-[1.375rem]">{event.title}</h3>
                      <ul className="mt-4 space-y-1.5 text-sm text-cream/80">
                        <li className="flex items-center gap-2">
                          <span className="text-gold">
                            <CalendarIcon size={15} />
                          </span>
                          {datesLabel}
                        </li>
                        {event.location && (
                          <li className="flex items-center gap-2">
                            <span className="text-gold">
                              <PinIcon size={15} />
                            </span>
                            {event.location}
                          </li>
                        )}
                      </ul>
                      <p className="mt-auto flex items-center justify-between gap-3 border-t border-cream/10 pt-4 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gold">
                        <span>Event details</span>
                        <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                          <ArrowIcon size={13} />
                        </span>
                      </p>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </Slider>
          </div>
        </section>
      )}

      {/* ---------------- 8. Travel tips ---------------- */}
      <section id="tips" className="relative overflow-hidden bg-forest text-cream section-y">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-28 top-0 h-[23.75rem] w-[23.75rem] rounded-full bg-gold/10 blur-3xl"
        />
        <PeaksMotif className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 w-full text-cream/[0.04]" />
        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHead
            eyebrow="Travel tips"
            tone="dark"
            heading={
              <>
                Before you <span className="heading-accent">go</span>
              </>
            }
          />

          <Slider as="div" label="travel tips">
            <Reveal className="h-full">
              <div className="h-full rounded-[1.375rem] border border-cream/10 bg-cream/[0.04] p-5 sm:p-6">
                <h3 className="font-serif text-xl text-cream sm:text-2xl">Best time to visit</h3>
                <ul className="mt-5 space-y-4">
                  {district.travelTips.bestTime.map((entry) => (
                    <li key={entry.season} className="flex gap-4">
                      <span className="w-24 shrink-0">
                        <span className="block font-serif text-lg text-gold">{entry.season}</span>
                        <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-cream/50">
                          {entry.months}
                        </span>
                      </span>
                      <span className="text-sm leading-relaxed text-cream/75">{entry.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={70} className="h-full">
              <div className="h-full rounded-[1.375rem] border border-cream/10 bg-cream/[0.04] p-5 sm:p-6">
                <h3 className="font-serif text-xl text-cream sm:text-2xl">How to get there</h3>
                <p className="mt-4 text-[0.9375rem] leading-[1.55] text-cream/75">{district.travelTips.gettingThere.intro}</p>
                <ul className="mt-4 space-y-3">
                  {district.travelTips.gettingThere.steps.map((step) => (
                    <li key={step} className="flex items-start gap-3 text-sm leading-relaxed text-cream/75">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal className="h-full">
              <div className="h-full rounded-[1.375rem] border border-cream/10 bg-cream/[0.04] p-5 sm:p-6">
                <h3 className="font-serif text-xl text-cream sm:text-2xl">What to pack</h3>
                <ul className="mt-5 space-y-3">
                  {district.travelTips.pack.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-cream/75">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                        <CheckIcon size={11} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={70} className="h-full">
              <div className="h-full rounded-[1.375rem] border border-cream/10 bg-cream/[0.04] p-5 sm:p-6">
                <h3 className="font-serif text-xl text-cream sm:text-2xl">Being a respectful visitor</h3>
                <ul className="mt-5 space-y-3">
                  {district.travelTips.respect.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-cream/75">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </Slider>
        </div>
      </section>

      {/* ---------------- 9. Related reading ---------------- */}
      {posts.length > 0 && (
        <section id="reading" className="relative bg-cream section-y">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionHead
              eyebrow="Related reading"
              heading={
                <>
                  From the <span className="text-green">journal</span>
                </>
              }
            />

            <Slider as="div" label="articles" className="card-grid-loose">
              {posts.map((post, index) => (
                <BlogCard key={post.slug} post={post} delay={(index % 3) * 90} />
              ))}
            </Slider>
          </div>
        </section>
      )}

      {/* ---------------- 10. Closing call to action ---------------- */}
      <section className="relative w-full overflow-hidden">
        <div className="relative min-h-[27.5rem] w-full bg-night sm:min-h-[30rem]">
          <Image
            src={district.cta.image.src}
            alt={district.cta.image.alt}
            fill
            quality={85}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-night/90 via-night/60 to-night/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-night/50 via-transparent to-transparent" />

          <div className="relative z-10 mx-auto flex min-h-[27.5rem] w-full max-w-7xl items-center px-5 sm:min-h-[30rem] sm:px-6 lg:px-8">
            <div className="section-y max-w-xl">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-gold">Ready when you are</p>
              <h2 className="mt-3 font-serif text-3xl leading-[1.1] tracking-tight text-cream sm:text-4xl lg:text-[2.75rem]">
                {district.cta.heading}
              </h2>
              <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-cream/80 sm:text-base">{district.cta.text}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/plan-your-trip" className={GOLD_BUTTON}>
                  Plan Your Trip
                  <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                    <ArrowIcon size={14} />
                  </span>
                </Link>
                <LinkButton href="/tours" variant="outline">
                  Browse tours
                </LinkButton>
                <Link
                  href="/book"
                  className="px-2 py-3 text-sm font-semibold text-cream/80 underline decoration-cream/30 underline-offset-4 transition-colors duration-300 hover:text-cream"
                >
                  Reserve a spot
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
