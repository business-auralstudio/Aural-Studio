"use client";

import { useRef } from "react";
import Image from "next/image";
import { clamp } from "@/lib/utils";
import styles from "./Founder.module.css";

const MAX_TILT = 5; // subtle — a frame, not a gimmick

export function FounderFrame() {
  const frameRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = clamp((px - 0.5) * MAX_TILT * 2, -MAX_TILT, MAX_TILT);
    const rotateX = clamp((0.5 - py) * MAX_TILT * 2, -MAX_TILT, MAX_TILT);

    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
  }

  function handleLeave() {
    const el = frameRef.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  }

  return (
    <div className={styles.frameWrap}>
      <div className={styles.goldLine} aria-hidden="true" />
      <div ref={frameRef} className={styles.frame} onMouseMove={handleMove} onMouseLeave={handleLeave}>
        <Image
          src="/assets/founder/aagha-alvi.jpg"
          alt="Aagha Alvi, Founder and Lead Developer of AURAL STUDIO"
          fill
          sizes="(max-width: 1023px) 90vw, 420px"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
    </div>
  );
}
