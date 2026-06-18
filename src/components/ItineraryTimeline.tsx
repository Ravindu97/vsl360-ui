import { ActivityIcon } from "./ActivityIcon";
import type { ItineraryDay } from "@/lib/types";

export function ItineraryTimeline({ days }: { days: ItineraryDay[] }) {
  return (
    <ol className="relative ml-5 border-l border-ocean/15">
      {days.map((d) => (
        <li key={d.day} className="relative pb-6 pl-8 last:pb-0">
          <span className="absolute -left-[21px] top-0 grid h-10 w-10 place-items-center rounded-full border border-ocean/15 bg-cream text-ocean">
            <ActivityIcon name={d.icon} />
          </span>

          <div className="flex items-center gap-2">
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-gold">
              Day {d.day}
            </span>
            <StatusBadge status={d.status} />
          </div>
          <h3 className="mt-1 font-serif text-lg font-medium text-ocean">
            {d.title}
          </h3>
          <p className="mt-0.5 font-sans text-sm leading-relaxed text-ocean/65">
            {d.description}
          </p>
        </li>
      ))}
    </ol>
  );
}

function StatusBadge({ status }: { status: ItineraryDay["status"] }) {
  if (status === "confirmed") {
    return (
      <span className="inline-flex items-center rounded-full bg-tropical/15 px-2.5 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wider text-tropical">
        Confirmed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-gold/15 px-2.5 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wider text-gold-dark">
      Planning
    </span>
  );
}
