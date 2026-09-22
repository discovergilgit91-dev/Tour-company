const REVIEWS = [
  {
    name: "Ayesha Khan",
    location: "Lahore, Pakistan",
    quote:
      "Our guide knew every turn of the Hunza road by heart. It felt less like a tour and more like visiting family in the mountains.",
    rating: 5,
  },
  {
    name: "Daniel Reyes",
    location: "Madrid, Spain",
    quote:
      "Fairy Meadows at sunrise, arranged down to the last detail. The most well-run trip I've taken anywhere in the world.",
    rating: 5,
  },
  {
    name: "Meera Nair",
    location: "Bengaluru, India",
    quote:
      "Deosai felt endless in the best way. Small group, unhurried pace, and a team that clearly loves this land.",
    rating: 4,
  },
];

function Initials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest font-serif text-sm text-cream">
      {initials}
    </span>
  );
}

function StarRow({ rating }: { rating: number }) {
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
          className="text-gold"
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
    <section id="reviews" className="relative overflow-hidden bg-cream pb-20 pt-10 sm:pb-24 sm:pt-12 lg:pb-28 lg:pt-14">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-8 lg:mb-14 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              <span className="h-px w-8 bg-muted/60" />
              Reviews
            </div>

            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-forest sm:text-5xl lg:text-6xl">
              Trusted
              <br />
              <span className="text-green">by travelers</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-forest/10 bg-white px-5 py-4">
            <StarRow rating={5} />
            <span className="font-serif text-lg text-forest">4.9</span>
            <span className="text-xs text-muted">from 240+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <article
              key={review.name}
              className="flex h-full flex-col rounded-[24px] bg-white p-7 shadow-[0_2px_18px_rgba(18,36,28,0.06)]"
            >
              <StarRow rating={review.rating} />

              <p className="mt-4 flex-1 text-sm leading-relaxed text-forest/80">
                &ldquo;{review.quote}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-forest/10 pt-5">
                <Initials name={review.name} />
                <div>
                  <p className="font-serif text-sm text-forest">{review.name}</p>
                  <p className="text-xs text-muted">{review.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
