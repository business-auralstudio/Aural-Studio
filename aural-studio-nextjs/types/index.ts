export type Language = "en" | "ur";

/** Bilingual string pair used throughout content/data files. */
export interface Bilingual {
  en: string;
  ur: string;
}

export interface NavLink {
  href: string;
  label: Bilingual;
}

export type ServiceIconKey =
  | "graphic-design"
  | "ui-ux"
  | "web-dev"
  | "software"
  | "advertising"
  | "social-management"
  | "social-marketing";

export interface Service {
  id: string;
  icon: ServiceIconKey;
  title: Bilingual;
  description: Bilingual;
}

export interface LocalService {
  id: string;
  label: string; // Urdu label only — this section is intentionally Urdu-first
}

export type PreferredContact = "whatsapp" | "email" | "either";

export type ServiceRequired =
  | "Graphic Designing"
  | "Website Development"
  | "UI/UX Designing"
  | "Advertising Agency"
  | "Social Media Management"
  | "Social Media Marketing"
  | "Software Solutions"
  | "Other";

export interface InquiryFormData {
  fullName: string;
  businessName: string;
  email: string;
  whatsappNumber: string;
  serviceRequired: ServiceRequired | "";
  projectDescription: string;
  preferredContact: PreferredContact | "";
  /** Honeypot field — must stay empty. Real users never see or fill this. */
  companyWebsite: string;
}

export type FormFieldErrors = Partial<Record<keyof InquiryFormData, string>>;

export type FormStatus = "idle" | "submitting" | "success" | "error";
