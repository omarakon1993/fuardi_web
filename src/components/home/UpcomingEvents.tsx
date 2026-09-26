"use client";

import { inicio } from "@/data/inicio";
import { proximos } from "@/lib/fechas";
import { useHoy } from "@/lib/useHoy";
import type { Evento, Fecha } from "@/lib/types";
import { TarjetaEvento } from "@/components/agenda/TarjetaEvento";
import { BotonEnlace } from "@/components/ui/Button";
import { EncabezadoSeccion, Section } from "@/components/ui/Section";

interface UpcomingEventsProps {
  eventos: Evento[];
  hoyCompilacion: Fecha;
}

export function UpcomingEvents({
  eventos,
  hoyCompilacion,
}: UpcomingEventsProps) {
  const hoy = useHoy(hoyCompilacion);
  const lista = proximos(eventos, hoy).slice(0, 3);

  return (
    <Section tituloId="eventos-titulo">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <EncabezadoSeccion id="eventos-titulo" titulo={inicio.eventos.titulo} />
        <BotonEnlace href="/agenda/" variante="secundario">
          {inicio.eventos.enlace}
        </BotonEnlace>
      </div>
      {lista.length === 0 ? (
        <p className="mt-8 text-xl">{inicio.eventos.vacio}</p>
      ) : (
        <ul className="mt-10 grid gap-10 lg:grid-cols-3">
          {lista.map((evento) => (
            <li key={evento.id}>
              <TarjetaEvento evento={evento} />
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
