import type { ServiceIconKey } from "@/types";

/**
 * Minimal geometric line-icon set, inline as SVG (no icon-library dependency).
 * Matches the gold-stroke, 1.6px-weight language used across the brand.
 */
const PATHS: Record<ServiceIconKey, React.ReactNode> = {
  "graphic-design": (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </>
  ),
  "ui-ux": (
    <>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  "web-dev": (
    <>
      <rect x="2" y="4" width="20" height="13" rx="1.5" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  software: (
    <>
      <path d="m8 9-5 3 5 3M16 9l5 3-5 3M13 5l-2 14" />
    </>
  ),
  advertising: (
    <>
      <path d="M3 11v2a1 1 0 0 0 1 1h2l4 4V6L6 10H4a1 1 0 0 0-1 1Z" />
      <path d="M16 8a4 4 0 0 1 0 8M19 5a8 8 0 0 1 0 14" />
    </>
  ),
  "social-management": (
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 20l.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
  ),
  "social-marketing": <path d="M3 17V9M9 17V5M15 17v-7M21 17V3" />,
};

export function Icon({ name }: { name: ServiceIconKey }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.6}>
      {PATHS[name]}
    </svg>
  );
}
