import type { IconDef } from "./icons";

type Props = {
  icon: IconDef;
  size?: number;
  className?: string;
  title?: string;
};

/**
 * Renderiza tanto os paths do Font Awesome (contorno como forma preenchida)
 * quanto os ícones desenhados em stroke, mantendo o mesmo peso visual.
 */
export function Icon({ icon, size = 20, className, title }: Props) {
  const isStroke = icon.mode === "stroke";

  return (
    <svg
      viewBox={icon.viewBox}
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      className={className}
      style={{ flex: "none" }}
      fill={isStroke ? "none" : "currentColor"}
      stroke={isStroke ? "currentColor" : undefined}
      strokeWidth={isStroke ? 32 : undefined}
      strokeLinecap={isStroke ? "round" : undefined}
      strokeLinejoin={isStroke ? "round" : undefined}
    >
      {title && <title>{title}</title>}

      {icon.ellipses?.map((e, i) => (
        <ellipse
          key={`e${i}`}
          cx={e.cx}
          cy={e.cy}
          rx={e.rx}
          ry={e.ry}
          transform={
            e.rotate ? `rotate(${e.rotate} ${e.cx} ${e.cy})` : undefined
          }
        />
      ))}

      {icon.circles?.map((c, i) => (
        <circle key={`c${i}`} cx={c.cx} cy={c.cy} r={c.r} />
      ))}

      {icon.d.map((d, i) => (
        <path key={`p${i}`} d={d} />
      ))}
    </svg>
  );
}
