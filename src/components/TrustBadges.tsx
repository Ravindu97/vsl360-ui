import { BadgeCheck, ShieldCheck, Headset, Receipt } from "lucide-react";

const items = [
  { Icon: Receipt, label: "All-Inclusive Pricing" },
  { Icon: ShieldCheck, label: "Zero Hidden Fees" },
  { Icon: Headset, label: "24/7 Support Desk" },
  { Icon: BadgeCheck, label: "Verified Local Experts" },
];

export function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {items.map(({ Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-2 rounded-xl border border-tropical/20 bg-tropical/5 px-3 py-2.5"
        >
          <Icon className="h-4 w-4 shrink-0 text-tropical" strokeWidth={1.9} />
          <span className="font-sans text-[12px] font-semibold leading-tight text-ocean">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
