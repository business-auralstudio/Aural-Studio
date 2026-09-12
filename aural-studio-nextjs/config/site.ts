export const SITE = {
  name: "AURAL STUDIO",
  tagline: {
    en: "Design. Develop. Elevate.",
    ur: "ڈیزائن۔ ڈیولپ۔ ایلیویٹ۔",
  },
  description: {
    en: "AURAL STUDIO — Graphic Design, UI/UX, Web Development, Software Solutions & Digital Marketing. Where vision meets execution.",
    ur: "آرل اسٹوڈیو — گرافک ڈیزائن، یو آئی/یو ایکس، ویب ڈیولپمنٹ اور ڈیجیٹل مارکیٹنگ، ایک ہی نام کے تحت۔",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://auralstudio.com",
  founder: {
    name: "Aagha Alvi",
    role: {
      en: "Founder & Lead Developer",
      ur: "بانی اور لیڈ ڈیولپر",
    },
  },
} as const;
