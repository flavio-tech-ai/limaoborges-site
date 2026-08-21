/**
 * Endereço público do site, usado em metadata, canonical, sitemap e robots.
 *
 * Vem de NEXT_PUBLIC_SITE_URL para o valor não ficar preso no código: no
 * Cloudflare Pages basta definir a variável no painel. O fallback cobre o
 * ambiente local e um build sem a variável configurada.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://limaotech.com"
).replace(/\/$/, "");
