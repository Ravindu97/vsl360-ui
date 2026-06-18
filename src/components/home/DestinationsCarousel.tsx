import Link from "next/link";
import { ExperienceCard } from "@/components/ExperienceCard";
import { TwoTone } from "@/components/TwoTone";
import type { JourneyCardData } from "@/components/JourneyExplorer";

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
  // Duplicate the set so the marquee can loop seamlessly (translateX -50%).
  const loop = [...journeys, ...journeys];

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

      {/* Desktop: seamless auto-scrolling marquee (pauses on hover) */}
      <div className="relative hidden lg:block">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper via-paper/70 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper via-paper/70 to-transparent" />

        <div className="group overflow-hidden py-2 motion-reduce:overflow-x-auto">
          <div className="no-scrollbar flex w-max animate-marquee items-stretch group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {loop.map((j, i) => (
              <div
                key={`${j.id}-${i}`}
                aria-hidden={i >= journeys.length}
                className="w-[21rem] shrink-0 pr-6"
              >
                <Card j={j} />
              </div>
            ))}
          </div>
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
