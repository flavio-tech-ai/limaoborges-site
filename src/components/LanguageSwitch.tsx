"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  current: string;
  target: string;
  targetPath: "pt" | "en";
  ariaLabel: string;
  title: string;
  className?: string;
};

/**
 * Troca o primeiro segmento da URL pelo locale de destino, preservando o resto
 * do caminho. Renderiza um <Link> de verdade — o Google precisa conseguir
 * rastrear as duas versões, e o usuário precisa poder abrir em nova aba.
 */
export function LanguageSwitch({
  current,
  target,
  targetPath,
  ariaLabel,
  title,
  className = "",
}: Props) {
  const pathname = usePathname();
  const rest = pathname.split("/").slice(2).join("/");
  const href = `/${targetPath}${rest ? `/${rest}` : ""}`;

  return (
    <Link
      href={href}
      hrefLang={targetPath === "pt" ? "pt-BR" : "en-US"}
      aria-label={ariaLabel}
      title={title}
      className={`group flex shrink-0 items-center gap-1 rounded-full border border-ink/10 bg-white/50 px-2.5 py-1.5 text-[11px] font-bold tracking-wide transition-colors hover:border-ink/20 ${className}`}
    >
      <span className="text-ink">{current}</span>
      <span aria-hidden className="text-ink/25">
        /
      </span>
      <span className="text-ink-soft transition-colors group-hover:text-lime">
        {target}
      </span>
    </Link>
  );
}
