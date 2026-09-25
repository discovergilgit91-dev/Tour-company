import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "./ui/icons";

/* ---------------------------------------------------------------------
   Homepage closing CTA — a full-width photo banner in place of the old
   inline contact form. Keeps id="contact" so every "/#contact" link
   already scattered across the site (tour pages, destination cards,
   the tours explorer) still lands somewhere real; the actual contact
   channel is now the footer's phone/email/office details, alongside
   the "Plan Your Trip" button below.
   --------------------------------------------------------------------- */

const BASE_BUTTON =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-sans text-sm font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]";

export default function ClosingCTA() {
  return (
    <section id="contact" className="relative w-full overflow-hidden">
      <div className="relative min-h-[440px] w-full sm:min-h-[480px]">
        <Image
          src="/Images/hero/closing-cta.jpg"
          alt=""
          aria-hidden
          fill
          quality={85}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-night/85 via-night/55 to-night/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-night/50 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl items-center px-5 sm:px-6 lg:px-8">
          <div className="max-w-xl py-16 sm:py-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
              Ready for your next adventure?
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-[1.1] tracking-tight text-cream sm:text-4xl lg:text-[44px]">
              Your Next Mountain Story Starts Here.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/80 sm:text-base">
              Explore breathtaking destinations, join our upcoming tours, and experience the real
              Gilgit-Baltistan.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/#destinations" className={`${BASE_BUTTON} bg-gold text-forest hover:bg-gold/90`}>
                Explore Destinations
                <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                  <ArrowIcon size={14} />
                </span>
              </Link>
              <Link
                href="/plan-your-trip"
                className={`${BASE_BUTTON} border border-cream/40 text-cream hover:border-cream hover:bg-cream hover:text-forest`}
              >
                Plan Your Trip
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
