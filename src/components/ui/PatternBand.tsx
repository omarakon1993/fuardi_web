import { cx } from "@/lib/colores";

/*
 * Franja inspirada en las "pintas" del sombrero vueltiao: rombos calados
 * encadenados con dientes arriba y abajo, como la trenza de caña flecha.
 * Es el único elemento decorativo del sitio.
 */
function mosaico(color: string) {
  const c = encodeURIComponent(color);
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='24' viewBox='0 0 32 24'>` +
    `<g fill='${c}'>` +
    `<rect width='32' height='2'/><rect y='22' width='32' height='2'/>` +
    `<path fill-rule='evenodd' d='M16 4l8 8-8 8-8-8zm0 4.5L12.5 12 16 15.5 19.5 12z'/>` +
    `<path d='M0 4l8 8-8 8zM32 4l-8 8 8 8z'/>` +
    `<path d='M4 2l4 5 4-5zM20 2l4 5 4-5zM4 22l4-5 4 5zM20 22l4-5 4 5z'/>` +
    `</g></svg>`;
  return `url("data:image/svg+xml,${svg}")`;
}

const tonos = {
  /** Pinta tinta sobre caña: entre secciones claras. */
  cana: { fondo: "bg-cana", color: "#14213d" },
  /** Pinta caña sobre tinta: encima del footer. */
  tinta: { fondo: "bg-tinta", color: "#f6efdc" },
  /** Pinta blanca sobre rojo, como la pañoleta: debajo del hero. */
  rojo: { fondo: "bg-rojo", color: "#ffffff" },
} as const;

interface PatternBandProps {
  tono?: keyof typeof tonos;
  className?: string;
}

export function PatternBand({ tono = "cana", className }: PatternBandProps) {
  const { fondo, color } = tonos[tono];
  return (
    <div
      aria-hidden="true"
      className={cx("h-6 w-full bg-repeat-x", fondo, className)}
      style={{ backgroundImage: mosaico(color), backgroundPosition: "center" }}
    />
  );
}
