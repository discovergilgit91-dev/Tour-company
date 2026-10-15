/**
 * The content of the navbar's "Destinations" dropdown: regions, each with the
 * places that open in its flyout. This is the ONE place to add, remove or
 * reorder them — the menu components read it as-is.
 *
 * Each place has:
 *   name       — what the row says.
 *   elevation  — shown as the small second line, e.g. "2,200 m". Leave it out
 *                (or "") and the line is hidden. Only fill in real figures.
 *   slug       — the slug of its page at /destinations/<slug>. A place with no
 *                slug (no page yet) links to its region's section on /lands
 *                instead of a dead page; add the slug once its page exists.
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

export type MenuRegion = {
  id: string;
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
      { name: "Altit & Baltit Forts", elevation: "" },
      { name: "Khunjerab Pass", elevation: "4,700 m", slug: "khunjerab-pass" },
      { name: "Hopar Glacier", elevation: "2,700 m", slug: "hopar-glacier" },
    ],
  },
  {
    id: "skardu",
    label: "Skardu",
    href: "/lands#baltistan",
    places: [
      { name: "Skardu & Katpana", elevation: "2,230 m", slug: "skardu-katpana" },
      { name: "Deosai Plains", elevation: "4,114 m", slug: "deosai-plains" },
      { name: "Shangrila & Kachura Lakes", elevation: "" },
      { name: "Shigar Valley", elevation: "2,290 m", slug: "shigar-valley" },
      { name: "Manthokha Waterfall", elevation: "" },
    ],
  },
  {
    id: "diamer",
    label: "Diamer",
    href: "/lands#diamer-astore",
    places: [
      { name: "Fairy Meadows", elevation: "3,300 m", slug: "fairy-meadows" },
      { name: "Nanga Parbat Base Camp", elevation: "" },
      { name: "Babusar Top", elevation: "" },
      { name: "Chilas", elevation: "" },
    ],
  },
  {
    id: "ghizer",
    label: "Ghizer",
    href: "/lands#gilgit-ghizer",
    places: [
      { name: "Phander Lake", elevation: "" },
      { name: "Gupis", elevation: "" },
      { name: "Khalti Lake", elevation: "" },
      { name: "Shandur Pass", elevation: "" },
    ],
  },
  {
    id: "astore",
    label: "Astore",
    href: "/lands#diamer-astore",
    places: [
      { name: "Rama Meadows & Lake", elevation: "" },
      { name: "Minimarg", elevation: "" },
      { name: "Rupal Valley", elevation: "" },
      { name: "Domail", elevation: "" },
    ],
  },
];
