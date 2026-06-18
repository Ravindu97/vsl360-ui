import { getJourneys } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";
import { JourneyExplorer } from "@/components/JourneyExplorer";

export const dynamic = "force-dynamic";

export default async function JourneysPage() {
  const journeys = await getJourneys();

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
    <div className="px-5 pt-6">
      <SectionHeading eyebrow="Curated Experiences" title="Journeys" />
      <p className="mb-4 mt-2 font-sans text-sm leading-relaxed text-ocean/65">
        Each itinerary is hand-crafted with local experts. All-inclusive pricing,
        zero hidden fees, with Veg &amp; Jain meals on request.
      </p>

      <JourneyExplorer journeys={cards} />
    </div>
  );
}
