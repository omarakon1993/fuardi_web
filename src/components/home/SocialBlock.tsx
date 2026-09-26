import { inicio } from "@/data/inicio";
import { mensajesWhatsApp, site } from "@/data/site";
import { enlaceWhatsApp } from "@/lib/whatsapp";
import { RedesSociales } from "@/components/layout/RedesSociales";
import { BotonEnlace } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { EncabezadoSeccion, Section } from "@/components/ui/Section";

export function SocialBlock() {
  const { redes } = inicio;

  return (
    <Section tituloId="redes-titulo">
      <div className="grid items-stretch gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
        <div>
          <EncabezadoSeccion
            id="redes-titulo"
            titulo={redes.titulo}
            intro={redes.intro}
          />
          <RedesSociales tamano="grande" className="mt-10" />
        </div>

        <div className="flex flex-col justify-end rounded-foto bg-verde p-8 text-blanco sm:p-12">
          <Icon nombre="whatsapp" tamano={48} />
          <h3 className="mt-6 text-4xl sm:text-5xl">{redes.canalTitulo}</h3>
          <p className="mt-3 text-xl">
            {site.canalWhatsApp ? redes.canalTexto : redes.canalPendiente}
          </p>
          <BotonEnlace
            href={
              site.canalWhatsApp ?? enlaceWhatsApp(mensajesWhatsApp.general)
            }
            variante="blanco"
            className="mt-8 self-start"
          >
            {site.canalWhatsApp ? redes.canalBoton : redes.chatBoton}
          </BotonEnlace>
        </div>
      </div>
    </Section>
  );
}
