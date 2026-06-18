import Link from "next/link";
import { Check, Star } from "lucide-react";
import type { Tier } from "@/lib/types";

export function TierComparison({
  tiers,
  journeySlug,
}: {
  tiers: Tier[];
  journeySlug: string;
}) {
  if (tiers.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3">
      {tiers.map((tier, i) => {
        const premium = i === tiers.length - 1 && tiers.length > 1;
        return (
          <div
            key={tier.name}
            className={`relative flex flex-col rounded-2xl border bg-cream p-4 ${
              premium ? "border-gold ring-1 ring-gold" : "border-ocean/10"
            }`}
          >
            {premium ? (
              <span className="absolute -top-2.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-gold px-2.5 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wider text-cream">
                <Star className="h-3 w-3" /> Best Value
              </span>
            ) : null}

            <p className="font-sans text-xs font-semibold uppercase tracking-wider text-ocean/55">
              {tier.name}
            </p>
            <p className="mt-1 font-serif text-2xl font-semibold text-ocean">
              ${tier.price.toLocaleString()}
              <span className="font-sans text-[11px] font-normal text-ocean/55">
                {" "}
                /pp
              </span>
            </p>

            <ul className="mt-3 flex-1 space-y-2">
              {tier.perks.map((perk) => (
                <li
                  key={perk}
                  className="flex items-start gap-1.5 font-sans text-[12px] leading-snug text-ocean/75"
                >
                  <Check
                    className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                      premium ? "text-gold" : "text-tropical"
                    }`}
                  />
                  {perk}
                </li>
              ))}
            </ul>

            <Link
              href={`/checkout?journey=${journeySlug}&tier=${encodeURIComponent(
                tier.name,
              )}`}
              className={`mt-4 ${premium ? "gold-button" : "ghost-button"} w-full !px-3 !py-2.5 !text-xs`}
            >
              Choose {tier.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
