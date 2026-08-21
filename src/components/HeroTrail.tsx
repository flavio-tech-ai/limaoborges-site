"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Rastro de estrela cadente da hero.
 *
 * O arco é longo e passa POR TRÁS do texto (z negativo dentro do wrapper
 * isolado). A estrela percorre o caminho e congela no fim, num ponto acima
 * do título, à direita do badge, onde não há texto para cobri-la.
 *
 * preserveAspectRatio="none" faz a viewBox casar exatamente com a caixa do
 * elemento, então as coordenadas abaixo são previsíveis. A distorção
 * resultante é de ~5%, imperceptível numa curva e numa estrela simétrica.
 */
const ARC =
  "M20 356 C 240 340, 430 300, 600 232 C 760 168, 862 96, 918 44";

/** Estrela de quatro pontas centrada na origem, para o animateMotion posicionar. */
const STAR =
  "M0 -32C0 -15 15 0 32 0 15 0 0 15 0 32 0 15 -15 0 -32 0 -15 0 0 -15 0 -32Z";

const DUR = "2.4s";
const BEGIN = "0.45s";
const SPLINE = "0.22 1 0.36 1";

export function HeroTrail() {
  const reduced = useReducedMotion();

  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 420"
      fill="none"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 -z-10 hidden h-full w-full md:block"
    >
      <defs>
        <linearGradient id="heroTrailStroke" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#e63888" stopOpacity="0" />
          <stop offset="22%" stopColor="#e63888" stopOpacity="0.28" />
          <stop offset="70%" stopColor="#e63888" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#e63888" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="heroTrailStar" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f8cdd9" />
          <stop offset="55%" stopColor="#ee6ba4" />
          <stop offset="100%" stopColor="#d9327d" />
        </linearGradient>
        <filter id="heroTrailGlow" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* A linha se desenha conforme a estrela avança. pathLength="1" deixa o
          dash independente do comprimento real do traçado. */}
      <path
        id="heroArc"
        d={ARC}
        stroke="url(#heroTrailStroke)"
        strokeWidth="3.4"
        strokeLinecap="round"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={reduced ? 0 : 1}
      >
        {!reduced && (
          <animate
            attributeName="stroke-dashoffset"
            from="1"
            to="0"
            dur={DUR}
            begin={BEGIN}
            fill="freeze"
            calcMode="spline"
            keySplines={SPLINE}
            keyTimes="0;1"
          />
        )}
      </path>

      {/* A estrela viaja pelo arco e congela no fim (fill="freeze"). */}
      <g filter="url(#heroTrailGlow)">
        <path
          d={STAR}
          fill="url(#heroTrailStar)"
          transform={reduced ? "translate(918 44)" : undefined}
          opacity={reduced ? 1 : 0}
        >
          {!reduced && (
            <>
              <animateMotion
                dur={DUR}
                begin={BEGIN}
                fill="freeze"
                calcMode="spline"
                keySplines={SPLINE}
                keyTimes="0;1"
                keyPoints="0;1"
              >
                <mpath href="#heroArc" />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;1;1"
                keyTimes="0;0.12;1"
                dur={DUR}
                begin={BEGIN}
                fill="freeze"
              />
            </>
          )}
        </path>
      </g>
    </svg>
  );
}
