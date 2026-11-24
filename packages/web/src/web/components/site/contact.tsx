import { useMemo, useRef, useState } from "react";
import { ArrowRight, Check, Loader2, MessageCircle, Phone } from "lucide-react";
import { FIRM, PRACTICE_AREAS, whatsappLink } from "../../lib/site";
import { useCreateLead } from "../../queries/leads";
import { useReveal } from "../../hooks/use-reveal";

type FormState = {
  name: string;
  email: string;
  phone: string;
  area: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  area: "",
  message: "",
};

function validate(values: FormState): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 3) errors.name = "Informe seu nome completo.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = "Informe um e-mail válido.";
  if (values.phone.replace(/\D/g, "").length < 10)
    errors.phone = "Informe um telefone com DDD.";
  if (!values.area) errors.area = "Selecione a área do caso.";
  if (values.message.trim().length < 10)
    errors.message = "Descreva o caso em pelo menos uma frase.";
  return errors;
}

function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function Contact() {
  const revealRef = useReveal<HTMLElement>();
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const createLead = useCreateLead();

  const sentLink = useMemo(() => {
    if (!sent) return whatsappLink("Olá! Gostaria de falar com um advogado.");
    return whatsappLink(
      [
        `Olá, ${FIRM.name}. Acabei de enviar um contato pelo site.`,
        "",
        `Nome: ${values.name}`,
        `E-mail: ${values.email}`,
        `Telefone: ${values.phone}`,
        `Área: ${values.area}`,
        "",
        values.message,
      ].join("\n"),
    );
  }, [sent, values]);

  function update(field: keyof FormState, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = formRef.current?.querySelector<HTMLElement>(
        '[aria-invalid="true"]',
      );
      first?.focus();
      return;
    }

    const message = [
      `Olá, ${FIRM.name}. Acabei de enviar um contato pelo site.`,
      "",
      `Nome: ${values.name}`,
      `E-mail: ${values.email}`,
      `Telefone: ${values.phone}`,
      `Área: ${values.area}`,
      "",
      values.message,
    ].join("\n");

    try {
      await createLead.mutateAsync(values);
    } catch {
      // Mesmo se o registro falhar, o contato segue pelo WhatsApp.
    }

    setSent(true);
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  }

  return (
    <section
      id="contato"
      ref={revealRef}
      className="relative overflow-hidden bg-ink py-[clamp(6rem,15vh,12rem)]"
      aria-labelledby="contato-titulo"
    >
      <img
        src="/images/cta-bg.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        width={1600}
        height={1000}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(6,6,7,0.94),rgba(6,6,7,0.82)_45%,rgba(6,6,7,0.97))]" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[55vh] w-[80vw] -translate-x-1/2 opacity-25 blur-[140px]"
        style={{ background: "radial-gradient(ellipse,#C9A227,transparent 70%)" }}
      />

      <div className="shell relative">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5" data-reveal-group>
            <p className="eyebrow will-reveal">Contato</p>
            <h2
              id="contato-titulo"
              className="display-lg mt-7 max-w-[14ch] text-bone"
              data-split="pending"
            >
              Seu caso merece uma estratégia à altura.
            </h2>
            <p className="lede will-reveal mt-8">
              Conte em poucas linhas o que está em jogo. Um sócio retorna em até 24
              horas úteis com uma leitura honesta sobre viabilidade e caminhos.
            </p>

            <div className="mt-10 flex flex-wrap gap-4" data-reveal-group>
              <a
                href={whatsappLink(
                  "Olá! Gostaria de agendar uma reunião de diagnóstico com um sócio.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold will-reveal"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                WhatsApp
              </a>
              <a href={`tel:${FIRM.phoneHref}`} className="btn btn-ghost will-reveal">
                <Phone className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                Ligar agora
              </a>
            </div>

            <dl className="mt-14 space-y-6 border-t border-white/10 pt-10" data-reveal-group>
              <div className="will-reveal">
                <dt className="font-body text-[0.6rem] uppercase tracking-[0.3em] text-gold">
                  Telefone
                </dt>
                <dd className="mt-2">
                  <a href={`tel:${FIRM.phoneHref}`} className="link-gold text-lg">
                    {FIRM.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="will-reveal">
                <dt className="font-body text-[0.6rem] uppercase tracking-[0.3em] text-gold">
                  E-mail
                </dt>
                <dd className="mt-2">
                  <a href={`mailto:${FIRM.email}`} className="link-gold text-lg">
                    {FIRM.email}
                  </a>
                </dd>
              </div>
              <div className="will-reveal">
                <dt className="font-body text-[0.6rem] uppercase tracking-[0.3em] text-gold">
                  Escritório
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">
                  {FIRM.address.street}
                  <br />
                  {FIRM.address.district} · {FIRM.address.city}/{FIRM.address.state}
                  <br />
                  {FIRM.hours}
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <div className="glass will-reveal relative p-7 sm:p-10 lg:p-12">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[image:var(--metal)]" />

              {sent ? (
                <div className="flex min-h-[26rem] flex-col items-start justify-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/50 bg-gold/10">
                    <Check className="h-6 w-6 text-gold" strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <h3 className="display-md mt-8 text-bone">Mensagem registrada.</h3>
                  <p className="mt-5 max-w-[44ch] text-muted" aria-live="polite">
                    Abrimos o WhatsApp com o resumo do seu contato. Se a janela não
                    tiver aberto, use o botão abaixo — seu caso já está registrado
                    conosco.
                  </p>
                  <div className="mt-9 flex flex-wrap gap-4">
                    <a
                      href={sentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-gold"
                    >
                      <MessageCircle className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                      Abrir WhatsApp
                    </a>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => {
                        setValues(EMPTY);
                        setSent(false);
                      }}
                    >
                      Enviar outra mensagem
                    </button>
                  </div>
                </div>
              ) : (
                <form ref={formRef} noValidate onSubmit={handleSubmit}>
                  <p className="font-body text-[0.6rem] uppercase tracking-[0.3em] text-gold">
                    Diagnóstico inicial
                  </p>
                  <h3 className="mt-4 font-display text-2xl font-light text-bone">
                    Envie seu caso com sigilo
                  </h3>

                  <div className="mt-9 grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Nome completo"
                      error={errors.name}
                      htmlFor="lead-name"
                    >
                      <input
                        id="lead-name"
                        aria-label="Nome completo"
                        name="name"
                        className="field"
                        autoComplete="name"
                        placeholder="Como devemos chamá-lo"
                        value={values.name}
                        aria-invalid={Boolean(errors.name)}
                        onChange={(e) => update("name", e.target.value)}
                      />
                    </Field>

                    <Field label="E-mail" error={errors.email} htmlFor="lead-email">
                      <input
                        id="lead-email"
                        aria-label="E-mail"
                        name="email"
                        type="email"
                        inputMode="email"
                        className="field"
                        autoComplete="email"
                        placeholder="nome@empresa.com.br"
                        value={values.email}
                        aria-invalid={Boolean(errors.email)}
                        onChange={(e) => update("email", e.target.value)}
                      />
                    </Field>

                    <Field label="Telefone" error={errors.phone} htmlFor="lead-phone">
                      <input
                        id="lead-phone"
                        aria-label="Telefone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        className="field"
                        autoComplete="tel"
                        placeholder="(00) 00000-0000"
                        value={values.phone}
                        aria-invalid={Boolean(errors.phone)}
                        onChange={(e) => update("phone", maskPhone(e.target.value))}
                      />
                    </Field>

                    <Field label="Área do caso" error={errors.area} htmlFor="lead-area">
                      <select
                        id="lead-area"
                        name="area"
                        className="field appearance-none"
                        value={values.area}
                        aria-invalid={Boolean(errors.area)}
                        onChange={(e) => update("area", e.target.value)}
                      >
                        <option value="">Selecione</option>
                        {PRACTICE_AREAS.map((area) => (
                          <option key={area.id} value={area.title}>
                            {area.title}
                          </option>
                        ))}
                        <option value="Outro assunto">Outro assunto</option>
                      </select>
                    </Field>

                    <div className="sm:col-span-2">
                      <Field
                        label="Sobre o caso"
                        error={errors.message}
                        htmlFor="lead-message"
                      >
                        <textarea
                          id="lead-message"
                          aria-label="Sobre o caso"
                          name="message"
                          rows={5}
                          className="field resize-none"
                          placeholder="Descreva brevemente a situação, prazos e o que está em jogo."
                          value={values.message}
                          aria-invalid={Boolean(errors.message)}
                          onChange={(e) => update("message", e.target.value)}
                        />
                      </Field>
                    </div>
                  </div>

                  <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-[34ch] text-xs leading-relaxed text-muted">
                      Ao enviar, sua mensagem é registrada e aberta no WhatsApp do
                      escritório. Tratamos todos os dados sob sigilo profissional.
                    </p>
                    <button
                      type="submit"
                      className="btn btn-gold w-full shrink-0 sm:w-auto"
                      disabled={createLead.isPending}
                    >
                      {createLead.isPending ? (
                        <>
                          <Loader2
                            className="h-4 w-4 animate-spin"
                            strokeWidth={1.6}
                            aria-hidden="true"
                          />
                          Enviando
                        </>
                      ) : (
                        <>
                          Enviar mensagem
                          <ArrowRight className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block font-body text-[0.6rem] uppercase tracking-[0.26em] text-muted"
      >
        {label}
      </label>
      {children}
      <p
        className="mt-2 min-h-4 text-[0.7rem] text-[#E0736A] transition-opacity duration-300"
        style={{ opacity: error ? 1 : 0 }}
      >
        {error ?? ""}
      </p>
    </div>
  );
}
