const REVIEWS = [
  {
    name: "Ayesha Khan",
    location: "Lahore, Pakistan",
    quote:
      "Our guide knew every turn of the Hunza road by heart. It felt less like a tour and more like visiting family in the mountains — down to the orchard where we stopped for mulberries nobody else finds.",
    rating: 5,
    trip: "Blossoms of Hunza",
  },
  {
    name: "Daniel Reyes",
    location: "Madrid, Spain",
    quote:
      "Fairy Meadows at sunrise, arranged down to the last detail. The most well-run trip I've taken anywhere in the world.",
    rating: 5,
    trip: "Fairy Meadows Trek",
  },
  {
    name: "Meera Nair",
    location: "Bengaluru, India",
    quote:
      "Deosai felt endless in the best way. Small group, unhurried pace, and a team that clearly loves this land.",
    rating: 4,
    trip: "Deosai Plains",
  },
];

const [FEATURED, ...OTHERS] = REVIEWS;

function Initials({ name, light = false }: { name: string; light?: boolean }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <span
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-serif text-sm ${
        light ? "bg-cream/10 text-cream" : "bg-forest text-cream"
      }`}
    >
      {initials}
    </span>
  );
}

function StarRow({ rating, className = "text-gold" }: { rating: number; className?: string }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.2"
          className={className}
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.8l-5.2 2.7 1-5.8L1.6 7.6l5.8-.8L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-cream px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-gold/5 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="mb-12 flex flex-col justify-between gap-8 lg:mb-14 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              <span className="h-px w-8 bg-muted/60" />
              Reviews
            </div>

            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-forest sm:text-5xl lg:text-6xl">
              Trusted by travelers
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              Real trips, real travelers — see what guests say about journeying with us
              across Gilgit-Baltistan.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-forest/10 bg-white px-5 py-4">
            <StarRow rating={5} />
            <span className="font-serif text-lg text-forest">4.9</span>
            <span className="text-xs text-muted">from 240+ reviews</span>
          </div>
        </div>

        <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Featured quote — the section's visual anchor */}
          <article className="relative flex flex-col justify-between overflow-hidden rounded-[28px] bg-forest p-8 text-cream sm:p-10 lg:col-span-7">
            <span
              aria-hidden
              className="pointer-events-none absolute -right-4 -top-6 select-none font-serif text-[160px] leading-none text-gold/10"
            >
              &ldquo;
            </span>

            <div className="relative">
              <StarRow rating={FEATURED.rating} className="text-gold" />
              <p className="mt-6 font-serif text-2xl leading-snug sm:text-[28px] lg:text-3xl">
                &ldquo;{FEATURED.quote}&rdquo;
              </p>
            </div>

            <div className="relative mt-10 flex items-center gap-4 border-t border-cream/10 pt-6">
              <Initials name={FEATURED.name} light />
              <div className="min-w-0">
                <p className="font-serif text-sm text-cream">{FEATURED.name}</p>
                <p className="truncate text-xs text-cream/55">{FEATURED.location}</p>
              </div>
              <span className="ml-auto shrink-0 rounded-full border border-gold/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-gold">
                {FEATURED.trip}
              </span>
            </div>
          </article>

          {/* Supporting notes */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {OTHERS.map((review) => (
              <article
                key={review.name}
                className="flex flex-1 flex-col rounded-[24px] bg-white p-6 shadow-[0_2px_18px_rgba(18,36,28,0.06)]"
              >
                <StarRow rating={review.rating} />

                <p className="mt-3 flex-1 text-sm leading-relaxed text-forest/80">
                  &ldquo;{review.quote}&rdquo;
                </p>

                <div className="mt-5 flex items-center gap-3 border-t border-forest/10 pt-4">
                  <Initials name={review.name} />
                  <div className="min-w-0">
                    <p className="font-serif text-sm text-forest">{review.name}</p>
                    <p className="truncate text-xs text-muted">{review.location}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
