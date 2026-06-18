"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { videos } from "@/lib/testimonialsData";

export function VideoTestimonials() {
  // Track which videos have been activated; iframes mount only after click (lazy).
  const [active, setActive] = useState<Set<string>>(new Set());

  const activate = (id: string) =>
    setActive((prev) => new Set(prev).add(id));

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((v) => {
        const isActive = active.has(v.youtubeId);
        return (
          <div
            key={v.youtubeId}
            className="overflow-hidden rounded-3xl border border-ocean/10 bg-white shadow-card"
          >
            <div className="relative aspect-video w-full bg-ocean">
              {isActive ? (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?autoplay=1&rel=0`}
                  title={v.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => activate(v.youtubeId)}
                  aria-label={`Play video: ${v.title}`}
                  className="group absolute inset-0 grid place-items-center bg-gradient-to-br from-ocean to-ocean-dark"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-white/95 text-gold shadow-card-hover transition-transform duration-300 group-hover:scale-110">
                    <Play className="ml-1 h-7 w-7 fill-current" />
                  </span>
                  <span className="absolute bottom-3 left-3 rounded-full bg-black/30 px-3 py-1 font-sans text-[11px] font-semibold text-white backdrop-blur">
                    Watch story
                  </span>
                </button>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-display text-base font-bold text-ocean">
                {v.title}
              </h3>
              <p className="mt-1 font-sans text-xs text-ocean/55">
                {v.author} &middot; {v.location}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
