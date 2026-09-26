import { anuncios } from "@/data/anuncios";
import { eventos } from "@/data/eventos";
import { hoyBogota } from "@/lib/fechas";
import { avanceCampanaDestacada } from "@/lib/vaki";
import { CampanaDestacada } from "@/components/campana/CampanaDestacada";
import { eventosAlCompilar } from "@/lib/googleCalendar";
import { AboutPreview } from "@/components/home/AboutPreview";
import { AchievementsPreview } from "@/components/home/AchievementsPreview";
import { Hero } from "@/components/home/Hero";
import { HowToHelp } from "@/components/home/HowToHelp";
import { Marquesina } from "@/components/home/Marquesina";
import { PerformancesPreview } from "@/components/home/PerformancesPreview";
import { ProgramsGrid } from "@/components/home/ProgramsGrid";
import { ProximasFechas } from "@/components/home/ProximasFechas";

/*
 * Inicio es un resumen que lleva a las demás páginas. Tienda, redes y
 * contacto tienen su propio lugar (menú y pie), así que no se repiten aquí;
 * de la agenda solo va el resumen de las próximas fechas.
 */
export default async function InicioPage() {
  const hoy = hoyBogota();
  const [proximosEventos, avance] = await Promise.all([
    eventosAlCompilar(eventos),
    avanceCampanaDestacada(anuncios),
  ]);

  return (
    <>
      <Hero />
      <Marquesina />
      {/* Lo que la fundación quiere resaltar ahora: una sola campaña. */}
      <CampanaDestacada
        anuncios={anuncios}
        hoyCompilacion={hoy}
        avance={avance}
      />
      <AboutPreview />
      <ProgramsGrid />
      <PerformancesPreview />
      <ProximasFechas eventos={proximosEventos} hoyCompilacion={hoy} />
      <AchievementsPreview />
      <HowToHelp />
    </>
  );
}
