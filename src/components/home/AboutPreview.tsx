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
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <EncabezadoSeccion
            id="nosotros-titulo"
            titulo={inicio.nosotros.titulo}
          />
          <p className="mt-5 medida text-xl">{site.resenaCorta}</p>
          <BotonEnlace href="/nosotros/" variante="texto" className="mt-6">
            {inicio.nosotros.enlace}
          </BotonEnlace>
        </div>
        <div className="space-y-8">
          <div className="border-l-8 border-rojo pl-6">
            <h3 className="text-2xl">
              Misión
              <EtiquetaTemporal />
            </h3>
            <p className="mt-3 medida">{site.mision}</p>
          </div>
          <div className="border-l-8 border-azul pl-6">
            <h3 className="text-2xl">
              Visión
              <EtiquetaTemporal />
            </h3>
            <p className="mt-3 medida">{site.vision}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
