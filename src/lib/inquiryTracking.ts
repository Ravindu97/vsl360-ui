export const INQUIRY_STATUS_LABELS: Record<string, string> = {
  NEW: "Received — we're reviewing your request",
  CONTACTED: "Planner assigned — we'll be in touch shortly",
  QUOTED: "Quote sent — check your email",
};

export const INQUIRY_TYPE_LABELS: Record<string, string> = {
  CUSTOM_ITINERARY: "Custom Itinerary",
  QUOTE: "Travel Quote",
  EVENT: "Event Inquiry",
};

export function inquiryStatusLabel(status: string): string {
  return INQUIRY_STATUS_LABELS[status] ?? "In progress";
}

export function inquiryTypeLabel(type: string): string {
  return INQUIRY_TYPE_LABELS[type] ?? "Travel Inquiry";
}

export function formatInquiryDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
