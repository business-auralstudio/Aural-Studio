import { CONTACT, DEFAULT_WHATSAPP_MESSAGE } from "@/config/contact";
import type { InquiryFormData } from "@/types";

/** Build a wa.me URL with a pre-filled, URL-encoded message. The user still presses Send. */
export function buildWhatsAppUrl(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Structured message generated from a validated inquiry form submission. */
export function buildInquiryWhatsAppMessage(data: InquiryFormData): string {
  const lines = [
    "New Project Inquiry — AURAL STUDIO",
    "",
    `Name: ${data.fullName}`,
    `Business: ${data.businessName || "-"}`,
    `Email: ${data.email}`,
    `WhatsApp: ${data.whatsappNumber}`,
    `Service: ${data.serviceRequired || "-"}`,
    `Project: ${data.projectDescription}`,
    `Preferred Contact: ${data.preferredContact || "-"}`,
  ];
  return lines.join("\n");
}
