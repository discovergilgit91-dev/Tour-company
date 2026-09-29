import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/lib/supabase/auth";
import { CompassIcon } from "@/components/ui/icons";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "My Trip Requests — Discover Gilgit",
  description: "Track the custom trip requests and reservations you've sent us.",
};

export default async function TripRequestsPage() {
  await requireUser();

  return (
    <main className="min-h-screen bg-cream pb-24 pt-32 sm:pt-36">
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-6 lg:px-8">
        <Link href="/account" className="text-sm font-semibold text-green hover:text-green-dark">
          ← My Account
        </Link>

        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-green">My Trip Requests</p>
        <h1 className="mt-2 font-serif text-3xl text-forest sm:text-4xl">Your journeys with us</h1>

        {/* Empty state — no bookings/trip_requests table exists yet, so this
            is real UI wired to nothing rather than fabricated rows. See the
            component's own note for the shape a future table should take. */}
        <div className="mt-8 flex flex-col items-center gap-4 rounded-[22px] border border-dashed border-forest/20 bg-white/60 p-10 text-center sm:p-14">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest/[0.06] text-forest/60">
            <CompassIcon size={22} />
          </span>
          <div>
            <h2 className="font-serif text-xl text-forest">You haven&apos;t planned a trip with us yet</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
              Once you send a trip request or reserve a tour, you&apos;ll be able to track its status here.
            </p>
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <LinkButton href="/plan-your-trip">Plan Your Trip</LinkButton>
            <Link href="/build-your-trip" className="text-sm font-semibold text-green hover:text-green-dark">
              or build your own trip →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
