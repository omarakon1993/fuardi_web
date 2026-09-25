import { nombresTipoEvento } from "@/data/eventos";
import { formatFechaLarga, partesFecha, rangoHoras } from "@/lib/fechas";
import type { Evento } from "@/lib/types";
import { EtiquetaEjemplo } from "@/components/ui/EtiquetaEjemplo";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/colores";

interface TarjetaEventoProps {
  evento: Evento;
  /** Nivel del título según dónde se use. */
  nivel?: "h3" | "h4";
  pasado?: boolean;
  children?: React.ReactNode;
}

/** Evento con fecha tipo hoja de calendario. */
export function TarjetaEvento({
  evento,
  nivel: Titulo = "h3",
  pasado,
  children,
}: TarjetaEventoProps) {
  const { dia, mes, anio } = partesFecha(evento.fecha);
  const horas = rangoHoras(evento.horaInicio, evento.horaFin);

  return (
    <article className="flex gap-5">
      <div
        aria-hidden="true"
        className={cx(
          "flex w-20 shrink-0 flex-col items-center self-start overflow-hidden rounded-lg border-2 text-center",
          pasado ? "border-gris/40" : "border-rojo",
        )}
      >
        <span
          className={cx(
            "w-full py-0.5 text-sm font-bold uppercase",
            pasado ? "bg-gris text-blanco" : "bg-rojo text-blanco",
          )}
        >
          {mes}
        </span>
        <span className="font-display text-3xl font-extrabold">{dia}</span>
        <span className="pb-1 text-sm text-gris">{anio}</span>
      </div>
      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-2 text-base font-bold text-gris">
          {nombresTipoEvento[evento.tipo]}
          {evento.ejemplo ? <EtiquetaEjemplo /> : null}
        </p>
        <Titulo className="mt-1 text-2xl">{evento.titulo}</Titulo>
        <ul className="mt-2 space-y-1 text-base">
          <li className="flex items-start gap-2">
            <Icon nombre="calendario" tamano={20} className="mt-1 shrink-0" />
            <span>
              {formatFechaLarga(evento.fecha)}
              {evento.fechaFin
                ? ` al ${formatFechaLarga(evento.fechaFin)}`
                : ""}
            </span>
          </li>
          {horas ? (
            <li className="flex items-start gap-2">
              <Icon nombre="reloj" tamano={20} className="mt-1 shrink-0" />
              <span>{horas}</span>
            </li>
          ) : null}
          <li className="flex items-start gap-2">
            <Icon nombre="ubicacion" tamano={20} className="mt-1 shrink-0" />
            <span>
              {evento.lugar}, {evento.ciudad}
            </span>
          </li>
        </ul>
        <p className="mt-3 medida">{evento.descripcion}</p>
        {children}
      </div>
    </article>
  );
}
