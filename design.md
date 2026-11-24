# Aragão & Vasconcelos — Design

Landing page única (web) para escritório de advocacia de alto padrão. Estética editorial de marca de luxo + linguagem de interação Apple: scroll storytelling com GSAP/ScrollTrigger, preto profundo, dourado cirúrgico, fotografia cinematográfica em duotone.

## Brand & Colors

Tokens em `packages/web/src/web/styles.css` (`:root`), consumidos via classes Tailwind arbitrárias e utilitários próprios.

| Token | Valor | Uso |
|-------|-------|-----|
| `--ink` | #060607 | Fundo base (preto profundo) |
| `--ink-2` | #0B0C0E | Fundo alternado de seção |
| `--graphite` | #16181C | Superfícies, cards |
| `--graphite-2` | #22252B | Bordas de superfície, hairlines fortes |
| `--gold` | #C9A227 | Dourado principal (linhas, ícones, CTA) |
| `--gold-light` | #E8CE7A | Dourado claro (highlights, gradiente metálico) |
| `--gold-deep` | #8C6B14 | Dourado profundo (fim do gradiente) |
| `--bone` | #F4F1EA | Texto principal (off-white quente) |
| `--muted` | #9A9C9F | Texto secundário |
| `--hairline` | rgba(233,206,122,.18) | Linhas douradas sutis |

Gradiente metálico padrão: `linear-gradient(100deg,#8C6B14,#E8CE7A 45%,#C9A227 60%,#F5E6B8 78%,#8C6B14)` — usado em texto de destaque, linhas e bordas.

## Typography

- **Display**: Cormorant Garamond (300–700 + itálico 400), self-hosted em `public/fonts/`. Títulos gigantes, `letter-spacing: -0.02em`, muita entrelinha aberta em subtítulos.
- **Body/UI**: Manrope variável (200–800). Corpo 16–18px, `line-height: 1.7`.
- **Eyebrow/label**: Manrope 500, 11–12px, `letter-spacing: .32em`, uppercase, cor `--gold`.
- Escala fluida com `clamp()`: hero até 8.5vw, títulos de seção `clamp(2.4rem, 6vw, 5.5rem)`.

## Layout

- Container 1440px máx., gutter fluido (`clamp(1.25rem, 5vw, 5rem)`).
- Composição editorial assimétrica: grid 12 colunas, imagens sangrando para fora do container, blocos de texto deslocados.
- Respiro grande: seções com `padding-block: clamp(6rem, 14vh, 12rem)`.
- Hairlines douradas separando blocos; numeração `01 — 06` em Manrope mono-espaçado visual.

## Motion (GSAP + ScrollTrigger + Lenis)

1. **Preloader** — logotipo em fade + linha dourada varrendo a tela + contador; libera o scroll ao final.
2. **Hero** — máscara de reveal na imagem, título palavra por palavra (clip-path + y), parallax por cursor (transform), scroll indicator com loop.
3. **Manifesto** — títulos em reveal por linha, contadores animados, imagem com parallax independente.
4. **Áreas de Atuação** — desktop: painel pinned com scroll horizontal (`scrub`), imagem trocando por índice; mobile: cards verticais com reveal.
5. **Estratégia** — seção pinned com etapas que entram/saem e linha dourada progressiva (scaleY).
6. **Diferenciais / Insights / FAQ** — reveals com stagger, hover com zoom e iluminação.
7. Tudo baseado em `transform`/`opacity`. `prefers-reduced-motion` desliga pin/scrub e entrega estados finais. Em telas < 1024px os efeitos pesados (pin horizontal, cursor custom, blur) são desativados.

## Pages & Sections

- **Web — Home** (`packages/web/src/web/pages/index.tsx`): Preloader, Nav, Hero, Manifesto, Áreas de Atuação, Estratégia, Diferenciais, Insights, FAQ, CTA/Formulário, Footer, WhatsApp flutuante.
- Componentes em `src/web/components/site/`, um arquivo por seção.

## Key User Flows

1. Usuário chega → preloader → hero cinematográfico → CTA "Falar com um advogado" leva à seção de conversão.
2. Formulário: validação em tempo real → grava o lead via oRPC (`leads.create`) → abre o WhatsApp (+55 24 99882-5644) com a mensagem pré-preenchida → feedback visual de sucesso.
3. Botão flutuante de WhatsApp disponível após o hero.

## Architecture

- **API**: oRPC `leads.create` / `leads.list` (`src/api/routes/leads.ts`), tabela `leads` (Drizzle/SQLite).
- **Hooks**: `src/web/queries/leads.ts`.
- **SEO**: HTML semântico, headings corretos, meta/OG/Twitter, JSON-LD `LegalService` + `FAQPage`, `lang="pt-BR"`.
