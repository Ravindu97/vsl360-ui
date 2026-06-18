import Link from "next/link";
import { Phone, Mail, MapPin, Linkedin, Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import { Wordmark } from "./Wordmark";
import { SUPPORT_EMAIL, SUPPORT_PHONE, whatsappLink } from "@/lib/contact";

const explore = [
  { href: "/discover", label: "Discover" },
  { href: "/journeys", label: "Journeys" },
  { href: "/planner", label: "Planner" },
  { href: "/stories", label: "Stories" },
  { href: "/quote", label: "Get a Quote" },
];

const destinations = [
  "Sri Lanka",
  "Maldives",
  "Vietnam",
  "Indonesia",
  "Dubai",
  "Cambodia",
  "Singapore",
];

const socials = [Linkedin, Twitter, Instagram, Youtube, Facebook];
const payments = ["VISA", "Mastercard", "Amex", "PayPal", "G Pay", "Apple Pay"];

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-ink text-cream lg:mt-28">
      <div className="container-page py-14 lg:py-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-12">
          <div className="col-span-2 sm:col-span-3 lg:col-span-5">
            <Wordmark className="text-3xl text-cream" />
            <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-cream/60">
              VSL 360 is a travel curator connecting you with local destination
              experts to plan authentic, all-inclusive journeys across Sri Lanka
              and beyond. Our aim is to make your travel dreams come true.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-10 w-10 place-items-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-sans text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              Talk to an Expert
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`tel:${SUPPORT_PHONE.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2.5 font-sans text-sm text-cream/70 transition-colors hover:text-cream"
                >
                  <Phone className="h-4 w-4 text-gold-light" /> {SUPPORT_PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="inline-flex items-center gap-2.5 font-sans text-sm text-cream/70 transition-colors hover:text-cream"
                >
                  <Mail className="h-4 w-4 text-gold-light" /> {SUPPORT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink("Hi VSL 360, I'd like to plan a trip.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 font-sans text-sm text-cream/70 transition-colors hover:text-cream"
                >
                  <MapPin className="h-4 w-4 text-gold-light" /> Colombo, Sri Lanka
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Destinations */}
        <div className="mt-12 border-t border-cream/10 pt-8">
          <h3 className="text-center font-sans text-xs font-semibold uppercase tracking-[0.2em] text-cream/40">
            Destinations
          </h3>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {destinations.map((d) => (
              <span
                key={d}
                className="font-sans text-sm text-cream/70 transition-colors hover:text-cream"
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Payment methods */}
        <div className="mt-10">
          <h3 className="text-center font-sans text-xs font-semibold uppercase tracking-[0.2em] text-cream/40">
            Accepted Payment Methods
          </h3>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
            {payments.map((p) => (
              <span
                key={p}
                className="rounded-lg bg-cream/10 px-3 py-1.5 font-sans text-[11px] font-semibold text-cream/75"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-center sm:flex-row sm:text-left">
          <p className="font-sans text-xs text-cream/50">
            &copy; {new Date().getFullYear()} VSL 360 (Pvt) Ltd. All rights
            reserved.
          </p>
          <p className="font-sans text-xs text-cream/50">
            Experience Sri Lanka Completely.
          </p>
        </div>
      </div>
    </footer>
  );
}
