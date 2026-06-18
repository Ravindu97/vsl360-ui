import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";

export function MessageExpert({ sticky = false }: { sticky?: boolean }) {
  return (
    <div
      className={
        sticky
          ? "sticky bottom-[88px] z-30"
          : ""
      }
    >
      <div className="flex items-center gap-3 rounded-2xl border border-ocean/10 bg-ocean p-3 text-cream shadow-sm">
        <Image
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
          alt="Destination expert"
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="font-sans text-xs uppercase tracking-wider text-gold-light">
            Your Destination Expert
          </p>
          <p className="truncate font-serif text-base font-medium">Nuwan Jayasuriya</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="tel:+61483909556"
            aria-label="Call expert"
            className="grid h-10 w-10 place-items-center rounded-xl bg-cream/10 transition-colors hover:bg-cream/20"
          >
            <Phone className="h-4 w-4" />
          </a>
          <Link
            href="/quote"
            aria-label="Message expert"
            className="grid h-10 w-10 place-items-center rounded-xl bg-gold transition-colors hover:bg-gold-dark"
          >
            <MessageCircle className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
