# limaotech.com

Portfólio pessoal de Flavio "Limão" Araujo, AI Engineer. Bilíngue (PT-BR / EN-US),
com tema claro e escuro.

Next.js (App Router) + Tailwind CSS v4 + Framer Motion, exportado como site
estático e servido pelo Cloudflare Pages.

## Rodando localmente

```bash
npm install
npm run dev          # http://localhost:3000
```

A raiz redireciona para `/pt/` ou `/en/` conforme o idioma do navegador.

```bash
npm run build        # gera out/ com o site estático
npm run preview      # serve out/ para conferir o resultado do build
npm run lint
```

## Deploy no Cloudflare Pages

No painel do Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**,
aponte para este repositório e use:

| Campo | Valor |
| --- | --- |
| Framework preset | `Next.js (Static HTML Export)` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node version | `20` ou superior |

Em **Settings → Environment variables**, adicione em *Production* e *Preview*:

```
NEXT_PUBLIC_SITE_URL = https://limaotech.com
```

Essa variável alimenta o `metadataBase`, as tags canônicas, o `sitemap.xml` e o
`robots.txt`. **Se o domínio for outro, mude aqui** — é o único lugar onde ele
aparece.

Depois, em **Custom domains**, adicione `limaotech.com` e `www.limaotech.com`.
Como o domínio já está na Cloudflare, os registros DNS são criados
automaticamente.

Cada push na branch principal dispara um novo deploy.

## Estrutura

```
src/
  app/
    [lang]/
      layout.tsx        metadata, hreflang, providers de tema
      page.tsx          monta as seções a partir do dicionário
      dictionaries.ts   carrega o JSON do idioma
    globals.css         tokens, tema escuro, efeitos
    icon.svg            favicon (limão cortado)
    apple-icon.svg      ícone para iOS
    robots.ts           gera robots.txt no build
    sitemap.ts          gera sitemap.xml com hreflang
  components/           Navbar, Hero, FocusGrid, Timeline, Contact, Footer…
  dictionaries/
    pt-BR.json          todo o texto em português
    en-US.json          todo o texto em inglês
  site.ts               endereço público do site
public/
  index.html            raiz: detecta o idioma e redireciona
  _headers              cabeçalhos de segurança e cache (Cloudflare Pages)
  _redirects            atalhos de URL (Cloudflare Pages)
  flavio-photo.jpg
  lemon-laptop.png
```

### Mexendo no conteúdo

Todo o texto do site vive em `src/dictionaries/pt-BR.json` e `en-US.json`, com as
mesmas chaves nos dois. Editar um par de chaves atualiza a seção
correspondente — nenhum texto está escrito dentro de componente.

### Sobre a raiz do site

O export estático não roda middleware, então a detecção de idioma que ficaria no
servidor acontece em `public/index.html`, no navegador, antes da primeira
pintura. Há um `<meta http-equiv="refresh">` como reserva para quem estiver com
JavaScript desligado, e a página é marcada com `noindex` para não competir com
`/pt/` e `/en/` na busca.

## Acessibilidade e performance

- Contraste acima de AA nos dois temas (corpo em 16,7:1 no claro e 17,2:1 no escuro).
- Todas as animações respeitam `prefers-reduced-motion`.
- Fontes self-hosted via `@fontsource`, sem requisição a terceiros.
- Ícones em SVG inline: Font Awesome Free (CC BY 4.0) e desenhos próprios na
  mesma geometria.
