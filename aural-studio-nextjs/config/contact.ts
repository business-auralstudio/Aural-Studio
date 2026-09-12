/**
 * Single source of truth for every contact detail on the site.
 * Change a number/address here once — it updates everywhere it's used.
 */

export const CONTACT = {
  phoneDisplay: "0344-2830322",
  phoneE164: "+923442830322", // international format, no spaces/dashes
  whatsappNumber: "923442830322", // wa.me format — digits only, no leading +
  email: "business.auralstudio@gmail.com",
  availability: {
    en: "Open by appointment only",
    ur: "صرف اپوائنٹمنٹ کے ذریعے",
  },
} as const;

/** Default WhatsApp greeting used by the header/hero "Book an Appointment" CTA. */
export const DEFAULT_WHATSAPP_MESSAGE = `Assalam-o-Alaikum AURAL STUDIO,
I would like to discuss a project/service with you.
Please guide me regarding your services.`;

/** Default mailto subject + body for the plain "email us" contact link. */
export const DEFAULT_EMAIL_SUBJECT = "Project Inquiry — AURAL STUDIO";

export const DEFAULT_EMAIL_BODY = `Assalam-o-Alaikum AURAL STUDIO,

I would like to discuss a project with you.

Name:
Business/Brand:
Required Service:
Project Details:

Thank you.`;
