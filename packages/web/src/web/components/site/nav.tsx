import { useEffect, useRef, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { FIRM, NAV_LINKS, whatsappLink } from "../../lib/site";
import { getGsap, prefersReducedMotion } from "../../lib/motion";
import { scrollToSection } from "../../hooks/use-smooth-scroll";
import { Logo } from "./logo";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overlay = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = overlay.current;
    if (!el) return;
    document.body.classList.toggle("is-locked", open);

    if (prefersReducedMotion()) {
      el.style.opacity = open ? "1" : "0";
      el.style.pointerEvents = open ? "auto" : "none";
      return;
    }

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      if (open) {
        gsap.set(el, { pointerEvents: "auto" });
        gsap
          .timeline()
          .to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.inOut" })
          .from(
            ".mn-item",
            { yPercent: 110, opacity: 0, duration: 0.7, stagger: 0.06, ease: "power3.out" },
            "-=0.35",
          )
          .from(".mn-meta", { opacity: 0, y: 16, duration: 0.6 }, "-=0.35");
      } else {
        gsap.to(el, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.6,
          ease: "expo.inOut",
          onComplete: () => gsap.set(el, { pointerEvents: "none" }),
        });
      }
    }, el);

    return () => ctx.revert();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => () => document.body.classList.remove("is-locked"), []);

  const go = (href: string) => {
    setOpen(false);
    window.setTimeout(() => scrollToSection(href), open ? 420 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 transition-[background-color,backdrop-filter,border-color,padding] duration-500 ${
          open ? "z-[70]" : "z-50"
        } ${
          scrolled
            ? "border-b border-white/8 bg-ink/72 py-3 backdrop-blur-xl"
            : "border-b border-transparent py-5 md:py-7"
        }`}
      >
        <nav className="shell flex items-center justify-between gap-6" aria-label="Navegação principal">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#top");
            }}
            className={`relative z-10 transition-opacity duration-300 ${
              open ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
            aria-label={`${FIRM.name} — início`}
          >
            <Logo />
          </a>

          <ul className="hidden items-center gap-9 xl:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(link.href);
                  }}
                  className="link-gold font-body text-[0.72rem] font-medium uppercase tracking-[0.2em] text-bone/85"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <a
                href={whatsappLink(
                  `Olá, gostaria de falar com um advogado do ${FIRM.name}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-gold whitespace-nowrap !px-6 !py-3 !text-[0.65rem] transition-opacity duration-300 ${
                  open ? "pointer-events-none opacity-0" : "opacity-100"
                }`}
              >
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                Falar com um advogado
              </a>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-fullscreen"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="relative z-[70] flex h-11 w-11 items-center justify-center rounded-full border border-gold/35 text-bone transition-colors duration-300 hover:border-gold/80 hover:text-gold-light xl:hidden"
            >
              {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </nav>
      </header>

      <div
        id="menu-fullscreen"
        ref={overlay}
        className="grain fixed inset-0 z-[60] flex flex-col justify-between overflow-hidden bg-ink px-[var(--gutter)] pb-12 pt-28 xl:hidden"
        style={{ clipPath: "inset(0% 0% 100% 0%)", pointerEvents: "none" }}
      >
        <div
          className="pointer-events-none absolute -right-1/4 top-0 h-[70vh] w-[70vh] rounded-full opacity-30 blur-[120px]"
          style={{ background: "radial-gradient(circle,#C9A22755,transparent 70%)" }}
        />
        <ul className="relative flex flex-col gap-1">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href} className="overflow-hidden">
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(link.href);
                }}
                className="mn-item flex items-baseline gap-4 py-2"
              >
                <span className="font-body text-[0.6rem] tracking-[0.3em] text-gold">
                  0{i + 1}
                </span>
                <span className="display-md text-bone">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mn-meta relative space-y-4">
          <div className="hairline" />
          <a href={`tel:${FIRM.phoneHref}`} className="block font-display text-2xl text-gold-light">
            {FIRM.phoneDisplay}
          </a>
          <a href={`mailto:${FIRM.email}`} className="block text-sm text-muted">
            {FIRM.email}
          </a>
          <p className="text-xs leading-relaxed text-muted">
            {FIRM.address.street} — {FIRM.address.district}
            <br />
            {FIRM.address.city}/{FIRM.address.state}
          </p>
          <a
            href={whatsappLink(`Olá, gostaria de falar com um advogado do ${FIRM.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold w-full"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
