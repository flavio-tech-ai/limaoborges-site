"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Icon } from "./Icon";
import { envelope, linkedin, paperPlane, copy, circleCheck } from "./icons";
import { MotionReveal } from "./MotionReveal";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact({
  dict,
  ui,
}: {
  dict: Dictionary["contact"];
  ui: Dictionary["ui"];
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(dict.emailValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  /* Cresce com o conteúdo: o sublinhado acompanha o texto em vez de ficar
     preso no fim de uma caixa alta e vazia. */
  function autoGrow(e: React.FormEvent<HTMLTextAreaElement>) {
    const el = e.currentTarget;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    setStatus("submitting");
    try {
      const subject = encodeURIComponent(`Contato de ${name}`);
      const body = encodeURIComponent(`${message}\n\n${name} (${email})`);
      window.location.href = `mailto:${dict.emailValue}?subject=${subject}&body=${body}`;
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contato" className="relative mx-auto max-w-5xl px-4 py-24 sm:px-5">
      {/* Limão sentado no meio do card, entre a assinatura e o formulário.
          Fica fora do card (que tem overflow-hidden) para os pés poderem
          passar da borda de baixo sem serem cortados. 46% é o centro da faixa
          livre: a assinatura termina por volta de 30% e o formulário começa
          em 58%. */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-[46%] z-20 hidden w-[200px] -translate-x-1/2 lg:block"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="animate-float">
            <Image
              src="/lemon-laptop.png"
              alt=""
              width={290}
              height={414}
              className="h-auto w-full drop-shadow-[0_20px_34px_rgba(23,33,27,0.2)] dark:drop-shadow-[0_20px_34px_rgba(0,0,0,0.5)]"
            />
          </div>
        </motion.div>
      </div>

      <div className="border-gradient glass noise-overlay relative overflow-hidden rounded-[2.5rem] p-5 sm:p-10 lg:p-12">
        <div className="relative z-[3] grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-12 [&>*]:min-w-0">
          <div>
            <MotionReveal>
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-pink">
                {dict.eyebrow}
              </span>
              {/* Cada parte ocupa sua própria linha: a afirmação vai na display
                  pesada em preto, a promessa na serifada itálica verde. Assim a
                  frase verde nunca quebra no meio de uma linha preta, e a
                  serifada (bem mais estreita) carrega o trecho mais longo. */}
              <h2 className="font-display mt-2 text-[2.15rem] font-extrabold leading-[1.06] tracking-tight text-ink sm:text-[2.45rem]">
                <span className="block">{dict.titlePre}</span>
                <span
                  className="block py-[0.06em] text-[1.3em] font-normal italic leading-[1.02] text-lime"
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  {dict.titleAccent}
                </span>
                {dict.titlePost && (
                  <span className="block">{dict.titlePost}</span>
                )}
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.08}>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-soft">
                {dict.lead}
              </p>
            </MotionReveal>

            <MotionReveal delay={0.14}>
              <div className="mt-9 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-sm">
                  <a
                    href={`mailto:${dict.emailValue}`}
                    className="group flex items-center gap-3"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-glow text-lime">
                      <Icon icon={envelope} size={17} />
                    </span>
                    <span>
                      <span className="block text-[11px] font-bold uppercase tracking-wide text-ink-soft">
                        {dict.emailLabel}
                      </span>
                      <span className="font-semibold text-ink underline decoration-lime/40 decoration-2 underline-offset-4 group-hover:decoration-lime">
                        {dict.emailValue}
                      </span>
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label={
                      copied ? ui.tooltip.emailCopied : ui.tooltip.copyEmail
                    }
                    title={
                      copied ? ui.tooltip.emailCopied : ui.tooltip.copyEmail
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 text-ink-soft transition-colors hover:border-lime/40 hover:text-lime dark:border-white/15"
                  >
                    <Icon icon={copied ? circleCheck : copy} size={14} />
                  </button>
                  {copied && (
                    <span className="text-[11px] font-semibold text-lime">
                      {ui.tooltip.emailCopied}
                    </span>
                  )}
                </div>

                <a
                  href={dict.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={ui.tooltip.openLinkedin}
                  className="group flex items-center gap-3 text-sm"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-glow text-pink">
                    <Icon icon={linkedin} size={17} />
                  </span>
                  <span>
                    <span className="block text-[11px] font-bold uppercase tracking-wide text-ink-soft">
                      {dict.linkedinLabel}
                    </span>
                    <span className="font-semibold text-ink underline decoration-pink/40 decoration-2 underline-offset-4 group-hover:decoration-pink">
                      {dict.linkedinValue}
                    </span>
                  </span>
                </a>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              {/* O retrato grande já aparece na origem do apelido; aqui fica só a assinatura. */}
              <div className="mt-10 border-l-2 border-lime/30 pl-4">
                <p className="font-display text-sm font-bold text-ink">
                  {dict.authorName}
                </p>
                <p className="text-xs text-ink-soft">{dict.authorRole}</p>
                <p className="mt-1 text-[11px] text-ink-soft/80">
                  {dict.responseTime}
                </p>
              </div>
            </MotionReveal>
          </div>

          <MotionReveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              aria-label={ui.form.legend}
              style={{ "--neon": "var(--color-lime)" } as React.CSSProperties}
              className="neon border-gradient glass relative flex h-full flex-col gap-4 rounded-3xl p-5 sm:p-8"
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-ink-soft"
                >
                  {ui.form.name.label}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder={ui.form.name.placeholder}
                  className="w-full border-b border-ink/15 bg-transparent dark:border-white/15 py-2 text-sm text-ink placeholder:text-ink-soft/60 focus:border-lime focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-ink-soft"
                >
                  {ui.form.email.label}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={ui.form.email.placeholder}
                  className="w-full border-b border-ink/15 bg-transparent dark:border-white/15 py-2 text-sm text-ink placeholder:text-ink-soft/60 focus:border-lime focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-ink-soft"
                >
                  {ui.form.message.label}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={1}
                  required
                  placeholder={ui.form.message.placeholder}
                  onInput={autoGrow}
                  className="w-full resize-none overflow-hidden border-b border-ink/15 bg-transparent py-2 text-sm leading-relaxed text-ink placeholder:text-ink-soft/60 focus:border-lime focus:outline-none dark:border-white/15"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-auto inline-flex items-center justify-center gap-2 self-start rounded-full bg-gradient-to-r from-lime to-[#2f8a3d] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(63,163,77,0.35)] transition-transform hover:scale-[1.03] disabled:opacity-70"
              >
                {status === "submitting"
                  ? ui.form.submitting
                  : ui.form.submit}
                <Icon icon={paperPlane} size={15} />
              </button>

              {status === "success" && (
                <p
                  role="status"
                  className="text-xs leading-relaxed text-ink-soft"
                >
                  <strong className="text-lime">
                    {ui.form.success.title}
                  </strong>{" "}
                  {ui.form.success.body}
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="text-xs leading-relaxed text-ink-soft">
                  <strong className="text-pink">{ui.form.error.title}</strong>{" "}
                  {ui.form.error.body}
                </p>
              )}
            </form>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
