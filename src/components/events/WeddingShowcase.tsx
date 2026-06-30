import Image from "next/image";
import { MapPin } from "lucide-react";
import { weddingVenues } from "@/lib/eventsData";

export function WeddingShowcase() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
      {weddingVenues.map((venue) => (
        <article
          key={venue.id}
          className="group overflow-hidden rounded-[1.75rem] border border-ocean/10 bg-white shadow-card card-lift"
        >
          <div className="relative h-56 overflow-hidden bg-ocean-tint sm:h-64">
            <Image
              src={venue.image}
              alt={venue.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 font-sans text-xs font-semibold text-ocean backdrop-blur">
              <MapPin className="h-3.5 w-3.5 text-gold" />
              {venue.region}
            </span>
          </div>
          <div className="p-6 lg:p-8">
            <h3 className="font-display text-2xl font-bold text-ocean">{venue.title}</h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-ocean/65">
              {venue.description}
            </p>
            <ul className="mt-4 space-y-2">
              {venue.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 font-sans text-sm text-ocean/70"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
