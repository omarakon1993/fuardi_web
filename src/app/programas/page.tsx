import type { Metadata } from "next";
import Image from "next/image";
import { preguntasFrecuentes } from "@/data/faq";
import { fotos } from "@/data/fotos";
import { paginas } from "@/data/paginas";
import { programas } from "@/data/programas";
import { clasesColor, cx } from "@/lib/colores";
import { metadatos } from "@/lib/metadatos";
import { BotonEnlace } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { AccionesPrincipales, PageHeader } from "@/components/ui/PageHeader";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Revelar } from "@/components/ui/Revelar";
import { EncabezadoSeccion, Section } from "@/components/ui/Section";

const t = paginas.programas;

export const metadata: Metadata = metadatos(
  t.titulo,
  "Formación académica, música tradicional de gaitas y tambores, danza folclórica, canto y emprendimientos para personas con discapacidad en Suba, Bogotá.",
  "/programas/",
);

// Fotos con esquinas distintas, alternando de lado.
const formas = [
  "rounded-[2rem_8rem_2rem_2rem]",
  "rounded-[8rem_2rem_2rem_2rem]",
  "rounded-[2rem_2rem_8rem_2rem]",
  "rounded-[2rem_2rem_2rem_8rem]",
];

/** Dato común a todos los programas: se muestra una sola vez arriba. */
function comun<K extends "dirigidoA" | "horarios" | "edades">(clave: K) {
  const valores = new Set(programas.map((p) => p[clave]));
  return valores.size === 1
    ? { valor: programas[0][clave], igual: true }
    : { igual: false };
}

export default function ProgramasPage() {
  const dirigidoA = comun("dirigidoA");
  const horarios = comun("horarios");
  const edades = comun("edades");

  return (
    <>
      <PageHeader
        titulo={t.titulo}
        etiqueta={t.etiqueta}
        intro={t.intro}
        foto={fotos.danza}
        acciones={<AccionesPrincipales />}
        atajos={[
          ...programas.map((p) => ({ texto: p.nombre, href: `#${p.slug}` })),
          { texto: t.faqCorto, href: "#preguntas" },
        ]}
      />

      <Section tituloId="lista-titulo" capa>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <EncabezadoSeccion
            id="lista-titulo"
            antetitulo={t.lista}
            titulo={t.listaTitulo}
          />
          {/* Lo que vale para todos los programas, dicho una vez. */}
          <Revelar>
            <dl className="grid gap-4 rounded-panel bg-cana p-6">
              {dirigidoA.igual && dirigidoA.valor ? (
                <div>
                  <dt className="flex items-center gap-2 font-bold">
                    <Icon nombre="personas" tamano={20} />
                    {t.dirigidoA}
                  </dt>
                  <dd className="mt-1">{dirigidoA.valor}</dd>
                </div>
              ) : null}
              {horarios.igual && edades.igual ? (
                <div>
                  <dt className="flex items-center gap-2 font-bold">
                    <Icon nombre="reloj" tamano={20} />
                    {t.horariosEdades}
                  </dt>
                  {/* TODO(contenido): horarios y edades en programas.ts */}
                  <dd className="mt-1">
                    {[horarios.valor, edades.valor]
                      .filter(Boolean)
                      .join(". ") || t.porConfirmar}
                  </dd>
                </div>
              ) : null}
            </dl>
          </Revelar>
        </div>

        <ul className="mt-16 space-y-16 md:space-y-20">
          {programas.map((programa, i) => {
            const color = clasesColor[programa.color];
            // Solo se repite aquí lo que cambia de un programa a otro.
            const propios = [
              !dirigidoA.igual && programa.dirigidoA
                ? {
                    icono: "personas" as const,
                    titulo: t.dirigidoA,
                    valor: programa.dirigidoA,
                  }
                : null,
              !horarios.igual && programa.horarios
                ? {
                    icono: "reloj" as const,
                    titulo: t.horarios,
                    valor: programa.horarios,
                  }
                : null,
              !edades.igual && programa.edades
                ? {
                    icono: "personas" as const,
                    titulo: t.edades,
                    valor: programa.edades,
                  }
                : null,
            ].filter((d) => d !== null);

            return (
              <Revelar
                as="li"
                key={programa.slug}
                id={programa.slug}
                className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16"
              >
                <div className={cx(i % 2 === 1 && "lg:order-2")}>
                  {programa.foto ? (
                    <Image
                      src={programa.foto.src}
                      alt={programa.foto.alt}
                      width={programa.foto.ancho}
                      height={programa.foto.alto}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className={cx(
                        "aspect-4/3 w-full object-cover",
                        formas[i % formas.length],
                      )}
                    />
                  ) : (
                    <PhotoPlaceholder
                      descripcion={`clase de ${programa.nombre.toLowerCase()}`}
                      proporcion="4/3"
                      className={formas[i % formas.length]}
                    />
                  )}
                </div>
                <div>
                  <span
                    className={cx(
                      "inline-block rounded-full px-3 py-1 text-sm font-bold",
                      color.fondo,
                      color.sobreFondo,
                    )}
                  >
                    {programa.etiqueta}
                  </span>
                  <h3
                    id={`${programa.slug}-titulo`}
                    className="mt-4 text-4xl font-stretch-78% sm:text-5xl"
                  >
                    {programa.nombre}
                  </h3>
                  <div className="mt-5 medida space-y-4 text-lg">
                    {programa.descripcion.map((parrafo) => (
                      <p key={parrafo.slice(0, 30)}>{parrafo}</p>
                    ))}
                  </div>
                  {propios.length > 0 ? (
                    <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                      {propios.map((dato) => (
                        <div key={dato.titulo}>
                          <dt className="flex items-center gap-2 font-bold">
                            <Icon nombre={dato.icono} tamano={20} />
                            {dato.titulo}
                          </dt>
                          <dd className="mt-1">{dato.valor}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                  <BotonEnlace
                    href={`/contacto/?motivo=inscripcion&programa=${programa.slug}`}
                    className="mt-7"
                  >
                    {t.inscribirme}
                    <span className="sr-only">: {programa.nombre}</span>
                  </BotonEnlace>
                </div>
              </Revelar>
            );
          })}
        </ul>
      </Section>

      <Section tituloId="faq-titulo" id="preguntas" fondo="cana" capa>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <EncabezadoSeccion
            id="faq-titulo"
            antetitulo={t.faq}
            titulo={t.faqTitulo}
          />
          <div className="space-y-3">
            {preguntasFrecuentes.map((item) => (
              <details
                key={item.pregunta}
                className="group rounded-panel bg-blanco open:ring-2 open:ring-tinta"
              >
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 text-lg font-bold [&::-webkit-details-marker]:hidden">
                  {item.pregunta}
                  <Icon
                    nombre="abajo"
                    className="shrink-0 transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="medida px-5 pb-5">{item.respuesta}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
