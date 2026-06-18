"use client";

import { useMemo, useState } from "react";
import { Search, Plus, HelpCircle } from "lucide-react";
import { faqCategories, faqItems } from "@/lib/faqData";

export function FaqAccordion() {
  const [active, setActive] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const q = query.trim().toLowerCase();

  const filtered = useMemo(
    () =>
      faqItems.filter((item) => {
        const inCategory = active === "all" || item.category === active;
        const inQuery =
          q === "" ||
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q);
        return inCategory && inQuery;
      }),
    [active, q],
  );

  const tabs = [{ id: "all", label: "All" }, ...faqCategories];

  return (
    <div>
      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ocean/40" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions, e.g. visa, payment, transport..."
          className="w-full rounded-full border border-ocean/15 bg-white py-3.5 pl-12 pr-4 font-sans text-sm text-ocean shadow-soft outline-none transition-colors placeholder:text-ocean/40 focus:border-gold focus:ring-2 focus:ring-gold/20"
        />
      </div>

      {/* Category tabs */}
      <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const on = active === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              aria-pressed={on}
              className={`shrink-0 rounded-full border px-4 py-2 font-sans text-xs font-semibold transition-colors ${
                on
                  ? "border-gold bg-gold text-cream"
                  : "border-ocean/15 bg-white text-ocean/70 hover:border-ocean/30"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <p className="mt-4 font-sans text-xs text-ocean/55">
        {filtered.length} {filtered.length === 1 ? "answer" : "answers"}
        {q ? ` matching “${query.trim()}”` : ""}
      </p>

      {/* Accordion */}
      <div className="mt-4 space-y-3">
        {filtered.map((item) => {
          const id = `${item.category}-${item.question}`;
          const isOpen = open === id;
          return (
            <div
              key={id}
              className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
                isOpen ? "border-gold/40 shadow-card" : "border-ocean/10"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-display text-base font-bold text-ocean sm:text-lg">
                  {item.question}
                </span>
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                    isOpen ? "rotate-45 bg-gold text-cream" : "bg-ocean/5 text-ocean"
                  }`}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 font-sans text-sm leading-relaxed text-ocean/70">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ocean/20 bg-white p-10 text-center">
            <HelpCircle className="mx-auto h-8 w-8 text-ocean/30" />
            <p className="mt-3 font-display text-lg font-bold text-ocean">
              No matching answers
            </p>
            <p className="mt-1 font-sans text-sm text-ocean/55">
              Try a different keyword, or reach out and we&apos;ll help directly.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
