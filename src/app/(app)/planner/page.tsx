import Link from "next/link";
import { ArrowRight, CalendarRange, MapPin, Users } from "lucide-react";
import {
  getJourneyBySlug,
  getFeaturedJourneys,
  asItinerary,
  asRouteStops,
} from "@/lib/data";
import { ItineraryTimeline } from "@/components/ItineraryTimeline";
import { MessageExpert } from "@/components/MessageExpert";
import { SriLankaMap } from "@/components/SriLankaMap";

export const dynamic = "force-dynamic";

export default async function PlannerPage() {
  const journey =
    (await getJourneyBySlug("leopards-of-yala")) ??
    (await getFeaturedJourneys())[0];

  if (!journey) {
    return (
      <div className="container-page pt-10">
        <p className="font-sans text-sm text-ocean/65">
          No active plan yet. Browse{" "}
          <Link href="/journeys" className="font-semibold text-tropical">
            Journeys
          </Link>{" "}
          to start one.
        </p>
      </div>
    );
  }

  const itinerary = asItinerary(journey.itinerary);
  const routeStops = asRouteStops(journey.routeStops);
  const confirmed = itinerary.filter((d) => d.status === "confirmed").length;
  const progress = Math.round((confirmed / itinerary.length) * 100);

  return (
    <div className="container-page pt-10 lg:pt-14">
      <div className="max-w-2xl">
        <p className="section-eyebrow mb-1">Your Active Plan</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-ocean sm:text-5xl">
          {journey.title}
        </h1>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
        {/* Itinerary */}
        <div className="lg:col-span-2">
          <h2 className="mb-6 font-serif text-2xl font-medium text-ocean sm:text-3xl">
            Day-by-Day Itinerary
          </h2>
          <ItineraryTimeline days={itinerary} />
        </div>

        {/* Sticky summary */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 space-y-5">
            <div className="grid grid-cols-3 gap-3">
              <Stat
                icon={<CalendarRange className="h-4 w-4" />}
                label="Duration"
                value={`${journey.durationDays} days`}
              />
              <Stat
                icon={<Users className="h-4 w-4" />}
                label="Travelers"
                value="2 adults"
              />
              <Stat
                icon={<MapPin className="h-4 w-4" />}
                label="Region"
                value="Sri Lanka"
              />
            </div>

            <div className="surface-card p-4">
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs font-semibold uppercase tracking-wider text-ocean/70">
                  Planning Progress
                </span>
                <span className="font-sans text-sm font-semibold text-tropical">
                  {progress}%
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ocean/10">
                <div
                  className="h-full rounded-full bg-tropical transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 font-sans text-xs text-ocean/55">
                {confirmed} of {itinerary.length} days confirmed
              </p>
            </div>

            {routeStops.length > 0 ? <SriLankaMap stops={routeStops} /> : null}

            <MessageExpert />

            <Link
              href={`/checkout?journey=${journey.slug}`}
              className="gold-button w-full"
            >
              Confirm &amp; Book Journey <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="surface-card p-3 text-center">
      <span className="mx-auto mb-1 grid h-8 w-8 place-items-center rounded-full bg-ocean/5 text-tropical">
        {icon}
      </span>
      <p className="font-sans text-[10px] uppercase tracking-wider text-ocean/55">
        {label}
      </p>
      <p className="font-serif text-sm font-medium text-ocean">{value}</p>
    </div>
  );
}
