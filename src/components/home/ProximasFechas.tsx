"use client";

import { nombresTipoEvento } from "@/data/eventos";
import { inicio } from "@/data/inicio";
import { site } from "@/data/site";
import {
  formatFechaLarga,
  partesFecha,
  proximos,
  rangoHoras,
} from "@/lib/fechas";
import { lugarEvento } from "@/lib/calendario";
import type { Evento, Fecha } from "@/lib/types";
import { useEventos } from "@/lib/useEventos";
import { useHoy } from "@/lib/useHoy";
import { BotonEnlace } from "@/components/ui/Button";
import { EtiquetaEjemplo } from "@/components/ui/EtiquetaEjemplo";
import { Icon } from "@/components/ui/Icon";
import { Revelar } from "@/components/ui/Revelar";
import { EncabezadoSeccion, Section } from "@/components/ui/Section";

interface ProximasFechasProps {
  eventos: Evento[];
  hoyCompilacion: Fecha;
}

/**
 * Resumen de la agenda en inicio: las tres fechas más cercanas. Se vuelve a
 * filtrar en el navegador para que no queden eventos pasados entre despliegues.
 */
export function ProximasFechas({
  eventos,
  hoyCompilacion,
}: ProximasFechasProps) {
  const t = inicio.agenda;
  const hoy = useHoy(hoyCompilacion);
  const lista = proximos(useEventos(eventos), hoy).slice(0, 3);

  return (
    <Section tituloId="agenda-titulo" fondo="cana" capa>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div>
          <EncabezadoSeccion
            id="agenda-titulo"
            antetitulo={t.antetitulo}
            titulo={t.titulo}
            intro={t.intro}
          />
          <BotonEnlace href="/agenda/" variante="secundario" className="mt-8">
            {t.enlace}
          </BotonEnlace>
        </div>

        {lista.length === 0 ? (
          <Revelar className="self-center rounded-foto bg-blanco p-8">
            <p className="text-entrada">{t.vacio}</p>
            <BotonEnlace
              href={site.canalWhatsApp ?? "/contacto/"}
              variante="whatsapp"
              icono="whatsapp"
              className="mt-6"
            >
              {t.canal}
            </BotonEnlace>
          </Revelar>
        ) : (
          <ul className="grid content-center gap-4">
            {lista.map((evento) => {
              const { dia, mes } = partesFecha(evento.fecha);
              const horas = rangoHoras(evento.horaInicio, evento.horaFin);
              const lugar = lugarEvento(evento);
              return (
                <Revelar
                  as="li"
                  key={evento.id}
                  className="flex gap-5 rounded-foto bg-blanco p-5 sm:p-6"
                >
                  {/* La fecha completa se lee abajo; esta hoja es visual. */}
                  <span
                    aria-hidden="true"
                    className="flex w-20 shrink-0 flex-col items-center justify-center self-start rounded-panel bg-rojo py-3 text-blanco"
                  >
                    <span className="text-sm font-bold uppercase">{mes}</span>
                    <span className="condensada text-5xl leading-none font-extrabold">
                      {dia}
                    </span>
                  </span>
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2 text-sm font-bold text-gris">
                      {nombresTipoEvento[evento.tipo]}
                      {evento.ejemplo ? <EtiquetaEjemplo /> : null}
                    </p>
                    <h3 className="mt-1 text-2xl">{evento.titulo}</h3>
                    <p className="mt-2 flex items-start gap-2 text-base">
                      <Icon
                        nombre="calendario"
                        tamano={18}
                        className="mt-1 shrink-0"
                      />
                      <span>
                        {formatFechaLarga(evento.fecha)}
                        {horas ? `, ${horas}` : ""}
                      </span>
                    </p>
                    {lugar ? (
                      <p className="mt-1 flex items-start gap-2 text-base">
                        <Icon
                          nombre="ubicacion"
                          tamano={18}
                          className="mt-1 shrink-0"
                        />
                        <span>{lugar}</span>
                      </p>
                    ) : null}
                  </div>
                </Revelar>
              );
            })}
          </ul>
        )}
      </div>
    </Section>
  );
}
