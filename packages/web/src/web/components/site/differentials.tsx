import { Globe, Lock, Scale, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DIFFERENTIALS } from "../../lib/site";
import { useReveal } from "../../hooks/use-reveal";

const ICONS: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  scale: Scale,
  lock: Lock,
  globe: Globe,
};

export function Differentials() {
  const revealRef = useReveal<HTMLElement>();

  return (
    <section
      ref={revealRef}
      className="section relative overflow-hidden bg-ink-2"
      aria-labelledby="diferenciais-titulo"
    >
      <div className="hairline absolute inset-x-0 top-0" />

      <div className="shell relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end" data-reveal-group>
          <div className="lg:col-span-7">
            <p className="eyebrow will-reveal">Diferenciais</p>
            <h2
              id="diferenciais-titulo"
              className="display-lg mt-7 max-w-[16ch] text-bone"
              data-split="pending"
            >
              O que muda quando o caso é nosso.
            </h2>
          </div>
          <p className="lede will-reveal lg:col-span-5">
            Quatro compromissos inegociáveis que sustentam cada mandato aceito pelo
            escritório — e que o cliente sente já na primeira semana.
          </p>
        </div>

        <div
          className="mt-20 grid gap-px border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-4"
          data-reveal-group
        >
          {DIFFERENTIALS.map((item) => {
            const Icon = ICONS[item.icon] ?? ShieldCheck;
            return (
              <article
                key={item.title}
                className="will-reveal group relative overflow-hidden bg-ink-2 p-8 transition-colors duration-500 hover:bg-graphite lg:p-10"
              >
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-[60px] transition-opacity duration-700 group-hover:opacity-60"
                  style={{
                    background: "radial-gradient(circle,#C9A227,transparent 70%)",
                  }}
                />
                <Icon
                  className="relative h-6 w-6 text-gold transition-transform duration-500 group-hover:-translate-y-1"
                  strokeWidth={1.2}
                  aria-hidden="true"
                />
                <p className="relative mt-10 font-display text-[clamp(2.4rem,4.4vw,3.6rem)] font-light leading-none">
                  <span className="text-gold-gradient">{item.metric}</span>
                </p>
                <h3 className="relative mt-6 font-body text-[0.72rem] uppercase tracking-[0.24em] text-bone">
                  {item.title}
                </h3>
                <p className="relative mt-4 text-sm leading-relaxed text-muted">
                  {item.text}
                </p>
                <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[image:var(--metal)] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
