import Image from "next/image";
import Link from "next/link";
import { Route, ShieldCheck, Headset, Receipt } from "lucide-react";
import { TwoTone } from "@/components/TwoTone";

const features = [
  {
    Icon: Route,
    title: "Tailor-Made Flex Routings",
    body: "Completely customized plans designed from scratch for every traveler — not off-the-shelf packages.",
  },
  {
    Icon: ShieldCheck,
    title: "Validated Local Expertise",
    body: "Fully verified in-house travel experts possessing deep logistical knowledge of Sri Lanka.",
  },
  {
    Icon: Headset,
    title: "24/7 On-Ground Support Desk",
    body: "Continuous live operational monitoring for immediate emergency or change handling throughout your journey.",
  },
  {
    Icon: Receipt,
    title: "No Hidden Costs Guarantee",
    body: "Transparent operational pricing structure with clear breakdown parameters — guides, transfers, and fees included.",
  },
];

export function WhyChoose() {
  return (
    <section className="container-page pt-16 lg:pt-24">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="section-eyebrow mb-2">Why VSL 360</p>
          <h2 className="text-3xl leading-tight text-ocean sm:text-4xl lg:text-5xl">
            <TwoTone text="Why Select VSL 360?" />
          </h2>
          <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-ocean/65">
            Operational stability and security you can trust — from your first
            inquiry to the moment you land back home.
          </p>
          <Link href="/quote" className="ink-button mt-7">
            Get a Free Quote
          </Link>
        </div>

        <div className="relative h-72 w-full overflow-hidden rounded-[1.75rem] shadow-card sm:h-96">
          <Image
            src="https://images.unsplash.com/photo-1571406252241-db0280bd36cd?auto=format&fit=crop&w=1200&q=80"
            alt="Sri Lankan landscape"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-10 block-ocean p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
          {features.map(({ Icon, title, body }) => (
            <div key={title} className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-tropical shadow-soft">
                <Icon className="h-5 w-5" strokeWidth={1.9} />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-ocean">{title}</h3>
                <p className="mt-1.5 font-sans text-sm leading-relaxed text-ocean/60">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
