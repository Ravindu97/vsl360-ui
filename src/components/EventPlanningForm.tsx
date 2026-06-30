"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { submitEventInquiry, type EventFormState } from "@/lib/actions";
import {
  conferenceLayouts,
  eventTypes,
  vendorOptions,
  venuePreferences,
  weddingStyles,
} from "@/lib/eventsData";

const initialState: EventFormState = { status: "idle" };

type EventTypeValue = (typeof eventTypes)[number]["value"];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="gold-button w-full">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
        </>
      ) : (
        <>
          Submit Event Brief <ArrowRight className="h-4 w-4" />
        </>
      )}
    </button>
  );
}

export function EventPlanningForm() {
  const [state, formAction] = useActionState(submitEventInquiry, initialState);
  const [eventType, setEventType] = useState<EventTypeValue>("DESTINATION_WEDDING");

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-tropical/20 bg-cream p-7 text-center lg:p-10">
        <CheckCircle2 className="mx-auto h-12 w-12 text-tropical" />
        <h2 className="mt-3 font-display text-2xl font-bold text-ocean">
          Brief Received
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
    <form action={formAction} className="space-y-6">
      {state.status === "error" ? (
        <p className="rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 font-sans text-sm text-gold-dark">
          {state.message}
        </p>
      ) : null}

      <div>
        <p className="field-label">Event Type *</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {eventTypes.map(({ value, label }) => (
            <label
              key={value}
              className={`cursor-pointer rounded-2xl border px-4 py-3 text-center font-sans text-sm font-semibold transition-all ${
                eventType === value
                  ? "border-gold bg-gold/10 text-gold-dark"
                  : "border-ocean/15 bg-white text-ocean/70 hover:border-ocean/30"
              }`}
            >
              <input
                type="radio"
                name="eventType"
                value={value}
                checked={eventType === value}
                onChange={() => setEventType(value)}
                className="sr-only"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="event-name" className="field-label">
            Full Name *
          </label>
          <input id="event-name" name="name" required className="field-input" placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="event-email" className="field-label">
            Email *
          </label>
          <input
            id="event-email"
            name="email"
            type="email"
            required
            className="field-input"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="event-phone" className="field-label">
            Phone / WhatsApp
          </label>
          <input id="event-phone" name="phone" className="field-input" placeholder="+91 ..." />
        </div>
        {eventType === "CORPORATE_MICE" ? (
          <div>
            <label htmlFor="event-company" className="field-label">
              Company / Organisation
            </label>
            <input id="event-company" name="company" className="field-input" placeholder="Company name" />
          </div>
        ) : (
          <div>
            <label htmlFor="event-date" className="field-label">
              Preferred Date
            </label>
            <input id="event-date" name="preferredDate" type="date" className="field-input" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="guestCount" className="field-label">
            Estimated Guests *
          </label>
          <input
            id="guestCount"
            name="guestCount"
            type="number"
            min={1}
            required
            className="field-input"
            placeholder="e.g. 120"
          />
        </div>
        <div>
          <label htmlFor="durationDays" className="field-label">
            Duration (days)
          </label>
          <input
            id="durationDays"
            name="durationDays"
            type="number"
            min={1}
            className="field-input"
            placeholder="e.g. 3"
          />
        </div>
        <div>
          <label htmlFor="venuePreference" className="field-label">
            Venue Preference *
          </label>
          <select id="venuePreference" name="venuePreference" required className="field-input" defaultValue="">
            <option value="" disabled>
              Select venue type
            </option>
            {venuePreferences.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="durationNotes" className="field-label">
          Duration Details
        </label>
        <input
          id="durationNotes"
          name="durationNotes"
          className="field-input"
          placeholder="e.g. 2-day conference + 1-day incentive safari"
        />
      </div>

      {eventType === "DESTINATION_WEDDING" ? (
        <div className="space-y-4 rounded-2xl border border-ocean/10 bg-ocean-tint/40 p-5">
          <p className="font-display text-lg font-bold text-ocean">Wedding Details</p>
          <div>
            <label htmlFor="weddingStyle" className="field-label">
              Ceremony Style
            </label>
            <select id="weddingStyle" name="weddingStyle" className="field-input" defaultValue="">
              <option value="" disabled>
                Select style
              </option>
              {weddingStyles.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="field-label">Vendor Coordination Needed</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {vendorOptions.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-ocean/10 bg-white px-3 py-2.5 font-sans text-sm text-ocean/80"
                >
                  <input
                    type="checkbox"
                    name="vendorNeeds"
                    value={option}
                    className="h-4 w-4 rounded border-ocean/20 text-gold focus:ring-gold/30"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {eventType === "CORPORATE_MICE" ? (
        <div className="space-y-4 rounded-2xl border border-ocean/10 bg-gold-tint/50 p-5">
          <p className="font-display text-lg font-bold text-ocean">Corporate / MICE Details</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="groupSize" className="field-label">
                Corporate Group Size
              </label>
              <input
                id="groupSize"
                name="groupSize"
                type="number"
                min={1}
                className="field-input"
                placeholder="Total delegates"
              />
            </div>
            <div>
              <label htmlFor="conferenceLayout" className="field-label">
                Conference Layout
              </label>
              <select id="conferenceLayout" name="conferenceLayout" className="field-input" defaultValue="">
                <option value="">Select layout</option>
                {conferenceLayouts.map((layout) => (
                  <option key={layout} value={layout}>
                    {layout}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="avRequirements" className="field-label">
              Audio-Visual &amp; Technical Integration
            </label>
            <textarea
              id="avRequirements"
              name="avRequirements"
              rows={3}
              className="field-input resize-none"
              placeholder="LED walls, live-streaming, interpretation booths, recording..."
            />
          </div>
          <div>
            <label htmlFor="banquetDetails" className="field-label">
              Banquet &amp; F&amp;B Requirements
            </label>
            <textarea
              id="banquetDetails"
              name="banquetDetails"
              rows={3}
              className="field-input resize-none"
              placeholder="Gala dinner for 200, cocktail reception, dietary protocols, per-head budget..."
            />
          </div>
          <div>
            <label htmlFor="corp-date" className="field-label">
              Preferred Event Dates
            </label>
            <input id="corp-date" name="preferredDate" type="date" className="field-input" />
          </div>
        </div>
      ) : null}

      {eventType === "CUSTOM_GATHERING" ? (
        <div className="rounded-2xl border border-ocean/10 bg-tropical-tint/40 p-5">
          <p className="font-display text-lg font-bold text-ocean">Gathering Details</p>
          <p className="mt-1 font-sans text-sm text-ocean/60">
            Tell us about your celebration — milestone birthdays, anniversaries, reunions, or private retreats.
          </p>
        </div>
      ) : null}

      <div>
        <label htmlFor="event-message" className="field-label">
          Additional Notes
        </label>
        <textarea
          id="event-message"
          name="message"
          rows={4}
          className="field-input resize-none"
          placeholder="Vision, budget range, special requirements..."
        />
      </div>

      <SubmitButton />
      <p className="text-center font-sans text-xs text-ocean/50">
        Free consultation. Dedicated events coordinator assigned within 24 hours.
      </p>
    </form>
  );
}
