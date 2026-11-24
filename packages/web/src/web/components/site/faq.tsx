import { useState } from "react";
import { Plus } from "lucide-react";
import { FAQS } from "../../lib/site";
import { useReveal } from "../../hooks/use-reveal";

export function Faq() {
  const revealRef = useReveal<HTMLElement>();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      ref={revealRef}
      className="section relative overflow-hidden bg-ink-2"
      aria-labelledby="faq-titulo"
    >
      <div className="hairline absolute inset-x-0 top-0" />

      <div className="shell relative grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4" data-reveal-group>
          <p className="eyebrow will-reveal">Perguntas frequentes</p>
          <h2
            id="faq-titulo"
            className="display-md mt-7 max-w-[14ch] text-bone"
            data-split="pending"
          >
            Respostas antes da primeira reunião.
          </h2>
          <p className="lede will-reveal mt-8">
            O que os clientes costumam perguntar sobre método, honorários e sigilo.
            Se a sua dúvida não estiver aqui, fale diretamente com um sócio.
          </p>
        </div>

        <div className="lg:col-span-8" data-reveal-group>
          <dl className="border-t border-white/10">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q} className="will-reveal border-b border-white/10">
                  <dt>
                    <button
                      type="button"
                      id={`faq-botao-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-painel-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-center justify-between gap-8 py-7 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
                    >
                      <span
                        className={[
                          "font-display text-[clamp(1.15rem,2vw,1.65rem)] font-light leading-snug transition-colors duration-400",
                          isOpen
                            ? "text-gold-light"
                            : "text-bone group-hover:text-gold-light",
                        ].join(" ")}
                      >
                        {item.q}
                      </span>
                      <span
                        className={[
                          "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500",
                          isOpen
                            ? "rotate-45 border-gold bg-gold/10"
                            : "border-white/15 group-hover:border-gold/50",
                        ].join(" ")}
                      >
                        <Plus
                          className="h-4 w-4 text-gold"
                          strokeWidth={1.2}
                          aria-hidden="true"
                        />
                      </span>
                    </button>
                  </dt>
                  <dd
                    id={`faq-painel-${i}`}
                    aria-labelledby={`faq-botao-${i}`}
                    className="grid transition-[grid-template-rows,opacity] duration-600 ease-[cubic-bezier(.22,1,.36,1)]"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      opacity: isOpen ? 1 : 0.001,
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[62ch] pb-8 pr-14 text-[0.95rem] leading-[1.85] text-muted">
                        {item.a}
                      </p>
                    </div>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
