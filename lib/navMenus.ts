import { DESTINATIONS } from "./destinations";
import { DESTINATION_MENU_REGIONS } from "./destinationMenu";
import { EVENTS } from "./events";
import { getAllTourSlugs, getTourDetail } from "./tourDetails";
import { formatDay, formatMonth, formatRange, isUpcoming, monthKey, parseDateRange, parseIsoDay, today } from "./tripDates";

/**
 * Content of the two header dropdowns ("Destinations" and "Upcoming Tours &
 * Events"). Everything is looked up from the site's real data by slug, so a
 * rename or a changed date flows through. Used only on the server (Header.tsx)
 * and handed to the client header as plain props, which keeps the large
 * destination/tour data modules out of the browser bundle.
 */

export type NavMenuItem = {
  href: string;
  label: string;
  /** Small muted second line, e.g. an altitude or a date range. */
  detail?: string;
};

/** One group of a two-level menu (a region, a month…): a row in the dropdown that opens a flyout of its items. */
export type NavRegion = {
  id: string;
  label: string;
  /** Where the group name itself goes. */
  href: string;
  /** Small muted second line, e.g. "6 places". */
  detail: string;
  items: NavMenuItem[];
  /** Closing row in the flyout — leave out for no row. */
  viewAll?: { href: string; label: string };
};

/** A block of groups in a two-level menu, with its own small heading. */
export type NavSection = {
  /** Small uppercase heading above the section's groups. The menu's own eyebrow is used when the first section has none. */
  eyebrow?: string;
  groups: NavRegion[];
  /** Shown instead of the groups when there are none. */
  emptyText?: string;
};

export type NavMenu = {
  /** Matches the label of the NAV_LINKS entry this dropdown belongs to. */
  label: string;
  /** Small uppercase heading at the top of the panel. */
  eyebrow: string;
  items: NavMenuItem[];
  /** When present, the header shows these two-level sections (each group opens a flyout) instead of `items`. The footer keeps using `items`. */
  sections?: NavSection[];
  viewAll: { href: string; label: string };
  /** The header dropdown's closing row, when it should differ from the footer's `viewAll`. */
  dropdownViewAll?: { href: string; label: string };
};

// A spread across Hunza, Skardu and Diamer — the same places the homepage
// features, plus two of the most-visited lakes and peaks.
const POPULAR_DESTINATION_SLUGS = [
  "karimabad",
  "attabad-lake",
  "passu-cones",
  "skardu-katpana",
  "deosai-plains",
  "fairy-meadows",
];

// The dated tours at the top of /tours. The festival is a separate event page,
// so its entry is written out here (same title and dates as FeaturedEvent).
const TOUR_SLUGS = ["hunza-spring", "rakaposhi-trek", "altit-baltit", "nanga-parbat-camping"];

const FESTIVAL: NavMenuItem = {
  href: "/tours/gilgit-cultural-festival",
  label: "Gilgit-Baltistan Cultural Festival",
  detail: "12 Aug – 14 Aug, 2027 · Gilgit City",
};

function getDestinationRegions(): NavRegion[] {
  return DESTINATION_MENU_REGIONS.map((region) => ({
    id: region.id,
    label: region.label,
    href: region.href,
    detail: `${region.places.length} ${region.places.length === 1 ? "place" : "places"}`,
    items: region.places.map((place) => {
      const hasPage = Boolean(place.slug && DESTINATIONS.some((d) => d.slug === place.slug));
      return {
        // No page yet → the region's section, never a dead link.
        href: hasPage ? `/destinations/${place.slug}` : region.href,
        label: place.name,
        detail: place.elevation?.trim() || undefined,
      };
    }),
    viewAll: { href: region.href, label: `View all in ${region.label}` },
  }));
}

const plural = (count: number, one: string, many: string) => `${count} ${count === 1 ? one : many}`;

/**
 * Upcoming tours grouped by the region they start in (same regions and order as
 * the Destinations menu). Tours whose dates have passed — or can't be read —
 * are left out, soonest first, and a region with no tours left disappears.
 */
function getTourGroups(): NavRegion[] {
  const now = today();

  const upcoming = getAllTourSlugs().flatMap((slug) => {
    const tour = getTourDetail(slug);
    const range = tour ? parseDateRange(tour.dateRange) : null;
    return tour && range && isUpcoming(range, now) ? [{ tour, range }] : [];
  });

  return DESTINATION_MENU_REGIONS.flatMap((region) => {
    const tours = upcoming
      .filter(({ tour }) => tour.menuRegion === region.id)
      .sort((a, b) => a.range.start.getTime() - b.range.start.getTime() || a.tour.title.localeCompare(b.tour.title));
    if (tours.length === 0) return [];

    return [
      {
        id: `tours-${region.id}`,
        label: region.label,
        // There are no region pages: the tours listing is the closest real page.
        href: "/tours",
        detail: plural(tours.length, "tour", "tours"),
        items: tours.map(({ tour, range }) => {
          // "5 Days / 4 Nights" → "5 days"; hidden when the duration isn't stored in that form.
          const days = Number(tour.duration.match(/^\s*(\d+)\s*days?/i)?.[1]);
          return {
            href: tour.href,
            label: tour.title,
            detail:
              [formatDay(range.start, now), days > 0 ? plural(days, "day", "days") : ""].filter(Boolean).join(" · ") ||
              undefined,
          };
        }),
      },
    ];
  });
}

/** Upcoming events grouped by the month they start in, soonest first. */
function getEventGroups(): NavRegion[] {
  const now = today();

  const upcoming = EVENTS.flatMap((event) => {
    const start = parseIsoDay(event.startDate);
    const end = event.endDate ? parseIsoDay(event.endDate) : start;
    return start && end && isUpcoming({ start, end }, now) ? [{ event, start, end }] : [];
  }).sort((a, b) => a.start.getTime() - b.start.getTime() || a.event.title.localeCompare(b.event.title));

  const months = new Map<string, typeof upcoming>();
  for (const entry of upcoming) {
    const key = monthKey(entry.start);
    months.set(key, [...(months.get(key) ?? []), entry]);
  }

  return [...months.entries()].map(([key, entries]) => ({
    id: `events-${key}`,
    label: formatMonth(entries[0].start),
    // There is no events listing page: the month row opens its first event.
    href: entries[0].event.href,
    detail: plural(entries.length, "event", "events"),
    items: entries.map(({ event, start, end }) => ({
      href: event.href,
      label: event.title,
      detail: [formatRange({ start, end }, now), event.location].filter(Boolean).join(" · ") || undefined,
    })),
  }));
}

export function getNavMenus(): NavMenu[] {
  const destinationItems: NavMenuItem[] = POPULAR_DESTINATION_SLUGS.flatMap((slug) => {
    const destination = DESTINATIONS.find((d) => d.slug === slug);
    return destination
      ? [{ href: `/destinations/${destination.slug}`, label: destination.name, detail: destination.altitude }]
      : [];
  });

  const tourItems: NavMenuItem[] = TOUR_SLUGS.flatMap((slug) => {
    const tour = getTourDetail(slug);
    return tour ? [{ href: `/tours/${tour.slug}`, label: tour.title, detail: `${tour.dateRange}` }] : [];
  });

  return [
    {
      label: "Destinations",
      eyebrow: "Popular destinations",
      items: destinationItems,
      sections: [{ groups: getDestinationRegions() }],
      viewAll: { href: "/lands", label: "View all destinations" },
    },
    {
      label: "Upcoming Tours & Events",
      eyebrow: "Coming up",
      items: [...tourItems, FESTIVAL],
      sections: [
        { eyebrow: "Upcoming tours", groups: getTourGroups(), emptyText: "New tours coming soon" },
        { eyebrow: "Events", groups: getEventGroups(), emptyText: "New events coming soon" },
      ],
      // The footer keeps its own label; the header dropdown's closing row is the tours listing.
      viewAll: { href: "/tours", label: "View all tours & events" },
      dropdownViewAll: { href: "/tours", label: "View all tours" },
    },
  ];
}
