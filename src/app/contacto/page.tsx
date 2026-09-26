import type { Metadata } from "next";
import { metadatos } from "@/lib/metadatos";
import { Suspense } from "react";
import { paginas } from "@/data/paginas";
import { mensajesWhatsApp, site } from "@/data/site";
import { enlaceWhatsApp } from "@/lib/whatsapp";
import {
  ContactForm,
  ContactFormCargando,
} from "@/components/forms/ContactForm";
import { BotonEnlace } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Revelar } from "@/components/ui/Revelar";
import { Icon } from "@/components/ui/Icon";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { PageHeader } from "@/components/ui/PageHeader";

const t = paginas.contacto;

export const metadata: Metadata = metadatos(
  t.titulo,
  "Escríbele a la Fundación Armonía Diversa: inscripciones, aportes, voluntariado, presentaciones y alianzas. Escríbenos por WhatsApp.",
  "/contacto/",
);

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        titulo={t.titulo}
        etiqueta={t.etiqueta}
        intro={t.intro}
        acciones={
          <BotonEnlace
            href={enlaceWhatsApp(mensajesWhatsApp.general)}
            variante="whatsapp"
            icono="whatsapp"
          >
            {t.whatsapp}
          </BotonEnlace>
        }
      />
      {/* Dirección, teléfono y correo están en el pie de todas las páginas. */}
      <div className="relative -mt-14 rounded-t-capa bg-blanco pt-16 pb-28 md:pt-20 md:pb-32">
        <Container className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <section
            aria-labelledby="formulario-titulo"
            className="rounded-foto bg-cana p-6 sm:p-10 lg:self-start"
          >
            <h2 id="formulario-titulo" className="text-5xl">
              {t.formulario}
            </h2>
            <div className="mt-6">
              <Suspense fallback={<ContactFormCargando />}>
                <ContactForm />
              </Suspense>
            </div>
          </section>

          <Revelar>
            <section aria-labelledby="visita-titulo">
              <h2 id="visita-titulo" className="text-5xl">
                {t.visita}
              </h2>
              <p className="mt-6 flex gap-3">
                <Icon nombre="reloj" className="mt-1 shrink-0 text-rojo" />
                <span>
                  <strong className="block">{t.horario}</strong>
                  {/* TODO(contenido): horario de atención en site.ts */}
                  {site.horarioAtencion ?? t.horarioPendiente}
                </span>
              </p>
              <address className="mt-4 flex gap-3 not-italic">
                <Icon nombre="ubicacion" className="mt-1 shrink-0 text-rojo" />
                <span>
                  {site.direccion.calle}, {site.direccion.localidad},{" "}
                  {site.direccion.ciudad}
                </span>
              </address>
              <MapEmbed className="mt-6" />
            </section>
          </Revelar>
        </Container>
      </div>
    </>
  );
}
