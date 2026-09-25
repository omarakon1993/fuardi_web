import type { TipoLogro } from "@/lib/types";
import { Icon, type NombreIcono } from "@/components/ui/Icon";
import { cx } from "@/lib/colores";

const iconos: Record<TipoLogro, NombreIcono> = {
  reconocimiento: "reconocimiento",
  galardon: "galardon",
  participacion: "participacion",
  medios: "medios",
};

const colores: Record<TipoLogro, string> = {
  reconocimiento: "bg-azul text-blanco",
  galardon: "bg-amarillo text-tinta",
  participacion: "bg-rojo text-blanco",
  medios: "bg-magenta text-blanco",
};

export function IconoLogro({
  tipo,
  className,
}: {
  tipo: TipoLogro;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        "inline-flex size-12 shrink-0 items-center justify-center rounded-full",
        colores[tipo],
        className,
      )}
    >
      <Icon nombre={iconos[tipo]} />
    </span>
  );
}
