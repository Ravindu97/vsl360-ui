import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Building2, Sparkles, ShieldCheck } from "lucide-react";
import { TwoTone } from "@/components/TwoTone";
import { Reveal } from "@/components/Reveal";
import { EventPlanningForm } from "@/components/EventPlanningForm";
import { WeddingShowcase } from "@/components/events/WeddingShowcase";
import { VendorModules } from "@/components/events/VendorModules";
import { CorporateServices } from "@/components/events/CorporateServices";
import { TrustBadges } from "@/components/TrustBadges";
import { whatsappLink } from "@/lib/contact";

export const metadata = {
  title: "Weddings & Events — VSL 360",
  description:
    "Destination weddings, corporate MICE programmes, and bespoke celebrations in Sri Lanka — fully coordinated by local experts.",
};

const pillars = [
  {
    Icon: Heart,
    title: "Destination Weddings",
    body: "Beach ceremonies in Galle & Bentota, or traditional up-country celebrations — every vendor coordinated.",
    href: "#weddings",
  },
  {
    Icon: Building2,
    title: "Corporate & MICE",
    body: "Conferences, incentive travel, gala banquets, and full audio-visual integration for corporate groups.",
    href: "#corporate",
  },
  {
    Icon: Sparkles,
    title: "Custom Gatherings",
    body: "Milestone celebrations, reunions, and private retreats with transparent, all-inclusive planning.",
    href: "#inquiry",
  },
];

export default function EventsPage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80"
            alt="Elegant destination event in Sri Lanka"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/60 to-ink/30" />
        </div>

        <div className="container-page relative py-20 text-cream sm:py-28 lg:py-36">
          <p className="section-eyebrow mb-3 text-gold">Weddings & Events</p>
          <h1 className="max-w-3xl text-4xl leading-tight sm:text-5xl lg:text-6xl">
            <span className="font-extrabold">Celebrate</span>
            <span className="font-medium"> in Sri Lanka</span>
          </h1>
          <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-cream/80 sm:text-lg">
            From barefoot beach vows to boardroom conferences — our events team
            delivers end-to-end coordination with local expertise and global
            service standards.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#inquiry" className="gold-button">
              Plan Your Event <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappLink(
                "Hi VSL 360, I'd like to discuss planning a wedding or corporate event in Sri Lanka.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="ghost-button border-cream/30 bg-white/10 text-cream hover:border-cream/50 hover:bg-white/20"
            >
              Chat with Events Team
            </a>
          </div>
        </div>
      </section>

      <Reveal as="section" className="container-page -mt-10 relative z-10 lg:-mt-14">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-6">
          {pillars.map(({ Icon, title, body, href }) => (
            <a
              key={title}
              href={href}
              className="group rounded-3xl border border-ocean/10 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gold-tint text-gold-dark transition-colors group-hover:bg-gold group-hover:text-cream">
                <Icon className="h-5 w-5" strokeWidth={1.9} />
              </span>
              <h2 className="mt-4 font-display text-xl font-bold text-ocean">{title}</h2>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ocean/60">{body}</p>
              <span className="mt-4 inline-flex items-center gap-1 font-sans text-xs font-semibold text-gold">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>
          ))}
        </div>
      </Reveal>

      <section id="weddings" className="container-page pt-20 lg:pt-28">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow mb-2">Destination Weddings</p>
            <h2 className="text-3xl leading-tight text-ocean sm:text-4xl">
              <TwoTone text="Where Love Meets the Island" />
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-ocean/65">
              Visual focus on coastal ceremonies and up-country traditions — with
              every vendor, guest transfer, and dietary requirement handled by our
              on-ground team.
            </p>
          </div>
          <div className="mt-10">
            <WeddingShowcase />
          </div>
        </Reveal>
      </section>

      <Reveal as="section" className="container-page pt-16 lg:pt-24">
        <div className="block-gold p-6 sm:p-10 lg:p-14">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow mb-2">Full Coordination</p>
            <h2 className="text-3xl leading-tight text-ocean sm:text-4xl">
              <TwoTone text="Vendor Coordination Modules" />
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-ocean/65">
              Select the services you need — or let us assemble the full team.
              Every module includes vetted local partners and transparent pricing.
            </p>
          </div>
          <div className="mt-10">
            <VendorModules />
          </div>
        </div>
      </Reveal>

      <section id="corporate" className="container-page pt-16 lg:pt-24">
        <Reveal>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="section-eyebrow mb-2">Corporate & MICE</p>
              <h2 className="text-3xl leading-tight text-ocean sm:text-4xl">
                <TwoTone text="Meetings, Incentives & Conferences" />
              </h2>
              <p className="mt-4 font-sans text-base leading-relaxed text-ocean/65">
                From 20-person board retreats to 500-delegate conferences — we
                manage venue sourcing, technical production, and banquet operations
                with clear per-head metrics.
              </p>
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-ocean/10 bg-white p-4 shadow-card">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-tropical" />
                <p className="font-sans text-sm leading-relaxed text-ocean/70">
                  All corporate programmes include dedicated on-site coordinators,
                  emergency protocols, and transparent all-inclusive costing with
                  zero hidden fees.
                </p>
              </div>
            </div>
            <CorporateServices />
          </div>
        </Reveal>
      </section>

      <Reveal as="section" className="container-page pt-16 lg:pt-24">
        <TrustBadges wide />
      </Reveal>

      <section id="inquiry" className="container-page pt-16 pb-20 lg:pt-24 lg:pb-28">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-2">
              <p className="section-eyebrow mb-2">Start Planning</p>
              <h2 className="text-3xl leading-tight text-ocean sm:text-4xl">
                <TwoTone text="Tell Us About Your Event" />
              </h2>
              <p className="mt-4 font-sans text-base leading-relaxed text-ocean/65">
                Submit your event brief and a dedicated coordinator will respond
                within one business day with a tailored proposal.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Event type, guest count & duration captured upfront",
                  "Venue preferences matched to vetted local partners",
                  "Corporate A/V and banquet specs handled in one form",
                  "Free consultation — no obligation",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 font-sans text-sm text-ocean/70"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="surface-card p-6 sm:p-8 lg:col-span-3">
              <EventPlanningForm />
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
