import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Registra os plugins uma única vez e devolve o gsap configurado. */
export function getGsap() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: "power3.out", duration: 1 });
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isDesktop() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(min-width: 1024px)").matches;
}

/** Dispositivos com pouca capacidade: reduzimos efeitos pesados (blur, pin, parallax). */
export function isLowPower() {
  if (typeof window === "undefined") return false;
  const cores = navigator.hardwareConcurrency ?? 8;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  return coarse || cores <= 2;
}

/** Divide um texto em palavras envolvidas por máscaras, para reveal linha a linha. */
export function splitWords(el: HTMLElement) {
  // Já dividido (ex.: remontagem do componente): reaplica o estado inicial pelo GSAP.
  if (el.dataset.split === "true") {
    const existing = Array.from(el.querySelectorAll<HTMLElement>(".word-mask > span"));
    gsap.set(existing, { yPercent: 105, y: 0 });
    return existing;
  }
  const text = el.textContent ?? "";
  el.textContent = "";
  const frag = document.createDocumentFragment();
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const mask = document.createElement("span");
    mask.className = "word-mask";
    const inner = document.createElement("span");
    inner.textContent = word;
    mask.appendChild(inner);
    frag.appendChild(mask);
    frag.appendChild(document.createTextNode(" "));
  }
  el.appendChild(frag);
  el.dataset.split = "true";
  const spans = Array.from(el.querySelectorAll<HTMLElement>(".word-mask > span"));
  // O estado inicial precisa ser escrito pelo próprio GSAP: o transform em % do CSS
  // é lido como pixels e faria o tween de yPercent começar já em zero.
  gsap.set(spans, { yPercent: 105, y: 0 });
  return spans;
}
