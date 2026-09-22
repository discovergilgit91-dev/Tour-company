"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "../ui/Button";
import { ArrowIcon } from "../ui/icons";
import { AuthShell } from "./AuthShell";
import { AuthField, PasswordField } from "./fields";
import { AlertIcon, CheckCircleIcon, GoogleIcon, MailIcon, SpinnerIcon, UserIcon } from "./icons";

export default function SignUpForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Those passwords don't match — give it another try.");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms & Privacy Policy to continue.");
      return;
    }

    setLoading(true);
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }
    setSubmitted(true);
  }

  async function handleGoogle() {
    setError(null);
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: typeof window !== "undefined" ? window.location.origin : undefined },
    });
    if (authError) setError(authError.message);
  }

  return (
    <AuthShell
      eyebrow="Start your journey"
      title="Plan trips like"
      titleAccent="a local would."
      tagline="Create a free account to save destinations, track your bookings, and get itineraries built by guides who grew up here."
      image="/Images/tours/passu-cones.jpg"
      imageAlt="Passu Cones along the ancient Silk Road"
      quote={{
        text: "We don't just show you Gilgit-Baltistan. We hand you the version we grew up in.",
        author: "The Discover Gilgit Team",
        role: "Local guides, Gilgit-Baltistan",
      }}
      stats={[
        { value: "40+", label: "Curated journeys" },
        { value: "4.9★", label: "Average rating" },
      ]}
    >
      {submitted ? (
        <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green/10 text-green">
            <CheckCircleIcon size={34} />
          </span>
          <h2 className="mt-5 font-serif text-2xl text-forest">Almost there</h2>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
            We&apos;ve sent a confirmation link to <span className="font-semibold text-forest">{email}</span>. Open it to
            activate your account.
          </p>
          <Link href="/sign-in" className="mt-6 text-sm font-semibold text-green hover:text-green-dark">
            Back to sign in
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted lg:hidden">
            <span className="h-px w-8 bg-muted/60" />
            Start your journey
          </div>

          <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-forest sm:text-4xl">
            Create your <span className="text-green">account</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Already exploring with us?{" "}
            <Link href="/sign-in" className="font-semibold text-green hover:text-green-dark">
              Sign in
            </Link>{" "}
            instead.
          </p>

          {error && (
            <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertIcon size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <AuthField
              label="Full name"
              icon={<UserIcon size={17} />}
              type="text"
              name="name"
              autoComplete="name"
              required
              placeholder="Your full name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />

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

            <PasswordField
              label="Password"
              name="password"
              autoComplete="new-password"
              required
              minLength={8}
              placeholder="At least 8 characters"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              showStrength
            />

            <PasswordField
              label="Confirm password"
              name="confirm-password"
              autoComplete="new-password"
              required
              placeholder="Type it again"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />

            <label className="flex cursor-pointer items-start gap-2.5 text-sm text-muted">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(event) => setAgreed(event.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-forest/25 text-green focus:ring-green/40"
              />
              <span>
                I agree to the{" "}
                <Link href="/terms" className="font-medium text-forest underline hover:text-green">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="font-medium text-forest underline hover:text-green">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            <Button type="submit" disabled={loading} className="group w-full">
              {loading ? (
                <>
                  <SpinnerIcon size={16} />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                    <ArrowIcon size={14} />
                  </span>
                </>
              )}
            </Button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <span className="h-px flex-1 bg-forest/10" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Or</span>
            <span className="h-px flex-1 bg-forest/10" />
          </div>

          <Button type="button" onClick={handleGoogle} variant="dark" className="w-full gap-3">
            <GoogleIcon size={18} />
            Continue with Google
          </Button>
        </>
      )}
    </AuthShell>
  );
}
