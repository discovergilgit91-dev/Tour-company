"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isAuthRetryableFetchError } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { PENDING_FORM_LABEL, readPendingSubmission } from "@/lib/pendingSubmission";
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
  const [returnTo, setReturnTo] = useState<string | null>(null);
  const [pendingLabel, setPendingLabel] = useState<string | null>(null);

  // Someone redirected here mid-way through a trip request/reservation
  // they weren't signed in to submit — show why, and send them back to
  // it (with their input intact) once their email is confirmed.
  useEffect(() => {
    const pending = readPendingSubmission();
    if (pending) {
      setReturnTo(pending.returnTo);
      setPendingLabel(PENDING_FORM_LABEL[pending.formId] ?? "trip request");
    }
  }, []);

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
    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/auth/callback${
            returnTo ? `?next=${encodeURIComponent(returnTo)}` : ""
          }`,
        },
      });
      setLoading(false);

      if (authError) {
        if (isAuthRetryableFetchError(authError)) {
          setError("We couldn't reach the sign-up service. Please check your connection and try again.");
        } else if (authError.code === "user_already_exists" || authError.code === "email_exists") {
          setError("An account with this email already exists — try signing in instead.");
        } else if (authError.code === "weak_password") {
          setError(authError.message || "Please choose a stronger password.");
        } else if (authError.code === "validation_failed" || authError.code === "email_address_invalid") {
          setError("Please enter a valid email address.");
        } else {
          setError(authError.message);
        }
        return;
      }

      // With email confirmation on, Supabase deliberately masks a
      // duplicate signup as a "success" (rather than an error) to avoid
      // leaking which emails are registered — a real new user gets a
      // non-empty identities array, a pre-existing one gets an empty one.
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        setError("An account with this email already exists — try signing in instead.");
        return;
      }

      setSubmitted(true);
    } catch {
      setLoading(false);
      setError("We couldn't reach the sign-up service. Please check your connection and try again.");
    }
  }

  async function handleGoogle() {
    setError(null);
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (authError) setError(authError.message);
    } catch {
      setError("We couldn't reach the sign-up service. Please check your connection and try again.");
    }
  }

  return (
    <AuthShell
      eyebrow="START YOUR JOURNEY"
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
      notice={!submitted && pendingLabel ? `Create an account to complete your ${pendingLabel}.` : undefined}
    >
      {submitted ? (
        <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green/10 text-green">
            <CheckCircleIcon size={34} />
          </span>
          <h2 className="mt-5 font-serif text-2xl text-forest">Almost there</h2>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
            We&apos;ve sent a confirmation link to <span className="font-semibold text-forest">{email}</span>. Open it to
            activate your account{pendingLabel ? ` and pick up your ${pendingLabel} right where you left off` : ""}.
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
                <Link href="/terms" target="_blank" rel="noopener noreferrer" className="font-medium text-forest underline hover:text-green">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="font-medium text-forest underline hover:text-green">
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
