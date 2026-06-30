import { Camera, Flower2, UtensilsCrossed, Music, Plane, FileCheck } from "lucide-react";
import { vendorModules } from "@/lib/eventsData";

const icons = [Camera, Flower2, UtensilsCrossed, Music, Plane, FileCheck];

export function VendorModules() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {vendorModules.map((module, index) => {
        const Icon = icons[index] ?? Camera;
        return (
          <div
            key={module.id}
            className="rounded-3xl border border-ocean/10 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gold-tint text-gold-dark">
              <Icon className="h-5 w-5" strokeWidth={1.9} />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold text-ocean">{module.title}</h3>
            <p className="mt-1 font-sans text-sm leading-relaxed text-ocean/60">
              {module.description}
            </p>
            <ul className="mt-4 space-y-1.5 border-t border-ocean/10 pt-4">
              {module.deliverables.map((item) => (
                <li
                  key={item}
                  className="font-sans text-xs leading-relaxed text-ocean/55 before:mr-2 before:text-gold before:content-['•']"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
