export default function Loading() {
  return (
    <main className="min-h-screen bg-cream pb-24 pt-32 sm:pt-36">
      <div className="mx-auto w-full max-w-3xl animate-pulse px-5 motion-reduce:animate-none sm:px-6 lg:px-8">
        <div className="h-4 w-24 rounded-full bg-forest/10" />
        <div className="mt-4 h-3 w-32 rounded-full bg-forest/10" />
        <div className="mt-3 h-9 w-72 rounded-lg bg-forest/10" />
        <div className="mt-8 h-64 rounded-[22px] border border-dashed border-forest/20 bg-white/60" />
      </div>
    </main>
  );
}
