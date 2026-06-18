import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Star } from "lucide-react";

export function HeroBlock() {
  return (
    <section className="container-page pt-6">
      <div className="block-ocean relative overflow-hidden px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 font-sans text-xs font-semibold text-ocean shadow-soft">
              <Star className="h-3.5 w-3.5 text-gold" /> Rated 4.9 by 2,600+ travelers
            </span>
            <h1 className="mt-5 text-[2.6rem] leading-[1.05] text-ocean sm:text-6xl lg:text-[4.25rem]">
              <span className="font-extrabold">Start</span>
              <span className="font-medium"> Your Holiday Planning Here</span>
            </h1>
            <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-ocean/65 sm:text-lg">
              Connect with a local destination expert online. Authentic,
              all-inclusive Sri Lankan journeys, crafted just for you. Available
              24/7.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="gold-button">
                Get a Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/journeys" className="ink-button">
                <Play className="h-4 w-4 fill-current" /> Explore Journeys
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-72 w-full overflow-hidden rounded-[1.75rem] shadow-card sm:h-96 lg:h-[26rem]">
              <Image
                src="https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=1200&q=80"
                alt="Misty tea hills of Sri Lanka"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden rounded-2xl bg-white p-4 shadow-card-hover sm:block">
              <p className="font-display text-2xl font-extrabold text-ocean">10K+</p>
              <p className="font-sans text-xs text-ocean/55">Happy travelers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
