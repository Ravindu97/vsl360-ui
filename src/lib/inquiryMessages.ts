import { SUPPORT_EMAIL } from "@/lib/contact";

const DEFAULT_PUBLIC_SITE_URL = "https://visitsrilanka360.com";

export function publicSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_PUBLIC_SITE_URL).replace(/\/$/, "");
}

export function trackInquiryUrl(reference: string, email: string): string {
  const params = new URLSearchParams({
    ref: reference.trim(),
    email: email.trim(),
  });
  return `${publicSiteUrl()}/track?${params}`;
}

export function inquirySubmittedWhatsAppMessage(reference: string): string {
  return `Hi VSL 360, I just submitted a custom itinerary request (ref: ${reference}). Looking forward to hearing from your team.`;
}

export function inquirySubmittedEmailUrl(reference: string, email: string): string {
  const subject = `Custom Itinerary Request — ${reference}`;
  const trackUrl = trackInquiryUrl(reference, email);
  const body = [
    "Hi VSL 360 team,",
    "",
    `I submitted a custom Sri Lanka itinerary request.`,
    "",
    `Reference: ${reference}`,
    `Track link: ${trackUrl}`,
    "",
    "Thank you,",
  ].join("\n");
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function lostReferenceWhatsAppMessage(): string {
  return "Hi VSL 360, I need help locating my travel inquiry reference. I submitted a request but don't have my reference number.";
}
