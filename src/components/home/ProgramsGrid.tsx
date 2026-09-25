import Image from "next/image";
import Link from "next/link";
import { inicio } from "@/data/inicio";
import { programas } from "@/data/programas";
import { clasesColor, cx } from "@/lib/colores";
import type { Programa } from "@/lib/types";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { EncabezadoSeccion, Section } from "@/components/ui/Section";

/*
 * Mosaico tipo rompecabezas: música es la pieza grande con foto; el resto
 * alterna piezas rellenas de color y piezas blancas con borde grueso.
 */
const estilos: Record<string, { pieza: string; relleno: boolean }> = {
  musica: { pieza: "lg:col-span-6 lg:row-span-2", relleno: true },
  formacion: { pieza: "lg:col-span-6", relleno: false },
  danza: { pieza: "lg:col-span-3", relleno: true },
  canto: { pieza: "lg:col-span-3", relleno: false },
  emprendimientos: { pieza: "sm:col-span-2 lg:col-span-12", relleno: true },
};

function Pieza({ programa }: { programa: Programa }) {
  const color = clasesColor[programa.color];
  const estilo = estilos[programa.slug] ?? { pieza: "", relleno: false };
  const grande = programa.slug === "musica";

  return (
    <li
      className={cx(
        "group relative flex flex-col overflow-hidden rounded-xl",
        estilo.pieza,
        estilo.relleno
          ? cx(color.fondo, color.sobreFondo)
          : cx("border-4 bg-blanco text-tinta", color.borde),
      )}
    >
      {grande ? (
        programa.foto ? (
          <Image
            src={programa.foto.src}
            alt={programa.foto.alt}
            width={programa.foto.ancho}
            height={programa.foto.alto}
            className="aspect-[3/2] w-full object-cover"
          />
        ) : (
          <PhotoPlaceholder
            descripcion="jóvenes tocando tambores y gaitas"
            proporcion="3/2"
            tono="oscuro"
          />
        )
      ) : null}
      <div className={cx("flex flex-1 flex-col p-6", grande && "lg:p-8")}>
        <h3 className={cx(grande ? "text-3xl" : "text-2xl")}>
          <Link
            href={`/programas/#${programa.slug}`}
            className="no-underline group-hover:underline after:absolute after:inset-0 after:rounded-xl"
          >
            {programa.nombre}
          </Link>
        </h3>
        <p className={cx("mt-3", grande && "text-xl")}>{programa.resumen}</p>
      </div>
    </li>
  );
}

export function ProgramsGrid() {
  return (
    <Section tituloId="programas-titulo">
      <EncabezadoSeccion
        id="programas-titulo"
        titulo={inicio.programas.titulo}
        intro={inicio.programas.intro}
      />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
        {programas.map((programa) => (
          <Pieza key={programa.slug} programa={programa} />
        ))}
      </ul>
    </Section>
  );
}
