import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { TwoTone } from "@/components/TwoTone";
import { sriLankaDestinations } from "@/lib/destinationsData";

export function DestinationsGrid() {
  return (
    <section className="container-page pt-16 lg:pt-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="section-eyebrow mb-2">Explore Sri Lanka</p>
        <h2 className="text-3xl leading-tight text-ocean sm:text-4xl">
          <TwoTone text="Main Destinations" />
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed text-ocean/65">
          From ancient fortresses to leopard country and golden beaches — discover
          the regions that define the island.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sriLankaDestinations.map((dest, i) => (
          <Link
            key={dest.id}
            href={dest.href}
            className={`group overflow-hidden rounded-[1.75rem] border border-ocean/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${
              i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
            }`}
          >
            <div className="relative h-48 overflow-hidden bg-ocean-tint sm:h-52">
              <Image
                src={dest.image}
                alt={dest.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-ocean backdrop-blur">
                {dest.subtitle}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display text-xl font-bold text-ocean transition-colors group-hover:text-gold-dark">
                {dest.title}
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ocean/60">
                {dest.description}
              </p>
              <ul className="mt-3 space-y-1">
                {dest.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-center gap-1.5 font-sans text-xs text-ocean/55"
                  >
                    <MapPin className="h-3 w-3 shrink-0 text-gold" />
                    {h}
                  </li>
                ))}
              </ul>
              <span className="mt-4 inline-flex items-center gap-1 font-sans text-xs font-semibold text-gold">
                View packages <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href="/journeys" className="ink-button">
          All Tour Packages <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
