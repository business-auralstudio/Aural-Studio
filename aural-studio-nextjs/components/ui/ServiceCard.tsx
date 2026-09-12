"use client";

import { useRef } from "react";
import { Icon } from "./Icon";
import { clamp } from "@/lib/utils";
import type { Service } from "@/types";
import styles from "./ServiceCard.module.css";

const MAX_TILT_DEG = 6; // subtle — never a gimmick

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    // matchMedia("(hover: hover)") is effectively false on touch devices,
    // so this handler is a no-op there — no jittery tilt on tap.
    if (!window.matchMedia("(hover: hover)").matches) return;

    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = clamp((px - 0.5) * MAX_TILT_DEG * 2, -MAX_TILT_DEG, MAX_TILT_DEG);
    const rotateX = clamp((0.5 - py) * MAX_TILT_DEG * 2, -MAX_TILT_DEG, MAX_TILT_DEG);

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
    });
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  }

  return (
    <div
      ref={cardRef}
      className={`${styles.card} reveal`}
      style={{ transitionDelay: `${Math.min(index * 60, 300)}ms` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
    >
      <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
      <div className={styles.icon}>
        <Icon name={service.icon} />
      </div>
      <h3 className="lang-en">{service.title.en}</h3>
      <h3 className="lang-ur">{service.title.ur}</h3>
      <p className="lang-en">{service.description.en}</p>
      <p className="lang-ur">{service.description.ur}</p>
    </div>
  );
}
