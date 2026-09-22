import Image from "next/image";
import { LinkButton } from "./ui/Button";

/* =========================================================
   DATA — same pattern as DEFAULT_DESTINATIONS in
   FeaturedDestinations.tsx: one typed array, edit one object
   to add a real partner.

   TO ACTIVATE A REAL PARTNER:
   1. Drop their logo file in /public/Images/partners/ (a
      roughly square PNG/SVG with transparent background
      works best against the white card).
   2. Copy the EXAMPLE_PARTNER shape below into DEFAULT_PARTNERS
      and fill in: id, name, logo, description, url.
   3. Set `featured: true` on at most one partner if you want
      it to render as the larger, full-width card.
   4. Leave DEFAULT_PARTNERS as [] to keep showing the
      "Partnership coming soon" placeholder — nothing else
      needs to change.
========================================================= */

export type Partner = {
  id: string;
  name: string;
  /** Path under /public, e.g. "/Images/partners/trailhead-logo.png" */
  logo: string;
  /** One or two lines describing the partnership */
  description: string;
  /** Full URL to the partner's site, e.g. "https://example.com" */
  url: string;
  /** Renders this partner as a larger, full-width card */
  featured?: boolean;
};

// Reference shape only — copy this into DEFAULT_PARTNERS and fill it in.
// const EXAMPLE_PARTNER: Partner = {
//   id: "trailhead-collective",
//   name: "Trailhead Collective",
//   logo: "/Images/partners/trailhead-logo.png",
//   description: "Co-hosting community-led treks across the Karakoram with local guiding cooperatives.",
//   url: "https://example.com",
//   featured: true,
// };

const DEFAULT_PARTNERS: Partner[] = [];

/* =========================================================
   ICONS — local, inline, matching the site's icon language.
========================================================= */

function ExternalLinkIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 6H6.5A2.5 2.5 0 0 0 4 8.5v9A2.5 2.5 0 0 0 6.5 20h9a2.5 2.5 0 0 0 2.5-2.5V15"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 4h6v6M20 4 11 13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HandshakeIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 11.5 7 8l3.2 2.6a1.6 1.6 0 0 1 0 2.5l-.4.3a1.6 1.6 0 0 1-2.1 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 11.5 17 8l-3.2 2.6a1.6 1.6 0 0 0 0 2.5l3.4 2.8a1.6 1.6 0 0 0 2.1 0L21 14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3 11.5V17M21 11.5V17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/* =========================================================
   CARDS
========================================================= */

function PartnerCard({ partner }: { partner: Partner }) {
  const { name, logo, description, url, featured } = partner;

  if (featured) {
    return (
      <div className="flex flex-col gap-6 rounded-[22px] border border-forest/10 bg-white p-7 shadow-sm sm:col-span-2 sm:flex-row sm:items-center sm:gap-8 sm:p-9 lg:col-span-3">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-cream ring-1 ring-forest/10 sm:h-24 sm:w-24">
          <Image
            src={logo}
            alt={`${name} logo`}
            fill
            quality={90}
            sizes="(min-width: 640px) 96px, 80px"
            className="object-contain p-3"
          />
        </div>

        <div className="flex-1">
          <h3 className="font-serif text-2xl leading-tight text-forest">{name}</h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base">{description}</p>
        </div>

        <LinkButton
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          variant="dark"
          className="w-fit shrink-0 gap-2 text-[11px] uppercase tracking-[0.12em]"
        >
          Visit partner
          <ExternalLinkIcon size={14} />
        </LinkButton>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 rounded-[22px] border border-forest/10 bg-white p-6 shadow-sm sm:p-7">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-cream ring-1 ring-forest/10">
        <Image src={logo} alt={`${name} logo`} fill quality={90} sizes="56px" className="object-contain p-2" />
      </div>

      <div>
        <h3 className="font-serif text-xl leading-tight text-forest">{name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      </div>

      <LinkButton
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        variant="dark"
        className="mt-auto w-fit gap-2 text-[11px] uppercase tracking-[0.12em]"
      >
        Visit partner
        <ExternalLinkIcon size={14} />
      </LinkButton>
    </div>
  );
}

function ComingSoonCard() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-[22px] border border-dashed border-forest/20 bg-white/60 p-10 text-center sm:col-span-2 lg:col-span-3">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest/[0.06] text-forest/60">
        <HandshakeIcon size={22} />
      </span>
      <div>
        <h3 className="font-serif text-xl text-forest">Partnership coming soon</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
          We&apos;re finalizing details with our next collaborator — check back soon to see who we&apos;re
          working with.
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   SECTION
========================================================= */

export default function PartnerSection({
  eyebrow = "In Collaboration With",
  heading = "Let's build something",
  headingAccent = "together",
  description = "We're open to collaborating with travel platforms, publishers, and tourism partners who want to bring Gilgit-Baltistan to a wider audience reach out and let's talk.",
  partners = DEFAULT_PARTNERS,
}: {
  eyebrow?: string;
  heading?: string;
  headingAccent?: string;
  description?: string;
  partners?: Partner[];
}) {
  return (
    // Same structure as FeaturedDestinations / WhyChooseUs / UpcomingTours:
    // no horizontal padding on the section — it lives on the max-w-6xl
    // wrapper (px-5 sm:px-6 lg:px-8), vertical padding is py-16 sm:py-20 lg:py-24.
    <section id="partners" className="relative w-full overflow-hidden bg-cream py-16 sm:py-20 lg:py-24">
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            <span className="h-px w-8 bg-muted/60" />
            {eyebrow}
          </div>

          <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-forest sm:text-5xl lg:text-6xl">
            {heading}
            <br />
            <span className="text-green">{headingAccent}</span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">{description}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {partners.length > 0 ? (
            partners.map((partner) => <PartnerCard key={partner.id} partner={partner} />)
          ) : (
            <ComingSoonCard />
          )}
        </div>
      </div>
    </section>
  );
}
