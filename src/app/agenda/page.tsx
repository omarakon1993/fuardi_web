import type { Metadata } from "next";
import { metadatos } from "@/lib/metadatos";
import { eventos } from "@/data/eventos";
import { paginas } from "@/data/paginas";
import { hoyBogota } from "@/lib/fechas";
import {
  enlaceSeguirCalendario,
  eventosAlCompilar,
} from "@/lib/googleCalendar";
import { Agenda } from "@/components/agenda/Agenda";
import { AccionesPrincipales, PageHeader } from "@/components/ui/PageHeader";
import { BotonEnlace } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

const t = paginas.agenda;

export const metadata: Metadata = metadatos(
  t.titulo,
  "Próximas presentaciones, festivales y actividades de la Fundación Armonía Diversa.",
  "/agenda/",
);

export default async function AgendaPage() {
  const lista = await eventosAlCompilar(eventos);

  return (
    <>
      <PageHeader
        titulo={t.titulo}
        etiqueta={t.etiqueta}
        intro={t.intro}
        acciones={<AccionesPrincipales />}
      />

      <Section tituloId="eventos-titulo" capa>
        <h2 id="eventos-titulo" className="sr-only">
          {t.eventos}
        </h2>
        <Agenda eventos={lista} hoyCompilacion={hoyBogota()} />
        {enlaceSeguirCalendario ? (
          <BotonEnlace
            href={enlaceSeguirCalendario}
            variante="texto"
            icono="calendario"
            className="mt-10"
          >
            {t.seguir}
          </BotonEnlace>
        ) : null}
      </Section>
    </>
  );
}
