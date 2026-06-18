"use client";

import { useMemo, useState } from "react";
import { Quote, Star, MapPin, CalendarDays } from "lucide-react";
import { reviews, tripTypes, type TripType } from "@/lib/testimonialsData";

const avatarColors = [
  "bg-ocean",
  "bg-tropical",
  "bg-gold-dark",
  "bg-ocean-light",
];

function initials(name: string) {
  const words = name.replace(/^The\s+/i, "").split(/\s+/);
  const letters = words.slice(0, 2).map((w) => w[0]);
  return letters.join("").toUpperCase();
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating ? "fill-gold text-gold" : "text-ocean/20"
          }`}
        />
      ))}
    </div>
  );
}

export function TestimonialsWall() {
  const [active, setActive] = useState<"all" | TripType>("all");

  const filtered = useMemo(
    () =>
      active === "all"
        ? reviews
        : reviews.filter((r) => r.tripType === active),
    [active],
  );

  const tabs: ("all" | TripType)[] = ["all", ...tripTypes];

  return (
    <div>
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => {
          const on = active === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setActive(t)}
              aria-pressed={on}
              className={`shrink-0 rounded-full border px-4 py-2 font-sans text-xs font-semibold capitalize transition-colors ${
                on
                  ? "border-gold bg-gold text-cream"
                  : "border-ocean/15 bg-white text-ocean/70 hover:border-ocean/30"
              }`}
            >
              {t === "all" ? "All Reviews" : t}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r, i) => (
          <figure
            key={`${r.name}-${i}`}
            className="flex flex-col rounded-3xl border border-ocean/10 bg-white p-6 shadow-card card-lift"
          >
            <div className="flex items-center justify-between">
              <Quote className="h-6 w-6 text-gold" />
              <span className="rounded-full bg-ocean/5 px-2.5 py-1 font-sans text-[11px] font-semibold uppercase tracking-wider text-ocean/70">
                {r.tripType}
              </span>
            </div>

            <blockquote className="mt-3 flex-1 font-sans text-sm leading-relaxed text-ocean/75">
              {r.quote}
            </blockquote>

            <div className="mt-5 flex items-center gap-3 border-t border-ocean/10 pt-4">
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-sm font-bold text-cream ${
                  avatarColors[i % avatarColors.length]
                }`}
              >
                {initials(r.name)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-bold text-ocean">
                  {r.name}
                </p>
                <p className="inline-flex items-center gap-1 font-sans text-[11px] text-ocean/55">
                  <MapPin className="h-3 w-3" /> {r.country}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <Stars rating={r.rating} />
              <span className="inline-flex items-center gap-1 font-sans text-[11px] text-ocean/45">
                <CalendarDays className="h-3 w-3" /> Travelled {r.travelDate}
              </span>
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}
