"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Route, CalendarRange, BookOpen } from "lucide-react";

const items = [
  { href: "/discover", label: "Discover", Icon: Compass },
  { href: "/journeys", label: "Journeys", Icon: Route },
  { href: "/planner", label: "Planner", Icon: CalendarRange },
  { href: "/stories", label: "Stories", Icon: BookOpen },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-ocean/10 bg-cream/95 backdrop-blur-md lg:hidden">
      <ul className="mx-auto flex max-w-mobile items-stretch justify-around px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        {items.map(({ href, label, Icon }) => {
          const active =
            pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={`flex flex-col items-center gap-1 rounded-xl py-1.5 transition-colors ${
                  active ? "text-gold" : "text-ocean/55 hover:text-ocean"
                }`}
              >
                <Icon
                  className="h-[22px] w-[22px]"
                  strokeWidth={active ? 2.4 : 1.8}
                />
                <span className="font-sans text-[11px] font-medium tracking-wide">
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
