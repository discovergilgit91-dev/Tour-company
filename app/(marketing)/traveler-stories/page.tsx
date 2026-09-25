import type { Metadata } from "next";
import TravelerStoriesPage from "@/components/TravelerStoriesPage";

export const metadata: Metadata = {
  title: "Traveler Stories — Discover Gilgit",
  description:
    "Honest words from the people who've walked the valleys, treks, and heritage sites of Gilgit-Baltistan with us.",
};

export default function Page() {
  return <TravelerStoriesPage />;
}
