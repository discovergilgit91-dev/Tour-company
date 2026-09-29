"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAuthRetryableFetchError } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { PENDING_FORM_LABEL, readPendingSubmission } from "@/lib/pendingSubmission";
import { Button } from "../ui/Button";
import { ArrowIcon } from "../ui/icons";
import { AuthShell } from "./AuthShell";
import { AuthField, PasswordField } from "./fields";
import { AlertIcon, GoogleIcon, MailIcon, SpinnerIcon } from "./icons";

const CALLBACK_ERROR_MESSAGES: Record<string, string> = {
  confirmation_failed:
    "That confirmation link is invalid or has expired. Please try signing in, or sign up again to get a new one.",
};

export default function SignInForm({ initialError }: { initialError?: string } = {}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    initialError ? (CALLBACK_ERROR_MESSAGES[initialError] ?? null) : null
  );
  const [returnTo, setReturnTo] = useState<string | null>(null);
  const [pendingLabel, setPendingLabel] = useState<string | null>(null);

  // Someone redirected here mid-way through a trip request/reservation
  // they weren't signed in to submit — show why, and send them back to
  // it (with their input intact) once they're signed in.
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
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

      setLoading(false);
      if (authError) {
        if (isAuthRetryableFetchError(authError)) {
          setError("We couldn't reach the sign-in service. Please check your connection and try again.");
        } else if (authError.code === "email_not_confirmed") {
          setError("Please confirm your email before signing in — check your inbox for the confirmation link.");
        } else if (authError.code === "invalid_credentials") {
          setError("That email and password combination doesn't match. Please try again.");
        } else {
          setError(authError.message);
        }
        return;
      }
      router.push(returnTo ?? "/");
      router.refresh();
    } catch {
      setLoading(false);
      setError("We couldn't reach the sign-in service. Please check your connection and try again.");
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
      setError("We couldn't reach the sign-in service. Please check your connection and try again.");
    }
  }

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Continue your"
      titleAccent="journey with us."
      tagline="Sign back in to pick up your saved trips, past bookings and personal itineraries — wherever you left off."
      image="/Images/tours/hunza-valley.png"
      imageAlt="Terraced orchards and peaks of Hunza Valley"
      quote={{
        text: "Every valley we send you to, one of us has walked first.",
        author: "The Discover Gilgit Team",
        role: "Local guides, Gilgit-Baltistan",
      }}
      stats={[
        { value: "12+", label: "Years guiding" },
        { value: "3,500+", label: "Travelers hosted" },
      ]}
      notice={pendingLabel ? `Sign in to complete your ${pendingLabel}.` : undefined}
    >
      <div className="mb-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted lg:hidden">
        <span className="h-px w-8 bg-muted/60" />
        Welcome back
      </div>

      <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-forest sm:text-4xl">
        Sign in to your <span className="text-green">account</span>
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        New to Discover Gilgit?{" "}
        <Link href="/sign-up" className="font-semibold text-green hover:text-green-dark">
          Create an account
        </Link>{" "}
        to start planning.
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

        <PasswordField
          label="Password"
          name="password"
          autoComplete="current-password"
          required
          placeholder="Your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex cursor-pointer items-center gap-2 text-muted">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="h-4 w-4 rounded border-forest/25 text-green focus:ring-green/40"
            />
            Remember me
          </label>
          <Link href="/forgot-password" className="font-medium text-green hover:text-green-dark">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" disabled={loading} className="group w-full">
          {loading ? (
            <>
              <SpinnerIcon size={16} />
              Signing in...
            </>
          ) : (
            <>
              Sign in
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

      <p className="mt-8 text-center text-xs text-muted">
        By continuing you agree to Discover Gilgit&apos;s{" "}
        <Link href="/terms" className="underline hover:text-forest">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-forest">
          Privacy Policy
        </Link>
        .
      </p>
    </AuthShell>
  );
}
