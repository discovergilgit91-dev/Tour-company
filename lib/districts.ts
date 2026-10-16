/**
 * District / region pages (/destinations/<slug>) — ONE entry per district.
 * The page template (components/district/DistrictPage.tsx) is filled entirely
 * from this data, so adding Nagar, Astore and the rest is a matter of adding
 * an entry here and its photos under public/Images/districts/<slug>/ — no new
 * code.
 *
 * Content rules: warm, respectful, simple English; only facts that are safe
 * to state. Leave a field out rather than guess (dates, numbers, quotes).
 *
 * What fills itself in from the rest of the site:
 *   - "Best spots" — the destination pages in `places` (name, photo, elevation).
 *   - "Upcoming tours and events" — tours / events whose district matches
 *     (a tour's `district`, else the region it starts in) and that haven't
 *     ended yet. The section hides itself when there are none.
 *   - "Related reading" — blog posts tagged with this district. Hidden when
 *     there are none.
 *   - The altitude range in the hero — min to max of the listed places.
 */

/** Every district the site will get. Tours, events and blog posts tag themselves with one of these. */
export type DistrictSlug =
  | "hunza"
  | "nagar"
  | "skardu"
  | "shigar"
  | "ghanche"
  | "ghizer"
  | "astore"
  | "diamer"
  | "gilgit";

/** Looked up in components/district/icons.tsx. */
export type DistrictIconId =
  | "mountain"
  | "fort"
  | "hospitality"
  | "water"
  | "blossom"
  | "food"
  | "wildlife"
  | "snow"
  | "sun"
  | "culture";

export type DistrictImage = {
  /** Path under /public. Until the real photo is added this is a labelled placeholder with the same filename. */
  src: string;
  /** Describes what the photo should show — never "photo coming soon". */
  alt: string;
  width: number;
  height: number;
  /** Optional CSS object-position for the crop, e.g. "50% 40%". */
  focus?: string;
};

export type District = {
  slug: DistrictSlug;
  /** Page heading, e.g. "Hunza Valley". */
  name: string;
  /** Short form used in headings and links, e.g. "Hunza". */
  shortName: string;
  tagline: string;
  /** Always "Gilgit-Baltistan" for now — shown in the hero facts. */
  regionLabel: string;
  mainTown: string;
  /** Short, hero-sized: e.g. "April – October". */
  bestTime: string;
  hero: DistrictImage;

  /** Which destination pages belong here: a whole group from REGIONS in lib/destinations.ts, and/or listed ids. */
  places: { regionId?: string; ids?: string[] };

  why: {
    /** One or two short paragraphs. */
    intro: string[];
    /** 4–6 cards. */
    highlights: { icon: DistrictIconId; title: string; text: string }[];
  };

  traditions: {
    intro: string;
    image: DistrictImage;
    items: { title: string; text: string }[];
  };

  culture: {
    intro: string;
    image: DistrictImage;
    items: { title: string; text: string }[];
  };

  food: {
    intro: string;
    /** 4–6 dishes. */
    items: { name: string; text: string; image: DistrictImage }[];
    /** "Where to try" — only when the site genuinely has that information. */
    tip?: string;
  };

  travelTips: {
    bestTime: { season: string; months: string; text: string }[];
    gettingThere: { intro: string; steps: string[] };
    pack: string[];
    respect: string[];
  };

  cta: { heading: string; text: string; image: DistrictImage };

  seo: {
    /** Without the site name — it is added ("… | Discover Gilgit"). Keep under ~45 characters. */
    title: string;
    /** Under 160 characters. */
    description: string;
    keywords: string[];
  };
};

const hunzaPhoto = (file: string, alt: string, width: number, height: number, focus?: string): DistrictImage => ({
  src: file.startsWith("/") ? file : `/Images/districts/hunza/${file}`,
  alt,
  width,
  height,
  focus,
});

export const DISTRICTS: District[] = [
  {
    slug: "hunza",
    name: "Hunza Valley",
    shortName: "Hunza",
    tagline: "Orchards, old forts and snow peaks at every turn.",
    regionLabel: "Gilgit-Baltistan",
    mainTown: "Karimabad",
    bestTime: "April – October",
    hero: hunzaPhoto(
      "hunza-hero.jpg",
      "A wide view across the Hunza valley, with terraced fields below snow-capped peaks",
      1672,
      941,
      "50% 55%"
    ),
    places: { regionId: "hunza" },

    why: {
      intro: [
        "Hunza is a high valley in the north of Gilgit-Baltistan. The Karakoram Highway follows the Hunza River here, beneath some of the great mountains of the Karakoram.",
        "Villages climb the slopes in terraces of apricot, cherry and mulberry. Old forts watch over them. Most visitors remember the welcome as much as the views.",
      ],
      highlights: [
        {
          icon: "mountain",
          title: "Mountain views",
          text: "Rakaposhi, Ultar Sar and the Passu Cones rise above rooftops, orchards and the highway.",
        },
        {
          icon: "fort",
          title: "Ancient forts",
          text: "Baltit Fort and Altit Fort look over the valley, with centuries of local history inside.",
        },
        {
          icon: "hospitality",
          title: "Warm hospitality",
          text: "A cup of tea and a friendly conversation are a common welcome in homes and guesthouses.",
        },
        {
          icon: "water",
          title: "Lakes and glaciers",
          text: "Attabad Lake, Borith Lake and the Passu Glacier bring turquoise water and ice to the road north.",
        },
        {
          icon: "blossom",
          title: "Apricot blossom",
          text: "In spring the terraces turn pink and white. In autumn the orchards turn gold.",
        },
        {
          icon: "food",
          title: "Local food",
          text: "Fresh bread, apricots, mulberries and home cooking — simple, hearty and made with local produce.",
        },
      ],
    },

    traditions: {
      intro:
        "Life in Hunza follows the seasons: sowing in spring, harvest in summer, and gatherings when the work is done. Many customs are about thanks, sharing and welcome.",
      image: hunzaPhoto(
        "/Images/tours/hunza-tradition.jpg",
        "A visitor and a Hunza elder in a traditional feathered cap, with the valley and mountains behind them",
        1400,
        933
      ),
      items: [
        {
          title: "Navroz",
          text: "Navroz marks the new year at the start of spring. It is celebrated in Hunza with prayers, music and meals shared with family and neighbours.",
        },
        {
          title: "Ginani",
          text: "Ginani is a harvest celebration in the valley — a time to give thanks for the season's crops, with music, dance and food. Dates vary, so ask locally if you hope to see it.",
        },
        {
          title: "The orchard year",
          text: "Blossom in spring, fresh fruit in summer, and apricots and mulberries drying in the sun for the months ahead. The calendar of the valley is the calendar of the trees.",
        },
        {
          title: "Community life",
          text: "Villages are close-knit. Neighbours help one another with harvests, building work and celebrations.",
        },
        {
          title: "Greetings and hospitality",
          text: "A friendly “Assalam-o-Alaikum” is always welcome. Guests are often offered tea and dried fruit — accepting is a kind way to say thank you.",
        },
      ],
    },

    culture: {
      intro:
        "Hunza is home to a rich mix of communities, languages and heritage. Take your time, ask questions politely, and listen — people are usually proud to share their story.",
      image: hunzaPhoto(
        "/Images/tours/hunza-culture.jpg",
        "Three Hunza women in traditional embroidered caps",
        500,
        331
      ),
      items: [
        {
          title: "People and languages",
          text: "Burushaski, spoken in Hunza, is not known to be related to any other language in the world. Wakhi is spoken in upper Hunza, and Shina is also heard in the wider region. Urdu is understood almost everywhere. Many people in Hunza follow the Ismaili tradition of Islam.",
        },
        {
          title: "History and heritage",
          text: "Hunza was once a princely state ruled by hereditary leaders known as the Mirs. Baltit Fort in Karimabad and Altit Fort were centres of that history, and both can be visited today. Careful restoration has helped keep their carved timber and stone architecture alive.",
        },
        {
          title: "Music, dance and dress",
          text: "Traditional music is played on instruments such as the surnai, a reed pipe, and the damal, a drum — often for festivals and weddings. Woollen caps and embroidered, colourful clothing are part of festive dress.",
        },
        {
          title: "Crafts",
          text: "Woodcarving, weaving and embroidery are part of everyday heritage. In Karimabad's old bazaar and in the lanes of Altit Khun you can meet artisans at work and buy directly from them.",
        },
      ],
    },

    food: {
      intro:
        "Hunza's food is simple and made from what grows nearby. Here are five things to look for.",
      items: [
        {
          name: "Chapshoro",
          text: "A spiced meat-filled flatbread, cooked until golden — a hearty snack to share.",
          image: hunzaPhoto("/Images/tours/chapshoro.jpeg", "Chapshoro, a spiced meat-filled flatbread, served on a wooden plate", 690, 531),
        },
        {
          name: "Diram Fitti",
          text: "A traditional Hunza wheat bread, often enjoyed with local apricot oil or butter.",
          image: hunzaPhoto("/Images/tours/diram-fiti.webp", "Diram Fitti, a traditional Hunza dish, served in a bowl with a spoon", 768, 512),
        },
        {
          name: "Apricots and apricot oil",
          text: "Hunza's best-known fruit: eaten fresh in summer, dried through the year, and pressed into oil from the kernels.",
          image: hunzaPhoto("/Images/tours/appricot.webp", "Apricots drying in the sun on a Hunza rooftop, with the valley and mountains behind", 1024, 576),
        },
        {
          name: "Mulberries",
          text: "Sweet mulberries are picked in summer and often dried — a chewy, honey-like snack for the road.",
          image: hunzaPhoto("/Images/tours/mulberries.jpg", "Fresh dark mulberries", 1000, 1500),
        },
        {
          name: "Local tea",
          text: "Tea is served warm and often. Accept a cup and you will usually find a conversation to go with it.",
          image: hunzaPhoto("/Images/tours/hunza-tea.webp", "A glass cup of hot tea with fresh mint leaves", 2560, 1706),
        },
      ],
      tip: "Karimabad's old town has family-run cafés, and lakeside stalls at Attabad Lake grill fresh trout. In summer, apricots and mulberries are sold fresh from the tree.",
    },

    travelTips: {
      bestTime: [
        {
          season: "Spring",
          months: "March – May",
          text: "Blossom season in the orchards around Karimabad. The lower valleys open up from April.",
        },
        {
          season: "Summer",
          months: "June – September",
          text: "The high country is open. Khunjerab Pass is open from May to September.",
        },
        {
          season: "Autumn",
          months: "September – October",
          text: "Golden orchards and clear mountain views. Autumn colour reaches Borith Lake too.",
        },
        {
          season: "Winter",
          months: "December – February",
          text: "Cold, and much of the north is snowbound. Baltit Fort can be visited all year round.",
        },
      ],
      gettingThere: {
        intro:
          "Hunza is reached by road along the Karakoram Highway (KKH), usually by way of Gilgit.",
        steps: [
          "From Gilgit: about two and a half hours by road to Karimabad.",
          "From Islamabad: a long journey on the KKH. Many travellers break it with a night on the way, often at Chilas or Gilgit.",
          "By air: flights run between Islamabad and Gilgit, but they depend on the weather, so keep your plans flexible.",
        ],
      },
      pack: [
        "Layers — mornings and evenings can be cool, even in summer",
        "A warm jacket and a sun hat",
        "Sunscreen and sunglasses: the sun is strong at altitude",
        "Sturdy walking shoes for forts, lanes and viewpoints",
        "Modest, comfortable clothing",
        "A refillable water bottle and a power bank",
      ],
      respect: [
        "Dress modestly: keep shoulders and knees covered, especially in villages and at religious sites.",
        "Ask before you photograph people, and always ask before photographing women and children.",
        "Ask permission before entering a home or an orchard, and before picking any fruit.",
        "Remove your shoes where others do, and keep your voice low near mosques and prayer spaces.",
        "Buy crafts and food directly from local makers where you can.",
      ],
    },

    cta: {
      heading: "Plan your Hunza trip",
      text: "Tell us when you want to go and what you love — a local trip planner will shape the journey around you.",
      image: hunzaPhoto(
        "hunza-cta.jpg",
        "Rooftops and terraces of Karimabad below the mountains, seen from above",
        1200,
        896
      ),
    },

    seo: {
      title: "Hunza Valley Travel Guide",
      description:
        "Plan a trip to Hunza Valley: forts, lakes, apricot blossom, food and culture, plus the best time to visit, how to get there and upcoming tours.",
      keywords: [
        "Hunza Valley travel guide",
        "things to do in Hunza",
        "Karimabad",
        "Baltit Fort",
        "Hunza food",
        "best time to visit Hunza",
      ],
    },
  },
];

export function getDistrict(slug: string): District | undefined {
  return DISTRICTS.find((district) => district.slug === slug);
}

export function districtHref(district: Pick<District, "slug">): string {
  return `/destinations/${district.slug}`;
}
