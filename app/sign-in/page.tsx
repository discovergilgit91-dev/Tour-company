import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SignInForm from "@/components/auth/SignInForm";

export const metadata: Metadata = {
  title: "Sign In — Discover Gilgit",
  description: "Sign in to your Discover Gilgit account to manage your bookings and saved trips.",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  // Read outside the try/catch: redirect() works by throwing, and a
  // catch-all here would otherwise swallow that throw as if Supabase
  // were unreachable and silently fail to redirect.
  let isSignedIn = false;
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    isSignedIn = !!user;
  } catch {
    // Supabase unreachable — fail open and let them see the sign-in page
    // rather than blocking access to it.
  }

  if (isSignedIn) {
    redirect("/");
  }

  return <SignInForm initialError={error} />;
}
