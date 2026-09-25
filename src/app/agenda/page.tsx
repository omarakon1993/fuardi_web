import type { Metadata } from "next";
import { eventos } from "@/data/eventos";
import { paginas } from "@/data/paginas";
import { site } from "@/data/site";
import { hoyBogota } from "@/lib/fechas";
import { Agenda } from "@/components/agenda/Agenda";
import { PageHeader } from "@/components/ui/PageHeader";
import { EncabezadoSeccion, Section } from "@/components/ui/Section";

const t = paginas.agenda;

export const metadata: Metadata = {
  title: t.titulo,
  description:
    "Próximas presentaciones, festivales y actividades de la Fundación Armonía Diversa.",
};

export default function AgendaPage() {
  return (
    <>
      <PageHeader titulo={t.titulo} intro={t.intro} />

      <Section tituloId="eventos-titulo" fondo="niebla">
        <h2 id="eventos-titulo" className="sr-only">
          Eventos
        </h2>
        <Agenda eventos={eventos} hoyCompilacion={hoyBogota()} />
      </Section>

      {site.googleCalendarEmbedUrl ? (
        <Section tituloId="gcal-titulo">
          <EncabezadoSeccion id="gcal-titulo" titulo={t.calendarioEmbebido} />
          <iframe
            src={site.googleCalendarEmbedUrl}
            title={`${t.calendarioEmbebido} en Google Calendar`}
            loading="lazy"
            className="mt-8 aspect-4/3 w-full rounded-lg border-2 border-niebla"
          />
        </Section>
      ) : null}
    </>
  );
}
