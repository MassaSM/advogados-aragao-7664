import { useEffect, useRef } from "react";
import { STATS } from "../../lib/site";
import { getGsap, isLowPower, prefersReducedMotion } from "../../lib/motion";
import { useReveal } from "../../hooks/use-reveal";

function formatValue(value: number) {
  return value >= 1000 ? value.toLocaleString("pt-BR") : String(value);
}

export function Manifesto() {
  const revealRef = useReveal<HTMLElement>();
  const statsRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = statsRef.current;
    if (!wrap) return;

    const nodes = Array.from(wrap.querySelectorAll<HTMLElement>("[data-counter]"));

    if (prefersReducedMotion()) {
      nodes.forEach((node) => {
        node.textContent = formatValue(Number(node.dataset.counter ?? 0));
      });
      return;
    }

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      nodes.forEach((node) => {
        const target = Number(node.dataset.counter ?? 0);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2.1,
          ease: "power2.out",
          onUpdate: () => {
            node.textContent = formatValue(Math.round(obj.v));
          },
          scrollTrigger: { trigger: wrap, start: "top 82%", once: true },
        });
      });

      if (!isLowPower() && imageRef.current) {
        gsap.fromTo(
          imageRef.current.querySelector("img"),
          { yPercent: -8, scale: 1.12 },
          {
            yPercent: 8,
            scale: 1.02,
            ease: "none",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="escritorio"
      ref={revealRef}
      className="section grain relative overflow-hidden bg-ink"
      aria-labelledby="escritorio-titulo"
    >
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-[60vh] w-[60vh] rounded-full opacity-[0.18] blur-[130px]"
        style={{ background: "radial-gradient(circle,#C9A227,transparent 70%)" }}
      />

      <div className="shell relative">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7" data-reveal-group>
            <p className="eyebrow will-reveal">O escritório</p>
            <h2
              id="escritorio-titulo"
              className="display-lg mt-7 max-w-[22ch] text-bone"
              data-split="pending"
            >
              Não vendemos horas. Entregamos posição.
            </h2>

            <div className="mt-10 max-w-[54ch] space-y-6">
              <p className="will-reveal text-[1.05rem] leading-[1.8] text-bone/75">
                Aragão &amp; Vasconcelos nasceu de uma inconformidade: a advocacia
                tradicional reage, quando deveria antecipar. Estruturamos uma banca
                enxuta e sênior, na qual cada caso é desenhado como uma operação —
                com tese, cronograma, cenário adverso e plano de contingência.
              </p>
              <p className="will-reveal text-[1.05rem] leading-[1.8] text-muted">
                Atuamos para empresas, famílias empresárias e executivos que
                enfrentam decisões de alta consequência. Nossa medida de sucesso não é
                o volume de processos, é a posição em que o cliente termina.
              </p>
            </div>

            <blockquote className="will-reveal mt-12 border-l border-gold/40 pl-6">
              <p className="font-display text-[clamp(1.4rem,2.4vw,2.1rem)] italic leading-snug text-bone/90">
                “Todo litígio é decidido antes da primeira audiência — na qualidade da
                estratégia que o antecede.”
              </p>
              <footer className="mt-4 font-body text-[0.65rem] uppercase tracking-[0.28em] text-gold">
                Ricardo Aragão · Sócio-fundador
              </footer>
            </blockquote>
          </div>

          <div className="relative lg:col-span-5">
            <div
              ref={imageRef}
              className="will-reveal relative aspect-4/5 overflow-hidden lg:-mt-8"
            >
              <img
                src="/images/manifesto.webp"
                alt="Biblioteca jurídica do escritório em iluminação baixa"
                loading="lazy"
                decoding="async"
                width={1200}
                height={1500}
                className="h-full w-full scale-105 object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,6,7,0.85),transparent_55%)]" />
              <div className="absolute inset-0 border border-gold/15" />
            </div>

            <div className="glass will-reveal absolute -bottom-8 left-4 right-8 p-6 lg:-left-16">
              <p className="font-body text-[0.6rem] uppercase tracking-[0.32em] text-gold">
                Presença
              </p>
              <p className="mt-3 font-display text-xl leading-snug text-bone">
                Volta Redonda · Rio de Janeiro · São Paulo · Brasília
              </p>
            </div>
          </div>
        </div>

        <div className="mt-32 lg:mt-40">
          <div className="hairline" />
          <div
            ref={statsRef}
            className="grid grid-cols-2 gap-x-8 gap-y-12 pt-14 lg:grid-cols-4"
            data-reveal-group
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="will-reveal">
                <p className="font-display text-[clamp(2.6rem,5.4vw,4.4rem)] font-light leading-none">
                  <span className="text-gold-gradient" data-counter={stat.value}>
                    0
                  </span>
                  <span className="text-gold-gradient">{stat.suffix}</span>
                </p>
                <p className="mt-4 max-w-[18ch] font-body text-[0.7rem] uppercase leading-relaxed tracking-[0.22em] text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
