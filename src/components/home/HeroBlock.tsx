import { Star } from "lucide-react";
import { ItineraryWizard } from "./ItineraryWizard";

export function HeroBlock() {
  return (
    <section className="container-page pt-6">
      <div className="block-ocean relative overflow-hidden px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="lg:pt-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 font-sans text-xs font-semibold text-ocean shadow-soft">
              <Star className="h-3.5 w-3.5 text-gold" /> Rated 4.9 by 2,600+ travelers
            </span>
            <h1 className="mt-5 text-[2.4rem] leading-[1.05] text-ocean sm:text-5xl lg:text-[3.5rem]">
              <span className="font-extrabold">Design</span>
              <span className="font-medium"> Your Sri Lankan Journey</span>
            </h1>
            <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-ocean/65 sm:text-lg">
              Build a custom itinerary in minutes. Our verified local experts craft
              all-inclusive routes tailored to your dates, style, and budget — with
              24/7 on-ground support.
            </p>
            <ul className="mt-6 space-y-2">
              {[
                "Free consultation — no obligation",
                "Response within 12 hours",
                "Transparent, all-inclusive pricing",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 font-sans text-sm text-ocean/70"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full">
            <ItineraryWizard />
          </div>
        </div>
      </div>
    </section>
  );
}
