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
      <div className="px-5 pt-6">
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
    <div>
      <section className="px-5 pt-6">
        <p className="section-eyebrow mb-1">Your Active Plan</p>
        <h1 className="font-serif text-3xl font-medium text-ocean">
          {journey.title}
        </h1>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <Stat icon={<CalendarRange className="h-4 w-4" />} label="Duration" value={`${journey.durationDays} days`} />
          <Stat icon={<Users className="h-4 w-4" />} label="Travelers" value="2 adults" />
          <Stat icon={<MapPin className="h-4 w-4" />} label="Region" value="Sri Lanka" />
        </div>

        <div className="mt-4 rounded-2xl border border-ocean/10 bg-cream p-4">
          <div className="flex items-center justify-between">
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-ocean/70">
              Planning Progress
            </span>
            <span className="font-sans text-sm font-semibold text-tropical">
              {progress}%
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-sand-dark">
            <div
              className="h-full rounded-full bg-tropical transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 font-sans text-xs text-ocean/55">
            {confirmed} of {itinerary.length} days confirmed
          </p>
        </div>
      </section>

      {routeStops.length > 0 ? (
        <section className="px-5 pt-8">
          <p className="section-eyebrow mb-1">Live Route Map</p>
          <h2 className="mb-4 font-serif text-2xl font-medium text-ocean">
            Your Travel Path
          </h2>
          <SriLankaMap stops={routeStops} />
        </section>
      ) : null}

      <section className="px-5 pt-8">
        <h2 className="mb-6 font-serif text-2xl font-medium text-ocean">
          Day-by-Day Itinerary
        </h2>
        <ItineraryTimeline days={itinerary} />
      </section>

      <section className="px-5 pt-8">
        <MessageExpert sticky />
      </section>

      <section className="px-5 pt-6">
        <Link
          href={`/checkout?journey=${journey.slug}`}
          className="gold-button w-full"
        >
          Confirm & Book Journey <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
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
    <div className="rounded-2xl border border-ocean/10 bg-cream p-3 text-center">
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
