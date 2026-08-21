import "server-only";

/**
 * Locales usados na URL (/pt, /en) mapeados para os arquivos de dicionário.
 * O código curto vai na rota; a tag BCP-47 completa vai no atributo <html lang>.
 */
const dictionaries = {
  pt: () =>
    import("@/dictionaries/pt-BR.json").then((module) => module.default),
  en: () =>
    import("@/dictionaries/en-US.json").then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const LOCALES = Object.keys(dictionaries) as Locale[];
export const DEFAULT_LOCALE: Locale = "pt";

/** Tag BCP-47 completa, para <html lang> e hreflang. */
export const BCP47: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en-US",
};

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

export type Dictionary = Awaited<ReturnType<typeof dictionaries.pt>>;
