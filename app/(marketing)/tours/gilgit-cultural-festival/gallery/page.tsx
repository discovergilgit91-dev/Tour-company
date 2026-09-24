import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FestivalGallery from "@/components/FestivalGallery";

export const metadata: Metadata = {
  title: "Festival Gallery — Gilgit-Baltistan Cultural Festival",
  description:
    "Browse every moment of the Gilgit-Baltistan Cultural Festival — traditional dance, local cuisine, handicrafts, live performances, cultural exhibitions, and community spirit.",
};

export default function FestivalGalleryPage() {
  return (
    <>
      <Hero
        eyebrow="FESTIVAL GALLERY"
        title="Moments, colors and culture"
        description="Every dance, dish, and handmade craft from the Gilgit-Baltistan Cultural Festival — browse by category or take it all in."
        primaryCta={null}
        secondaryCta={null}
      />
      <FestivalGallery />
    </>
  );
}
