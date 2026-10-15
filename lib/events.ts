/**
 * Events that have their own page, for the navbar's events menu. To list a new
 * event, give it a page and add it here — it then appears under its month for
 * as long as it's upcoming, and drops off by itself once its end date passes.
 *
 * Only real, existing pages belong here. (The festival's date and location are
 * also written into components/FestivalPage.tsx and FeaturedEvent.tsx — keep
 * them in step if the festival changes.)
 */

import type { DistrictSlug } from "./districts";

export type SiteEvent = {
  slug: string;
  title: string;
  href: string;
  /** First day, YYYY-MM-DD. */
  startDate: string;
  /** Last day, YYYY-MM-DD — omit for a single-day event. */
  endDate?: string;
  /** Which district page lists it. Leave out to keep it off district pages. */
  district?: DistrictSlug;
  /** Shown under the name in the menu. Omit and the line shows just the date. */
  location?: string;
};

export const EVENTS: SiteEvent[] = [
  {
    slug: "gilgit-cultural-festival",
    title: "Gilgit-Baltistan Cultural Festival",
    href: "/tours/gilgit-cultural-festival",
    startDate: "2027-08-12",
    endDate: "2027-08-14",
    location: "Gilgit City",
    district: "gilgit",
  },
];
