"use server";

import { prisma } from "@/lib/prisma";
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
