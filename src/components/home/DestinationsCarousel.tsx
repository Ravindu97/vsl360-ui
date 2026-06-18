"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ExperienceCard } from "@/components/ExperienceCard";
import { TwoTone } from "@/components/TwoTone";
import type { JourneyCardData } from "@/components/JourneyExplorer";

const GAP = 24; // matches mr-6 spacing between cards
const SPEED = 0.6; // px per frame (~36px/s) for a calm, elegant drift

function Card({ j }: { j: JourneyCardData }) {
  return (
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
  );
}

export function DestinationsCarousel({
  journeys,
  eyebrow,
  title,
  viewAllHref,
}: {
  journeys: JourneyCardData[];
  eyebrow?: string;
  title: string;
  viewAllHref?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  // Duplicate the set so the auto-scroll can loop seamlessly.
  const loop = [...journeys, ...journeys];

  const step = useCallback(() => {
    const el = trackRef.current;
    const first = el?.firstElementChild as HTMLElement | null;
    return first ? first.offsetWidth + GAP : 344;
  }, []);

  // Manually advance one card; normalize position first so it never dead-ends.
  const move = useCallback(
    (dir: 1 | -1) => {
      const el = trackRef.current;
      if (!el) return;
      const oneSet = el.scrollWidth / 2;
      if (dir > 0 && el.scrollLeft >= oneSet - 1) el.scrollLeft -= oneSet;
      if (dir < 0 && el.scrollLeft <= 1) el.scrollLeft += oneSet;
      el.scrollBy({ left: dir * step(), behavior: "smooth" });
    },
    [step],
  );

  // Continuous auto-scroll via rAF, paused on hover/touch/hidden/reduced-motion.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const tick = () => {
      if (!pausedRef.current && !document.hidden) {
        const oneSet = el.scrollWidth / 2;
        el.scrollLeft += SPEED;
        if (oneSet > 0 && el.scrollLeft >= oneSet) el.scrollLeft -= oneSet;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  return (
    <div>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          {eyebrow ? <p className="section-eyebrow mb-2">{eyebrow}</p> : null}
          <h2 className="text-3xl leading-tight text-ocean sm:text-4xl">
            <TwoTone text={title} />
          </h2>
        </div>
        {viewAllHref ? (
          <Link
            href={viewAllHref}
            className="shrink-0 font-sans text-sm font-semibold text-tropical transition-colors hover:text-ocean"
          >
            View all
          </Link>
        ) : null}
      </div>

      {/* Desktop: auto-scroll, pause + manual arrows on hover */}
      <div
        className="group relative hidden lg:block"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocusCapture={pause}
        onBlurCapture={resume}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper via-paper/70 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper via-paper/70 to-transparent" />

        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous"
          className="absolute left-3 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-ocean/10 bg-white/95 text-ocean opacity-0 shadow-card transition-all duration-300 hover:bg-ocean hover:text-cream group-hover:opacity-100"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Next"
          className="absolute right-3 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-ocean/10 bg-white/95 text-ocean opacity-0 shadow-card transition-all duration-300 hover:bg-ocean hover:text-cream group-hover:opacity-100"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div
          ref={trackRef}
          className="no-scrollbar flex items-stretch overflow-x-auto py-2"
        >
          {loop.map((j, i) => (
            <div
              key={`${j.id}-${i}`}
              aria-hidden={i >= journeys.length}
              className="mr-6 w-[20rem] shrink-0"
            >
              <Card j={j} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/tablet: native swipe with snap */}
      <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-5 py-2 lg:hidden">
        {journeys.map((j) => (
          <div key={j.id} className="w-[82%] shrink-0 snap-start sm:w-[20rem]">
            <Card j={j} />
          </div>
        ))}
      </div>
    </div>
  );
}
