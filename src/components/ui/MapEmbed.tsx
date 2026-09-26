import { site } from "@/data/site";
import { cx } from "@/lib/colores";
import { Icon } from "./Icon";

interface MapEmbedProps {
  className?: string;
  textoEnlace?: string;
}

/** Mapa de Google con carga diferida y enlace para abrirlo aparte. */
export function MapEmbed({
  className,
  textoEnlace = "Abrir en Google Maps",
}: MapEmbedProps) {
  const direccion = `${site.direccion.calle}, ${site.direccion.localidad}, ${site.direccion.ciudad}`;
  return (
    <div className={className}>
      <iframe
        src={site.mapa.embedUrl}
        title={`Mapa: ${site.nombre}, ${direccion}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={cx(
          "aspect-4/3 w-full rounded-panel border-2 border-gris/30 bg-blanco",
        )}
      />
      <a
        href={site.mapa.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex min-h-11 items-center gap-2 font-bold text-tinta underline decoration-2 underline-offset-4"
      >
        <Icon nombre="ubicacion" />
        <span>
          {textoEnlace}
          <span className="sr-only"> (se abre en una pestaña nueva)</span>
        </span>
      </a>
    </div>
  );
}
