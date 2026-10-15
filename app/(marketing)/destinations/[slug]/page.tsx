import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DestinationDetailPage from "@/components/DestinationDetailPage";
import DistrictPage from "@/components/district/DistrictPage";
import { DESTINATIONS, getDestination, getRegionFor } from "@/lib/destinations";
import { DESTINATION_DETAILS } from "@/lib/destinationDetails";
import { DISTRICTS, districtHref, getDistrict } from "@/lib/districts";
import { getDistrictForDestination } from "@/lib/districtQueries";
import { districtMetadata } from "@/lib/districtSeo";

// One route serves both kinds of page: a district guide (/destinations/hunza,
// from lib/districts.ts) or a single destination (/destinations/karimabad).
// District slugs are checked first, so give a district a slug no destination uses.
export function generateStaticParams() {
  return [...DISTRICTS.map((d) => ({ slug: d.slug })), ...DESTINATIONS.map((d) => ({ slug: d.slug as string }))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const district = getDistrict(slug);
  if (district) return districtMetadata(district);

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
  const district = getDistrict(slug);
  if (district) return <DistrictPage district={district} />;

  const destination = getDestination(slug);
  const content = destination ? DESTINATION_DETAILS[destination.id] : undefined;
  if (!destination || !content) notFound();

  const region = getRegionFor(destination.id);
  const nearby = (region ? region.ids : [])
    .filter((id) => id !== destination.id)
    .map((id) => DESTINATIONS.find((d) => d.id === id))
    .filter((d): d is (typeof DESTINATIONS)[number] => Boolean(d))
    .slice(0, 3);

  const partOf = getDistrictForDestination(destination.id);

  return (
    <DestinationDetailPage
      destination={destination}
      content={content}
      region={region}
      nearby={nearby}
      district={partOf ? { name: partOf.name, href: districtHref(partOf) } : undefined}
    />
  );
}
