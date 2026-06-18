import type { LineItem } from "@/lib/types";

export function InvoiceSummary({
  lineItems,
  total,
}: {
  lineItems: LineItem[];
  total: number;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ocean/10 bg-cream">
      <div className="border-b border-dashed border-ocean/15 px-5 py-4">
        <p className="section-eyebrow">Itemised Summary</p>
      </div>
      <ul className="divide-y divide-dashed divide-ocean/10 px-5">
        {lineItems.map((item) => (
          <li
            key={item.label}
            className="flex items-center justify-between py-3 font-sans text-sm"
          >
            <span className="text-ocean/75">{item.label}</span>
            {item.amount === 0 ? (
              <span className="font-semibold uppercase tracking-wider text-tropical text-xs">
                Included
              </span>
            ) : (
              <span className="font-semibold text-ocean">
                ${item.amount.toLocaleString()}
              </span>
            )}
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-t border-ocean/15 bg-ocean px-5 py-4 text-cream">
        <span className="font-sans text-sm font-semibold uppercase tracking-wider">
          Total Due
        </span>
        <span className="font-serif text-2xl font-semibold">
          ${total.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
