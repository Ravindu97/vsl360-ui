import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { getStoryBySlug } from "@/lib/data";
import { PullQuote } from "@/components/PullQuote";

export const dynamic = "force-dynamic";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) notFound();

  const paragraphs = story.body.split("\n\n").filter(Boolean);

  return (
    <article>
      <section className="relative h-[55vh] min-h-[360px] w-full overflow-hidden lg:h-[65vh]">
        <Image
          src={story.heroImage}
          alt={story.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-dark/85 via-ocean-dark/15 to-ocean-dark/40" />

        <div className="container-page relative h-full">
          <Link
            href="/stories"
            aria-label="Back to stories"
            className="absolute left-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-cream/85 text-ocean backdrop-blur transition-colors hover:bg-cream sm:left-8"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div className="absolute inset-x-0 bottom-0 px-5 pb-8 text-cream sm:px-8">
            <p className="section-eyebrow mb-2 text-gold-light">
              {story.location}
            </p>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {story.title}
            </h1>
            <div className="mt-3 flex items-center gap-3 font-sans text-sm text-cream/85">
              <span>By {story.author}</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {story.readMins} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container-narrow pt-10 lg:pt-14">
        {paragraphs.map((p, i) => (
          <div key={i}>
            <p
              className={`font-serif text-lg leading-relaxed text-ocean/85 sm:text-xl ${
                i === 0 ? "dropcap" : "mt-6"
              }`}
            >
              {p}
            </p>
            {i === 0 ? <PullQuote>{story.pullQuote}</PullQuote> : null}
          </div>
        ))}

        <div className="mt-12 overflow-hidden rounded-3xl bg-ocean p-7 text-cream sm:p-10">
          <p className="section-eyebrow mb-1 text-gold-light">Inspired to go?</p>
          <h2 className="font-serif text-3xl font-medium">Book Your Journey</h2>
          <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-cream/85">
            Let a local destination expert craft your own version of this story.
          </p>
          <Link href="/quote" className="gold-button mt-5 w-full sm:w-auto">
            Get a Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
