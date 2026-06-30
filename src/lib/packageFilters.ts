import type { JourneyCardData, TravelerPersona } from "@/lib/types";

export type DurationBucket = "all" | "short" | "classic" | "inDepth";

export type DietaryFilterKey = "family" | "Veg" | "Jain" | "Halal";

export type PackageFilters = {
  duration: DurationBucket;
  personas: Set<TravelerPersona>;
  dietary: Set<DietaryFilterKey>;
};

export const durationOptions: { value: DurationBucket; label: string; hint: string }[] = [
  { value: "all", label: "All Durations", hint: "" },
  { value: "short", label: "Short Breaks", hint: "1–4 Days" },
  { value: "classic", label: "Classic Highlights", hint: "5–9 Days" },
  { value: "inDepth", label: "In-Depth Exploration", hint: "10+ Days" },
];

export const personaOptions: { value: TravelerPersona; label: string }[] = [
  { value: "FAMILY", label: "Family Escapes" },
  { value: "HONEYMOON", label: "Honeymoon / Romantic" },
  { value: "ADVENTURE", label: "Adventure Seekers" },
  { value: "SOLO", label: "Solo Expeditions" },
];

export const dietaryOptions: { key: DietaryFilterKey; label: string }[] = [
  { key: "family", label: "Family-Friendly" },
  { key: "Veg", label: "Veg" },
  { key: "Jain", label: "Jain" },
  { key: "Halal", label: "Halal" },
];

export function getDurationBucket(days: number): Exclude<DurationBucket, "all"> {
  if (days <= 4) return "short";
  if (days <= 9) return "classic";
  return "inDepth";
}

export function filterJourneys(
  journeys: JourneyCardData[],
  filters: PackageFilters,
): JourneyCardData[] {
  return journeys.filter((journey) => {
    if (filters.duration !== "all") {
      if (getDurationBucket(journey.durationDays) !== filters.duration) return false;
    }

    for (const persona of filters.personas) {
      if (!journey.personas.includes(persona)) return false;
    }

    for (const key of filters.dietary) {
      if (key === "family") {
        if (!journey.familyFriendly) return false;
      } else if (!journey.dietaryOptions.includes(key)) {
        return false;
      }
    }

    return true;
  });
}

export function hasActiveFilters(filters: PackageFilters): boolean {
  return (
    filters.duration !== "all" ||
    filters.personas.size > 0 ||
    filters.dietary.size > 0
  );
}

export const emptyFilters: PackageFilters = {
  duration: "all",
  personas: new Set(),
  dietary: new Set(),
};
