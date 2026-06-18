import Link from "next/link";
import { Check, X } from "lucide-react";
import { TwoTone } from "@/components/TwoTone";

type Tier = {
  name: string;
  tags: string[];
  price: string;
  description: string;
  features: string[];
  included: { label: string; on: boolean }[];
  highlighted?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Flexible Individual Travel",
    tags: ["Best Selling"],
    price: "$1,980",
    description:
      "Perfect for families who want privacy, full flexibility, and specific requirements.",
    features: [
      "Private trip",
      "Fully customised",
      "Private vehicle & driver",
      "Flexibility during travelling",
    ],
    included: [
      { label: "Dedicated Destination Expert", on: true },
      { label: "24/7 global care", on: true },
      { label: "Account Manager", on: true },
    ],
    highlighted: true,
  },
  {
    name: "Small Group Tours",
    tags: ["Group Adventure", "20% Off"],
    price: "$1,490",
    description:
      "Ideal for those who love travelling in small groups, with set plans and dates.",
    features: [
      "Groups of up to 16 people",
      "Fixed plan and fixed dates",
      "Shared transport",
      "No flexibility during travelling",
    ],
    included: [
      { label: "Dedicated Destination Expert", on: true },
      { label: "24/7 global care", on: true },
      { label: "Account Manager", on: false },
    ],
  },
  {
    name: "Holiday Getaways",
    tags: ["Ultimate Relaxing", "30% Off"],
    price: "$1,120",
    description:
      "Ideal for flexible schedules, seeking discounted getaways and shorter distances.",
    features: [
      "Private trip",
      "Fixed travel period",
      "Private vehicle & driver",
      "Discounted prices & offers",
    ],
    included: [
      { label: "Dedicated Destination Expert", on: false },
      { label: "24/7 global care", on: true },
      { label: "Account Manager", on: false },
    ],
  },
];

export function VacationTiers() {
  return (
    <section className="container-page pt-16 lg:pt-24">
      <div className="max-w-2xl">
        <p className="section-eyebrow mb-2">Choose Your Style</p>
        <h2 className="text-3xl leading-tight text-ocean sm:text-4xl">
          <TwoTone text="3 Vacation Options" />
        </h2>
        <p className="mt-3 font-sans text-sm leading-relaxed text-ocean/60 sm:text-base">
          We provide a selection of three tour types to suit your preferences.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`flex flex-col rounded-3xl border p-6 transition-all ${
              tier.highlighted
                ? "border-gold bg-white shadow-card-hover ring-1 ring-gold lg:-translate-y-2"
                : "border-ocean/10 bg-white shadow-card"
            }`}
          >
            <div className="flex flex-wrap gap-2">
              {tier.tags.map((t, i) => (
                <span
                  key={t}
                  className={`rounded-full px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-wider ${
                    i === 0
                      ? "bg-ocean/5 text-ocean"
                      : "bg-gold/15 text-gold-dark"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>

            <h3 className="mt-4 font-display text-2xl font-bold text-ocean">
              {tier.name}
            </h3>
            <p className="mt-2 font-sans text-sm text-ocean/55">
              Starting from{" "}
              <span className="font-display text-xl font-extrabold text-ocean">
                {tier.price}
              </span>{" "}
              pp
            </p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-ocean/60">
              {tier.description}
            </p>

            <ul className="mt-5 space-y-2">
              {tier.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 font-sans text-sm text-ocean/75"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tropical" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-5 space-y-2 border-t border-ocean/10 pt-5">
              {tier.included.map((inc) => (
                <div
                  key={inc.label}
                  className="flex items-center gap-2 font-sans text-sm"
                >
                  {inc.on ? (
                    <Check className="h-4 w-4 shrink-0 text-tropical" />
                  ) : (
                    <X className="h-4 w-4 shrink-0 text-ocean/30" />
                  )}
                  <span className={inc.on ? "text-ocean/75" : "text-ocean/40"}>
                    {inc.label}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/quote"
              className={`mt-6 w-full ${tier.highlighted ? "gold-button" : "ink-button"}`}
            >
              Get a Quote
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
