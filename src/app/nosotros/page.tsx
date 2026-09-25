import type { Metadata } from "next";
import { metadatos } from "@/lib/metadatos";
import Image from "next/image";
import { equipo } from "@/data/equipo";
import { paginas } from "@/data/paginas";
import { site } from "@/data/site";
import { EtiquetaTemporal } from "@/components/home/AboutPreview";
import { BotonEnlace } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { PatternBand } from "@/components/ui/PatternBand";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { EncabezadoSeccion, Section } from "@/components/ui/Section";

const t = paginas.nosotros;

export const metadata: Metadata = metadatos(
  t.titulo,
  "Historia, misión, visión, objetivos y equipo de la Fundación Armonía Diversa, en Suba, Bogotá.",
  "/nosotros/",
);

export default function NosotrosPage() {
  return (
    <>
      <PageHeader titulo={t.titulo} intro={t.intro} />

      <Section tituloId="historia-titulo" id="historia">
        <div className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <div>
            <EncabezadoSeccion id="historia-titulo" titulo={t.historia} />
            <div className="mt-6 medida space-y-5 text-xl">
              {site.historia.map((parrafo) => (
                <p key={parrafo.slice(0, 30)}>{parrafo}</p>
              ))}
            </div>
          </div>
          <PhotoPlaceholder
            descripcion="el grupo posando con el pendón de la fundación"
            proporcion="16/9"
            className="rounded-xl lg:mt-16 lg:aspect-3/4"
          />
        </div>
      </Section>

      <Section tituloId="mision-titulo" id="mision" fondo="niebla">
        <EncabezadoSeccion id="mision-titulo" titulo={t.misionVision} />
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border-t-8 border-rojo bg-blanco p-8">
            <h3 className="text-2xl">
              Misión
              <EtiquetaTemporal />
            </h3>
            <p className="mt-4 text-lg">{site.mision}</p>
          </div>
          <div className="rounded-xl border-t-8 border-azul bg-blanco p-8">
            <h3 className="text-2xl">
              Visión
              <EtiquetaTemporal />
            </h3>
            <p className="mt-4 text-lg">{site.vision}</p>
          </div>
        </div>
      </Section>

      <Section tituloId="objetivos-titulo" id="objetivos">
        <EncabezadoSeccion
          id="objetivos-titulo"
          titulo={t.objetivos}
          intro={t.objetivosIntro}
        />
        <ul className="mt-8 max-w-4xl space-y-5">
          {site.objetivos.map((objetivo) => (
            <li key={objetivo.slice(0, 30)} className="flex gap-4 text-lg">
              <Icon
                nombre="verificado"
                className="mt-1 shrink-0 text-verde"
                strokeWidth={3}
              />
              <span>{objetivo}</span>
            </li>
          ))}
        </ul>
      </Section>

      <PatternBand />

      <Section tituloId="equipo-titulo" id="equipo" fondo="cana">
        <EncabezadoSeccion id="equipo-titulo" titulo={t.equipo} />
        <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {equipo.map((persona) => (
            <li key={persona.nombre}>
              {persona.foto ? (
                <Image
                  src={persona.foto.src}
                  alt={persona.foto.alt}
                  width={persona.foto.ancho}
                  height={persona.foto.alto}
                  className="aspect-square w-full rounded-xl object-cover"
                />
              ) : (
                <PhotoPlaceholder
                  descripcion={persona.nombre}
                  proporcion="1/1"
                  className="rounded-xl bg-blanco"
                />
              )}
              <h3 className="mt-4 text-2xl">{persona.nombre}</h3>
              <p className="text-lg text-gris">{persona.cargo}</p>
              {persona.descripcion ? (
                <p className="mt-2">{persona.descripcion}</p>
              ) : null}
            </li>
          ))}
        </ul>
        {/* TODO(contenido): quitar este aviso cuando estén los docentes en equipo.ts. */}
        {equipo.length < 2 ? (
          <p className="mt-8 medida text-lg">{t.equipoPendiente}</p>
        ) : null}
      </Section>

      <Section tituloId="transparencia-titulo" id="transparencia">
        <EncabezadoSeccion
          id="transparencia-titulo"
          titulo={t.transparencia}
          intro={t.transparenciaIntro}
        />
        <dl className="mt-8 grid max-w-3xl gap-6 sm:grid-cols-[auto_1fr] sm:gap-x-10">
          <dt className="font-bold">Razón social</dt>
          <dd>{site.nombre}</dd>
          <dt className="font-bold">NIT</dt>
          {/* TODO(contenido): NIT en site.ts */}
          <dd>{site.nit ?? t.nitPendiente}</dd>
          <dt className="font-bold">Director</dt>
          <dd>{site.director}</dd>
          <dt className="font-bold">Dirección</dt>
          <dd>
            {site.direccion.calle}, {site.direccion.localidad},{" "}
            {site.direccion.ciudad}
          </dd>
        </dl>
        {site.documentos.length > 0 ? (
          <ul className="mt-8 flex flex-wrap gap-3">
            {site.documentos.map((doc) => (
              <li key={doc.href}>
                <BotonEnlace
                  href={doc.href}
                  variante="secundario"
                  icono="documento"
                  externo
                >
                  {doc.texto}
                </BotonEnlace>
              </li>
            ))}
          </ul>
        ) : (
          // TODO(contenido): certificado de existencia y documentos en site.documentos.
          <p className="mt-8 medida text-lg">{t.documentosPendientes}</p>
        )}
      </Section>
    </>
  );
}
