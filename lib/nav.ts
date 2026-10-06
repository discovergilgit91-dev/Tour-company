export const NAV_LINKS = [
  { href: "#why-choose-us", label: "Why Choose Us" },
  { href: "/lands", label: "Destinations" },
  { href: "#our-story", label: "Our Story" },
  { href: "/tours", label: "Upcoming Tours & Events" },
  { href: "#reviews", label: "Reviews" },
  { href: "/plan-your-trip", label: "Plan Your Trip" },
];

/**
 * Hash hrefs ("#reviews") only point at something on the homepage, where those
 * sections live. Prefixing "/" makes them work from every page: on the
 * homepage it's a same-page smooth scroll, anywhere else Next navigates to the
 * homepage and then scrolls to the section. Real paths pass through untouched.
 */
export function navHref(href: string): string {
  return href.startsWith("#") ? `/${href}` : href;
}
