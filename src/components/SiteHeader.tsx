"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Mail, Phone, ChevronDown } from "lucide-react";
import { Wordmark } from "./Wordmark";
import { SUPPORT_EMAIL, SUPPORT_PHONE } from "@/lib/contact";

const primaryNavItems = [
  { href: "/discover", label: "Discover" },
  { href: "/journeys", label: "Journeys" },
  { href: "/planner", label: "Planner" },
  { href: "/stories", label: "Stories" },
  { href: "/testimonials", label: "Testimonials" },
];

const moreNavItems = [
  { href: "/about", label: "About Us" },
  { href: "/faq", label: "FAQ" },
];

const mobileNavSections = [
  { title: "Explore", items: primaryNavItems },
  { title: "Company", items: moreNavItems },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  href,
  label,
  active,
  compact,
}: {
  href: string;
  label: string;
  active: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative whitespace-nowrap font-sans font-semibold transition-colors hover:text-gold ${
        compact ? "text-[13px] xl:text-sm" : "text-sm"
      } ${active ? "text-gold" : "text-ocean/80"}`}
    >
      {label}
      {active ? (
        <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-gold" />
      ) : null}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const moreActive = moreNavItems.some((item) => isActive(pathname, item.href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!moreOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!moreRef.current?.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMoreOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [moreOpen]);

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
        <div className="container-page flex h-16 items-center justify-between gap-4 lg:grid lg:h-[72px] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center">
          <div className="flex min-w-0 items-center gap-2 lg:justify-self-start">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-ocean transition-colors hover:bg-ocean/5 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/discover" aria-label="VSL 360 home" className="min-w-0">
              <Wordmark className="truncate text-2xl text-ocean lg:text-[26px] xl:text-[28px]" />
            </Link>
          </div>

          <nav
            className="hidden items-center gap-3 lg:flex xl:gap-5"
            aria-label="Main navigation"
          >
            {primaryNavItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                active={isActive(pathname, item.href)}
                compact
              />
            ))}

            <div ref={moreRef} className="relative">
              <button
                type="button"
                aria-expanded={moreOpen}
                aria-haspopup="true"
                onClick={() => setMoreOpen((value) => !value)}
                className={`relative inline-flex items-center gap-1 whitespace-nowrap font-sans text-[13px] font-semibold transition-colors hover:text-gold xl:text-sm ${
                  moreActive || moreOpen ? "text-gold" : "text-ocean/80"
                }`}
              >
                More
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    moreOpen ? "rotate-180" : ""
                  }`}
                />
                {moreActive ? (
                  <span className="absolute -bottom-1.5 left-0 h-0.5 w-[calc(100%-1.25rem)] rounded-full bg-gold" />
                ) : null}
              </button>

              <div
                className={`absolute left-1/2 top-[calc(100%+0.75rem)] z-50 min-w-[11rem] -translate-x-1/2 rounded-2xl border border-ocean/10 bg-white p-2 shadow-card-hover transition-all duration-200 ${
                  moreOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-1 opacity-0"
                }`}
              >
                {moreNavItems.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMoreOpen(false)}
                      className={`block rounded-xl px-4 py-2.5 font-sans text-sm font-semibold transition-colors ${
                        active
                          ? "bg-gold/10 text-gold"
                          : "text-ocean/80 hover:bg-ocean/5 hover:text-ocean"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>

          <div className="flex shrink-0 items-center justify-end gap-2 lg:justify-self-end lg:gap-3 xl:gap-4">
            <span className="hidden rounded-full border border-ocean/15 px-3 py-1 font-sans text-xs font-semibold text-ocean/70 xl:inline">
              LKR
            </span>
            <Link
              href="/quote"
              className="gold-button !px-4 !py-2.5 text-xs sm:!px-5 sm:text-sm"
            >
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
          className={`absolute left-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-white shadow-card-hover transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-ocean/10 px-6 py-5">
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

          <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6">
            {mobileNavSections.map((section) => (
              <div key={section.title}>
                <p className="mb-2 px-4 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-ocean/45">
                  {section.title}
                </p>
                <nav className="flex flex-col gap-1">
                  {section.items.map((item) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`rounded-xl px-4 py-3 font-display text-lg font-bold transition-colors ${
                          active
                            ? "bg-gold/10 text-gold"
                            : "text-ocean hover:bg-ocean/5"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>

          <div className="border-t border-ocean/10 px-6 py-6">
            <Link href="/quote" className="gold-button w-full">
              Get a Quote <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="mt-6 space-y-3 text-sm text-ocean/70">
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
      </div>
    </>
  );
}
