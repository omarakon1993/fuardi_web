import { anuncios } from "@/data/anuncios";
import { eventos } from "@/data/eventos";
import { hoyBogota } from "@/lib/fechas";
import { AboutPreview } from "@/components/home/AboutPreview";
import { AchievementsPreview } from "@/components/home/AchievementsPreview";
import { CampaignBanner } from "@/components/home/CampaignBanner";
import { ContactCta } from "@/components/home/ContactCta";
import { Hero } from "@/components/home/Hero";
import { HowToHelp } from "@/components/home/HowToHelp";
import { ImpactStats } from "@/components/home/ImpactStats";
import { PerformancesPreview } from "@/components/home/PerformancesPreview";
import { ProgramsGrid } from "@/components/home/ProgramsGrid";
import { ShopPreview } from "@/components/home/ShopPreview";
import { SocialBlock } from "@/components/home/SocialBlock";
import { Testimonials } from "@/components/home/Testimonials";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { PatternBand } from "@/components/ui/PatternBand";

export default function InicioPage() {
  const hoy = hoyBogota();

  return (
    <>
      <Hero />
      <PatternBand tono="rojo" />
      <ImpactStats />
      <AboutPreview />
      <ProgramsGrid />
      <CampaignBanner anuncios={anuncios} hoyCompilacion={hoy} />
      <UpcomingEvents eventos={eventos} hoyCompilacion={hoy} />
      <PerformancesPreview />
      <AchievementsPreview />
      <ShopPreview />
      <PatternBand />
      <HowToHelp />
      <Testimonials />
      <SocialBlock />
      <ContactCta />
    </>
  );
}
