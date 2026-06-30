"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { ArrowRight, Loader2, Search } from "lucide-react";
import { trackInquiry, type TrackInquiryFormState } from "@/lib/actions";
import { InquiryStatusCard } from "@/components/InquiryStatusCard";
import { WhatsAppButton } from "@/components/WhatsApp";

const initialState: TrackInquiryFormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="gold-button w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Looking up...
        </>
      ) : (
        <>
          Track Inquiry <Search className="h-4 w-4" />
        </>
      )}
    </button>
  );
}

export function TrackInquiryForm({
  defaultReference = "",
  defaultEmail = "",
}: {
  defaultReference?: string;
  defaultEmail?: string;
}) {
  const [state, formAction] = useActionState(trackInquiry, initialState);

  if (state.status === "success" && state.inquiry) {
    return (
      <div className="space-y-6">
        <InquiryStatusCard inquiry={state.inquiry} />
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/discover" className="ocean-button w-full sm:w-auto">
            Plan Another Trip <ArrowRight className="h-4 w-4" />
          </Link>
          <form action={formAction} className="w-full sm:w-auto">
            <input type="hidden" name="reference" value={state.inquiry.reference} />
            <input type="hidden" name="email" value={state.email ?? defaultEmail} />
            <button type="submit" className="ghost-button w-full">
              Refresh Status
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form action={formAction} className="surface-card space-y-4 p-6 sm:p-8">
        {state.status === "error" ? (
          <p className="rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 font-sans text-sm text-gold-dark">
            {state.message}
          </p>
        ) : null}

        <div>
          <label htmlFor="track-reference" className="field-label">
            Reference Number *
          </label>
          <input
            id="track-reference"
            name="reference"
            required
            defaultValue={defaultReference}
            className="field-input font-mono"
            placeholder="VSL-7F3K2A"
            autoComplete="off"
          />
          <p className="mt-1.5 font-sans text-xs text-ocean/45">
            You received this when you submitted your itinerary request.
          </p>
        </div>

        <div>
          <label htmlFor="track-email" className="field-label">
            Email Address *
          </label>
          <input
            id="track-email"
            name="email"
            type="email"
            required
            defaultValue={defaultEmail}
            className="field-input"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>

        <SubmitButton />
      </form>

      <div className="rounded-2xl border border-tropical/20 bg-tropical/5 p-5">
        <p className="font-serif text-lg font-medium text-ocean">Can&apos;t find your reference?</p>
        <p className="mt-0.5 font-sans text-sm text-ocean/60">
          Message our team on WhatsApp and we&apos;ll help you locate your inquiry.
        </p>
        <WhatsAppButton
          className="mt-4 w-full sm:w-auto"
          message="Hi VSL 360, I need help tracking my travel inquiry."
        />
      </div>
    </div>
  );
}
