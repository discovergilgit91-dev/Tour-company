"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAuthRetryableFetchError, isAuthSessionMissingError } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { Button, LinkButton } from "../ui/Button";
import { ArrowIcon } from "../ui/icons";
import { AuthShell } from "./AuthShell";
import { PasswordField } from "./fields";
import { AlertIcon, SpinnerIcon } from "./icons";

// "checking": reading the session the emailed link carries · "ready": show the
// form · "invalid": the link is missing, used, expired, or opened elsewhere.
type Status = "checking" | "ready" | "invalid";

/** Supabase reports a bad/expired link as ?error=…&error_code=… (in the query or the hash). */
function linkHasError() {
  const params = new URLSearchParams(window.location.search);
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  return Boolean(params.get("error") || params.get("error_code") || hash.get("error") || hash.get("error_code"));
}

export default function ResetPasswordForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("checking");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // The reset email links here with a one-time ?code=. The browser Supabase
  // client exchanges it for a short-lived "recovery" session as soon as it is
  // created, and getSession() waits for that to finish — so a session here
  // means the link was good.
  useEffect(() => {
    let cancelled = false;

    async function check() {
      if (linkHasError()) {
        setStatus("invalid");
        return;
      }
      try {
        const supabase = createClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (cancelled) return;

        if (session) {
          // Don't leave the used one-time code sitting in the address bar.
          if (window.location.search) window.history.replaceState(null, "", window.location.pathname);
          setStatus("ready");
        } else {
          setStatus("invalid");
        }
      } catch {
        if (!cancelled) setStatus("invalid");
      }
    }

    check();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Those passwords don't match — give it another try.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.updateUser({ password });

      if (authError) {
        setLoading(false);
        if (isAuthRetryableFetchError(authError)) {
          setError("We couldn't reach the sign-in service. Please check your connection and try again.");
        } else if (isAuthSessionMissingError(authError)) {
          setStatus("invalid");
        } else if (authError.code === "weak_password") {
          setError(authError.message || "Please choose a stronger password.");
        } else {
          // Includes "same_password": New password should be different from the old password.
          setError(authError.message);
        }
        return;
      }

      // The recovery session was only meant for this one change. End it so
      // /sign-in (which sends already-signed-in visitors home) is shown and
      // they sign in with the new password.
      try {
        await supabase.auth.signOut();
      } catch {
        // Signing out is best-effort — the password is already changed.
      }
      router.push("/sign-in?reset=success");
      router.refresh();
    } catch {
      setLoading(false);
      setError("We couldn't reach the sign-in service. Please check your connection and try again.");
    }
  }

  return (
    <AuthShell
      eyebrow="ALMOST THERE"
      title="A fresh start,"
      titleAccent="same great journeys."
      tagline="Choose a new password for your Discover Gilgit account. Once it's saved, sign in and pick up right where you left off."
      image="/Images/tours/attabads-signature-colour.jpg"
      imageAlt="Turquoise Attabad Lake between steep canyon walls in Hunza"
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
      {status === "checking" && (
        <div
          role="status"
          className="flex min-h-[380px] flex-col items-center justify-center text-center text-sm text-muted"
        >
          <span className="text-green">
            <SpinnerIcon size={26} />
          </span>
          <p className="mt-4">Checking your reset link...</p>
        </div>
      )}

      {status === "invalid" && (
        <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
            <AlertIcon size={30} />
          </span>
          <h2 className="mt-5 font-serif text-2xl text-forest">This link has expired</h2>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
            That reset link is invalid or has expired. Reset links work once, and only in the browser you asked for
            them in — request a fresh one and we&apos;ll send it right over.
          </p>
          <LinkButton href="/forgot-password" className="group mt-6">
            Request a new link
            <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
              <ArrowIcon size={14} />
            </span>
          </LinkButton>
          <Link href="/sign-in" className="mt-4 text-sm font-semibold text-green hover:text-green-dark">
            Back to sign in
          </Link>
        </div>
      )}

      {status === "ready" && (
        <>
          <div className="mb-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted lg:hidden">
            <span className="h-px w-8 bg-muted/60" />
            Almost there
          </div>

          <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-forest sm:text-4xl">
            Set a new <span className="text-green">password</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Choose something you haven&apos;t used before — at least 8 characters.
          </p>

          {error && (
            <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertIcon size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <PasswordField
              label="New password"
              name="new-password"
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

            <Button type="submit" disabled={loading} className="group w-full">
              {loading ? (
                <>
                  <SpinnerIcon size={16} />
                  Updating...
                </>
              ) : (
                <>
                  Update password
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
