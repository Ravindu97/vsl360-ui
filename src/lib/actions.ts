"use server";

import { prisma } from "@/lib/prisma";
import { submitCustomItineraryToAdmin, trackInquiryFromAdmin } from "@/lib/adminApi";
import type { InquiryTrackResult } from "@/lib/adminApi";
import type { LineItem } from "@/lib/types";

export type QuoteFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitQuoteRequest(
  _prev: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const destination = String(formData.get("destination") ?? "").trim();
  const travelersRaw = String(formData.get("travelers") ?? "").trim();

  if (!name || !email || !destination) {
    return { status: "error", message: "Please complete the required fields." };
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const travelers = Number.parseInt(travelersRaw, 10);

  try {
    await prisma.quoteRequest.create({
      data: {
        name,
        email,
        phone: String(formData.get("phone") ?? "").trim() || null,
        destination,
        travelers: Number.isFinite(travelers) && travelers > 0 ? travelers : 1,
        startDate: String(formData.get("startDate") ?? "").trim() || null,
        budget: String(formData.get("budget") ?? "").trim() || null,
        message: String(formData.get("message") ?? "").trim() || null,
      },
    });

    return {
      status: "success",
      message:
        "Thank you. A local destination expert will be in touch with 3 personalised travel quotes.",
    };
  } catch {
    return {
      status: "error",
      message: "Something went wrong saving your request. Please try again.",
    };
  }
}

export type CheckoutFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function confirmBooking(
  _prev: CheckoutFormState,
  formData: FormData,
): Promise<CheckoutFormState> {
  const travelerName = String(formData.get("travelerName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const journeySlug = String(formData.get("journeySlug") ?? "").trim();
  const total = Number.parseInt(String(formData.get("total") ?? "0"), 10);

  let lineItems: LineItem[] = [];
  try {
    lineItems = JSON.parse(String(formData.get("lineItems") ?? "[]"));
  } catch {
    lineItems = [];
  }

  if (!travelerName || !email) {
    return { status: "error", message: "Please provide your name and email." };
  }

  try {
    await prisma.booking.create({
      data: {
        journeySlug: journeySlug || "custom",
        travelerName,
        email,
        lineItems,
        total: Number.isFinite(total) ? total : 0,
        status: "CONFIRMED",
      },
    });

    return {
      status: "success",
      message: "Your journey is confirmed. A confirmation has been sent to your email.",
    };
  } catch {
    return { status: "error", message: "Could not confirm booking. Please try again." };
  }
}

export type EventFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const eventTypes = ["DESTINATION_WEDDING", "CORPORATE_MICE", "CUSTOM_GATHERING"] as const;

function parsePositiveInt(value: string) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

export async function submitEventInquiry(
  _prev: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const eventTypeRaw = String(formData.get("eventType") ?? "").trim();
  const venuePreference = String(formData.get("venuePreference") ?? "").trim();
  const guestCountRaw = String(formData.get("guestCount") ?? "").trim();

  if (!name || !email || !venuePreference) {
    return { status: "error", message: "Please complete the required fields." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  if (!eventTypes.includes(eventTypeRaw as (typeof eventTypes)[number])) {
    return { status: "error", message: "Please select an event type." };
  }

  const guestCount = parsePositiveInt(guestCountRaw);
  if (!guestCount) {
    return { status: "error", message: "Please enter a valid guest count." };
  }

  const vendorNeeds = formData
    .getAll("vendorNeeds")
    .map((value) => String(value).trim())
    .filter(Boolean);

  try {
    await prisma.eventInquiry.create({
      data: {
        name,
        email,
        phone: String(formData.get("phone") ?? "").trim() || null,
        company: String(formData.get("company") ?? "").trim() || null,
        eventType: eventTypeRaw as (typeof eventTypes)[number],
        guestCount,
        durationDays: parsePositiveInt(String(formData.get("durationDays") ?? "")),
        durationNotes: String(formData.get("durationNotes") ?? "").trim() || null,
        venuePreference,
        weddingStyle: String(formData.get("weddingStyle") ?? "").trim() || null,
        vendorNeeds,
        groupSize: parsePositiveInt(String(formData.get("groupSize") ?? "")),
        conferenceLayout: String(formData.get("conferenceLayout") ?? "").trim() || null,
        avRequirements: String(formData.get("avRequirements") ?? "").trim() || null,
        banquetDetails: String(formData.get("banquetDetails") ?? "").trim() || null,
        message: String(formData.get("message") ?? "").trim() || null,
        preferredDate: String(formData.get("preferredDate") ?? "").trim() || null,
      },
    });

    return {
      status: "success",
      message:
        "Thank you. Our events team will review your brief and respond within one business day.",
    };
  } catch {
    return {
      status: "error",
      message: "Something went wrong saving your inquiry. Please try again.",
    };
  }
}

export type CustomItineraryFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  reference?: string;
};

export async function submitCustomItinerary(
  _prev: CustomItineraryFormState,
  formData: FormData,
): Promise<CustomItineraryFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const accommodation = String(formData.get("accommodation") ?? "").trim();
  const adultsRaw = String(formData.get("adults") ?? "").trim();
  const dateMode = String(formData.get("dateMode") ?? "duration");

  if (!name || !email || !accommodation) {
    return { status: "error", message: "Please complete all required fields." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const adults = parsePositiveInt(adultsRaw);
  if (!adults) {
    return { status: "error", message: "Please enter at least one adult traveler." };
  }

  const childrenRaw = Number.parseInt(String(formData.get("children") ?? "0"), 10);
  const children = Number.isFinite(childrenRaw) && childrenRaw >= 0 ? childrenRaw : 0;

  const travelStyles = formData
    .getAll("travelStyles")
    .map((v) => String(v).trim())
    .filter(Boolean);

  if (travelStyles.length === 0) {
    return { status: "error", message: "Please select at least one travel style." };
  }

  const arrivalDate = String(formData.get("arrivalDate") ?? "").trim() || null;
  const departureDate = String(formData.get("departureDate") ?? "").trim() || null;
  const durationDays = parsePositiveInt(String(formData.get("durationDays") ?? ""));

  if (dateMode === "dates" && (!arrivalDate || !departureDate)) {
    return { status: "error", message: "Please select arrival and departure dates." };
  }

  if (dateMode === "duration" && !durationDays) {
    return { status: "error", message: "Please set your trip duration." };
  }

  try {
    const result = await submitCustomItineraryToAdmin({
      name,
      email,
      phone: String(formData.get("phone") ?? "").trim() || null,
      adults,
      children,
      travelStyles,
      accommodation,
      arrivalDate: dateMode === "dates" ? arrivalDate : null,
      departureDate: dateMode === "dates" ? departureDate : null,
      durationDays: dateMode === "duration" ? durationDays : null,
      specialRequests: String(formData.get("specialRequests") ?? "").trim() || null,
    });

    if (!result.ok) {
      const showDetails =
        process.env.NODE_ENV !== "production" || process.env.ADMIN_INGEST_DEBUG === "true";
      const detail = [result.reason, result.details].filter(Boolean).join(" — ");
      return {
        status: "error",
        message: showDetails
          ? `Could not save your request: ${detail}`
          : "Something went wrong saving your request. Please try again.",
      };
    }

    // Deferred: POST to process.env.WEBHOOK_URL and send auto-responder email

    return {
      status: "success",
      reference: result.publicRef,
      message:
        "Your custom itinerary request is received. A travel planner will contact you within 12 hours.",
    };
  } catch {
    return {
      status: "error",
      message: "Something went wrong saving your request. Please try again.",
    };
  }
}

export type TrackInquiryFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  inquiry?: InquiryTrackResult;
  email?: string;
};

export async function trackInquiry(
  _prev: TrackInquiryFormState,
  formData: FormData,
): Promise<TrackInquiryFormState> {
  const reference = String(formData.get("reference") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  if (!reference || !email) {
    return { status: "error", message: "Please enter your reference number and email." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  try {
    const result = await trackInquiryFromAdmin(reference, email);

    if (!result.ok) {
      const showDetails =
        process.env.NODE_ENV !== "production" || process.env.ADMIN_INGEST_DEBUG === "true";
      if (result.status === 404 || result.reason.includes("No inquiry found")) {
        return {
          status: "error",
          message:
            "We couldn't find an inquiry matching that reference and email. Please check your details and try again.",
        };
      }
      const detail = [result.reason, result.details].filter(Boolean).join(" — ");
      return {
        status: "error",
        message: showDetails
          ? `Could not look up your inquiry: ${detail}`
          : "Something went wrong looking up your inquiry. Please try again.",
      };
    }

    return { status: "success", inquiry: result.data, email };
  } catch {
    return {
      status: "error",
      message: "Something went wrong looking up your inquiry. Please try again.",
    };
  }
}
