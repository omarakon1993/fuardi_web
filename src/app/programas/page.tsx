import type { Metadata } from "next";
import { metadatos } from "@/lib/metadatos";
import Image from "next/image";
import { preguntasFrecuentes } from "@/data/faq";
import { fotos } from "@/data/fotos";
import { paginas } from "@/data/paginas";
import { programas } from "@/data/programas";
import { clasesColor, cx } from "@/lib/colores";
import { BotonEnlace } from "@/components/ui/Button";
import { AccionesPrincipales, Sumate } from "@/components/layout/Sumate";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { EncabezadoSeccion, Section } from "@/components/ui/Section";

const t = paginas.programas;

export const metadata: Metadata = metadatos(
  t.titulo,
  "Formación académica, música tradicional de gaitas y tambores, danza folclórica, canto y emprendimientos para personas con discapacidad en Suba, Bogotá.",
  "/programas/",
);

export default function ProgramasPage() {
  return (
    <>
      <PageHeader
        titulo={t.titulo}
        intro={t.intro}
        foto={fotos.danza}
        acciones={<AccionesPrincipales />}
        atajos={[
          ...programas.map((p) => ({ texto: p.nombre, href: `#${p.slug}` })),
          { texto: t.faqCorto, href: "#preguntas" },
        ]}
      />

      {programas.map((programa, i) => {
        const color = clasesColor[programa.color];
        const tituloId = `${programa.slug}-titulo`;
        return (
          <section
            key={programa.slug}
            id={programa.slug}
            aria-labelledby={tituloId}
            className={cx(
              "scroll-mt-4 py-20 md:py-28",
              i % 2 === 0 ? "bg-niebla" : "bg-blanco",
            )}
          >
            <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div
                className={cx(
                  "overflow-hidden rounded-foto border-b-8",
                  color.borde,
                  i % 2 === 1 && "lg:order-2",
                )}
              >
                {programa.foto ? (
                  <Image
                    src={programa.foto.src}
                    alt={programa.foto.alt}
                    width={programa.foto.ancho}
                    height={programa.foto.alto}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="aspect-4/3 w-full object-cover"
                  />
                ) : (
                  <PhotoPlaceholder
                    descripcion={`clase de ${programa.nombre.toLowerCase()}`}
                    proporcion="16/9"
                    className="border-t-0 lg:aspect-4/3"
                  />
                )}
              </div>
              <div>
                <span
                  aria-hidden="true"
                  className={cx("block h-2 w-16 rounded-full", color.fondo)}
                />
                <h2 id={tituloId} className="mt-6 text-seccion">
                  {programa.nombre}
                </h2>
                <div className="mt-5 medida space-y-4 text-xl">
                  {programa.descripcion.map((parrafo) => (
                    <p key={parrafo.slice(0, 30)}>{parrafo}</p>
                  ))}
                </div>
                <dl className="mt-8 grid gap-5 rounded-panel bg-blanco p-6 ring-1 ring-tinta/10 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <dt className="font-bold">{t.dirigidoA}</dt>
                    <dd className="mt-1">
                      {programa.dirigidoA ?? t.porConfirmar}
                    </dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-2 font-bold">
                      <Icon nombre="reloj" tamano={20} />
                      {t.horarios}
                    </dt>
                    {/* TODO(contenido): horarios del programa en programas.ts */}
                    <dd className="mt-1">
                      {programa.horarios ?? t.porConfirmar}
                    </dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-2 font-bold">
                      <Icon nombre="personas" tamano={20} />
                      {t.edades}
                    </dt>
                    {/* TODO(contenido): edades del programa en programas.ts */}
                    <dd className="mt-1">
                      {programa.edades ?? t.porConfirmar}
                    </dd>
                  </div>
                </dl>
                <BotonEnlace
                  href={`/contacto/?motivo=inscripcion&programa=${programa.slug}`}
                  className="mt-8"
                >
                  {t.inscribirme}
                  <span className="sr-only">: {programa.nombre}</span>
                </BotonEnlace>
              </div>
            </Container>
          </section>
        );
      })}

      <Section tituloId="faq-titulo" id="preguntas" fondo="cana">
        <EncabezadoSeccion id="faq-titulo" titulo={t.faq} />
        <div className="mt-10 max-w-3xl space-y-3">
          {preguntasFrecuentes.map((item) => (
            <details
              key={item.pregunta}
              className="group rounded-panel border-2 border-tinta/10 bg-blanco open:border-azul"
            >
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 text-xl font-bold [&::-webkit-details-marker]:hidden">
                {item.pregunta}
                <Icon
                  nombre="abajo"
                  className="shrink-0 transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="medida px-5 pb-5 text-lg">{item.respuesta}</p>
            </details>
          ))}
        </div>
      </Section>

      <Sumate />
    </>
  );
}
