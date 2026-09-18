import { supabase } from "../lib/supabase";
import Hero from "../components/Hero";
import FeaturedDestinations from "../components/destination";
import UpcomingTours from "../components/UpcomingTours";

type Tour = {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  image_url: string | null;
};

export default async function Home() {
  const { data: tours, error } = await supabase
    .from("tours")
    .select("*")
    .returns<Tour[]>();

  return (
    <main className="min-h-screen bg-[#F6F1E7]">
      {/* =====================================================
          HERO
      ===================================================== */}
      <Hero />

      {/* =====================================================
          FEATURED DESTINATIONS
      ===================================================== */}
      <FeaturedDestinations />

      {/* =====================================================
          UPCOMING TOURS & EVENTS
      ===================================================== */}
      <UpcomingTours />

      {/* =====================================================
          TOURS FROM SUPABASE
      ===================================================== */}
      <section className="bg-[#F6F1E7]">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
          {error ? (
            <p className="text-sm text-red-600">
              Unable to load tours at the moment.
            </p>
          ) : tours && tours.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tours.map((tour) => (
                <article
                  key={tour.id}
                  className="overflow-hidden rounded-[28px] bg-white shadow-sm"
                >
                  {tour.image_url ? (
                    <div className="relative h-56 w-full overflow-hidden">
                      <img
                        src={tour.image_url}
                        alt={tour.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : null}

                  <div className="p-6">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1F6A4C]">
                      {tour.location}
                    </p>

                    <h3
                      className="text-2xl leading-tight text-[#1C2B2E]"
                      style={{
                        fontFamily:
                          "var(--font-fraunces)",
                      }}
                    >
                      {tour.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-[#8A8377]">
                      {tour.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-[#1C2B2E]/10 pt-4">
                      <span className="font-semibold text-[#1F6A4C]">
                        ${tour.price}
                      </span>

                      <span className="text-xs text-[#8A8377]">
                        {tour.duration}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}