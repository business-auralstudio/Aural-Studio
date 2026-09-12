"use client";

import { useState } from "react";
import styles from "./LanguageToggle.module.css";
import type { Language } from "@/types";

/**
 * Toggles document-level language/direction attributes. Both EN and UR copy
 * already exist in the DOM (see globals.css `[data-lang]` rules) — this just
 * flips which one is visible and sets the correct `dir` for native RTL
 * behavior (scrollbars, form controls, bidi text).
 */
export function LanguageToggle() {
  const [lang, setLang] = useState<Language>("en");

  function setLanguage(next: Language) {
    setLang(next);
    const html = document.documentElement;
    html.setAttribute("data-lang", next);
    html.setAttribute("lang", next);
    html.setAttribute("dir", next === "ur" ? "rtl" : "ltr");
  }

  return (
    <div className={styles.toggle} role="group" aria-label="Language">
      <button type="button" aria-pressed={lang === "en"} onClick={() => setLanguage("en")}>
        EN
      </button>
      <button type="button" aria-pressed={lang === "ur"} onClick={() => setLanguage("ur")}>
        اردو
      </button>
    </div>
  );
}
