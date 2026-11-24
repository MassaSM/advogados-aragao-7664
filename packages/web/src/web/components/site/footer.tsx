import { ArrowUp } from "lucide-react";
import { FIRM, NAV_LINKS, PRACTICE_AREAS } from "../../lib/site";
import { getLenis, scrollToSection } from "../../hooks/use-smooth-scroll";
import { Logo } from "./logo";

export function Footer() {
  const year = new Date().getFullYear();

  function toTop() {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="relative overflow-hidden bg-ink-2 pt-24 pb-10">
      <div className="hairline absolute inset-x-0 top-0" />

      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-8 max-w-[34ch] text-sm leading-relaxed text-muted">
              {FIRM.tagline} Advocacia sênior para decisões de alta consequência, com
              sigilo absoluto e condução direta por sócios.
            </p>
            <div className="mt-8 flex gap-6">
              <a
                href={FIRM.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-gold font-body text-[0.62rem] uppercase tracking-[0.26em]"
              >
                LinkedIn
              </a>
              <a
                href={FIRM.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="link-gold font-body text-[0.62rem] uppercase tracking-[0.26em]"
              >
                Instagram
              </a>
            </div>
          </div>

          <nav className="lg:col-span-2" aria-label="Navegação do rodapé">
            <p className="font-body text-[0.6rem] uppercase tracking-[0.3em] text-gold">
              Navegar
            </p>
            <ul className="mt-6 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="link-gold text-sm text-muted"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="font-body text-[0.6rem] uppercase tracking-[0.3em] text-gold">
              Áreas de atuação
            </p>
            <ul className="mt-6 space-y-3">
              {PRACTICE_AREAS.map((area) => (
                <li key={area.id}>
                  <a
                    href="#areas"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("#areas");
                    }}
                    className="link-gold text-sm text-muted"
                  >
                    {area.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <address className="not-italic lg:col-span-3">
            <p className="font-body text-[0.6rem] uppercase tracking-[0.3em] text-gold">
              Contato
            </p>
            <ul className="mt-6 space-y-4 text-sm text-muted">
              <li>
                <a href={`tel:${FIRM.phoneHref}`} className="link-gold">
                  {FIRM.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${FIRM.email}`} className="link-gold">
                  {FIRM.email}
                </a>
              </li>
              <li className="leading-relaxed">
                {FIRM.address.street}
                <br />
                {FIRM.address.district} — {FIRM.address.city}/{FIRM.address.state}
                <br />
                CEP {FIRM.address.zip}
              </li>
              <li>{FIRM.hours}</li>
            </ul>
          </address>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.68rem] leading-relaxed tracking-wide text-muted/80">
            © {year} {FIRM.legalName} · {FIRM.oab} · CNPJ {FIRM.cnpj}
            <br />
            Site de caráter meramente informativo, em conformidade com o Código de
            Ética e Disciplina da OAB. Política de Privacidade e LGPD.
          </p>
          <button
            type="button"
            onClick={toTop}
            className="group inline-flex items-center gap-3 self-start font-body text-[0.62rem] uppercase tracking-[0.26em] text-muted transition-colors duration-400 hover:text-gold-light md:self-auto"
          >
            Voltar ao topo
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition-colors duration-400 group-hover:border-gold/60">
              <ArrowUp
                className="h-4 w-4 text-gold transition-transform duration-400 group-hover:-translate-y-0.5"
                strokeWidth={1.2}
                aria-hidden="true"
              />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
