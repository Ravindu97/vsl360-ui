"use client";

import { useState } from "react";
import { MapPin, Clock, Navigation } from "lucide-react";
import {
  CITY_COORDS,
  MAP_HEIGHT,
  MAP_WIDTH,
  islandPath,
  project,
} from "@/lib/geo";
import type { RouteStop } from "@/lib/types";

export function SriLankaMap({ stops }: { stops: RouteStop[] }) {
  const [active, setActive] = useState<number | null>(0);

  const points = stops
    .map((s) => {
      const c = CITY_COORDS[s.city];
      if (!c) return null;
      const { x, y } = project(c.lat, c.lng);
      return { ...s, x, y };
    })
    .filter((p): p is RouteStop & { x: number; y: number } => p !== null);

  const routeLine = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  const island = islandPath();
  const activeStop = active !== null ? points[active] : null;

  return (
    <div className="overflow-hidden rounded-2xl border border-ocean/10 bg-cream">
      <div className="flex items-center justify-between border-b border-ocean/10 px-4 py-2.5">
        <p className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-ocean/70">
          <Navigation className="h-3.5 w-3.5 text-tropical" /> Your Route
        </p>
        <p className="font-sans text-[11px] text-ocean/50">
          Tap a stop for details
        </p>
      </div>

      <div className="relative bg-[#eef2f0]">
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          className="mx-auto block h-auto w-full max-w-[280px]"
          role="img"
          aria-label="Map of Sri Lanka showing the journey route"
        >
          <path
            d={island}
            className="fill-tropical/15 stroke-tropical/45"
            strokeWidth={1.2}
          />

          {Object.entries(CITY_COORDS).map(([name, c]) => {
            const { x, y } = project(c.lat, c.lng);
            const onRoute = points.some((p) => p.city === name);
            if (onRoute) return null;
            return (
              <circle key={name} cx={x} cy={y} r={1.6} className="fill-ocean/20" />
            );
          })}

          {routeLine ? (
            <path
              d={routeLine}
              className="route-draw fill-none stroke-gold"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}

          {points.map((p, i) => {
            const isActive = i === active;
            return (
              <g
                key={`${p.city}-${i}`}
                className="cursor-pointer"
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                tabIndex={0}
                onFocus={() => setActive(i)}
                role="button"
                aria-label={`${p.city}: ${p.attraction}`}
              >
                {isActive ? (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={9}
                    className="fill-gold/25 animate-ping"
                    style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                  />
                ) : null}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isActive ? 6 : 4.5}
                  className={isActive ? "fill-gold stroke-cream" : "fill-ocean stroke-cream"}
                  strokeWidth={1.5}
                />
                <text
                  x={p.x}
                  y={p.y + 2.4}
                  textAnchor="middle"
                  className="pointer-events-none fill-cream font-sans"
                  style={{ fontSize: 6, fontWeight: 700 }}
                >
                  {i + 1}
                </text>
                <text
                  x={p.x + 8}
                  y={p.y + 2.5}
                  className="pointer-events-none fill-ocean font-sans"
                  style={{ fontSize: 7, fontWeight: 600 }}
                >
                  {p.city}
                </text>
              </g>
            );
          })}
        </svg>

        {activeStop ? (
          <div
            className="pointer-events-none absolute z-10 w-44 -translate-x-1/2 -translate-y-full"
            style={{
              left: `${(activeStop.x / MAP_WIDTH) * 100}%`,
              top: `${(activeStop.y / MAP_HEIGHT) * 100 - 3}%`,
            }}
          >
            <div className="rounded-xl border border-ocean/10 bg-cream p-2.5 shadow-md">
              <p className="font-serif text-sm font-semibold leading-tight text-ocean">
                {activeStop.city}
              </p>
              <p className="mt-0.5 inline-flex items-center gap-1 font-sans text-[10px] text-tropical">
                <Clock className="h-3 w-3" /> {activeStop.travelTime}
              </p>
              <p className="mt-1 inline-flex items-start gap-1 font-sans text-[11px] leading-snug text-ocean/65">
                <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-gold" />
                {activeStop.attraction}
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <ol className="flex flex-wrap gap-x-2 gap-y-1 px-4 py-3">
        {points.map((p, i) => (
          <li key={`${p.city}-leg-${i}`} className="flex items-center">
            <button
              type="button"
              onClick={() => setActive(i)}
              className={`font-sans text-xs font-medium transition-colors ${
                i === active ? "text-gold" : "text-ocean/60 hover:text-ocean"
              }`}
            >
              {p.city}
            </button>
            {i < points.length - 1 ? (
              <span className="px-1 text-ocean/30">&rarr;</span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
