import { useEffect, useRef, useState } from "react";
import { STRATEGY_STEPS } from "../../lib/site";
import { getGsap, prefersReducedMotion } from "../../lib/motion";
import { useReveal } from "../../hooks/use-reveal";

export function Strategy() {
  const revealRef = useReveal<HTMLElement>();
  const pinRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;
    if (prefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = getGsap();

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const steps = gsap.utils.toArray<HTMLElement>(".st-desktop .st-step");
        const total = steps.length;

        gsap.set(steps, { opacity: 0, yPercent: 12, filter: "blur(6px)" });
        gsap.set(steps[0], { opacity: 1, yPercent: 0, filter: "blur(0px)" });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: `+=${total * 90}%`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setActive(Math.round(self.progress * (total - 1))),
          },
        });

        steps.forEach((step, i) => {
          if (i === 0) return;
          tl.to(steps[i - 1], { opacity: 0, yPercent: -12, filter: "blur(6px)", duration: 0.5 })
            .to(step, { opacity: 1, yPercent: 0, filter: "blur(0px)", duration: 0.5 }, "<0.15");
        });

        gsap.to(".st-desktop .st-line-fill", {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: `+=${total * 90}%`,
            scrub: true,
          },
        });

        gsap.to(".st-bg", {
          yPercent: 12,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray<HTMLElement>(".st-mobile-list .st-step").forEach((step) => {
          gsap.fromTo(
            step,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: step, start: "top 85%", once: true },
            },
          );
        });
        gsap.to(".st-mobile-list .st-line-fill", {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".st-mobile-list",
            start: "top 70%",
            end: "bottom 70%",
            scrub: true,
          },
        });
      });

      ScrollTrigger.refresh();
    }, pin);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="estrategia"
      ref={revealRef}
      className="relative overflow-hidden bg-ink"
      aria-labelledby="estrategia-titulo"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/estrategia.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          width={1600}
          height={900}
          className="st-bg h-full w-full scale-105 object-cover opacity-[0.16]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,rgba(6,6,7,0.6),var(--ink)_75%)]" />
      </div>

      <div ref={pinRef} className="relative lg:h-[100svh]">
        <div className="shell flex h-full flex-col justify-center py-[clamp(4rem,9vh,7rem)]">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5 lg:self-center" data-reveal-group>
              <p className="eyebrow will-reveal">Nossa estratégia</p>
              <h2
                id="estrategia-titulo"
                className="mt-6 max-w-[20ch] font-display text-[clamp(2.1rem,4.6vw,3.4rem)] font-light leading-[1.04] tracking-[-0.025em] text-bone"
                data-split="pending"
              >
                Cinco movimentos antes do primeiro protocolo.
              </h2>
              <p className="lede will-reveal mt-8 lg:max-w-[30ch]">
                O método que aplicamos em todos os casos — do diagnóstico ao legado que
                fica depois da decisão final.
              </p>

              <div className="mt-12 hidden items-center gap-4 lg:flex">
                {STRATEGY_STEPS.map((step, i) => (
                  <span
                    key={step.step}
                    className={`h-px flex-1 transition-colors duration-500 ${
                      i <= active ? "bg-gold" : "bg-white/12"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop: etapas empilhadas que se substituem no scroll */}
            <div className="st-desktop relative hidden lg:col-span-7 lg:flex lg:items-center">
              <div className="absolute left-0 top-0 h-full w-px bg-white/10">
                <span className="st-line-fill absolute inset-0 origin-top scale-y-0 bg-[var(--metal)]" />
              </div>

              <div className="relative w-full min-h-[24rem] pl-14">
                {STRATEGY_STEPS.map((step) => (
                  <div key={step.step} className="st-step absolute inset-x-0 top-0">
                    <span className="font-display text-[clamp(4rem,9vw,8rem)] font-light leading-none text-gold-gradient opacity-80">
                      {step.step}
                    </span>
                    <h3 className="display-md mt-4 max-w-[20ch] text-bone">{step.title}</h3>
                    <p className="mt-5 max-w-[46ch] text-[1.02rem] leading-[1.85] text-bone/70">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: lista vertical com linha dourada progressiva */}
            <div className="st-mobile-list relative lg:hidden">
              <div className="absolute bottom-0 left-[0.6rem] top-2 w-px bg-white/10">
                <span className="st-line-fill absolute inset-0 origin-top scale-y-0 bg-[var(--metal)]" />
              </div>
              <ol className="space-y-14">
                {STRATEGY_STEPS.map((step) => (
                  <li key={step.step} className="st-step relative pl-10">
                    <span className="absolute left-0 top-2 h-3 w-3 -translate-x-[0.05rem] rounded-full border border-gold bg-ink" />
                    <span className="font-body text-[0.62rem] tracking-[0.3em] text-gold">
                      {step.step}
                    </span>
                    <h3 className="display-md mt-3 text-bone">{step.title}</h3>
                    <p className="mt-4 text-[0.98rem] leading-[1.8] text-bone/70">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
