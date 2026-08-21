"use client";

import { Icon } from "./Icon";
import { network, atom, rocket } from "./icons";
import type { IconDef } from "./icons";
import { MotionReveal } from "./MotionReveal";
import type { Dictionary } from "@/app/[lang]/dictionaries";

/** Ícone e tom são decisões de design, não de conteúdo — ficam ligados ao id da chave. */
const STYLES: Record<string, { icon: IconDef; tone: string; neon: string }> = {
  multiagent: {
    icon: network,
    tone: "from-lime-glow/70 to-transparent text-lime border-lime/25 dark:from-lime-glow/50",
    neon: "var(--color-lime)",
  },
  "physics-to-product": {
    icon: atom,
    tone: "from-pink-glow/70 to-transparent text-pink border-pink/25 dark:from-pink-glow/50",
    neon: "var(--color-pink)",
  },
  "ai-first": {
    icon: rocket,
    tone: "from-[#f3f7a6]/60 to-transparent text-[#7a7a12] border-[#e3e88a]/50 dark:from-[#d9e05f]/12 dark:text-[#d9e05f] dark:border-[#d9e05f]/25",
    neon: "var(--color-lemon)",
  },
};

export function FocusGrid({ dict }: { dict: Dictionary["focus"] }) {
  return (
    <section id="sobre" className="relative mx-auto max-w-5xl px-4 py-20 sm:px-5">
      <MotionReveal>
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-lime">
              {dict.eyebrow}
            </span>
            <h2 className="font-display mt-2 text-[1.8rem] font-extrabold tracking-tight text-ink sm:text-4xl">
              {dict.title}
            </h2>
          </div>
          <p className="max-w-sm text-sm text-ink-soft">{dict.lead}</p>
        </div>
      </MotionReveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {dict.cards.map((card, i) => {
          const style = STYLES[card.id] ?? STYLES.multiagent;
          return (
            <MotionReveal key={card.id} delay={i * 0.08}>
              <div
                style={{ "--neon": style.neon } as React.CSSProperties}
                className={`neon border-gradient glass group relative flex h-full min-w-0 flex-col rounded-3xl border bg-gradient-to-br p-6 hover:-translate-y-1.5 sm:p-7 ${style.tone}`}
              >
                <span className="relative z-[3] flex h-11 w-11 items-center justify-center rounded-2xl bg-white/70 shadow-sm dark:bg-white/10">
                  <Icon icon={style.icon} size={20} />
                </span>

                <span className="relative z-[3] mt-6 text-[11px] font-bold uppercase tracking-[0.12em] opacity-80">
                  {card.tag}
                </span>
                <h3 className="font-display relative z-[3] mt-2 text-lg font-bold text-ink">
                  {card.title}
                </h3>
                <p className="relative z-[3] mt-3 text-sm leading-relaxed text-ink-soft">
                  {card.description}
                </p>

                <div className="relative z-[3] mt-6 flex flex-wrap gap-2">
                  {card.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-white/70 bg-white/60 px-3 py-1 text-[11px] font-semibold text-ink-soft dark:border-white/10 dark:bg-white/[0.06]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </MotionReveal>
          );
        })}
      </div>
    </section>
  );
}
