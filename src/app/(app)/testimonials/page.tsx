import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { TwoTone } from "@/components/TwoTone";
import { Reveal } from "@/components/Reveal";
import { TestimonialsWall } from "@/components/TestimonialsWall";
import { VideoTestimonials } from "@/components/VideoTestimonials";
import { WhatsAppButton } from "@/components/WhatsApp";
import { aggregate, reviews } from "@/lib/testimonialsData";

export const metadata = {
  title: "Traveler Testimonials — VSL 360",
  description:
    "Verified reviews and video testimonials from VSL 360 travelers across families, luxury, honeymoon, adventure, and wellness journeys.",
};

const platforms = [
  { name: "Tripadvisor", count: "1,306" },
  { name: "Google", count: "1,068" },
  { name: "Facebook", count: "280" },
];

function ReviewSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "VSL 360",
    description:
      "A Sri Lankan travel curator offering authentic, all-inclusive journeys.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: aggregate.ratingValue,
      reviewCount: aggregate.reviewCount,
      bestRating: aggregate.bestRating,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      datePublished: r.isoDate,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
      },
      reviewBody: r.quote,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function TestimonialsPage() {
  return (
    <div>
      <ReviewSchema />

      {/* Header */}
      <section className="container-page pt-6 lg:pt-10">
        <div className="block-tropical px-6 py-10 text-center sm:px-10 lg:py-14">
          <p className="section-eyebrow mb-2">Social Proof</p>
          <h1 className="mx-auto max-w-2xl text-4xl leading-tight text-ocean sm:text-5xl">
            <TwoTone text="Loved by Travelers" />
          </h1>

          <div className="mt-5 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-soft">
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </span>
              <span className="font-display text-sm font-bold text-ocean">
                {aggregate.ratingValue}
              </span>
              <span className="font-sans text-xs text-ocean/55">
                from {aggregate.reviewCount.toLocaleString()}+ reviews
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {platforms.map((p) => (
                <div
                  key={p.name}
                  className="rounded-2xl bg-white px-4 py-2 text-center shadow-soft"
                >
                  <span className="font-display text-base font-extrabold text-ocean">
                    {p.count}
                  </span>{" "}
                  <span className="font-sans text-[11px] text-ocean/55">
                    {p.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Review wall */}
      <Reveal as="section" className="container-page pt-14 lg:pt-20">
        <div className="mb-7">
          <p className="section-eyebrow mb-2">Verified Reviews</p>
          <h2 className="text-3xl leading-tight text-ocean sm:text-4xl">
            <TwoTone text="What Travelers Say" />
          </h2>
          <p className="mt-3 font-sans text-sm text-ocean/60">
            Filter by trip type to find stories like the journey you have in mind.
          </p>
        </div>
        <TestimonialsWall />
      </Reveal>

      {/* Video testimonials */}
      <Reveal as="section" className="container-page pt-16 lg:pt-24">
        <div className="mb-7">
          <p className="section-eyebrow mb-2">In Their Words</p>
          <h2 className="text-3xl leading-tight text-ocean sm:text-4xl">
            <TwoTone text="Video Testimonials" />
          </h2>
          <p className="mt-3 font-sans text-sm text-ocean/60">
            Hear travelers share their experiences. Videos load only when you
            press play.
          </p>
        </div>
        <VideoTestimonials />
      </Reveal>

      {/* CTA */}
      <Reveal as="section" className="container-page pt-16 lg:pt-24">
        <div className="flex flex-col items-center gap-5 rounded-3xl bg-ocean px-6 py-12 text-center text-cream sm:px-12 lg:py-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Your story could be next
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-cream/85 sm:text-base">
              Join thousands of happy travelers. Get three personalised,
              all-inclusive quotes &mdash; free of charge.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/quote" className="gold-button">
              Get a Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <WhatsAppButton
              message="Hi VSL 360, I read your reviews and I'd like a quote."
              label="Chat on WhatsApp"
            />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
