import { getJourneys } from "@/lib/data";
import { PackageCatalog } from "@/components/PackageCatalog";
import { TwoTone } from "@/components/TwoTone";
import type { JourneyCardData } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function JourneysPage() {
  const journeys = await getJourneys();

  const cards: JourneyCardData[] = journeys.map((j) => ({
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
    personas: j.personas,
  }));

  return (
    <div>
      {/* Page header */}
      <section className="container-page pt-6 lg:pt-10">
        <div className="block-ocean px-6 py-10 sm:px-10 lg:py-14">
          <p className="section-eyebrow mb-2">Tour Packages</p>
          <h1 className="max-w-3xl text-4xl leading-tight text-ocean sm:text-5xl">
            <TwoTone text="Readymade Tour Packages" />
          </h1>
          <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-ocean/65">
            Browse curated, all-inclusive itineraries by duration and traveler style.
            Every package includes transparent pricing, local expert support, and
            Veg &amp; Jain meals on request.
          </p>
        </div>
      </section>

      <section className="container-page pb-16 pt-10 lg:pb-24 lg:pt-12">
        <PackageCatalog journeys={cards} />
      </section>
    </div>
  );
}
