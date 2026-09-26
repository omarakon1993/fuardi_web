import type { Metadata } from "next";
import Image from "next/image";
import { equipo } from "@/data/equipo";
import { fotos } from "@/data/fotos";
import { paginas } from "@/data/paginas";
import { site } from "@/data/site";
import { cx } from "@/lib/colores";
import { metadatos } from "@/lib/metadatos";
import { EtiquetaTemporal } from "@/components/home/AboutPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { BotonEnlace } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { AccionesPrincipales, PageHeader } from "@/components/ui/PageHeader";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Revelar } from "@/components/ui/Revelar";
import { EncabezadoSeccion, Section } from "@/components/ui/Section";

const t = paginas.nosotros;

export const metadata: Metadata = metadatos(
  t.titulo,
  "Historia, misión, visión, objetivos y equipo de la Fundación Armonía Diversa, en Suba, Bogotá.",
  "/nosotros/",
);

// Un color del rompecabezas por cifra (todos cumplen AA sobre blanco).
const coloresCifra = ["text-rojo", "text-tinta", "text-verde", "text-magenta"];

export default function NosotrosPage() {
  return (
    <>
      <PageHeader
        titulo={t.titulo}
        etiqueta={t.etiqueta}
        intro={t.intro}
        foto={fotos.grupoTambores}
        acciones={<AccionesPrincipales />}
        atajos={[
          { texto: t.historia, href: "#historia" },
          { texto: t.misionVision, href: "#mision" },
          { texto: t.objetivos, href: "#objetivos" },
          { texto: t.equipo, href: "#equipo" },
        ]}
      />

      <Section tituloId="historia-titulo" id="historia" capa>
        <h2 className="sr-only" id="cifras-titulo">
          {t.cifras}
        </h2>
        <dl
          aria-labelledby="cifras-titulo"
          className="grid grid-cols-2 gap-x-6 gap-y-8 border-b-2 border-cana pb-12 lg:grid-cols-4"
        >
          {site.cifras.map((cifra, i) => (
            <div key={cifra.texto} className="flex flex-col">
              <dt className="order-2 mt-2 max-w-[22ch] text-base text-gris">
                {cifra.texto}
              </dt>
              <dd
                className={cx(
                  "order-1 condensada text-6xl leading-none font-extrabold",
                  coloresCifra[i % coloresCifra.length],
                )}
              >
                {cifra.valor}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <EncabezadoSeccion
              id="historia-titulo"
              antetitulo={t.historia}
              titulo={t.historiaTitulo}
            />
            <div className="mt-8 medida space-y-5 text-lg">
              {site.historia.map((parrafo) => (
                <p key={parrafo.slice(0, 30)}>{parrafo}</p>
              ))}
            </div>
          </div>
          {site.historiaFoto ? (
            <Revelar className="lg:sticky lg:top-28 lg:self-start">
              <Image
                src={site.historiaFoto.src}
                alt={site.historiaFoto.alt}
                width={site.historiaFoto.ancho}
                height={site.historiaFoto.alto}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-4/5 w-full rounded-[2rem_2rem_2rem_10rem] object-cover"
              />
            </Revelar>
          ) : (
            <PhotoPlaceholder
              descripcion="el grupo posando con el pendón de la fundación"
              proporcion="3/4"
              className="rounded-foto"
            />
          )}
        </div>
      </Section>

      <Section tituloId="mision-titulo" id="mision" fondo="tinta" capa>
        <EncabezadoSeccion
          id="mision-titulo"
          antetitulo={t.misionVision}
          titulo={t.misionVisionTitulo}
          claro
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Revelar className="rounded-foto bg-rojo p-8 sm:p-10">
            <h3 className="text-4xl">
              {t.mision}
              <EtiquetaTemporal />
            </h3>
            <p className="mt-5 text-lg">{site.mision}</p>
          </Revelar>
          <Revelar className="rounded-foto bg-blanco/10 p-8 sm:p-10">
            <h3 className="text-4xl">
              {t.vision}
              <EtiquetaTemporal />
            </h3>
            <p className="mt-5 text-lg">{site.vision}</p>
          </Revelar>
        </div>
      </Section>

      <Section tituloId="objetivos-titulo" id="objetivos" fondo="cana" capa>
        <EncabezadoSeccion
          id="objetivos-titulo"
          antetitulo={t.objetivos}
          titulo={t.objetivosTitulo}
        />
        <ul className="mt-12 grid gap-x-12 gap-y-6 md:grid-cols-2">
          {site.objetivos.map((objetivo) => (
            <Revelar
              as="li"
              key={objetivo.slice(0, 30)}
              className="flex gap-4 rounded-panel bg-blanco p-5"
            >
              <span
                aria-hidden="true"
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-verde text-blanco"
              >
                <Icon nombre="verificado" tamano={20} strokeWidth={3} />
              </span>
              <span>{objetivo}</span>
            </Revelar>
          ))}
        </ul>
      </Section>

      <Testimonials />

      <Section tituloId="equipo-titulo" id="equipo" capa>
        <EncabezadoSeccion
          id="equipo-titulo"
          antetitulo={t.equipo}
          titulo={t.equipoTitulo}
        />
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <ul className="grid gap-6 sm:grid-cols-2">
              {equipo.map((persona) => (
                <li key={persona.nombre}>
                  {persona.foto ? (
                    <Image
                      src={persona.foto.src}
                      alt={persona.foto.alt}
                      width={persona.foto.ancho}
                      height={persona.foto.alto}
                      className="aspect-square w-full rounded-t-full rounded-b-foto object-cover"
                    />
                  ) : (
                    <PhotoPlaceholder
                      descripcion={persona.nombre}
                      proporcion="1/1"
                      className="rounded-t-full rounded-b-foto"
                    />
                  )}
                  <h3 className="mt-4 text-2xl">{persona.nombre}</h3>
                  <p className="text-gris">{persona.cargo}</p>
                  {persona.descripcion ? (
                    <p className="mt-2">{persona.descripcion}</p>
                  ) : null}
                </li>
              ))}
            </ul>
            {/* TODO(contenido): quitar este aviso cuando estén los docentes en equipo.ts. */}
            {equipo.length < 2 ? (
              <p className="mt-6 medida">{t.equipoPendiente}</p>
            ) : null}
          </div>

          <div id="transparencia" className="rounded-foto bg-cana p-8 sm:p-10">
            <h3 className="text-3xl">{t.transparencia}</h3>
            <p className="mt-3 text-gris">{t.transparenciaIntro}</p>
            <dl className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-[auto_1fr]">
              <dt className="font-bold">Razón social</dt>
              <dd>{site.nombre}</dd>
              <dt className="font-bold">NIT</dt>
              {/* TODO(contenido): NIT en site.ts */}
              <dd>{site.nit ?? t.nitPendiente}</dd>
              <dt className="font-bold">Director</dt>
              <dd>{site.director}</dd>
            </dl>
            {site.documentos.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-3">
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
              <p className="mt-6 text-base">{t.documentosPendientes}</p>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
