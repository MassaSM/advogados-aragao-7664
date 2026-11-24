import { ArrowUpRight } from "lucide-react";
import { INSIGHTS, whatsappLink } from "../../lib/site";
import { useReveal } from "../../hooks/use-reveal";

export function Insights() {
  const revealRef = useReveal<HTMLElement>();

  return (
    <section
      id="insights"
      ref={revealRef}
      className="section grain relative overflow-hidden bg-ink"
      aria-labelledby="insights-titulo"
    >
      <div className="shell relative">
        <div
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          data-reveal-group
        >
          <div>
            <p className="eyebrow will-reveal">Insights</p>
            <h2
              id="insights-titulo"
              className="display-lg mt-7 max-w-[15ch] text-bone"
              data-split="pending"
            >
              Leitura que antecipa decisão.
            </h2>
          </div>
          <a
            href={whatsappLink(
              "Olá! Gostaria de receber os informativos jurídicos do escritório.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="link-gold will-reveal self-start font-body text-[0.7rem] uppercase tracking-[0.24em] md:self-auto"
          >
            Receber informativos
          </a>
        </div>

        <div className="mt-20 grid gap-x-10 gap-y-16 lg:grid-cols-12" data-reveal-group>
          {INSIGHTS.map((post, i) => (
            <article
              key={post.title}
              className={[
                "will-reveal group",
                i === 0 ? "lg:col-span-7" : "lg:col-span-5",
                i === 1 ? "lg:mt-24" : "",
                i === 2 ? "lg:col-span-7 lg:col-start-3" : "",
              ].join(" ")}
            >
              <a
                href={whatsappLink(
                  `Olá! Tenho interesse no artigo "${post.title}". Podem me enviar o conteúdo completo?`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
              >
                <div
                  className={[
                    "relative overflow-hidden bg-graphite",
                    i === 0 ? "aspect-16/10" : "aspect-4/3",
                  ].join(" ")}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    width={1200}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,6,7,0.8),transparent_55%)]" />
                  <div className="absolute inset-0 border border-gold/10 transition-colors duration-500 group-hover:border-gold/35" />
                  <span className="absolute left-5 top-5 border border-gold/40 bg-ink/60 px-3 py-1 font-body text-[0.6rem] uppercase tracking-[0.24em] text-gold backdrop-blur-sm">
                    {post.tag}
                  </span>
                </div>

                <div className="mt-7 flex items-start justify-between gap-6">
                  <div>
                    <p className="font-body text-[0.62rem] uppercase tracking-[0.26em] text-muted">
                      {post.date} · {post.readTime} de leitura
                    </p>
                    <h3 className="mt-4 max-w-[26ch] font-display text-[clamp(1.5rem,2.4vw,2.1rem)] font-light leading-tight text-bone transition-colors duration-400 group-hover:text-gold-light">
                      {post.title}
                    </h3>
                    <p className="mt-4 max-w-[48ch] text-sm leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="mt-2 h-6 w-6 shrink-0 text-gold transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                    strokeWidth={1}
                    aria-hidden="true"
                  />
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
