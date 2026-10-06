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
  // Only same-site paths ("/book", "/account"...). Anything else — a full URL,
  // "//host", "@host" — would let a crafted link bounce someone to another site
  // after they sign in, so it falls back to the homepage.
  const requestedNext = searchParams.get("next") ?? "/";
  const next = /^\/(?![/\\])/.test(requestedNext) ? requestedNext : "/";

  // The provider (e.g. Google) sent the visitor back with an error instead of a
  // code — typically they cancelled or denied access. Not an expired email link.
  if (!code && searchParams.get("error")) {
    return NextResponse.redirect(`${origin}/sign-in?error=oauth_failed`);
  }

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
