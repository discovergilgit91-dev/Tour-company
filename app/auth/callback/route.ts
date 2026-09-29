import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Where Supabase's email confirmation link points (see the
 * `emailRedirectTo` passed from SignUpForm). Exchanges the one-time
 * code for a real session, then sends the now-logged-in user into the
 * site.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        const forwardedHost = request.headers.get("x-forwarded-host");
        const isLocalEnv = process.env.NODE_ENV === "development";

        if (isLocalEnv) {
          return NextResponse.redirect(`${origin}${next}`);
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}${next}`);
        } else {
          return NextResponse.redirect(`${origin}${next}`);
        }
      }
    } catch {
      // Supabase unreachable/misconfigured — fall through to the error redirect below.
    }
  }

  return NextResponse.redirect(`${origin}/sign-in?error=confirmation_failed`);
}
