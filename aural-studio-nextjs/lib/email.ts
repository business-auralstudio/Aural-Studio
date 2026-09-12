import type { InquiryFormData } from "@/types";

/**
 * Sends the inquiry notification email via Resend.
 * Server-only — never import this from a Client Component.
 * Requires RESEND_API_KEY + CONTACT_FROM_EMAIL + CONTACT_EMAIL in the environment.
 */
export async function sendInquiryEmail(data: InquiryFormData): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_EMAIL || "business.auralstudio@gmail.com";

  if (!apiKey || !from) {
    // Fail loudly server-side, gracefully client-side (see route.ts).
    console.error(
      "[email] Missing RESEND_API_KEY or CONTACT_FROM_EMAIL — inquiry not sent. See .env.example."
    );
    return { ok: false, error: "Email service is not configured." };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const html = `
      <h2>New Project Inquiry — AURAL STUDIO</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.fullName)}</p>
      <p><strong>Business:</strong> ${escapeHtml(data.businessName || "-")}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>WhatsApp:</strong> ${escapeHtml(data.whatsappNumber)}</p>
      <p><strong>Service:</strong> ${escapeHtml(data.serviceRequired || "-")}</p>
      <p><strong>Preferred Contact:</strong> ${escapeHtml(data.preferredContact || "-")}</p>
      <p><strong>Project Details:</strong></p>
      <p>${escapeHtml(data.projectDescription).replace(/\n/g, "<br/>")}</p>
    `;

    const result = await resend.emails.send({
      from: `AURAL STUDIO Website <${from}>`,
      to,
      replyTo: data.email,
      subject: `New Inquiry — ${data.fullName}`,
      html,
    });

    if (result.error) {
      console.error("[email] Resend error:", result.error);
      return { ok: false, error: "Failed to send email." };
    }
    return { ok: true };
  } catch (err) {
    console.error("[email] Unexpected error:", err);
    return { ok: false, error: "Failed to send email." };
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
