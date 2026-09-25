import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DestinationDetailPage from "@/components/DestinationDetailPage";
import { DESTINATIONS, getDestination, getRegionFor } from "@/lib/destinations";
import { DESTINATION_DETAILS } from "@/lib/destinationDetails";

export function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ slug: d.slug as string }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  const content = destination ? DESTINATION_DETAILS[destination.id] : undefined;
  if (!destination || !content) return {};

  return {
    title: `${destination.name} — Discover Gilgit`,
    description: content.tagline,
  };
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = getDestination(slug);
  const content = destination ? DESTINATION_DETAILS[destination.id] : undefined;
  if (!destination || !content) notFound();

  const region = getRegionFor(destination.id);
  const nearby = (region ? region.ids : [])
    .filter((id) => id !== destination.id)
    .map((id) => DESTINATIONS.find((d) => d.id === id))
    .filter((d): d is (typeof DESTINATIONS)[number] => Boolean(d))
    .slice(0, 3);

  return <DestinationDetailPage destination={destination} content={content} region={region} nearby={nearby} />;
}
