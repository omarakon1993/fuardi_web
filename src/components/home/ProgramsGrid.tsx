import Image from "next/image";
import Link from "next/link";
import { inicio } from "@/data/inicio";
import { programas } from "@/data/programas";
import { clasesColor, cx } from "@/lib/colores";
import type { Programa } from "@/lib/types";
import { BotonEnlace } from "@/components/ui/Button";
import { Revelar } from "@/components/ui/Revelar";
import { EncabezadoSeccion, Section } from "@/components/ui/Section";

/*
 * Seis piezas con foto, con esquinas distintas como las de un rompecabezas.
 * Cada una lleva a su programa; la inscripción es una sola.
 */
const formas = [
  "rounded-t-[7.5rem] rounded-b-foto",
  "rounded-foto sm:mt-10",
  "rounded-t-foto rounded-b-[7.5rem]",
  "rounded-foto sm:rounded-t-[7.5rem]",
  "rounded-[2rem_8rem_2rem_2rem] sm:mt-10",
  "rounded-t-foto rounded-b-[5rem]",
];

function Pildora({ programa }: { programa: Programa }) {
  const color = clasesColor[programa.color];
  return (
    <span
      className={cx(
        "inline-block rounded-full px-3 py-1 text-sm font-bold",
        color.fondo,
        color.sobreFondo,
      )}
    >
      {programa.etiqueta}
    </span>
  );
}

function PiezaFoto({
  programa,
  indice,
}: {
  programa: Programa;
  indice: number;
}) {
  const foto = programa.foto;
  return (
    <Revelar
      as="li"
      className={cx(
        "group relative isolate flex h-96 flex-col justify-end overflow-hidden bg-tinta text-blanco transition-transform duration-300 hover:-translate-y-1.5 lg:h-108",
        formas[indice % formas.length],
      )}
    >
      {foto ? (
        <Image
          src={foto.src}
          alt={foto.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="-z-20 object-cover"
        />
      ) : null}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-tinta/95 via-tinta/55 via-40% to-tinta/0 to-70%"
      />
      <div className="p-6 pb-10">
        <Pildora programa={programa} />
        <h3 className="mt-3 text-3xl">
          <Link
            href={`/programas/#${programa.slug}`}
            className="text-blanco no-underline group-hover:underline after:absolute after:inset-0"
          >
            {programa.nombre}
          </Link>
        </h3>
        <p className="mt-2 text-base">{programa.resumen}</p>
      </div>
    </Revelar>
  );
}

export function ProgramsGrid() {
  const t = inicio.programas;

  return (
    <Section tituloId="programas-titulo" fondo="cana" capa>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <EncabezadoSeccion
          id="programas-titulo"
          antetitulo={t.antetitulo}
          titulo={t.titulo}
          className="max-w-md"
        />
        <BotonEnlace href="/programas/" variante="secundario">
          {t.enlace}
        </BotonEnlace>
      </div>
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {programas.map((programa, i) => (
          <PiezaFoto key={programa.slug} programa={programa} indice={i} />
        ))}
      </ul>
    </Section>
  );
}
