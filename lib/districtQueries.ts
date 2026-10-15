import type { Destination } from "@/components/DestinationCard";
import { BLOG_POSTS, type BlogPost } from "./blog";
import { DISTRICTS, type District } from "./districts";
import { DESTINATIONS, REGIONS } from "./destinations";
import { EVENTS, type SiteEvent } from "./events";
import { TOUR_HERO_IMAGES, getAllTourSlugs, getTourDetail, type TourDetail } from "./tourDetails";
import { formatRange, isUpcoming, parseDateRange, parseIsoDay, today, type DayRange } from "./tripDates";

/**
 * Everything a district page pulls from the rest of the site. Server-side only.
 * Nothing here is typed in by hand: places, tours, events and articles all come
 * from the site's own data, so a new Hunza destination, tour, event or tagged
 * post shows up on the Hunza page by itself.
 */

/** The destination pages that belong to this district — only ones with a real page. */
export function getDistrictPlaces(district: District): Destination[] {
  const ids = new Set<string>([
    ...(district.places.regionId ? (REGIONS.find((region) => region.id === district.places.regionId)?.ids ?? []) : []),
    ...(district.places.ids ?? []),
  ]);
  return DESTINATIONS.filter((destination) => ids.has(destination.id) && destination.slug && destination.href);
}

/** The district a destination page belongs to (for its "Part of …" link). */
export function getDistrictForDestination(destinationId: string): District | undefined {
  return DISTRICTS.find((district) => getDistrictPlaces(district).some((place) => place.id === destinationId));
}

/** "2,100 m – 4,700 m" from the places' own elevations; undefined when none have one. */
export function getAltitudeRange(places: Destination[]): string | undefined {
  const metres = places
    .map((place) => Number(place.altitude.replace(/[^\d]/g, "")))
    .filter((value) => Number.isFinite(value) && value > 0);
  if (metres.length === 0) return undefined;
  // Non-breaking space keeps "4,700 m" on one line.
  const format = (value: number) => `${value.toLocaleString("en-US")}\u00A0m`;
  const low = Math.min(...metres);
  const high = Math.max(...metres);
  return low === high ? format(low) : `${format(low)} – ${format(high)}`;
}

export type DistrictTour = {
  tour: TourDetail;
  image?: { src: string; alt: string };
  range: DayRange;
  datesLabel: string;
};

/** Upcoming tours for this district, soonest first. A tour with unreadable dates is left out. */
export function getDistrictTours(district: District): DistrictTour[] {
  const now = today();
  return getAllTourSlugs()
    .flatMap((slug) => {
      const tour = getTourDetail(slug);
      const range = tour ? parseDateRange(tour.dateRange) : null;
      if (!tour || !range || !isUpcoming(range, now)) return [];
      if ((tour.district ?? tour.menuRegion) !== district.slug) return [];
      return [{ tour, image: TOUR_HERO_IMAGES[tour.slug], range, datesLabel: tour.dateRange }];
    })
    .sort((a, b) => a.range.start.getTime() - b.range.start.getTime() || a.tour.title.localeCompare(b.tour.title));
}

export type DistrictEvent = { event: SiteEvent; datesLabel: string };

/** Upcoming events for this district, soonest first. */
export function getDistrictEvents(district: District): DistrictEvent[] {
  const now = today();
  return EVENTS.flatMap((event) => {
    const start = parseIsoDay(event.startDate);
    const end = event.endDate ? parseIsoDay(event.endDate) : start;
    if (!start || !end || event.district !== district.slug || !isUpcoming({ start, end }, now)) return [];
    return [{ event, start, datesLabel: formatRange({ start, end }, now) }];
  })
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .map(({ event, datesLabel }) => ({ event, datesLabel }));
}

/** Blog posts tagged for this district, newest first. */
export function getDistrictPosts(district: District): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.districts?.includes(district.slug));
}
