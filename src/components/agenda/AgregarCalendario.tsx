"use client";

import { paginas } from "@/data/paginas";
import { descargarIcs, enlaceGoogleCalendar } from "@/lib/calendario";
import type { Evento } from "@/lib/types";
import { Boton, BotonEnlace } from "@/components/ui/Button";

export function AgregarCalendario({ evento }: { evento: Evento }) {
  const t = paginas.agenda;
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <Boton
        variante="secundario"
        tamano="compacto"
        icono="descargar"
        onClick={() => descargarIcs(evento)}
      >
        {t.agregar}
        <span className="sr-only">: {evento.titulo} (archivo .ics)</span>
      </Boton>
      <BotonEnlace
        href={enlaceGoogleCalendar(evento)}
        variante="texto"
        tamano="compacto"
      >
        {t.google}
        <span className="sr-only">: {evento.titulo}</span>
      </BotonEnlace>
    </div>
  );
}
