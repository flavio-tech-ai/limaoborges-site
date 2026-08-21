import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Export estático: o build gera HTML puro em out/, que é o que o
   * Cloudflare Pages serve. O site não tem nada de servidor — todo o
   * conteúdo vem dos dicionários em tempo de build.
   */
  output: "export",

  /**
   * Sem servidor não há otimizador de imagem. As imagens já vão no
   * tamanho final em public/, então não se perde nada.
   */
  images: { unoptimized: true },

  /**
   * Gera out/pt/index.html em vez de out/pt.html. Hospedagem estática
   * resolve esse formato sem depender de regra de reescrita.
   */
  trailingSlash: true,
};

export default nextConfig;
