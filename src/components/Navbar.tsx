"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "./Icon";
import { bars, xmark, lemonCut } from "./icons";
import { LanguageSwitch } from "./LanguageSwitch";
import { ThemeToggle } from "./ThemeToggle";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Props = {
  dict: Dictionary["ui"];
  lang: "pt" | "en";
};

export function Navbar({ dict, lang }: Props) {
  const [open, setOpen] = useState(false);
  const other = lang === "pt" ? "en" : "pt";

  const links = [
    { label: dict.nav.home, href: "#home" },
    { label: dict.nav.about, href: "#sobre" },
    { label: dict.nav.experience, href: "#experiencia" },
    { label: dict.nav.contact, href: "#contato" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav className="glass-nav flex w-full max-w-5xl items-center justify-between gap-5 rounded-full px-3 py-2 sm:px-4 sm:py-2.5 lg:gap-8">
        <a href="#home" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lime-glow text-lime">
            <Icon icon={lemonCut} size={21} />
          </span>
          <span className="font-display text-sm font-bold tracking-tight sm:text-[0.95rem]">
            {dict.brand.name}
          </span>
        </a>

        {/* O alvo de clique é a pílula inteira, não só o texto: o padding
            vira área clicável e o fundo dá o retorno visual do hover. */}
        <ul className="hidden items-center gap-1 text-sm font-medium text-ink-soft lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block rounded-full px-3.5 py-2 transition-colors duration-200 hover:bg-lime/10 hover:text-ink focus-visible:bg-lime/10 focus-visible:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/40 dark:hover:bg-lime/15 dark:focus-visible:bg-lime/15"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2.5">
          {/* Em telas pequenas a barra fica só com o tema; o idioma vai para
              dentro do menu, senão os controles disputam espaço com a marca. */}
          <span className="hidden lg:block">
            <LanguageSwitch
              current={dict.lang.current}
              target={dict.lang.switchTo}
              targetPath={other}
              ariaLabel={dict.lang.switchAria}
              title={dict.lang.switchTitle}
            />
          </span>

          <ThemeToggle dict={dict.theme} />

          <a
            href="#contato"
            className="hidden items-center rounded-full bg-gradient-to-r from-lime to-[#2f8a3d] px-4 py-2 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(63,163,77,0.35)] transition-transform hover:scale-[1.03] lg:flex"
          >
            {dict.cta.primary}
          </a>

          <button
            type="button"
            aria-label={open ? dict.menu.close : dict.menu.open}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink lg:hidden"
          >
            <Icon icon={open ? xmark : bars} size={20} />
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="nav-panel absolute top-[calc(100%+8px)] w-[calc(100%-2rem)] max-w-5xl rounded-3xl p-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1 text-sm font-medium">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2 text-ink-soft transition-colors duration-200 hover:bg-lime/10 hover:text-ink focus-visible:bg-lime/10 focus-visible:outline-none dark:hover:bg-lime/15"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-2 flex items-center justify-between gap-3 border-t border-ink/10 pt-3 dark:border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-wide text-ink-soft">
                {dict.lang.label}
              </span>
              <LanguageSwitch
                current={dict.lang.current}
                target={dict.lang.switchTo}
                targetPath={other}
                ariaLabel={dict.lang.switchAria}
                title={dict.lang.switchTitle}
              />
            </li>
            <li>
              <a
                href="#contato"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center rounded-full bg-gradient-to-r from-lime to-[#2f8a3d] px-4 py-2.5 text-sm font-semibold text-white"
              >
                {dict.cta.primary}
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
