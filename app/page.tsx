import { supabase } from "@/lib/supabase";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedDestinations from "@/components/destination";
import AboutStory from "@/components/AboutStory";
import UpcomingTours from "@/components/UpcomingTours";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";

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
  let tours: Tour[] | null = null;
  let error: unknown = null;

  try {
    const result = await supabase.from("tours").select("*").returns<Tour[]>();
    tours = result.data;
    error = result.error;
  } catch (err) {
    error = err;
  }

  return (
    <main className="min-h-screen bg-cream">
      <Hero />
      <WhyChooseUs />
      <FeaturedDestinations />
      <AboutStory />
      <UpcomingTours />

      {!error && tours && tours.length > 0 ? (
        <section className="bg-cream">
          <div className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-10 sm:pb-24 lg:px-16 lg:pb-28">
            <h3 className="mb-8 font-serif text-2xl text-forest">More tours from our team</h3>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tours.map((tour) => (
                <article key={tour.id} className="overflow-hidden rounded-[28px] bg-white shadow-sm">
                  {tour.image_url ? (
                    <div className="relative h-56 w-full overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={tour.image_url} alt={tour.title} className="h-full w-full object-cover" />
                    </div>
                  ) : null}

                  <div className="p-6">
                    <p className="mb-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-green">
                      {tour.location}
                    </p>

                    <h3 className="font-serif text-2xl leading-tight text-forest">{tour.title}</h3>

                    <p className="mt-3 text-sm leading-relaxed text-muted">{tour.description}</p>

                    <div className="mt-5 flex items-center justify-between border-t border-forest/10 pt-4">
                      <span className="font-semibold text-green">${tour.price}</span>
                      <span className="text-xs text-muted">{tour.duration}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Testimonials />
      <ContactSection />
    </main>
  );
}
