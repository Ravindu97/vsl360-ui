import { getStories } from "@/lib/data";
import { StoryCard } from "@/components/StoryCard";
import { SectionHeading } from "@/components/SectionHeading";

export const dynamic = "force-dynamic";

export default async function StoriesPage() {
  const stories = await getStories();
  const [lead, ...rest] = stories;

  return (
    <div className="px-5 pt-6">
      <SectionHeading eyebrow="The Journal" title="Traveler Stories" />
      <p className="mt-2 font-sans text-sm leading-relaxed text-ocean/65">
        Candid moments and pull-quotes from journeys across the island.
      </p>

      <div className="mt-6 space-y-5">
        {lead ? (
          <StoryCard
            key={lead.id}
            slug={lead.slug}
            title={lead.title}
            author={lead.author}
            location={lead.location}
            heroImage={lead.heroImage}
            excerpt={lead.excerpt}
            readMins={lead.readMins}
            variant="feature"
          />
        ) : null}

        <div className="space-y-4">
          {rest.map((s) => (
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
      </div>
    </div>
  );
}
