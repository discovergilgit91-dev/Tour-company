export type FamousForItem = { title: string; text: string };
export type GalleryTile = { tag: string; caption: string; from: string; to: string };

export type DestinationDetailContent = {
  tagline: string;
  intro: string;
  highlights: string[];
  famousFor: FamousForItem[];
  bestTime: string;
  howToReach: string;
  quote: string;
  quoteAuthor: string;
  gallery: GalleryTile[];
};

export const DESTINATION_DETAILS: Record<string, DestinationDetailContent> = {
  karimabad: {
    tagline: "The heart of Hunza, where orchards meet the sky",
    intro:
      "Karimabad is Hunza's capital and cultural heart, stacked up steep terraced slopes with Baltit Fort watching over its rooftops. Rakaposhi, Ultar Sar, and Lady Finger Peak frame nearly every view, and the whole town moves at the pace of orchard life — unhurried, sociable, and proud of where it sits.",
    highlights: [
      "Panoramic views of Rakaposhi and Ultar Sar from almost every street",
      "Baltit Fort towers directly above the old town",
      "Terraced apricot and cherry orchards turn the valley pink and white every spring",
      "A walkable old town with family-run cafés, craft shops, and guesthouses",
    ],
    famousFor: [
      {
        title: "Apricot & Mulberry Orchards",
        text: "Hunza's dried apricots and mulberries are sold fresh from the tree in summer and dried for the rest of the year — a local staple and the valley's most famous export.",
      },
      {
        title: "Baltit Fort's Architecture",
        text: "A 700-year Tibetan-influenced fort with timber balconies and a watchtower view that still frames the whole valley the way it did for the Mirs of Hunza.",
      },
      {
        title: "Hunza Bread & Apricot Soup",
        text: "Thick wholewheat chapati served with walnut-apricot oil and a warming apricot soup called harissa — the valley's signature home-cooked meal.",
      },
    ],
    bestTime: "March–May for blossom season, September–October for golden autumn orchards",
    howToReach: "About 2.5 hours by road from Gilgit, or roughly 10–12 hours from Islamabad along the Karakoram Highway.",
    quote: "Karimabad felt like stepping into a painting — every rooftop had orchards, every corner had a view of Rakaposhi.",
    quoteAuthor: "A traveler from Lahore",
    gallery: [
      { tag: "Old Town", caption: "Terraced streets of Karimabad", from: "from-green-dark", to: "to-night" },
      { tag: "Baltit Fort", caption: "The fort above the rooftops", from: "from-amber-700/40", to: "to-night" },
      { tag: "Orchards", caption: "Blossom season in the valley", from: "from-rose-400/30", to: "to-forest" },
      { tag: "Sunset", caption: "Rakaposhi at golden hour", from: "from-orange-500/30", to: "to-night" },
    ],
  },

  "baltit-fort": {
    tagline: "700 years above the valley the Mirs once ruled",
    intro:
      "Baltit Fort has watched over Karimabad since the 8th century, rebuilt and expanded over generations into the Tibetan-Balti hybrid structure that stands today. Restored with support from the Aga Khan Trust for Culture, it's now Hunza's best-preserved monument and its single best viewpoint.",
    highlights: [
      "Original wood-and-stone architecture blending Tibetan and Balti styles",
      "Restored royal chambers, audience hall, and watchtower open to visitors",
      "The single best panoramic view over Karimabad and the Hunza River",
      "A short, steep walk up from the old town bazaar",
    ],
    famousFor: [
      {
        title: "Living Royal History",
        text: "Home to the Mirs of Hunza for over 700 years before the family moved to a newer palace below — the fort still holds their furniture, weapons, and family portraits.",
      },
      {
        title: "Restoration Craftsmanship",
        text: "One of the most carefully restored heritage buildings in Pakistan, using the same timber-lacing construction technique the original builders used.",
      },
      {
        title: "The View from the Watchtower",
        text: "A single vantage point that takes in Rakaposhi, Ultar Sar, and the full terraced sweep of Karimabad below.",
      },
    ],
    bestTime: "Year-round; clearest mountain views in autumn (September–November)",
    howToReach: "A 10–15 minute uphill walk from central Karimabad, or a short drive to the fort's parking area.",
    quote: "Standing on the watchtower, you understand immediately why the Mirs chose this exact spot.",
    quoteAuthor: "A visitor from Karachi",
    gallery: [
      { tag: "Facade", caption: "Baltit Fort's timber balconies", from: "from-amber-700/40", to: "to-night" },
      { tag: "Interior", caption: "The restored royal chambers", from: "from-forest", to: "to-night" },
      { tag: "Watchtower", caption: "View over Karimabad", from: "from-green-dark", to: "to-forest" },
      { tag: "Approach", caption: "The climb up from the bazaar", from: "from-stone-500/30", to: "to-night" },
    ],
  },

  "altit-fort": {
    tagline: "Hunza's oldest monument, cut into the cliff",
    intro:
      "Predating Baltit Fort by several centuries, Altit Fort sits on a sheer rock face above the Hunza River — the original seat of power before the Mirs relocated to Baltit. Its cliffside watchtower and royal garden below make it one of the most dramatically sited buildings in the Karakoram.",
    highlights: [
      "The oldest surviving monument in Hunza, dating to the 11th century",
      "Built directly onto a cliff edge above the Hunza River gorge",
      "A restored royal garden and traditional village (Altit Khun) surrounding it",
      "Fewer crowds than Baltit Fort, with an equally striking setting",
    ],
    famousFor: [
      {
        title: "Cliffside Engineering",
        text: "The fort's watchtower was built directly onto exposed rock, engineered centuries before modern tools existed to survive earthquakes and river erosion below.",
      },
      {
        title: "Altit Khun Village",
        text: "The traditional settlement around the fort has been restored alongside it, with stone alleyways, a mosque, and artisan workshops still in daily use.",
      },
      {
        title: "The Royal Garden",
       text: "A terraced garden below the fort, replanted with the same fruit trees and irrigation channels the original royal household would have used.",
      },
    ],
    bestTime: "April–October for garden bloom and clear cliffside views",
    howToReach: "About 15 minutes by road from Karimabad, in the village of Altit.",
    quote: "The oldest monument in Hunza, perched on a sheer cliff above the river since the 11th century.",
    quoteAuthor: "Local heritage guide",
    gallery: [
      { tag: "Cliffside", caption: "Altit Fort above the gorge", from: "from-stone-600/40", to: "to-night" },
      { tag: "Village", caption: "Altit Khun's stone lanes", from: "from-amber-800/30", to: "to-forest" },
      { tag: "Garden", caption: "The restored royal garden", from: "from-green-dark", to: "to-night" },
      { tag: "River", caption: "The Hunza River gorge below", from: "from-sky-700/30", to: "to-night" },
    ],
  },

  "attabad-lake": {
    tagline: "A turquoise lake born from disaster, now Hunza's icon",
    intro:
      "In January 2010, a massive landslide dammed the Hunza River and, over several months, flooded the valley to form Attabad Lake — submerging a stretch of the Karakoram Highway. What began as a natural disaster is now one of the most photographed lakes in Pakistan, its glacial-blue water framed by bare rock cliffs.",
    highlights: [
      "Brilliant turquoise-blue water against stark mountain cliffs",
      "Boat rides across the lake, with the old submerged highway visible below in places",
      "Lakeside cafés and viewpoints built since the highway was rerouted",
      "A dramatic, relatively recent geological story you can see the evidence of",
    ],
    famousFor: [
      {
        title: "Its Improbable Colour",
        text: "Mineral sediment gives the water a turquoise-to-cobalt gradient that shifts through the day — the reason it's become Hunza's most-photographed spot.",
      },
      {
        title: "Boat Crossings",
        text: "Traditional and speed boats ferry visitors across the water, past cliffs that were dry valley floor before 2010.",
      },
      {
        title: "Trout & Lakeside Grills",
        text: "Small lakeside stalls grill fresh trout and serve tea with a view that didn't exist fifteen years ago.",
      },
    ],
    bestTime: "May–October, when the water is calmest and the sky is clearest",
    howToReach: "About 1.5–2 hours north of Karimabad along the Karakoram Highway, just past Hussaini.",
    quote: "A brilliant turquoise lake born from a 2010 landslide, now crossed by boat beneath the Karakoram Highway.",
    quoteAuthor: "Discover Gilgit guide notes",
    gallery: [
      { tag: "Turquoise Water", caption: "Attabad's signature colour", from: "from-cyan-500/30", to: "to-night" },
      { tag: "Boat Crossing", caption: "Crossing by traditional boat", from: "from-sky-600/30", to: "to-forest" },
      { tag: "Cliffs", caption: "Bare rock walls around the lake", from: "from-stone-600/30", to: "to-night" },
      { tag: "Highway", caption: "The rerouted Karakoram Highway", from: "from-green-dark", to: "to-night" },
    ],
  },

  "passu-cones": {
    tagline: "The jagged skyline every Hunza photo is chasing",
    intro:
      "The Passu Cones — locally called Tupopdan — rise in a row of serrated rock spires directly above the Karakoram Highway, one of the most recognisable skylines in northern Pakistan. Below them, the Passu glacier and suspension bridges over the Hunza River complete one of the valley's most photogenic stretches.",
    highlights: [
      "A jagged cathedral-peak skyline visible directly from the highway",
      "The Hussaini suspension bridge nearby, one of the most photographed in Pakistan",
      "Passu glacier and its milky meltwater braided across the valley floor",
      "Golden-hour light that turns the cones amber and pink",
    ],
    famousFor: [
      {
        title: "The Passu Skyline",
        text: "Locally called Tupopdan ('mountain of fire'), the cones' serrated silhouette is one of the most reproduced mountain images from northern Pakistan.",
      },
      {
        title: "Suspension Bridge Crossings",
        text: "Wooden-plank bridges strung across the Hunza River nearby give a heart-in-throat photo opportunity with the cones as backdrop.",
      },
      {
        title: "Passu Glacier Views",
        text: "A short walk from the highway brings you to clear views of the glacier's tongue and meltwater braiding across the valley.",
      },
    ],
    bestTime: "April–October, with the clearest peak visibility in early morning light",
    howToReach: "About 1.5 hours north of Karimabad along the Karakoram Highway, near Passu village.",
    quote: "Jagged cathedral peaks rising straight from the valley floor — one of the most photographed skylines in the north.",
    quoteAuthor: "Discover Gilgit guide notes",
    gallery: [
      { tag: "Skyline", caption: "The Passu Cones at dawn", from: "from-orange-600/30", to: "to-night" },
      { tag: "Suspension Bridge", caption: "Crossing above the Hunza River", from: "from-amber-700/30", to: "to-forest" },
      { tag: "Glacier", caption: "Passu glacier's meltwater braids", from: "from-sky-700/30", to: "to-night" },
      { tag: "Golden Hour", caption: "Cones lit amber at sunset", from: "from-rose-500/30", to: "to-night" },
    ],
  },

  "khunjerab-pass": {
    tagline: "The highest paved border on Earth",
    intro:
      "Khunjerab Pass sits at 4,700 metres on the China–Pakistan border, the highest paved international crossing in the world. The drive up from Hunza climbs through Khunjerab National Park, home to snow leopards, Marco Polo sheep, and ibex, along one of the most spectacular stretches of the Karakoram Highway.",
    highlights: [
      "The highest paved border crossing in the world, at 4,700 metres",
      "Khunjerab National Park's high-altitude wildlife along the drive",
      "Dramatic, treeless high-altitude scenery unlike anywhere else on the route",
      "The literal end of the Karakoram Highway on the Pakistani side",
    ],
    famousFor: [
      {
        title: "Record-Setting Altitude",
        text: "At 4,700 m, it's the highest paved international border crossing anywhere on Earth — a genuine bucket-list marker for overland travellers.",
      },
      {
        title: "Rare High-Altitude Wildlife",
        text: "Khunjerab National Park protects snow leopards, Marco Polo sheep, and Himalayan ibex, occasionally visible from the road in early morning or evening.",
      },
      {
        title: "The Karakoram Highway's Summit",
        text: "The final, most dramatic stretch of the highway that connects Pakistan to China — barren, high, and completely unlike the green valleys below.",
      },
    ],
    bestTime: "May–September, when the pass is open and free of heavy snow",
    howToReach: "About 2 hours north of Sost along the Karakoram Highway, roughly 4–5 hours from Karimabad.",
    quote: "The highest paved border crossing in the world, where the Karakoram Highway meets China at 4,700 metres.",
    quoteAuthor: "Discover Gilgit guide notes",
    gallery: [
      { tag: "The Pass", caption: "4,700 metres at the border gate", from: "from-slate-500/30", to: "to-night" },
      { tag: "Wildlife", caption: "Ibex on the high slopes", from: "from-stone-600/30", to: "to-forest" },
      { tag: "Highway", caption: "The final stretch of the KKH", from: "from-sky-800/30", to: "to-night" },
      { tag: "High Altitude", caption: "Barren peaks above the pass", from: "from-gray-500/30", to: "to-night" },
    ],
  },

  "borith-lake": {
    tagline: "A still saline lake above the highway's noise",
    intro:
      "A short climb above Hussaini, Borith Lake is a quiet saline lake ringed by willow and sea buckthorn, with the Passu glaciers visible on the horizon. It's one of the few genuinely peaceful spots in a valley that draws crowds for its highway-side views.",
    highlights: [
      "A quiet, rarely crowded alternative to the busier highway viewpoints",
      "Willow and sea buckthorn shoreline that turns gold in autumn",
      "Clear views up to the Passu glaciers from the lakeshore",
      "Simple guesthouses right on the water for an overnight stay",
    ],
    famousFor: [
      {
        title: "Migratory Birdlife",
        text: "The lake's reeds and shoreline attract migratory birds in spring and autumn, making it a quiet spot for birdwatching away from the highway.",
      },
      {
        title: "Sea Buckthorn Harvest",
        text: "The bright orange sea buckthorn berries that ring the lake are harvested locally for juice, valued for their tartness and vitamin content.",
      },
      {
        title: "Glacier Views at Sunset",
        text: "Late afternoon light on the Passu glaciers, reflected in the lake's still water, is one of the valley's quieter photography rewards.",
      },
    ],
    bestTime: "May–October, with autumn colour along the shoreline in September–October",
    howToReach: "A 20–30 minute drive up a side road from Hussaini, off the Karakoram Highway.",
    quote: "A saline lake above Hussaini, ringed by willow and sea buckthorn, with views up to the Passu glaciers.",
    quoteAuthor: "Discover Gilgit guide notes",
    gallery: [
      { tag: "Lakeshore", caption: "Willow-lined water's edge", from: "from-green-dark", to: "to-night" },
      { tag: "Reflections", caption: "Passu glaciers mirrored at dusk", from: "from-sky-700/30", to: "to-forest" },
      { tag: "Autumn", caption: "Sea buckthorn in October", from: "from-orange-500/30", to: "to-night" },
      { tag: "Stillness", caption: "Early morning on the lake", from: "from-slate-500/30", to: "to-night" },
    ],
  },

  "shimshal-valley": {
    tagline: "The Karakoram's most remote community",
    intro:
      "Reached by a single cliffside road carved above the Shimshal River, Shimshal is one of the most remote and self-sufficient settlements in the Karakoram — a farming and mountaineering community that has produced some of Pakistan's most respected high-altitude guides.",
    highlights: [
      "A dramatic cliffside access road, one of the most spectacular drives in the region",
      "A close-knit farming community known for producing elite mountaineers",
      "Access to remote trekking routes toward Shimshal Pass and beyond",
      "A genuine, unhurried village life far from the main highway",
    ],
    famousFor: [
      {
        title: "A Mountaineering Legacy",
        text: "Shimshal has produced some of Pakistan's most decorated high-altitude porters and guides, several of whom have summited K2 and other 8,000-metre peaks.",
      },
      {
        title: "The Cliffside Access Road",
        text: "Completed in 2003, the single-lane road into the valley is carved directly into cliff faces above the Shimshal River — a landmark feat of local engineering.",
      },
      {
        title: "Yak Herding & High Pastures",
        text: "Shimshali families still move livestock to high summer pastures each year, a tradition central to the valley's self-sufficient way of life.",
      },
    ],
    bestTime: "June–September, when the access road and high pastures are clear",
    howToReach: "A 2–3 hour drive from the Karakoram Highway near Passu, along a dedicated cliffside access road.",
    quote: "One of the most remote settlements in the Karakoram, reached by a cliffside road above the Shimshal River.",
    quoteAuthor: "Discover Gilgit guide notes",
    gallery: [
      { tag: "The Road", caption: "The cliffside route into Shimshal", from: "from-stone-600/40", to: "to-night" },
      { tag: "Village", caption: "Shimshal's farming settlement", from: "from-amber-700/30", to: "to-forest" },
      { tag: "High Pasture", caption: "Yaks on summer grazing land", from: "from-green-dark", to: "to-night" },
      { tag: "River Valley", caption: "The Shimshal River below", from: "from-sky-700/30", to: "to-night" },
    ],
  },

  "rakaposhi-base-camp": {
    tagline: "A trek to the foot of one of the world's most dramatic peaks",
    intro:
      "The trek to Rakaposhi Base Camp climbs through pine forest and high pasture to the foot of a 7,788-metre peak that rises with almost no foothills — one of the most dramatic vertical rises of any mountain on Earth, visible the entire way up.",
    highlights: [
      "One of the most complete vertical rises of any mountain in the world",
      "A moderate trek through pine forest into open high pasture",
      "Close-up glacier and icefall views near base camp",
      "Clear sightlines to Rakaposhi for almost the entire route",
    ],
    famousFor: [
      {
        title: "Rakaposhi's Unbroken Rise",
        text: "From base to summit, Rakaposhi rises nearly 5,900 metres with no major intervening peaks — one of the greatest continuous vertical rises of any mountain on Earth.",
      },
      {
        title: "Accessible High-Altitude Trekking",
        text: "Unlike many Karakoram base camps, Rakaposhi's is reachable in a comfortable day or two, making serious high-altitude scenery accessible to moderately fit trekkers.",
      },
      {
        title: "Glacier & Icefall Views",
        text: "The final approach to base camp brings you close enough to hear the glacier move — a dramatic reward for a manageable trek.",
      },
    ],
    bestTime: "June–September, when the high pasture trail is clear of snow",
    howToReach: "Trailhead is about 1 hour from Karimabad near Ghulmet village, on the Nagar side of the valley.",
    quote: "A trek through pine forest and high pasture to the foot of Rakaposhi, one of the world's most dramatic peaks.",
    quoteAuthor: "Discover Gilgit guide notes",
    gallery: [
      { tag: "Trailhead", caption: "Pine forest above Ghulmet", from: "from-green-dark", to: "to-night" },
      { tag: "High Pasture", caption: "Open grazing land en route", from: "from-lime-700/30", to: "to-forest" },
      { tag: "Base Camp", caption: "Rakaposhi's icefall up close", from: "from-slate-500/30", to: "to-night" },
      { tag: "Summit View", caption: "Rakaposhi's near-unbroken rise", from: "from-sky-700/30", to: "to-night" },
    ],
  },

  "hopar-glacier": {
    tagline: "A glacier you can reach on foot from the village",
    intro:
      "Hopar Glacier sits within walking distance of Nagar's villages, framed by Diran Peak and Spantik on either side — one of the most accessible glaciers in the Karakoram, without requiring a multi-day trek to reach it.",
    highlights: [
      "A glacier reachable on foot directly from village guesthouses",
      "Diran Peak and Spantik framing the valley on either side",
      "Traditional Nagar village life along the approach",
      "A good introduction to glacier landscapes without a long trek",
    ],
    famousFor: [
      {
        title: "Walk-In Access",
        text: "Unlike most Karakoram glaciers, Hopar is close enough to reach on a half-day walk from the village — a rare, low-effort way to stand on moving ice.",
      },
      {
        title: "Framed by Twin Peaks",
        text: "Diran Peak (7,266 m) and Spantik (7,027 m) rise on either side of the glacier, giving it one of the most dramatic settings of any easily reached ice field in the region.",
      },
      {
        title: "Traditional Nagar Village Life",
        text: "The approach passes through stone-built Nagar villages largely unchanged by tourism, offering a genuine glimpse of daily mountain life.",
      },
    ],
    bestTime: "May–October, avoiding the coldest winter months",
    howToReach: "About 1.5 hours from Karimabad via the Nagar road, then a short walk from the village.",
    quote: "A glacier valley within walking distance of the village, framed by Diran and Spantik on either side.",
    quoteAuthor: "Discover Gilgit guide notes",
    gallery: [
      { tag: "Glacier Ice", caption: "Hopar's accessible ice field", from: "from-sky-700/30", to: "to-night" },
      { tag: "Diran Peak", caption: "Diran rising above the valley", from: "from-slate-600/30", to: "to-forest" },
      { tag: "Village", caption: "Traditional Nagar stone houses", from: "from-amber-700/30", to: "to-night" },
      { tag: "Approach", caption: "The walk-in trail to the glacier", from: "from-green-dark", to: "to-night" },
    ],
  },

  "rush-lake": {
    tagline: "One of the highest alpine lakes on Earth",
    intro:
      "Rush Lake sits at nearly 4,700 metres above Nagar's glaciers, reached by a genuinely high-altitude trek — one of the highest alpine lakes anywhere in the world, and a serious reward for those willing to earn the climb.",
    highlights: [
      "One of the highest alpine lakes in the world at nearly 4,700 m",
      "360-degree views of Rakaposhi, Diran, Spantik, and Miar peaks from camp",
      "A genuine high-altitude trek requiring proper acclimatisation",
      "Rarely crowded compared to lower-altitude lake treks",
    ],
    famousFor: [
      {
        title: "Extreme Altitude",
        text: "At close to 4,700 metres, Rush Lake ranks among the highest alpine lakes on the planet — a serious achievement for trekkers who reach its shore.",
      },
      {
        title: "A 360° Peak Panorama",
        text: "Camp beside the lake puts Rakaposhi, Diran, Spantik, and Miar all in view at once — one of the most complete mountain panoramas accessible by trek in the Karakoram.",
      },
      {
        title: "Genuine Wilderness",
        text: "Far fewer trekkers make the climb here than to lower lakes, so the route and campsite stay quiet even in peak season.",
      },
    ],
    bestTime: "July–September, the only window when the high trail is reliably clear",
    howToReach: "A 2–3 day trek from Nagar's Miar or Hopar villages, requiring a guide and proper altitude acclimatisation.",
    quote: "One of the highest alpine lakes in the world, reached by a high-altitude trek above Nagar's glaciers.",
    quoteAuthor: "Discover Gilgit guide notes",
    gallery: [
      { tag: "The Lake", caption: "Rush Lake at nearly 4,700 m", from: "from-sky-800/30", to: "to-night" },
      { tag: "Peak Panorama", caption: "Rakaposhi and Diran from camp", from: "from-slate-600/30", to: "to-forest" },
      { tag: "High Trail", caption: "The climb above Nagar's glaciers", from: "from-stone-600/30", to: "to-night" },
      { tag: "Camp", caption: "Sunrise at the lakeside camp", from: "from-orange-500/30", to: "to-night" },
    ],
  },

  "minapin-glacier": {
    tagline: "A classic Karakoram trailhead beneath Diran Peak",
    intro:
      "Minapin is one of the Karakoram's classic trekking trailheads, a glacier valley with Diran Peak rising directly above the ice — the starting point for both day walks and longer expeditions into Nagar's high country.",
    highlights: [
      "Diran Peak rising directly above the glacier's ice field",
      "A well-established trailhead used by both trekkers and mountaineers",
      "Forest and pasture approach before the glacier itself",
      "A base for longer treks toward Diran base camp",
    ],
    famousFor: [
      {
        title: "Diran Peak's Direct Backdrop",
        text: "Few glacier walks put you this close to a 7,000-metre peak with so little approach — Diran rises almost directly from the Minapin ice field.",
      },
      {
        title: "A Mountaineering Gateway",
        text: "Minapin is the standard approach route for expeditions attempting Diran Peak, so the trail sees a mix of day trekkers and serious climbers.",
      },
      {
        title: "Forest-to-Ice Transition",
        text: "The walk moves from pine forest to high pasture to bare glacier in a single day — a compact tour of Karakoram ecosystems.",
      },
    ],
    bestTime: "June–September for the clearest trail and glacier conditions",
    howToReach: "About 1.5 hours from Karimabad via the Nagar road to Minapin village, then on foot.",
    quote: "A classic trailhead into the Karakoram, with Diran Peak rising directly above the ice.",
    quoteAuthor: "Discover Gilgit guide notes",
    gallery: [
      { tag: "Glacier", caption: "Minapin's ice field", from: "from-sky-700/30", to: "to-night" },
      { tag: "Diran Peak", caption: "Diran rising above the trail", from: "from-slate-600/30", to: "to-forest" },
      { tag: "Forest Trail", caption: "Pine forest on the approach", from: "from-green-dark", to: "to-night" },
      { tag: "High Pasture", caption: "Open ground before the ice", from: "from-lime-700/30", to: "to-night" },
    ],
  },

  "ghizer-valley": {
    tagline: "Turquoise rivers and quiet mountain villages",
    intro:
      "Ghizer is one of the north's least-crowded valleys, a peaceful landscape of turquoise rivers, mountain villages, and quiet farmland shaped by the waters flowing down from Shandur and beyond — a genuine, unhurried alternative to the busier Hunza road.",
    highlights: [
      "Turquoise rivers running through open farmland",
      "A quieter, less-visited alternative to Hunza's main tourist route",
      "Traditional villages with a distinct local Khowar and Shina culture",
      "A gateway toward Yasin, Phander, and the Shandur plateau",
    ],
    famousFor: [
      {
        title: "The Ghizer River's Colour",
        text: "Glacial melt gives the Ghizer River a striking turquoise tone that runs the length of the valley, visible from the road for much of the drive.",
      },
      {
        title: "Local Music & Culture",
        text: "Ghizer's villages retain a strong local musical tradition, particularly around the rubab and the region's distinct folk songs.",
      },
      {
        title: "Trout Fishing",
        text: "The valley's cold rivers are known locally for trout, a common feature of small roadside eateries along the route.",
      },
    ],
    bestTime: "May–September for open roads and full river flow",
    howToReach: "About 2–3 hours by road from Gilgit, heading northwest along the Ghizer River.",
    quote:
      "A peaceful landscape of turquoise rivers, mountain villages, and quiet valleys shaped by the waters of the north.",
    quoteAuthor: "Discover Gilgit guide notes",
    gallery: [
      { tag: "River", caption: "The turquoise Ghizer River", from: "from-cyan-600/30", to: "to-night" },
      { tag: "Farmland", caption: "Open valley farmland", from: "from-green-dark", to: "to-forest" },
      { tag: "Village", caption: "A quiet Ghizer settlement", from: "from-amber-700/30", to: "to-night" },
      { tag: "Mountains", caption: "Peaks framing the valley road", from: "from-slate-600/30", to: "to-night" },
    ],
  },

  "yasin-valley": {
    tagline: "A secluded valley of fields, forts, and folklore",
    intro:
      "Yasin is one of the north's most secluded valleys, a landscape of green fields, traditional villages, and dramatic mountain scenery, historically significant as a centre of the Burushaski and Khowar-speaking communities and their oral folklore.",
    highlights: [
      "A secluded, rarely-visited valley away from the main tourist routes",
      "Green terraced fields set against dramatic peaks",
      "A centre of local Burushaski and Khowar cultural traditions",
      "Traditional villages largely untouched by mass tourism",
    ],
    famousFor: [
      {
        title: "Oral Folklore & Legend",
        text: "Yasin is known locally for its rich oral storytelling tradition, including legends tied to its forts and mountain passes passed down through generations.",
      },
      {
        title: "Terraced Farming",
        text: "The valley floor is intensively terraced for wheat and potatoes, a farming pattern that shapes the whole landscape you see from the road.",
      },
      {
        title: "A Gateway to Remote Passes",
        text: "Yasin connects toward several high, rarely-crossed passes into Chitral and Ghizer, historically used by traders and herders.",
      },
    ],
    bestTime: "May–September, when the high routes connecting the valley are open",
    howToReach: "About 3–4 hours by road from Gilgit, via the Ghizer valley road.",
    quote: "A secluded valley of green fields, traditional villages, and dramatic mountain scenery.",
    quoteAuthor: "Discover Gilgit guide notes",
    gallery: [
      { tag: "Fields", caption: "Terraced farmland in Yasin", from: "from-lime-700/30", to: "to-night" },
      { tag: "Village", caption: "A traditional Yasin settlement", from: "from-amber-700/30", to: "to-forest" },
      { tag: "Mountains", caption: "Peaks above the valley floor", from: "from-slate-600/30", to: "to-night" },
      { tag: "River", caption: "The Yasin valley's waterway", from: "from-sky-700/30", to: "to-night" },
    ],
  },

  "phander-valley": {
    tagline: "A hidden valley of lakes and orchards",
    intro:
      "Tucked into Ghizer, Phander is a hidden valley of lakes and orchards where still turquoise water sits beneath quiet peaks — often called one of the most underrated landscapes in the north, with none of the crowds of Hunza or Skardu.",
    highlights: [
      "Still, mirror-like lakes framed by orchards and quiet peaks",
      "One of the least-visited scenic valleys in Gilgit-Baltistan",
      "A working agricultural valley with orchards alongside the water",
      "Excellent, uncrowded photography and picnic spots",
    ],
    famousFor: [
      {
        title: "Mirror-Still Lakes",
        text: "Phander's lakes are known for near-perfect stillness in calm weather, reflecting the surrounding peaks and orchards almost without distortion.",
      },
      {
        title: "Orchard Harvests",
        text: "Apple and apricot orchards line the valley, with local produce sold fresh at small roadside stalls in late summer.",
      },
      {
        title: "Uncrowded Scenery",
        text: "Despite scenery that rivals better-known valleys, Phander sees a fraction of the visitors — a genuine quiet-travel destination.",
      },
    ],
    bestTime: "June–September for orchard harvest and calm lake conditions",
    howToReach: "About 3.5 hours by road from Gilgit, past Gupis along the Ghizer valley road.",
    quote: "A hidden valley of lakes and orchards in Ghizer, where still turquoise water sits beneath quiet peaks.",
    quoteAuthor: "Discover Gilgit guide notes",
    gallery: [
      { tag: "Lake", caption: "Phander's still turquoise water", from: "from-cyan-600/30", to: "to-night" },
      { tag: "Orchards", caption: "Fruit trees along the shore", from: "from-lime-700/30", to: "to-forest" },
      { tag: "Reflections", caption: "Peaks mirrored on the lake", from: "from-sky-700/30", to: "to-night" },
      { tag: "Valley Floor", caption: "Phander's quiet farmland", from: "from-green-dark", to: "to-night" },
    ],
  },

  "naltar-valley": {
    tagline: "Pine forest and a chain of colourful alpine lakes",
    intro:
      "Naltar's pine forests and chain of colourful alpine lakes make it one of the north's most vivid landscapes, changing character dramatically by season — deep green in summer, gold in autumn, and snow-bound for a ski season each winter.",
    highlights: [
      "A chain of small, differently-coloured alpine lakes within a short walk of each other",
      "Dense pine forest that shifts colour dramatically with the seasons",
      "Pakistan's only ski resort, active in winter months",
      "One of the most accessible high-altitude landscapes from Gilgit",
    ],
    famousFor: [
      {
        title: "The Colourful Lakes",
        text: "Naltar's lakes each carry a distinct mineral-influenced hue — from deep green to near-turquoise — earning the valley its 'rainbow lakes' nickname locally.",
      },
      {
        title: "Winter Skiing",
        text: "Naltar is home to Pakistan's main ski slope and a winter sports training centre, drawing skiers when much of the north is snowbound.",
      },
      {
        title: "Seasonal Colour Change",
        text: "The valley's pine forest turns from deep summer green to gold in autumn, making Naltar a genuinely different destination depending on when you visit.",
      },
    ],
    bestTime: "June–September for the lakes and forest colour; December–February for skiing",
    howToReach: "About 2 hours by road from Gilgit, via a scenic side valley off the main Hunza road.",
    quote: "Pine forests and a chain of colourful alpine lakes make Naltar one of the north's most vivid landscapes.",
    quoteAuthor: "Discover Gilgit guide notes",
    gallery: [
      { tag: "Alpine Lakes", caption: "Naltar's chain of colour", from: "from-emerald-600/30", to: "to-night" },
      { tag: "Pine Forest", caption: "Dense forest along the trail", from: "from-green-dark", to: "to-forest" },
      { tag: "Ski Slope", caption: "Winter skiing in Naltar", from: "from-sky-800/30", to: "to-night" },
      { tag: "Autumn Colour", caption: "Naltar's forest in October", from: "from-orange-500/30", to: "to-night" },
    ],
  },

  "skardu-katpana": {
    tagline: "Cold desert dunes beside turquoise lakes",
    intro:
      "Skardu and its nearby Katpana desert pair cold-desert sand dunes with turquoise lakes and dramatic mountain backdrops — a genuinely unusual landscape combination found in few other places on Earth, and the gateway to Baltistan's higher destinations.",
    highlights: [
      "Rare cold desert dunes set against snow-capped peaks",
      "Skardu's role as the main gateway to Deosai, K2, and Baltistan's high valleys",
      "Sarfaranga cold desert nearby, one of the highest desert regions in the world",
      "A growing base of guesthouses, cafés, and outfitters for onward trekking",
    ],
    famousFor: [
      {
        title: "The Cold Desert Dunes",
        text: "Katpana and Sarfaranga are among the highest-altitude cold deserts in the world, with genuine sand dunes at over 2,200 metres — an unexpected landscape this far into the mountains.",
      },
      {
        title: "Apricot & Buckwheat Cuisine",
        text: "Baltistan's food culture centres on buckwheat flatbread (prapu) and dried apricot dishes, distinct from Hunza's cuisine further north.",
      },
      {
        title: "Gateway to K2",
        text: "Skardu is the last major town before expeditions head into the Karakoram toward K2 and the Baltoro Glacier, giving it a working mountaineering-town character.",
      },
    ],
    bestTime: "April–October, with the clearest desert-and-mountain contrast in autumn",
    howToReach: "Domestic flights connect Skardu to Islamabad, or a 20–24 hour road journey via the Karakoram Highway.",
    quote: "Cold desert dunes beside turquoise lakes, surrounded by dramatic mountain scenery.",
    quoteAuthor: "Discover Gilgit guide notes",
    gallery: [
      { tag: "Dunes", caption: "Katpana's cold desert sand", from: "from-amber-600/30", to: "to-night" },
      { tag: "Lake", caption: "Turquoise water near Skardu", from: "from-cyan-600/30", to: "to-forest" },
      { tag: "Mountains", caption: "Peaks above the desert", from: "from-slate-600/30", to: "to-night" },
      { tag: "Town", caption: "Skardu's mountaineering base", from: "from-green-dark", to: "to-night" },
    ],
  },

  "shigar-valley": {
    tagline: "Stone villages and gateways to Baltistan's giants",
    intro:
      "Shigar is a historic valley of stone villages, fertile fields, and centuries-old forts, serving as the traditional gateway to the high mountains of central Baltistan — the last stretch of settled valley before the road gives way to glacier and expedition trails.",
    highlights: [
      "Shigar Fort, a restored royal residence now operating as a heritage hotel",
      "Fertile terraced fields against a backdrop of bare Karakoram peaks",
      "Traditional stone-and-timber Balti village architecture",
      "The last major settled valley before routes into the high Karakoram",
    ],
    famousFor: [
      {
        title: "Shigar Fort & Palace",
        text: "A restored 400-year-old fort-palace, now a heritage guesthouse, considered one of the finest examples of traditional Balti royal architecture.",
      },
      {
        title: "Apricot & Walnut Orchards",
        text: "Shigar's fertile valley floor produces some of Baltistan's best apricots and walnuts, sold dried through the winter across the region.",
      },
      {
        title: "Gateway to the Karakoram's Giants",
        text: "Expeditions toward K2, Gasherbrum, and the Baltoro Glacier traditionally stage through Shigar, giving the valley a quiet mountaineering heritage.",
      },
    ],
    bestTime: "April–October, with orchard harvest in late summer",
    howToReach: "About 1.5–2 hours by road from Skardu, along the Shigar River valley.",
    quote: "A historic valley of stone villages, fertile fields, and gateways to the high mountains of Baltistan.",
    quoteAuthor: "Discover Gilgit guide notes",
    gallery: [
      { tag: "Fort", caption: "Shigar Fort's restored architecture", from: "from-amber-700/40", to: "to-night" },
      { tag: "Fields", caption: "Terraced farmland in the valley", from: "from-lime-700/30", to: "to-forest" },
      { tag: "Village", caption: "Traditional Balti stone houses", from: "from-stone-600/30", to: "to-night" },
      { tag: "Mountains", caption: "Peaks above Shigar's valley floor", from: "from-slate-600/30", to: "to-night" },
    ],
  },

  "deosai-plains": {
    tagline: "The Land of Giants — Pakistan's highest plateau",
    intro:
      "Deosai is the Land of Giants — vast alpine plains at over 4,000 metres where wild landscapes stretch beneath an endless sky. One of the highest plateaus in the world, it's protected as a national park and home to one of the last strongholds of the Himalayan brown bear.",
    highlights: [
      "One of the highest plateaus in the world, largely treeless and open",
      "Protected habitat for the endangered Himalayan brown bear",
      "Wildflower blooms carpeting the plains in summer",
      "A genuinely wild, big-sky landscape unlike anywhere else in the north",
    ],
    famousFor: [
      {
        title: "The Himalayan Brown Bear",
        text: "Deosai National Park protects one of the last viable populations of Himalayan brown bears in South Asia, with sightings possible on quieter summer mornings.",
      },
      {
        title: "Summer Wildflower Blooms",
        text: "From July, the plains erupt in wildflowers, drawing photographers for a landscape that looks completely different from its stark spring appearance.",
      },
      {
        title: "Sheosar Lake",
        text: "A high-altitude lake within the plateau, reflecting the surrounding peaks with almost no development around its shoreline.",
      },
    ],
    bestTime: "July–September only — the plateau is snowbound and closed the rest of the year",
    howToReach: "About 2–3 hours by road from Skardu, via a high mountain pass into the park.",
    quote: "The Land of Giants — vast alpine plains where wild landscapes stretch beneath an endless sky.",
    quoteAuthor: "Discover Gilgit guide notes",
    gallery: [
      { tag: "The Plateau", caption: "Deosai's endless open plains", from: "from-lime-700/30", to: "to-night" },
      { tag: "Wildlife", caption: "Himalayan brown bear habitat", from: "from-amber-800/30", to: "to-forest" },
      { tag: "Sheosar Lake", caption: "A still lake on the plateau", from: "from-sky-700/30", to: "to-night" },
      { tag: "Wildflowers", caption: "Summer bloom across the plains", from: "from-rose-500/30", to: "to-night" },
    ],
  },

  "kachura-lake": {
    tagline: "A still turquoise mirror near Skardu",
    intro:
      "Kachura Lake is a still turquoise lake near Skardu, its glassy water mirroring the pine forest and cliffs around it. Easily reached as a half-day trip, it's one of Baltistan's most accessible and photogenic freshwater lakes.",
    highlights: [
      "Near-perfect water clarity and colour, especially in calm morning light",
      "Pine forest and cliffs reflected across the lake's surface",
      "A short, easy trip from Skardu, ideal for a half-day outing",
      "Small lakeside guesthouses and cafés for a relaxed visit",
    ],
    famousFor: [
      {
        title: "Water Clarity",
        text: "Kachura is known locally for some of the clearest freshwater in Baltistan, with visibility deep enough to see the lakebed in places.",
      },
      {
        title: "Trout Farming",
        text: "The lake and surrounding streams support small-scale trout farming, and fresh trout is a common menu item at nearby guesthouses.",
      },
      {
        title: "Easy Accessibility",
        text: "Unlike many of Baltistan's lakes, Kachura is reachable by regular road within an hour of Skardu — a low-effort, high-reward outing.",
      },
    ],
    bestTime: "April–October, calmest and clearest in early morning",
    howToReach: "About 1 hour by road from Skardu.",
    quote: "A still turquoise lake near Skardu, its glassy water mirroring the pine forest and cliffs around it.",
    quoteAuthor: "Discover Gilgit guide notes",
    gallery: [
      { tag: "Lake", caption: "Kachura's turquoise water", from: "from-cyan-600/30", to: "to-night" },
      { tag: "Reflections", caption: "Pine forest mirrored on the surface", from: "from-green-dark", to: "to-forest" },
      { tag: "Cliffs", caption: "Rock walls above the shoreline", from: "from-stone-600/30", to: "to-night" },
      { tag: "Morning Calm", caption: "Kachura at sunrise", from: "from-sky-700/30", to: "to-night" },
    ],
  },

  "fairy-meadows": {
    tagline: "Alpine meadows at the foot of Nanga Parbat",
    intro:
      "Fairy Meadows sits at the foot of Nanga Parbat, the world's ninth-highest peak, wrapped in pine forest and morning mist. Reached by jeep track and a final trek, it offers one of the most direct, uninterrupted views of an 8,000-metre peak anywhere in Pakistan.",
    highlights: [
      "Uninterrupted views of Nanga Parbat's Rupal and Diamir faces",
      "Alpine meadows surrounded by dense pine forest",
      "A relatively short, accessible trek compared to other 8,000er base camps",
      "Simple mountain huts and camping right beneath the peak",
    ],
    famousFor: [
      {
        title: "Nanga Parbat, the 'Killer Mountain'",
        text: "Fairy Meadows offers one of the closest, most direct views of Nanga Parbat's sheer face — the world's ninth-highest peak and among its most storied climbing histories.",
      },
      {
        title: "Accessible Base Camp Trekking",
        text: "Unlike most 8,000-metre base camps, Fairy Meadows is reachable in a single day's trek after a jeep ride — genuine high-mountain scenery without a multi-week expedition.",
      },
      {
        title: "Morning Mist Over the Meadows",
        text: "Early mornings often bring low mist rolling through the pine forest and meadow, framed against Nanga Parbat's summit catching first light.",
      },
    ],
    bestTime: "June–September, when the jeep track and trekking trail are open",
    howToReach: "A jeep ride from Raikot Bridge on the Karakoram Highway, followed by a 2–3 hour trek.",
    quote: "Alpine meadows at the foot of Nanga Parbat, wrapped in pine forest and morning mist.",
    quoteAuthor: "Discover Gilgit guide notes",
    gallery: [
      { tag: "Meadow", caption: "Fairy Meadows beneath Nanga Parbat", from: "from-green-dark", to: "to-night" },
      { tag: "Nanga Parbat", caption: "The Killer Mountain's face", from: "from-slate-600/30", to: "to-forest" },
      { tag: "Pine Forest", caption: "Forest framing the meadow", from: "from-lime-700/30", to: "to-night" },
      { tag: "Morning Mist", caption: "Mist rolling through camp", from: "from-sky-700/30", to: "to-night" },
    ],
  },

  "rama-lake": {
    tagline: "A still lake beneath Nanga Parbat's uninterrupted view",
    intro:
      "Rama Lake is a still alpine lake ringed by pine forest, framed by uninterrupted views of Nanga Parbat rising above — a quieter, more easily reached alternative to Fairy Meadows on the Astore side of the mountain.",
    highlights: [
      "A still lake with a clear, uninterrupted view of Nanga Parbat",
      "Dense pine forest surrounding the lakeshore",
      "Easier access than Fairy Meadows, on the Astore side of the mountain",
      "Popular for camping and picnics with mountain views",
    ],
    famousFor: [
      {
        title: "Direct Nanga Parbat Views",
        text: "Rama Lake offers one of the clearest lake-level views of Nanga Parbat available without a trek, its still water often reflecting the peak on calm days.",
      },
      {
        title: "Pine-Forest Camping",
        text: "The lakeshore and surrounding meadow are a popular, easily reached camping spot for families and groups, unlike the more remote Fairy Meadows.",
      },
      {
        title: "Astore Valley Access",
        text: "Rama Lake sits within the Astore valley, giving it a different access route and character from Nanga Parbat's Hunza-facing side.",
      },
    ],
    bestTime: "May–October, when the road to Rama meadow is open",
    howToReach: "A jeep track from Astore town, about 30–40 minutes to Rama meadow and the lake.",
    quote: "A still alpine lake ringed by pine forest, framed by uninterrupted views of Nanga Parbat rising above.",
    quoteAuthor: "Discover Gilgit guide notes",
    gallery: [
      { tag: "Lake", caption: "Rama Lake's still water", from: "from-sky-700/30", to: "to-night" },
      { tag: "Nanga Parbat", caption: "The peak reflected on the lake", from: "from-slate-600/30", to: "to-forest" },
      { tag: "Pine Forest", caption: "Forest ringing the lakeshore", from: "from-green-dark", to: "to-night" },
      { tag: "Meadow", caption: "Camping ground at Rama", from: "from-lime-700/30", to: "to-night" },
    ],
  },

  "harmosh-valley": {
    tagline: "A remote glacial valley far from the highway",
    intro:
      "Harmosh is a remote glacial valley below Haramosh Peak, reached through pine forest and high pasture far from the main highway — a genuinely off-the-beaten-path destination for trekkers wanting solitude in the Karakoram.",
    highlights: [
      "A remote glacial valley well off the main tourist routes",
      "Haramosh Peak dominating the head of the valley",
      "Pine forest and high pasture along a quiet approach trail",
      "Minimal infrastructure — a genuinely wild trekking experience",
    ],
    famousFor: [
      {
        title: "Haramosh Peak",
        text: "The valley takes its character from Haramosh (7,409 m), a peak with a serious mountaineering history and one of the more technically demanding summits in the region.",
      },
      {
        title: "Genuine Remoteness",
        text: "Harmosh sees far fewer visitors than Hunza or Skardu's valleys, offering a rare sense of solitude for trekkers willing to go further off-route.",
      },
      {
        title: "Untouched Pasture Trails",
        text: "The approach trail crosses high pasture still used seasonally by local herders, largely unchanged by tourism infrastructure.",
      },
    ],
    bestTime: "June–September, the only reliable window for the approach trail",
    howToReach: "A multi-hour drive from Gilgit followed by a multi-day trek — best arranged with a local guide.",
    quote: "A remote glacial valley below Haramosh Peak, reached through pine forest and high pasture far from the highway.",
    quoteAuthor: "Discover Gilgit guide notes",
    gallery: [
      { tag: "Glacier", caption: "Harmosh's remote ice field", from: "from-sky-800/30", to: "to-night" },
      { tag: "Haramosh Peak", caption: "The valley's defining summit", from: "from-slate-600/30", to: "to-forest" },
      { tag: "Pine Forest", caption: "Forest on the approach trail", from: "from-green-dark", to: "to-night" },
      { tag: "High Pasture", caption: "Herders' grazing ground", from: "from-lime-700/30", to: "to-night" },
    ],
  },

  "rupal-valley": {
    tagline: "Gateway to one of the tallest mountain walls on Earth",
    intro:
      "Rupal Valley is the gateway to Nanga Parbat's Rupal Face, one of the tallest mountain walls on Earth, deep in Astore district — a valley defined entirely by the scale of the mountain wall rising directly above it.",
    highlights: [
      "The Rupal Face — one of the tallest continuous mountain walls in the world",
      "A quieter approach to Nanga Parbat than the Fairy Meadows side",
      "Traditional Astore villages along the valley approach",
      "Serious trekking and mountaineering history along the route",
    ],
    famousFor: [
      {
        title: "The Rupal Face",
        text: "Rising over 4,600 metres from base to summit, the Rupal Face is among the tallest continuous mountain walls on Earth — a genuine scale that's hard to grasp until you're standing beneath it.",
      },
      {
        title: "Mountaineering History",
        text: "The face has drawn serious mountaineering attempts for decades, including landmark ascents that shaped Himalayan climbing history.",
      },
      {
        title: "A Quieter Nanga Parbat Approach",
        text: "Far fewer visitors reach Nanga Parbat via Rupal than via Fairy Meadows, giving this side of the mountain a more remote, unhurried character.",
      },
    ],
    bestTime: "June–September, when the valley road and trekking trails are open",
    howToReach: "A multi-hour drive from Astore town, deep into Rupal valley.",
    quote: "Gateway to Nanga Parbat's Rupal Face, one of the tallest mountain walls on earth, deep in Astore district.",
    quoteAuthor: "Discover Gilgit guide notes",
    gallery: [
      { tag: "Rupal Face", caption: "One of the tallest walls on Earth", from: "from-slate-600/30", to: "to-night" },
      { tag: "Valley", caption: "Rupal's approach valley", from: "from-green-dark", to: "to-forest" },
      { tag: "Village", caption: "Traditional Astore settlements", from: "from-amber-700/30", to: "to-night" },
      { tag: "Base Camp", caption: "Camping beneath the face", from: "from-sky-700/30", to: "to-night" },
    ],
  },
};
