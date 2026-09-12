import { HeroVisual } from "./HeroVisual";
import { Button } from "@/components/ui/Button";
import { HERO_CONTENT } from "@/data/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <HeroVisual />
      <div className={`container ${styles.content}`}>
        <div className={styles.eyebrow}>
          <span className={styles.rule} aria-hidden="true" />
          <span className="lang-en">{HERO_CONTENT.eyebrow.en}</span>
          <span className="lang-ur">{HERO_CONTENT.eyebrow.ur}</span>
        </div>

        <h1 className={`${styles.headline} lang-en`}>
          We design. We develop. We <span className={styles.accent}>elevate</span>.
        </h1>
        <h1 className={`${styles.headline} lang-ur urdu-display`}>
          آپ کا برانڈ، ہماری تخلیق، آپ کی پہچان، <span className={styles.accent}>ہماری ذمہ داری</span>۔
        </h1>

        <p className={`${styles.lead} lang-en`}>{HERO_CONTENT.lead.en}</p>
        <p className={`${styles.lead} lang-ur`}>{HERO_CONTENT.lead.ur}</p>

        <div className={styles.actions}>
          {/* Primary CTA opens the WhatsApp flow directly — the fastest path
              to a real conversation, per the "Book an Appointment" spec. */}
          <Button href={buildWhatsAppUrl()} variant="primary">
            <span className="lang-en">Book an Appointment</span>
            <span className="lang-ur">اپوائنٹمنٹ بک کریں</span>
          </Button>
          <Button href="#services" variant="outline">
            <span className="lang-en">See Our Services</span>
            <span className="lang-ur">خدمات دیکھیں</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
