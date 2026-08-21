"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * attribute="class" escreve `.dark` no <html>, que é o que a variante
 * `@custom-variant dark` do Tailwind v4 procura.
 *
 * disableTransitionOnChange evita que TODAS as transições de cor rodem no
 * instante da troca: sem isso o site inteiro faz um cross-fade de 300ms de
 * uma vez, o que fica pesado. O next-themes injeta um style que desliga as
 * transições só durante o switch.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemeProvider>
  );
}
