"use client";

import { useState } from "react";
import { ChevronDown, Users, Leaf, X, SlidersHorizontal } from "lucide-react";
import { PackageCard } from "@/components/PackageCard";
import type { JourneyCardData, TravelerPersona } from "@/lib/types";
import {
  dietaryOptions,
  durationOptions,
  emptyFilters,
  filterJourneys,
  hasActiveFilters,
  personaOptions,
  type DietaryFilterKey,
  type DurationBucket,
  type PackageFilters,
} from "@/lib/packageFilters";

function activeFilterCount(filters: PackageFilters): number {
  let count = filters.duration !== "all" ? 1 : 0;
  count += filters.personas.size + filters.dietary.size;
  return count;
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-3 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-ocean/45">
        {title}
      </p>
      {children}
    </div>
  );
}

function filterOptionClass(active: boolean) {
  return `flex w-full cursor-pointer items-center rounded-xl border px-3.5 py-3 font-sans text-sm transition-all duration-200 ${
    active
      ? "border-gold/50 bg-gold/10 font-semibold text-ocean shadow-soft"
      : "border-ocean/10 bg-white text-ocean/75 hover:border-ocean/20 hover:bg-ocean/[0.03]"
  }`;
}

function SidebarFilters({
  filters,
  onDurationChange,
  onPersonaToggle,
  onDietaryToggle,
  onClear,
}: {
  filters: PackageFilters;
  onDurationChange: (value: DurationBucket) => void;
  onPersonaToggle: (value: TravelerPersona) => void;
  onDietaryToggle: (key: DietaryFilterKey) => void;
  onClear: () => void;
}) {
  const active = hasActiveFilters(filters);

  return (
    <aside className="space-y-7">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-gold" />
          <p className="font-display text-base font-bold text-ocean">Refine search</p>
        </div>
        {active ? (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1 font-sans text-[11px] font-semibold text-gold transition-colors hover:text-gold-dark"
          >
            <X className="h-3 w-3" /> Clear
          </button>
        ) : null}
      </div>

      <FilterGroup title="Duration">
        <div className="space-y-1.5">
          {durationOptions.map(({ value, label, hint }) => {
            const isActive = filters.duration === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => onDurationChange(value)}
                className={filterOptionClass(isActive)}
              >
                <span
                  className={`mr-3 grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 ${
                    isActive ? "border-gold bg-gold" : "border-ocean/25 bg-white"
                  }`}
                >
                  {isActive ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
                </span>
                <span className="flex flex-1 items-center justify-between gap-2 text-left">
                  <span>{label}</span>
                  {hint ? (
                    <span
                      className={`text-xs font-normal ${isActive ? "text-ocean/55" : "text-ocean/40"}`}
                    >
                      {hint}
                    </span>
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Traveler Persona">
        <div className="space-y-1.5">
          {personaOptions.map(({ value, label }) => {
            const isActive = filters.personas.has(value);
            return (
              <button
                key={value}
                type="button"
                onClick={() => onPersonaToggle(value)}
                className={filterOptionClass(isActive)}
              >
                <span
                  className={`mr-3 grid h-4 w-4 shrink-0 place-items-center rounded border-2 ${
                    isActive ? "border-gold bg-gold text-white" : "border-ocean/25 bg-white"
                  }`}
                >
                  {isActive ? (
                    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" aria-hidden>
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}
                </span>
                <span className="text-left">{label}</span>
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Dietary & Family">
        <div className="space-y-1.5">
          {dietaryOptions.map(({ key, label }) => {
            const isActive = filters.dietary.has(key);
            const Icon = key === "family" ? Users : Leaf;
            return (
              <button
                key={key}
                type="button"
                onClick={() => onDietaryToggle(key)}
                className={filterOptionClass(isActive)}
              >
                <span
                  className={`mr-3 grid h-4 w-4 shrink-0 place-items-center rounded border-2 ${
                    isActive ? "border-gold bg-gold text-white" : "border-ocean/25 bg-white"
                  }`}
                >
                  {isActive ? (
                    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" aria-hidden>
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}
                </span>
                <Icon className="mr-2 h-3.5 w-3.5 text-ocean/45" />
                <span className="text-left">{label}</span>
              </button>
            );
          })}
        </div>
      </FilterGroup>
    </aside>
  );
}

export function PackageCatalog({ journeys }: { journeys: JourneyCardData[] }) {
  const [filters, setFilters] = useState<PackageFilters>(emptyFilters);
  const [mobileDietaryOpen, setMobileDietaryOpen] = useState(false);

  function setDuration(duration: DurationBucket) {
    setFilters((prev) => ({ ...prev, duration }));
  }

  function togglePersona(persona: TravelerPersona) {
    setFilters((prev) => {
      const personas = new Set(prev.personas);
      if (personas.has(persona)) personas.delete(persona);
      else personas.add(persona);
      return { ...prev, personas };
    });
  }

  function toggleDietary(key: DietaryFilterKey) {
    setFilters((prev) => {
      const dietary = new Set(prev.dietary);
      if (dietary.has(key)) dietary.delete(key);
      else dietary.add(key);
      return { ...prev, dietary };
    });
  }

  function clearFilters() {
    setFilters({
      duration: "all",
      personas: new Set(),
      dietary: new Set(),
    });
    setMobileDietaryOpen(false);
  }

  const filtered = filterJourneys(journeys, filters);
  const active = hasActiveFilters(filters);
  const filterCount = activeFilterCount(filters);

  return (
    <div>
      {/* Mobile / tablet filter bar */}
      <div className="sticky top-16 z-20 -mx-5 border-b border-ocean/10 bg-white/95 px-5 py-4 shadow-soft backdrop-blur-md sm:-mx-8 sm:px-8 lg:hidden">
        <div className="mb-2 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-ocean/60">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
            {filterCount > 0 ? (
              <span className="rounded-full bg-gold px-1.5 py-0.5 text-[10px] font-bold text-cream">
                {filterCount}
              </span>
            ) : null}
          </span>
          {active ? (
            <button
              type="button"
              onClick={clearFilters}
              className="font-sans text-xs font-semibold text-gold"
            >
              Clear all
            </button>
          ) : null}
        </div>

        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
          {durationOptions.map(({ value, label, hint }) => {
            const on = filters.duration === value;
            const text = hint && value !== "all" ? `${label} · ${hint}` : label;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setDuration(value)}
                aria-pressed={on}
                className={`inline-flex shrink-0 items-center rounded-full border px-3.5 py-2 font-sans text-xs font-semibold transition-all ${
                  on
                    ? "border-gold bg-gold text-cream shadow-soft"
                    : "border-ocean/12 bg-cream text-ocean/70 hover:border-ocean/25"
                }`}
              >
                {text}
              </button>
            );
          })}
        </div>

        <div className="no-scrollbar mt-2 flex items-center gap-2 overflow-x-auto">
          {personaOptions.map(({ value, label }) => {
            const on = filters.personas.has(value);
            return (
              <button
                key={value}
                type="button"
                onClick={() => togglePersona(value)}
                aria-pressed={on}
                className={`inline-flex shrink-0 items-center rounded-full border px-3.5 py-2 font-sans text-xs font-semibold transition-all ${
                  on
                    ? "border-gold bg-gold text-cream shadow-soft"
                    : "border-ocean/12 bg-cream text-ocean/70 hover:border-ocean/25"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setMobileDietaryOpen((open) => !open)}
          className="mt-3 inline-flex items-center gap-1 font-sans text-xs font-semibold text-ocean/55"
        >
          Dietary & family options
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${mobileDietaryOpen ? "rotate-180" : ""}`}
          />
        </button>

        {mobileDietaryOpen ? (
          <div className="mt-2 flex flex-wrap gap-2 border-t border-ocean/10 pt-3">
            {dietaryOptions.map(({ key, label }) => {
              const on = filters.dietary.has(key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleDietary(key)}
                  aria-pressed={on}
                  className={`inline-flex items-center rounded-full border px-3 py-1.5 font-sans text-xs font-semibold transition-all ${
                    on
                      ? "border-gold bg-gold text-cream"
                      : "border-ocean/12 bg-white text-ocean/70"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[272px_minmax(0,1fr)] lg:gap-12">
        <div className="hidden lg:block">
          <div className="sticky top-24 overflow-hidden rounded-[1.75rem] border border-ocean/10 bg-gradient-to-b from-ocean-tint/80 to-white shadow-card">
            <div className="border-b border-ocean/10 bg-white/60 px-6 py-4">
              <p className="font-sans text-xs text-ocean/50">
                {journeys.length} curated packages
              </p>
            </div>
            <div className="p-6">
              <SidebarFilters
                filters={filters}
                onDurationChange={setDuration}
                onPersonaToggle={togglePersona}
                onDietaryToggle={toggleDietary}
                onClear={clearFilters}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="mb-6 flex items-center justify-between gap-4 border-b border-ocean/10 pb-4">
            <p className="font-sans text-sm text-ocean/60">
              <span className="font-display text-2xl font-bold text-ocean">{filtered.length}</span>
              {" "}
              {filtered.length === 1 ? "package" : "packages"}
              {active ? " match your filters" : " available"}
            </p>
            {active ? (
              <button
                type="button"
                onClick={clearFilters}
                className="hidden items-center gap-1 font-sans text-xs font-semibold text-gold hover:text-gold-dark sm:inline-flex"
              >
                <X className="h-3.5 w-3.5" /> Reset filters
              </button>
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
            {filtered.map((journey) => (
              <PackageCard
                key={journey.id}
                slug={journey.slug}
                title={journey.title}
                location={journey.location}
                durationDays={journey.durationDays}
                heroImage={journey.heroImage}
                badges={journey.badges}
                priceFrom={journey.priceFrom}
                familyFriendly={journey.familyFriendly}
                dietaryOptions={journey.dietaryOptions}
                allInclusive={journey.allInclusive}
              />
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="mt-6 rounded-[1.75rem] border border-dashed border-ocean/20 bg-ocean-tint/30 px-8 py-14 text-center">
              <p className="font-display text-xl font-bold text-ocean">No packages match</p>
              <p className="mx-auto mt-2 max-w-sm font-sans text-sm leading-relaxed text-ocean/55">
                Try removing a filter or browse all packages to find your perfect itinerary.
              </p>
              <button type="button" onClick={clearFilters} className="gold-button mt-6">
                Show all packages
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
