import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Users, Leaf } from "lucide-react";

type Props = {
  slug: string;
  title: string;
  location: string;
  durationDays: number;
  heroImage: string;
  badges: string[];
  priceFrom: number;
  variant?: "large" | "compact";
  familyFriendly?: boolean;
  dietaryOptions?: string[];
  allInclusive?: boolean;
};

export function ExperienceCard({
  slug,
  title,
  location,
  durationDays,
  heroImage,
  badges,
  priceFrom,
  variant = "large",
  familyFriendly = false,
  dietaryOptions = [],
  allInclusive = false,
}: Props) {
  const heightClass = variant === "large" ? "h-64" : "h-56";
  return (
    <Link
      href={`/journeys/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ocean/10 bg-cream shadow-card card-lift"
    >
      <div className={`relative ${heightClass} w-full shrink-0 bg-ocean/5`}>
        <Image
          src={heroImage}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-dark/85 via-ocean-dark/10 to-transparent" />

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {badges.map((b) => (
            <span key={b} className="badge-stamp">
              {b}
            </span>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 text-cream">
          <h3 className="line-clamp-1 font-display text-xl font-bold leading-tight">
            {title}
          </h3>
          <div className="mt-1.5 flex items-center gap-3 font-sans text-xs text-cream/85">
            <span className="inline-flex min-w-0 items-center gap-1">
              <MapPin className="h-3.5 w-3.5 shrink-0" />{" "}
              <span className="truncate">{location}</span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {durationDays} days
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        {familyFriendly || dietaryOptions.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {familyFriendly ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-ocean/5 px-2.5 py-1 font-sans text-[11px] font-medium text-ocean">
                <Users className="h-3 w-3" /> Family-Friendly
              </span>
            ) : null}
            {dietaryOptions.map((d) => (
              <span
                key={d}
                className="inline-flex items-center gap-1 rounded-full bg-tropical/10 px-2.5 py-1 font-sans text-[11px] font-medium text-tropical"
              >
                <Leaf className="h-3 w-3" /> {d}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-auto flex items-end justify-between pt-4">
          <span className="font-sans text-xs uppercase tracking-wider text-ocean/55">
            {allInclusive ? "All-inclusive from" : "From"}
          </span>
          <span className="font-display text-lg font-bold text-ocean">
            ${priceFrom.toLocaleString()}
            <span className="font-sans text-xs font-normal text-ocean/55">
              {" "}
              / person
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
