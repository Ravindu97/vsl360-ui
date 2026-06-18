import { getJourneys, getStories } from "@/lib/data";
import { StoryCard } from "@/components/StoryCard";
import { SectionHeading } from "@/components/SectionHeading";
import { HowItWorksTimeline } from "@/components/HowItWorksTimeline";
import { Reveal } from "@/components/Reveal";
import { HeroBlock } from "@/components/home/HeroBlock";
import { DestinationsCarousel } from "@/components/home/DestinationsCarousel";
import { WhyChoose } from "@/components/home/WhyChoose";
import { StatsBand } from "@/components/home/StatsBand";
import { Testimonials } from "@/components/home/Testimonials";
import { VacationTiers } from "@/components/home/VacationTiers";
import { QuoteCTASection } from "@/components/home/QuoteCTASection";

export const dynamic = "force-dynamic";

export default async function DiscoverPage() {
  const [journeys, stories] = await Promise.all([getJourneys(), getStories()]);

  const cards = journeys.map((j) => ({
    id: j.id,
    slug: j.slug,
    title: j.title,
    location: j.location,
    durationDays: j.durationDays,
    heroImage: j.heroImage,
    badges: j.badges,
    priceFrom: j.priceFrom,
    familyFriendly: j.familyFriendly,
    dietaryOptions: j.dietaryOptions,
    allInclusive: j.allInclusive,
  }));

  return (
    <div className="pb-4">
      <HeroBlock />

      {/* How It Works */}
      <Reveal as="section" className="container-page pt-16 lg:pt-24">
        <div className="block-tropical p-6 sm:p-10 lg:p-14">
          <SectionHeading
            eyebrow="The VSL 360 Way"
            title="How It Works"
            centered
            description="From the first spark of inspiration to a secured booking — guided every step by a local expert."
          />
          <div className="mt-10">
            <HowItWorksTimeline />
          </div>
        </div>
      </Reveal>

      {/* Trending destinations */}
      <Reveal as="section" className="container-page pt-16 lg:pt-24">
        <DestinationsCarousel
          journeys={cards}
          eyebrow="Hand-picked"
          title="Trending Journeys"
          viewAllHref="/journeys"
        />
      </Reveal>

      <Reveal>
        <WhyChoose />
      </Reveal>
      <Reveal>
        <StatsBand />
      </Reveal>
      <Reveal>
        <VacationTiers />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>

      {/* Travel news & trends */}
      <Reveal as="section" className="container-page pt-16 lg:pt-24">
        <SectionHeading
          eyebrow="From the Journal"
          title="Travel News & Trends"
          action={{ label: "Read more", href: "/stories" }}
        />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              variant="feature"
            />
          ))}
        </div>
      </Reveal>

      <Reveal>
        <QuoteCTASection />
      </Reveal>
    </div>
  );
}
