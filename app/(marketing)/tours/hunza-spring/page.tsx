import type { Metadata } from "next";
import HunzaSpringTour from "@/components/HunzaSpringTour";

export const metadata: Metadata = {
  title: "Blossoms of Hunza — Spring Tour — Discover Gilgit",
  description:
    "Walk beneath pink almond and cherry blossoms as they bloom against snow-capped peaks — a five-day guided spring journey through Hunza Valley, 25–29 May 2027.",
};

export default function HunzaSpringTourPage() {
  return <HunzaSpringTour />;
}
