"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Icon } from "./Icon";
import { arrowRight, sparkle } from "./icons";
import { GradientStar } from "./GradientStar";
import { HeroTrail } from "./HeroTrail";
import { MotionReveal } from "./MotionReveal";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Props = {
  hero: Dictionary["hero"];
  story: Dictionary["story"];
  ui: Dictionary["ui"];
};

export function Hero({ hero, story, ui }: Props) {
  return (
    <section
      id="home"
      className="relative mx-auto flex max-w-5xl flex-col items-center px-4 pt-36 pb-20 text-center sm:px-5 sm:pt-48"
    >
      {/* isolate cria um contexto de empilhamento próprio, senão o rastro em
          z negativo cairia atrás do fundo do body e sumiria. O wrapper também
          limita o arco ao bloco de cima, sem invadir o card da história. */}
      <div className="relative isolate flex w-full flex-col items-center">
        <HeroTrail />

        <MotionReveal>
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
            <Icon icon={sparkle} size={13} className="text-pink" />
            {hero.eyebrow}
          </span>
        </MotionReveal>

        <MotionReveal delay={0.08}>
          {/* Cada linha é um bloco e cada trecho marcado recebe o próprio
            degradê, então a transição verde→rosa acontece dentro da
            expressão em vez de se diluir na linha inteira. */}
          <h1 className="font-display mt-7 max-w-4xl text-balance text-[clamp(1.6rem,7.2vw,2.15rem)] leading-[1.08] font-extrabold tracking-tight text-ink sm:text-5xl md:text-[3.4rem]">
            {hero.titleLines.map((line, li) => (
              <span key={li} className="block">
                {line.map((seg, si) => (
                  <span
                    key={si}
                    className={seg.gradient ? "text-gradient-mint" : undefined}
                  >
                    {seg.text}
                    {si < line.length - 1 ? " " : null}
                  </span>
                ))}
                {li === hero.titleLines.length - 1 ? <GradientStar /> : null}
              </span>
            ))}
          </h1>
        </MotionReveal>

        <MotionReveal delay={0.16}>
          <p className="mt-6 max-w-[46rem] text-base leading-relaxed text-ink sm:text-[1.0625rem]">
            {hero.subtitle}
          </p>
        </MotionReveal>

        <MotionReveal delay={0.22}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contato"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-lime to-[#2f8a3d] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(63,163,77,0.35)] transition-transform hover:scale-[1.03]"
            >
              {ui.cta.primary}
              <Icon icon={arrowRight} size={16} />
            </a>
            <a
              href="#experiencia"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
            >
              {ui.cta.secondary}
            </a>
          </div>
        </MotionReveal>
      </div>

      {/* Card narrativo: a origem do apelido, com o retrato do Flavio */}
      <MotionReveal delay={0.3} className="w-full">
        <div className="noise-overlay glass relative mt-16 overflow-hidden rounded-[2rem] px-5 py-8 text-left sm:px-12 sm:py-14 lg:px-16 lg:py-16">
          {/* Cabeçalho e texto vivem na mesma coluna, então o retrato sobe até
              a altura do título e as duas colunas fecham na mesma linha. */}
          <div className="grid items-stretch gap-10 md:grid-cols-[1fr_340px] md:gap-14">
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-pink">
                {story.eyebrow}
              </span>
              <h2 className="font-display mt-3 max-w-md text-[1.6rem] font-bold leading-[1.15] text-ink sm:text-[2rem]">
                {story.title}
              </h2>

              <div className="mt-7 flex flex-col gap-4 text-[0.95rem] leading-relaxed text-ink-soft sm:mt-9">
                {story.paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
                <p className="font-semibold text-ink">{story.punchline}</p>
              </div>
            </div>

            {/* Retrato + carimbo circular */}
            <div className="relative mx-auto w-full max-w-[340px] md:mx-0 md:pt-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] shadow-[0_18px_44px_rgba(23,33,27,0.18)] ring-1 ring-white/70 dark:ring-white/10 md:aspect-auto md:h-full md:min-h-[440px]"
              >
                <Image
                  src="/flavio-photo.jpg"
                  alt={ui.a11y.portrait}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 320px, 320px"
                  priority
                />
              </motion.div>

              <svg
                viewBox="0 0 100 100"
                aria-hidden
                className="absolute -top-2 -right-6 h-[92px] w-[92px] animate-[spin_24s_linear_infinite] sm:h-[104px] sm:w-[104px] md:top-2"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="49"
                  className="fill-pink-glow stroke-pink/30 dark:fill-pink-glow dark:stroke-pink/40"
                  strokeWidth="1"
                />
                <path
                  id="stampPath"
                  fill="none"
                  d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
                />
                <text className="fill-pink text-[8px] font-bold uppercase tracking-[0.13em]">
                  <textPath href="#stampPath" startOffset="0%">
                    {story.stamp}
                  </textPath>
                </text>
                <path
                  d="M50 35C50 43 57 50 65 50 57 50 50 57 50 65 50 57 43 50 35 50 43 50 50 43 50 35Z"
                  className="fill-pink stroke-none opacity-50"
                />
              </svg>
            </div>
          </div>

          {/* Faixa de largura total: fecha o card e serve de remate da história. */}
          <div className="relative mt-12 rounded-[1.25rem] border border-lime/30 bg-lime-soft/35 px-6 py-7 dark:border-lime/25 dark:bg-lime/[0.10] sm:px-10 sm:py-8">
            <p className="max-w-3xl text-[1.02rem] font-medium leading-relaxed text-ink sm:text-[1.1rem]">
              {story.quote}
            </p>
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
