import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TwoTone } from "@/components/TwoTone";
import { FaqAccordion } from "@/components/FaqAccordion";
import { WhatsAppButton } from "@/components/WhatsApp";

export const metadata = {
  title: "FAQ — VSL 360",
  description:
    "Answers to common questions about visas, booking, payments, logistics, and travelling Sri Lanka with VSL 360.",
};

export default function FaqPage() {
  return (
    <div className="container-page pt-6 lg:pt-10">
      {/* Header */}
      <div className="block-ocean px-6 py-10 text-center sm:px-10 lg:py-14">
        <p className="section-eyebrow mb-2">Help Centre</p>
        <h1 className="mx-auto max-w-2xl text-4xl leading-tight text-ocean sm:text-5xl">
          <TwoTone text="Frequently Asked Questions" />
        </h1>
        <p className="mx-auto mt-4 max-w-xl font-sans text-base leading-relaxed text-ocean/65">
          Everything you need to know about planning and travelling with VSL 360.
          Search below or browse by category.
        </p>
      </div>

      {/* Search + tabs + accordion */}
      <div className="mx-auto mt-10 max-w-3xl">
        <FaqAccordion />
      </div>

      {/* Still have questions */}
      <div className="mx-auto mt-12 max-w-3xl">
        <div className="flex flex-col items-center gap-5 rounded-3xl bg-tropical px-6 py-10 text-center text-cream sm:px-12">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Still have questions?
            </h2>
            <p className="mt-2 font-sans text-sm leading-relaxed text-cream/85 sm:text-base">
              Our local destination experts are online 24/7 and happy to help.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton
              message="Hi VSL 360, I have a question about planning a trip."
              label="Ask on WhatsApp"
            />
            <Link href="/quote" className="gold-button">
              Get a Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
