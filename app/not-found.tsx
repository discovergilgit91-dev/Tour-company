import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found — Discover Gilgit",
  description: "That page doesn't exist — head back to the destinations, tours or the homepage.",
};

// Rendered for any unknown URL (and for notFound() in dynamic pages). It sits
// outside the (marketing) layout, so it brings its own header and footer.
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden bg-forest">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-10 h-[380px] w-[380px] rounded-full bg-gold/10 blur-3xl"
        />
        <div className="relative z-10 mx-auto flex min-h-[70svh] w-full max-w-6xl flex-col justify-center px-5 pb-16 pt-32 sm:px-6 lg:px-8">
          <p className="font-serif text-6xl font-semibold text-gold sm:text-7xl">404</p>
          <h1 className="mt-4 font-serif text-3xl font-semibold leading-[1.12] tracking-tight text-cream sm:text-5xl">
            This trail doesn&rsquo;t lead anywhere
          </h1>
          <p className="mt-4 max-w-xl text-[13.5px] leading-relaxed text-cream/80 sm:text-base">
            The page you&rsquo;re looking for has moved or never existed. Pick one of these and you&rsquo;ll be back on
            the path.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/" variant="primary">
              Back to the homepage
            </LinkButton>
            <LinkButton href="/lands" variant="outline">
              Browse destinations
            </LinkButton>
            <LinkButton href="/tours" variant="outline">
              See tours &amp; events
            </LinkButton>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
