import { FormHeader } from "@/components/FormHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { WhatsAppButton } from "@/components/WhatsApp";

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ destination?: string }>;
}) {
  const { destination } = await searchParams;

  return (
    <div className="app-shell">
      <FormHeader title="Get a Quote" />
      <main className="px-5 pb-16 pt-6">
        <p className="section-eyebrow mb-1">Start Your Holiday Planning</p>
        <h1 className="font-serif text-3xl font-medium leading-tight text-ocean">
          Connect with a Local Destination Expert
        </h1>
        <p className="mt-2 font-sans text-sm leading-relaxed text-ocean/65">
          Share a few details and receive three personalised travel quotes,
          crafted just for you.
        </p>

        <div className="mt-5 rounded-2xl border border-tropical/20 bg-tropical/5 p-4">
          <p className="font-serif text-base font-medium text-ocean">
            Prefer to chat instantly?
          </p>
          <p className="mt-0.5 font-sans text-xs text-ocean/60">
            Message a local expert on WhatsApp for an immediate reply.
          </p>
          <WhatsAppButton
            className="mt-3 w-full"
            message="Hi VSL 360, I'd like a quote for a Sri Lanka trip."
          />
        </div>

        <div className="mt-7">
          <QuoteForm defaultDestination={destination ?? ""} />
        </div>
      </main>
    </div>
  );
}
