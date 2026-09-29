import { createClient } from "@/lib/supabase/server";
import HeaderClient, { type HeaderUser } from "./HeaderClient";

// Server wrapper: reads the session (and profile name) server-side so the
// header never flashes the logged-out state, or a bare email before the
// name loads, for an already-authenticated visitor.
export default async function Header() {
  let user: HeaderUser | null = null;

  try {
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (authUser?.email) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", authUser.id)
        .single();

      user = { email: authUser.email, fullName: profile?.full_name ?? null };
    }
  } catch {
    // Supabase unreachable — render as logged out rather than crash the page.
  }

  return <HeaderClient user={user} />;
}
