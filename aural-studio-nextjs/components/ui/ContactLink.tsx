import { CONTACT, DEFAULT_EMAIL_BODY, DEFAULT_EMAIL_SUBJECT } from "@/config/contact";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import styles from "./ContactLink.module.css";

const WHATSAPP_ICON = (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 20l.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
  </svg>
);

const MAIL_ICON = (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <path d="M4 4h16v16H4Z" />
    <path d="m4 6 8 7 8-7" />
  </svg>
);

/** WhatsApp contact link — opens wa.me with a pre-filled, editable greeting. User still presses Send. */
export function WhatsAppLink({ label, className }: { label: string; className?: string }) {
  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.row} ${className || ""}`}
      aria-label={`Chat with AURAL STUDIO on WhatsApp: ${CONTACT.phoneDisplay}`}
    >
      <span className={styles.iconSm}>{WHATSAPP_ICON}</span>
      <span>{label}</span>
    </a>
  );
}

/** mailto link — pre-fills subject + a structured body template. */
export function EmailLink({ className }: { className?: string }) {
  const href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    DEFAULT_EMAIL_SUBJECT
  )}&body=${encodeURIComponent(DEFAULT_EMAIL_BODY)}`;

  return (
    <a href={href} className={`${styles.row} ${className || ""}`} aria-label={`Email AURAL STUDIO at ${CONTACT.email}`}>
      <span className={styles.iconSm}>{MAIL_ICON}</span>
      <span>{CONTACT.email}</span>
    </a>
  );
}
