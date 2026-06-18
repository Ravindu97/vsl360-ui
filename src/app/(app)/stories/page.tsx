import { getStories } from "@/lib/data";
import { StoryCard } from "@/components/StoryCard";
import { SectionHeading } from "@/components/SectionHeading";

export const dynamic = "force-dynamic";

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <div className="container-page pt-10 lg:pt-14">
      <SectionHeading
        eyebrow="The Journal"
        title="Traveler Stories"
        description="Candid moments and pull-quotes from journeys across the island."
      />

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((s) => (
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
    </div>
  );
}
