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
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <EncabezadoSeccion
            id="redes-titulo"
            titulo={redes.titulo}
            intro={redes.intro}
          />
          <RedesSociales tamano="grande" className="mt-6" />
        </div>

        <div className="rounded-xl bg-verde p-8 text-blanco sm:p-10">
          <Icon nombre="whatsapp" tamano={48} />
          <h3 className="mt-4 text-3xl">{redes.canalTitulo}</h3>
          <p className="mt-3 text-xl">
            {site.canalWhatsApp ? redes.canalTexto : redes.canalPendiente}
          </p>
          <BotonEnlace
            href={
              site.canalWhatsApp ?? enlaceWhatsApp(mensajesWhatsApp.general)
            }
            variante="claro"
            className="mt-6"
          >
            {site.canalWhatsApp ? redes.canalBoton : redes.chatBoton}
          </BotonEnlace>
        </div>
      </div>
    </Section>
  );
}
