"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./ui/Logo";
import { LinkButton } from "./ui/Button";
import { MenuIcon } from "./ui/icons";

const NAV_LINKS = [
  { href: "/destinations", label: "Destinations" },
  { href: "/about", label: "Our Story" },
  { href: "/tours", label: "Upcoming Tours & Events" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-forest/90 text-cream backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-[13px] font-medium text-cream/75 transition-colors hover:text-cream"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="/sign-in"
            className="font-sans text-[13px] font-medium text-cream/75 hover:text-cream"
          >
            Sign In
          </Link>
          <LinkButton href="/sign-up" className="px-5 py-2.5 text-xs">
            Sign Up
          </LinkButton>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-cream lg:hidden"
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-cream/10 bg-forest px-5 py-4 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 font-sans text-sm text-cream/80 hover:bg-cream/5 hover:text-cream"
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-2 flex items-center gap-4 border-t border-cream/10 px-2 pt-3">
            <Link href="/sign-in" className="font-sans text-sm text-cream/80 hover:text-cream">
              Sign In
            </Link>
            <LinkButton href="/sign-up" className="px-5 py-2.5 text-xs">
              Sign Up
            </LinkButton>
          </div>
        </nav>
      )}
    </header>
  );
}
