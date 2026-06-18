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
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[360px] w-full overflow-hidden lg:h-[62vh]">
        <Image
          src={journey.heroImage}
          alt={journey.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-dark/85 via-ocean-dark/20 to-ocean-dark/40" />

        <div className="container-page relative h-full">
          <Link
            href="/journeys"
            aria-label="Back to journeys"
            className="absolute left-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-cream/85 text-ocean backdrop-blur transition-colors hover:bg-cream sm:left-8"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div className="absolute inset-x-0 bottom-0 px-5 pb-8 text-cream sm:px-8">
            <div className="mb-3 flex flex-wrap gap-1.5">
              {journey.badges.map((b) => (
                <span key={b} className="badge-stamp">
                  {b}
                </span>
              ))}
            </div>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {journey.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 font-sans text-sm text-cream/85">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {journey.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {journey.durationDays} days
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page pt-10 lg:pt-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
          {/* Main column */}
          <div className="lg:col-span-2">
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

            <p className="mt-5 font-serif text-xl leading-relaxed text-ocean/85 sm:text-2xl">
              {journey.summary}
            </p>

            {routeStops.length > 0 ? (
              <div className="mt-10">
                <p className="section-eyebrow mb-1">Live Route Map</p>
                <h2 className="mb-4 font-serif text-2xl font-medium text-ocean sm:text-3xl">
                  Where You&apos;ll Go
                </h2>
                <SriLankaMap stops={routeStops} />
              </div>
            ) : null}

            {journey.gallery.length > 0 ? (
              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {journey.gallery.map((src, i) => (
                  <div
                    key={src}
                    className={`relative overflow-hidden rounded-2xl ${
                      i === 0 ? "col-span-2 h-56 sm:col-span-3 sm:h-72" : "h-40"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${journey.title} gallery ${i + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-10">
              <p className="section-eyebrow mb-1">Day by Day</p>
              <h2 className="mb-6 font-serif text-2xl font-medium text-ocean sm:text-3xl">
                The Itinerary
              </h2>
              <ItineraryTimeline days={itinerary} />
            </div>

            {tiers.length > 0 ? (
              <div className="mt-10">
                <p className="section-eyebrow mb-1">Compare &amp; Save</p>
                <h2 className="mb-1 font-serif text-2xl font-medium text-ocean sm:text-3xl">
                  Choose Your Experience
                </h2>
                <p className="mb-5 font-sans text-sm text-ocean/60">
                  One transparent price. Everything below is included &mdash; no
                  hidden extras.
                </p>
                <TierComparison tiers={tiers} journeySlug={journey.slug} />
              </div>
            ) : null}
          </div>

          {/* Sticky booking card */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-5">
              <div className="surface-card p-5">
                <p className="font-sans text-xs uppercase tracking-wider text-ocean/55">
                  All-inclusive from
                </p>
                <p className="mt-1 font-serif text-3xl font-semibold text-ocean">
                  ${journey.priceFrom.toLocaleString()}
                  <span className="font-sans text-sm font-normal text-ocean/55">
                    {" "}
                    / person
                  </span>
                </p>
                <Link
                  href={`/checkout?journey=${journey.slug}`}
                  className="gold-button mt-4 w-full"
                >
                  Plan This Journey <ArrowRight className="h-4 w-4" />
                </Link>
                <WhatsAppButton
                  className="mt-3 w-full"
                  label="Ask on WhatsApp"
                  message={`Hi VSL 360, I'm interested in the "${journey.title}" journey. Could you share more details?`}
                />
                <div className="mt-5 border-t border-ocean/10 pt-5">
                  <TrustBadges />
                </div>
              </div>

              <MessageExpert />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
