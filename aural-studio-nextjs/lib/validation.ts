import type { FormFieldErrors, InquiryFormData } from "@/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Loose but sane check for Pakistani-style numbers with optional country code.
const PHONE_RE = /^[+]?[\d\s-]{7,15}$/;

export const MAX_LENGTHS = {
  fullName: 80,
  businessName: 100,
  email: 120,
  whatsappNumber: 20,
  projectDescription: 2000,
} as const;

/**
 * Validates a submitted inquiry. Runs both client-side (for instant feedback)
 * and server-side (source of truth — never trust the client alone).
 */
export function validateInquiry(data: InquiryFormData): FormFieldErrors {
  const errors: FormFieldErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Full name is required.";
  } else if (data.fullName.length > MAX_LENGTHS.fullName) {
    errors.fullName = `Keep it under ${MAX_LENGTHS.fullName} characters.`;
  }

  if (data.businessName.length > MAX_LENGTHS.businessName) {
    errors.businessName = `Keep it under ${MAX_LENGTHS.businessName} characters.`;
  }

  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(data.email) || data.email.length > MAX_LENGTHS.email) {
    errors.email = "Enter a valid email address.";
  }

  if (!data.whatsappNumber.trim()) {
    errors.whatsappNumber = "WhatsApp number is required.";
  } else if (!PHONE_RE.test(data.whatsappNumber)) {
    errors.whatsappNumber = "Enter a valid phone number.";
  }

  if (!data.serviceRequired) {
    errors.serviceRequired = "Select a service.";
  }

  if (!data.projectDescription.trim()) {
    errors.projectDescription = "Tell us a little about the project.";
  } else if (data.projectDescription.length > MAX_LENGTHS.projectDescription) {
    errors.projectDescription = `Keep it under ${MAX_LENGTHS.projectDescription} characters.`;
  }

  if (!data.preferredContact) {
    errors.preferredContact = "Choose how we should reach you.";
  }

  // Honeypot: real users never see/fill this. Anything here = bot.
  if (data.companyWebsite.trim().length > 0) {
    errors.companyWebsite = "Spam check failed.";
  }

  return errors;
}

export function isValid(errors: FormFieldErrors): boolean {
  return Object.keys(errors).length === 0;
}

/** Strips characters that have no business being in plain-text form fields. */
export function sanitizeText(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}
