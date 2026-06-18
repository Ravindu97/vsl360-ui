"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Mail, Phone } from "lucide-react";
import { Wordmark } from "./Wordmark";
import { SUPPORT_EMAIL, SUPPORT_PHONE } from "@/lib/contact";

const navItems = [
  { href: "/discover", label: "Discover" },
  { href: "/journeys", label: "Journeys" },
  { href: "/planner", label: "Planner" },
  { href: "/stories", label: "Stories" },
  { href: "/faq", label: "FAQ" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Utility bar */}
      <div className="hidden bg-ink text-cream/80 sm:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-cream"
          >
            <Mail className="h-3.5 w-3.5" /> {SUPPORT_EMAIL}
          </a>
          <a
            href={`tel:${SUPPORT_PHONE.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-cream"
          >
            <Phone className="h-3.5 w-3.5" /> {SUPPORT_PHONE}
          </a>
        </div>
      </div>

      {/* Sticky nav */}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-soft" : "border-b border-ocean/5"
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between lg:h-[72px]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full text-ocean transition-colors hover:bg-ocean/5 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/discover" aria-label="VSL 360 home">
              <Wordmark className="text-2xl text-ocean lg:text-[28px]" />
            </Link>
          </div>

          <nav className="hidden items-center gap-9 lg:flex">
            {navItems.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative font-sans text-sm font-semibold transition-colors hover:text-gold ${
                    active ? "text-gold" : "text-ocean/80"
                  }`}
                >
                  {item.label}
                  {active ? (
                    <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-gold" />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 lg:gap-4">
            <span className="hidden rounded-full border border-ocean/15 px-3 py-1 font-sans text-xs font-semibold text-ocean/70 lg:inline">
              LKR
            </span>
            <Link href="/quote" className="gold-button !px-5 !py-2.5 text-xs sm:text-sm">
              Get a Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute left-0 top-0 h-full w-[80%] max-w-xs bg-white p-6 shadow-card-hover transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Wordmark className="text-2xl text-ocean" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full text-ocean hover:bg-ocean/5"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-8 flex flex-col gap-1">
            {navItems.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-4 py-3 font-display text-xl font-bold transition-colors ${
                    active ? "bg-gold/10 text-gold" : "text-ocean hover:bg-ocean/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link href="/quote" className="gold-button mt-8 w-full">
            Get a Quote <ArrowRight className="h-4 w-4" />
          </Link>

          <div className="mt-8 space-y-3 border-t border-ocean/10 pt-6 text-sm text-ocean/70">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="flex items-center gap-2"
            >
              <Mail className="h-4 w-4 text-gold" /> {SUPPORT_EMAIL}
            </a>
            <a
              href={`tel:${SUPPORT_PHONE.replace(/\s/g, "")}`}
              className="flex items-center gap-2"
            >
              <Phone className="h-4 w-4 text-gold" /> {SUPPORT_PHONE}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
