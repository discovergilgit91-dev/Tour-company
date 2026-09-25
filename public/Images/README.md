# Images folder

This folder holds the site's photos, organized to match the paths the
components already reference:

```
public/Images/
├── avatars/
│   ├── sarah-khan.jpg           Traveler stories — Sarah Khan
│   ├── ali-raza.jpg             Traveler stories — Ali Raza
│   ├── ayesha-malik.jpg         Traveler stories — Ayesha Malik
│   ├── ayesha-khan.jpg          Traveler stories — Ayesha Khan
│   ├── daniel-reyes.jpg         Traveler stories — Daniel Reyes
│   └── meera-nair.jpg           Traveler stories — Meera Nair
├── hero/
│   ├── upcoming-hero.jpg        used by UpcomingTours.tsx
│   ├── closing-cta.jpg          ClosingCTA — homepage closing banner
│   └── lands-hero.jpg           /lands page hero background
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
`services/`, a monogram for `avatars/`, a plain textured gradient for
`closing-cta.jpg` and `lands-hero.jpg` since real heading/subtitle text
sits on top of them) so the site renders with no broken images or
fabricated customer photos. Replace each one with a real photo of the
same name and same folder to swap it in — no code changes needed.
