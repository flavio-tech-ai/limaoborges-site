/**
 * Estrela que substitui o ponto final do título da hero.
 * Herda o degradê verde → rosa da identidade e senta na linha de base,
 * ocupando o lugar da pontuação sem desalinhar o texto.
 */
export function GradientStar({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      aria-hidden
      className={`ml-[0.08em] inline-block h-[0.62em] w-[0.62em] align-baseline ${className}`}
    >
      <defs>
        {/* Verde direto para rosa passa por um marrom sujo no sRGB. A parada
            intermediária no amarelo-limão da paleta desvia o degradê por um
            caminho mais claro e ainda reforça a identidade. */}
        <linearGradient id="heroStar" x1="0.05" y1="0.1" x2="0.95" y2="0.9">
          <stop offset="0%" stopColor="#f0b8c4" />
          <stop offset="45%" stopColor="#ee6ba4" />
          <stop offset="100%" stopColor="#d9327d" />
        </linearGradient>
      </defs>
      <path
        fill="url(#heroStar)"
        d="M256 72C256 152 328 224 408 256 328 288 256 360 256 440 256 360 184 288 104 256 184 224 256 152 256 72Z"
      />
    </svg>
  );
}
