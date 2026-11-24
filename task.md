# Landing page Aragão & Vasconcelos — progresso

## Decisões
- Marca fictícia: Aragão & Vasconcelos — Sociedade de Advogados. Tagline "Estratégia jurídica de alto padrão."
- Paleta: ink #060607, graphite #16181C, gold #C9A227 / #E8CE7A. Fontes self-hosted: Cormorant Garamond (display) + Manrope (body).
- WhatsApp: (24) 99882-5644 → wa.me/5524998825644 (usuário digitou 1 dígito a mais; confirmar na entrega).
- Imagens: hero gerado por IA; demais de busca, todas gradadas em duotone dourado (ImageMagick) para consistência.
- Motion: GSAP + ScrollTrigger + Lenis. prefers-reduced-motion e mobile reduzem efeitos.

## Feito
- [x] app_init em /home/user/aragao-vasconcelos
- [x] gsap + lenis instalados
- [x] imagens em packages/web/public/images (hero, 6 áreas, estratégia, 3 insights, cta-bg, manifesto)
- [x] fontes self-hosted em public/fonts + fonts.css
- [x] design.md
- [x] styles.css (tokens, tipografia, botões, form, reveal primitives)
- [x] lib/site.ts (todo o conteúdo), lib/motion.ts
- [x] API: schema leads + routes/leads.ts + router + queries/leads.ts
- [x] hooks: use-reveal, use-smooth-scroll
- [x] components/site: logo, preloader

## Próximos passos
- [ ] nav.tsx (fixa transparente + menu fullscreen mobile)
- [ ] hero.tsx, manifesto.tsx (contadores), practice-areas.tsx (pin horizontal desktop / cards mobile)
- [ ] strategy.tsx (pin + linha dourada), differentials.tsx, insights.tsx, faq.tsx (accordion)
- [ ] contact.tsx (form validado -> oRPC leads.create -> abre WhatsApp), footer.tsx, whatsapp-button.tsx, cursor.tsx
- [ ] pages/index.tsx compõe tudo; app.tsx rota
- [ ] index.html: lang pt-BR, título, meta/OG, preload fontes, JSON-LD LegalService + FAQPage
- [ ] db:push, bun run build, dev server na porta 4200, screenshot de verificação, deliver
