import { useEffect, useRef } from "react";
import { ArrowDown, MessageCircle } from "lucide-react";
import { FIRM, whatsappLink } from "../../lib/site";
import { getGsap, isLowPower, prefersReducedMotion, splitWords } from "../../lib/motion";
import { scrollToSection } from "../../hooks/use-smooth-scroll";

type HeroProps = {
  /** Dispara a sequência de entrada assim que o preloader termina. */
  ready: boolean;
};

export function Hero({ ready }: HeroProps) {
  const root = useRef<HTMLElement | null>(null);
  const media = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !ready) return;

    if (prefersReducedMotion()) {
      el.querySelectorAll<HTMLElement>(".hero-in").forEach((n) => {
        n.style.opacity = "1";
        n.style.transform = "none";
      });
      const img = el.querySelector<HTMLElement>(".hero-img");
      if (img) img.style.clipPath = "inset(0% 0% 0% 0%)";
      return;
    }

    const { gsap, ScrollTrigger } = getGsap();
    const light = !isLowPower();

    const ctx = gsap.context(() => {
      const title = el.querySelector<HTMLElement>(".hero-title");
      const words = title ? splitWords(title) : [];

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        ".hero-img",
        { clipPath: "inset(18% 12% 18% 12%)", scale: 1.24, opacity: 0.25 },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1.06, opacity: 1, duration: 1.9 },
        0,
      )
        .fromTo(
          ".hero-sweep",
          { xPercent: -140, opacity: 0.9 },
          { xPercent: 240, opacity: 0, duration: 1.7, ease: "power2.inOut" },
          0.15,
        )
        .fromTo(
          ".hero-eyebrow",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 1 },
          0.5,
        )
        .to(words, { yPercent: 0, y: 0, duration: 1.25, stagger: 0.075, ease: "power4.out" }, 0.65)
        .fromTo(
          ".hero-rule",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, ease: "power3.inOut" },
          1.15,
        )
        .fromTo(
          ".hero-stagger",
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 1.05, stagger: 0.12 },
          1.25,
        )
        .fromTo(".hero-scroll", { opacity: 0 }, { opacity: 1, duration: 0.9 }, 1.7);

      // Parallax cinematográfico no scroll
      gsap.to(".hero-img", {
        yPercent: light ? 14 : 8,
        scale: 1.16,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-copy", {
        yPercent: -18,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });

      // Movimento sutil baseado no cursor (somente desktop com ponteiro fino)
      if (light && window.matchMedia("(pointer: fine)").matches) {
        const target = media.current;
        const xTo = gsap.quickTo(target, "x", { duration: 0.9, ease: "power3.out" });
        const yTo = gsap.quickTo(target, "y", { duration: 0.9, ease: "power3.out" });
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          xTo(nx * -26);
          yTo(ny * -18);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
      }

      ScrollTrigger.refresh();
    }, el);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      id="top"
      ref={root}
      className="vignette relative flex min-h-[100svh] items-end overflow-hidden bg-ink pb-[clamp(2.5rem,7vh,5rem)] pt-32"
      aria-label="Apresentação do escritório"
    >
      <div ref={media} className="absolute inset-0 z-0 overflow-hidden will-change-transform">
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/hero-mobile.webp" />
          <img
            src="/images/hero.webp"
            alt="Advogado observando a cidade à noite do escritório de Aragão & Vasconcelos"
            fetchPriority="high"
            decoding="async"
            width={1920}
            height={1088}
            className="hero-img h-[112%] w-[104%] -translate-x-[2%] -translate-y-[6%] object-cover"
            style={{ clipPath: "inset(18% 12% 18% 12%)" }}
          />
        </picture>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,7,0.92)_0%,rgba(6,6,7,0.8)_45%,rgba(6,6,7,0.7)_100%)] lg:bg-[linear-gradient(90deg,rgba(6,6,7,0.9)_0%,rgba(6,6,7,0.62)_42%,rgba(6,6,7,0.12)_72%,rgba(6,6,7,0.45)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,var(--ink),transparent)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,rgba(6,6,7,0.85),transparent)]" />
        <div className="hero-sweep pointer-events-none absolute inset-y-0 -left-1/3 w-1/2 bg-[linear-gradient(90deg,transparent,rgba(233,206,122,0.14),transparent)] blur-3xl" />
      </div>

      <div className="shell hero-copy relative z-10 w-full">
        <div className="max-w-4xl">
          <p className="hero-eyebrow eyebrow" style={{ opacity: 0 }}>
            {FIRM.address.city} · {FIRM.address.state} — Advocacia de alto padrão desde 1999
          </p>

          <h1 className="hero-title display-xl mt-7 text-bone">
            Defesa que nasce de estratégia, não de improviso.
          </h1>

          <div
            className="hero-rule gold-rule mt-9 max-w-[420px] origin-left"
            style={{ transform: "scaleX(0)" }}
          />

          <p className="hero-stagger lede mt-8 max-w-[52ch] text-bone/70" style={{ opacity: 0 }}>
            Uma banca formada por sócios que conduzem pessoalmente cada caso —
            empresarial, tributário, penal econômico e sucessório — para clientes que
            não podem errar.
          </p>

          <div className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#contato"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contato");
              }}
              className="hero-stagger btn btn-gold"
              style={{ opacity: 0 }}
            >
              Agendar diagnóstico
            </a>
            <a
              href={whatsappLink(`Olá, gostaria de falar com um advogado do ${FIRM.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-stagger btn btn-ghost"
              style={{ opacity: 0 }}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp direto
            </a>
          </div>
        </div>

        <div className="hero-scroll mt-16 flex items-center justify-between gap-6" style={{ opacity: 0 }}>
          <button
            type="button"
            onClick={() => scrollToSection("#escritorio")}
            className="group flex items-center gap-3 text-left"
            aria-label="Rolar para o conteúdo"
          >
            <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gold/35 transition-colors duration-500 group-hover:border-gold">
              <ArrowDown className="h-4 w-4 animate-bounce text-gold" aria-hidden="true" />
            </span>
            <span className="font-body text-[0.6rem] uppercase tracking-[0.32em] text-muted">
              Role para descobrir
            </span>
          </button>

          <p className="hidden max-w-[16ch] text-right font-display text-lg italic leading-snug text-bone/45 md:block">
            “{FIRM.tagline}”
          </p>
        </div>
      </div>
    </section>
  );
}
