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
    <div className="container-page pt-10 lg:pt-14">
      <SectionHeading
        eyebrow="Curated Experiences"
        title="Journeys"
        description="Each itinerary is hand-crafted with local experts. All-inclusive pricing, zero hidden fees, with Veg & Jain meals on request."
      />

      <div className="mt-8">
        <JourneyExplorer journeys={cards} />
      </div>
    </div>
  );
}
