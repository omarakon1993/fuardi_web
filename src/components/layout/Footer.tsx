import Image from "next/image";
import Link from "next/link";
import { enlacesLegales } from "@/data/navegacion";
import { pie } from "@/data/pie";
import { mensajesWhatsApp, site } from "@/data/site";
import { cx } from "@/lib/colores";
import { enlaceCorreo, enlaceWhatsApp } from "@/lib/whatsapp";
import { BotonEnlace } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Revelar } from "@/components/ui/Revelar";
import { OcultarEnRuta } from "./OcultarEnRuta";
import { RedesSociales } from "./RedesSociales";

const enlaceClaro =
  "inline-flex min-h-11 items-center text-blanco underline decoration-blanco/40 underline-offset-4 hover:text-cana hover:decoration-cana";

/** Cierre de todas las páginas: cómo llegar y cómo escribirnos. */
export function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className="relative -mt-14 rounded-t-capa bg-tinta text-blanco">
      {/* En Contacto la página ya tiene estos datos: solo queda la línea final. */}
      <OcultarEnRuta ruta="/contacto/" alternativa={<div className="h-8" />}>
        <div className="border-b border-blanco/15">
          <Container className="grid gap-12 pt-20 pb-14 md:pt-24 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <Revelar>
              <h2 id="pie-titulo" className="text-titular">
                {pie.titulo}
              </h2>
              <p className="mt-6 medida text-entrada text-blanco/90">
                {pie.texto}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <BotonEnlace
                  href={enlaceWhatsApp(mensajesWhatsApp.general)}
                  variante="whatsapp"
                  icono="whatsapp"
                >
                  {pie.whatsapp}
                </BotonEnlace>
                <BotonEnlace
                  href={site.mapa.url}
                  variante="claro"
                  icono="ubicacion"
                >
                  {pie.mapa}
                </BotonEnlace>
              </div>
            </Revelar>

            <dl className="grid content-start gap-x-10 gap-y-8 sm:grid-cols-2 lg:pt-6">
              <div>
                <dt className="antetitulo text-blanco/70">{pie.direccion}</dt>
                <dd className="mt-2">
                  <address className="not-italic">
                    {site.direccion.calle}
                    <br />
                    {site.direccion.localidad}, {site.direccion.ciudad}
                  </address>
                </dd>
              </div>
              <div>
                <dt className="antetitulo text-blanco/70">{pie.correo}</dt>
                <dd className="mt-1">
                  <a
                    href={enlaceCorreo()}
                    className={cx(enlaceClaro, "break-all")}
                  >
                    {site.correo}
                  </a>
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="antetitulo text-blanco/70">{pie.redes}</dt>
                <dd className="mt-3">
                  <RedesSociales claro conCanal />
                </dd>
              </div>
            </dl>
          </Container>
        </div>
      </OcultarEnRuta>

      <div>
        <Container className="grid gap-6 pt-8 pb-24 text-base text-blanco/85 lg:grid-cols-[1fr_auto] lg:items-center lg:pr-56 lg:pb-8">
          <div className="flex items-center gap-4">
            <span className="flex shrink-0 rounded-2xl bg-blanco p-1.5">
              <Image
                src="/images/logo/fuardi-logo.png"
                alt=""
                width={247}
                height={233}
                className="h-14 w-auto"
              />
            </span>
            <p>
              <span className="block font-display text-lg leading-tight font-extrabold text-blanco font-stretch-90%">
                {site.nombre}
              </span>
              © {anio}
              {site.nit ? ` · ${pie.sinAnimo} · NIT ${site.nit}` : null}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <ul className="flex flex-wrap gap-4">
              {enlacesLegales.map((enlace) => (
                <li key={enlace.href}>
                  <Link href={enlace.href} className={enlaceClaro}>
                    {enlace.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </footer>
  );
}
