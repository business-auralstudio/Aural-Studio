import Image from "next/image";
import { CONTACT_SECTION_CONTENT } from "@/data/content";
import { CONTACT } from "@/config/contact";
import { WhatsAppLink, EmailLink } from "@/components/ui/ContactLink";
import { InquiryForm } from "@/components/forms/InquiryForm";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section className={styles.contact} id="contact">
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.grid}`}>
        <div className={`${styles.info} reveal`}>
          <h2 className="lang-en">{CONTACT_SECTION_CONTENT.heading.en}</h2>
          <h2 className="lang-ur">{CONTACT_SECTION_CONTENT.heading.ur}</h2>
          <p className="lang-en">{CONTACT_SECTION_CONTENT.lead.en}</p>
          <p className="lang-ur">{CONTACT_SECTION_CONTENT.lead.ur}</p>

          <div className={styles.links}>
            <WhatsAppLink label={CONTACT.phoneDisplay} />
            <EmailLink />
          </div>

          <p className={`${styles.note} lang-en`}>{CONTACT.availability.en}</p>
          <p className={`${styles.note} lang-ur`}>{CONTACT.availability.ur}</p>

          <div className={styles.qr}>
            <Image src="/assets/brand/qr-whatsapp.png" alt="QR code to chat with AURAL STUDIO on WhatsApp" width={140} height={140} />
            <span>
              <span className="lang-en">Scan to chat</span>
              <span className="lang-ur">اسکین کریں</span>
            </span>
          </div>
        </div>

        <div className={`${styles.formCard} reveal`}>
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}
