import { MessageSquare, ClipboardList, RefreshCw, Car } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const stages = [
  {
    no: "01",
    Icon: MessageSquare,
    title: "Inbound Inquiry",
    body: "You submit the custom itinerary builder or connect directly through automated WhatsApp and website chat triggers.",
  },
  {
    no: "02",
    Icon: ClipboardList,
    title: "Consultation & Planning",
    body: "Our dedicated travel planning desk reviews your data, formulates customised route variants, and contacts you within 12 hours.",
  },
  {
    no: "03",
    Icon: RefreshCw,
    title: "Refinement & Finalization",
    body: "Iterative itinerary tuning based on live feedback. Pricing structures, accommodation confirmation, and custom inclusions are locked.",
  },
  {
    no: "04",
    Icon: Car,
    title: "In-Country Coordination",
    body: "Seamless operational execution — dedicated vehicle allocation, trained tourist drivers/guides, and round-the-clock ground assistance.",
  },
];

export function OperationalFlow() {
  return (
    <>
      {/* Mobile */}
      <ol className="space-y-6 lg:hidden">
        {stages.map((stage, i) => (
          <Reveal key={stage.no} delay={i * 80}>
            <li className="flex gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-tropical text-cream shadow-soft">
                <stage.Icon className="h-6 w-6" strokeWidth={1.8} />
              </span>
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-wider text-gold">
                  Stage {stage.no}
                </p>
                <h3 className="font-display text-lg font-bold text-ocean">{stage.title}</h3>
                <p className="mt-1 font-sans text-sm leading-relaxed text-ocean/60">{stage.body}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>

      {/* Desktop */}
      <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
        {stages.map((stage, i) => (
          <Reveal key={stage.no} delay={i * 100}>
            <div className="relative text-center">
              <p className="mb-3 font-display text-sm font-bold text-ocean/40">{stage.no}</p>
              <div className="relative">
                {i < stages.length - 1 ? (
                  <div className="absolute left-1/2 top-8 z-0 w-full border-t-2 border-dashed border-tropical/30" />
                ) : null}
                <span className="relative z-10 mx-auto grid h-16 w-16 place-items-center rounded-full bg-tropical text-cream shadow-soft transition-transform duration-500 hover:scale-105">
                  <stage.Icon className="h-7 w-7" strokeWidth={1.8} />
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-ocean">{stage.title}</h3>
              <p className="mx-auto mt-2 max-w-[15rem] font-sans text-sm leading-relaxed text-ocean/60">
                {stage.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}
