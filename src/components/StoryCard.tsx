import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

type Props = {
  slug: string;
  title: string;
  author: string;
  location: string;
  heroImage: string;
  excerpt: string;
  readMins: number;
  variant?: "row" | "feature";
};

export function StoryCard({
  slug,
  title,
  author,
  location,
  heroImage,
  excerpt,
  readMins,
  variant = "row",
}: Props) {
  if (variant === "feature") {
    return (
      <Link
        href={`/stories/${slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ocean/10 bg-cream shadow-card card-lift"
      >
        <div className="relative h-52 w-full bg-ocean/5 sm:h-56">
          <Image
            src={heroImage}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="section-eyebrow mb-1">{location}</p>
          <h3 className="font-display text-xl font-bold leading-tight text-ocean">
            {title}
          </h3>
          <p className="mt-1.5 line-clamp-2 font-sans text-sm text-ocean/65">
            {excerpt}
          </p>
          <div className="mt-4 flex items-center gap-3 font-sans text-xs text-ocean/55">
            <span>By {author}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {readMins} min read
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/stories/${slug}`}
      className="group flex gap-3 overflow-hidden rounded-2xl border border-ocean/10 bg-cream p-3 shadow-card card-lift"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-ocean/5">
        <Image
          src={heroImage}
          alt={title}
          fill
          sizes="96px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="section-eyebrow text-[10px]">{location}</p>
        <h3 className="font-display text-base font-bold leading-snug text-ocean">
          {title}
        </h3>
        <div className="mt-1 flex items-center gap-2 font-sans text-[11px] text-ocean/55">
          <span>By {author}</span>
          <span>·</span>
          <span>{readMins} min</span>
        </div>
      </div>
    </Link>
  );
}
