import type { Metadata } from "next";
import { metadatos } from "@/lib/metadatos";
import { Suspense } from "react";
import { paginas } from "@/data/paginas";
import { cx } from "@/lib/colores";
import { mensajesWhatsApp, site } from "@/data/site";
import { enlaceCorreo, enlaceWhatsApp } from "@/lib/whatsapp";
import {
  ContactForm,
  ContactFormCargando,
} from "@/components/forms/ContactForm";
import { RedesSociales } from "@/components/layout/RedesSociales";
import { BotonEnlace } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon, type NombreIcono } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";

const t = paginas.contacto;

export const metadata: Metadata = metadatos(
  t.titulo,
  "Escríbele a la Fundación Armonía Diversa: inscripciones, aportes, voluntariado, presentaciones y alianzas. Escríbenos por WhatsApp.",
  "/contacto/",
);

/** Un dato de contacto con su ícono. */
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
    <li className="flex gap-3">
      <Icon nombre={icono} className="mt-0.5 shrink-0 text-rojo" />
      <div>
        <p className="font-bold">{titulo}</p>
        <div className="text-base">{children}</div>
      </div>
    </li>
  );
}

const enlace =
  "font-bold text-tinta underline decoration-2 underline-offset-4 hover:text-rojo";

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        compacto
        titulo={t.titulo}
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
      <div className="relative -mt-14 rounded-t-capa bg-blanco pt-10 pb-24 md:pt-12">
        <Container className="grid gap-8 lg:grid-cols-[1.7fr_1fr] lg:items-start">
          <section
            aria-labelledby="formulario-titulo"
            className="rounded-foto bg-cana p-6 sm:p-8"
          >
            <h2 id="formulario-titulo" className="text-4xl">
              {t.formulario}
            </h2>
            <div className="mt-5">
              <Suspense fallback={<ContactFormCargando />}>
                <ContactForm />
              </Suspense>
            </div>
          </section>

          {/* Todo lo demás en una sola tarjeta: horario, sede, correo y redes. */}
          <aside
            aria-labelledby="visita-titulo"
            className="rounded-foto border-2 border-cana p-6 sm:p-8"
          >
            <h2 id="visita-titulo" className="text-4xl">
              {t.visita}
            </h2>
            <ul className="mt-5 space-y-3">
              <Dato icono="reloj" titulo={t.horario}>
                {/* TODO(contenido): horario de atención en site.ts */}
                {site.horarioAtencion ?? t.horarioPendiente}
              </Dato>
              <Dato icono="ubicacion" titulo={t.direccion}>
                <address className="not-italic">
                  {site.direccion.calle}, {site.direccion.localidad},{" "}
                  {site.direccion.ciudad}
                </address>
                <a
                  href={site.mapa.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cx(
                    enlace,
                    "mt-1 inline-flex min-h-11 items-center",
                  )}
                >
                  {t.mapa}
                  <span className="sr-only">
                    {" "}
                    (se abre en una pestaña nueva)
                  </span>
                </a>
              </Dato>
              <Dato icono="correo" titulo={t.correo}>
                <a href={enlaceCorreo()} className={cx(enlace, "break-all")}>
                  {site.correo}
                </a>
              </Dato>
            </ul>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t-2 border-cana pt-5">
              <h3 className="text-2xl">{t.redes}</h3>
              <RedesSociales conCanal />
            </div>
          </aside>
        </Container>
      </div>
    </>
  );
}
