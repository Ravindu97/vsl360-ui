import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Users, Leaf, ArrowRight, BadgeCheck } from "lucide-react";

type Props = {
  slug: string;
  title: string;
  location: string;
  durationDays: number;
  heroImage: string;
  badges: string[];
  priceFrom: number;
  familyFriendly?: boolean;
  dietaryOptions?: string[];
  allInclusive?: boolean;
};

export function PackageCard({
  slug,
  title,
  location,
  durationDays,
  heroImage,
  badges,
  priceFrom,
  familyFriendly = false,
  dietaryOptions = [],
  allInclusive = false,
}: Props) {
  const quoteHref = `/quote?destination=${encodeURIComponent(title)}`;
  const primaryBadge = badges[0];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ocean/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      {/* Image banner */}
      <div className="relative h-52 w-full shrink-0 overflow-hidden bg-ocean-tint sm:h-56">
        <Image
          src={heroImage}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-ink/10" />

        {primaryBadge ? (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-ocean shadow-soft backdrop-blur">
            {primaryBadge}
          </span>
        ) : null}

        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-ink/80 px-3 py-1 font-sans text-[11px] font-semibold text-cream backdrop-blur">
          <Clock className="h-3 w-3 text-gold" />
          {durationDays} {durationDays === 1 ? "Day" : "Days"}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div>
          <h3 className="line-clamp-2 font-display text-lg font-bold leading-snug text-ocean transition-colors group-hover:text-gold-dark">
            {title}
          </h3>
          <p className="mt-1.5 inline-flex min-w-0 items-center gap-1.5 font-sans text-xs text-ocean/55">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-gold" />
            <span className="truncate">{location}</span>
          </p>
        </div>

        {(familyFriendly || dietaryOptions.length > 0) && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {familyFriendly ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-ocean/10 bg-ocean-tint/60 px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-wide text-ocean/70">
                <Users className="h-3 w-3" /> Family
              </span>
            ) : null}
            {dietaryOptions.map((d) => (
              <span
                key={d}
                className="inline-flex items-center gap-1 rounded-full border border-tropical/15 bg-tropical/5 px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-wide text-tropical"
              >
                <Leaf className="h-3 w-3" /> {d}
              </span>
            ))}
          </div>
        )}

        {/* Pricing block */}
        <div className="mt-5 rounded-2xl bg-ocean-tint/50 px-4 py-3.5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-ocean/50">
                {allInclusive ? "All-inclusive from" : "From"}
              </p>
              <p className="mt-0.5 font-display text-2xl font-bold leading-none text-ocean">
                ${priceFrom.toLocaleString()}
                <span className="ml-1 font-sans text-xs font-medium text-ocean/45">/ person</span>
              </p>
            </div>
            {allInclusive ? (
              <span className="hidden shrink-0 items-center gap-1 rounded-full bg-white px-2.5 py-1 font-sans text-[10px] font-semibold text-tropical sm:inline-flex">
                <BadgeCheck className="h-3 w-3" /> No hidden fees
              </span>
            ) : null}
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-5 flex gap-2.5">
          <Link
            href={`/journeys/${slug}`}
            className="flex flex-1 items-center justify-center rounded-full border border-ocean/20 bg-white px-4 py-2.5 font-sans text-xs font-semibold text-ocean transition-all hover:border-ocean/40 hover:bg-ocean/5 sm:text-sm"
          >
            View Itinerary
          </Link>
          <Link
            href={quoteHref}
            className="gold-button flex flex-1 !px-4 !py-2.5 text-xs sm:text-sm"
          >
            Book / Inquiry
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
