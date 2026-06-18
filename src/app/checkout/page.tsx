import { FormHeader } from "@/components/FormHeader";
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
      <FormHeader title="Secure Checkout" />
      <main className="px-5 pb-16 pt-6">
        <p className="section-eyebrow mb-1">Almost There</p>
        <h1 className="font-serif text-3xl font-medium leading-tight text-ocean">
          Review &amp; Confirm
        </h1>
        <p className="mt-2 font-sans text-sm leading-relaxed text-ocean/65">
          One all-inclusive price &mdash; absolutely no hidden costs.
        </p>

        <div className="mt-5">
          <TrustBadges />
        </div>

        <div className="mt-7">
          <CheckoutForm
            journeySlug={journey?.slug ?? "custom"}
            journeyTitle={`${title}${tierLabel}`}
            lineItems={lineItems}
            total={total}
          />
        </div>
      </main>
    </div>
  );
}
