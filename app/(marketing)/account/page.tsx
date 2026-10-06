import type { Metadata } from "next";
import { requireUser } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import AccountPage from "@/components/AccountPage";

export const metadata: Metadata = {
  title: "My Account — Discover Gilgit",
  description: "Manage your Discover Gilgit account details.",
  robots: { index: false },
};

type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
};

export default async function Page() {
  const user = await requireUser();

  let profile: Profile | null = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("profiles")
      .select("id, email, full_name, created_at")
      .eq("id", user.id)
      .single();
    profile = data;
  } catch {
    // Supabase unreachable — fall back to what the auth session already
    // knows below rather than crash the page.
  }

  return (
    <AccountPage
      email={profile?.email ?? user.email ?? ""}
      fullName={profile?.full_name ?? null}
      createdAt={profile?.created_at ?? user.created_at}
    />
  );
}
