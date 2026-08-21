import type { MetadataRoute } from "next";
import { SITE_URL } from "@/site";

/** Gera out/sitemap.xml no build, com as duas versões de idioma. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["pt", "en"].map((lang) => ({
    url: `${SITE_URL}/${lang}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: lang === "pt" ? 1 : 0.9,
    alternates: {
      languages: {
        "pt-BR": `${SITE_URL}/pt/`,
        "en-US": `${SITE_URL}/en/`,
      },
    },
  }));
}
