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
      <section className="relative h-96 w-full overflow-hidden">
        <Image
          src={story.heroImage}
          alt={story.title}
          fill
          priority
          sizes="(max-width: 440px) 100vw, 440px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-dark/85 via-ocean-dark/15 to-ocean-dark/30" />

        <Link
          href="/stories"
          aria-label="Back to stories"
          className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-cream/85 text-ocean backdrop-blur"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>

        <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
          <p className="section-eyebrow mb-2 text-gold-light">{story.location}</p>
          <h1 className="font-serif text-3xl font-medium leading-tight">
            {story.title}
          </h1>
          <div className="mt-2 flex items-center gap-3 font-sans text-xs text-cream/85">
            <span>By {story.author}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {story.readMins} min read
            </span>
          </div>
        </div>
      </section>

      <section className="px-5 pt-7">
        {paragraphs.map((p, i) => (
          <div key={i}>
            <p
              className={`font-serif text-[17px] leading-relaxed text-ocean/85 ${
                i === 0 ? "dropcap" : "mt-5"
              }`}
            >
              {p}
            </p>
            {i === 0 ? <PullQuote>{story.pullQuote}</PullQuote> : null}
          </div>
        ))}
      </section>

      <section className="px-5 pt-8">
        <div className="rounded-2xl bg-ocean p-6 text-cream">
          <p className="section-eyebrow mb-1 text-gold-light">
            Inspired to go?
          </p>
          <h2 className="font-serif text-2xl font-medium">
            Book Your Journey
          </h2>
          <p className="mt-2 font-sans text-sm leading-relaxed text-cream/85">
            Let a local destination expert craft your own version of this story.
          </p>
          <Link href="/quote" className="gold-button mt-4 w-full">
            Get a Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </article>
  );
}
