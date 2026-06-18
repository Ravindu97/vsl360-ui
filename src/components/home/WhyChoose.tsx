import Image from "next/image";
import Link from "next/link";
import { Plane, Wallet, Headset, Layers } from "lucide-react";
import { TwoTone } from "@/components/TwoTone";

const features = [
  {
    Icon: Plane,
    title: "100% Tailor-Made Plans",
    body: "Custom private journeys built from scratch to match how you like to travel, with unlimited changes.",
  },
  {
    Icon: Wallet,
    title: "No Hidden Costs",
    body: "One transparent, all-inclusive price. Guides, transfers, taxes and entrance fees are always included.",
  },
  {
    Icon: Headset,
    title: "24/7 Prompt Support",
    body: "A dedicated destination expert and on-ground desk, ready day or night for anything you need.",
  },
  {
    Icon: Layers,
    title: "Veg & Jain Friendly",
    body: "Family-friendly itineraries with pure-veg, Jain and Halal meal options on request.",
  },
];

export function WhyChoose() {
  return (
    <section className="container-page pt-16 lg:pt-24">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="section-eyebrow mb-2">Why VSL 360</p>
          <h2 className="text-3xl leading-tight text-ocean sm:text-4xl lg:text-5xl">
            <TwoTone text="Why Choose VSL 360?" />
          </h2>
          <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-ocean/65">
            The best way to travel is through local expertise. Our verified
            in-house experts know Sri Lanka intimately and craft journeys around
            your story &mdash; not a generic package.
          </p>
          <Link href="/journeys" className="ink-button mt-7">
            Our Journeys
          </Link>
        </div>

        <div className="relative h-72 w-full overflow-hidden rounded-[1.75rem] shadow-card sm:h-96">
          <Image
            src="https://images.unsplash.com/photo-1571406252241-db0280bd36cd?auto=format&fit=crop&w=1200&q=80"
            alt="Sri Lankan wildlife and landscape"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-10 block-ocean p-6 sm:p-10">
        <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
          {features.map(({ Icon, title, body }) => (
            <div key={title} className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-tropical shadow-soft">
                <Icon className="h-5 w-5" strokeWidth={1.9} />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-ocean">
                  {title}
                </h3>
                <p className="mt-1 font-sans text-sm leading-relaxed text-ocean/60">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
