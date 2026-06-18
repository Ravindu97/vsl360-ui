import { TwoTone } from "@/components/TwoTone";
import { QuoteForm } from "@/components/QuoteForm";
import { WhatsAppButton } from "@/components/WhatsApp";

export function QuoteCTASection() {
  return (
    <section className="container-page pt-16 lg:pt-24">
      <div className="block-gold p-6 sm:p-10 lg:p-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:pt-4">
            <p className="section-eyebrow mb-2">Start Your Holiday Planning</p>
            <h2 className="text-3xl leading-tight text-ocean sm:text-4xl lg:text-5xl">
              <TwoTone text="Get a Personalised Quote" />
            </h2>
            <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-ocean/65">
              Our dedicated team of local experts are available 24/7. Share a few
              details and receive three personalised quotes &mdash; free, with no
              obligation.
            </p>
            <p className="mt-6 font-sans text-sm font-semibold text-ocean">
              Prefer to chat instantly?
            </p>
            <WhatsAppButton
              className="mt-3 w-full sm:w-auto"
              message="Hi VSL 360, I'd like a quote for a Sri Lanka trip."
            />
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
