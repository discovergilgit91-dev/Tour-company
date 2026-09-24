import type { Metadata } from "next";
import BookingPage from "@/components/BookingPage";
import { getTourDetail, TOUR_DETAILS } from "@/lib/tourDetails";

export function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ tour?: string }>;
}): Promise<Metadata> {
  return searchParams.then(({ tour: slug }) => {
    const tour = slug ? getTourDetail(slug) : undefined;
    return {
      title: tour ? `Reserve ${tour.title} — Discover Gilgit` : "Reserve Your Spot — Discover Gilgit",
      description: tour
        ? `Reserve your place on ${tour.title}, ${tour.dateRange} — ${tour.duration}.`
        : "Reserve your place on a guided tour or seasonal event across Gilgit-Baltistan.",
    };
  });
}

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ tour?: string }>;
}) {
  const { tour: slug } = await searchParams;
  const tour = slug ? getTourDetail(slug) ?? null : null;
  const allTours = Object.values(TOUR_DETAILS).map((t) => ({ slug: t.slug, title: t.title }));

  return <BookingPage tour={tour} allTours={allTours} />;
}
