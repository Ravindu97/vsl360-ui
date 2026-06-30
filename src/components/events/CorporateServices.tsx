import { LayoutGrid, Monitor, Utensils, Users } from "lucide-react";
import { corporateServices } from "@/lib/eventsData";

const icons = [LayoutGrid, Monitor, Utensils, Users];

export function CorporateServices() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {corporateServices.map((service, index) => {
        const Icon = icons[index] ?? LayoutGrid;
        return (
          <div
            key={service.id}
            className="flex gap-4 rounded-3xl border border-ocean/10 bg-white p-6 shadow-card"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ocean-tint text-ocean">
              <Icon className="h-5 w-5" strokeWidth={1.9} />
            </span>
            <div>
              <h3 className="font-display text-lg font-bold text-ocean">{service.title}</h3>
              <p className="mt-1 font-sans text-sm leading-relaxed text-ocean/60">
                {service.description}
              </p>
              {service.metrics ? (
                <p className="mt-3 inline-block rounded-full bg-gold-tint px-3 py-1 font-sans text-xs font-semibold text-gold-dark">
                  {service.metrics}
                </p>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
