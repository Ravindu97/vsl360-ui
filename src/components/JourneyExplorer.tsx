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
      <div className="sticky top-16 z-20 -mx-5 bg-paper/85 px-5 py-3 backdrop-blur-sm sm:-mx-8 sm:px-8 lg:top-[72px]">
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto">
          <span className="hidden shrink-0 pr-1 font-sans text-xs font-semibold uppercase tracking-wider text-ocean/50 sm:inline">
            Filter:
          </span>
          {filters.map(({ key, label, Icon }) => {
            const on = active.has(key);
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggle(key)}
                aria-pressed={on}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 font-sans text-xs font-semibold transition-colors ${
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
      </div>

      <p className="mt-4 font-sans text-xs text-ocean/55">
        {filtered.length} {filtered.length === 1 ? "journey" : "journeys"}
        {active.size > 0 ? " match your filters" : " available"}
      </p>

      <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      </div>

      {filtered.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-ocean/20 bg-cream p-8 text-center">
          <p className="font-serif text-lg text-ocean">No matches</p>
          <p className="mt-1 font-sans text-sm text-ocean/55">
            Try removing a filter to see more journeys.
          </p>
        </div>
      ) : null}
    </div>
  );
}
