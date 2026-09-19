"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./ui/Logo";
import { LinkButton } from "./ui/Button";
import { MenuIcon } from "./ui/icons";
import { NAV_LINKS } from "@/lib/nav";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-cream transition-colors duration-300 ${
        scrolled || open
          ? "bg-forest/90 backdrop-blur-md shadow-[0_4px_20px_rgba(7,23,25,0.15)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-10 lg:px-16">
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
        <nav className="flex flex-col gap-1 border-t border-cream/10 bg-forest px-5 py-4 sm:px-10 lg:hidden">
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
