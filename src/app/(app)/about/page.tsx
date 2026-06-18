import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Award,
  HeartHandshake,
  Leaf,
  BadgeCheck,
} from "lucide-react";
import { TwoTone } from "@/components/TwoTone";
import { Reveal } from "@/components/Reveal";
import { StatsBand } from "@/components/home/StatsBand";
import { WhatsAppButton } from "@/components/WhatsApp";

export const metadata = {
  title: "About Us — VSL 360",
  description:
    "VSL 360 is a Sri Lankan travel curator connecting travelers with local destination experts for authentic, all-inclusive journeys.",
};

const values = [
  {
    Icon: ShieldCheck,
    title: "Reliability",
    body: "Dependable planning and a 24/7 on-ground support desk, so every detail is handled before and during your journey.",
  },
  {
    Icon: Award,
    title: "High Service Standards",
    body: "Verified local experts, hand-picked stays, and a high-touch, concierge approach from first quote to homecoming.",
  },
  {
    Icon: HeartHandshake,
    title: "Supporting Local Communities",
    body: "We work with local guides, family-run stays, and artisans, ensuring tourism benefits the communities you visit.",
  },
  {
    Icon: Leaf,
    title: "Sustainable Tourism",
    body: "Low-impact, responsible itineraries that protect Sri Lanka's landscapes, wildlife, and heritage for the future.",
  },
];

const accreditations = [
  "Sri Lanka Tourism Board Licensed",
  "IATA Accredited",
  "Civil Aviation Authority Approved",
  "Secure PCI-DSS Payments",
];

export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <section className="container-page pt-6 lg:pt-10">
        <div className="block-ocean px-6 py-10 text-center sm:px-10 lg:py-16">
          <p className="section-eyebrow mb-2">Our Story</p>
          <h1 className="mx-auto max-w-3xl text-4xl leading-tight text-ocean sm:text-5xl lg:text-6xl">
            <TwoTone text="Crafting Authentic Sri Lankan Journeys" />
          </h1>
          <p className="mx-auto mt-4 max-w-xl font-sans text-base leading-relaxed text-ocean/65">
            We connect travelers with verified local destination experts to
            design warm, immersive, all-inclusive journeys across the island.
          </p>
        </div>
      </section>

      {/* Company profile narrative */}
      <Reveal as="section" className="container-page pt-16 lg:pt-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="section-eyebrow mb-2">Who We Are</p>
            <h2 className="text-3xl leading-tight text-ocean sm:text-4xl">
              <TwoTone text="Local Expertise, Global Standards" />
            </h2>
            <div className="mt-5 space-y-4 font-sans text-base leading-relaxed text-ocean/70">
              <p>
                VSL 360 was founded on a simple belief: the best journeys are
                built by people who know the land intimately. What began as a
                small team of Sri Lankan destination experts has grown into a
                trusted travel curator serving thousands of travelers worldwide.
              </p>
              <p>
                Our operational excellence comes from doing the unglamorous work
                well &mdash; vetted drivers and guides, carefully inspected
                stays, transparent all-inclusive pricing, and a round-the-clock
                support desk that travelers can reach at any hour.
              </p>
              <p>
                Above all, we are committed to sustainable tourism: low-impact
                itineraries that protect the island&apos;s landscapes and
                wildlife, and that channel tourism back into the local
                communities who make every journey special.
              </p>
            </div>
          </div>

          <div className="relative h-72 w-full overflow-hidden rounded-[1.75rem] shadow-card sm:h-96">
            <Image
              src="https://images.unsplash.com/photo-1571406252241-db0280bd36cd?auto=format&fit=crop&w=1200&q=80"
              alt="Sri Lanka landscape and wildlife"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Reveal>

      {/* Mission & core values */}
      <Reveal as="section" className="container-page pt-16 lg:pt-24">
        <div className="block-tropical p-6 sm:p-10 lg:p-14">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow mb-2">Our Mission</p>
            <h2 className="text-3xl leading-tight text-ocean sm:text-4xl">
              <TwoTone text="Reliable, Responsible, Genuinely Local" />
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-ocean/65">
              To make every Sri Lankan journey effortless and authentic &mdash;
              delivered with high service standards and a deep commitment to the
              people and places we showcase.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {values.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="flex gap-4 rounded-3xl bg-white p-6 shadow-card"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gold-tint text-gold-dark">
                  <Icon className="h-5 w-5" strokeWidth={1.9} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-ocean">
                    {title}
                  </h3>
                  <p className="mt-1 font-sans text-sm leading-relaxed text-ocean/60">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Stats */}
      <Reveal>
        <StatsBand />
      </Reveal>

      {/* Accreditations & licenses */}
      <Reveal as="section" className="container-page pt-16 lg:pt-24">
        <div className="text-center">
          <p className="section-eyebrow mb-2">Trust &amp; Compliance</p>
          <h2 className="text-3xl leading-tight text-ocean sm:text-4xl">
            <TwoTone text="Accreditations & Licenses" />
          </h2>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {accreditations.map((a) => (
            <div
              key={a}
              className="flex items-center gap-3 rounded-2xl border border-ocean/10 bg-white p-4 shadow-card"
            >
              <BadgeCheck className="h-6 w-6 shrink-0 text-tropical" strokeWidth={1.9} />
              <span className="font-sans text-sm font-semibold leading-tight text-ocean">
                {a}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section" className="container-page pt-16 lg:pt-24">
        <div className="flex flex-col items-center gap-5 rounded-3xl bg-ocean px-6 py-12 text-center text-cream sm:px-12 lg:py-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Travel with people who know the island
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-cream/85 sm:text-base">
              Connect with a local destination expert and receive three
              personalised, all-inclusive quotes &mdash; free of charge.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/quote" className="gold-button">
              Get a Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <WhatsAppButton
              message="Hi VSL 360, I'd like to learn more about planning a trip."
              label="Chat on WhatsApp"
            />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
