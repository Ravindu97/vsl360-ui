import { FileText, Users, ClipboardCheck, Luggage } from "lucide-react";

const steps = [
  {
    no: "01",
    Icon: FileText,
    title: "Submit Your Details",
    body: "Tell us where you dream of going and how you like to travel.",
    connector: "",
  },
  {
    no: "02",
    Icon: Users,
    title: "Connect with a Local Expert",
    body: "Meet your dedicated destination expert for a free consultation.",
    connector: "Free Consultation",
  },
  {
    no: "03",
    Icon: ClipboardCheck,
    title: "Receive 3 Personalised Quotes",
    body: "Compare hand-crafted itineraries tailored to you.",
    connector: "Discuss Further",
  },
  {
    no: "04",
    Icon: Luggage,
    title: "Secure Your Booking",
    body: "Confirm with confidence and start counting down the days.",
    connector: "",
  },
];

export function HowItWorksTimeline() {
  return (
    <>
      {/* Mobile: vertical */}
      <ol className="space-y-7 lg:hidden">
        {steps.map((step) => (
          <li key={step.no} className="flex gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-tropical text-cream">
              <step.Icon className="h-6 w-6" strokeWidth={1.8} />
            </span>
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-wider text-gold">
                Step {step.no}
              </p>
              <h3 className="font-display text-lg font-bold text-ocean">
                {step.title}
              </h3>
              <p className="mt-0.5 font-sans text-sm leading-relaxed text-ocean/60">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* Desktop: horizontal */}
      <div className="hidden lg:grid lg:grid-cols-4 lg:gap-4">
        {steps.map((step, i) => (
          <div key={step.no} className="relative text-center">
            <p className="mb-3 font-display text-sm font-bold text-ocean/40">
              {step.no}
            </p>
            <div className="relative">
              {i < steps.length - 1 ? (
                <div className="absolute left-1/2 top-8 z-0 w-full border-t-2 border-dashed border-tropical/40">
                  {step.connector ? (
                    <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-tropical-tint px-2 font-sans text-xs font-medium text-tropical">
                      {step.connector}
                    </span>
                  ) : null}
                </div>
              ) : null}
              <span className="relative z-10 mx-auto grid h-16 w-16 place-items-center rounded-full bg-tropical text-cream shadow-soft">
                <step.Icon className="h-7 w-7" strokeWidth={1.8} />
              </span>
            </div>
            <h3 className="mt-5 font-display text-lg font-bold text-ocean">
              {step.title}
            </h3>
            <p className="mx-auto mt-1.5 max-w-[14rem] font-sans text-sm leading-relaxed text-ocean/60">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
