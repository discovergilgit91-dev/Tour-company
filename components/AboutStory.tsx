import Image from "next/image";
import { LinkButton } from "./ui/Button";
import { PeakMark } from "./ui/Logo";

const STATS = [
  { value: "12+", label: "Years guiding these valleys" },
  { value: "3,500+", label: "Travelers hosted" },
  { value: "40+", label: "Curated journeys" },
];

export default function AboutStory() {
  return (
    /* No horizontal padding on the section: it lives inside the container below,
       exactly like Header, Hero and FeaturedDestinations (max-w-6xl + px-4 sm:px-6).
       Vertical padding is the same as FeaturedDestinations too. */
    <section
      id="our-story"
      className="relative overflow-hidden bg-night py-20 text-cream sm:py-24 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-green/10 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-2 aspect-[4/5] w-full overflow-hidden rounded-[28px] lg:order-1">
          <Image
            src="/Images/about/our-story.jpg"
            alt="Our team guiding a journey through Gilgit-Baltistan"
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="order-1 lg:order-2">
          <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/60">
            <span className="h-px w-8 bg-cream/30" />
            Our story
          </div>

          <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl">
            Born in these valleys,
            <br />
            <span className="heading-accent">built for travelers.</span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-cream/70 sm:text-base">
            Discover Gilgit started with a simple belief: the best way to see
            Gilgit-Baltistan is with the people who grew up in it. Every route we run
            is scouted, hosted, and driven by local guides who know each pass, orchard,
            and fort by name — so your journey feels less like a tour and more like
            being shown home.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-cream/10 pt-8">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-2xl text-gold sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-[11px] leading-snug text-cream/55">{stat.label}</p>
              </div>
            ))}
          </div>

          <LinkButton href="#contact" variant="outline" className="mt-10">
            <PeakMark className="text-cream" />
            Plan your journey
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
