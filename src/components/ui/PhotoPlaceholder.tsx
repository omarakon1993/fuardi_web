import { cx } from "@/lib/colores";
import { Icon } from "./Icon";

const proporciones = {
  "16/9": "aspect-video",
  "4/3": "aspect-4/3",
  "3/2": "aspect-3/2",
  "1/1": "aspect-square",
  "3/4": "aspect-3/4",
  libre: "",
} as const;

interface PhotoPlaceholderProps {
  /** Qué debe mostrar la foto real. */
  descripcion: string;
  proporcion?: keyof typeof proporciones;
  /** "oscuro" para usar debajo de texto blanco, como en el hero. */
  tono?: "claro" | "oscuro";
  className?: string;
  /** Oculta el texto visible (se mantiene para lectores de pantalla). */
  compacto?: boolean;
}

/**
 * Marca el lugar de una foto que la fundación aún no ha entregado.
 * TODO(contenido): reemplazar cada uso por una foto real en public/images/.
 */
export function PhotoPlaceholder({
  descripcion,
  proporcion = "4/3",
  tono = "claro",
  className,
  compacto,
}: PhotoPlaceholderProps) {
  const oscuro = tono === "oscuro";
  return (
    <div
      role="img"
      aria-label={`Foto pendiente: ${descripcion}`}
      className={cx(
        "flex flex-col items-center justify-center gap-2 overflow-hidden p-4 text-center",
        proporciones[proporcion],
        oscuro
          ? "bg-azul-hondo text-blanco/80"
          : "border-2 border-dashed border-gris/40 bg-niebla text-gris",
        className,
      )}
    >
      <Icon nombre="camara" tamano={compacto ? 24 : 32} />
      {compacto ? null : (
        <span aria-hidden="true" className="max-w-[28ch] text-sm leading-snug">
          Foto pendiente: {descripcion}
        </span>
      )}
    </div>
  );
}
