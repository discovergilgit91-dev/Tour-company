import { DESTINATIONS } from "./destinations";
import { DESTINATION_MENU_REGIONS } from "./destinationMenu";
import { getTourDetail } from "./tourDetails";

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

/** One region of a two-level menu: a row in the dropdown that opens a flyout of its places. */
export type NavRegion = {
  id: string;
  label: string;
  /** Where the region name itself goes. */
  href: string;
  /** Small muted second line, e.g. "6 places". */
  detail: string;
  items: NavMenuItem[];
  viewAll: { href: string; label: string };
};

export type NavMenu = {
  /** Matches the label of the NAV_LINKS entry this dropdown belongs to. */
  label: string;
  /** Small uppercase heading at the top of the panel. */
  eyebrow: string;
  items: NavMenuItem[];
  /** When present, the header shows these regions (each with a flyout of places) instead of `items`. The footer keeps using `items`. */
  regions?: NavRegion[];
  viewAll: { href: string; label: string };
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
      regions: getDestinationRegions(),
      viewAll: { href: "/lands", label: "View all destinations" },
    },
    {
      label: "Upcoming Tours & Events",
      eyebrow: "Coming up",
      items: [...tourItems, FESTIVAL],
      viewAll: { href: "/tours", label: "View all tours & events" },
    },
  ];
}
