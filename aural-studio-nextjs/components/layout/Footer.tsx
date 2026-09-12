import Image from "next/image";
import { SITE } from "@/config/site";
import { CONTACT } from "@/config/contact";
import { NAV_LINKS } from "@/config/navigation";
import { WhatsAppLink, EmailLink } from "@/components/ui/ContactLink";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <Image src="/assets/brand/logo.png" alt="AURAL STUDIO" width={120} height={110} />
          <p className="lang-en">{SITE.tagline.en}</p>
          <p className="lang-ur">{SITE.tagline.ur}</p>
        </div>

        <div className={styles.col}>
          <span className={styles.heading}>
            <span className="lang-en">Founder</span>
            <span className="lang-ur">بانی</span>
          </span>
          <p>{SITE.founder.name}</p>
          <p className={styles.muted}>
            <span className="lang-en">{SITE.founder.role.en}</span>
            <span className="lang-ur">{SITE.founder.role.ur}</span>
          </p>
        </div>

        <div className={styles.col}>
          <span className={styles.heading}>
            <span className="lang-en">Contact</span>
            <span className="lang-ur">رابطہ</span>
          </span>
          <WhatsAppLink label={CONTACT.phoneDisplay} className={styles.footerLink} />
          <EmailLink className={styles.footerLink} />
          <p className={`${styles.muted} lang-en`}>{CONTACT.availability.en}</p>
          <p className={`${styles.muted} lang-ur`}>{CONTACT.availability.ur}</p>
        </div>

        <div className={styles.col}>
          <span className={styles.heading}>
            <span className="lang-en">Services</span>
            <span className="lang-ur">خدمات</span>
          </span>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.footerLink}>
              <span className="lang-en">{link.label.en}</span>
              <span className="lang-ur">{link.label.ur}</span>
            </a>
          ))}
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span className="lang-en">© {year} AURAL STUDIO. All rights reserved.</span>
        <span className="lang-ur">© {year} آرل اسٹوڈیو۔ جملہ حقوق محفوظ ہیں۔</span>
      </div>
    </footer>
  );
}
