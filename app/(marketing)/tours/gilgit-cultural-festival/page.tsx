import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FestivalPage from "@/components/FestivalPage";

export const metadata: Metadata = {
  title: "Gilgit-Baltistan Cultural Festival — Discover Gilgit",
  description:
    "Immerse yourself in the vibrant culture, music, and traditional food of Gilgit-Baltistan — a celebration of heritage and community spirit, 12–14 August 2027 in Gilgit City.",
};

export default function GilgitCulturalFestivalPage() {
  return (
    <>
      <Hero
        eyebrow="FEATURED EVENT"
        title="Gilgit-Baltistan Cultural Festival"
        description="Immerse yourself in the vibrant culture, music, and traditional food of Gilgit-Baltistan — a celebration of our heritage and community spirit."
        image="/Images/tours/sword-dance.png"
        imageAlt="Dancers in traditional dress performing at the Gilgit-Baltistan Cultural Festival"
        primaryCta={null}
        secondaryCta={null}
        videoCta={{ label: "Watch Festival Highlights" }}
      />
      <FestivalPage />
    </>
  );
}
