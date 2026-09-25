import type { Metadata } from "next";
import PlanYourTripPage from "@/components/PlanYourTripPage";

export const metadata: Metadata = {
  title: "Plan Your Trip — Discover Gilgit",
  description:
    "Not sure which tour yet? Tell us what you love, when you're free, and how many are coming — a local trip planner will shape a custom itinerary around you.",
};

export default function Page() {
  return <PlanYourTripPage />;
}
