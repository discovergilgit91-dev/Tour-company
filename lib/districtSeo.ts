import type { Metadata } from "next";
import type { Destination } from "@/components/DestinationCard";
import { districtHref, type District } from "./districts";
import type { Crumb, JsonLdObject } from "./seo";
import { organizationJsonLd } from "./seo";
import { SITE_NAME, SITE_URL, absoluteUrl } from "./site";

/** SEO for district pages, all filled from the district's own data. */

export function districtMetadata(district: District): Metadata {
  const title = `${district.seo.title} | ${SITE_NAME}`;
  const url = absoluteUrl(districtHref(district));
  const image = {
    url: absoluteUrl(district.hero.src),
    width: district.hero.width,
    height: district.hero.height,
    alt: district.hero.alt,
  };

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: district.seo.description,
    keywords: district.seo.keywords,
    alternates: { canonical: url },
    openGraph: {
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      url,
      title,
      description: district.seo.description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: district.seo.description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}

export function districtBreadcrumbs(district: District): Crumb[] {
  return [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/lands" },
    { name: district.name, path: districtHref(district) },
  ];
}

/** schema.org TouristDestination, listing the district's real pages as attractions. */
export function districtJsonLd(district: District, places: Destination[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: district.name,
    description: district.seo.description,
    url: absoluteUrl(districtHref(district)),
    image: [absoluteUrl(district.hero.src)],
    inLanguage: "en",
    containedInPlace: { "@type": "AdministrativeArea", name: district.regionLabel, containedInPlace: { "@type": "Country", name: "Pakistan" } },
    includesAttraction: places.map((place) => ({
      "@type": "TouristAttraction",
      name: place.name,
      url: absoluteUrl(place.href),
    })),
    publisher: organizationJsonLd(),
  };
}
