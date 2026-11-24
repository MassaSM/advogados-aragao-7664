import { useEffect, useRef, useState } from "react";
import { getGsap, isLowPower, prefersReducedMotion } from "../../lib/motion";

/** Cursor personalizado: ponto preciso + anel com follow suave. Somente desktop. */
export function Cursor() {
  const dot = useRef<HTMLDivElement | null>(null);
  const ring = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || isLowPower()) return;
    if (!window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dotEl = dot.current;
    const ringEl = ring.current;
    if (!dotEl || !ringEl) return;

    const { gsap } = getGsap();
    const dx = gsap.quickTo(dotEl, "x", { duration: 0.12, ease: "power3.out" });
    const dy = gsap.quickTo(dotEl, "y", { duration: 0.12, ease: "power3.out" });
    const rx = gsap.quickTo(ringEl, "x", { duration: 0.55, ease: "power3.out" });
    const ry = gsap.quickTo(ringEl, "y", { duration: 0.55, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      const target = e.target as HTMLElement | null;
      const interactive = Boolean(
        target?.closest("a, button, input, select, textarea, [role='button']"),
      );
      gsap.to(ringEl, {
        scale: interactive ? 1.9 : 1,
        borderColor: interactive
          ? "rgba(232,206,122,0.9)"
          : "rgba(232,206,122,0.35)",
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const onLeave = () => gsap.to([dotEl, ringEl], { opacity: 0, duration: 0.25 });
    const onEnter = () => gsap.to([dotEl, ringEl], { opacity: 1, duration: 0.25 });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      document.documentElement.style.cursor = "";
      gsap.killTweensOf([dotEl, ringEl]);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-100">
      <div
        ref={ring}
        className="absolute -left-5 -top-5 h-10 w-10 rounded-full border"
        style={{ borderColor: "rgba(232,206,122,0.35)" }}
      />
      <div
        ref={dot}
        className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-gold-light"
      />
    </div>
  );
}
