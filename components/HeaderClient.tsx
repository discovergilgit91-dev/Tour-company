"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./ui/Logo";
import { LinkButton } from "./ui/Button";
import { ArrowIcon, ChevronDownIcon, MenuIcon } from "./ui/icons";
import { NAV_LINKS, navHref } from "@/lib/nav";
import { signOut } from "@/app/auth/actions";
import { getDisplayName, getInitials } from "@/lib/account";
import type { SessionProfile } from "@/lib/supabase/session";
import AccountMenu from "./AccountMenu";
import NavDropdown from "./NavDropdown";
import type { NavMenu } from "@/lib/navMenus";

export type HeaderUser = SessionProfile;

export default function HeaderClient({ user, menus }: { user: HeaderUser | null; menus: NavMenu[] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Only one dropdown is ever open: desktop tracks it here, and the mobile
  // menu keeps its own single expanded section.
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const menuFor = (label: string) => menus.find((menu) => menu.label === label);

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
  const displayName = user ? getDisplayName(user.fullName, user.email) : "";
  const initials = user ? getInitials(displayName) : "";

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
          {NAV_LINKS.map((link) => {
            const menu = menuFor(link.label);
            const toneClassName = solid ? "text-forest/75 hover:text-forest" : "text-cream/75 hover:text-cream";

            if (menu) {
              return (
                <NavDropdown
                  key={link.href}
                  menu={menu}
                  open={openMenu === menu.label}
                  onOpenChange={(next) =>
                    setOpenMenu((current) => (next ? menu.label : current === menu.label ? null : current))
                  }
                  toneClassName={toneClassName}
                  activeClassName={solid ? "text-forest" : "text-cream"}
                />
              );
            }

            return (
              <Link
                key={link.href}
                href={navHref(link.href)}
                className={`font-sans text-[13px] font-medium transition-colors ${toneClassName}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          {user ? (
            <AccountMenu
              displayName={displayName}
              email={user.email}
              initials={initials}
              toneClassName={solid ? "text-forest/75" : "text-cream/75"}
            />
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
          onClick={() => {
            setOpen((value) => !value);
            setExpandedMenu(null);
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {/* The mobile menu scrolls on its own when taller than the screen (e.g. a
          section expanded on a short phone) — the header is fixed, so the page
          itself can't scroll to reveal the rest. */}
      {open && (
        <nav className="flex max-h-[calc(100svh-8rem)] flex-col gap-1 overflow-y-auto overscroll-contain border-t border-forest/10 bg-cream px-5 py-4 lg:hidden">
          {NAV_LINKS.map((link) => {
            const menu = menuFor(link.label);

            if (menu) {
              const expanded = expandedMenu === menu.label;
              const closeAll = () => {
                setOpen(false);
                setExpandedMenu(null);
              };
              return (
                <div key={link.href}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setExpandedMenu(expanded ? null : menu.label)}
                    className="flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-left font-sans text-sm text-forest/80 hover:bg-forest/5 hover:text-forest"
                  >
                    {menu.label}
                    <span className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}>
                      <ChevronDownIcon size={14} />
                    </span>
                  </button>

                  {expanded && (
                    <div className="mb-1 ml-3 border-l-2 border-gold/40 pl-2">
                      {menu.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeAll}
                          className="block rounded-lg px-2 py-2 active:bg-gold/[0.09] hover:bg-gold/[0.09]"
                        >
                          <span className="block font-sans text-sm font-medium text-forest/85">{item.label}</span>
                          {item.detail && <span className="mt-0.5 block text-xs text-muted">{item.detail}</span>}
                        </Link>
                      ))}
                      <div className="mt-1 border-t border-forest/10 pt-1">
                        <Link
                          href={menu.viewAll.href}
                          onClick={closeAll}
                          className="flex items-center justify-between rounded-lg px-2 py-2 font-sans text-[13px] font-medium text-forest/60 hover:bg-forest/5 hover:text-forest"
                        >
                          {menu.viewAll.label}
                          <span className="text-gold">
                            <ArrowIcon size={14} />
                          </span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={navHref(link.href)}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 font-sans text-sm text-forest/80 hover:bg-forest/5 hover:text-forest"
              >
                {link.label}
              </Link>
            );
          })}

          <div className="mt-2 border-t border-forest/10 pt-3">
            {user ? (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 px-2 pb-2">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-forest to-night text-xs font-semibold uppercase tracking-wide text-gold ring-1 ring-gold/30">
                    {initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-serif text-sm leading-tight text-forest">{displayName}</p>
                    <p className="truncate text-xs text-muted">{user.email}</p>
                  </div>
                </div>

                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2.5 font-sans text-sm text-forest/80 hover:bg-forest/5 hover:text-forest"
                >
                  My Account
                </Link>
                <Link
                  href="/account/trip-requests"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2.5 font-sans text-sm text-forest/80 hover:bg-forest/5 hover:text-forest"
                >
                  My Trip Requests
                </Link>

                <form action={signOut} className="mt-1 border-t border-forest/10 pt-1">
                  <button
                    type="submit"
                    className="w-full rounded-lg px-2 py-2.5 text-left font-sans text-sm text-forest/80 hover:bg-forest/5 hover:text-forest"
                  >
                    Sign Out
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex items-center gap-4 px-2">
                <Link href="/sign-in" className="font-sans text-sm text-forest/80 hover:text-forest">
                  Sign In
                </Link>
                <LinkButton href="/sign-up" className="px-5 py-2.5 text-xs">
                  Sign Up
                </LinkButton>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
