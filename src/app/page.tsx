import Hero from "@/components/Hero";
import FeaturedDestinations from "@/components/destination";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F6F1E7]">
      <Hero />
      <FeaturedDestinations />
    </main>
  );
}
