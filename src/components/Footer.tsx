import type { Dictionary } from "@/app/[lang]/dictionaries";

export function Footer({ dict }: { dict: Dictionary["footer"] }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mx-auto max-w-5xl px-5 pb-10 pt-6">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-6 text-xs text-ink-soft sm:flex-row">
        <p>{dict.copyright.replace("{year}", String(year))}</p>
        <p>{dict.tagline}</p>
      </div>
    </footer>
  );
}
