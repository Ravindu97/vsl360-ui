"use client";

import { useState } from "react";
import { Users, Leaf } from "lucide-react";
import { ExperienceCard } from "@/components/ExperienceCard";

export type JourneyCardData = {
  id: string;
  slug: string;
  title: string;
  location: string;
  durationDays: number;
  heroImage: string;
  badges: string[];
  priceFrom: number;
  familyFriendly: boolean;
  dietaryOptions: string[];
  allInclusive: boolean;
};

type FilterKey = "family" | "Veg" | "Jain" | "Halal";

const filters: { key: FilterKey; label: string; Icon: typeof Users }[] = [
  { key: "family", label: "Family-Friendly", Icon: Users },
  { key: "Veg", label: "Veg", Icon: Leaf },
  { key: "Jain", label: "Jain", Icon: Leaf },
  { key: "Halal", label: "Halal", Icon: Leaf },
];

export function JourneyExplorer({ journeys }: { journeys: JourneyCardData[] }) {
  const [active, setActive] = useState<Set<FilterKey>>(new Set());

  function toggle(key: FilterKey) {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const filtered = journeys.filter((j) => {
    for (const key of active) {
      if (key === "family") {
        if (!j.familyFriendly) return false;
      } else if (!j.dietaryOptions.includes(key)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
        {filters.map(({ key, label, Icon }) => {
          const on = active.has(key);
          return (
            <button
              key={key}
              type="button"
              onClick={() => toggle(key)}
              aria-pressed={on}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-sans text-xs font-semibold transition-colors ${
                on
                  ? "border-gold bg-gold text-cream"
                  : "border-ocean/15 bg-cream text-ocean/70 hover:border-ocean/30"
              }`}
            >
              <Icon className="h-3.5 w-3.5" /> {label}
            </button>
          );
        })}
      </div>

      <p className="mt-3 font-sans text-xs text-ocean/55">
        {filtered.length} {filtered.length === 1 ? "journey" : "journeys"}
        {active.size > 0 ? " match your filters" : " available"}
      </p>

      <div className="mt-4 space-y-5">
        {filtered.map((j) => (
          <ExperienceCard
            key={j.id}
            slug={j.slug}
            title={j.title}
            location={j.location}
            durationDays={j.durationDays}
            heroImage={j.heroImage}
            badges={j.badges}
            priceFrom={j.priceFrom}
            familyFriendly={j.familyFriendly}
            dietaryOptions={j.dietaryOptions}
            allInclusive={j.allInclusive}
          />
        ))}

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ocean/20 bg-cream p-8 text-center">
            <p className="font-serif text-lg text-ocean">No matches</p>
            <p className="mt-1 font-sans text-sm text-ocean/55">
              Try removing a filter to see more journeys.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
