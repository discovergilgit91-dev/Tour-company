/**
 * Shared option lists for trip-planning UI — the "Plan Your Trip" form and
 * the homepage hero search bar both need to speak the same destination and
 * group-size vocabulary so a value picked in one place is recognized by the
 * other. Kept out of any single component so neither one is the "source of
 * truth" the other silently drifts from.
 */

export const DESTINATIONS = [
  "Hunza Valley",
  "Skardu",
  "Deosai Plains",
  "Gilgit City",
  "Naltar Valley",
  "Fairy Meadows",
  "Khunjerab Pass",
  "Naran & Babusar",
];

export const GROUP_SIZES = ["Solo traveller", "Couple", "Family (3–5)", "Group (6+)"];
export const DURATIONS = ["Weekend (2–3 days)", "4–7 days", "8–14 days", "2+ weeks"];
