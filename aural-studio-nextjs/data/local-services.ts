import type { LocalService } from "@/types";

/**
 * Local/Urdu-market service list, sourced from the supplied Urdu banner asset.
 * Intentionally Urdu-only labels — this is a refined secondary section for
 * local clients, not a translation of the main English service grid.
 */
export const LOCAL_SERVICES: LocalService[] = [
  { id: "urdu-graphic-design", label: "اردو گرافک ڈیزائننگ" },
  { id: "advertising-design", label: "اشتہاری ڈیزائن" },
  { id: "press-print-design", label: "پریس / پرنٹ ڈیزائن" },
  { id: "banner-design", label: "بینر ڈیزائن" },
  { id: "flex-design", label: "فلیکس ڈیزائن" },
  { id: "brochure-flyer-design", label: "بروشر / فلائر ڈیزائن" },
  { id: "social-media-design", label: "سوشل میڈیا ڈیزائن" },
  { id: "business-promo-material", label: "کاروباری تشہیری مواد" },
];
