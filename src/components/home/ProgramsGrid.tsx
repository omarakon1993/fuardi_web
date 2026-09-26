import Image from "next/image";
import Link from "next/link";
import { inicio } from "@/data/inicio";
import { programas } from "@/data/programas";
import { clasesColor, cx } from "@/lib/colores";
import type { Programa } from "@/lib/types";
import { BotonEnlace } from "@/components/ui/Button";
import { EncabezadoSeccion, Section } from "@/components/ui/Section";

/*
 * Mosaico tipo rompecabezas: cada pieza es una foto del programa con una
 * franja de su color. Música es la pieza grande; la que no tiene foto se
 * rellena con su color.
 */
const piezas: Record<string, string> = {
  musica: "sm:col-span-2 lg:col-span-7 lg:row-span-2 lg:min-h-[40rem]",
  danza: "lg:col-span-5",
  canto: "lg:col-span-5",
  formacion: "lg:col-span-7",
  emprendimientos: "lg:col-span-5",
};

// El orden del mosaico se da en el DOM para que el teclado lo siga igual.
const orden = Object.keys(piezas);
const enMosaico = [...programas].sort(
  (a, b) => orden.indexOf(a.slug) - orden.indexOf(b.slug),
);

function Pieza({ programa }: { programa: Programa }) {
  const color = clasesColor[programa.color];
  const grande = programa.slug === "musica";
  const foto = programa.foto;

  return (
    <li
      className={cx(
        "group relative isolate flex min-h-80 flex-col justify-end overflow-hidden rounded-foto",
        piezas[programa.slug],
        foto ? "text-blanco" : cx(color.fondo, color.sobreFondo),
      )}
    >
      {foto ? (
        <>
          <Image
            src={foto.src}
            alt={foto.alt}
            fill
            sizes={
              grande
                ? "(min-width: 1024px) 58vw, 100vw"
                : "(min-width: 1024px) 42vw, 100vw"
            }
            className="-z-20 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-linear-to-t from-tinta/95 via-tinta/60 via-40% to-tinta/0 to-75%"
          />
        </>
      ) : null}
      <div
        className={cx("p-6 pb-8 sm:p-8 sm:pb-10", grande && "lg:p-10 lg:pb-12")}
      >
        <h3 className={cx(grande ? "text-4xl sm:text-5xl" : "text-3xl")}>
          <Link
            href={`/programas/#${programa.slug}`}
            className="no-underline group-hover:underline after:absolute after:inset-0 after:rounded-foto"
          >
            {programa.nombre}
          </Link>
        </h3>
        <p className={cx("mt-3 max-w-[42ch]", grande ? "text-xl" : "text-lg")}>
          {programa.resumen}
        </p>
      </div>
      <span
        aria-hidden="true"
        className={cx("absolute inset-x-0 bottom-0 h-2", color.fondo)}
      />
    </li>
  );
}

export function ProgramsGrid() {
  return (
    <Section tituloId="programas-titulo">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <EncabezadoSeccion
          id="programas-titulo"
          titulo={inicio.programas.titulo}
          intro={inicio.programas.intro}
        />
        <BotonEnlace href="/programas/" variante="secundario">
          {inicio.programas.enlace}
        </BotonEnlace>
      </div>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
        {enMosaico.map((programa) => (
          <Pieza key={programa.slug} programa={programa} />
        ))}
      </ul>
    </Section>
  );
}
