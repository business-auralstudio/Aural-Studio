import { NextRequest, NextResponse } from "next/server";
import { validateInquiry, isValid, sanitizeText, MAX_LENGTHS } from "@/lib/validation";
import { sendInquiryEmail } from "@/lib/email";
import type { InquiryFormData } from "@/types";

// Ensures this route always runs server-side, never statically cached.
export const dynamic = "force-dynamic";

/**
 * Minimal in-memory rate limiter (best-effort, resets on redeploy/restart).
 * Fine for a low-traffic inquiry form. Swap for Upstash/Redis if traffic grows.
 */
const submissionsByIp = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissionsByIp.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  submissionsByIp.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, message: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
    }

    // Sanitize + coerce every field to a bounded string before validating.
    const data: InquiryFormData = {
      fullName: sanitizeText(String(body.fullName ?? "")).slice(0, MAX_LENGTHS.fullName),
      businessName: sanitizeText(String(body.businessName ?? "")).slice(0, MAX_LENGTHS.businessName),
      email: sanitizeText(String(body.email ?? "")).slice(0, MAX_LENGTHS.email),
      whatsappNumber: sanitizeText(String(body.whatsappNumber ?? "")).slice(0, MAX_LENGTHS.whatsappNumber),
      serviceRequired: body.serviceRequired ?? "",
      projectDescription: sanitizeText(String(body.projectDescription ?? "")).slice(
        0,
        MAX_LENGTHS.projectDescription
      ),
      preferredContact: body.preferredContact ?? "",
      companyWebsite: sanitizeText(String(body.companyWebsite ?? "")), // honeypot
    };

    const errors = validateInquiry(data);
    if (!isValid(errors)) {
      // Honeypot tripped — pretend success so bots don't learn anything, but don't send.
      if (errors.companyWebsite) {
        return NextResponse.json({ ok: true });
      }
      return NextResponse.json({ ok: false, errors }, { status: 422 });
    }

    const result = await sendInquiryEmail(data);
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, message: result.error || "Something went wrong. Please try WhatsApp instead." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/contact] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try WhatsApp instead." },
      { status: 500 }
    );
  }
}
