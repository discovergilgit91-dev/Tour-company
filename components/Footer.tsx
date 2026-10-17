import Link from "next/link";
import { Logo, LogoIcon } from "./ui/Logo";
import {
  ArrowIcon,
  CompassIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "./ui/icons";
import { BLOG_POSTS } from "@/lib/blog";
import { NAV_LINKS, navHref } from "@/lib/nav";
import { getNavMenus, type NavMenu } from "@/lib/navMenus";
import FooterMenuGroup from "./FooterMenuGroup";

type FooterLinkItem = { href: string; label: string };

const ACCOUNT_LINKS: FooterLinkItem[] = [
  { href: "/sign-in", label: "Sign In" },
  { href: "/sign-up", label: "Sign Up" },
  { href: "/book", label: "Book a Trip" },
];

const CONTACT_DETAILS = [
  {
    label: "Email",
    value: "hello@discovergilgit.com",
    href: "mailto:hello@discovergilgit.com",
    Icon: MailIcon,
  },
  {
    label: "Phone",
    value: "+92 355 123 4567",
    href: "tel:+923551234567",
    Icon: PhoneIcon,
  },
  {
    label: "Office",
    value: "Jutial Road, Gilgit, Gilgit-Baltistan",
    href: undefined,
    Icon: PinIcon,
  },
];

// Paste the full profile URLs here (e.g. "https://instagram.com/<handle>") and the
// icons appear; while a value is empty the icon is left out, because an icon
// that goes nowhere is worse than none.
const INSTAGRAM_URL = "";
const FACEBOOK_URL = "";

function InstagramIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="5.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M14.5 21v-7.2h2.4l.4-2.8h-2.8V9.1c0-.8.2-1.4 1.4-1.4h1.5V5.2C16.9 5.1 15.9 5 14.8 5c-2.5 0-4.2 1.5-4.2 4.3v2.7H8.2v2.8h2.4V21h3.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
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

const SOCIAL_LINKS: {
  href: string;
  label: string;
  Icon: () => React.JSX.Element;
}[] = [
  { href: INSTAGRAM_URL, label: "Instagram", Icon: InstagramIcon },
  { href: FACEBOOK_URL, label: "Facebook", Icon: FacebookIcon },
  // wa.me opens a WhatsApp chat with the same number shown under Contact.
  { href: "https://wa.me/923551234567", label: "WhatsApp", Icon: WhatsAppIcon },
].filter((link) => link.href);

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 lg:h-8 lg:w-8 text-cream/55 transition-all duration-200 hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
    >
      {children}
    </a>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-11 items-center justify-between gap-4 text-[0.8125rem] text-cream/60 transition-colors hover:text-cream lg:min-h-0"
    >
      <span>{children}</span>
      <ArrowIcon />
    </Link>
  );
}

function FooterColumn({
  title,
  links,
  className = "",
  listClassName = "space-y-0 lg:space-y-2.5",
  viewAll,
}: {
  title: string;
  links: FooterLinkItem[];
  className?: string;
  /** Layout of the link list — e.g. a two-column grid for the wide Destinations / Tours & Events groups. */
  listClassName?: string;
  /** Closing link under the list, in the same gold style as "Plan your journey". */
  viewAll?: FooterLinkItem;
}) {
  return (
    <div className={className}>
      <h3 className="inline-block border-b border-gold/40 pb-2 font-serif text-[0.8125rem] font-semibold text-gold">
        {title}
      </h3>
      <ul className={`mt-4 ${listClassName}`}>
        {links.map((link) => (
          <li key={link.href}>
            <FooterLink href={link.href}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>

      {viewAll && (
        <Link
          href={viewAll.href}
          className="mt-2 inline-flex min-h-11 items-center gap-2.5 text-[0.8125rem] font-medium text-gold transition-colors hover:text-gold/80 lg:mt-4 lg:min-h-0"
        >
          <span>{viewAll.label}</span>
          <ArrowIcon />
        </Link>
      )}
    </div>
  );
}

/** A header dropdown, laid out for the footer: every section (with its small heading) and every group, in the dropdown's own order. */
function FooterMenu({
  title,
  menu,
  showDetail = false,
}: {
  title: string;
  menu: NavMenu;
  showDetail?: boolean;
}) {
  const sections = menu.sections ?? [];

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="inline-block border-b border-gold/40 pb-2 font-serif text-[0.8125rem] font-semibold text-gold">
          {title}
        </h3>
        <Link
          href={menu.viewAll.href}
          className="inline-flex min-h-11 items-center gap-2.5 text-[0.8125rem] font-medium text-gold transition-colors hover:text-gold/80 lg:min-h-0"
        >
          <span>{menu.viewAll.label}</span>
          <ArrowIcon />
        </Link>
      </div>

      <div className="mt-4 grid gap-x-8 gap-y-6 lg:grid-cols-[repeat(4,minmax(0,1fr))]">
        {sections.map((section, index) => {
          // A lone section takes the full width; with two, the long first one gets three columns and the second one.
          const wide = sections.length === 1;
          return (
            <div
              key={section.eyebrow ?? index}
              className={
                wide
                  ? "lg:col-span-4"
                  : index === 0
                    ? "lg:col-span-3"
                    : "lg:col-span-1"
              }
            >
              {section.eyebrow && (
                <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-cream/45">
                  {section.eyebrow}
                </p>
              )}
              {section.groups.length === 0 ? (
                <p className="text-[0.8125rem] text-cream/50">
                  {section.emptyText}
                </p>
              ) : (
                <div
                  className={
                    wide
                      ? "gap-x-8 lg:columns-4"
                      : index === 0
                        ? "gap-x-8 lg:columns-3"
                        : ""
                  }
                >
                  {section.groups.map((group) => (
                    <FooterMenuGroup
                      key={group.id}
                      group={group}
                      showDetail={showDetail}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Footer() {
  // Same helper the header uses: section links ("#reviews") become "/#reviews"
  // so they work from any page, real page links ("/lands") pass through.
  const exploreLinks: FooterLinkItem[] = NAV_LINKS.map((link) => ({
    ...link,
    href: navHref(link.href),
  }));

  // The same destinations and tours/events as the header dropdowns — both are
  // built from lib/navMenus.ts, so the two can never drift apart.
  const menus = getNavMenus();

  // The two newest articles, shown under Account (the shortest column) so the
  // footer doesn't grow a row for them.
  const latestPosts: FooterLinkItem[] = BLOG_POSTS.slice(0, 2).map((post) => ({
    href: `/blog/${post.slug}`,
    label: post.title,
  }));
  const destinationsMenu = menus.find((menu) => menu.label === "Destinations");
  const toursMenu = menus.find(
    (menu) => menu.label === "Upcoming Tours & Events",
  );

  return (
    <footer className="relative overflow-hidden bg-night text-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[26.25rem] w-[26.25rem] rounded-full bg-green/[0.06] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-[21.875rem] w-[21.875rem] rounded-full bg-gold/[0.04] blur-3xl"
      />

      {/* Same container as every section above (WhyChooseUs, AboutStory, UpcomingTours, ...):
          max-w-7xl + px-5 sm:px-6 lg:px-8, so the footer's edges line up with
          the rest of the page at every width. */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-8 pb-[calc(env(safe-area-inset-bottom)+5rem)] sm:px-6 sm:pt-9 lg:px-8 lg:pt-10">
        {/* Brand gets its own full-width row at every breakpoint below
            desktop (sm:grid-cols-3 + sm:col-span-3), with Explore/Account/
            Contact sharing the row below it — two rows instead of the four
            stacking one-per-row the way a plain sm:grid-cols-2 would leave
            Brand and Contact (the two widest blocks) each alone on a row. */}
        {/* Both link rows below sit on this same grid (1 → 3 → 4 columns, same
            gap-8, same lg:pr-8 padding inside each column), so every column
            and divider lines up with the one above or below it. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-7 lg:grid-cols-4">
          {/* BRAND */}
          <div className="border-b border-cream/[0.08] pb-6 col-span-2 sm:col-span-3 sm:pb-7 lg:col-span-1 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
            <Logo />

            <p className="mt-4 max-w-[17.8125rem] text-[0.8125rem] leading-[1.7] text-cream/60">
              Guided journeys through the valleys, rivers, villages, and peaks
              of Gilgit-Baltistan.
            </p>

            <div className="mt-5 flex w-full max-w-[18.875rem] items-center gap-3 rounded-xl border border-cream/[0.09] bg-cream/[0.025] px-3.5 py-3">
              <CompassIcon />
              <div className="min-w-0">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-gold">
                  Our Home
                </p>
                <p className="mt-1 truncate text-[0.8125rem] text-cream/60">
                  Gilgit-Baltistan, Pakistan
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2.5">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <SocialIcon key={label} href={href} label={label}>
                  <Icon />
                </SocialIcon>
              ))}
            </div>
          </div>

          <FooterColumn
            title="Explore"
            links={exploreLinks}
            className="lg:border-r lg:border-cream/[0.08] lg:pr-8"
          />
          <div className="space-y-7 lg:border-r lg:border-cream/[0.08] lg:pr-8">
            <FooterColumn title="Account" links={ACCOUNT_LINKS} />
            {latestPosts.length > 0 && (
              <FooterColumn
                title="Latest from the blog"
                links={latestPosts}
                viewAll={{ href: "/blog", label: "Read the blog" }}
              />
            )}
          </div>

          {/* CONTACT */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="inline-block border-b border-gold/40 pb-2 font-serif text-[0.8125rem] font-semibold text-gold">
              Contact
            </h3>

            <ul className="mt-4 space-y-3">
              {CONTACT_DETAILS.map(({ label, value, href, Icon }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cream/15 text-cream/55">
                    <Icon size={14} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-cream/50">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="mt-0.5 flex min-h-11 items-center break-words text-[0.8125rem] leading-snug text-cream/70 transition-colors hover:text-cream lg:min-h-0"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-[0.8125rem] leading-snug text-cream/70">
                        {value}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href="/plan-your-trip"
              className="mt-2 inline-flex min-h-11 items-center gap-2.5 text-[0.8125rem] font-medium text-gold transition-colors hover:text-gold/80 lg:mt-4 lg:min-h-0"
            >
              <LogoIcon className="h-5 w-6" tone="light" />
              <span>Plan your journey</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>

        {/* Second row: the same two menus as the header dropdowns, group for
            group (regions and their places; tours by region; events by month),
            read from the same getNavMenus() data. */}
        {destinationsMenu && toursMenu && (
          <div className="mt-7 space-y-7 border-t border-cream/[0.08] pt-7 sm:mt-8 sm:space-y-8 sm:pt-8">
            <FooterMenu title="Destinations" menu={destinationsMenu} />
            <FooterMenu title="Tours & Events" menu={toursMenu} showDetail />
          </div>
        )}

        <div className="mt-7 border-t border-cream/[0.08] pt-4 sm:mt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2.5 text-[0.75rem] text-cream/50">
              <CompassIcon />
              <span>35.9° N, 74.3° E — Gilgit-Baltistan</span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.75rem] text-cream/50 sm:justify-end">
              <Link
                href="/terms"
                className="inline-flex min-h-11 items-center transition-colors hover:text-cream/70 lg:min-h-0"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="inline-flex min-h-11 items-center transition-colors hover:text-cream/70 lg:min-h-0"
              >
                Privacy
              </Link>
              <p>
                © {new Date().getFullYear()} Discover Gilgit. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
