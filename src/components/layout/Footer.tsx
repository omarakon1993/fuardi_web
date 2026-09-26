import Image from "next/image";
import Link from "next/link";
import { enlacesLegales, enlacesPie } from "@/data/navegacion";
import { mensajesWhatsApp, site } from "@/data/site";
import { enlaceCorreo, enlaceTelefono, enlaceWhatsApp } from "@/lib/whatsapp";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PatternBand } from "@/components/ui/PatternBand";
import { RedesSociales } from "./RedesSociales";

const enlaceClaro =
  "inline-flex min-h-11 items-center gap-3 text-blanco underline-offset-4 hover:underline";

export function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className="bg-tinta text-blanco">
      <PatternBand tono="tinta" />
      <Container className="pt-16 md:pt-20">
        <p className="condensada text-titular font-extrabold text-cana">
          «{site.lema}»
        </p>
      </Container>
      <Container className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-4">
            <span className="rounded-panel bg-blanco p-2">
              <Image
                src="/images/logo/fuardi-logo.png"
                alt=""
                width={247}
                height={233}
                className="h-16 w-auto"
              />
            </span>
            <p className="font-display text-2xl leading-tight font-extrabold">
              {site.nombre}
            </p>
          </div>
          <p className="mt-3 medida text-blanco/90">
            Fundación sin ánimo de lucro de Suba, Bogotá.
            {site.nit ? ` NIT ${site.nit}.` : null}
          </p>
          <RedesSociales claro className="mt-6" />
        </div>

        <div>
          <h2 className="text-xl [font-stretch:100%]">Contacto</h2>
          <ul className="mt-4 space-y-1">
            <li>
              <a
                href={enlaceWhatsApp(mensajesWhatsApp.general)}
                className={enlaceClaro}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon nombre="whatsapp" />
                <span>
                  WhatsApp {site.telefono}
                  <span className="sr-only">
                    {" "}
                    (se abre en una pestaña nueva)
                  </span>
                </span>
              </a>
            </li>
            {site.canalWhatsApp ? (
              <li>
                <a
                  href={site.canalWhatsApp}
                  className={enlaceClaro}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon nombre="whatsapp" />
                  <span>
                    Canal de WhatsApp
                    <span className="sr-only">
                      {" "}
                      (se abre en una pestaña nueva)
                    </span>
                  </span>
                </a>
              </li>
            ) : null}
            <li>
              <a href={enlaceTelefono()} className={enlaceClaro}>
                <Icon nombre="telefono" />
                <span>Llamar al {site.telefono}</span>
              </a>
            </li>
            <li>
              <a href={enlaceCorreo()} className={enlaceClaro}>
                <Icon nombre="correo" />
                <span>{site.correo}</span>
              </a>
            </li>
            <li>
              <a
                href={site.mapa.url}
                className={enlaceClaro}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon nombre="ubicacion" className="shrink-0" />
                <span>
                  {site.direccion.calle}, {site.direccion.localidad},{" "}
                  {site.direccion.ciudad}
                  <span className="sr-only">
                    {" "}
                    (ver en el mapa, se abre en una pestaña nueva)
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Pie de página">
          <h2 className="text-xl [font-stretch:100%]">El sitio</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 md:grid-cols-1 lg:grid-cols-2">
            {enlacesPie.map((enlace) => (
              <li key={enlace.href}>
                <Link href={enlace.href} className={enlaceClaro}>
                  {enlace.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <div className="border-t border-blanco/20">
        <Container className="flex flex-col gap-2 pt-6 pb-24 text-base text-blanco/90 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {anio} {site.nombre}
          </p>
          <ul className="flex flex-wrap gap-4">
            {enlacesLegales.map((enlace) => (
              <li key={enlace.href}>
                <Link href={enlace.href} className={enlaceClaro}>
                  {enlace.texto}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
