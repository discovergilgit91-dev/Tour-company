import type { District, DistrictImage } from "./districts";

/**
 * The other district guides, filled from the same template as Hunza
 * (components/district/DistrictPage.tsx). Photos are the ones already in the
 * project under /public/Images/tours — nothing is hot-linked.
 *
 * Content rules, as for Hunza: warm, simple English; only facts that are safe
 * to state; a field is left out rather than guessed. The food and culture
 * photos are general Gilgit-Baltistan pictures (festival and market photos),
 * so their captions describe what is in the picture, not a specific village.
 */

const photo = (file: string, alt: string, width: number, height: number, focus?: string): DistrictImage => ({
  src: `/Images/tours/${file}`,
  alt,
  width,
  height,
  focus,
});

// Food photos shared by the guides (general Gilgit-Baltistan food, not one village's).
const FOOD_TABLE = photo(
  "gallery/food-table.jpg",
  "A table spread with flatbreads, noodle soup, dumplings, dips and sauces",
  1000,
  495
);
const FOOD_APRICOTS = photo(
  "appricot.webp",
  "Apricots laid out to dry in the sun on a rooftop, with a green valley and mountains behind",
  1024,
  576
);
const FOOD_MULBERRIES = photo("mulberries.jpg", "Fresh dark mulberries", 1000, 1500);
const FOOD_TEA = photo("hunza-tea.webp", "A glass cup of hot tea with fresh mint leaves", 2560, 1706);
const FOOD_FLATBREAD = photo(
  "chapshoro.jpeg",
  "A golden, filled flatbread served on a wooden plate beside a bowl",
  690,
  531
);

const PACK_ESSENTIALS = [
  "Layers — mornings and evenings can be cold, even in summer",
  "A warm jacket, a sun hat and sunglasses",
  "Sunscreen: the sun is strong at altitude",
  "Sturdy walking shoes",
  "Modest, comfortable clothing",
  "A refillable water bottle and a power bank",
];

const RESPECT_BASICS = [
  "Dress modestly: keep shoulders and knees covered, especially in villages and at religious sites.",
  "Ask before you photograph people, and always ask before photographing women and children.",
  "Ask permission before entering a home, a field or an orchard, and before picking any fruit.",
  "Remove your shoes where others do, and keep your voice low near mosques and prayer spaces.",
  "Buy crafts and food directly from local makers where you can.",
];

export const MORE_DISTRICTS: District[] = [
  /* ------------------------------------------------------------------ Nagar */
  {
    slug: "nagar",
    name: "Nagar Valley",
    shortName: "Nagar",
    tagline: "Glaciers, high pastures and the great face of Rakaposhi.",
    regionLabel: "Gilgit-Baltistan",
    mainTown: "Nagar Khas",
    bestTime: "May – October",
    hero: photo(
      "rakaposhis-near-unbroken-rise.png",
      "A trekker sitting above a glacier, looking at the snow ridges of Rakaposhi",
      2000,
      1333,
      "50% 40%"
    ),
    places: { regionId: "nagar" },

    why: {
      intro: [
        "Nagar lies across the Hunza River from Hunza, on the slopes below Rakaposhi (7,788 m). Its villages sit among terraced fields, with glaciers and high pastures above them.",
        "It is a quieter, more rugged valley than its famous neighbour — a good home for walkers, photographers and anyone who likes a mountain close enough to touch.",
      ],
      highlights: [
        {
          icon: "mountain",
          title: "Rakaposhi",
          text: "One of the great peaks of the Karakoram, rising almost straight up from the valley floor.",
        },
        {
          icon: "snow",
          title: "Glaciers on your doorstep",
          text: "Hopar Glacier and Minapin Glacier can be reached on foot from villages in the valley.",
        },
        {
          icon: "water",
          title: "High alpine lakes",
          text: "Rush Lake sits high above the valley, reached by a long summer trek.",
        },
        {
          icon: "blossom",
          title: "Orchards and fields",
          text: "Apricot and cherry trees fill the terraces around the villages in spring and summer.",
        },
        {
          icon: "culture",
          title: "A valley with its own history",
          text: "Nagar was once a princely state of its own, ruled by the Mirs of Nagar.",
        },
        {
          icon: "hospitality",
          title: "Village welcome",
          text: "Guesthouses are small and family-run — a good way to meet the people who live here.",
        },
      ],
    },

    traditions: {
      intro:
        "Life in Nagar follows the seasons. Fields are sown in spring, fruit is dried in summer, and in the warmer months animals are taken up to the high pastures.",
      image: photo(
        "local-dance.png",
        "Dancers in bright coats performing at a Gilgit-Baltistan festival, with a crowd watching",
        1844,
        1112
      ),
      items: [
        {
          title: "The farming year",
          text: "Wheat, barley, potatoes and fruit are grown on small terraced fields watered by channels from the glaciers.",
        },
        {
          title: "Summer pastures",
          text: "In summer, families in many mountain valleys move their animals to the high pastures, where the grass is fresh.",
        },
        {
          title: "Festivals, music and dance",
          text: "Music and dance are part of celebrations across Gilgit-Baltistan, often with drums and reed pipes. Dates vary, so ask locally.",
        },
        {
          title: "Community life",
          text: "Villages are close-knit. Neighbours help one another with harvests, building work and celebrations.",
        },
        {
          title: "Greetings and hospitality",
          text: "A friendly “Assalam-o-Alaikum” is always welcome. Guests are often offered tea — accepting is a kind way to say thank you.",
        },
      ],
    },

    culture: {
      intro:
        "Nagar is home to people who speak more than one language and keep their own heritage. Take your time, ask politely, and listen.",
      image: photo(
        "handcraft-markey.png",
        "A small craft shop with hanging woven textiles, baskets and clothing",
        1080,
        1080
      ),
      items: [
        {
          title: "People and languages",
          text: "Burushaski and Shina are both spoken in the Nagar area. Urdu is understood almost everywhere, and you will often meet people who speak some English.",
        },
        {
          title: "History",
          text: "Nagar was once its own princely state, ruled by the Mirs of Nagar. The valley and its neighbour Hunza were two distinct kingdoms facing each other across the river.",
        },
        {
          title: "Mountaineering heritage",
          text: "Rakaposhi was first climbed in 1958. Today its base camp is a favourite trek for walkers rather than climbers.",
        },
        {
          title: "Crafts",
          text: "Weaving, embroidery and woodwork are part of everyday heritage. Buy from local makers where you can.",
        },
      ],
    },

    food: {
      intro:
        "Food in Nagar is simple and made from what grows nearby: bread, fruit, dairy and vegetables. Here are four things to look for.",
      items: [
        {
          name: "Home-cooked meals",
          text: "Breads, soups and dumplings, usually shared from the middle of the table.",
          image: FOOD_TABLE,
        },
        {
          name: "Apricots",
          text: "Eaten fresh in summer and dried in the sun for the months ahead.",
          image: FOOD_APRICOTS,
        },
        {
          name: "Mulberries",
          text: "Sweet berries picked in summer and often dried, a chewy snack for the road.",
          image: FOOD_MULBERRIES,
        },
        {
          name: "Tea",
          text: "Tea is served warm and often. Accept a cup and you will usually find a conversation to go with it.",
          image: FOOD_TEA,
        },
      ],
    },

    travelTips: {
      bestTime: [
        { season: "Spring", months: "March – May", text: "Orchards in blossom in the lower villages. Higher trails are still snowy." },
        { season: "Summer", months: "June – September", text: "The best time for trekking to Rakaposhi Base Camp and the high pastures." },
        { season: "Autumn", months: "September – October", text: "Clear air and golden leaves. Nights turn cold quickly at altitude." },
        { season: "Winter", months: "December – February", text: "Cold and snowy; high trails are closed and many guesthouses shut." },
      ],
      gettingThere: {
        intro: "Nagar is reached by road along the Karakoram Highway (KKH), usually by way of Gilgit.",
        steps: [
          "From Gilgit: follow the KKH north; the Nagar side of the Hunza River is reached by bridge.",
          "From Hunza: Karimabad and Nagar face each other across the river, so the two are often combined.",
          "By air: flights run between Islamabad and Gilgit, but they depend on the weather, so keep your plans flexible.",
        ],
      },
      pack: [...PACK_ESSENTIALS.slice(0, 3), "Sturdy trekking shoes with good grip — trails can be rocky or snowy", ...PACK_ESSENTIALS.slice(4)],
      respect: RESPECT_BASICS,
    },

    cta: {
      heading: "Plan your Nagar trip",
      text: "Tell us when you want to go and what you love — a local trip planner will shape the journey around you.",
      image: photo("nagar-glacier.png", "A trekker pointing across a wide glacier toward snow peaks", 1534, 1025),
    },

    seo: {
      title: "Nagar Valley Travel Guide",
      description:
        "Plan a trip to Nagar Valley: Rakaposhi, Hopar and Minapin glaciers, Rush Lake, food and culture, plus the best time to visit and how to get there.",
      keywords: ["Nagar Valley travel guide", "Rakaposhi", "Hopar Glacier", "Minapin", "Rush Lake", "best time to visit Nagar"],
    },
  },

  /* ----------------------------------------------------------------- Skardu */
  {
    slug: "skardu",
    name: "Skardu",
    shortName: "Skardu",
    tagline: "Cold deserts, wide plains and the gateway to the highest peaks.",
    regionLabel: "Gilgit-Baltistan",
    mainTown: "Skardu",
    bestTime: "May – October",
    hero: photo(
      "Kaptana-desert.png",
      "Sand dunes under a bright sun, with snow-capped mountains on the horizon",
      1619,
      971,
      "50% 55%"
    ),
    places: { ids: ["skardu-katpana", "kachura-lake", "deosai-plains"] },

    why: {
      intro: [
        "Skardu is the main town of Baltistan, in the east of Gilgit-Baltistan. It sits in a broad valley beside the Indus River, ringed by some of the highest mountains in the world.",
        "From here, roads and trails lead to sand dunes, clear lakes, high plains and the long approach to the Karakoram giants. Many treks to K2 start in this part of the country.",
      ],
      highlights: [
        {
          icon: "sun",
          title: "A cold desert",
          text: "Sand dunes sit beneath snow peaks near Skardu — a surprising and very photogenic landscape.",
        },
        {
          icon: "water",
          title: "Lakes",
          text: "Lower Kachura and other lakes around the valley are calm, clear and easy to visit.",
        },
        {
          icon: "wildlife",
          title: "Deosai Plains",
          text: "A high plateau with wildflowers in summer and a home for wildlife, including brown bears.",
        },
        {
          icon: "fort",
          title: "Old forts and towns",
          text: "Skardu's history is told in its forts, old houses and bazaars.",
        },
        {
          icon: "mountain",
          title: "A base for big mountains",
          text: "Skardu is the usual starting point for treks and expeditions in the central Karakoram.",
        },
        {
          icon: "hospitality",
          title: "Warm welcome",
          text: "Guesthouses and cafés in Skardu are used to visitors, and people are glad to help.",
        },
      ],
    },

    traditions: {
      intro:
        "Baltistan has its own language, music and festivals. Many traditions are linked to the seasons, the harvest and the long winter.",
      image: photo(
        "gallery/perf-musicians.jpg",
        "Two musicians sitting on a rug in a green meadow, one playing a large drum",
        935,
        422
      ),
      items: [
        {
          title: "Music and drums",
          text: "Drums and reed pipes are played at weddings and festivals across Gilgit-Baltistan.",
        },
        {
          title: "Polo and sport",
          text: "Polo is a favourite sport across the region, played on horseback with great speed and noise.",
        },
        {
          title: "The farming year",
          text: "Apricots, wheat and barley are grown in the valleys, and fruit is dried for the winter.",
        },
        {
          title: "Community life",
          text: "Villages are close-knit. Neighbours help one another with harvests, building and celebrations.",
        },
        {
          title: "Greetings and hospitality",
          text: "A friendly “Assalam-o-Alaikum” is always welcome. Guests are often offered tea.",
        },
      ],
    },

    culture: {
      intro:
        "Baltistan is home to a distinct culture with Tibetan roots. Take your time, ask questions politely, and listen — people are usually proud to share their story.",
      image: photo(
        "gallery/craft-garments.jpg",
        "Woollen clothing and woven textiles hanging in a small shop",
        400,
        420
      ),
      items: [
        {
          title: "People and language",
          text: "Balti, spoken here, belongs to the Tibetic family of languages. Urdu is widely understood, and English is common in the tourism trade.",
        },
        {
          title: "History",
          text: "For centuries Baltistan was linked by trade and culture to Ladakh and Tibet. Forts and old houses in and around Skardu reflect that long history.",
        },
        {
          title: "Gateway to the peaks",
          text: "Skardu is the starting point for treks into the central Karakoram, and many guides and porters in the area have long experience of the mountains.",
        },
        {
          title: "Crafts",
          text: "Weaving, woodwork and metalwork are part of everyday heritage. Buy from local makers where you can.",
        },
      ],
    },

    food: {
      intro:
        "Baltistan's food is hearty and made for cold weather: bread, dumplings, soups and dried fruit. Here are four things to look for.",
      items: [
        {
          name: "Breads and dumplings",
          text: "Local breads and filled dishes, often served with soup or tea.",
          image: FOOD_TABLE,
        },
        {
          name: "Apricots",
          text: "A fruit of the valley: eaten fresh in summer and dried for winter.",
          image: FOOD_APRICOTS,
        },
        {
          name: "Filled flatbread",
          text: "A warm, filling flatbread, good for a long day on the road.",
          image: FOOD_FLATBREAD,
        },
        {
          name: "Tea",
          text: "Tea is served warm and often, a welcome after a cold morning.",
          image: FOOD_TEA,
        },
      ],
    },

    travelTips: {
      bestTime: [
        { season: "Spring", months: "April – May", text: "Blossom in the valley, with snow still on the high roads." },
        { season: "Summer", months: "June – August", text: "The best time for lakes and treks, with Deosai open from about July. Days are warm; evenings are cool." },
        { season: "Autumn", months: "September – October", text: "Crisp air and golden poplars. High roads begin to close." },
        { season: "Winter", months: "November – March", text: "Cold and snowy. Deosai is closed, and many services close too." },
      ],
      gettingThere: {
        intro: "Skardu can be reached by road or by air.",
        steps: [
          "By road: the Skardu road leaves the Karakoram Highway near Jaglot, so the journey is usually combined with Gilgit.",
          "By air: there are flights between Islamabad and Skardu, but they depend on the weather, so keep your plans flexible.",
          "Deosai: the plateau road is open from about July to September; check conditions with your guide.",
        ],
      },
      pack: PACK_ESSENTIALS,
      respect: RESPECT_BASICS,
    },

    cta: {
      heading: "Plan your Skardu trip",
      text: "Tell us when you want to go and what you love — a local trip planner will shape the journey around you.",
      image: photo(
        "deosai-plains.jpg",
        "A wide green plain with a stream and a line of snow mountains in the distance",
        2400,
        1340
      ),
    },

    seo: {
      title: "Skardu Travel Guide",
      description:
        "Plan a trip to Skardu: Katpana cold desert, Kachura lakes, Deosai Plains, food and culture, plus the best time to visit and how to get there.",
      keywords: ["Skardu travel guide", "Katpana Desert", "Deosai Plains", "Kachura Lake", "things to do in Skardu"],
    },
  },

  /* ----------------------------------------------------------------- Shigar */
  {
    slug: "shigar",
    name: "Shigar Valley",
    shortName: "Shigar",
    tagline: "A wide river valley, an old fort and the road to the big peaks.",
    regionLabel: "Gilgit-Baltistan",
    mainTown: "Shigar",
    bestTime: "May – October",
    hero: photo(
      "shigar(4).png",
      "A broad valley with a green river plain between dark mountains under heavy clouds",
      1920,
      1080,
      "50% 55%"
    ),
    places: { ids: ["shigar-valley"] },

    why: {
      intro: [
        "Shigar is a wide river valley north-east of Skardu. Green fields and poplar trees line the river, with sand and rock mountains close on every side.",
        "The valley is known for its old fort and for being the start of the road towards the high peaks of the central Karakoram.",
      ],
      highlights: [
        {
          icon: "fort",
          title: "Shigar Fort",
          text: "A restored fort and palace, now a heritage guesthouse, with carved wood and a peaceful garden.",
        },
        {
          icon: "mountain",
          title: "Gateway to the peaks",
          text: "The valley road leads on towards Askole, the last village on the classic trek towards K2.",
        },
        {
          icon: "blossom",
          title: "Orchards and fields",
          text: "Apricot and apple trees and small fields fill the valley floor.",
        },
        {
          icon: "culture",
          title: "Old houses and mosques",
          text: "Wooden mosques and traditional stone-and-timber houses remain in the villages.",
        },
        {
          icon: "sun",
          title: "Big skies",
          text: "Wide views, strong light and dramatic clouds make this a rewarding valley for photographers.",
        },
        {
          icon: "hospitality",
          title: "Village welcome",
          text: "Small guesthouses and family homes are a good way to meet people who live here.",
        },
      ],
    },

    traditions: {
      intro:
        "Life in Shigar follows the seasons and the river. Many customs are about sharing food and helping neighbours.",
      image: photo(
        "gallery/community-feast.jpg",
        "People sharing a meal seated on red rugs inside a timber-framed room",
        1000,
        604
      ),
      items: [
        {
          title: "Shared meals",
          text: "Families often eat together from shared dishes laid out on rugs, and guests are invited to join.",
        },
        {
          title: "The farming year",
          text: "Wheat, barley and fruit are grown on small plots watered by channels from the river and the glaciers.",
        },
        {
          title: "Community life",
          text: "Villages are close-knit. Neighbours help one another with harvests, building work and celebrations.",
        },
        {
          title: "Greetings and hospitality",
          text: "A friendly “Assalam-o-Alaikum” is always welcome. Guests are often offered tea.",
        },
      ],
    },

    culture: {
      intro:
        "Shigar's culture is part of the wider Balti world. Take your time, ask questions politely, and listen.",
      image: photo(
        "shigar(2).png",
        "A traditional building with carved wooden balconies and white walls among trees",
        495,
        619
      ),
      items: [
        {
          title: "People and language",
          text: "Balti is the main language here, with Urdu widely understood.",
        },
        {
          title: "Fort and heritage",
          text: "Shigar Fort has been restored and reopened as a heritage guesthouse, and shows the carved-wood style of the old valley.",
        },
        {
          title: "Wooden mosques",
          text: "Some old mosques in Baltistan are built of timber with carved details — ask permission before entering any mosque.",
        },
        {
          title: "Crafts",
          text: "Woodwork, weaving and stonework are part of everyday heritage. Buy from local makers where you can.",
        },
      ],
    },

    food: {
      intro:
        "Shigar's food is simple and made from local produce: bread, dried fruit, dairy and vegetables. Here are four things to look for.",
      items: [
        {
          name: "Village meals",
          text: "Breads, soups and filled dishes, often shared from the middle of the table.",
          image: FOOD_TABLE,
        },
        {
          name: "Apricots",
          text: "Eaten fresh in summer and dried in the sun for the months ahead.",
          image: FOOD_APRICOTS,
        },
        {
          name: "Mulberries",
          text: "Sweet berries picked in summer and often dried — a chewy, honey-like snack.",
          image: FOOD_MULBERRIES,
        },
        {
          name: "Tea",
          text: "Tea is served warm and often. Accept a cup and you will usually find a conversation to go with it.",
          image: FOOD_TEA,
        },
      ],
    },

    travelTips: {
      bestTime: [
        { season: "Spring", months: "April – May", text: "Blossom on the valley floor; high trails are still snowy." },
        { season: "Summer", months: "June – August", text: "The best time for trekking and the high valleys." },
        { season: "Autumn", months: "September – October", text: "Clear days and golden poplars. Nights are cold." },
        { season: "Winter", months: "November – March", text: "Cold and snowy; roads can close and services are limited." },
      ],
      gettingThere: {
        intro: "Shigar is reached by road from Skardu.",
        steps: [
          "From Skardu: a short drive up the valley road.",
          "From Islamabad: fly to Skardu (weather permitting) or travel by road via Gilgit and the Skardu road.",
          "For treks beyond Shigar, check permits and conditions with your guide before you go.",
        ],
      },
      pack: PACK_ESSENTIALS,
      respect: RESPECT_BASICS,
    },

    cta: {
      heading: "Plan your Shigar trip",
      text: "Tell us when you want to go and what you love — a local trip planner will shape the journey around you.",
      image: photo(
        "shigar-fort.jpg",
        "A stone fort beside a green meadow and a river, with snow peaks behind",
        2400,
        1793
      ),
    },

    seo: {
      title: "Shigar Valley Travel Guide",
      description:
        "Plan a trip to Shigar Valley: Shigar Fort, old villages, river views and the road to the high peaks, plus the best time to visit and how to get there.",
      keywords: ["Shigar Valley travel guide", "Shigar Fort", "Baltistan", "things to do in Shigar"],
    },
  },

  /* ----------------------------------------------------------------- Ghizer */
  {
    slug: "ghizer",
    name: "Ghizer",
    shortName: "Ghizer",
    tagline: "Quiet river valleys, clear lakes and the high polo ground of Shandur.",
    regionLabel: "Gilgit-Baltistan",
    mainTown: "Gahkuch",
    bestTime: "May – October",
    hero: photo(
      "phander(2).png",
      "A turquoise river winding between autumn poplars and sandy banks in Phander",
      1200,
      896,
      "50% 45%"
    ),
    places: { ids: ["ghizer-valley", "yasin-valley", "phander-valley"] },

    why: {
      intro: [
        "Ghizer is the western district of Gilgit-Baltistan, a land of long river valleys, green meadows and lakes. It is quieter than the better-known valleys, which many visitors count as part of its charm.",
        "The Ghizer River runs through it, with side valleys such as Yasin and Phander leading into the mountains.",
      ],
      highlights: [
        {
          icon: "water",
          title: "Rivers and lakes",
          text: "Clear streams and calm lakes, including the lake at Phander, are among the area's quiet highlights.",
        },
        {
          icon: "blossom",
          title: "Autumn colour",
          text: "In autumn, poplars and fields turn yellow and gold along the river valleys.",
        },
        {
          icon: "mountain",
          title: "Quiet valleys",
          text: "Yasin and Ghizer valleys are green and wide, with far fewer visitors than the main tourist routes.",
        },
        {
          icon: "culture",
          title: "Polo at Shandur",
          text: "The Shandur Pass polo ground, among the highest in the world, hosts a famous summer match.",
        },
        {
          icon: "wildlife",
          title: "Trout and wildlife",
          text: "The lakes and rivers are known for trout fishing, and the valleys are home to birds and mountain animals.",
        },
        {
          icon: "hospitality",
          title: "Village welcome",
          text: "Small guesthouses and family homes are a good way to meet people who live here.",
        },
      ],
    },

    traditions: {
      intro:
        "Ghizer's traditions are rooted in village life, the farming year and, in summer, the sport of polo. Many customs are about sharing and welcome.",
      image: photo(
        "gallery/community-polo.jpg",
        "Riders on horseback playing polo on a green plain, with snow mountains behind",
        726,
        438
      ),
      items: [
        {
          title: "Polo",
          text: "Polo is a favourite sport across Gilgit-Baltistan, played on horseback with great speed and noise. The match at Shandur Pass is the best known.",
        },
        {
          title: "The farming year",
          text: "Wheat, potatoes and fruit are grown on small plots, with trees in blossom in spring and golden leaves in autumn.",
        },
        {
          title: "Music and dance",
          text: "Drums and reed pipes are played at weddings and festivals. Dates vary, so ask locally.",
        },
        {
          title: "Community life",
          text: "Villages are close-knit. Neighbours help one another with harvests, building work and celebrations.",
        },
        {
          title: "Greetings and hospitality",
          text: "A friendly “Assalam-o-Alaikum” is always welcome. Guests are often offered tea.",
        },
      ],
    },

    culture: {
      intro:
        "Ghizer is home to several languages and communities. Take your time, ask questions politely, and listen.",
      image: photo(
        "gallery/craft-garments.jpg",
        "Woollen clothing and woven textiles hanging in a small shop",
        400,
        420
      ),
      items: [
        {
          title: "People and languages",
          text: "Several languages are spoken in Ghizer, including Shina, Khowar and Burushaski (in Yasin). Urdu is understood almost everywhere.",
        },
        {
          title: "Valley by valley",
          text: "Each side valley — Yasin, Ishkoman, Phander — has its own character, and travelling between them shows how varied this district is.",
        },
        {
          title: "Handmade clothing",
          text: "Woollen caps, shawls and woven cloth are still made and worn in many villages.",
        },
        {
          title: "Crafts",
          text: "Weaving, embroidery and woodwork are part of everyday heritage. Buy from local makers where you can.",
        },
      ],
    },

    food: {
      intro:
        "Ghizer's food is simple and made from local produce — bread, dairy, vegetables and fish from the rivers. Here are four things to look for.",
      items: [
        {
          name: "Home-cooked meals",
          text: "Breads, soups and filled dishes, usually shared from the middle of the table.",
          image: FOOD_TABLE,
        },
        {
          name: "Filled flatbread",
          text: "A warm, filling flatbread, good for a long day on the road.",
          image: FOOD_FLATBREAD,
        },
        {
          name: "Dried fruit",
          text: "Apricots and mulberries are dried in the sun and kept for the winter.",
          image: FOOD_APRICOTS,
        },
        {
          name: "Tea",
          text: "Tea is served warm and often. Accept a cup and you will usually find a conversation to go with it.",
          image: FOOD_TEA,
        },
      ],
    },

    travelTips: {
      bestTime: [
        { season: "Spring", months: "April – May", text: "Blossom in the lower valleys. Higher passes may still be snowed in." },
        { season: "Summer", months: "June – August", text: "The best time for lakes, meadows and the Shandur Pass." },
        { season: "Autumn", months: "September – October", text: "Gold and orange leaves along the river valleys." },
        { season: "Winter", months: "November – March", text: "Cold and snowy; passes close and services are limited." },
      ],
      gettingThere: {
        intro: "Ghizer is reached by road from Gilgit, following the Gilgit River upstream.",
        steps: [
          "From Gilgit: the valley road leads west towards Gupis, Yasin and Phander.",
          "By air: flights run between Islamabad and Gilgit, but they depend on the weather, so keep your plans flexible.",
          "Roads in the side valleys can be rough; ask your guide about conditions before you go.",
        ],
      },
      pack: PACK_ESSENTIALS,
      respect: RESPECT_BASICS,
    },

    cta: {
      heading: "Plan your Ghizer trip",
      text: "Tell us when you want to go and what you love — a local trip planner will shape the journey around you.",
      image: photo(
        "phander(3).png",
        "A green valley with a river and a small lake, seen from above",
        1200,
        896
      ),
    },

    seo: {
      title: "Ghizer Travel Guide",
      description:
        "Plan a trip to Ghizer: Phander Lake, Yasin Valley, the Shandur polo ground, food and culture, plus the best time to visit and how to get there.",
      keywords: ["Ghizer travel guide", "Phander Valley", "Yasin Valley", "Shandur Pass polo", "things to do in Ghizer"],
    },
  },

  /* ----------------------------------------------------------------- Astore */
  {
    slug: "astore",
    name: "Astore",
    shortName: "Astore",
    tagline: "Green meadows, alpine lakes and the south face of Nanga Parbat.",
    regionLabel: "Gilgit-Baltistan",
    mainTown: "Astore",
    bestTime: "June – September",
    hero: photo(
      "rupal-valley(4).png",
      "Camping tents glowing among rocks and snow under a bright moon",
      1200,
      766,
      "50% 50%"
    ),
    places: { ids: ["rama-lake", "harmosh-valley"] },

    why: {
      intro: [
        "Astore lies south of Gilgit, on the slopes of Nanga Parbat. It is a green, high-altitude district of meadows, forests and quiet valleys.",
        "Roads here are slower and the season is shorter, but those who come are rewarded with fresh air, huge views and very few other visitors.",
      ],
      highlights: [
        {
          icon: "mountain",
          title: "Nanga Parbat",
          text: "The Rupal side of Nanga Parbat is one of the tallest mountain faces in the world.",
        },
        {
          icon: "water",
          title: "Rama Lake",
          text: "A calm alpine lake in the middle of a pine-fringed meadow.",
        },
        {
          icon: "blossom",
          title: "Meadows and forests",
          text: "Summer brings green grass and flowers to the high pastures.",
        },
        {
          icon: "snow",
          title: "Snow and glaciers",
          text: "Snowfields and glaciers sit above the meadows, even in midsummer.",
        },
        {
          icon: "wildlife",
          title: "Quiet nature",
          text: "Fewer visitors mean more space for birds, wildflowers and long walks.",
        },
        {
          icon: "hospitality",
          title: "Village welcome",
          text: "Small guesthouses and family homes are a good way to meet people who live here.",
        },
      ],
    },

    traditions: {
      intro:
        "Life in Astore follows a short summer and a long winter. Many customs are about preparing for the cold and sharing what the land gives.",
      image: photo(
        "gallery/dance-torch-procession.jpg",
        "Men in traditional clothes carrying burning torches around a bonfire at night",
        662,
        520
      ),
      items: [
        {
          title: "The farming year",
          text: "Crops are sown late and harvested early. Potatoes, barley and vegetables are grown, and food is stored for winter.",
        },
        {
          title: "Summer pastures",
          text: "In summer, families move animals to the high pastures, where the grass is fresh.",
        },
        {
          title: "Festivals and fires",
          text: "Music, dance and bonfires are part of celebrations across Gilgit-Baltistan. Dates vary, so ask locally.",
        },
        {
          title: "Community life",
          text: "Villages are close-knit. Neighbours help one another with harvests, building work and celebrations.",
        },
        {
          title: "Greetings and hospitality",
          text: "A friendly “Assalam-o-Alaikum” is always welcome. Guests are often offered tea.",
        },
      ],
    },

    culture: {
      intro:
        "Astore's mountain villages keep their own ways. Take your time, ask questions politely, and listen.",
      image: photo(
        "rupal-valley(3).png",
        "A cluster of stone and timber houses in a green mountain valley",
        554,
        554
      ),
      items: [
        {
          title: "People and languages",
          text: "Shina is the main local language. Urdu is understood almost everywhere.",
        },
        {
          title: "Mountain villages",
          text: "Stone-and-timber houses cluster on the slopes, built to keep warm through long winters.",
        },
        {
          title: "Mountaineering history",
          text: "Nanga Parbat has drawn climbers since the early twentieth century, and local people have long worked as guides and porters.",
        },
        {
          title: "Crafts",
          text: "Weaving, embroidery and woodwork are part of everyday heritage. Buy from local makers where you can.",
        },
      ],
    },

    food: {
      intro:
        "Astore's food is simple and warming, made from local produce — bread, dairy, vegetables and dried fruit. Here are four things to look for.",
      items: [
        {
          name: "Village meals",
          text: "Breads, soups and filled dishes, usually shared from the middle of the table.",
          image: FOOD_TABLE,
        },
        {
          name: "Filled flatbread",
          text: "A warm, filling flatbread, good for a long walk.",
          image: FOOD_FLATBREAD,
        },
        {
          name: "Dried fruit",
          text: "Apricots and mulberries are dried in the sun for the long winter.",
          image: FOOD_MULBERRIES,
        },
        {
          name: "Tea",
          text: "Tea is served warm and often — a welcome after a cold morning.",
          image: FOOD_TEA,
        },
      ],
    },

    travelTips: {
      bestTime: [
        { season: "Spring", months: "April – May", text: "Snow still covers the meadows; roads may be closed." },
        { season: "Summer", months: "June – September", text: "The best time to visit — meadows are green and trails are open." },
        { season: "Autumn", months: "September – October", text: "Cold nights and clear skies. The season ends early at altitude." },
        { season: "Winter", months: "November – March", text: "Heavy snow closes roads. Most visitors stay away." },
      ],
      gettingThere: {
        intro: "Astore is reached by road from Gilgit and the Karakoram Highway.",
        steps: [
          "From Gilgit: the Astore road leaves the Karakoram Highway south of Gilgit and climbs into the district.",
          "By air: flights run between Islamabad and Gilgit, but they depend on the weather, so keep your plans flexible.",
          "Roads to Rama and the high meadows can be rough; ask your guide about conditions before you go.",
        ],
      },
      pack: PACK_ESSENTIALS,
      respect: RESPECT_BASICS,
    },

    cta: {
      heading: "Plan your Astore trip",
      text: "Tell us when you want to go and what you love — a local trip planner will shape the journey around you.",
      image: photo(
        "ramalake(2).png",
        "A bright turquoise lake below snow-patched mountains, with the sun low over the water",
        1000,
        667
      ),
    },

    seo: {
      title: "Astore Travel Guide",
      description:
        "Plan a trip to Astore: Rama Lake, alpine meadows and the Rupal face of Nanga Parbat, plus the best time to visit and how to get there.",
      keywords: ["Astore travel guide", "Rama Lake", "Nanga Parbat", "Rupal Valley", "things to do in Astore"],
    },
  },

  /* ----------------------------------------------------------------- Diamer */
  {
    slug: "diamer",
    name: "Diamer",
    shortName: "Diamer",
    tagline: "The Karakoram Highway, ancient rock carvings and the foot of Nanga Parbat.",
    regionLabel: "Gilgit-Baltistan",
    mainTown: "Chilas",
    bestTime: "May – October",
    hero: photo(
      "fairymeadows(2).png",
      "Nanga Parbat's snow ridges under a dramatic sky, with a bird flying overhead",
      2400,
      1350,
      "50% 45%"
    ),
    places: { ids: ["fairy-meadows", "kutwal-lake"] },

    why: {
      intro: [
        "Diamer is the district where the Karakoram Highway enters Gilgit-Baltistan, with the Indus River far below the road. Its main town is Chilas.",
        "It is also the home of Nanga Parbat (8,126 m), the ninth-highest mountain in the world, and of Fairy Meadows, one of the most loved viewpoints in northern Pakistan.",
      ],
      highlights: [
        {
          icon: "mountain",
          title: "Nanga Parbat",
          text: "The “Killer Mountain” rises almost 7,000 metres above the Indus, one of the largest mountain faces on Earth.",
        },
        {
          icon: "blossom",
          title: "Fairy Meadows",
          text: "A green plateau among pine trees, with a full view of Nanga Parbat across the grass.",
        },
        {
          icon: "water",
          title: "Alpine lakes",
          text: "Quiet lakes such as Kutwal reflect the mountains in summer.",
        },
        {
          icon: "culture",
          title: "Ancient rock carvings",
          text: "Thousands of rock carvings and inscriptions near Chilas record centuries of travellers on the old Indus route.",
        },
        {
          icon: "snow",
          title: "A road through the mountains",
          text: "The drive along the Karakoram Highway is one of the great mountain journeys in the world.",
        },
        {
          icon: "hospitality",
          title: "Village welcome",
          text: "Small guesthouses and family homes are a good way to meet people who live here.",
        },
      ],
    },

    traditions: {
      intro:
        "Diamer's traditions are shaped by mountain life and the long road. Many customs are about hospitality and sharing food.",
      image: photo(
        "gallery/community-feast.jpg",
        "People sharing a meal seated on red rugs inside a timber-framed room",
        1000,
        604
      ),
      items: [
        {
          title: "Shared meals",
          text: "Families often eat together from shared dishes, and guests are invited to join.",
        },
        {
          title: "Summer pastures",
          text: "In summer, families move animals up to the high pastures, where the grass is fresh.",
        },
        {
          title: "Music and dance",
          text: "Drums and reed pipes are played at weddings and festivals across Gilgit-Baltistan. Dates vary, so ask locally.",
        },
        {
          title: "Community life",
          text: "Villages are close-knit. Neighbours help one another with harvests, building work and celebrations.",
        },
        {
          title: "Greetings and hospitality",
          text: "A friendly “Assalam-o-Alaikum” is always welcome. Guests are often offered tea.",
        },
      ],
    },

    culture: {
      intro:
        "Diamer has a long history as a crossing place on the Indus. Take your time, ask questions politely, and listen.",
      image: photo(
        "handcraft-markey.png",
        "A small craft shop with hanging woven textiles, baskets and clothing",
        1080,
        1080
      ),
      items: [
        {
          title: "People and language",
          text: "Shina is the main local language. Urdu is understood almost everywhere.",
        },
        {
          title: "Rock carvings",
          text: "Carvings along the Indus near Chilas show animals, people and inscriptions left by travellers over many centuries.",
        },
        {
          title: "A meeting place",
          text: "The Indus valley here has long been a route between the plains and the high Karakoram, and that shows in its history.",
        },
        {
          title: "Crafts",
          text: "Weaving, embroidery and woodwork are part of everyday heritage. Buy from local makers where you can.",
        },
      ],
    },

    food: {
      intro:
        "Diamer's food is hearty and made for hard-working days: bread, dairy, vegetables and meat. Here are four things to look for.",
      items: [
        {
          name: "Home-cooked meals",
          text: "Breads, soups and filled dishes, usually shared from the middle of the table.",
          image: FOOD_TABLE,
        },
        {
          name: "Filled flatbread",
          text: "A warm, filling flatbread, good for a long day on the road.",
          image: FOOD_FLATBREAD,
        },
        {
          name: "Mulberries",
          text: "Sweet berries picked in summer and often dried — a chewy snack for the road.",
          image: FOOD_MULBERRIES,
        },
        {
          name: "Tea",
          text: "Tea is served warm and often — a welcome after a long drive.",
          image: FOOD_TEA,
        },
      ],
    },

    travelTips: {
      bestTime: [
        { season: "Spring", months: "April – May", text: "The lower valley is warm. Fairy Meadows is still snowed in." },
        { season: "Summer", months: "June – September", text: "The best time for Fairy Meadows and Nanga Parbat views. Chilas itself can be very hot." },
        { season: "Autumn", months: "September – October", text: "Cool, clear days. Fairy Meadows closes as snow returns." },
        { season: "Winter", months: "November – March", text: "Heavy snow closes Fairy Meadows and the high trails." },
      ],
      gettingThere: {
        intro: "Diamer is crossed by the Karakoram Highway (KKH), which is also the main way in.",
        steps: [
          "From Islamabad: a long drive on the KKH. Many travellers break the journey with a night at Chilas.",
          "From Gilgit: the road to Chilas follows the Indus; allow half a day with stops.",
          "Fairy Meadows: reached from Raikot Bridge by a rough jeep road, then on foot. Ask your guide about conditions before you go.",
        ],
      },
      pack: PACK_ESSENTIALS,
      respect: RESPECT_BASICS,
    },

    cta: {
      heading: "Plan your Diamer trip",
      text: "Tell us when you want to go and what you love — a local trip planner will shape the journey around you.",
      image: photo(
        "Fairy-meadows.jpg",
        "A rider on a horse beside a still pond that reflects Nanga Parbat and pine trees",
        2400,
        2068
      ),
    },

    seo: {
      title: "Diamer Travel Guide",
      description:
        "Plan a trip to Diamer: Fairy Meadows, Nanga Parbat, Kutwal Lake and the Karakoram Highway, plus the best time to visit and how to get there.",
      keywords: ["Diamer travel guide", "Fairy Meadows", "Nanga Parbat", "Chilas", "Karakoram Highway"],
    },
  },

  /* ----------------------------------------------------------------- Gilgit */
  {
    slug: "gilgit",
    name: "Gilgit",
    shortName: "Gilgit",
    tagline: "The crossroads of the north: a lively town, Naltar's lakes and every road onward.",
    regionLabel: "Gilgit-Baltistan",
    mainTown: "Gilgit",
    bestTime: "April – October",
    hero: photo(
      "nalter(3).png",
      "A clear lake reflecting snow-dusted mountains and yellow-green shallows in Naltar",
      1200,
      720,
      "50% 50%"
    ),
    places: { ids: ["naltar-valley"] },

    why: {
      intro: [
        "Gilgit is the main town of Gilgit-Baltistan, set where several rivers and roads meet. Almost every journey into the north passes through it, so it makes a practical and interesting base.",
        "The town has bazaars, old mosques and a friendly pace, and Naltar Valley with its coloured lakes is a short drive away.",
      ],
      highlights: [
        {
          icon: "culture",
          title: "A living town",
          text: "Gilgit's bazaars are busy and varied — a good place to see everyday life in the north.",
        },
        {
          icon: "mountain",
          title: "A base for everywhere",
          text: "Roads lead from Gilgit to Hunza, Skardu, Ghizer, Astore and Diamer.",
        },
        {
          icon: "water",
          title: "Naltar's lakes",
          text: "Naltar Valley is known for its coloured lakes and pine forests.",
        },
        {
          icon: "snow",
          title: "Winter sports",
          text: "Naltar has a ski slope and is one of the few places in the country where visitors can ski.",
        },
        {
          icon: "fort",
          title: "Old traces",
          text: "Buddhist rock carvings and old forts around Gilgit show how long travellers have passed through here.",
        },
        {
          icon: "hospitality",
          title: "Warm welcome",
          text: "Hotels and guesthouses in Gilgit are used to visitors, and people are glad to help.",
        },
      ],
    },

    traditions: {
      intro:
        "Gilgit's traditions mix the customs of several valleys. Many are about music, sport and gathering together.",
      image: photo(
        "sword-dance.png",
        "Dancers in red, yellow and green coats performing in front of a crowd",
        1844,
        1112
      ),
      items: [
        {
          title: "Festival season",
          text: "Gilgit hosts the Gilgit-Baltistan Cultural Festival, with dance, music, crafts and food from across the region.",
        },
        {
          title: "Music and dance",
          text: "Drums and reed pipes are played at weddings and festivals across Gilgit-Baltistan.",
        },
        {
          title: "Polo",
          text: "Polo is a favourite sport across the region, played on horseback with great speed and noise.",
        },
        {
          title: "Community life",
          text: "Neighbourhoods are close-knit, and families help one another with celebrations.",
        },
        {
          title: "Greetings and hospitality",
          text: "A friendly “Assalam-o-Alaikum” is always welcome. Guests are often offered tea.",
        },
      ],
    },

    culture: {
      intro:
        "Gilgit brings together people from many valleys, so you will hear several languages in the bazaar. Take your time, ask politely, and listen.",
      image: photo(
        "gallery/perf-musicians.jpg",
        "Two musicians sitting on a rug in a green meadow, one playing a large drum",
        935,
        422
      ),
      items: [
        {
          title: "People and languages",
          text: "Shina is the main local language, and you will also hear Burushaski, Khowar, Wakhi and others. Urdu is understood everywhere.",
        },
        {
          title: "Crossroads history",
          text: "Gilgit has long been a stop on routes between the plains, Central Asia and Tibet. Ancient Buddhist manuscripts were found near the town.",
        },
        {
          title: "Bazaars",
          text: "The old bazaar is a good place to find dried fruit, woollen hats and local crafts.",
        },
        {
          title: "Crafts",
          text: "Weaving, embroidery and woodwork are part of everyday heritage. Buy from local makers where you can.",
        },
      ],
    },

    food: {
      intro:
        "Gilgit's food comes from many valleys: bread, soups, dumplings and dried fruit. Here are four things to look for.",
      items: [
        {
          name: "Bazaar and home meals",
          text: "Breads, soups and filled dishes, usually shared from the middle of the table.",
          image: FOOD_TABLE,
        },
        {
          name: "Filled flatbread",
          text: "A warm, filling flatbread, good for a long day on the road.",
          image: FOOD_FLATBREAD,
        },
        {
          name: "Dried fruit",
          text: "Apricots and mulberries are sold dried in the bazaar — good snacks for the road.",
          image: FOOD_APRICOTS,
        },
        {
          name: "Tea",
          text: "Tea is served warm and often. Accept a cup and you will usually find a conversation to go with it.",
          image: FOOD_TEA,
        },
      ],
    },

    travelTips: {
      bestTime: [
        { season: "Spring", months: "March – May", text: "Mild and green; a good time to travel before the summer crowds." },
        { season: "Summer", months: "June – September", text: "Warm days in town, cooler in Naltar and the side valleys." },
        { season: "Autumn", months: "September – October", text: "Clear skies and golden leaves — often the best weather." },
        { season: "Winter", months: "December – February", text: "Cold in town; Naltar has snow and a ski slope." },
      ],
      gettingThere: {
        intro: "Gilgit is on the Karakoram Highway (KKH) and has its own airport.",
        steps: [
          "By road: from Islamabad, a long journey on the KKH; many travellers break it with a night at Chilas.",
          "By air: flights run between Islamabad and Gilgit, but they depend on the weather, so keep your plans flexible.",
          "Naltar: a rough road leads up from the Gilgit area; ask your guide about conditions before you go.",
        ],
      },
      pack: PACK_ESSENTIALS,
      respect: RESPECT_BASICS,
    },

    cta: {
      heading: "Plan your Gilgit trip",
      text: "Tell us when you want to go and what you love — a local trip planner will shape the journey around you.",
      image: photo("nalter(2).png", "Tall pine trees in a quiet forest in Naltar", 1200, 800),
    },

    seo: {
      title: "Gilgit Travel Guide",
      description:
        "Plan a trip to Gilgit: the town, the bazaars, Naltar Valley's lakes and the Gilgit-Baltistan Cultural Festival, plus the best time to visit and how to get there.",
      keywords: ["Gilgit travel guide", "Naltar Valley", "things to do in Gilgit", "Gilgit-Baltistan Cultural Festival"],
    },
  },
];
