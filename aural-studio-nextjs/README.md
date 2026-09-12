# AURAL STUDIO — Production Website

Next.js 14 (App Router) + TypeScript. Dark/gold premium agency site with
bilingual EN/UR content, CSS-3D hero + service cards, and a working
contact form (WhatsApp deep-link + server-side email via Resend).

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY, CONTACT_FROM_EMAIL
npm run dev                  # http://localhost:3000
```

> **Built without network access.** This project was scaffolded and coded
> in a sandboxed environment with no access to the npm registry, so
> `npm install` has never been run here and `next build` has never been
> executed against it. Every file was hand-written and cross-checked
> (import resolution, JSX/TS syntax via `tsc`, image paths verified
> against `public/assets`) but you should run `npm install && npm run
> build` locally as the real first build — treat that as part of this
> delivery, not an optional step.

## Environment variables

See `.env.example`. Required for the contact form to actually send email:

- `RESEND_API_KEY` — from resend.com
- `CONTACT_FROM_EMAIL` — must be on a domain verified with Resend (a
  gmail.com address cannot be a sender, only the receiving `CONTACT_EMAIL`)
- `CONTACT_EMAIL` — defaults to business.auralstudio@gmail.com

Without these set, the form still validates and the WhatsApp fallback
still works — only the email send will fail gracefully with a message
pointing the user to WhatsApp instead.

## Architecture

```
app/                  Routes (App Router) — layout, home page, API route
components/
  layout/              Navbar, Footer
  sections/            Hero, Services, LocalServices, Founder, Contact
  ui/                  Button, ServiceCard, ContactLink, LanguageToggle, Icon
  forms/               InquiryForm
config/                Site metadata, contact constants, nav links
data/                  Services, local/Urdu services, section copy — EN/UR
lib/                   whatsapp.ts, email.ts, validation.ts, utils.ts
public/assets/         Optimized brand + founder images
types/                 Shared TypeScript types
```

Content lives in `config/` and `data/`, never hardcoded inside
components — update a phone number or a service description once and
it's correct everywhere.

## Language toggle

Both EN and UR copy render in the DOM at all times; `LanguageToggle`
flips `data-lang`/`lang`/`dir` on `<html>`, and `globals.css` shows/hides
via `[data-lang]`. Since `direction` is inherited, grids and flex rows
mirror automatically in RTL — no per-component RTL overrides needed
beyond the couple of `html[dir="rtl"]` rules for physically-positioned
elements (mobile nav drawer, card numbering).

## 3D system

Pure CSS (`perspective`, `transform-style: preserve-3d`, `translateZ`) —
no Three.js, no Framer Motion, zero extra runtime dependencies:

- `HeroVisual` — layered rings + orb, subtle cursor-parallax on
  hover-capable devices, gentle CSS float loop otherwise
- `ServiceCard` — mouse-tilt on hover (desktop only, `hover: hover`
  media check), inert on touch
- `FounderFrame` — same tilt treatment, smaller range

All of it is skipped/flattened under `prefers-reduced-motion: reduce`.

## Contact form flow

1. Client-side validation (`lib/validation.ts`) for instant feedback.
2. `POST /api/contact` re-validates server-side (never trusts the
   client), sanitizes input, checks the honeypot field, rate-limits by
   IP (in-memory — fine for low traffic; swap for Redis/Upstash if this
   ever needs to scale), then sends via Resend.
3. On any failure, the UI surfaces a "continue on WhatsApp" fallback
   with a pre-filled, structured message — the user is never stuck.

## What still needs a human pass

- Run `npm install && npm run build` and fix whatever the real Next.js/
  TypeScript compiler flags that this sandbox couldn't catch without
  `node_modules`.
- Verify Resend sending-domain setup before relying on the email path.
- Native-speaker review of the Urdu copy in `data/`.
- Replace `NEXT_PUBLIC_SITE_URL` / canonical domain once you have one.
