"use client";

import jsPDF from "jspdf";
import { LinkButton } from "./ui/Button";
import { ArrowIcon, ClockIcon, PinIcon, UsersIcon, GaugeIcon, DownloadIcon } from "./ui/icons";
import { useRevealOnScroll } from "./DestinationCard";
import { PeaksMotif, PeakZigzagMotif, MOTIF_COMPONENTS } from "./tours/motifs";
import { STAT_ICON_COMPONENTS } from "./tours/statIcons";
import type { TourDetail } from "@/lib/tourDetails";

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

const DAY_WORDS: Record<number, string> = {
  1: "One",
  2: "Two",
  3: "Three",
  4: "Four",
  5: "Five",
  6: "Six",
  7: "Seven",
  8: "Eight",
};

/* ---------------------------------------------------------------------
   Hero — same structural rhythm as the shared Hero component, but with
   a bespoke, theme-driven decorative background (no photography exists
   for these tours yet) and a trip facts strip in place of a generic
   secondary CTA.
   --------------------------------------------------------------------- */
function TourHero({ tour }: { tour: TourDetail }) {
  const Motif = MOTIF_COMPONENTS[tour.theme.motif];

  return (
    <section className="relative bg-forest">
      <div className="relative min-h-[76svh] w-full sm:min-h-[82svh] md:min-h-[86svh]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className={`h-full w-full bg-gradient-to-br ${tour.theme.heroFrom} via-forest to-night`} />
          <div
            aria-hidden
            className={`pointer-events-none absolute -left-24 top-16 h-[420px] w-[420px] rounded-full ${tour.theme.blob} blur-3xl`}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-1/3 h-[360px] w-[360px] rounded-full bg-gold/10 blur-3xl"
          />
          <PeaksMotif className="absolute inset-x-0 bottom-0 h-[45%] w-full text-cream/[0.05]" />
          <Motif
            className={`absolute right-4 top-20 h-32 w-32 text-cream/30 sm:right-10 sm:h-44 sm:w-44 md:top-16 md:h-56 md:w-56`}
          />
          <Motif className="absolute -left-6 bottom-8 h-28 w-28 rotate-[200deg] text-cream/20 sm:h-36 sm:w-36" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/50 via-transparent to-forest/20" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[76svh] max-w-6xl flex-col justify-center px-5 pt-28 pb-16 sm:min-h-[82svh] sm:px-6 sm:pb-20 sm:pt-32 md:min-h-[86svh] md:pb-24 md:pt-36 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-cream/95 px-4 py-1.5 text-[10px] font-semibold tracking-wide text-green sm:text-xs">
              {tour.badge}
            </span>

            <h1 className="mt-5 font-serif text-[30px] font-semibold leading-[1.12] tracking-tight text-cream sm:mt-6 sm:text-5xl md:text-[56px]">
              {tour.title}
              <br />
              <span className="heading-accent">{tour.heroAccentLine}</span>
            </h1>

            <p className="mt-5 max-w-xl text-[13.5px] leading-relaxed text-cream/85 sm:mt-6 sm:text-base md:text-lg">
              {tour.heroDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-cream/15 pt-6 sm:mt-9">
              <div className="flex items-center gap-2.5 text-cream/90">
                <ClockIcon size={16} />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-cream/50">Duration</p>
                  <p className="text-[13px] font-semibold">{tour.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-cream/90">
                <PinIcon size={16} />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-cream/50">Start / End</p>
                  <p className="text-[13px] font-semibold">{tour.route}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-cream/90">
                <UsersIcon size={16} />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-cream/50">Group Size</p>
                  <p className="text-[13px] font-semibold">{tour.groupSize}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-cream/90">
                <GaugeIcon size={16} />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-cream/50">Physical Level</p>
                  <p className="text-[13px] font-semibold">{tour.level}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------
   Sidebar — trip overview card with a real, working "Download
   Itinerary" feature: a branded, multi-section PDF (not a plain text
   dump) built with jsPDF, covering trip facts, the overview, guides,
   and the full day-by-day itinerary.
   --------------------------------------------------------------------- */
const PDF_COLORS = {
  forest: [20, 35, 31] as const,
  night: [7, 23, 25] as const,
  green: [31, 106, 76] as const,
  gold: [201, 161, 90] as const,
  cream: [246, 241, 231] as const,
  muted: [107, 118, 113] as const,
  body: [45, 55, 51] as const,
};

function TripOverviewCard({ tour }: { tour: TourDetail }) {
  const Motif = MOTIF_COMPONENTS[tour.theme.motif];

  function handleDownloadItinerary() {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = 210;
    const pageHeight = 297;
    const marginX = 18;
    const contentWidth = pageWidth - marginX * 2;
    let y = 0;

    const setColor = (fn: "setTextColor" | "setFillColor" | "setDrawColor", c: readonly [number, number, number]) =>
      doc[fn](c[0], c[1], c[2]);

    // jsPDF's built-in fonts only support WinAnsi/Latin-1, so "→" renders
    // as garbage glyphs — swap it for plain ASCII wherever PDF text is built.
    const pdfSafe = (s: string) => s.replace(/→/g, "to");

    function ensureSpace(needed: number) {
      if (y + needed > pageHeight - 22) {
        doc.addPage();
        y = 22;
      }
    }

    // ---- Header band ----
    setColor("setFillColor", PDF_COLORS.forest);
    doc.rect(0, 0, pageWidth, 46, "F");

    setColor("setTextColor", PDF_COLORS.cream);
    doc.setFont("times", "bold");
    doc.setFontSize(23);
    doc.text(tour.title, marginX, 20);

    setColor("setTextColor", PDF_COLORS.gold);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(tour.tagline.toUpperCase(), marginX, 28);

    setColor("setTextColor", [225, 222, 214]);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(tour.dateRange, marginX, 38);
    doc.text(`Starting from ${tour.price} / person`, pageWidth - marginX, 38, { align: "right" });

    y = 60;

    // ---- Trip facts row ----
    const facts: [string, string][] = [
      ["Duration", tour.duration],
      ["Route", pdfSafe(tour.route)],
      ["Group Size", tour.groupSize],
      ["Physical Level", tour.level],
    ];
    const colWidth = contentWidth / facts.length;
    let maxFactLines = 1;
    facts.forEach(([label, value], i) => {
      const x = marginX + i * colWidth;
      setColor("setTextColor", PDF_COLORS.muted);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.text(label.toUpperCase(), x, y);

      setColor("setTextColor", PDF_COLORS.forest);
      doc.setFont("times", "bold");
      doc.setFontSize(12.5);
      // Wrap within the column (minus a little breathing room) instead of
      // overflowing into the next column when a value is long, e.g. "Route".
      const valueLines: string[] = doc.splitTextToSize(value, colWidth - 6);
      doc.text(valueLines, x, y + 7);
      maxFactLines = Math.max(maxFactLines, valueLines.length);
    });

    y += 10 + maxFactLines * 6;
    setColor("setDrawColor", [225, 219, 205]);
    doc.setLineWidth(0.3);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 11;

    // ---- About ----
    setColor("setTextColor", PDF_COLORS.forest);
    doc.setFont("times", "bold");
    doc.setFontSize(14);
    doc.text("About This Journey", marginX, y);
    y += 7;

    setColor("setTextColor", PDF_COLORS.body);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    const aboutLines: string[] = doc.splitTextToSize(pdfSafe(tour.aboutText), contentWidth);
    doc.text(aboutLines, marginX, y);
    y += aboutLines.length * 4.6 + 12;

    // ---- Guides ----
    setColor("setTextColor", PDF_COLORS.forest);
    doc.setFont("times", "bold");
    doc.setFontSize(14);
    doc.text("Your Local Guides", marginX, y);
    y += 8;

    tour.guides.forEach((guide) => {
      ensureSpace(14);
      setColor("setFillColor", PDF_COLORS.green);
      doc.circle(marginX + 3, y - 1, 3, "F");
      setColor("setTextColor", PDF_COLORS.cream);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.text(
        guide.name
          .split(" ")
          .map((w) => w[0])
          .join(""),
        marginX + 3,
        y - 1,
        { align: "center", baseline: "middle" }
      );

      setColor("setTextColor", PDF_COLORS.forest);
      doc.setFont("times", "bold");
      doc.setFontSize(10.5);
      doc.text(guide.name, marginX + 10, y);

      setColor("setTextColor", PDF_COLORS.green);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.text(guide.role.toUpperCase(), marginX + 10, y + 4.5);

      y += 11;
    });

    y += 3;

    // ---- Itinerary ----
    ensureSpace(18);
    setColor("setTextColor", PDF_COLORS.forest);
    doc.setFont("times", "bold");
    doc.setFontSize(14);
    const dayWord = DAY_WORDS[tour.itinerary.length] ?? String(tour.itinerary.length);
    doc.text(`${dayWord}-Day Itinerary`, marginX, y);
    y += 10;

    tour.itinerary.forEach((day, index) => {
      const descLines: string[] = doc.splitTextToSize(pdfSafe(day.description), contentWidth - 13);
      ensureSpace(11 + descLines.length * 4.4 + 7);

      setColor("setFillColor", PDF_COLORS.forest);
      doc.circle(marginX + 3.2, y, 3.2, "F");
      setColor("setTextColor", PDF_COLORS.cream);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.text(String(index + 1), marginX + 3.2, y, { align: "center", baseline: "middle" });

      setColor("setTextColor", PDF_COLORS.forest);
      doc.setFont("times", "bold");
      doc.setFontSize(11.5);
      doc.text(`${day.day} — ${pdfSafe(day.title)}`, marginX + 11, y + 1);

      setColor("setTextColor", PDF_COLORS.green);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.text(day.tag.toUpperCase(), marginX + 11, y + 6);

      setColor("setTextColor", PDF_COLORS.body);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(descLines, marginX + 11, y + 11.5);

      y += 11.5 + descLines.length * 4.4 + 7;
    });

    // ---- Footer on every page ----
    const pageCount = doc.getNumberOfPages();
    for (let p = 1; p <= pageCount; p++) {
      doc.setPage(p);
      setColor("setDrawColor", [225, 219, 205]);
      doc.line(marginX, pageHeight - 16, pageWidth - marginX, pageHeight - 16);
      setColor("setTextColor", PDF_COLORS.muted);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text(`Discover Gilgit — ${tour.title}`, marginX, pageHeight - 10);
      doc.text(`Page ${p} of ${pageCount}`, pageWidth - marginX, pageHeight - 10, { align: "right" });
    }

    doc.save(`${tour.slug}-itinerary.pdf`);
  }

  return (
    <div className="overflow-hidden rounded-[22px] border border-forest/10 bg-white shadow-[0_2px_18px_rgba(18,36,28,0.07)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-forest to-night">
        <PeaksMotif className="absolute inset-x-0 bottom-0 h-2/3 w-full text-cream/10" />
        <Motif className="absolute right-2 top-4 h-24 w-24 text-cream/30" />
        <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-cream/15 bg-night/50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-cream/70 backdrop-blur-sm">
          Photo coming soon
        </span>
      </div>

      <div className="p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Trip Overview</p>

        <dl className="mt-4 space-y-3.5">
          {[
            ["Dates", tour.dateRange],
            ["Duration", tour.duration],
            ["Route", tour.route],
            ["Season", tour.season],
            ["Group Size", tour.groupSize],
            ["Physical Level", tour.level],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-3 border-t border-forest/8 pt-3.5 first:border-t-0 first:pt-0">
              <dt className="text-xs text-muted">{label}</dt>
              <dd className="text-right text-[13px] font-semibold text-forest">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex items-baseline justify-between border-t border-forest/8 pt-4">
          <span className="text-xs text-muted">Starting from</span>
          <span className="font-serif text-2xl text-forest">
            {tour.price}
            <span className="ml-1 text-xs font-sans font-normal text-muted">/ person</span>
          </span>
        </div>

        <LinkButton href="/#contact" variant="primary" className="group mt-5 w-full gap-2">
          Reserve Your Spot
          <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
            <ArrowIcon size={14} />
          </span>
        </LinkButton>

        <button
          type="button"
          onClick={handleDownloadItinerary}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-forest/15 px-5 py-3 text-sm font-semibold text-forest transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-forest/30 active:translate-y-0 active:scale-[0.97]"
        >
          <DownloadIcon size={15} />
          Download Itinerary
        </button>
      </div>
    </div>
  );
}

export default function TourDetailPage({ tour }: { tour: TourDetail }) {
  const AccentMotif = MOTIF_COMPONENTS[tour.theme.motif];

  return (
    <main className="bg-cream">
      <TourHero tour={tour} />

      {/* ---------------- About + Guides + Itinerary (main) / Trip Overview (sidebar) ----------------
           No overflow-hidden here: it would silence position:sticky on the
           Trip Overview sidebar (a hidden ancestor with clipped overflow
           breaks sticky positioning). Nothing in this section needs
           clipping — the decorative accent's slight bleed is fine inside
           the section's own padding. */}
      <section className="relative w-full bg-cream pb-16 pt-14 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_340px] lg:gap-14">
            <div className="relative">
              <AccentMotif
                className={`pointer-events-none absolute -right-6 -top-10 hidden h-32 w-32 opacity-25 lg:block ${tour.theme.motifTint}`}
              />

              {/* About */}
              <Reveal>
                <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                  <span className="h-px w-8 bg-muted/60" />
                  {tour.aboutEyebrow}
                </div>
                <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-forest sm:text-5xl">
                  {tour.aboutHeadingLine1}
                  <br />
                  <span className="text-green">{tour.aboutHeadingLine2}</span>
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{tour.aboutText}</p>
              </Reveal>

              {/* Stats */}
              <Reveal delay={100}>
                <div className="relative mt-8 rounded-[22px] border border-forest/10 bg-white p-6 sm:p-7">
                  <div className="flex flex-col gap-5 border-b border-forest/8 pb-6 sm:flex-row sm:items-center sm:gap-8">
                    <div className="sm:flex-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-green">
                        {tour.statsEyebrow}
                      </p>
                      <h3 className="mt-1.5 font-serif text-xl leading-tight text-forest sm:text-2xl">
                        {tour.statsHeading}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted sm:max-w-[220px] sm:shrink-0 sm:border-l sm:border-forest/10 sm:pl-8">
                      {tour.statsDescription}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-8 pt-7 sm:grid-cols-4 sm:divide-x sm:divide-forest/8">
                    {tour.stats.map((stat) => {
                      const Icon = STAT_ICON_COMPONENTS[stat.iconId];
                      return (
                        <div key={stat.label} className="group sm:pl-6 sm:first:pl-0">
                          <span
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${tour.theme.statIconBg} ${tour.theme.statIconText} ${tour.theme.statIconHoverBg} transition-colors duration-300 group-hover:text-white`}
                          >
                            <Icon size={17} />
                          </span>
                          <p className="mt-3 whitespace-nowrap font-serif text-2xl text-forest sm:text-4xl">
                            {stat.value}
                          </p>
                          <p className="mt-1.5 min-h-[32px] text-xs uppercase leading-snug tracking-[0.08em] text-muted">
                            {stat.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>

              {/* Guides */}
              <div className="mt-16">
                <Reveal>
                  <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                    <span className="h-px w-8 bg-muted/60" />
                    The guides
                  </div>
                  <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-forest sm:text-4xl">
                    Local guides leading the way
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{tour.guidesIntro}</p>
                </Reveal>

                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {tour.guides.map((guide, index) => (
                    <Reveal key={guide.name} delay={index * 90}>
                      <div className="flex h-full gap-4 rounded-[18px] border border-forest/10 bg-white p-5 shadow-[0_2px_18px_rgba(18,36,28,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_28px_-8px_rgba(18,36,28,0.16)]">
                        <div
                          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${guide.from} ${guide.to} font-serif text-lg text-white`}
                        >
                          {guide.name
                            .split(" ")
                            .map((w) => w[0])
                            .join("")}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-serif text-lg text-forest">{guide.name}</h3>
                          <p className="mt-0.5 min-h-[32px] text-xs font-semibold uppercase leading-snug tracking-[0.06em] text-green">
                            {guide.role}
                          </p>
                          <p className="mt-2 line-clamp-3 min-h-[54px] text-xs leading-relaxed text-muted">
                            {guide.bio}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div className="mt-16">
                <Reveal>
                  <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                    <span className="h-px w-8 bg-muted/60" />
                    The itinerary
                  </div>
                  <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-forest sm:text-4xl">
                    {tour.itineraryHeading}
                  </h2>
                </Reveal>

                <div className="mt-8 divide-y divide-forest/8 border-t border-forest/8">
                  {tour.itinerary.map((day, index) => (
                    <Reveal key={day.day} delay={index * 70}>
                      <div className="grid grid-cols-1 gap-4 rounded-2xl py-6 transition-colors duration-300 hover:bg-forest/[0.025] sm:-mx-4 sm:grid-cols-[110px_1fr] sm:gap-6 sm:px-4">
                        <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2.5">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest font-serif text-base text-cream">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-serif text-sm text-forest sm:text-base">{day.day}</p>
                            <span className="mt-0.5 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-green">
                              <PinIcon size={11} />
                              {day.tag}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-serif text-base text-forest sm:text-lg">{day.title}</h3>
                          <p className="mt-1.5 text-sm leading-relaxed text-muted">{day.description}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar — this outer cell stretches to match the main column's
                full height (CSS Grid's default align-items: stretch), so the
                inner sticky wrapper has room to stay pinned in view while the
                guides and itinerary scroll past, instead of scrolling away
                after only a short distance and leaving the column empty. */}
            <div>
              <div className="lg:sticky lg:top-24">
                <Reveal delay={120}>
                  <TripOverviewCard tour={tour} />
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Photo Highlights ---------------- */}
      <section className="relative w-full overflow-hidden bg-cream pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              <span className="h-px w-8 bg-muted/60" />
              Scenes from the trip
            </div>
            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-forest sm:text-5xl">
              Photo <span className="text-green">highlights</span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{tour.galleryIntro}</p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-12">
            {tour.photos.map((photo, index) => {
              const Motif = index % 2 === 0 ? PeakZigzagMotif : AccentMotif;
              return (
                <Reveal key={photo.caption} delay={(index % 6) * 80}>
                  <div className="group relative aspect-[4/5] overflow-hidden rounded-[18px]">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${photo.from} ${photo.to} transition-transform duration-500 ease-out group-hover:scale-[1.06]`}
                    >
                      <Motif className="absolute inset-0 h-full w-full p-10 text-cream/20" />
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
      <section className="relative w-full overflow-hidden bg-forest py-20 sm:py-24 lg:py-28">
        <div
          aria-hidden
          className={`pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full ${tour.theme.blob} blur-3xl`}
        />
        <div className="relative mx-auto w-full max-w-3xl px-5 text-center sm:px-6 lg:px-8">
          <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="mx-auto text-gold/60" aria-hidden="true">
            <path
              d="M0 24V14.4Q0 7.2 4.2 3.6 8.4 0 14.4 0v4.8Q10.8 4.8 8.4 7.2 6 9.6 6 14.4h8.4V24ZM17.6 24V14.4q0-7.2 4.2-10.8Q26 0 32 0v4.8q-3.6 0-6 2.4-2.4 2.4-2.4 7.2h8.4V24Z"
              fill="currentColor"
            />
          </svg>
          <p className="mt-6 font-serif text-2xl leading-snug text-cream sm:text-3xl">{tour.quote}</p>
          <p className="mt-5 text-sm uppercase tracking-[0.14em] text-cream/50">— {tour.quoteAuthor}</p>
        </div>
      </section>

      {/* ---------------- Closing CTA ---------------- */}
      <section className="relative w-full overflow-hidden bg-cream py-16 text-center sm:py-20">
        <div className="mx-auto w-full max-w-2xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto mb-5 flex w-fit items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              <span className="h-px w-8 bg-muted/60" />
              {tour.ctaEyebrow}
              <span className="h-px w-8 bg-muted/60" />
            </div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-forest sm:text-4xl">
              {tour.ctaHeading}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{tour.ctaText}</p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <LinkButton href="/#contact" variant="primary" className="group gap-2">
                Reserve Your Spot
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
    </main>
  );
}
