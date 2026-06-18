"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { submitQuoteRequest, type QuoteFormState } from "@/lib/actions";

const initialState: QuoteFormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="gold-button w-full">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Sending...
        </>
      ) : (
        <>
          Request 3 Quotes <ArrowRight className="h-4 w-4" />
        </>
      )}
    </button>
  );
}

export function QuoteForm({ defaultDestination = "" }: { defaultDestination?: string }) {
  const [state, formAction] = useActionState(submitQuoteRequest, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-tropical/20 bg-cream p-7 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-tropical" />
        <h2 className="mt-3 font-serif text-2xl font-medium text-ocean">
          Request Received
        </h2>
        <p className="mt-2 font-sans text-sm leading-relaxed text-ocean/65">
          {state.message}
        </p>
        <Link href="/discover" className="ocean-button mt-5 w-full">
          Back to Discover
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {state.status === "error" ? (
        <p className="rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 font-sans text-sm text-gold-dark">
          {state.message}
        </p>
      ) : null}

      <div>
        <label htmlFor="name" className="field-label">
          Full Name *
        </label>
        <input id="name" name="name" required className="field-input" placeholder="Your name" />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="email" className="field-label">
            Email *
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
        <div>
          <label htmlFor="phone" className="field-label">
            Phone
          </label>
          <input id="phone" name="phone" className="field-input" placeholder="+61 ..." />
        </div>
      </div>

      <div>
        <label htmlFor="destination" className="field-label">
          Destination *
        </label>
        <input
          id="destination"
          name="destination"
          required
          defaultValue={defaultDestination}
          className="field-input"
          placeholder="e.g. Sri Lanka — Yala & Coast"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="travelers" className="field-label">
            Travelers
          </label>
          <input
            id="travelers"
            name="travelers"
            type="number"
            min={1}
            defaultValue={2}
            className="field-input"
          />
        </div>
        <div>
          <label htmlFor="startDate" className="field-label">
            Start Date
          </label>
          <input id="startDate" name="startDate" type="date" className="field-input" />
        </div>
      </div>

      <div>
        <label htmlFor="budget" className="field-label">
          Budget (per person)
        </label>
        <select id="budget" name="budget" className="field-input" defaultValue="">
          <option value="" disabled>
            Select a range
          </option>
          <option value="Under $2,000">Under $2,000</option>
          <option value="$2,000 - $4,000">$2,000 - $4,000</option>
          <option value="$4,000 - $7,000">$4,000 - $7,000</option>
          <option value="$7,000+">$7,000+</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="field-label">
          Tell us about your dream trip
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="field-input resize-none"
          placeholder="Interests, pace, special occasions..."
        />
      </div>

      <SubmitButton />
      <p className="text-center font-sans text-xs text-ocean/50">
        Free consultation. No obligation. A local expert replies within 24 hours.
      </p>
    </form>
  );
}
