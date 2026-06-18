import { Plane, Globe2, Headset, Users } from "lucide-react";
import { CountUp } from "@/components/CountUp";

const stats = [
  { Icon: Plane, value: 100, suffix: "+", label: "Destination Experts" },
  { Icon: Globe2, value: 10, suffix: "+", label: "Destinations" },
  { Icon: Headset, value: 200, suffix: "+", label: "Different Tours" },
  { Icon: Users, value: 10, suffix: "K+", label: "Trusted Customers" },
];

export function StatsBand() {
  return (
    <section className="container-page pt-16 lg:pt-24">
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {stats.map(({ Icon, value, suffix, label }) => (
          <div key={label} className="text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gold-tint text-gold-dark">
              <Icon className="h-6 w-6" strokeWidth={1.9} />
            </span>
            <p className="mt-4 font-display text-4xl font-extrabold text-ocean sm:text-5xl">
              <CountUp value={value} suffix={suffix} />
            </p>
            <p className="mt-1 font-sans text-sm text-ocean/55">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
