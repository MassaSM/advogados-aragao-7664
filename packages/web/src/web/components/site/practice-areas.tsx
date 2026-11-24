import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { PRACTICE_AREAS, FIRM, whatsappLink } from "../../lib/site";
import { getGsap, prefersReducedMotion } from "../../lib/motion";
import { useReveal } from "../../hooks/use-reveal";

function AreaCard({
  area,
  active,
}: {
  area: (typeof PRACTICE_AREAS)[number];
  active: boolean;
}) {
  return (
    <article
      className={`area-card group relative flex h-full w-[86vw] shrink-0 flex-col justify-end overflow-hidden bg-graphite sm:w-[62vw] lg:w-[clamp(24rem,32vw,30rem)] ${
        active ? "is-active" : ""
      }`}
      aria-labelledby={`area-${area.id}-titulo`}
    >
      <img
        src={area.image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        width={1200}
        height={1500}
        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-45 transition-[transform,opacity,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-70"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,6,7,0.96)_10%,rgba(6,6,7,0.6)_45%,rgba(6,6,7,0.25)_100%)]" />
      <div className="absolute inset-0 border border-white/8 transition-colors duration-700 group-hover:border-gold/45" />
      <div
        className="pointer-events-none absolute inset-x-0 -top-24 h-48 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-60"
        style={{ background: "radial-gradient(60% 100% at 50% 100%,#C9A22766,transparent)" }}
      />

      <div className="relative z-10 flex flex-col gap-5 p-8 lg:p-9">
        <div className="flex items-start justify-between gap-4">
          <span className="font-body text-[0.62rem] tracking-[0.32em] text-gold">
            {area.index}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 text-gold transition-[transform,background-color] duration-500 group-hover:-rotate-45 group-hover:bg-gold/10">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>

        <div>
          <h3
            id={`area-${area.id}-titulo`}
            className="font-display max-w-[16ch] text-[clamp(1.5rem,2.05vw,2.1rem)] font-light leading-[1.08] tracking-[-0.02em] text-bone"
          >
            {area.title}
          </h3>
          <p className="mt-2.5 font-display text-base italic text-gold-light/80">
            {area.subtitle}
          </p>
        </div>

        <div className="gold-rule w-14 origin-left transition-transform duration-700 group-hover:scale-x-[3.2]" />

        <p className="text-[0.84rem] leading-relaxed text-bone/65">{area.description}</p>

        <ul className="space-y-2">
          {area.highlights.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[0.79rem] text-muted">
              <Plus className="mt-1 h-3 w-3 shrink-0 text-gold" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <a
          href={whatsappLink(
            `Olá, gostaria de falar com um advogado do ${FIRM.name} sobre ${area.title}.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="link-gold mt-1 inline-flex w-fit items-center gap-2 font-body text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-gold"
        >
          Falar sobre {area.title.split(" ")[0].replace("&", "")}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export function PracticeAreas() {
  const revealRef = useReveal<HTMLElement>();
  const pinRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;
    if (prefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = getGsap();

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: painel preso e navegação horizontal controlada pelo scroll vertical.
      mm.add("(min-width: 1024px)", () => {
        const distance = () => track.scrollWidth - window.innerWidth + 160;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${distance() * 1.15}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const index = Math.round(self.progress * (PRACTICE_AREAS.length - 1));
              setActive(index);
            },
          },
        });

        gsap.to(".pa-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${distance() * 1.15}`,
            scrub: true,
          },
        });

        return () => tween.scrollTrigger?.kill();
      });

      // Mobile: cards verticais com reveal individual.
      mm.add("(max-width: 1023px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".area-card");
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 88%", once: true },
            },
          );
        });
      });

      ScrollTrigger.refresh();
    }, pin);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="areas"
      ref={revealRef}
      className="relative bg-ink-2"
      aria-labelledby="areas-titulo"
    >
      <div className="shell pt-[clamp(5rem,12vh,9rem)]" data-reveal-group>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow will-reveal">Áreas de atuação</p>
            <h2
              id="areas-titulo"
              className="display-lg mt-6 max-w-[20ch] text-bone"
              data-split="pending"
            >
              Seis frentes. Uma única inteligência.
            </h2>
          </div>
          <p className="lede will-reveal lg:max-w-[34ch]">
            Cada área é conduzida por sócios especialistas que atuam de forma integrada —
            porque nenhum caso relevante cabe em uma só disciplina.
          </p>
        </div>
      </div>

      <div ref={pinRef} className="relative lg:h-[100svh] lg:overflow-hidden">
        <div className="lg:flex lg:h-full lg:flex-col lg:justify-center">
          <div
            ref={trackRef}
            className="mt-14 flex flex-col gap-6 px-[var(--gutter)] lg:mt-0 lg:h-[74vh] lg:flex-row lg:gap-8 lg:pl-[var(--gutter)] lg:pr-40 lg:will-change-transform"
          >
            {PRACTICE_AREAS.map((area, i) => (
              <AreaCard key={area.id} area={area} active={i === active} />
            ))}
          </div>

          <div className="hidden lg:mt-14 lg:block">
            <div className="shell flex items-center gap-8">
              <span className="font-body text-[0.62rem] tracking-[0.3em] text-gold">
                {PRACTICE_AREAS[active]?.index} / {PRACTICE_AREAS.length.toString().padStart(2, "0")}
              </span>
              <div className="relative h-px flex-1 bg-white/10">
                <span className="pa-progress absolute inset-0 origin-left scale-x-0 bg-[var(--metal)]" />
              </div>
              <span className="font-body text-[0.62rem] uppercase tracking-[0.3em] text-muted">
                Continue rolando
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[clamp(4rem,10vh,7rem)]" />
    </section>
  );
}
