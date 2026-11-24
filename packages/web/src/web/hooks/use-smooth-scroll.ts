import { useEffect } from "react";
import Lenis from "lenis";
import { getGsap, prefersReducedMotion } from "../lib/motion";

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

/** Smooth scroll global sincronizado com o ticker do GSAP/ScrollTrigger. */
export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled || prefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = getGsap();
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [enabled]);
}

/** Scroll suave até uma âncora, respeitando o Lenis quando ativo. */
export function scrollToSection(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}
