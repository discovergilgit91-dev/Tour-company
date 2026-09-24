import type { Metadata } from "next";
import FestivalGallery from "@/components/FestivalGallery";

export const metadata: Metadata = {
  title: "Festival Gallery — Gilgit-Baltistan Cultural Festival",
  description:
    "Browse every moment of the Gilgit-Baltistan Cultural Festival — traditional dance, local cuisine, handicrafts, live performances, cultural exhibitions, and community spirit.",
};

export default function FestivalGalleryPage() {
  return <FestivalGallery />;
}
