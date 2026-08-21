"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Icon } from "./Icon";
import { sun, moon } from "./icons";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export function ThemeToggle({ dict }: { dict: Dictionary["ui"]["theme"] }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  /* O tema só é conhecido no cliente (localStorage + media query). Renderizar
     o ícone antes disso causaria mismatch de hidratação, então o primeiro
     paint é um placeholder do mesmo tamanho: o layout não salta. */
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  const label = isDark ? dict.toLight : dict.toDark;

  if (!mounted) {
    return (
      <div
        aria-hidden
        className="h-9 w-9 shrink-0 rounded-full border border-ink/10"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="group relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-ink/10 bg-white/50 text-ink-soft transition-colors hover:border-lime/40 hover:text-lime dark:border-white/15 dark:bg-white/5 dark:hover:border-lime/50"
    >
      {/* Halo no hover, na cor do acento ativo */}
      <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 shadow-[0_0_18px_-2px_rgba(63,163,77,0.55)] dark:shadow-[0_0_20px_-2px_rgba(74,222,128,0.6)]" />

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -180, scale: 0.8, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 180, scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-[1] flex items-center justify-center"
        >
          <Icon icon={isDark ? moon : sun} size={16} />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
