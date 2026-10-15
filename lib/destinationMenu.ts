/**
 * The content of the navbar's "Destinations" dropdown: regions, each with the
 * places that open in its flyout. This is the ONE place to add, remove or
 * reorder them — the menu components read it as-is.
 *
 * Each place has:
 *   name       — what the row says.
 *   elevation  — shown as the small second line, e.g. "2,200 m". Leave it out
 *                (or "") and the line is hidden. Only fill in real figures.
 *   slug       — the slug of its page at /destinations/<slug>. Only places that
 *                have a page are listed (every destination on the /lands page,
 *                under the region it sits in). To add a place, create its page
 *                first, then add it here with its slug. (An entry with no slug
 *                would link to its region's section on /lands.)
 *
 * Each region's `href` is where clicking the region name (and "View all in …")
 * goes. There are no per-region pages yet, so these point at the matching
 * region section on /lands (ids come from REGIONS in lib/destinations.ts);
 * swap in a dedicated region URL here whenever one exists.
 */

export type MenuPlace = {
  name: string;
  elevation?: string;
  slug?: string;
};

/** The five regions the navbar menus group by. Tours (lib/tourDetails.ts) point at one of these. */
export type MenuRegionId = "hunza" | "skardu" | "diamer" | "ghizer" | "astore";

export type MenuRegion = {
  id: MenuRegionId;
  label: string;
  href: string;
  places: MenuPlace[];
};

export const DESTINATION_MENU_REGIONS: MenuRegion[] = [
  {
    id: "hunza",
    label: "Hunza",
    href: "/lands#hunza",
    places: [
      { name: "Karimabad", elevation: "2,200 m", slug: "karimabad" },
      { name: "Attabad Lake", elevation: "2,560 m", slug: "attabad-lake" },
      { name: "Passu Cones", elevation: "2,400 m", slug: "passu-cones" },
      { name: "Baltit Fort", elevation: "2,220 m", slug: "baltit-fort" },
      { name: "Altit Fort", elevation: "2,100 m", slug: "altit-fort" },
      { name: "Khunjerab Pass", elevation: "4,700 m", slug: "khunjerab-pass" },
      { name: "Hopar Glacier", elevation: "2,700 m", slug: "hopar-glacier" },
      { name: "Borith Lake", elevation: "2,600 m", slug: "borith-lake" },
      { name: "Shimshal Valley", elevation: "3,100 m", slug: "shimshal-valley" },
      { name: "Rakaposhi Base Camp", elevation: "3,200 m", slug: "rakaposhi-base-camp" },
      { name: "Minapin Glacier", elevation: "2,800 m", slug: "minapin-glacier" },
      { name: "Rush Lake", elevation: "4,694 m", slug: "rush-lake" },
    ],
  },
  {
    id: "skardu",
    label: "Skardu",
    href: "/lands#baltistan",
    places: [
      { name: "Skardu & Katpana", elevation: "2,230 m", slug: "skardu-katpana" },
      { name: "Deosai Plains", elevation: "4,114 m", slug: "deosai-plains" },
      { name: "Shangrila & Kachura Lakes", elevation: "2,500 m", slug: "kachura-lake" },
      { name: "Shigar Valley", elevation: "2,290 m", slug: "shigar-valley" },
    ],
  },
  {
    id: "diamer",
    label: "Diamer",
    href: "/lands#diamer-astore",
    places: [
      { name: "Fairy Meadows", elevation: "3,300 m", slug: "fairy-meadows" },
      { name: "Kutwal Lake", elevation: "3,077 m", slug: "kutwal-lake" },
    ],
  },
  {
    id: "ghizer",
    label: "Ghizer",
    href: "/lands#gilgit-ghizer",
    places: [
      { name: "Ghizer Valley", elevation: "2,150 m", slug: "ghizer-valley" },
      { name: "Yasin Valley", elevation: "2,500 m", slug: "yasin-valley" },
      { name: "Phander Lake", elevation: "2,900 m", slug: "phander-valley" },
      { name: "Naltar Valley", elevation: "2,800 m", slug: "naltar-valley" },
    ],
  },
  {
    id: "astore",
    label: "Astore",
    href: "/lands#diamer-astore",
    places: [
      { name: "Rama Meadows & Lake", elevation: "3,300 m", slug: "rama-lake" },
      { name: "Harmosh Valley", elevation: "3,100 m", slug: "harmosh-valley" },
    ],
  },
];
