"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { NAV_LINKS } from "@/config/navigation";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import styles from "./Navbar.module.css";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navLinksRef = useRef<HTMLUListElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <div className={`container ${styles.inner}`}>
          <a href="#main" className={styles.logo} aria-label="AURAL STUDIO — home">
            <Image src="/assets/brand/logo.png" alt="AURAL STUDIO" width={120} height={110} priority />
          </a>

          <ul className={`${styles.links} ${open ? styles.open : ""}`} ref={navLinksRef} id="navLinks">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="lang-en" onClick={() => setOpen(false)}>
                  {link.label.en}
                </a>
                <a href={link.href} className="lang-ur" onClick={() => setOpen(false)}>
                  {link.label.ur}
                </a>
              </li>
            ))}
            <li>
              <LanguageToggle />
            </li>
            <li>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.cta} lang-en`}
                onClick={() => setOpen(false)}
              >
                Book Appointment
              </a>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.cta} lang-ur`}
                onClick={() => setOpen(false)}
              >
                اپوائنٹمنٹ بک کریں
              </a>
            </li>
          </ul>

          <button
            ref={burgerRef}
            className={styles.burger}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="navLinks"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
      <div
        className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
    </>
  );
}
