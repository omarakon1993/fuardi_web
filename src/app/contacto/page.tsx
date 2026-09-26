import type { Metadata } from "next";
import { metadatos } from "@/lib/metadatos";
import { Suspense } from "react";
import { paginas } from "@/data/paginas";
import { mensajesWhatsApp, site } from "@/data/site";
import { enlaceCorreo, enlaceTelefono, enlaceWhatsApp } from "@/lib/whatsapp";
import {
  ContactForm,
  ContactFormCargando,
} from "@/components/forms/ContactForm";
import { BotonEnlace } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon, type NombreIcono } from "@/components/ui/Icon";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { PageHeader } from "@/components/ui/PageHeader";

const t = paginas.contacto;

export const metadata: Metadata = metadatos(
  t.titulo,
  "Escríbele a la Fundación Armonía Diversa: inscripciones, aportes, voluntariado, presentaciones y alianzas. WhatsApp 320 829 8137.",
  "/contacto/",
);

function Dato({
  icono,
  titulo,
  children,
}: {
  icono: NombreIcono;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span
        aria-hidden="true"
        className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-azul text-blanco"
      >
        <Icon nombre={icono} tamano={22} />
      </span>
      <div>
        <h3 className="text-lg">{titulo}</h3>
        <div className="mt-0.5">{children}</div>
      </div>
    </li>
  );
}

const enlace =
  "inline-flex min-h-11 items-center font-bold text-azul underline decoration-2 underline-offset-4 break-all";

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        titulo={t.titulo}
        intro={t.intro}
        acciones={
          <BotonEnlace
            href={enlaceWhatsApp(mensajesWhatsApp.general)}
            variante="blanco"
            icono="whatsapp"
          >
            {t.whatsapp}
          </BotonEnlace>
        }
      />
      <Container className="grid gap-12 py-16 md:py-24 lg:grid-cols-[3fr_2fr] lg:gap-16">
        <section
          aria-labelledby="formulario-titulo"
          className="rounded-foto bg-niebla p-6 sm:p-10 lg:self-start"
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

        <section aria-labelledby="datos-titulo">
          <h2 id="datos-titulo" className="text-5xl">
            {t.datos}
          </h2>
          <ul className="mt-8 space-y-6">
            <Dato icono="whatsapp" titulo="WhatsApp">
              <a
                href={enlaceWhatsApp(mensajesWhatsApp.general)}
                target="_blank"
                rel="noopener noreferrer"
                className={enlace}
              >
                {site.telefono}
                <span className="sr-only"> (se abre en una pestaña nueva)</span>
              </a>
            </Dato>
            <Dato icono="telefono" titulo="Teléfono">
              <a href={enlaceTelefono()} className={enlace}>
                {site.telefono}
              </a>
            </Dato>
            <Dato icono="correo" titulo="Correo">
              <a href={enlaceCorreo()} className={enlace}>
                {site.correo}
              </a>
            </Dato>
            <Dato icono="ubicacion" titulo="Dirección">
              <address className="not-italic">
                {site.direccion.calle}
                <br />
                {site.direccion.localidad}, {site.direccion.ciudad}
              </address>
            </Dato>
            <Dato icono="reloj" titulo={t.horario}>
              {/* TODO(contenido): horario de atención en site.ts */}
              <p>{site.horarioAtencion ?? t.horarioPendiente}</p>
            </Dato>
          </ul>
          <MapEmbed className="mt-8" />
        </section>
      </Container>
    </>
  );
}
