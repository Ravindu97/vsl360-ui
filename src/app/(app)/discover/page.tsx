import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getFeaturedJourneys, getStories } from "@/lib/data";
import { ExperienceCard } from "@/components/ExperienceCard";
import { StoryCard } from "@/components/StoryCard";
import { SectionHeading } from "@/components/SectionHeading";
import { HowItWorksTimeline } from "@/components/HowItWorksTimeline";

export const dynamic = "force-dynamic";

export default async function DiscoverPage() {
  const [journeys, stories] = await Promise.all([
    getFeaturedJourneys(),
    getStories(),
  ]);

  return (
    <div>
      <section className="relative h-[560px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=1200&q=80"
          alt="A Sri Lankan leopard at golden hour"
          fill
          priority
          sizes="(max-width: 440px) 100vw, 440px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-dark/40 via-ocean-dark/30 to-ocean-dark/90" />

        <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
          <span className="badge-stamp mb-4">
            <Sparkles className="h-3 w-3 text-gold" /> Curated Travel
          </span>
          <h1 className="font-serif text-[42px] font-medium leading-[1.05]">
            Experience Sri Lanka Completely
          </h1>
          <p className="mt-3 max-w-[18rem] font-sans text-sm leading-relaxed text-cream/85">
            Authentic, story-driven journeys crafted with local destination
            experts. Warm. Immersive. Unforgettable.
          </p>
          <Link href="/quote" className="gold-button mt-5 w-full">
            Get a Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="px-5 pt-9">
        <SectionHeading eyebrow="The VSL 360 Way" title="How It Works" />
        <div className="mt-6">
          <HowItWorksTimeline />
        </div>
      </section>

      <section className="px-5 pt-10">
        <SectionHeading
          eyebrow="Hand-picked"
          title="Featured Journeys"
          action={{ label: "View all", href: "/journeys" }}
        />
        <div className="mt-5 space-y-5">
          {journeys.map((j) => (
            <ExperienceCard
              key={j.id}
              slug={j.slug}
              title={j.title}
              location={j.location}
              durationDays={j.durationDays}
              heroImage={j.heroImage}
              badges={j.badges}
              priceFrom={j.priceFrom}
              familyFriendly={j.familyFriendly}
              dietaryOptions={j.dietaryOptions}
              allInclusive={j.allInclusive}
            />
          ))}
        </div>
      </section>

      <section className="px-5 pt-10">
        <SectionHeading
          eyebrow="From the Journal"
          title="Traveler Stories"
          action={{ label: "Read more", href: "/stories" }}
        />
        <div className="mt-5 space-y-4">
          {stories.slice(0, 3).map((s) => (
            <StoryCard
              key={s.id}
              slug={s.slug}
              title={s.title}
              author={s.author}
              location={s.location}
              heroImage={s.heroImage}
              excerpt={s.excerpt}
              readMins={s.readMins}
            />
          ))}
        </div>
      </section>

      <section className="px-5 pt-10">
        <div className="rounded-2xl bg-tropical p-6 text-cream">
          <h2 className="font-serif text-2xl font-medium">
            Ready to start planning?
          </h2>
          <p className="mt-2 font-sans text-sm leading-relaxed text-cream/85">
            Connect with a local destination expert online, 24/7. Receive three
            personalised travel quotes, free of charge.
          </p>
          <Link href="/quote" className="gold-button mt-4 w-full">
            Plan My Journey <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
