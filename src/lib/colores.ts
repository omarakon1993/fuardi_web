import type { ColorMarca } from "@/lib/types";

/**
 * Clases completas por color (Tailwind necesita verlas escritas tal cual).
 * `fondo` + `sobreFondo` siempre cumplen AA: amarillo y naranja llevan texto tinta.
 */
export const clasesColor: Record<
  ColorMarca,
  { fondo: string; sobreFondo: string; texto: string; borde: string }
> = {
  tinta: {
    fondo: "bg-tinta",
    sobreFondo: "text-blanco",
    texto: "text-tinta",
    borde: "border-tinta",
  },
  rojo: {
    fondo: "bg-rojo",
    sobreFondo: "text-blanco",
    texto: "text-rojo",
    borde: "border-rojo",
  },
  verde: {
    fondo: "bg-verde",
    sobreFondo: "text-blanco",
    texto: "text-verde",
    borde: "border-verde",
  },
  magenta: {
    fondo: "bg-magenta",
    sobreFondo: "text-blanco",
    texto: "text-magenta",
    borde: "border-magenta",
  },
  amarillo: {
    fondo: "bg-amarillo",
    sobreFondo: "text-tinta",
    // Amarillo no se usa como texto: se reemplaza por tinta.
    texto: "text-tinta",
    borde: "border-amarillo",
  },
  naranja: {
    fondo: "bg-naranja",
    sobreFondo: "text-tinta",
    texto: "text-tinta",
    borde: "border-naranja",
  },
};

/** Une clases ignorando valores vacíos. */
export function cx(...clases: Array<string | false | null | undefined>) {
  return clases.filter(Boolean).join(" ");
}
