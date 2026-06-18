"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { CheckCircle2, Loader2, Lock } from "lucide-react";
import { confirmBooking, type CheckoutFormState } from "@/lib/actions";
import { InvoiceSummary } from "@/components/InvoiceSummary";
import type { LineItem } from "@/lib/types";

const initialState: CheckoutFormState = { status: "idle" };

function ConfirmButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="gold-button w-full">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Confirming...
        </>
      ) : (
        <>
          <Lock className="h-4 w-4" /> Confirm & Pay Securely
        </>
      )}
    </button>
  );
}

export function CheckoutForm({
  journeySlug,
  journeyTitle,
  lineItems,
  total,
}: {
  journeySlug: string;
  journeyTitle: string;
  lineItems: LineItem[];
  total: number;
}) {
  const [state, formAction] = useActionState(confirmBooking, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-tropical/20 bg-cream p-7 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-tropical" />
        <h2 className="mt-3 font-serif text-2xl font-medium text-ocean">
          Journey Confirmed
        </h2>
        <p className="mt-2 font-sans text-sm leading-relaxed text-ocean/65">
          {state.message}
        </p>
        <Link href="/planner" className="ocean-button mt-5 w-full">
          View My Planner
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="journeySlug" value={journeySlug} />
      <input type="hidden" name="total" value={total} />
      <input type="hidden" name="lineItems" value={JSON.stringify(lineItems)} />

      <div className="rounded-2xl border border-ocean/10 bg-cream p-4">
        <p className="section-eyebrow mb-1">Journey</p>
        <p className="font-serif text-lg font-medium text-ocean">{journeyTitle}</p>
      </div>

      <InvoiceSummary lineItems={lineItems} total={total} />

      {state.status === "error" ? (
        <p className="rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 font-sans text-sm text-gold-dark">
          {state.message}
        </p>
      ) : null}

      <div className="space-y-4">
        <div>
          <label htmlFor="travelerName" className="field-label">
            Lead Traveler Name *
          </label>
          <input
            id="travelerName"
            name="travelerName"
            required
            className="field-input"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="field-label">
            Email for Confirmation *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="field-input"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <ConfirmButton />
      <p className="flex items-center justify-center gap-1.5 text-center font-sans text-xs text-ocean/50">
        <Lock className="h-3 w-3" /> Secured with 256-bit encryption
      </p>
    </form>
  );
}
