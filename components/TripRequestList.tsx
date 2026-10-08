import { CalendarIcon, UsersIcon } from "./ui/icons";
import type { MyTripRequest, TripRequestSource } from "@/lib/getMyTripRequests";

/** Source tags — three clearly different pills in the site's own palette. */
const SOURCE_TAGS: Record<TripRequestSource, { label: string; className: string }> = {
  trip_request: { label: "Trip Request", className: "bg-green/10 text-green" },
  reservation: { label: "Reservation", className: "bg-gold/20 text-forest" },
  custom_trip: { label: "Custom Trip", className: "bg-forest/[0.07] text-forest/80" },
};

/** e.g. "5 Oct 2026" — fixed to UTC so the server render is stable. */
function formatSubmitted(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

export default function TripRequestList({ requests }: { requests: MyTripRequest[] }) {
  return (
    <div className="mt-8">
      <p className="text-sm text-muted">
        <span className="font-semibold text-forest">{requests.length}</span>{" "}
        {requests.length === 1 ? "request" : "requests"}, newest first
      </p>

      <ul className="mt-4 space-y-4">
        {requests.map((request, index) => {
          const tag = SOURCE_TAGS[request.source];
          const submitted = formatSubmitted(request.submittedAt);

          return (
            <li
              key={`${request.source}-${request.submittedAt ?? "undated"}-${index}`}
              className="rounded-[22px] border border-forest/10 bg-white p-5 shadow-[0_2px_18px_rgba(18,36,28,0.06)] sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${tag.className}`}
                >
                  {tag.label}
                </span>
                {submitted && (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                    Sent{" "}
                    <time dateTime={request.submittedAt ?? undefined} className="text-forest/70">
                      {submitted}
                    </time>
                  </p>
                )}
              </div>

              <h2 className="mt-4 font-serif text-xl leading-snug text-forest sm:text-2xl">{request.title}</h2>

              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-forest/10 pt-4 text-sm text-forest/80">
                <span className="inline-flex items-center gap-2">
                  <span className="text-green">
                    <CalendarIcon size={15} />
                  </span>
                  {request.dates}
                </span>
                {request.groupSize && (
                  <span className="inline-flex items-center gap-2">
                    <span className="text-green">
                      <UsersIcon size={15} />
                    </span>
                    {request.groupSize}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
