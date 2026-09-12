"use client";

import { useState } from "react";
import { validateInquiry, isValid } from "@/lib/validation";
import { buildInquiryWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import type { FormFieldErrors, FormStatus, InquiryFormData, ServiceRequired, PreferredContact } from "@/types";
import styles from "./InquiryForm.module.css";

const SERVICE_OPTIONS: ServiceRequired[] = [
  "Graphic Designing",
  "Website Development",
  "UI/UX Designing",
  "Advertising Agency",
  "Social Media Management",
  "Social Media Marketing",
  "Software Solutions",
  "Other",
];

const CONTACT_OPTIONS: { value: PreferredContact; label: string }[] = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
  { value: "either", label: "Either" },
];

const EMPTY_FORM: InquiryFormData = {
  fullName: "",
  businessName: "",
  email: "",
  whatsappNumber: "",
  serviceRequired: "",
  projectDescription: "",
  preferredContact: "",
  companyWebsite: "",
};

export function InquiryForm() {
  const [form, setForm] = useState<InquiryFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormFieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverMessage, setServerMessage] = useState<string>("");

  function update<K extends keyof InquiryFormData>(key: K, value: InquiryFormData[K]) {
    // Never wipe the rest of the form on a single-field edit.
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validateInquiry(form);
    setErrors(nextErrors);
    if (!isValid(nextErrors)) return;

    setStatus("submitting");
    setServerMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setServerMessage(data.message || "Something went wrong. You can still reach us on WhatsApp below.");
        if (data.errors) setErrors(data.errors);
      }
    } catch {
      setStatus("error");
      setServerMessage("Network error. You can still reach us on WhatsApp below.");
    }
  }

  function continueOnWhatsApp() {
    const message = buildInquiryWhatsAppMessage(form);
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  }

  if (status === "success") {
    return (
      <div className={styles.success} role="status">
        <h3>Thank you — your inquiry is in.</h3>
        <p>We&rsquo;ll get back to you shortly. Prefer a faster reply? Continue the conversation on WhatsApp.</p>
        <button type="button" className={styles.whatsappBtn} onClick={continueOnWhatsApp}>
          Continue on WhatsApp
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Honeypot — kept off-screen (not display:none, which basic bots
          specifically detect and skip) and hidden from assistive tech via
          aria-hidden, so it never confuses a screen-reader user. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="companyWebsite">Company Website</label>
        <input
          id="companyWebsite"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.companyWebsite}
          onChange={(e) => update("companyWebsite", e.target.value)}
        />
      </div>

      <div className={styles.row}>
        <Field label="Full Name" htmlFor="fullName" error={errors.fullName} required>
          <input
            id="fullName"
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            maxLength={80}
            aria-invalid={!!errors.fullName}
          />
        </Field>
        <Field label="Business / Brand Name" htmlFor="businessName" error={errors.businessName}>
          <input
            id="businessName"
            value={form.businessName}
            onChange={(e) => update("businessName", e.target.value)}
            maxLength={100}
          />
        </Field>
      </div>

      <div className={styles.row}>
        <Field label="Email" htmlFor="email" error={errors.email} required>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            maxLength={120}
            aria-invalid={!!errors.email}
          />
        </Field>
        <Field label="WhatsApp Number" htmlFor="whatsappNumber" error={errors.whatsappNumber} required>
          <input
            id="whatsappNumber"
            type="tel"
            placeholder="+92 3XX XXXXXXX"
            value={form.whatsappNumber}
            onChange={(e) => update("whatsappNumber", e.target.value)}
            maxLength={20}
            aria-invalid={!!errors.whatsappNumber}
          />
        </Field>
      </div>

      <div className={styles.row}>
        <Field label="Service Required" htmlFor="serviceRequired" error={errors.serviceRequired} required>
          <select
            id="serviceRequired"
            value={form.serviceRequired}
            onChange={(e) => update("serviceRequired", e.target.value as ServiceRequired)}
            aria-invalid={!!errors.serviceRequired}
          >
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Preferred Contact Method" htmlFor="preferredContact" error={errors.preferredContact} required>
          <select
            id="preferredContact"
            value={form.preferredContact}
            onChange={(e) => update("preferredContact", e.target.value as PreferredContact)}
            aria-invalid={!!errors.preferredContact}
          >
            <option value="">Select an option</option>
            {CONTACT_OPTIONS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Project Description" htmlFor="projectDescription" error={errors.projectDescription} required>
        <textarea
          id="projectDescription"
          rows={5}
          value={form.projectDescription}
          onChange={(e) => update("projectDescription", e.target.value)}
          maxLength={2000}
          aria-invalid={!!errors.projectDescription}
        />
      </Field>

      {status === "error" && (
        <p className={styles.formError} role="alert">
          {serverMessage}
        </p>
      )}

      <div className={styles.actions}>
        <button type="submit" className={styles.submitBtn} disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send Inquiry"}
        </button>
        <button type="button" className={styles.whatsappBtnGhost} onClick={continueOnWhatsApp}>
          Or continue on WhatsApp
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={htmlFor}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </label>
      {children}
      {error && (
        <span className={styles.errorText} id={`${htmlFor}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}
