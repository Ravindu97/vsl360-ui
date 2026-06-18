import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { QuoteForm } from "@/components/QuoteForm";
import { WhatsAppButton } from "@/components/WhatsApp";
import { TrustBadges } from "@/components/TrustBadges";

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ destination?: string }>;
}) {
  const { destination } = await searchParams;

  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="flex-1">
        <div className="container-page pt-10 lg:pt-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Intro */}
            <div className="lg:pt-6">
              <p className="section-eyebrow mb-2">Start Your Holiday Planning</p>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-ocean sm:text-5xl">
                Connect with a Local Destination Expert
              </h1>
              <p className="mt-4 font-sans text-base leading-relaxed text-ocean/65">
                Share a few details and receive three personalised travel quotes,
                crafted just for you &mdash; completely free, no obligation.
              </p>

              <div className="mt-7">
                <TrustBadges />
              </div>

              <div className="mt-7 rounded-2xl border border-tropical/20 bg-tropical/5 p-5">
                <p className="font-serif text-lg font-medium text-ocean">
                  Prefer to chat instantly?
                </p>
                <p className="mt-0.5 font-sans text-sm text-ocean/60">
                  Message a local expert on WhatsApp for an immediate reply.
                </p>
                <WhatsAppButton
                  className="mt-4 w-full sm:w-auto"
                  message="Hi VSL 360, I'd like a quote for a Sri Lanka trip."
                />
              </div>
            </div>

            {/* Form */}
            <div className="surface-card p-6 sm:p-8">
              <QuoteForm defaultDestination={destination ?? ""} />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
