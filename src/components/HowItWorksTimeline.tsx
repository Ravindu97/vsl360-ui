const steps = [
  {
    no: "01",
    title: "Submit Your Details",
    body: "Tell us where you dream of going and how you like to travel.",
  },
  {
    no: "02",
    title: "Connect with a Local Expert",
    body: "Meet your dedicated destination expert for a free consultation.",
  },
  {
    no: "03",
    title: "Receive 3 Personalised Quotes",
    body: "Compare hand-crafted itineraries tailored to you.",
  },
  {
    no: "04",
    title: "Secure Your Booking",
    body: "Confirm with confidence and start counting down the days.",
  },
];

export function HowItWorksTimeline() {
  return (
    <ol className="relative ml-3 border-l border-dashed border-ocean/25">
      {steps.map((step) => (
        <li key={step.no} className="relative pb-7 pl-7 last:pb-0">
          <span className="absolute -left-[18px] top-0 grid h-9 w-9 place-items-center rounded-full bg-ocean font-serif text-sm font-semibold text-cream">
            {step.no}
          </span>
          <h3 className="font-serif text-lg font-medium text-ocean">
            {step.title}
          </h3>
          <p className="mt-0.5 font-sans text-sm leading-relaxed text-ocean/65">
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
