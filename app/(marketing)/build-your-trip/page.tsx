import type { Metadata } from "next";
import BuildYourTripPage from "@/components/BuildYourTripPage";
import { getSessionProfile } from "@/lib/supabase/session";

export const metadata: Metadata = {
  title: "Build Your Own Trip — Discover Gilgit",
  description:
    "Pick your own destinations across Gilgit-Baltistan, tell us your dates, pace, and budget, and a local trip planner will turn it into a real itinerary.",
};

export default async function Page() {
  const sessionProfile = await getSessionProfile();
  return <BuildYourTripPage sessionProfile={sessionProfile} />;
}
