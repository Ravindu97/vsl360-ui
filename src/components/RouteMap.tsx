"use client";

import dynamic from "next/dynamic";
import { Navigation, Loader2 } from "lucide-react";
import type { RouteStop } from "@/lib/types";

const Map = dynamic(() => import("./RouteMapImpl"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-ocean/5">
      <span className="inline-flex items-center gap-2 font-sans text-sm text-ocean/50">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading map...
      </span>
    </div>
  ),
});

export function RouteMap({ stops }: { stops: RouteStop[] }) {
  return (
    <div className="isolate overflow-hidden rounded-2xl border border-ocean/10 bg-white shadow-card">
      <div className="flex items-center justify-between border-b border-ocean/10 px-4 py-2.5">
        <p className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-ocean/70">
          <Navigation className="h-3.5 w-3.5 text-tropical" /> Your Route
        </p>
        <p className="font-sans text-[11px] text-ocean/50">Drag &amp; zoom to explore</p>
      </div>

      <div className="relative z-0 h-80 w-full sm:h-96">
        <Map stops={stops} />
      </div>

      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 px-4 py-3">
        {stops.map((s, i) => (
          <li key={`${s.city}-${i}`} className="flex items-center">
            <span
              className={`font-sans text-xs font-medium ${
                i === 0 ? "text-gold" : "text-ocean/65"
              }`}
            >
              {s.city}
            </span>
            {i < stops.length - 1 ? (
              <span className="px-1 text-ocean/30">&rarr;</span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
