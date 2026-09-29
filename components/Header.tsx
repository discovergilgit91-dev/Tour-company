import { createClient } from "@/lib/supabase/server";
import HeaderClient, { type HeaderUser } from "./HeaderClient";

// Server wrapper: reads the session server-side so the header never
// flashes the logged-out state for an already-authenticated visitor.
export default async function Header() {
  let user: HeaderUser | null = null;

  try {
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();
    if (authUser?.email) {
      user = { email: authUser.email };
    }
  } catch {
    // Supabase unreachable — render as logged out rather than crash the page.
  }

  return <HeaderClient user={user} />;
}
