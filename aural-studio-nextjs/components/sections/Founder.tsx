import Image from "next/image";
import { FounderFrame } from "./FounderFrame";
import { SITE } from "@/config/site";
import { ABOUT_CONTENT } from "@/data/content";
import styles from "./Founder.module.css";

export function Founder() {
  return (
    <section className={styles.about} id="about">
      <div className={`container ${styles.grid}`}>
        <div className={`${styles.visual} reveal`}>
          <FounderFrame />
        </div>

        <div className={`${styles.text} reveal`}>
          <span className={styles.quote} aria-hidden="true">
            &ldquo;
          </span>
          <p className={`${styles.bio} lang-en`}>{ABOUT_CONTENT.bio.en}</p>
          <p className={`${styles.bio} lang-ur`}>{ABOUT_CONTENT.bio.ur}</p>

          <div className={styles.signoff}>
            <Image
              src="/assets/founder/signature.png"
              alt={`Signature of ${SITE.founder.name}`}
              width={220}
              height={110}
              className={styles.signature}
            />
            <div>
              <div className={styles.name}>{SITE.founder.name}</div>
              <div className={`${styles.role} lang-en`}>{SITE.founder.role.en}</div>
              <div className={`${styles.role} lang-ur`}>{SITE.founder.role.ur}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
