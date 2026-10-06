"use client";

import Link from "next/link";
import { useState } from "react";
import { isAuthRetryableFetchError } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { Button } from "../ui/Button";
import { ArrowIcon } from "../ui/icons";
import { AuthShell } from "./AuthShell";
import { AuthField } from "./fields";
import { AlertIcon, CheckCircleIcon, MailIcon, SpinnerIcon } from "./icons";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      // Supabase emails a one-time link that lands on /reset-password, where
      // the visitor picks a new password.
      const { error: authError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      setLoading(false);

      if (authError) {
        if (isAuthRetryableFetchError(authError)) {
          setError("We couldn't reach the sign-in service. Please check your connection and try again.");
        } else if (authError.code === "validation_failed" || authError.code === "email_address_invalid") {
          setError("Please enter a valid email address.");
        } else {
          setError(authError.message);
        }
        return;
      }

      // Supabase answers the same way whether or not an account exists for
      // this email (so the form can't be used to find out who has one) —
      // the confirmation below is worded to match.
      setSent(true);
    } catch {
      setLoading(false);
      setError("We couldn't reach the sign-in service. Please check your connection and try again.");
    }
  }

  return (
    <AuthShell
      eyebrow="ACCOUNT HELP"
      title="Lost the trail?"
      titleAccent="We'll guide you back."
      tagline="Tell us the email you signed up with and we'll send a secure link to set a new password — then you're straight back to planning."
      image="/Images/tours/Fairy-meadows.jpg"
      imageAlt="Nanga Parbat reflected in a still pond at Fairy Meadows"
      quote={{
        text: "Every valley we send you to, one of us has walked first.",
        author: "The Discover Gilgit Team",
        role: "Local guides, Gilgit-Baltistan",
      }}
      stats={[
        { value: "12+", label: "Years guiding" },
        { value: "3,500+", label: "Travelers hosted" },
      ]}
    >
      {sent ? (
        <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green/10 text-green">
            <CheckCircleIcon size={34} />
          </span>
          <h2 className="mt-5 font-serif text-2xl text-forest">Check your email</h2>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
            If there&apos;s an account for <span className="font-semibold text-forest">{email.trim()}</span>,
            we&apos;ve sent a link to reset your password. It can take a minute or two to arrive — check your spam
            folder if you don&apos;t see it.
          </p>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="mt-6 text-sm font-medium text-muted hover:text-forest"
          >
            Use a different email
          </button>
          <Link href="/sign-in" className="mt-3 text-sm font-semibold text-green hover:text-green-dark">
            Back to sign in
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted lg:hidden">
            <span className="h-px w-8 bg-muted/60" />
            Account help
          </div>

          <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-forest sm:text-4xl">
            Forgot your <span className="text-green">password?</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            No problem — enter your email and we&apos;ll send you a reset link. Remembered it?{" "}
            <Link href="/sign-in" className="font-semibold text-green hover:text-green-dark">
              Sign in
            </Link>
            .
          </p>

          {error && (
            <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertIcon size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <AuthField
              label="Email"
              icon={<MailIcon size={17} />}
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <Button type="submit" disabled={loading} className="group w-full">
              {loading ? (
                <>
                  <SpinnerIcon size={16} />
                  Sending...
                </>
              ) : (
                <>
                  Send reset link
                  <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                    <ArrowIcon size={14} />
                  </span>
                </>
              )}
            </Button>
          </form>
        </>
      )}
    </AuthShell>
  );
}
