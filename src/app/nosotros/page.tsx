import type { Metadata } from "next";
import { metadatos } from "@/lib/metadatos";
import Image from "next/image";
import { equipo } from "@/data/equipo";
import { fotos } from "@/data/fotos";
import { paginas } from "@/data/paginas";
import { site } from "@/data/site";
import { EtiquetaTemporal } from "@/components/home/AboutPreview";
import { AccionesPrincipales, Sumate } from "@/components/layout/Sumate";
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
      <PageHeader
        titulo={t.titulo}
        intro={t.intro}
        foto={fotos.grupoTambores}
        acciones={<AccionesPrincipales />}
        atajos={[
          { texto: t.historia, href: "#historia" },
          { texto: t.misionVision, href: "#mision" },
          { texto: t.objetivos, href: "#objetivos" },
          { texto: t.equipo, href: "#equipo" },
          { texto: t.transparencia, href: "#transparencia" },
        ]}
      />

      <Section tituloId="historia-titulo" id="historia">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <div>
            <EncabezadoSeccion id="historia-titulo" titulo={t.historia} />
            <div className="mt-8 medida space-y-5 text-xl">
              {site.historia.map((parrafo) => (
                <p key={parrafo.slice(0, 30)}>{parrafo}</p>
              ))}
            </div>
          </div>
          {site.historiaFoto ? (
            <Image
              src={site.historiaFoto.src}
              alt={site.historiaFoto.alt}
              width={site.historiaFoto.ancho}
              height={site.historiaFoto.alto}
              className="aspect-16/9 w-full rounded-foto object-cover lg:sticky lg:top-8 lg:mt-24 lg:aspect-4/5 lg:self-start"
            />
          ) : (
            <PhotoPlaceholder
              descripcion="el grupo posando con el pendón de la fundación"
              proporcion="16/9"
              className="rounded-foto lg:mt-24 lg:aspect-3/4"
            />
          )}
        </div>
      </Section>

      <Section tituloId="mision-titulo" id="mision" fondo="niebla">
        <EncabezadoSeccion id="mision-titulo" titulo={t.misionVision} />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="rounded-foto bg-rojo p-8 text-blanco sm:p-12">
            <h3 className="text-4xl sm:text-5xl">
              Misión
              <EtiquetaTemporal />
            </h3>
            <p className="mt-6 text-xl">{site.mision}</p>
          </div>
          <div className="rounded-foto bg-tinta p-8 text-blanco sm:p-12">
            <h3 className="text-4xl sm:text-5xl">
              Visión
              <EtiquetaTemporal />
            </h3>
            <p className="mt-6 text-xl">{site.vision}</p>
          </div>
        </div>
      </Section>

      <Section tituloId="objetivos-titulo" id="objetivos">
        <EncabezadoSeccion
          id="objetivos-titulo"
          titulo={t.objetivos}
          intro={t.objetivosIntro}
        />
        <ul className="mt-12 grid gap-x-14 gap-y-8 md:grid-cols-2">
          {site.objetivos.map((objetivo) => (
            <li
              key={objetivo.slice(0, 30)}
              className="flex gap-4 border-t-2 border-niebla pt-6 text-lg"
            >
              <span
                aria-hidden="true"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-verde text-blanco"
              >
                <Icon nombre="verificado" tamano={22} strokeWidth={3} />
              </span>
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
                  className="aspect-square w-full rounded-foto object-cover"
                />
              ) : (
                <PhotoPlaceholder
                  descripcion={persona.nombre}
                  proporcion="1/1"
                  className="rounded-foto bg-blanco"
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
        <dl className="mt-10 grid max-w-3xl gap-x-10 gap-y-4 rounded-panel bg-niebla p-8 sm:grid-cols-[auto_1fr]">
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

      <Sumate />
    </>
  );
}
