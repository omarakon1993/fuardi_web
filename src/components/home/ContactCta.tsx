import { inicio } from "@/data/inicio";
import { site } from "@/data/site";
import { BotonEnlace } from "@/components/ui/Button";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { EncabezadoSeccion, Section } from "@/components/ui/Section";

export function ContactCta() {
  return (
    <Section tituloId="contacto-titulo" fondo="niebla">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <EncabezadoSeccion
            id="contacto-titulo"
            titulo={inicio.contacto.titulo}
            intro={inicio.contacto.texto}
          />
          <address className="mt-6 text-xl not-italic">
            {site.direccion.calle}
            <br />
            {site.direccion.localidad}, {site.direccion.ciudad}
          </address>
          <BotonEnlace href="/contacto/" className="mt-8">
            {inicio.contacto.boton}
          </BotonEnlace>
        </div>
        <MapEmbed textoEnlace={inicio.contacto.mapa} />
      </div>
    </Section>
  );
}
