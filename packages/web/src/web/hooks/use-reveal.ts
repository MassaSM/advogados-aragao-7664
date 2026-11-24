import { useEffect, useRef } from "react";
import { getGsap, prefersReducedMotion, splitWords } from "../lib/motion";

/**
 * Reveal padrão do site: elementos com `.will-reveal` dentro do container entram
 * com stagger quando a seção alcança a viewport. Elementos com `data-split`
 * são revelados palavra por palavra sob máscara.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      root.querySelectorAll<HTMLElement>(".will-reveal").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    const { gsap, ScrollTrigger } = getGsap();

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        const words = splitWords(el);
        gsap.to(words, {
          yPercent: 0,
          y: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.045,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      const groups = new Map<Element, HTMLElement[]>();
      root.querySelectorAll<HTMLElement>(".will-reveal").forEach((el) => {
        const parent = el.closest("[data-reveal-group]") ?? root;
        const list = groups.get(parent) ?? [];
        list.push(el);
        groups.set(parent, list);
      });

      groups.forEach((els, parent) => {
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 1.05,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: { trigger: parent, start: "top 85%", once: true },
        });
      });

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, []);

  return ref;
}
