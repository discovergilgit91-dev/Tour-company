"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./ui/Logo";
import { LinkButton } from "./ui/Button";
import { MenuIcon } from "./ui/icons";
import { NAV_LINKS } from "@/lib/nav";
import { signOut } from "@/app/auth/actions";

export type HeaderUser = { email: string };

export default function HeaderClient({ user }: { user: HeaderUser | null }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Solid state (scrolled, or the mobile menu open) — background and text
  // switch to match the cream/forest pairing every section below uses
  // (see WhyChooseUs), instead of staying on the transparent-over-photo
  // cream-text look from the top of the page.
  const solid = scrolled || open;
  const initial = user?.email ? user.email.charAt(0).toUpperCase() : "";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "bg-cream/95 text-forest backdrop-blur-md shadow-[0_4px_20px_rgba(7,23,25,0.1)]"
          : "bg-transparent text-cream"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-[padding] duration-300 sm:px-6 lg:px-8 ${
          scrolled ? "py-3" : "py-4"
        }`}
      >
        <Logo compact={scrolled} />

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-sans text-[13px] font-medium transition-colors ${
                solid ? "text-forest/75 hover:text-forest" : "text-cream/75 hover:text-cream"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          {user ? (
            <>
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest text-xs font-semibold uppercase text-cream">
                  {initial}
                </span>
                <span
                  className={`max-w-[160px] truncate font-sans text-[13px] font-medium ${
                    solid ? "text-forest/75" : "text-cream/75"
                  }`}
                >
                  {user.email}
                </span>
              </div>
              <form action={signOut}>
                <button
                  type="submit"
                  className={`font-sans text-[13px] font-medium transition-colors ${
                    solid ? "text-forest/75 hover:text-forest" : "text-cream/75 hover:text-cream"
                  }`}
                >
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className={`font-sans text-[13px] font-medium transition-colors ${
                  solid ? "text-forest/75 hover:text-forest" : "text-cream/75 hover:text-cream"
                }`}
              >
                Sign In
              </Link>
              <LinkButton href="/sign-up" className="px-5 py-2.5 text-xs">
                Sign Up
              </LinkButton>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-forest/10 bg-cream px-5 py-4 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 font-sans text-sm text-forest/80 hover:bg-forest/5 hover:text-forest"
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-2 flex items-center gap-4 border-t border-forest/10 px-2 pt-3">
            {user ? (
              <>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest text-xs font-semibold uppercase text-cream">
                  {initial}
                </span>
                <span className="min-w-0 flex-1 truncate font-sans text-sm text-forest/80">{user.email}</span>
                <form action={signOut}>
                  <button type="submit" className="font-sans text-sm text-forest/80 hover:text-forest">
                    Sign Out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/sign-in" className="font-sans text-sm text-forest/80 hover:text-forest">
                  Sign In
                </Link>
                <LinkButton href="/sign-up" className="px-5 py-2.5 text-xs">
                  Sign Up
                </LinkButton>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
