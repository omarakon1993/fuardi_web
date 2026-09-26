import Image from "next/image";
import { fotos } from "@/data/fotos";
import { inicio } from "@/data/inicio";
import { site } from "@/data/site";
import { BotonEnlace } from "@/components/ui/Button";
import { EncabezadoSeccion, Section } from "@/components/ui/Section";

/** Etiqueta visible solo en desarrollo para recordar que el texto no es final. */
export function EtiquetaTemporal() {
  if (process.env.NODE_ENV !== "development" || !site.misionVisionTemporales)
    return null;
  return (
    <span className="ml-2 inline-block rounded bg-amarillo px-2 py-0.5 align-middle font-sans text-sm font-bold text-tinta">
      Temporal
    </span>
  );
}

export function AboutPreview() {
  return (
    <Section tituloId="nosotros-titulo" fondo="niebla">
      <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          <Image
            src={fotos.playland.src}
            alt={fotos.playland.alt}
            width={fotos.playland.ancho}
            height={fotos.playland.alto}
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="aspect-3/4 w-full rounded-foto object-cover"
          />
          <Image
            src={fotos.bolos.src}
            alt={fotos.bolos.alt}
            width={fotos.bolos.ancho}
            height={fotos.bolos.alto}
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="mt-14 aspect-3/4 w-full rounded-foto object-cover sm:mt-20"
          />
        </div>
        <div>
          <EncabezadoSeccion
            id="nosotros-titulo"
            titulo={inicio.nosotros.titulo}
          />
          <p className="mt-6 medida text-entrada">{site.resenaCorta}</p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div className="border-t-4 border-rojo pt-4">
              <h3 className="text-2xl">
                Misión
                <EtiquetaTemporal />
              </h3>
              <p className="mt-2 text-lg">{site.mision}</p>
            </div>
            <div className="border-t-4 border-azul pt-4">
              <h3 className="text-2xl">
                Visión
                <EtiquetaTemporal />
              </h3>
              <p className="mt-2 text-lg">{site.vision}</p>
            </div>
          </div>
          <BotonEnlace
            href="/nosotros/"
            variante="secundario"
            className="mt-10"
          >
            {inicio.nosotros.enlace}
          </BotonEnlace>
        </div>
      </div>
    </Section>
  );
}
