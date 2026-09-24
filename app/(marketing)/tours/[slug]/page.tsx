import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TourDetailPage from "@/components/TourDetailPage";
import { getAllTourSlugs, getTourDetail } from "@/lib/tourDetails";

export function generateStaticParams() {
  return getAllTourSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourDetail(slug);
  if (!tour) return {};

  return {
    title: `${tour.title} — ${tour.tagline.split(" · ")[0]} — Discover Gilgit`,
    description: tour.heroDescription,
  };
}

export default async function TourPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = getTourDetail(slug);
  if (!tour) notFound();

  return <TourDetailPage tour={tour} />;
}
