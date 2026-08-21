"use client";

import { useRef, useState } from "react";
import { useTheme } from "next-themes";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Icon } from "./Icon";
import { network, database, microscope, rocket } from "./icons";
import type { IconDef } from "./icons";
import { MotionReveal } from "./MotionReveal";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const ICONS: Record<string, IconDef> = {
  aarin: rocket,
  tempo: network,
  gavb: database,
  cnpem: microscope,
};

export function Timeline({ dict }: { dict: Dictionary["experience"] }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const accent = isDark ? "#4ade80" : "#3fa34d";
  const dotIdleBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.75)";
  const dotIdleBorder = isDark ? "rgba(255,255,255,0.12)" : "rgba(18,25,20,0.10)";
  const dotIdleInk = isDark ? "#7f8a83" : "#8a938b";
  const dotLitInk = isDark ? "#0d120f" : "#ffffff";

  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [litCount, setLitCount] = useState(0);

  /* A linha se preenche conforme a seção atravessa a viewport, como uma barra
     de progresso da leitura. */
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.8", "end 0.55"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    restDelta: 0.001,
  });

  /* Os marcadores acendem quando a linha chega neles, e não quando entram na
     viewport. Amarrar ao mesmo valor de progresso faz o preenchimento e a
     mudança de cor acontecerem no mesmo instante. */
  useMotionValueEvent(progress, "change", (value) => {
    const track = trackRef.current;
    if (!track) return;
    const filledPx = value * track.offsetHeight;
    let n = 0;
    for (const el of itemRefs.current) {
      if (el && filledPx >= el.offsetTop + 20) n += 1;
    }
    setLitCount(n);
  });

  return (
    <section
      id="experiencia"
      className="relative mx-auto max-w-4xl px-4 py-20 sm:px-5"
    >
      <MotionReveal>
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-pink">
          {dict.eyebrow}
        </span>
        <h2 className="font-display mt-2 text-[1.8rem] font-extrabold tracking-tight text-ink sm:text-4xl">
          {dict.title}
        </h2>
        <p className="mt-4 max-w-lg text-sm text-ink-soft">{dict.lead}</p>
      </MotionReveal>

      <div ref={trackRef} className="relative mt-14">
        {/* Trilho apagado */}
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-ink/10 dark:bg-white/10 sm:left-[23px]" />
        {/* Trilho aceso, preenchido pelo scroll */}
        <motion.div
          style={{ scaleY: progress }}
          className="absolute left-[19px] top-2 bottom-2 w-px origin-top bg-lime shadow-[0_0_10px_rgba(63,163,77,0.55)] dark:shadow-[0_0_12px_rgba(74,222,128,0.6)] sm:left-[23px]"
        />

        <div className="flex flex-col gap-8">
          {dict.roles.map((role, i) => {
            const lit = i < litCount;
            /* O dot apagado usa branco translúcido, que precisa cair muito no
               tema escuro para não virar um disco leitoso sobre o fundo. */
            return (
              <div
                key={role.id}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className="relative pl-14 sm:pl-16"
              >
                <motion.span
                  animate={{
                    backgroundColor: lit ? accent : dotIdleBg,
                    borderColor: lit ? accent : dotIdleBorder,
                    color: lit ? dotLitInk : dotIdleInk,
                    boxShadow: lit
                      ? `0 0 0 6px ${accent}1f, 0 8px 22px -4px ${accent}73`
                      : "0 2px 10px -2px rgba(23,33,27,0.10)",
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md sm:h-12 sm:w-12"
                >
                  <Icon icon={ICONS[role.id] ?? network} size={19} />
                </motion.span>

                <motion.div
                  animate={{ opacity: lit ? 1 : 0.55 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ "--neon": accent } as React.CSSProperties}
                  className="neon border-gradient glass relative min-w-0 rounded-3xl p-6 hover:-translate-y-1 sm:p-7"
                >
                  <div className="relative z-[3]">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-display text-lg font-bold text-ink">
                          {role.company}
                        </h3>
                        <p className="text-sm font-semibold text-ink-soft">
                          {role.role}
                        </p>
                      </div>
                      <span
                        title={role.isCurrent ? dict.currentLabel : undefined}
                        className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
                          role.isCurrent
                            ? "bg-lime/15 text-lime"
                            : "bg-cream text-ink-soft"
                        }`}
                      >
                        {role.period}
                      </span>
                    </div>

                    <p className="mt-4 text-sm font-semibold leading-relaxed text-ink">
                      {role.summary}
                    </p>

                    <ul className="mt-3 flex flex-col gap-2">
                      {role.bullets.map((bullet, j) => (
                        <li
                          key={j}
                          className="relative pl-4 text-sm leading-relaxed text-ink-soft before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-pink-soft"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {role.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-pink/20 bg-pink-glow/40 px-3 py-1 text-[11px] font-semibold text-ink"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
