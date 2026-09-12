import type { Metadata, Viewport } from "next";
import { SITE } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: `${SITE.name} — ${SITE.tagline.en}`,
  description: SITE.description.en,
  alternates: {
    canonical: SITE.url,
  },
  icons: {
    icon: "/assets/brand/favicon-32.png",
    shortcut: "/assets/brand/favicon-32.png",
  },
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline.en}`,
    description: SITE.description.en,
    url: SITE.url,
    siteName: SITE.name,
    images: [{ url: "/assets/brand/logo.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline.en}`,
    description: SITE.description.en,
    images: ["/assets/brand/logo.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" data-lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Noto+Nastaliq+Urdu:wght@700&family=Noto+Naskh+Arabic:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
