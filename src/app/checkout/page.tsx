import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CheckoutForm } from "@/components/CheckoutForm";
import { TrustBadges } from "@/components/TrustBadges";
import { getJourneyBySlug, asTiers } from "@/lib/data";
import type { LineItem } from "@/lib/types";

export const dynamic = "force-dynamic";

const TRAVELERS = 2;

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ journey?: string; tier?: string }>;
}) {
  const { journey: slug, tier: tierName } = await searchParams;
  const journey = slug ? await getJourneyBySlug(slug) : null;

  const tiers = journey ? asTiers(journey.tiers) : [];
  const selectedTier =
    tiers.find((t) => t.name === tierName) ?? tiers[0] ?? null;

  const base = selectedTier?.price ?? journey?.priceFrom ?? 2450;
  const title = journey?.title ?? "Custom Journey";
  const days = journey?.durationDays ?? 7;
  const tierLabel = selectedTier ? ` — ${selectedTier.name}` : "";

  // All-inclusive: the per-person price already covers everything.
  // Hidden costs are shown explicitly as "Included" to build trust.
  const subtotal = base * TRAVELERS;
  const total = subtotal;

  const lineItems: LineItem[] = [
    {
      label: `${title}${tierLabel} (${days}d) x ${TRAVELERS}`,
      amount: subtotal,
    },
    { label: "Private guide, transfers & entrance fees", amount: 0 },
    { label: "Taxes & service charges", amount: 0 },
  ];

  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="flex-1">
        <div className="container-narrow pt-10 lg:pt-16">
          <p className="section-eyebrow mb-2">Almost There</p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-ocean sm:text-5xl">
            Review &amp; Confirm
          </h1>
          <p className="mt-3 font-sans text-base leading-relaxed text-ocean/65">
            One all-inclusive price &mdash; absolutely no hidden costs.
          </p>

          <div className="mt-6">
            <TrustBadges />
          </div>

          <div className="mt-8">
            <CheckoutForm
              journeySlug={journey?.slug ?? "custom"}
              journeyTitle={`${title}${tierLabel}`}
              lineItems={lineItems}
              total={total}
            />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
