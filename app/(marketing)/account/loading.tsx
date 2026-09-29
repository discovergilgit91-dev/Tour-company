export default function Loading() {
  return (
    <main className="min-h-screen bg-cream pb-24 pt-32 sm:pt-36">
      <div className="mx-auto w-full max-w-3xl animate-pulse px-5 motion-reduce:animate-none sm:px-6 lg:px-8">
        <div className="h-3 w-24 rounded-full bg-forest/10" />
        <div className="mt-3 h-9 w-64 rounded-lg bg-forest/10" />

        <div className="mt-8 rounded-[22px] border border-forest/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-5">
            <div className="h-20 w-20 shrink-0 rounded-full bg-forest/10" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-6 w-40 rounded-lg bg-forest/10" />
              <div className="h-4 w-56 rounded-lg bg-forest/10" />
            </div>
          </div>
          <div className="mt-8 border-t border-forest/10 pt-6">
            <div className="h-3 w-20 rounded-full bg-forest/10" />
            <div className="mt-2 h-12 w-full max-w-sm rounded-xl bg-forest/10" />
          </div>
        </div>

        <div className="mt-6 h-24 rounded-[22px] border border-forest/10 bg-white shadow-sm sm:h-28" />
      </div>
    </main>
  );
}
