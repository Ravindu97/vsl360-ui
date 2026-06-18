// Central place for support contact details. Update the number to your
// WhatsApp Business line; format is international, digits only, no "+".
export const WHATSAPP_NUMBER = "61483909556";
export const SUPPORT_PHONE = "+61 483 909 556";

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
