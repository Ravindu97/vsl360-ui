import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, MapPin, Users, Leaf } from "lucide-react";
import {
  getJourneyBySlug,
  asItinerary,
  asRouteStops,
  asTiers,
} from "@/lib/data";
import { ItineraryTimeline } from "@/components/ItineraryTimeline";
import { MessageExpert } from "@/components/MessageExpert";
import { SriLankaMap } from "@/components/SriLankaMap";
import { TierComparison } from "@/components/TierComparison";
import { TrustBadges } from "@/components/TrustBadges";
import { WhatsAppButton } from "@/components/WhatsApp";

export const dynamic = "force-dynamic";

export default async function JourneyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const journey = await getJourneyBySlug(slug);

  if (!journey) notFound();

  const itinerary = asItinerary(journey.itinerary);
  const routeStops = asRouteStops(journey.routeStops);
  const tiers = asTiers(journey.tiers);

  return (
    <div>
      <section className="relative h-80 w-full overflow-hidden">
        <Image
          src={journey.heroImage}
          alt={journey.title}
          fill
          priority
          sizes="(max-width: 440px) 100vw, 440px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-dark/85 via-ocean-dark/15 to-ocean-dark/30" />

        <Link
          href="/journeys"
          aria-label="Back to journeys"
          className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-cream/85 text-ocean backdrop-blur"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>

        <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {journey.badges.map((b) => (
              <span key={b} className="badge-stamp">
                {b}
              </span>
            ))}
          </div>
          <h1 className="font-serif text-3xl font-medium leading-tight">
            {journey.title}
          </h1>
          <div className="mt-2 flex items-center gap-4 font-sans text-xs text-cream/85">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {journey.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {journey.durationDays} days
            </span>
          </div>
        </div>
      </section>

      <section className="px-5 pt-5">
        <div className="flex flex-wrap gap-1.5">
          {journey.familyFriendly ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-ocean/5 px-3 py-1 font-sans text-[12px] font-medium text-ocean">
              <Users className="h-3.5 w-3.5" /> Family-Friendly
            </span>
          ) : null}
          {journey.dietaryOptions.map((d) => (
            <span
              key={d}
              className="inline-flex items-center gap-1 rounded-full bg-tropical/10 px-3 py-1 font-sans text-[12px] font-medium text-tropical"
            >
              <Leaf className="h-3.5 w-3.5" /> {d}
            </span>
          ))}
        </div>
      </section>

      <section className="px-5 pt-5">
        <p className="font-serif text-lg leading-relaxed text-ocean/85">
          {journey.summary}
        </p>
      </section>

      <section className="px-5 pt-6">
        <TrustBadges />
      </section>

      {routeStops.length > 0 ? (
        <section className="px-5 pt-9">
          <p className="section-eyebrow mb-1">Live Route Map</p>
          <h2 className="mb-4 font-serif text-2xl font-medium text-ocean">
            Where You&apos;ll Go
          </h2>
          <SriLankaMap stops={routeStops} />
        </section>
      ) : null}

      {journey.gallery.length > 0 ? (
        <section className="pt-6">
          <div className="no-scrollbar flex gap-3 overflow-x-auto px-5">
            {journey.gallery.map((src, i) => (
              <div
                key={src}
                className="relative h-40 w-60 shrink-0 overflow-hidden rounded-2xl"
              >
                <Image
                  src={src}
                  alt={`${journey.title} gallery ${i + 1}`}
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="px-5 pt-9">
        <p className="section-eyebrow mb-1">Day by Day</p>
        <h2 className="mb-6 font-serif text-2xl font-medium text-ocean">
          The Itinerary
        </h2>
        <ItineraryTimeline days={itinerary} />
      </section>

      {tiers.length > 0 ? (
        <section className="px-5 pt-9">
          <p className="section-eyebrow mb-1">Compare &amp; Save</p>
          <h2 className="mb-1 font-serif text-2xl font-medium text-ocean">
            Choose Your Experience
          </h2>
          <p className="mb-4 font-sans text-sm text-ocean/60">
            One transparent price. Everything below is included &mdash; no hidden
            extras.
          </p>
          <TierComparison tiers={tiers} journeySlug={journey.slug} />
        </section>
      ) : null}

      <section className="px-5 pt-9">
        <MessageExpert />
      </section>

      <section className="px-5 pt-4">
        <WhatsAppButton
          className="w-full"
          label="Ask on WhatsApp"
          message={`Hi VSL 360, I'm interested in the "${journey.title}" journey. Could you share more details?`}
        />
      </section>

      <section className="px-5 pt-6">
        <div className="flex items-center justify-between rounded-2xl border border-ocean/10 bg-cream p-4">
          <div>
            <p className="font-sans text-xs uppercase tracking-wider text-ocean/55">
              All-inclusive from
            </p>
            <p className="font-serif text-2xl font-semibold text-ocean">
              ${journey.priceFrom.toLocaleString()}
              <span className="font-sans text-xs font-normal text-ocean/55">
                {" "}
                / person
              </span>
            </p>
          </div>
          <Link
            href={`/checkout?journey=${journey.slug}`}
            className="gold-button"
          >
            Plan This Journey <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
