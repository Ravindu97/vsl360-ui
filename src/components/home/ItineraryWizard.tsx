"use client";

import { useCallback, useEffect, useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Minus,
  Plus,
} from "lucide-react";
import {
  submitCustomItinerary,
  type CustomItineraryFormState,
} from "@/lib/actions";
import {
  accommodationGrades,
  defaultWizardData,
  DURATION_MAX,
  DURATION_MIN,
  travelStyles,
  wizardSteps,
  WIZARD_STORAGE_KEY,
  type WizardFormData,
} from "@/lib/itineraryWizardData";

const initialState: CustomItineraryFormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="gold-button w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
        </>
      ) : (
        <>
          Submit Itinerary Request <ArrowRight className="h-4 w-4" />
        </>
      )}
    </button>
  );
}

function loadSaved(): WizardFormData {
  if (typeof window === "undefined") return defaultWizardData;
  try {
    const raw = localStorage.getItem(WIZARD_STORAGE_KEY);
    if (!raw) return defaultWizardData;
    return { ...defaultWizardData, ...JSON.parse(raw) };
  } catch {
    return defaultWizardData;
  }
}

function validateStep(step: number, data: WizardFormData): string | null {
  if (step === 1) {
    if (data.adults < 1) return "At least one adult is required.";
    if (data.dateMode === "dates") {
      if (!data.arrivalDate || !data.departureDate) return "Please select arrival and departure dates.";
      if (data.arrivalDate >= data.departureDate) return "Departure must be after arrival.";
    }
    return null;
  }
  if (step === 2) {
    if (data.travelStyles.length === 0) return "Select at least one travel style.";
    return null;
  }
  if (step === 3) {
    if (!data.accommodation) return "Please select an accommodation grade.";
    return null;
  }
  if (step === 4) {
    if (!data.name.trim()) return "Please enter your full name.";
    if (!data.email.trim()) return "Please enter your email.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return "Please enter a valid email.";
    return null;
  }
  return null;
}

export function ItineraryWizard() {
  const [data, setData] = useState<WizardFormData>(defaultWizardData);
  const [hydrated, setHydrated] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);
  const [state, formAction] = useActionState(submitCustomItinerary, initialState);

  useEffect(() => {
    setData(loadSaved());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(WIZARD_STORAGE_KEY, JSON.stringify(data));
  }, [data, hydrated]);

  useEffect(() => {
    if (state.status === "success") {
      localStorage.removeItem(WIZARD_STORAGE_KEY);
    }
  }, [state.status]);

  const update = useCallback((patch: Partial<WizardFormData>) => {
    setData((prev) => ({ ...prev, ...patch }));
    setStepError(null);
  }, []);

  function goNext() {
    const err = validateStep(data.step, data);
    if (err) {
      setStepError(err);
      return;
    }
    setStepError(null);
    if (data.step < 4) update({ step: data.step + 1 });
  }

  function goBack() {
    setStepError(null);
    if (data.step > 1) update({ step: data.step - 1 });
  }

  function toggleStyle(value: string) {
    const next = data.travelStyles.includes(value)
      ? data.travelStyles.filter((s) => s !== value)
      : [...data.travelStyles, value];
    update({ travelStyles: next });
  }

  if (!hydrated) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-card">
        <div className="h-64 animate-pulse rounded-2xl bg-ocean/5" />
      </div>
    );
  }

  if (state.status === "success") {
    const trackParams = new URLSearchParams();
    if (state.reference) trackParams.set("ref", state.reference);
    if (data.email) trackParams.set("email", data.email);
    const trackHref = trackParams.toString() ? `/track?${trackParams}` : "/track";

    return (
      <div className="rounded-3xl border border-tropical/20 bg-white p-8 text-center shadow-card sm:p-10">
        <CheckCircle2 className="mx-auto h-14 w-14 text-tropical" />
        <h2 className="mt-4 font-display text-2xl font-bold text-ocean">Request Received</h2>
        <p className="mt-2 font-sans text-sm leading-relaxed text-ocean/65">{state.message}</p>
        {state.reference ? (
          <div className="mt-5 rounded-2xl border border-ocean/10 bg-cream px-5 py-4">
            <p className="font-sans text-xs font-semibold uppercase tracking-wide text-ocean/45">
              Your Reference
            </p>
            <p className="mt-1 font-mono text-xl font-bold tracking-wide text-ocean">
              {state.reference}
            </p>
            <p className="mt-2 font-sans text-xs text-ocean/55">
              Save this number to check your inquiry status anytime.
            </p>
          </div>
        ) : null}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {state.reference ? (
            <Link href={trackHref} className="gold-button w-full sm:w-auto">
              Track Your Inquiry
            </Link>
          ) : null}
          <Link href="/journeys" className="ocean-button w-full sm:w-auto">
            Browse Packages
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-2">
          {wizardSteps.map(({ no, label }) => {
            const active = data.step === no;
            const done = data.step > no;
            return (
              <div key={no} className="flex flex-1 flex-col items-center gap-1.5">
                <span
                  className={`grid h-8 w-8 place-items-center rounded-full font-sans text-xs font-bold transition-colors ${
                    active
                      ? "bg-gold text-cream"
                      : done
                        ? "bg-tropical text-cream"
                        : "bg-ocean/10 text-ocean/45"
                  }`}
                >
                  {done ? "✓" : no}
                </span>
                <span
                  className={`hidden text-center font-sans text-[10px] font-semibold uppercase tracking-wide sm:block ${
                    active ? "text-gold-dark" : "text-ocean/45"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-ocean/10">
          <div
            className="h-full rounded-full bg-gold transition-all duration-300"
            style={{ width: `${(data.step / 4) * 100}%` }}
          />
        </div>
      </div>

      {state.status === "error" ? (
        <p className="mb-4 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 font-sans text-sm text-gold-dark">
          {state.message}
        </p>
      ) : null}

      {stepError ? (
        <p className="mb-4 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 font-sans text-sm text-gold-dark">
          {stepError}
        </p>
      ) : null}

      {/* Step 1 */}
      {data.step === 1 ? (
        <div className="space-y-5">
          <div>
            <h3 className="font-display text-xl font-bold text-ocean">Core Logistics</h3>
            <p className="mt-1 font-sans text-sm text-ocean/55">
              When are you travelling, and how many guests?
            </p>
          </div>

          <div className="flex gap-2">
            {(["duration", "dates"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => update({ dateMode: mode })}
                className={`flex-1 rounded-xl border px-3 py-2.5 font-sans text-sm font-semibold transition-colors ${
                  data.dateMode === mode
                    ? "border-gold bg-gold/10 text-gold-dark"
                    : "border-ocean/15 text-ocean/70 hover:border-ocean/30"
                }`}
              >
                {mode === "duration" ? "Trip Duration" : "Date Range"}
              </button>
            ))}
          </div>

          {data.dateMode === "duration" ? (
            <div>
              <label className="field-label">
                Duration: {data.durationDays} days
                {data.durationDays >= DURATION_MAX ? "+" : ""}
              </label>
              <input
                type="range"
                min={DURATION_MIN}
                max={DURATION_MAX}
                value={data.durationDays}
                onChange={(e) => update({ durationDays: Number(e.target.value) })}
                className="mt-2 w-full accent-gold"
              />
              <div className="mt-1 flex justify-between font-sans text-xs text-ocean/45">
                <span>{DURATION_MIN} days</span>
                <span>{DURATION_MAX}+ days</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="arrival" className="field-label">Arrival Date</label>
                <input
                  id="arrival"
                  type="date"
                  value={data.arrivalDate}
                  onChange={(e) => update({ arrivalDate: e.target.value })}
                  className="field-input"
                />
              </div>
              <div>
                <label htmlFor="departure" className="field-label">Departure Date</label>
                <input
                  id="departure"
                  type="date"
                  value={data.departureDate}
                  onChange={(e) => update({ departureDate: e.target.value })}
                  className="field-input"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="field-label">Adults</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => update({ adults: Math.max(1, data.adults - 1) })}
                  className="grid h-10 w-10 place-items-center rounded-full border border-ocean/15 text-ocean hover:bg-ocean/5"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-display text-2xl font-bold text-ocean">{data.adults}</span>
                <button
                  type="button"
                  onClick={() => update({ adults: data.adults + 1 })}
                  className="grid h-10 w-10 place-items-center rounded-full border border-ocean/15 text-ocean hover:bg-ocean/5"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div>
              <label className="field-label">Children</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => update({ children: Math.max(0, data.children - 1) })}
                  className="grid h-10 w-10 place-items-center rounded-full border border-ocean/15 text-ocean hover:bg-ocean/5"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-display text-2xl font-bold text-ocean">{data.children}</span>
                <button
                  type="button"
                  onClick={() => update({ children: data.children + 1 })}
                  className="grid h-10 w-10 place-items-center rounded-full border border-ocean/15 text-ocean hover:bg-ocean/5"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Step 2 */}
      {data.step === 2 ? (
        <div className="space-y-5">
          <div>
            <h3 className="font-display text-xl font-bold text-ocean">Travel Style</h3>
            <p className="mt-1 font-sans text-sm text-ocean/55">
              Select all experiences that interest you.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {travelStyles.map(({ value, label }) => {
              const on = data.travelStyles.includes(value);
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => toggleStyle(value)}
                  className={`rounded-full border px-4 py-2.5 font-sans text-sm font-semibold transition-all ${
                    on
                      ? "border-gold bg-gold text-cream shadow-soft"
                      : "border-ocean/15 bg-cream text-ocean/70 hover:border-ocean/30"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Step 3 */}
      {data.step === 3 ? (
        <div className="space-y-5">
          <div>
            <h3 className="font-display text-xl font-bold text-ocean">Accommodation Grade</h3>
            <p className="mt-1 font-sans text-sm text-ocean/55">
              Choose your preferred comfort level.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {accommodationGrades.map(({ value, label }) => {
              const on = data.accommodation === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => update({ accommodation: value })}
                  className={`rounded-xl border px-4 py-3 text-left font-sans text-sm font-semibold transition-all ${
                    on
                      ? "border-gold bg-gold/10 text-gold-dark shadow-soft"
                      : "border-ocean/15 text-ocean/75 hover:border-ocean/25"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Step 4 */}
      {data.step === 4 ? (
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="dateMode" value={data.dateMode} />
          <input type="hidden" name="arrivalDate" value={data.arrivalDate} />
          <input type="hidden" name="departureDate" value={data.departureDate} />
          <input type="hidden" name="durationDays" value={data.durationDays} />
          <input type="hidden" name="adults" value={data.adults} />
          <input type="hidden" name="children" value={data.children} />
          <input type="hidden" name="accommodation" value={data.accommodation} />
          {data.travelStyles.map((s) => (
            <input key={s} type="hidden" name="travelStyles" value={s} />
          ))}

          <div>
            <h3 className="font-display text-xl font-bold text-ocean">Contact & Routing</h3>
            <p className="mt-1 font-sans text-sm text-ocean/55">
              We&apos;ll reach out within 12 hours with customised route options.
            </p>
          </div>

          <div>
            <label htmlFor="wiz-name" className="field-label">Full Name *</label>
            <input
              id="wiz-name"
              name="name"
              required
              value={data.name}
              onChange={(e) => update({ name: e.target.value })}
              className="field-input"
              placeholder="Your name"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="wiz-email" className="field-label">Email *</label>
              <input
                id="wiz-email"
                name="email"
                type="email"
                required
                value={data.email}
                onChange={(e) => update({ email: e.target.value })}
                className="field-input"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="wiz-phone" className="field-label">WhatsApp / Mobile</label>
              <input
                id="wiz-phone"
                name="phone"
                value={data.phone}
                onChange={(e) => update({ phone: e.target.value })}
                className="field-input"
                placeholder="+91 ..."
              />
            </div>
          </div>

          <div>
            <label htmlFor="wiz-notes" className="field-label">Special Requests</label>
            <textarea
              id="wiz-notes"
              name="specialRequests"
              rows={3}
              value={data.specialRequests}
              onChange={(e) => update({ specialRequests: e.target.value })}
              className="field-input resize-none"
              placeholder="Dietary needs, pace preferences, celebrations..."
            />
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
            <button type="button" onClick={goBack} className="ghost-button w-full sm:w-auto">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <SubmitButton />
          </div>
        </form>
      ) : null}

      {/* Nav buttons for steps 1-3 */}
      {data.step < 4 ? (
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          {data.step > 1 ? (
            <button type="button" onClick={goBack} className="ghost-button w-full sm:w-auto">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          ) : (
            <div />
          )}
          <button type="button" onClick={goNext} className="gold-button w-full sm:w-auto">
            Continue <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
