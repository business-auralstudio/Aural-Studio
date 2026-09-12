import { LOCAL_SERVICES } from "@/data/local-services";
import { LOCAL_SERVICES_SECTION_CONTENT } from "@/data/content";
import styles from "./LocalServices.module.css";

export function LocalServices() {
  return (
    <section className={styles.section} id="local-services">
      <div className={`container ${styles.inner}`}>
        <div className={`${styles.head} reveal`}>
          <div className={styles.ruleLabel}>
            <span className={styles.line} aria-hidden="true" />
            <span className="lang-en">{LOCAL_SERVICES_SECTION_CONTENT.eyebrow.en}</span>
          </div>
          <h2 className="urdu-display">مقامی و اردو خدمات</h2>
          <p className="lang-en">{LOCAL_SERVICES_SECTION_CONTENT.note.en}</p>
        </div>

        <ul className={`${styles.list} reveal`}>
          {LOCAL_SERVICES.map((item) => (
            <li key={item.id} className={styles.item}>
              <span className={styles.dot} aria-hidden="true" />
              <span className="urdu-display">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
