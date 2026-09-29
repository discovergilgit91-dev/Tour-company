import { getSessionProfile } from "@/lib/supabase/session";
import HeaderClient from "./HeaderClient";

// Server wrapper: reads the session (and profile name) server-side so the
// header never flashes the logged-out state, or a bare email before the
// name loads, for an already-authenticated visitor.
export default async function Header() {
  const user = await getSessionProfile();
  return <HeaderClient user={user} />;
}
