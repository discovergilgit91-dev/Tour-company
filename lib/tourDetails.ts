import type { StatIconId } from "@/components/tours/statIcons";
import type { MotifShape } from "@/components/tours/motifs";

export type TourStat = { value: string; label: string; iconId: StatIconId };
export type TourGuide = { name: string; role: string; bio: string; from: string; to: string };
export type TourItineraryDay = { day: string; title: string; tag: string; description: string };
export type TourPhoto = { caption: string; tag: string; from: string; to: string };

/** Literal Tailwind class strings only (no runtime interpolation) so the
    JIT scanner can see and generate every one of these at build time. */
export type TourTheme = {
  motif: MotifShape;
  heroFrom: string;
  blob: string;
  motifTint: string;
  statIconBg: string;
  statIconText: string;
  statIconHoverBg: string;
};

export type TourDetail = {
  slug: string;
  href: string;
  title: string;
  tagline: string;
  badge: string;
  heroAccentLine: string;
  heroDescription: string;
  dateRange: string;
  duration: string;
  route: string;
  groupSize: string;
  level: string;
  season: string;
  price: string;
  aboutEyebrow: string;
  aboutHeadingLine1: string;
  aboutHeadingLine2: string;
  aboutText: string;
  statsEyebrow: string;
  statsHeading: string;
  statsDescription: string;
  stats: TourStat[];
  guidesIntro: string;
  guides: TourGuide[];
  itineraryHeading: string;
  itinerary: TourItineraryDay[];
  galleryIntro: string;
  photos: TourPhoto[];
  quote: string;
  quoteAuthor: string;
  ctaEyebrow: string;
  ctaHeading: string;
  ctaText: string;
  theme: TourTheme;
};

const AVATAR_HUES: [string, string][] = [
  ["from-rose-300", "to-forest"],
  ["from-amber-300", "to-forest"],
  ["from-teal-300", "to-forest"],
  ["from-purple-300", "to-forest"],
  ["from-sky-300", "to-forest"],
  ["from-emerald-300", "to-forest"],
  ["from-indigo-300", "to-forest"],
  ["from-orange-300", "to-forest"],
];

const PHOTO_HUES: [string, string][] = [
  ["from-amber-300/70", "to-forest"],
  ["from-rose-300/70", "to-forest"],
  ["from-teal-300/70", "to-forest"],
  ["from-emerald-300/70", "to-forest"],
  ["from-orange-300/70", "to-forest"],
  ["from-purple-300/70", "to-forest"],
  ["from-sky-300/70", "to-forest"],
  ["from-indigo-300/70", "to-forest"],
];

function guides(rows: [string, string, string][]): TourGuide[] {
  return rows.map(([name, role, bio], i) => ({
    name,
    role,
    bio,
    from: AVATAR_HUES[i % AVATAR_HUES.length][0],
    to: AVATAR_HUES[i % AVATAR_HUES.length][1],
  }));
}

function photos(rows: [string, string][]): TourPhoto[] {
  return rows.map(([caption, tag], i) => ({
    caption,
    tag,
    from: PHOTO_HUES[i % PHOTO_HUES.length][0],
    to: PHOTO_HUES[i % PHOTO_HUES.length][1],
  }));
}

const THEME_SNOWFLAKE_SKY: TourTheme = {
  motif: "snowflake",
  heroFrom: "from-sky-950/40",
  blob: "bg-sky-400/10",
  motifTint: "text-sky-300",
  statIconBg: "bg-sky-500/[0.08]",
  statIconText: "text-sky-700",
  statIconHoverBg: "group-hover:bg-sky-700",
};

const THEME_SNOWFLAKE_INDIGO: TourTheme = {
  motif: "snowflake",
  heroFrom: "from-indigo-950/40",
  blob: "bg-indigo-400/10",
  motifTint: "text-indigo-300",
  statIconBg: "bg-indigo-500/[0.08]",
  statIconText: "text-indigo-700",
  statIconHoverBg: "group-hover:bg-indigo-700",
};

const THEME_SNOWFLAKE_BLUE: TourTheme = {
  motif: "snowflake",
  heroFrom: "from-blue-950/40",
  blob: "bg-blue-400/10",
  motifTint: "text-blue-300",
  statIconBg: "bg-blue-500/[0.08]",
  statIconText: "text-blue-700",
  statIconHoverBg: "group-hover:bg-blue-700",
};

const THEME_FORT_AMBER: TourTheme = {
  motif: "fort",
  heroFrom: "from-amber-950/40",
  blob: "bg-amber-400/10",
  motifTint: "text-amber-300",
  statIconBg: "bg-amber-500/[0.1]",
  statIconText: "text-amber-700",
  statIconHoverBg: "group-hover:bg-amber-700",
};

const THEME_FORT_YELLOW: TourTheme = {
  motif: "fort",
  heroFrom: "from-yellow-950/40",
  blob: "bg-yellow-400/10",
  motifTint: "text-yellow-300",
  statIconBg: "bg-yellow-500/[0.12]",
  statIconText: "text-yellow-700",
  statIconHoverBg: "group-hover:bg-yellow-700",
};

const THEME_LEAF_EMERALD: TourTheme = {
  motif: "leaf",
  heroFrom: "from-emerald-950/40",
  blob: "bg-emerald-400/10",
  motifTint: "text-emerald-300",
  statIconBg: "bg-emerald-500/[0.08]",
  statIconText: "text-emerald-700",
  statIconHoverBg: "group-hover:bg-emerald-700",
};

const THEME_LEAF_LIME: TourTheme = {
  motif: "leaf",
  heroFrom: "from-lime-950/40",
  blob: "bg-lime-400/10",
  motifTint: "text-lime-300",
  statIconBg: "bg-lime-500/[0.1]",
  statIconText: "text-lime-700",
  statIconHoverBg: "group-hover:bg-lime-700",
};

const THEME_WAVE_TEAL: TourTheme = {
  motif: "wave",
  heroFrom: "from-teal-950/40",
  blob: "bg-teal-400/10",
  motifTint: "text-teal-300",
  statIconBg: "bg-teal-500/[0.08]",
  statIconText: "text-teal-700",
  statIconHoverBg: "group-hover:bg-teal-700",
};

const THEME_WAVE_CYAN: TourTheme = {
  motif: "wave",
  heroFrom: "from-cyan-950/40",
  blob: "bg-cyan-400/10",
  motifTint: "text-cyan-300",
  statIconBg: "bg-cyan-500/[0.08]",
  statIconText: "text-cyan-700",
  statIconHoverBg: "group-hover:bg-cyan-700",
};

const THEME_DUNE_ORANGE: TourTheme = {
  motif: "dune",
  heroFrom: "from-orange-950/40",
  blob: "bg-orange-400/10",
  motifTint: "text-orange-300",
  statIconBg: "bg-orange-500/[0.08]",
  statIconText: "text-orange-700",
  statIconHoverBg: "group-hover:bg-orange-700",
};

const THEME_BLOSSOM_ROSE: TourTheme = {
  motif: "blossom",
  heroFrom: "from-rose-950/40",
  blob: "bg-rose-400/10",
  motifTint: "text-rose-300",
  statIconBg: "bg-green/[0.08]",
  statIconText: "text-green",
  statIconHoverBg: "group-hover:bg-green",
};

export const TOUR_DETAILS: Record<string, TourDetail> = {
  "hunza-spring": {
    slug: "hunza-spring",
    href: "/tours/hunza-spring",
    title: "Blossoms of Hunza",
    tagline: "Spring Tour · Blossoms & Peaks",
    badge: "SPRING SPECIAL · HUNZA VALLEY",
    heroAccentLine: "Where Petals Meet Peaks",
    heroDescription:
      "Walk beneath pink almond and cherry blossoms as they bloom against snow-capped peaks — five unforgettable days through Hunza Valley's most beautiful season.",
    dateRange: "25 May – 29 May, 2027",
    duration: "5 Days / 4 Nights",
    route: "Gilgit → Karimabad",
    groupSize: "Max 12 People",
    level: "Moderate Active",
    season: "Spring (April – May)",
    price: "$450",
    aboutEyebrow: "About this journey",
    aboutHeadingLine1: "Hunza in its",
    aboutHeadingLine2: "most beautiful season",
    aboutText:
      "For two or three weeks each spring, the terraced orchards of Hunza Valley turn white and pink beneath the snow line of Rakaposhi and Ultar Sar. This five-day journey times every stop to that brief, extraordinary window — walking trails, forts, and family orchards at the exact moment the valley is in full bloom.",
    statsEyebrow: "Why spring in Hunza",
    statsHeading: "A short season, timed perfectly",
    statsDescription:
      "The bloom lasts only a few weeks each year — this itinerary is built entirely around catching it at its best.",
    stats: [
      { value: "2–3 Wks", label: "Peak Bloom Window", iconId: "bloom" },
      { value: "8,500 ft", label: "Valley Elevation", iconId: "peak" },
      { value: "400+ Yrs", label: "Orchard Heritage", iconId: "orchard" },
      { value: "12", label: "Max Group Size", iconId: "users" },
    ],
    guidesIntro:
      "Every group travels with people who call this valley home — leading you through orchards, forts, and mountain passes, and sharing the quiet rhythms of Gilgit-Baltistan along the way.",
    guides: guides([
      [
        "Karim Nasir",
        "Lead Mountain Guide",
        "Born and raised in Karimabad, Karim has guided trekkers through Hunza's valleys and passes for over fifteen years.",
      ],
      [
        "Amina Baig",
        "Cultural Heritage Guide",
        "A historian by training, Amina brings five centuries of Altit and Baltit's stories to life at every stop.",
      ],
      [
        "Sher Ali",
        "Orchard & Homestay Host",
        "Sher's family orchard has bloomed for four generations — he welcomes every group to share tea beneath the blossoms.",
      ],
      [
        "Zarina Karim",
        "Logistics & Photography Guide",
        "Zarina scouts the season's best blossom viewpoints and makes sure every transfer and timing runs smoothly.",
      ],
    ]),
    itineraryHeading: "Five days among the blossoms",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Gilgit → Karimabad",
        tag: "Karakoram Highway",
        description:
          "Fly or drive into Gilgit, then wind along the Karakoram Highway into a valley just beginning to bloom. Settle in with a welcome dinner overlooking Rakaposhi.",
      },
      {
        day: "Day 2",
        title: "Baltit Fort & the Old Karimabad Blossom Walk",
        tag: "Karimabad",
        description:
          "A morning tour through 700-year-old Baltit Fort, followed by an afternoon on foot through Old Karimabad's terraced orchards, heavy with cherry and apricot blossom.",
      },
      {
        day: "Day 3",
        title: "Sunrise at Duikar & Eagle's Nest",
        tag: "Duikar Viewpoint",
        description:
          "Rise before dawn for Pakistan's finest valley panorama — Rakaposhi and Ultar Sar catching first light over an orchard floor turned pink and white.",
      },
      {
        day: "Day 4",
        title: "Altit Fort & the Riverside Orchards",
        tag: "Altit",
        description:
          "Explore Hunza's oldest fort, then wander the riverside orchard trails and share tea with a local family whose blossoms have bloomed for four generations.",
      },
      {
        day: "Day 5",
        title: "Farewell Breakfast & Departure",
        tag: "Gilgit",
        description:
          "One last unhurried morning among the blossoms before the transfer back to Gilgit for your onward journey.",
      },
    ],
    galleryIntro:
      "A first look at the forts, orchards, and viewpoints on this route — full galleries are added as each group returns from the trail.",
    photos: photos([
      ["Baltit Fort at Golden Hour", "Karimabad"],
      ["Blossom-Lined Terraces", "Old Karimabad"],
      ["Duikar Valley Panorama", "Duikar Viewpoint"],
      ["Riverside Orchard Walk", "Altit"],
      ["Tea with a Local Family", "Altit Orchards"],
      ["Rakaposhi at Dusk", "Karimabad"],
    ]),
    quote:
      "We timed our whole trip around this one, and it was worth it — walking beneath blossoms with Rakaposhi behind them is something photographs never quite capture.",
    quoteAuthor: "A guest from Lahore",
    ctaEyebrow: "Limited spring dates",
    ctaHeading: "Ready to see Hunza in bloom?",
    ctaText:
      "The bloom window is short and group size is capped at twelve — reserve your place before the season fills.",
    theme: THEME_BLOSSOM_ROSE,
  },

  "rakaposhi-trek": {
    slug: "rakaposhi-trek",
    href: "/tours/rakaposhi-trek",
    title: "Rakaposhi Base Camp Trek",
    tagline: "Trekking Expedition · Glaciers & Giants",
    badge: "TREKKING EXPEDITION · NAGAR VALLEY",
    heroAccentLine: "Where Glaciers Meet Giants",
    heroDescription:
      "Trek through the Hopar and Minapin glaciers to the foot of Rakaposhi, one of the world's highest unbroken rock-and-ice faces — seven days of high camps, moraine trails, and 7,000-metre views.",
    dateRange: "10 Jun – 16 Jun, 2027",
    duration: "7 Days / 6 Nights",
    route: "Nagar → Hopar → Passu",
    groupSize: "Max 10 People",
    level: "Strenuous",
    season: "Summer (June – August)",
    price: "$780",
    aboutEyebrow: "About this journey",
    aboutHeadingLine1: "Face to face",
    aboutHeadingLine2: "with a 7,000m giant",
    aboutText:
      "Rakaposhi rises 5,900 metres in one unbroken sweep from the Hunza River — among the greatest vertical rises on Earth. This trek follows glacier-fed trails through Nagar and Hopar to a base camp at 3,400 metres, with rest days built in to acclimatise properly before the final push.",
    statsEyebrow: "Why this route",
    statsHeading: "A vertical rise like nowhere else",
    statsDescription:
      "Rakaposhi's north face is one of the tallest unbroken mountain faces on the planet — this itinerary is built around acclimatising safely to see it up close.",
    stats: [
      { value: "5,900 m", label: "Vertical Rise", iconId: "peak" },
      { value: "3,400 m", label: "Base Camp Altitude", iconId: "flag" },
      { value: "2", label: "Glaciers Crossed", iconId: "snow" },
      { value: "10", label: "Max Group Size", iconId: "users" },
    ],
    guidesIntro:
      "Every group trekking to Rakaposhi Base Camp travels with certified high-altitude guides who know the glacier crossings, camp sites, and acclimatisation schedule by heart.",
    guides: guides([
      [
        "Iqbal Shah",
        "Lead Trekking Guide",
        "A licensed high-altitude guide from Nagar, Iqbal has led over sixty expeditions to Rakaposhi Base Camp.",
      ],
      [
        "Rehmat Ali",
        "Glacier & Safety Guide",
        "Trained with Pakistan's Alpine Club, Rehmat reads the Hopar icefall better than anyone in the valley.",
      ],
      [
        "Bashir Khan",
        "Camp & Logistics Manager",
        "Bashir has run high-altitude kitchens for two decades, keeping trekking groups fed and warm above 3,000 metres.",
      ],
      [
        "Nusrat Karim",
        "Acclimatisation & First Aid",
        "A certified wilderness first responder, Nusrat oversees the trek's rest days and daily altitude checks.",
      ],
    ]),
    itineraryHeading: "Seven days to base camp",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Gilgit → Nagar Valley",
        tag: "Nagar",
        description:
          "Drive along the Karakoram Highway into Nagar Valley, with Rakaposhi filling the windscreen for the final hour. Overnight in a village guesthouse.",
      },
      {
        day: "Day 2",
        title: "Nagar to Hopar Glacier",
        tag: "Hopar Glacier",
        description: "A short trek onto the Hopar glacier's moraine trails, acclimatising before the harder days ahead.",
      },
      {
        day: "Day 3",
        title: "Hopar to Hachindar Camp",
        tag: "Hachindar",
        description:
          "Climb through pine forest and pasture to a high camp at the glacier's edge, with the first full view of Rakaposhi's north face.",
      },
      {
        day: "Day 4",
        title: "Rest & Acclimatisation Day",
        tag: "Hachindar Camp",
        description: "A built-in rest day for altitude adjustment, with an optional side trek to a nearby viewpoint.",
      },
      {
        day: "Day 5",
        title: "Hachindar to Rakaposhi Base Camp",
        tag: "Base Camp",
        description:
          "The trek's high point — moraine and glacier-edge trails to a base camp beneath Rakaposhi's summit ridge.",
      },
      {
        day: "Day 6",
        title: "Descent to Minapin",
        tag: "Minapin",
        description: "Descend via the Minapin glacier route, a different valley on the return leg, ending in Minapin village.",
      },
      {
        day: "Day 7",
        title: "Minapin to Passu → Departure",
        tag: "Passu",
        description: "A final drive north to Passu's famous cones before transferring back for onward travel.",
      },
    ],
    galleryIntro:
      "A first look at the glacier crossings and high camps on this route — full galleries are added as each group returns from the trail.",
    photos: photos([
      ["Rakaposhi's North Face", "Nagar Valley"],
      ["Hopar Glacier Crossing", "Hopar"],
      ["High Camp at Dawn", "Hachindar Camp"],
      ["Moraine Trail to Base Camp", "Base Camp"],
      ["Minapin Village Descent", "Minapin"],
      ["Passu Cones at Sunset", "Passu"],
    ]),
    quote:
      "Standing at base camp with Rakaposhi's ice face right above us — I've never felt smaller or more awake. Worth every step.",
    quoteAuthor: "A trekker from Islamabad",
    ctaEyebrow: "Strenuous · limited spots",
    ctaHeading: "Ready to stand beneath a giant?",
    ctaText: "Base camp season is short and group size is capped at ten — reserve your place before summer fills up.",
    theme: THEME_SNOWFLAKE_SKY,
  },

  "altit-baltit": {
    slug: "altit-baltit",
    href: "/tours/altit-baltit",
    title: "Cultural Heritage Tour",
    tagline: "Heritage Tour · Forts & Legends",
    badge: "CULTURAL HERITAGE · HUNZA VALLEY",
    heroAccentLine: "Where Stone Remembers",
    heroDescription:
      "Step through eight centuries of Hunza's history at Altit and Baltit forts, the region's oldest royal seats — four days of living heritage, artisan crafts, and stories passed down through generations of mirs.",
    dateRange: "05 Jul – 08 Jul, 2027",
    duration: "4 Days / 3 Nights",
    route: "Karimabad → Altit → Baltit",
    groupSize: "Max 14 People",
    level: "Easy",
    season: "Year-Round",
    price: "$360",
    aboutEyebrow: "About this journey",
    aboutHeadingLine1: "Eight centuries,",
    aboutHeadingLine2: "one valley",
    aboutText:
      "Long before Hunza had roads, it had forts. Altit Fort, nearly 1,100 years old, and Baltit Fort, seat of Hunza's mirs for centuries, anchor a valley where heritage isn't kept behind glass — it's lived in daily. This tour moves at a walking pace through both forts, the old bazaars beneath them, and the craft workshops still keeping their traditions alive.",
    statsEyebrow: "Why this route",
    statsHeading: "Heritage you can still walk through",
    statsDescription: "Both forts are still standing, still restored, and still at the centre of daily life in the valley.",
    stats: [
      { value: "1,100 Yrs", label: "Altit Fort's Age", iconId: "orchard" },
      { value: "2", label: "Forts Visited", iconId: "fort" },
      { value: "24", label: "Mirs Ruled from Baltit", iconId: "flag" },
      { value: "14", label: "Max Group Size", iconId: "users" },
    ],
    guidesIntro:
      "This tour travels with people who grew up in Hunza's old towns and forts — historians, conservators, and artisans who make eight centuries feel close.",
    guides: guides([
      [
        "Ghulam Abbas",
        "Lead Heritage Guide",
        "A trained conservator who worked on Baltit Fort's restoration, Ghulam knows every carved beam and hidden stairwell.",
      ],
      [
        "Rukhsana Baig",
        "Craft & Artisan Guide",
        "Rukhsana connects visitors with Hunza's weavers and woodcarvers, many from families working the same craft for generations.",
      ],
      [
        "Wazir Jan",
        "Old Town Walking Guide",
        "Wazir grew up in Altit's old town and leads its narrow lanes and bazaars from memory, not a map.",
      ],
      [
        "Farida Shah",
        "Storyteller & Historian",
        "A local historian, Farida specialises in the oral histories and legends passed down around Hunza's royal courts.",
      ],
    ]),
    itineraryHeading: "Four days through Hunza's heritage",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Old Karimabad Bazaar",
        tag: "Karimabad",
        description: "Settle into Karimabad and walk its old bazaar at golden hour, meeting local shopkeepers and craftspeople.",
      },
      {
        day: "Day 2",
        title: "Baltit Fort & the Royal Quarter",
        tag: "Baltit",
        description:
          "A full tour of Baltit Fort's royal chambers, watchtowers, and the terraced quarter beneath it, once home to Hunza's nobility.",
      },
      {
        day: "Day 3",
        title: "Altit Fort & the Royal Gardens",
        tag: "Altit",
        description:
          "Descend to Altit, Hunza's oldest fort, and its restored royal gardens overlooking the Hunza River gorge.",
      },
      {
        day: "Day 4",
        title: "Artisan Workshops & Departure",
        tag: "Karimabad",
        description: "A final morning with local weavers and woodcarvers before transferring onward.",
      },
    ],
    galleryIntro: "A first look at the forts and old towns on this route — full galleries grow with every departure.",
    photos: photos([
      ["Baltit Fort's Watchtower", "Baltit"],
      ["Altit's River Gorge View", "Altit"],
      ["Old Town Bazaar Lanes", "Karimabad"],
      ["Hand-Carved Wooden Balconies", "Baltit"],
      ["Local Weaver's Workshop", "Karimabad"],
      ["Royal Garden at Altit", "Altit"],
    ]),
    quote: "Walking through Baltit Fort felt like reading a history book with your feet. Our guide made eight centuries feel like yesterday.",
    quoteAuthor: "A visitor from Lahore",
    ctaEyebrow: "Year-round departures",
    ctaHeading: "Ready to walk through history?",
    ctaText: "Small groups keep every fort tour personal — reserve your place on the next departure.",
    theme: THEME_FORT_AMBER,
  },

  "nanga-parbat-camping": {
    slug: "nanga-parbat-camping",
    href: "/tours/nanga-parbat-camping",
    title: "Nanga Parbat Camping Experience",
    tagline: "Camping Trip · Beneath the Killer Mountain",
    badge: "CAMPING EXPERIENCE · DIAMER",
    heroAccentLine: "Beneath the Killer Mountain",
    heroDescription:
      "Camp beneath Nanga Parbat's sheer Rupal Face — at 4,600 metres, the tallest mountain face on Earth — for three unhurried days of alpine meadows, open fires, and the ninth-highest peak in the world at your doorstep.",
    dateRange: "20 Jul – 22 Jul, 2027",
    duration: "3 Days / 2 Nights",
    route: "Chilas → Fairy Meadows → Rupal Face",
    groupSize: "Max 10 People",
    level: "Moderate",
    season: "Summer (Jun – Sep)",
    price: "$310",
    aboutEyebrow: "About this journey",
    aboutHeadingLine1: "Camp beneath",
    aboutHeadingLine2: "the world's tallest face",
    aboutText:
      "Nanga Parbat means 'Naked Mountain' — an apt name for a peak whose Rupal Face rises 4,600 metres in a single sheer wall, the tallest mountain face anywhere on Earth. This camping trip trades summit ambitions for something gentler: alpine meadows, pine forest, and three nights with the ninth-highest mountain in the world filling the sky.",
    statsEyebrow: "Why this route",
    statsHeading: "The tallest face on the planet",
    statsDescription: "No trekking or climbing experience required — just three nights beneath one of the world's great mountain walls.",
    stats: [
      { value: "4,600 m", label: "Rupal Face Height", iconId: "peak" },
      { value: "8,126 m", label: "Nanga Parbat Summit", iconId: "flag" },
      { value: "9th", label: "Highest Peak on Earth", iconId: "snow" },
      { value: "10", label: "Max Group Size", iconId: "users" },
    ],
    guidesIntro: "This trip travels with local camping and trail guides from Diamer who know every safe pitch beneath the Rupal Face.",
    guides: guides([
      [
        "Fazal Rahim",
        "Lead Camping Guide",
        "Fazal has guided trekking and camping groups through Diamer's valleys for over a decade, and knows every safe pitch beneath the Rupal Face.",
      ],
      [
        "Shakeel Abbas",
        "Wilderness Cook",
        "Shakeel runs the camp kitchen, turning simple ingredients into hearty meals at altitude, fireside every night.",
      ],
      [
        "Naveed Baig",
        "Trail & Safety Guide",
        "Naveed manages trail safety and river crossings on the approach to Fairy Meadows and beyond.",
      ],
      [
        "Imran Shah",
        "Local Naturalist",
        "Imran points out the alpine flora and wildlife of Fairy Meadows' forests, from pine martens to summer wildflowers.",
      ],
    ]),
    itineraryHeading: "Three days beneath the summit",
    itinerary: [
      {
        day: "Day 1",
        title: "Chilas to Fairy Meadows",
        tag: "Fairy Meadows",
        description:
          "Drive and jeep-trail up from Chilas into the pine forests of Fairy Meadows, with Nanga Parbat's summit appearing through the trees.",
      },
      {
        day: "Day 2",
        title: "Trek to Rupal Face Viewpoint & Camp",
        tag: "Rupal Face",
        description: "Trek to a high meadow directly beneath the Rupal Face, setting camp with the mountain's full sheer wall overhead.",
      },
      {
        day: "Day 3",
        title: "Sunrise & Return to Chilas",
        tag: "Chilas",
        description: "Watch sunrise light climb Nanga Parbat's face, then descend back to Chilas for onward travel.",
      },
    ],
    galleryIntro: "A first look at the meadows and mountain faces on this route — full galleries grow with every departure.",
    photos: photos([
      ["Rupal Face at Sunrise", "Rupal Face"],
      ["Fairy Meadows Pine Forest", "Fairy Meadows"],
      ["Camp Beneath the Summit", "Rupal Face"],
      ["Alpine Wildflowers", "Fairy Meadows"],
      ["Evening Campfire", "Camp"],
      ["Jeep Trail to Fairy Meadows", "Chilas"],
    ]),
    quote: "Falling asleep with Nanga Parbat's face lit by the last light, then waking up to it again — nothing else compares.",
    quoteAuthor: "A camper from Karachi",
    ctaEyebrow: "Small groups only",
    ctaHeading: "Ready to camp beneath a giant?",
    ctaText: "Group size is kept small for a quieter camp — reserve your spot for the next departure.",
    theme: THEME_LEAF_EMERALD,
  },

  "passu-cathedral-trek": {
    slug: "passu-cathedral-trek",
    href: "/tours/passu-cathedral-trek",
    title: "Passu Cathedral Peaks Trek",
    tagline: "Trekking Expedition · Spires of Ice",
    badge: "TREKKING EXPEDITION · UPPER HUNZA",
    heroAccentLine: "Spires of Ice and Stone",
    heroDescription:
      "Trek beneath the jagged spires of the Passu Cathedral Peaks and along the Passu Glacier's moraine trails — six days through one of the Karakoram's most dramatic skylines, framed by suspension bridges and glacial lakes.",
    dateRange: "02 Aug – 07 Aug, 2027",
    duration: "6 Days / 5 Nights",
    route: "Passu → Glacier Camp → Borith Lake",
    groupSize: "Max 10 People",
    level: "Strenuous",
    season: "Summer (Jun – Sep)",
    price: "$690",
    aboutEyebrow: "About this journey",
    aboutHeadingLine1: "Six days beneath",
    aboutHeadingLine2: "the Cathedral spires",
    aboutText:
      "The Passu Cathedral Peaks earn their name honestly — a jagged skyline of ice-fluted spires that rises straight from the Hunza River. This trek follows the Passu Glacier's moraine, crosses the valley's famous suspension bridges, and camps beside Borith Lake, with the Cathedral's silhouette overhead for most of the route.",
    statsEyebrow: "Why this route",
    statsHeading: "A skyline like no other",
    statsDescription: "Ice-fluted spires, a 20-kilometre glacier, and a high-altitude lake — all inside six days.",
    stats: [
      { value: "6,106 m", label: "Cathedral Peak Height", iconId: "peak" },
      { value: "20 km", label: "Passu Glacier Length", iconId: "snow" },
      { value: "2,600 m", label: "Borith Lake Altitude", iconId: "drop" },
      { value: "10", label: "Max Group Size", iconId: "users" },
    ],
    guidesIntro: "This trek travels with guides from Passu village itself, who grew up beneath the Cathedral Peaks.",
    guides: guides([
      [
        "Alam Jan",
        "Lead Trekking Guide",
        "Alam grew up in Passu village at the glacier's foot and has led treks through this valley for eighteen years.",
      ],
      [
        "Salma Karim",
        "Glacier Route Guide",
        "Salma specialises in glacier navigation and reads the Passu Glacier's shifting moraine better than any map.",
      ],
      [
        "Yasir Hussain",
        "High Camp Manager",
        "Yasir sets and runs every high camp on this route, from Borith Lake to the glacier's edge.",
      ],
      [
        "Dilshad Begum",
        "Local Naturalist & Cook",
        "Dilshad cooks trailside meals and points out the valley's high-altitude birdlife along the way.",
      ],
    ]),
    itineraryHeading: "Six days through the Cathedral skyline",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Passu → Village & Suspension Bridge",
        tag: "Passu Village",
        description: "Settle into Passu and cross its famous suspension bridge over the Hunza River, with the Cathedral Peaks already visible.",
      },
      {
        day: "Day 2",
        title: "Passu to Borith Lake",
        tag: "Borith Lake",
        description: "Trek to Borith Lake, a high-altitude lake framed by the Cathedral spires, and camp on its shore.",
      },
      {
        day: "Day 3",
        title: "Borith Lake to Glacier Camp",
        tag: "Passu Glacier",
        description: "Climb onto the Passu Glacier's moraine trails to a high camp directly beneath the Cathedral's ice-fluted faces.",
      },
      {
        day: "Day 4",
        title: "Glacier Exploration Day",
        tag: "Passu Glacier",
        description: "A full day exploring the glacier's ice formations and crevasse fields with an experienced glacier guide.",
      },
      {
        day: "Day 5",
        title: "Descent to Borith Lake",
        tag: "Borith Lake",
        description: "Retrace the route back to Borith Lake for a final night beneath the peaks.",
      },
      {
        day: "Day 6",
        title: "Return to Passu → Departure",
        tag: "Passu Village",
        description: "Descend to Passu village for onward transfer.",
      },
    ],
    galleryIntro: "A first look at the spires and glacier on this route — full galleries grow with every departure.",
    photos: photos([
      ["Cathedral Peaks at Dawn", "Cathedral Peaks"],
      ["Passu Suspension Bridge", "Passu"],
      ["Borith Lake Reflection", "Borith Lake"],
      ["Glacier Ice Formations", "Passu Glacier"],
      ["High Camp Beneath the Spires", "Glacier Camp"],
      ["Passu Village Rooftops", "Passu"],
    ]),
    quote: "The Cathedral Peaks don't look real until you're standing beneath them — like the mountains grew spires overnight.",
    quoteAuthor: "A trekker from Peshawar",
    ctaEyebrow: "Strenuous · limited spots",
    ctaHeading: "Ready for the Cathedral skyline?",
    ctaText: "This route is graded strenuous and capped at ten trekkers — reserve early for summer dates.",
    theme: THEME_SNOWFLAKE_INDIGO,
  },

  "fairy-meadows-trek": {
    slug: "fairy-meadows-trek",
    href: "/tours/fairy-meadows-trek",
    title: "Fairy Meadows Basecamp Trek",
    tagline: "Trekking Expedition · Meadows & Glaciers",
    badge: "TREKKING EXPEDITION · DIAMER & ASTORE",
    heroAccentLine: "Where Meadows Meet Glaciers",
    heroDescription:
      "Trek from the pine forests of Fairy Meadows to Nanga Parbat's Base Camp — four days through alpine meadows, glacial moraine, and some of the closest views of an 8,000-metre peak anywhere in the world.",
    dateRange: "14 Aug – 17 Aug, 2027",
    duration: "4 Days / 3 Nights",
    route: "Fairy Meadows → Base Camp",
    groupSize: "Max 12 People",
    level: "Moderate",
    season: "Summer (Jun – Sep)",
    price: "$420",
    aboutEyebrow: "About this journey",
    aboutHeadingLine1: "From pine forest",
    aboutHeadingLine2: "to base camp",
    aboutText:
      "Fairy Meadows takes its name seriously — a stretch of pine forest and open pasture beneath Nanga Parbat that feels lifted from a fable. This trek climbs from the meadows to Nanga Parbat's Base Camp, crossing glacial streams and moraine fields for some of the closest views of an 8,000-metre summit anywhere in the world.",
    statsEyebrow: "Why this route",
    statsHeading: "Closer to an 8,000er than almost anywhere",
    statsDescription: "Four days, moderate grade, and a base camp view that usually takes far longer to reach.",
    stats: [
      { value: "3,300 m", label: "Fairy Meadows Altitude", iconId: "peak" },
      { value: "3,967 m", label: "Base Camp Altitude", iconId: "flag" },
      { value: "8,126 m", label: "Nanga Parbat Summit", iconId: "snow" },
      { value: "12", label: "Max Group Size", iconId: "users" },
    ],
    guidesIntro: "This trek travels with guides who know the Fairy Meadows to Base Camp route in every season.",
    guides: guides([
      [
        "Karim Dad",
        "Lead Trekking Guide",
        "Karim has led the Fairy Meadows to Base Camp route for over a decade, knowing its every stream crossing and campsite.",
      ],
      [
        "Sultana Rani",
        "Trail & Safety Guide",
        "Sultana oversees trail safety and river crossings, particularly on the glacial-melt sections later in summer.",
      ],
      [
        "Anwar Sheikh",
        "Camp Manager",
        "Anwar runs the group's camps from Fairy Meadows to Base Camp, keeping meals hot at altitude.",
      ],
      [
        "Zeenat Gul",
        "Local Naturalist",
        "Zeenat guides groups through the meadows' alpine flora, pointing out edelweiss and summer wildflowers along the trail.",
      ],
    ]),
    itineraryHeading: "Four days to base camp",
    itinerary: [
      {
        day: "Day 1",
        title: "Chilas to Fairy Meadows",
        tag: "Fairy Meadows",
        description: "Jeep-trail up from Chilas into Fairy Meadows' pine forest, arriving with Nanga Parbat framed dead ahead.",
      },
      {
        day: "Day 2",
        title: "Fairy Meadows to Base Camp Trail Head",
        tag: "Beyal Camp",
        description: "Trek through alpine pasture and moraine to a high camp partway to Base Camp.",
      },
      {
        day: "Day 3",
        title: "Push to Nanga Parbat Base Camp",
        tag: "Base Camp",
        description: "The trek's high point — glacial moraine trails to Base Camp beneath Nanga Parbat's Rakhiot Face.",
      },
      {
        day: "Day 4",
        title: "Descent to Fairy Meadows → Chilas",
        tag: "Fairy Meadows",
        description: "Descend back through the meadows and jeep-trail to Chilas for onward travel.",
      },
    ],
    galleryIntro: "A first look at the meadows and base camp on this route — full galleries grow with every departure.",
    photos: photos([
      ["Nanga Parbat from Base Camp", "Base Camp"],
      ["Fairy Meadows Pine Trail", "Fairy Meadows"],
      ["Glacial Moraine Crossing", "Trail"],
      ["Beyal High Camp", "Beyal Camp"],
      ["Alpine Wildflowers", "Fairy Meadows"],
      ["Jeep Trail Descent", "Chilas"],
    ]),
    quote: "Four days, and by the end Nanga Parbat felt close enough to touch. The meadows alone were worth the trip.",
    quoteAuthor: "A trekker from Rawalpindi",
    ctaEyebrow: "Moderate · big views",
    ctaHeading: "Ready to reach Base Camp?",
    ctaText: "A moderate trek with big rewards — reserve your place before summer dates fill.",
    theme: THEME_SNOWFLAKE_BLUE,
  },

  "deosai-wildlife-safari": {
    slug: "deosai-wildlife-safari",
    href: "/tours/deosai-wildlife-safari",
    title: "Deosai Wildlife Safari",
    tagline: "Wildlife Safari · The Roof of the World",
    badge: "WILDLIFE SAFARI · DEOSAI PLAINS",
    heroAccentLine: "Into the Land of Giants",
    heroDescription:
      "Track the Himalayan brown bear across Deosai's vast alpine plateau — at over 4,000 metres, one of the highest plateaus on Earth — for three days of wide-open wilderness, wildflowers, and genuine wildlife encounters.",
    dateRange: "22 Aug – 24 Aug, 2027",
    duration: "3 Days / 2 Nights",
    route: "Skardu → Deosai Plains",
    groupSize: "Max 10 People",
    level: "Easy",
    season: "Summer (Jul – Sep)",
    price: "$340",
    aboutEyebrow: "About this journey",
    aboutHeadingLine1: "The roof of the world,",
    aboutHeadingLine2: "and its last bears",
    aboutText:
      "Deosai means 'the land of giants,' and its brown bears — among the last viable populations in Pakistan — have earned the name. This safari crosses the plateau's rolling grasslands, glacial lakes, and summer wildflower fields, with dedicated wildlife-spotting drives at dawn and dusk when the bears are most active.",
    statsEyebrow: "Why this route",
    statsHeading: "One of the last bear habitats in Pakistan",
    statsDescription: "No guarantees with wildlife, but few places in the country offer better odds — or a more spectacular plateau.",
    stats: [
      { value: "4,114 m", label: "Plateau Elevation", iconId: "peak" },
      { value: "3,000 km²", label: "Protected Area", iconId: "flag" },
      { value: "50+", label: "Brown Bears Estimated", iconId: "paw" },
      { value: "10", label: "Max Group Size", iconId: "users" },
    ],
    guidesIntro: "This safari travels with Deosai National Park rangers and naturalists who track the plateau's wildlife year-round.",
    guides: guides([
      [
        "Ghulam Hussain",
        "Lead Wildlife Guide",
        "A Deosai National Park ranger for over a decade, Ghulam has tracked and logged the plateau's brown bear population for years.",
      ],
      [
        "Shabana Kausar",
        "Naturalist & Botanist",
        "Shabana specialises in Deosai's alpine flora, guiding groups through the plateau's short but spectacular wildflower season.",
      ],
      [
        "Tariq Mehmood",
        "Safari Driver & Spotter",
        "Tariq has driven Deosai's tracks for fifteen years and has an eye for movement across the plateau most people miss.",
      ],
      [
        "Alia Baig",
        "Camp & Logistics Host",
        "Alia manages the safari's camp comforts, from hot meals to warm tents on the high plateau's cold nights.",
      ],
    ]),
    itineraryHeading: "Three days on the plateau",
    itinerary: [
      {
        day: "Day 1",
        title: "Skardu to Deosai Plateau",
        tag: "Deosai Plains",
        description: "Drive up onto the plateau, arriving to camp beside Sheosar Lake as the light turns gold over the grasslands.",
      },
      {
        day: "Day 2",
        title: "Dawn & Dusk Wildlife Drives",
        tag: "Sheosar Lake",
        description: "Two dedicated wildlife drives — dawn and dusk — tracking brown bears, marmots, and golden eagles across the open plateau.",
      },
      {
        day: "Day 3",
        title: "Wildflower Walk & Return to Skardu",
        tag: "Skardu",
        description: "A morning walk through the plateau's summer wildflowers before descending back to Skardu.",
      },
    ],
    galleryIntro: "A first look at the plateau and its wildlife — full galleries grow with every departure.",
    photos: photos([
      ["Brown Bear on the Plateau", "Deosai Plains"],
      ["Sheosar Lake at Sunset", "Sheosar Lake"],
      ["Deosai Wildflower Fields", "Deosai Plains"],
      ["Golden Eagle in Flight", "Deosai Plains"],
      ["Camp Under the Stars", "Camp"],
      ["Marmots at Dawn", "Deosai Plains"],
    ]),
    quote: "We watched a brown bear cross the plateau at dusk from maybe two hundred metres — completely unforgettable, and handled so responsibly by our guides.",
    quoteAuthor: "A visitor from Islamabad",
    ctaEyebrow: "Wildlife never guaranteed",
    ctaHeading: "Ready to meet the land of giants?",
    ctaText: "Wildlife sightings are never guaranteed, but Deosai rarely disappoints — reserve your place.",
    theme: THEME_LEAF_LIME,
  },

  "skardu-cold-desert": {
    slug: "skardu-cold-desert",
    href: "/tours/skardu-cold-desert",
    title: "Skardu Cold Desert Expedition",
    tagline: "Desert Expedition · Dunes Above the Clouds",
    badge: "DESERT EXPEDITION · SKARDU",
    heroAccentLine: "Dunes Above the Clouds",
    heroDescription:
      "Cross the golden dunes of Sarfaranga's cold desert, ringed by 7,000-metre peaks — five days where Saharan-style sand meets Karakoram snow, unlike anywhere else on Earth.",
    dateRange: "05 Sep – 09 Sep, 2027",
    duration: "5 Days / 4 Nights",
    route: "Skardu → Sarfaranga → Shigar",
    groupSize: "Max 12 People",
    level: "Moderate",
    season: "Autumn (Sep – Oct)",
    price: "$500",
    aboutEyebrow: "About this journey",
    aboutHeadingLine1: "Where sand dunes",
    aboutHeadingLine2: "meet snow peaks",
    aboutText:
      "Sarfaranga is one of the highest cold deserts on Earth — true sand dunes at over 2,200 metres, ringed by snow-capped Karakoram peaks. This expedition explores the desert by jeep and on foot, alongside the turquoise waters of the Indus and Shigar rivers that make the landscape possible.",
    statsEyebrow: "Why this route",
    statsHeading: "A landscape that shouldn't exist",
    statsDescription: "Desert sand at 2,200 metres, ringed by 7,000-metre peaks — Sarfaranga is one of a kind.",
    stats: [
      { value: "2,230 m", label: "Desert Elevation", iconId: "sun" },
      { value: "5 km²", label: "Dune Field Area", iconId: "flag" },
      { value: "7,000+ m", label: "Surrounding Peaks", iconId: "peak" },
      { value: "12", label: "Max Group Size", iconId: "users" },
    ],
    guidesIntro: "This expedition travels with Skardu-based guides who know Sarfaranga's dunes and Baltistan's river valleys well.",
    guides: guides([
      [
        "Manzoor Hussain",
        "Lead Expedition Guide",
        "Manzoor has guided groups through Sarfaranga's dunes and Skardu's valleys for over a decade.",
      ],
      [
        "Sofia Baltistani",
        "Cultural & River Guide",
        "Sofia guides river-side sections of the trip and shares Baltistan's Tibetan-influenced culture and history.",
      ],
      [
        "Javed Iqbal",
        "Jeep & Dune Driver",
        "Javed has driven Sarfaranga's shifting sands longer than almost anyone in Skardu.",
      ],
      [
        "Nargis Fida",
        "Local Photographer & Host",
        "Nargis scouts the desert's best light for photography and hosts the group's evening camps.",
      ],
    ]),
    itineraryHeading: "Five days across the cold desert",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Skardu",
        tag: "Skardu",
        description: "Settle into Skardu with a walk along the Indus riverfront and views of Kharpocho Fort at sunset.",
      },
      {
        day: "Day 2",
        title: "Sarfaranga Cold Desert",
        tag: "Sarfaranga",
        description: "A full day exploring the cold desert's dunes by jeep and on foot, with peaks visible in every direction.",
      },
      {
        day: "Day 3",
        title: "Shigar Valley & River Confluence",
        tag: "Shigar",
        description: "Drive to Shigar Valley, where the Shigar and Indus rivers meet beneath apricot orchards and old forts.",
      },
      {
        day: "Day 4",
        title: "Desert Camp & Stargazing",
        tag: "Sarfaranga",
        description: "Return to the desert for an overnight camp — some of the clearest night skies in Pakistan, far from any city light.",
      },
      {
        day: "Day 5",
        title: "Skardu City & Departure",
        tag: "Skardu",
        description: "A final morning in Skardu before onward travel.",
      },
    ],
    galleryIntro: "A first look at the dunes and rivers on this route — full galleries grow with every departure.",
    photos: photos([
      ["Sarfaranga Dunes at Sunrise", "Sarfaranga"],
      ["Indus River Confluence", "Shigar"],
      ["Kharpocho Fort at Dusk", "Skardu"],
      ["Desert Camp Under Stars", "Sarfaranga"],
      ["Shigar Valley Orchards", "Shigar"],
      ["Jeep Tracks Across the Dunes", "Sarfaranga"],
    ]),
    quote: "Sand dunes with snow peaks behind them — it looked photoshopped until I was standing in it. One of the strangest, most beautiful places I've seen.",
    quoteAuthor: "A traveller from Karachi",
    ctaEyebrow: "Unlike anywhere else",
    ctaHeading: "Ready for dunes above the clouds?",
    ctaText: "A landscape unlike anywhere else in Pakistan — reserve your place on the next departure.",
    theme: THEME_DUNE_ORANGE,
  },

  "shigar-heritage-trail": {
    slug: "shigar-heritage-trail",
    href: "/tours/shigar-heritage-trail",
    title: "Shigar Valley Heritage Trail",
    tagline: "Heritage Trail · Forts & Orchards",
    badge: "HERITAGE TRAIL · SHIGAR VALLEY",
    heroAccentLine: "Forts, Mosques, and Orchards",
    heroDescription:
      "Walk through Shigar Fort's restored royal chambers and the centuries-old Amburiq Mosque — four days through one of Baltistan's best-preserved valleys, where Tibetan-influenced heritage meets apricot orchards.",
    dateRange: "18 Sep – 21 Sep, 2027",
    duration: "4 Days / 3 Nights",
    route: "Skardu → Shigar Valley",
    groupSize: "Max 14 People",
    level: "Easy",
    season: "Autumn (Sep – Oct)",
    price: "$380",
    aboutEyebrow: "About this journey",
    aboutHeadingLine1: "Baltistan's best-kept",
    aboutHeadingLine2: "heritage valley",
    aboutText:
      "Shigar Valley holds some of Baltistan's best-preserved heritage — a 17th-century fort turned heritage hotel, one of Pakistan's oldest wooden mosques, and villages still built around centuries-old irrigation channels. This trail moves gently through all of it, timed for the valley's autumn apricot and walnut harvest.",
    statsEyebrow: "Why this route",
    statsHeading: "Living heritage, not a museum",
    statsDescription: "Every fort and mosque on this route is still part of daily life in the valley, not roped off behind glass.",
    stats: [
      { value: "400+ Yrs", label: "Shigar Fort's Age", iconId: "fort" },
      { value: "700+ Yrs", label: "Amburiq Mosque", iconId: "orchard" },
      { value: "3", label: "Villages Visited", iconId: "flag" },
      { value: "14", label: "Max Group Size", iconId: "users" },
    ],
    guidesIntro: "This trail travels with Baltistan-based historians and local families who welcome visitors into Shigar's villages.",
    guides: guides([
      [
        "Hassan Baltistani",
        "Lead Heritage Guide",
        "Hassan specialises in Baltistan's Tibetan-influenced architecture and has guided Shigar Fort tours for over a decade.",
      ],
      [
        "Rabia Shigri",
        "Village & Orchard Guide",
        "Rabia connects visitors with Shigar's farming families during the valley's autumn harvest season.",
      ],
      [
        "Ali Raza",
        "Old Mosque Guide",
        "Ali is a caretaker's son at the Amburiq Mosque and knows its woodwork and history intimately.",
      ],
      [
        "Sana Kazmi",
        "Local Historian",
        "Sana researches Baltistan's royal history and shares the stories behind Shigar's forts and family lineages.",
      ],
    ]),
    itineraryHeading: "Four days through Shigar's heritage",
    itinerary: [
      {
        day: "Day 1",
        title: "Skardu to Shigar Valley",
        tag: "Shigar",
        description: "Drive into Shigar Valley along the Shigar River, settling into a heritage guesthouse for the evening.",
      },
      {
        day: "Day 2",
        title: "Shigar Fort & Old Town",
        tag: "Shigar Fort",
        description: "A full tour of Shigar Fort's restored royal chambers, followed by a walk through the old town's stone lanes.",
      },
      {
        day: "Day 3",
        title: "Amburiq Mosque & Orchard Villages",
        tag: "Amburiq",
        description: "Visit one of Pakistan's oldest wooden mosques, then walk through orchard villages during the autumn harvest.",
      },
      {
        day: "Day 4",
        title: "Askole Road Viewpoint & Departure",
        tag: "Shigar",
        description: "A morning drive toward the Askole road for valley views before returning to Skardu.",
      },
    ],
    galleryIntro: "A first look at Shigar's forts and orchards — full galleries grow with every departure.",
    photos: photos([
      ["Shigar Fort's Royal Chambers", "Shigar Fort"],
      ["Amburiq Mosque Woodwork", "Amburiq"],
      ["Autumn Apricot Harvest", "Shigar"],
      ["Shigar River Valley", "Shigar"],
      ["Old Town Stone Lanes", "Shigar"],
      ["Village Irrigation Channels", "Shigar"],
    ]),
    quote: "Shigar Fort felt like stepping into another century — and the walnut harvest happening around us made it feel alive, not like a museum.",
    quoteAuthor: "A visitor from Lahore",
    ctaEyebrow: "Best in autumn harvest",
    ctaHeading: "Ready to explore Shigar's heritage?",
    ctaText: "Best timed with the autumn harvest — reserve your place on the next departure.",
    theme: THEME_FORT_YELLOW,
  },

  "attabad-karimabad-escape": {
    slug: "attabad-karimabad-escape",
    href: "/tours/attabad-karimabad-escape",
    title: "Attabad & Karimabad Lake Escape",
    tagline: "Lake Escape · Turquoise Waters",
    badge: "LAKE ESCAPE · HUNZA VALLEY",
    heroAccentLine: "Turquoise Waters, Golden Autumn",
    heroDescription:
      "Unwind beside Attabad Lake's impossibly turquoise waters and Karimabad's golden autumn orchards — three unhurried days of boat rides, viewpoints, and Hunza Valley at its most relaxed.",
    dateRange: "01 Oct – 03 Oct, 2027",
    duration: "3 Days / 2 Nights",
    route: "Karimabad → Attabad Lake",
    groupSize: "Max 14 People",
    level: "Easy",
    season: "Autumn (Sep – Oct)",
    price: "$300",
    aboutEyebrow: "About this journey",
    aboutHeadingLine1: "Hunza Valley,",
    aboutHeadingLine2: "at its most relaxed",
    aboutText:
      "Formed by a 2010 landslide that dammed the Hunza River, Attabad Lake's turquoise waters are now one of the valley's most photographed sights. This escape pairs a relaxed day on the lake with Karimabad's autumn orchards and viewpoints — a gentler pace after the trekking and expedition-style trips elsewhere on our calendar.",
    statsEyebrow: "Why this route",
    statsHeading: "Hunza's gentlest escape",
    statsDescription: "No trekking grade to worry about — just a lake, a valley, and three easy days.",
    stats: [
      { value: "21 km", label: "Attabad Lake Length", iconId: "drop" },
      { value: "2010", label: "Lake Formed", iconId: "flag" },
      { value: "8,000+ m", label: "Surrounding Peaks", iconId: "peak" },
      { value: "14", label: "Max Group Size", iconId: "users" },
    ],
    guidesIntro: "This escape travels with local boat and orchard guides who know the lake and valley at every hour of the day.",
    guides: guides([
      [
        "Shaukat Nazir",
        "Lead Lake Guide",
        "Shaukat runs boat excursions on Attabad Lake and knows its best photo spots and swimming coves.",
      ],
      [
        "Faiza Karim",
        "Karimabad Orchard Guide",
        "Faiza guides gentle walks through Karimabad's autumn orchards, timed to the fruit harvest.",
      ],
      [
        "Rashid Baig",
        "Viewpoint & Photography Guide",
        "Rashid scouts the valley's best sunset viewpoints over the lake and surrounding peaks.",
      ],
      [
        "Nasreen Ali",
        "Guesthouse & Hospitality Host",
        "Nasreen manages the group's lakeside stays, known locally for her hospitality and home-cooked meals.",
      ],
    ]),
    itineraryHeading: "Three easy days by the water",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Karimabad",
        tag: "Karimabad",
        description: "Settle into Karimabad with an easy orchard walk and sunset views over the valley.",
      },
      {
        day: "Day 2",
        title: "Attabad Lake Boat Day",
        tag: "Attabad Lake",
        description: "A full day on Attabad Lake — boat rides across its turquoise waters, lakeside lunch, and free time to swim or relax.",
      },
      {
        day: "Day 3",
        title: "Viewpoint Morning & Departure",
        tag: "Karimabad",
        description: "A final morning at a valley viewpoint before transferring onward.",
      },
    ],
    galleryIntro: "A first look at the lake and orchards on this route — full galleries grow with every departure.",
    photos: photos([
      ["Attabad Lake's Turquoise Water", "Attabad Lake"],
      ["Boat Ride Across the Lake", "Attabad Lake"],
      ["Karimabad Autumn Orchards", "Karimabad"],
      ["Sunset Over the Valley", "Karimabad"],
      ["Lakeside Picnic", "Attabad Lake"],
      ["Mountain Reflections on the Lake", "Attabad Lake"],
    ]),
    quote: "Attabad Lake's colour doesn't look real in photos — and it's even more surreal in person. The most relaxing three days of our whole Pakistan trip.",
    quoteAuthor: "A traveller from Islamabad",
    ctaEyebrow: "Our gentlest trip",
    ctaHeading: "Ready for turquoise water and golden orchards?",
    ctaText: "Our gentlest trip on the calendar — reserve your place for the next departure.",
    theme: THEME_WAVE_TEAL,
  },

  "khunjerab-border-expedition": {
    slug: "khunjerab-border-expedition",
    href: "/tours/khunjerab-border-expedition",
    title: "Khunjerab Pass Border Expedition",
    tagline: "Border Expedition · The Roof of the Highway",
    badge: "BORDER EXPEDITION · KHUNJERAB PASS",
    heroAccentLine: "The World's Highest Paved Border",
    heroDescription:
      "Drive the Karakoram Highway to Khunjerab Pass — at 4,693 metres, the highest paved international border on Earth — for two days through Khunjerab National Park's high-altitude wildlife and glacier-fed valleys.",
    dateRange: "12 Oct – 13 Oct, 2027",
    duration: "2 Days / 1 Night",
    route: "Hunza → Khunjerab Pass",
    groupSize: "Max 14 People",
    level: "Easy",
    season: "Summer (May – Sep)",
    price: "$260",
    aboutEyebrow: "About this journey",
    aboutHeadingLine1: "The highest border",
    aboutHeadingLine2: "on Earth",
    aboutText:
      "Khunjerab Pass sits at 4,693 metres on the China–Pakistan border — the highest paved international crossing in the world. The drive up from Hunza climbs through Khunjerab National Park, home to snow leopards, Marco Polo sheep, and ibex, along one of the most spectacular stretches of the Karakoram Highway.",
    statsEyebrow: "Why this route",
    statsHeading: "A short trip, an epic drive",
    statsDescription: "Two days is all it takes to reach the highest paved border crossing in the world.",
    stats: [
      { value: "4,693 m", label: "Pass Elevation", iconId: "peak" },
      { value: "1,000+ km", label: "Karakoram Highway", iconId: "flag" },
      { value: "2", label: "Countries at the Pass", iconId: "snow" },
      { value: "14", label: "Max Group Size", iconId: "users" },
    ],
    guidesIntro: "This expedition travels with Hunza-based drivers and guides who know the Karakoram Highway's every switchback.",
    guides: guides([
      [
        "Aziz Karim",
        "Lead Expedition Guide",
        "Aziz has driven the Karakoram Highway to Khunjerab for over fifteen years and knows its every switchback.",
      ],
      [
        "Sabira Jan",
        "Wildlife Spotting Guide",
        "Sabira watches for ibex and Marco Polo sheep along Khunjerab National Park's slopes during the drive.",
      ],
      [
        "Naeem Sher",
        "High-Altitude Logistics",
        "Naeem manages altitude comfort and timing for the group's short but high crossing.",
      ],
      [
        "Yasmeen Baig",
        "Border Region Historian",
        "Yasmeen shares the Silk Road history of the Karakoram Highway and Khunjerab's role connecting Central and South Asia.",
      ],
    ]),
    itineraryHeading: "Two days to the highest border",
    itinerary: [
      {
        day: "Day 1",
        title: "Hunza to Khunjerab Pass",
        tag: "Khunjerab Pass",
        description:
          "Drive north along the Karakoram Highway through Khunjerab National Park, reaching the 4,693-metre border pass by early afternoon.",
      },
      {
        day: "Day 2",
        title: "Sost & Return to Hunza",
        tag: "Sost",
        description: "Visit Sost, Pakistan's northernmost town, before the return drive to Hunza.",
      },
    ],
    galleryIntro: "A first look at the pass and highway on this route — full galleries grow with every departure.",
    photos: photos([
      ["Khunjerab Pass Border Marker", "Khunjerab Pass"],
      ["Karakoram Highway Switchbacks", "Karakoram Highway"],
      ["Ibex on the National Park Slopes", "Khunjerab NP"],
      ["Glacier-Fed Valley Views", "Khunjerab NP"],
      ["Sost Border Town", "Sost"],
      ["Snow-Capped Peaks Along the Route", "Karakoram Highway"],
    ]),
    quote: "Standing at the highest paved border on Earth, snow on both sides — a short trip that felt genuinely epic.",
    quoteAuthor: "A traveller from Rawalpindi",
    ctaEyebrow: "Short & spectacular",
    ctaHeading: "Ready for the roof of the highway?",
    ctaText: "A short, spectacular trip — reserve your place for the next departure.",
    theme: THEME_SNOWFLAKE_INDIGO,
  },

  "phander-naltar-circuit": {
    slug: "phander-naltar-circuit",
    href: "/tours/phander-naltar-circuit",
    title: "Phander & Naltar Lakes Circuit",
    tagline: "Lake Circuit · Valleys of Blue",
    badge: "LAKE CIRCUIT · GILGIT & GHIZER",
    heroAccentLine: "Valleys of Blue and Gold",
    heroDescription:
      "Circuit two of Gilgit-Baltistan's most colourful lake valleys — Phander's mirror-still waters and Naltar's trio of alpine lakes — four days through Ghizer's quieter, less-travelled side.",
    dateRange: "25 Oct – 28 Oct, 2027",
    duration: "4 Days / 3 Nights",
    route: "Gilgit → Phander → Naltar",
    groupSize: "Max 12 People",
    level: "Easy",
    season: "Autumn (Oct)",
    price: "$340",
    aboutEyebrow: "About this journey",
    aboutHeadingLine1: "Gilgit-Baltistan's",
    aboutHeadingLine2: "quieter blue valleys",
    aboutText:
      "Ghizer's valleys see a fraction of the visitors that Hunza does, which is part of the appeal — Phander Lake's glassy reflections and Naltar's three alpine lakes stay quiet even in peak season. This circuit links both, timed for autumn's gold larch forests reflected in blue water.",
    statsEyebrow: "Why this route",
    statsHeading: "The valleys most visitors miss",
    statsDescription: "Two lake valleys, a fraction of the crowds, and autumn colour reflected in three different shades of blue.",
    stats: [
      { value: "2", label: "Lake Valleys", iconId: "flag" },
      { value: "3", label: "Lakes in Naltar Alone", iconId: "drop" },
      { value: "3,050 m", label: "Naltar Elevation", iconId: "peak" },
      { value: "12", label: "Max Group Size", iconId: "users" },
    ],
    guidesIntro: "This circuit travels with Ghizer-based guides who know Phander and Naltar's lakes and trails intimately.",
    guides: guides([
      [
        "Sarwar Khan",
        "Lead Circuit Guide",
        "Sarwar has guided groups through Ghizer's valleys for over a decade, from Phander's shoreline to Naltar's high lakes.",
      ],
      [
        "Perveen Shah",
        "Local Culture Guide",
        "Perveen shares Ghizer's distinct Khowar and Shina cultural traditions along the route.",
      ],
      [
        "Iftikhar Baig",
        "Naltar Lakes Guide",
        "Iftikhar knows the short but steep trails between Naltar's three lakes better than anyone in the valley.",
      ],
      [
        "Gulnaz Rehman",
        "Lodge & Hospitality Host",
        "Gulnaz manages the circuit's lakeside stays, known for her hospitality on both sides of the route.",
      ],
    ]),
    itineraryHeading: "Four days between two lake valleys",
    itinerary: [
      {
        day: "Day 1",
        title: "Gilgit to Phander Valley",
        tag: "Phander",
        description: "Drive from Gilgit into Phander Valley, arriving at its lake for golden-hour reflections.",
      },
      {
        day: "Day 2",
        title: "Phander Lake Full Day",
        tag: "Phander Lake",
        description: "A relaxed day around Phander Lake — boat rides, lakeside walks, and the valley's autumn larch forests.",
      },
      {
        day: "Day 3",
        title: "Phander to Naltar Valley",
        tag: "Naltar",
        description: "Drive to Naltar Valley and trek between its three alpine lakes, each a different shade of blue and green.",
      },
      {
        day: "Day 4",
        title: "Naltar Lakes & Return to Gilgit",
        tag: "Gilgit",
        description: "A final morning at Naltar's lakes before the return drive to Gilgit.",
      },
    ],
    galleryIntro: "A first look at the lakes on this route — full galleries grow with every departure.",
    photos: photos([
      ["Phander Lake at Golden Hour", "Phander"],
      ["Autumn Larch Reflections", "Phander"],
      ["Naltar's Three Lakes", "Naltar"],
      ["Boat Ride on Phander Lake", "Phander Lake"],
      ["Naltar Valley Trail", "Naltar"],
      ["Blue-Green Alpine Water", "Naltar"],
    ]),
    quote: "Naltar's lakes change colour as you walk between them — turquoise, then jade, then almost black. Phander was the perfect, quiet start to the trip.",
    quoteAuthor: "A traveller from Peshawar",
    ctaEyebrow: "Fewer crowds",
    ctaHeading: "Ready for Gilgit-Baltistan's quieter side?",
    ctaText: "Fewer crowds, equally stunning — reserve your place for the next departure.",
    theme: THEME_WAVE_CYAN,
  },
};

export function getTourDetail(slug: string): TourDetail | undefined {
  return TOUR_DETAILS[slug];
}

export function getAllTourSlugs(): string[] {
  return Object.keys(TOUR_DETAILS);
}
