"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

// Last-resort boundary for an unexpected error while rendering a page, so a
// visitor sees a friendly message and a way forward instead of a blank screen.
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-forest px-5 text-center">
      <div className="max-w-md">
        <p className="font-serif text-5xl font-semibold text-gold">Oops</p>
        <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight text-cream">Something went wrong</h1>
        <p className="mt-3 text-sm leading-relaxed text-cream/75">
          We hit an unexpected problem loading this page. Please try again — if it keeps happening, email us at{" "}
          <a href="mailto:hello@discovergilgit.com" className="font-semibold text-gold hover:text-gold/80">
            hello@discovergilgit.com
          </a>
          .
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button type="button" onClick={reset}>
            Try again
          </Button>
          <Link href="/" className="text-sm font-semibold text-cream/80 hover:text-cream">
            Back to the homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
