/**
 * Blog posts, kept as plain typed data (same approach as lib/destinations.ts
 * and lib/tourDetails.ts) — no CMS or database. To add a post, append an
 * entry to RAW_POSTS; the listing, the post page, the footer and the sitemap-
 * style helpers below all pick it up. Newest posts are shown first.
 *
 * Every factual statement here is taken from content already on the site
 * (destination guide notes, tour pages, the booking page FAQs) — keep it that
 * way, and update the post if the underlying page changes.
 *
 * Body text supports one piece of inline markup: [label](/internal/path) renders
 * as a real link to a page on this site (see BlogPostPage). Link the first
 * natural mention of a destination or tour, not every mention.
 */

export type BlogCategory = "Planning" | "Trekking" | "Nature" | "Good to Know";

export const BLOG_CATEGORIES: BlogCategory[] = ["Planning", "Trekking", "Nature", "Good to Know"];

/** One block of article body. Kept deliberately simple — a markdown-like structure without a parser. */
export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; title: string; text: string };

export type BlogRelatedLink = { label: string; href: string; description: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  /** ISO date, YYYY-MM-DD. */
  publishDate: string;
  /** Derived from the body, e.g. "4 min read". */
  readTime: string;
  /** Derived: whole minutes behind `readTime` (never less than 1). */
  readMinutes: number;
  /** Derived: words in the article body. */
  wordCount: number;
  featuredImage: string;
  /** Intrinsic pixel size of the featured image — used for the Open Graph image tags. */
  featuredImageSize: { width: number; height: number };
  /** Describes what the photo shows (not the post title). */
  featuredImageAlt: string;
  /** Search/social title, when the on-page title is too long for ~60 characters with the site name. Falls back to `title`. */
  seoTitle?: string;
  /** Meta description, written for search results (≤ 160 characters). */
  seoDescription: string;
  /** A short set of search keywords specific to this post. */
  keywords: string[];
  /** ISO date of the last substantive edit, if different from `publishDate`. Bump it when a post is revised. */
  modifiedDate?: string;
  body: BlogBlock[];
  /** "Plan it" links shown under the article. */
  related: BlogRelatedLink[];
};

type RawPost = Omit<BlogPost, "readTime" | "readMinutes" | "wordCount">;

const RAW_POSTS: RawPost[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "best-time-to-visit-gilgit-baltistan",
    title: "The best time to visit Gilgit-Baltistan",
    excerpt:
      "Spring blossom, summer high country, autumn gold and winter skiing — which months open which valleys, from our guides' notes on every destination.",
    category: "Planning",
    publishDate: "2026-10-06",
    featuredImage: "/Images/tours/borith-seabuckthorn-october.png",
    featuredImageSize: { width: 1248, height: 832 },
    featuredImageAlt: "Orange sea-buckthorn berries in October with snow-capped peaks beyond",
    seoDescription:
      "Month-by-month guide to Gilgit-Baltistan: Hunza blossom in spring, Fairy Meadows and Khunjerab in summer, autumn gold, and Naltar skiing in winter.",
    keywords: [
      "best time to visit Gilgit-Baltistan",
      "Hunza blossom season",
      "Gilgit-Baltistan weather by month",
      "Khunjerab Pass open months",
      "Naltar skiing season",
    ],
    body: [
      {
        type: "p",
        text: "There is no single best month for Gilgit-Baltistan. The north changes character with the seasons, and every valley has its own window. Here is how the year breaks down, using the notes our guides keep for each destination.",
      },
      { type: "h2", text: "Spring (March–May): blossom in Hunza" },
      {
        type: "p",
        text: "[Karimabad](/destinations/karimabad)'s blossom season runs from March to May, when the valley's orchards flower beneath the peaks — it's the reason our [Blossoms of Hunza](/tours/hunza-spring) tour departs in late May. The lower valleys open up from April, too: [Altit Fort](/destinations/altit-fort), Passu Cones, Skardu & Katpana, Shigar Valley and Kachura Lake all list April–October as their window.",
      },
      { type: "h2", text: "Summer (June–September): the high country opens" },
      {
        type: "p",
        text: "Most of the high routes are only clear of snow in summer. [Fairy Meadows](/destinations/fairy-meadows), Rakaposhi Base Camp, Shimshal Valley, Minapin Glacier, Phander Valley, Haramosh Valley and the Naltar lakes all open in June and run through September. [Khunjerab Pass](/destinations/khunjerab-pass) is open from May to September, and the road-accessible valleys of Ghizer and Yasin also run May–September. Rush Lake's high trail is reliably clear only from July to September.",
      },
      {
        type: "callout",
        title: "Deosai is a short season",
        text: "[Deosai](/destinations/deosai-plains) is open from July to September only — it is snowbound and closed the rest of the year. From July the plains fill with wildflowers.",
      },
      { type: "h2", text: "Autumn (September–October): gold in the valleys" },
      {
        type: "p",
        text: "September and October bring golden orchards to Karimabad and autumn colour along the shore of [Borith Lake](/destinations/borith-lake). Skardu & Katpana shows its clearest desert-and-mountain contrast in autumn, and Baltit Fort's clearest mountain views come from September to November. Attabad Lake is calmest and clearest from May to October. Our autumn departures — the [Skardu Cold Desert Expedition](/tours/skardu-cold-desert), Shigar Valley Heritage Trail and Attabad & Karimabad Lake Escape — run in September and October, and the [Phander & Naltar Lakes Circuit](/tours/phander-naltar-circuit) in October.",
      },
      { type: "h2", text: "Winter (December–February): skiing at Naltar" },
      {
        type: "p",
        text: "Much of the north is snowbound in winter, but [Naltar](/destinations/naltar-valley) is the exception for skiers: it is home to Pakistan's main ski slope and a winter sports training centre, with a December–February window for skiing. Baltit Fort, in Karimabad, is listed as a year-round visit.",
      },
      { type: "h2", text: "Quick reference" },
      {
        type: "list",
        items: [
          "Hunza blossom: March–May",
          "Hunza autumn orchards: September–October",
          "Khunjerab Pass: May–September",
          "Fairy Meadows: June–September",
          "Deosai Plains: July–September only",
          "Skardu & Katpana: April–October, clearest contrast in autumn",
          "Naltar skiing: December–February",
        ],
      },
      {
        type: "p",
        text: "Not sure which window suits your plans? Tell us your exact dates — or say you're flexible — when you [plan your trip](/plan-your-trip), and a local planner will suggest the right valleys for the time you have.",
      },
    ],
    related: [
      {
        label: "Plan your trip",
        href: "/plan-your-trip",
        description: "Share your dates or stay flexible — a local planner matches them to the right valleys.",
      },
      {
        label: "Blossoms of Hunza",
        href: "/tours/hunza-spring",
        description: "Our spring tour, timed for the Karimabad blossom.",
      },
      {
        label: "Browse all destinations",
        href: "/lands",
        description: "Every place in the north, with its own best-time notes.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "fairy-meadows-trek-nanga-parbat",
    title: "Fairy Meadows and the trek to Nanga Parbat",
    excerpt:
      "A jeep ride, a short trek and one of the closest views of an 8,000-metre peak anywhere in Pakistan — what to expect at Fairy Meadows and on the way to Base Camp.",
    category: "Trekking",
    publishDate: "2026-09-22",
    featuredImage: "/Images/tours/fairymeadows(4).png",
    featuredImageSize: { width: 1200, height: 896 },
    featuredImageAlt: "Nanga Parbat reflected in a pond at Fairy Meadows, with pine forest and meadow below",
    seoTitle: "Fairy Meadows Trek to Nanga Parbat",
    seoDescription:
      "Fairy Meadows sits at 3,300 m beneath Nanga Parbat. Jeep from Raikot Bridge, a 2–3 hour trek, Kutwal Lake, and our 4-day Base Camp trek itinerary.",
    keywords: [
      "Fairy Meadows trek",
      "Nanga Parbat Base Camp trek",
      "Raikot Bridge jeep track",
      "Kutwal Lake",
      "Fairy Meadows best season",
    ],
    body: [
      {
        type: "p",
        text: "[Fairy Meadows](/destinations/fairy-meadows) sits at the foot of Nanga Parbat, the world's ninth-highest peak, wrapped in pine forest and morning mist. At 3,300 metres, reached by jeep track and a final trek, it offers one of the most direct, uninterrupted views of an 8,000-metre peak anywhere in Pakistan.",
      },
      { type: "h2", text: "Why Fairy Meadows is special" },
      {
        type: "p",
        text: "Unlike most 8,000-metre base camps, Fairy Meadows is reachable in a single day's trek after a jeep ride — genuine high-mountain scenery without a multi-week expedition. Early mornings often bring low mist rolling through the pine forest, with Nanga Parbat's summit catching the first light.",
      },
      {
        type: "list",
        items: [
          "Uninterrupted views of Nanga Parbat's Rupal and Diamir faces",
          "Alpine meadows surrounded by dense pine forest",
          "A relatively short, accessible trek compared to other 8,000er base camps",
          "Simple mountain huts and camping right beneath the peak",
        ],
      },
      {
        type: "quote",
        text: "Four days, and by the end Nanga Parbat felt close enough to touch. The meadows alone were worth the trip.",
        cite: "A trekker from Rawalpindi",
      },
      { type: "h2", text: "Getting there" },
      {
        type: "p",
        text: "The route begins with a jeep ride from Raikot Bridge on the Karakoram Highway, followed by a 2–3 hour trek up to the meadows. On the way, [Kutwal Lake](/destinations/kutwal-lake) sits above Tato village, a short stretch below the jeep track and trekking trail. Fewer travellers stop there than at the meadows above, so its still water and pine forest stay quiet even in peak season — a natural rest stop on the way up or down, and a favourite for calm-morning reflections.",
      },
      { type: "h2", text: "When to go" },
      {
        type: "p",
        text: "June to September, when the jeep track and trekking trail are open. Kutwal Lake follows the same season.",
      },
      { type: "h2", text: "Going on to Base Camp" },
      {
        type: "p",
        text: "Our [Fairy Meadows Basecamp Trek](/tours/fairy-meadows-trek) (four days, three nights, moderate grade, groups of up to 12) climbs from the meadows to Nanga Parbat's Base Camp, crossing glacial streams and moraine fields:",
      },
      {
        type: "list",
        items: [
          "Day 1 — Chilas to Fairy Meadows: the jeep trail up into the pine forest, arriving with Nanga Parbat framed dead ahead.",
          "Day 2 — Fairy Meadows to the Base Camp trail head: through alpine pasture and moraine to a high camp at Beyal.",
          "Day 3 — Push to Nanga Parbat Base Camp: glacial moraine trails to Base Camp beneath the Rakhiot Face — the high point of the trek.",
          "Day 4 — Descent to Fairy Meadows and back to Chilas for onward travel.",
        ],
      },
      {
        type: "p",
        text: "Prefer to camp rather than push on to Base Camp? Our [Nanga Parbat Camping Experience](/tours/nanga-parbat-camping) is a 3-day, 2-night moderate trip for up to 10 people, running from Chilas to Fairy Meadows and on to a high meadow beneath the Rupal Face — no trekking or climbing experience required.",
      },
      {
        type: "callout",
        title: "On the trail",
        text: "Trail and safety guides oversee the river crossings, particularly on the glacial-melt sections later in summer, and a camp manager keeps meals hot at altitude.",
      },
    ],
    related: [
      {
        label: "Fairy Meadows Basecamp Trek",
        href: "/tours/fairy-meadows-trek",
        description: "The four-day guided trek to Nanga Parbat Base Camp.",
      },
      {
        label: "Fairy Meadows",
        href: "/destinations/fairy-meadows",
        description: "The destination guide: views, huts and how to reach it.",
      },
      {
        label: "Kutwal Lake",
        href: "/destinations/kutwal-lake",
        description: "The quiet alpine lake on the way in.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "deosai-plains-land-of-giants",
    title: "Deosai Plains: the Land of Giants",
    excerpt:
      "A plateau above 4,000 metres that is open only from July to September — brown bears, wildflowers and Sheosar Lake on one of the highest plateaus in the world.",
    category: "Nature",
    publishDate: "2026-09-08",
    featuredImage: "/Images/tours/deosai(4).png",
    featuredImageSize: { width: 1200, height: 896 },
    featuredImageAlt: "Wildflowers and a still lake across Deosai's open plateau under a big sky",
    seoDescription:
      "Deosai Plains, above 4,000 m, open July–September only: Himalayan brown bears, wildflowers, Sheosar Lake and our 3-day wildlife safari from Skardu.",
    keywords: [
      "Deosai Plains",
      "Deosai National Park season",
      "Himalayan brown bear Pakistan",
      "Sheosar Lake",
      "Deosai wildlife safari",
    ],
    body: [
      {
        type: "p",
        text: "[Deosai](/destinations/deosai-plains) means “the land of giants” — vast alpine plains at over 4,000 metres where wild landscapes stretch beneath an endless sky. One of the highest plateaus in the world, largely treeless and open, it is protected as a national park and home to one of the last strongholds of the Himalayan brown bear.",
      },
      { type: "h2", text: "A very short season" },
      {
        type: "p",
        text: "Deosai can only be visited from July to September. The plateau is snowbound and closed the rest of the year, which is part of why it feels so untouched. From July the plains erupt in wildflowers, drawing photographers to a landscape that looks completely different from its stark spring appearance.",
      },
      { type: "h2", text: "The Himalayan brown bear" },
      {
        type: "p",
        text: "Deosai National Park protects one of the last viable populations of Himalayan brown bears in South Asia, with sightings possible on quieter summer mornings. The bears are most active at dawn and dusk, so that's when our safari drives take place — alongside marmots and golden eagles across the open plateau.",
      },
      {
        type: "quote",
        text: "We watched a brown bear cross the plateau at dusk from maybe two hundred metres — completely unforgettable, and handled so responsibly by our guides.",
        cite: "A visitor from Islamabad",
      },
      { type: "h2", text: "Sheosar Lake" },
      {
        type: "p",
        text: "Within the plateau, Sheosar Lake is a high-altitude lake that reflects the surrounding peaks with almost no development around its shoreline — the safari camps beside it as the light turns gold over the grasslands.",
      },
      { type: "h2", text: "Getting there" },
      {
        type: "p",
        text: "Deosai is about two to three hours by road from [Skardu](/destinations/skardu-katpana), via a high mountain pass into the park.",
      },
      { type: "h2", text: "The Deosai Wildlife Safari" },
      {
        type: "p",
        text: "Our [Deosai Wildlife Safari](/tours/deosai-wildlife-safari) runs three days and two nights at an easy grade, with groups of up to ten travelling with national park rangers and naturalists:",
      },
      {
        type: "list",
        items: [
          "Day 1 — Skardu to the plateau, arriving to camp beside Sheosar Lake.",
          "Day 2 — Dedicated dawn and dusk wildlife drives, tracking brown bears, marmots and golden eagles.",
          "Day 3 — A morning wildflower walk, then the descent back to Skardu.",
        ],
      },
      {
        type: "callout",
        title: "Wildlife is never guaranteed",
        text: "No guarantees with wildlife — but few places in the country offer better odds, or a more spectacular plateau.",
      },
    ],
    related: [
      {
        label: "Deosai Wildlife Safari",
        href: "/tours/deosai-wildlife-safari",
        description: "Three days on the plateau with park rangers and naturalists.",
      },
      {
        label: "Deosai Plains",
        href: "/destinations/deosai-plains",
        description: "The destination guide to the Land of Giants.",
      },
      {
        label: "Skardu & Katpana",
        href: "/destinations/skardu-katpana",
        description: "The base for the road up to the plateau.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "whats-included-on-a-discover-gilgit-trip",
    title: "What's included on a Discover Gilgit trip",
    excerpt:
      "Guides, drivers, stays, meals, transfers, permits and park fees — plus what to arrange yourself, how our trip levels work, and how reserving a place works.",
    category: "Good to Know",
    publishDate: "2026-08-25",
    featuredImage: "/Images/tours/Stay.png",
    featuredImageSize: { width: 1600, height: 1067 },
    featuredImageAlt: "A group sharing a meal on the floor of a timber-beamed room",
    seoTitle: "What's Included on a Guided Trip",
    seoDescription:
      "What a Discover Gilgit guided trip includes — guide, driver, stays, meals, transfers, permits — what's not, trip levels and how reserving works.",
    keywords: [
      "Gilgit-Baltistan tour inclusions",
      "guided tour Gilgit what is included",
      "Gilgit-Baltistan trip difficulty levels",
      "how to book a Gilgit tour",
      "tour cancellation policy",
    ],
    body: [
      {
        type: "p",
        text: "Before you reserve a place, it helps to know exactly what a guided departure covers and what's left for you to arrange. Here's the short version, then the detail.",
      },
      { type: "h2", text: "What's included" },
      {
        type: "list",
        items: [
          "Local guide and driver throughout",
          "Accommodation per the itinerary",
          "All meals listed in the itinerary",
          "Airport and city transfers",
          "Permits and park entry fees",
        ],
      },
      {
        type: "p",
        text: "Permits and park entry fees are part of every guided departure, so they're taken care of as part of your trip rather than being something to chase down yourself.",
      },
      { type: "h2", text: "What's not included" },
      {
        type: "list",
        items: ["International flights", "Travel insurance", "Personal expenses and souvenirs"],
      },
      {
        type: "callout",
        title: "Visas and entry requirements",
        text: "Visa and entry rules depend on your nationality and can change, so we don't list them here. Check the official guidance for your passport before you book flights, and ask your trip planner if you're unsure what to check.",
      },
      { type: "h2", text: "Choosing the right level" },
      {
        type: "p",
        text: "Every trip is rated Easy, Moderate or Strenuous, and group sizes are capped — depending on the trip, between 10 and 14 people — so you're never lost in a crowd.",
      },
      {
        type: "list",
        items: [
          "Easy: the [Deosai Wildlife Safari](/tours/deosai-wildlife-safari), the [Cultural Heritage Tour](/tours/altit-baltit) and the [Shigar Valley Heritage Trail](/tours/shigar-heritage-trail).",
          "Moderate: the [Fairy Meadows Basecamp Trek](/tours/fairy-meadows-trek) and the [Nanga Parbat Camping Experience](/tours/nanga-parbat-camping).",
          "Strenuous: the [Rakaposhi Base Camp Trek](/tours/rakaposhi-trek) and the [Passu Cathedral Peaks Trek](/tours/passu-cathedral-trek).",
        ],
      },
      { type: "h2", text: "How reserving works" },
      {
        type: "list",
        items: [
          "Send a [reservation request](/book) for the trip you want. No payment is taken through the form.",
          "A local trip planner reviews every request personally and replies within one working day, usually sooner.",
          "Once your spot is confirmed, we arrange a deposit and payment plan directly with you.",
          "Full cancellation terms are shared once your booking is confirmed; most departures allow free cancellation up to 30 days before the trip starts.",
        ],
      },
      {
        type: "p",
        text: "Group departures run on the fixed dates listed for each trip. If you'd like a different date, note your preferred timing in the special requests box and we'll flag upcoming alternatives.",
      },
    ],
    related: [
      {
        label: "Browse tours & events",
        href: "/tours",
        description: "Every upcoming departure, with dates, levels and prices.",
      },
      {
        label: "Reserve your spot",
        href: "/book",
        description: "Send a reservation request — no payment taken.",
      },
      {
        label: "Plan your trip",
        href: "/plan-your-trip",
        description: "Not sure yet? Tell a planner what you have in mind.",
      },
    ],
  },
];

/** Drops the [label](/path) link markup, leaving just the label. */
export function stripInlineMarkup(text: string): string {
  return text.replace(/\[([^\]]+)\]\((?:\/[^)\s]*)\)/g, "$1");
}

/** The article body as plain text — for word counts and structured data. */
export function bodyToPlainText(blocks: BlogBlock[]): string {
  return blocks
    .map((block) => {
      if (block.type === "list") return block.items.map(stripInlineMarkup).join(" ");
      if (block.type === "callout") return `${stripInlineMarkup(block.title)} ${stripInlineMarkup(block.text)}`;
      return stripInlineMarkup(block.text);
    })
    .join(" ");
}

function wordCount(blocks: BlogBlock[]): number {
  return bodyToPlainText(blocks).split(/\s+/).filter(Boolean).length;
}

/** Roughly 200 words a minute, never less than one. */
function readMinutesFor(words: number): number {
  return Math.max(1, Math.round(words / 200));
}

/** All posts, newest first. */
export const BLOG_POSTS: BlogPost[] = RAW_POSTS.map((post) => {
  const words = wordCount(post.body);
  const readMinutes = readMinutesFor(words);
  return { ...post, wordCount: words, readMinutes, readTime: `${readMinutes} min read` };
}).sort((a, b) => b.publishDate.localeCompare(a.publishDate));

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

/** Other posts to suggest under an article — same category first, then newest. */
export function getMorePosts(current: BlogPost, count = 3): BlogPost[] {
  const others = BLOG_POSTS.filter((post) => post.slug !== current.slug);
  return [...others.filter((p) => p.category === current.category), ...others.filter((p) => p.category !== current.category)].slice(
    0,
    count
  );
}

/** e.g. "6 October 2026" — fixed to UTC so server and browser always render the same date. */
export function formatBlogDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
