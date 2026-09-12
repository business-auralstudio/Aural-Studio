import { SERVICES } from "@/data/services";
import { SERVICES_SECTION_CONTENT } from "@/data/content";
import { ServiceCard } from "@/components/ui/ServiceCard";
import styles from "./Services.module.css";

export function Services() {
  return (
    <section className={styles.services} id="services">
      <div className="container">
        <div className={`${styles.head} reveal`}>
          <div className={styles.ruleLabel}>
            <span className={styles.line} aria-hidden="true" />
            <span className="lang-en">{SERVICES_SECTION_CONTENT.eyebrow.en}</span>
            <span className="lang-ur">{SERVICES_SECTION_CONTENT.eyebrow.ur}</span>
          </div>
          <h2 className="lang-en">{SERVICES_SECTION_CONTENT.heading.en}</h2>
          <h2 className="lang-ur urdu-display">{SERVICES_SECTION_CONTENT.heading.ur}</h2>
        </div>

        <div className={styles.grid}>
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
