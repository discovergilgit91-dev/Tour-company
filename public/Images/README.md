# Images folder

This folder holds the site's photos, organized to match the paths the
components already reference:

```
public/Images/
├── hero/
│   └── upcoming-hero.jpg        used by UpcomingTours.tsx
├── services/
│   ├── transportation.jpg       CompleteExperience — Transportation
│   ├── stay.jpg                 CompleteExperience — Stay
│   ├── food.jpg                 CompleteExperience — Local Food
│   ├── guides.jpg               CompleteExperience — Guided Experiences
│   ├── activities.jpg           CompleteExperience — Activities
│   └── support.jpg              CompleteExperience — Complete Support
└── tours/
    ├── hunza-spring.jpg         Blossoms of Hunza (UpcomingTours)
    ├── rakaposhi-trek.jpg       Rakaposhi Base Camp Trek (UpcomingTours)
    ├── altit-baltit.jpg         Cultural Heritage Tour (UpcomingTours)
    ├── shigar-camping.jpg       Shigar Valley Camping (UpcomingTours)
    ├── hunza-valley.png         Hero slide — Hunza Valley
    ├── Fairy-meadows.png        Hero slide — Fairy Meadows
    ├── baltit-fort.png          Hero slide — Baltit Fort
    ├── Kaptana-desert.png       Hero slide — Skardu Desert
    ├── skardu.png               Hero slide — Deosai Plains
    ├── passu-cones.jpg          Destination card — Hunza Valley
    ├── deosai-plains.png        Destination card — Deosai Plains
    ├── cold-desert.png          Destination card — Skardu & Katpana
    └── nanga-parbat.png         Destination card — Fairy Meadows
```

Every file above is currently a generated placeholder (a branded
forest/gold graphic — the tour name for `tours/`, a line-art motif for
`services/`) so the site renders with no broken images. Replace each one
with a real photo of the same name and same folder to swap it in — no
code changes needed.
