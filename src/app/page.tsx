import { anuncios } from "@/data/anuncios";
import { eventos } from "@/data/eventos";
import { hoyBogota } from "@/lib/fechas";
import { eventosAlCompilar } from "@/lib/googleCalendar";
import { AboutPreview } from "@/components/home/AboutPreview";
import { AchievementsPreview } from "@/components/home/AchievementsPreview";
import { CampaignBanner } from "@/components/home/CampaignBanner";
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
  const proximosEventos = await eventosAlCompilar(eventos);

  return (
    <>
      <Hero />
      <Marquesina />
      <AboutPreview />
      <ProgramsGrid />
      <PerformancesPreview />
      <ProximasFechas eventos={proximosEventos} hoyCompilacion={hoy} />
      <AchievementsPreview />
      <CampaignBanner anuncios={anuncios} hoyCompilacion={hoy} />
      <HowToHelp />
    </>
  );
}
