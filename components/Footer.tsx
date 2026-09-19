import Link from "next/link";
import { Logo, PeakMark } from "./ui/Logo";
import { ArrowIcon, CompassIcon } from "./ui/icons";
import { NAV_LINKS as EXPLORE_LINKS } from "@/lib/nav";

const ACCOUNT_LINKS = [
  { href: "/sign-in", label: "Sign In" },
  { href: "/sign-up", label: "Sign Up" },
];

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.5 21v-7.2h2.4l.4-2.8h-2.8V9.1c0-.8.2-1.4 1.4-1.4h1.5V5.2C16.9 5.1 15.9 5 14.8 5c-2.5 0-4.2 1.5-4.2 4.3v2.7H8.2v2.8h2.4V21h3.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.8 20.5l4.4-1.2A8.4 8.4 0 1 0 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M9 9.6c.1-.6.6-.6 1-.6h.5c.3 0 .5.1.6.4l.6 1.4c.1.2 0 .5-.1.6l-.5.6c-.1.1-.1.3 0 .4.4.9 1.2 1.7 2.1 2.1.1.1.3.1.4 0l.6-.5c.2-.1.4-.2.6-.1l1.4.6c.3.1.4.3.4.6v.5c0 .4 0 .9-.6 1-1 .2-2.4 0-4.2-1.2-1.5-1-2.4-2.2-2.9-3.4-.5-1.1-.5-2-.4-2.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/15 text-cream/55 transition-all duration-200 hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
    >
      {children}
    </a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-4 text-[11px] text-cream/60 transition-colors hover:text-cream"
    >
      <span>{children}</span>
      <ArrowIcon />
    </Link>
  );
}

function FooterColumn({ title, links }: { title: string; links: typeof EXPLORE_LINKS }) {
  return (
    <div>
      <h3 className="inline-block border-b border-gold/40 pb-2 font-serif text-[13px] font-semibold text-gold">
        {title}
      </h3>
      <ul className="mt-5 space-y-3.5">
        {links.map((link) => (
          <li key={link.href}>
            <FooterLink href={link.href}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night text-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-green/[0.06] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-[350px] w-[350px] rounded-full bg-gold/[0.04] blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-[930px] px-5 py-12 sm:px-7 sm:py-14 md:px-8 md:py-14 lg:px-0">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-[1.25fr_1fr_1fr] md:gap-8">
          {/* BRAND */}
          <div className="border-b border-cream/[0.08] pb-9 sm:col-span-2 md:col-span-1 md:border-b-0 md:border-r md:pb-0 md:pr-8">
            <Logo />

            <p className="mt-5 max-w-[285px] text-[12px] leading-[1.8] text-cream/50">
              Guided journeys through the valleys, rivers, villages, and peaks of
              Gilgit-Baltistan.
            </p>

            <div className="mt-6 flex w-full max-w-[302px] items-center gap-3 rounded-xl border border-cream/[0.09] bg-cream/[0.025] px-3.5 py-3">
              <CompassIcon />
              <div className="min-w-0">
                <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-gold">
                  Our Home
                </p>
                <p className="mt-1 truncate text-[11px] text-cream/60">
                  Gilgit-Baltistan, Pakistan
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2.5">
              <SocialIcon href="#" label="Instagram">
                <InstagramIcon />
              </SocialIcon>
              <SocialIcon href="#" label="Facebook">
                <FacebookIcon />
              </SocialIcon>
              <SocialIcon href="#" label="WhatsApp">
                <WhatsAppIcon />
              </SocialIcon>
            </div>
          </div>

          <FooterColumn title="Explore" links={EXPLORE_LINKS} />

          <div>
            <FooterColumn title="Account" links={ACCOUNT_LINKS} />

            <Link
              href="/tours"
              className="mt-8 inline-flex items-center gap-2.5 text-[11px] font-medium text-gold transition-colors hover:text-gold/80"
            >
              <PeakMark />
              <span>Plan your journey</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-cream/[0.08] pt-5 sm:mt-11">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2.5 text-[9px] text-cream/35">
              <CompassIcon />
              <span>35.9° N, 74.3° E — Gilgit-Baltistan</span>
            </div>

            <p className="text-[9px] text-cream/35 sm:text-right">
              © {new Date().getFullYear()} Discover Gilgit. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
