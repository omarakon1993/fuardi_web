"use client";

import { useState } from "react";
import { formatFecha, formatFechaLarga } from "@/lib/fechas";
import type { Evento, Fecha } from "@/lib/types";
import { cx } from "@/lib/colores";
import { Icon } from "@/components/ui/Icon";
import { AgregarCalendario } from "./AgregarCalendario";
import { TarjetaEvento } from "./TarjetaEvento";

const DIAS = [
  { corto: "Lun", largo: "lunes" },
  { corto: "Mar", largo: "martes" },
  { corto: "Mié", largo: "miércoles" },
  { corto: "Jue", largo: "jueves" },
  { corto: "Vie", largo: "viernes" },
  { corto: "Sáb", largo: "sábado" },
  { corto: "Dom", largo: "domingo" },
];

const dosDigitos = (n: number) => String(n).padStart(2, "0");

/** Días que cubre cada evento (incluye eventos de varios días). */
function eventosPorDia(eventos: Evento[]) {
  const mapa = new Map<Fecha, Evento[]>();
  for (const evento of eventos) {
    const fin = evento.fechaFin ?? evento.fecha;
    const d = new Date(`${evento.fecha}T12:00:00Z`);
    for (let i = 0; i < 60; i++) {
      const dia = d.toISOString().slice(0, 10);
      mapa.set(dia, [...(mapa.get(dia) ?? []), evento]);
      if (dia >= fin) break;
      d.setUTCDate(d.getUTCDate() + 1);
    }
  }
  return mapa;
}

interface CalendarioMensualProps {
  eventos: Evento[];
  hoy: Fecha;
}

/** Calendario propio en una tabla: encabezados de día, meses con botones y detalle del día elegido. */
export function CalendarioMensual({ eventos, hoy }: CalendarioMensualProps) {
  const [anioHoy, mesHoy] = hoy.split("-").map(Number);
  const [mes, setMes] = useState({ anio: anioHoy, mes: mesHoy });
  const [elegido, setElegido] = useState<Fecha | null>(null);
  const porDia = eventosPorDia(eventos);

  const primero = new Date(Date.UTC(mes.anio, mes.mes - 1, 1));
  const diasEnMes = new Date(Date.UTC(mes.anio, mes.mes, 0)).getUTCDate();
  // getUTCDay: 0 = domingo. Semana empieza en lunes.
  const huecoInicial = (primero.getUTCDay() + 6) % 7;
  const celdas: Array<number | null> = [
    ...Array.from({ length: huecoInicial }, () => null),
    ...Array.from({ length: diasEnMes }, (_, i) => i + 1),
  ];
  while (celdas.length % 7 !== 0) celdas.push(null);
  const semanas = Array.from({ length: celdas.length / 7 }, (_, i) =>
    celdas.slice(i * 7, i * 7 + 7),
  );

  const nombreMes = formatFecha(`${mes.anio}-${dosDigitos(mes.mes)}-01`, {
    month: "long",
    year: "numeric",
  });

  function cambiarMes(delta: number) {
    const d = new Date(Date.UTC(mes.anio, mes.mes - 1 + delta, 1));
    setMes({ anio: d.getUTCFullYear(), mes: d.getUTCMonth() + 1 });
    setElegido(null);
  }

  const eventosElegidos = elegido ? (porDia.get(elegido) ?? []) : [];
  const boton =
    "inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full border-2 border-azul bg-blanco px-3 font-bold text-azul hover:bg-niebla";

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={() => cambiarMes(-1)} className={boton}>
          <Icon nombre="izquierda" />
          <span className="sr-only">Mes anterior</span>
        </button>
        <h3 className="text-2xl first-letter:uppercase" aria-live="polite">
          {nombreMes}
        </h3>
        <button type="button" onClick={() => cambiarMes(1)} className={boton}>
          <Icon nombre="derecha" />
          <span className="sr-only">Mes siguiente</span>
        </button>
      </div>

      <table className="mt-4 w-full table-fixed border-collapse text-center">
        <caption className="sr-only">
          Calendario de {nombreMes}. Los días con evento son botones.
        </caption>
        <thead>
          <tr>
            {DIAS.map((dia) => (
              <th
                key={dia.corto}
                scope="col"
                abbr={dia.largo}
                className="py-2 text-sm font-bold text-gris sm:text-base"
              >
                {dia.corto}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {semanas.map((semana, i) => (
            <tr key={i}>
              {semana.map((dia, j) => {
                if (dia === null) return <td key={j} />;
                const fecha: Fecha = `${mes.anio}-${dosDigitos(mes.mes)}-${dosDigitos(dia)}`;
                const delDia = porDia.get(fecha);
                const esHoy = fecha === hoy;
                return (
                  <td key={j} className="p-0.5 sm:p-1">
                    {delDia ? (
                      <button
                        type="button"
                        onClick={() => setElegido(fecha)}
                        aria-pressed={elegido === fecha}
                        aria-label={`${formatFechaLarga(fecha)}: ${delDia.length === 1 ? "1 evento" : `${delDia.length} eventos`}`}
                        className={cx(
                          "flex h-12 w-full cursor-pointer flex-col items-center justify-center rounded-lg font-bold sm:h-14",
                          elegido === fecha
                            ? "bg-tinta text-blanco"
                            : "bg-rojo text-blanco hover:bg-rojo-hondo",
                          esHoy && "ring-4 ring-azul ring-offset-2",
                        )}
                      >
                        {dia}
                        <span
                          aria-hidden="true"
                          className="mt-0.5 size-1.5 rounded-full bg-current"
                        />
                      </button>
                    ) : (
                      <span
                        className={cx(
                          "flex h-12 w-full items-center justify-center rounded-lg sm:h-14",
                          esHoy && "font-bold ring-4 ring-azul",
                        )}
                      >
                        {dia}
                        {esHoy ? <span className="sr-only"> (hoy)</span> : null}
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div aria-live="polite" className="mt-6">
        {elegido ? (
          <ul className="space-y-8 rounded-panel bg-blanco p-5 ring-1 ring-tinta/10">
            {eventosElegidos.map((evento) => (
              <li key={evento.id}>
                <TarjetaEvento
                  evento={evento}
                  nivel="h4"
                  pasado={(evento.fechaFin ?? evento.fecha) < hoy}
                >
                  {(evento.fechaFin ?? evento.fecha) >= hoy ? (
                    <AgregarCalendario evento={evento} />
                  ) : null}
                </TarjetaEvento>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gris">Elige un día marcado para ver el detalle.</p>
        )}
      </div>
    </div>
  );
}
