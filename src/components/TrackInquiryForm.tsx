"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { ArrowRight, Loader2, Search } from "lucide-react";
import { trackInquiry, type TrackInquiryFormState } from "@/lib/actions";
import { InquiryStatusCard } from "@/components/InquiryStatusCard";
import { WhatsAppButton } from "@/components/WhatsApp";
import { lostReferenceWhatsAppMessage } from "@/lib/inquiryMessages";
import { SUPPORT_EMAIL } from "@/lib/contact";

const initialState: TrackInquiryFormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="gold-button w-full">
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
  const formRef = useRef<HTMLFormElement>(null);
  const autoSubmitted = useRef(false);

  useEffect(() => {
    if (autoSubmitted.current || state.status !== "idle") return;
    if (!defaultReference.trim() || !defaultEmail.trim()) return;
    autoSubmitted.current = true;
    formRef.current?.requestSubmit();
  }, [defaultReference, defaultEmail, state.status]);

  if (state.status === "success" && state.inquiry) {
    return (
      <div className="space-y-6">
        <InquiryStatusCard inquiry={state.inquiry} />
        <div className="flex flex-col gap-3">
          <Link href="/discover" className="ocean-button w-full">
            Plan Another Trip <ArrowRight className="h-4 w-4" />
          </Link>
          <form action={formAction} className="w-full">
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

  const isAutoLoading =
    state.status === "idle" &&
    autoSubmitted.current &&
    defaultReference.trim() &&
    defaultEmail.trim();

  return (
    <div className="space-y-6">
      <form ref={formRef} action={formAction} className="surface-card space-y-4 p-5 sm:p-8">
        {state.status === "error" ? (
          <div className="rounded-xl border border-gold/40 bg-gold/10 px-4 py-3">
            <p className="font-sans text-sm font-medium text-gold-dark">{state.message}</p>
            <p className="mt-1 font-sans text-xs text-ocean/55">
              Double-check both fields match what you used when submitting.
            </p>
          </div>
        ) : null}

        {isAutoLoading ? (
          <div className="flex items-center justify-center gap-2 py-8 font-sans text-sm text-ocean/60">
            <Loader2 className="h-5 w-5 animate-spin text-gold" />
            Loading your inquiry...
          </div>
        ) : (
          <>
            <div>
              <label htmlFor="track-reference" className="field-label">
                Reference Number *
              </label>
              <input
                id="track-reference"
                name="reference"
                required
                defaultValue={defaultReference}
                className="field-input font-mono text-base tracking-wide"
                placeholder="VSL-7F3K2A"
                autoComplete="off"
                spellCheck={false}
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
          </>
        )}
      </form>

      <div className="rounded-2xl border border-tropical/20 bg-tropical/5 p-5">
        <p className="font-serif text-lg font-medium text-ocean">Lost your reference?</p>
        <p className="mt-1 font-sans text-sm leading-relaxed text-ocean/60">
          We can&apos;t look up inquiries without your reference for security reasons. Contact our
          team and we&apos;ll help from there.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <WhatsAppButton
            className="w-full flex-1"
            label="WhatsApp support"
            message={lostReferenceWhatsAppMessage()}
          />
          <a href={`mailto:${SUPPORT_EMAIL}`} className="ocean-button w-full flex-1">
            Email support
          </a>
        </div>
      </div>
    </div>
  );
}
