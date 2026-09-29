import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client, for use inside Client Components. Reads
 * the session from cookies so it stays in sync with the server client
 * and middleware below.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
