"use client";

import { useEffect, useRef } from "react";
import { clamp } from "@/lib/utils";
import styles from "./HeroVisual.module.css";

/**
 * Abstract 3D brand visual — layered gold rings in a perspective scene,
 * with a very subtle cursor-follow parallax on hover-capable devices.
 * Pure CSS 3D (perspective/preserve-3d/translateZ) — no WebGL, no extra deps.
 * Falls back to a gentle CSS float loop on touch devices and honors
 * prefers-reduced-motion by disabling all movement.
 */
export function HeroVisual() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (prefersReduced || !canHover) return; // CSS-only float handles these cases

    function handleMove(e: MouseEvent) {
      const scene = sceneRef.current;
      if (!scene) return;
      const { innerWidth, innerHeight } = window;
      const px = e.clientX / innerWidth - 0.5; // -0.5..0.5
      const py = e.clientY / innerHeight - 0.5;

      const rotateY = clamp(px * 12, -12, 12); // subtle rotation only
      const rotateX = clamp(-py * 12, -12, 12);
      const translateX = clamp(px * 20, -20, 20); // 5–15px range in practice
      const translateY = clamp(py * 20, -20, 20);

      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        scene.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${translateX}px, ${translateY}px, 0)`;
      });
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className={styles.stage} aria-hidden="true">
      <div className={styles.scene} ref={sceneRef}>
        <div className={`${styles.ring} ${styles.ringOuter}`} />
        <div className={`${styles.ring} ${styles.ringMid}`} />
        <div className={`${styles.ring} ${styles.ringInner}`} />
        <div className={styles.orb} />
        <div className={styles.grid} />
      </div>
    </div>
  );
}
