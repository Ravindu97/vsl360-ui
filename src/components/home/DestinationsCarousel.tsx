"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ExperienceCard } from "@/components/ExperienceCard";
import type { JourneyCardData } from "@/components/JourneyExplorer";

export function DestinationsCarousel({
  journeys,
}: {
  journeys: JourneyCardData[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="absolute -top-14 right-0 hidden gap-2 sm:flex">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Previous"
          className="grid h-11 w-11 place-items-center rounded-full border border-ocean/15 bg-white text-ocean transition-colors hover:bg-ocean hover:text-cream"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Next"
          className="grid h-11 w-11 place-items-center rounded-full border border-ocean/15 bg-white text-ocean transition-colors hover:bg-ocean hover:text-cream"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0"
      >
        {journeys.map((j) => (
          <div
            key={j.id}
            className="w-[78%] shrink-0 snap-start sm:w-[20rem]"
          >
            <ExperienceCard
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
          </div>
        ))}
      </div>
    </div>
  );
}
