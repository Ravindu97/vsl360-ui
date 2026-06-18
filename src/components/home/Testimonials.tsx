import Link from "next/link";
import { Quote, Star, ArrowRight } from "lucide-react";
import { TwoTone } from "@/components/TwoTone";

const platforms = [
  { name: "Tripadvisor", count: "1,306" },
  { name: "Google", count: "1,068" },
  { name: "Facebook", count: "280" },
];

const reviews = [
  {
    name: "Aarav Mehta",
    location: "Mumbai, India",
    text: "From the very first call, our expert designed a flawless 8-day itinerary. Veg and Jain meals were arranged everywhere, transfers were seamless, and the leopard safari was unforgettable. Worth every rupee.",
  },
  {
    name: "Sharanya Iyer",
    location: "Bengaluru, India",
    text: "The transparency won me over — one all-inclusive price, no surprises. Our destination expert was on WhatsApp the entire trip. Truly high-touch, premium service.",
  },
];

export function Testimonials() {
  return (
    <section className="container-page pt-16 lg:pt-24">
      <div className="block-tropical p-6 sm:p-10 lg:p-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <p className="section-eyebrow mb-2">What Travelers Say</p>
            <h2 className="text-3xl leading-tight text-ocean sm:text-4xl">
              <TwoTone text="People Say" />
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-ocean/60">
              Loved by travelers and collected via verified online reviews and
              success stories.
            </p>

            <div className="mt-7 grid grid-cols-3 gap-3">
              {platforms.map((p) => (
                <div
                  key={p.name}
                  className="rounded-2xl bg-white p-3 text-center shadow-soft"
                >
                  <p className="font-display text-lg font-extrabold text-ocean">
                    {p.count}
                  </p>
                  <p className="font-sans text-[11px] text-ocean/55">{p.name}</p>
                </div>
              ))}
            </div>

            <Link
              href="/testimonials"
              className="mt-6 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-tropical transition-colors hover:text-ocean"
            >
              Read all reviews <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-8">
            {reviews.map((r) => (
              <figure
                key={r.name}
                className="flex flex-col rounded-3xl bg-white p-6 shadow-card"
              >
                <Quote className="h-6 w-6 text-gold" />
                <blockquote className="mt-3 flex-1 font-sans text-sm leading-relaxed text-ocean/75">
                  {r.text}
                </blockquote>
                <figcaption className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="font-display text-sm font-bold text-ocean">
                      {r.name}
                    </p>
                    <p className="font-sans text-xs text-ocean/50">
                      {r.location}
                    </p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
