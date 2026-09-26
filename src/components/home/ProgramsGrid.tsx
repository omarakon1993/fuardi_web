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
 * Cuatro columnas escalonadas como piezas de rompecabezas: tres fotos con
 * formas distintas y una columna con dos tarjetas blancas.
 */
const conFoto = ["musica", "danza", "canto"];
const formas: Record<string, string> = {
  musica: "rounded-t-[7.5rem] rounded-b-foto",
  danza: "rounded-foto sm:mt-14",
  canto: "rounded-t-foto rounded-b-[5rem] sm:rounded-b-[7.5rem]",
};

const buscar = (slug: string) => programas.find((p) => p.slug === slug);

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

function PiezaFoto({ programa }: { programa: Programa }) {
  const foto = programa.foto;
  return (
    <Revelar
      as="li"
      className={cx(
        "group relative isolate flex h-96 flex-col justify-end overflow-hidden bg-tinta text-blanco transition-transform duration-300 hover:-translate-y-1.5 lg:h-108",
        formas[programa.slug],
      )}
    >
      {foto ? (
        <Image
          src={foto.src}
          alt={foto.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="-z-20 object-cover object-[center_75%]"
        />
      ) : null}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-tinta/95 via-tinta/55 via-40% to-tinta/0 to-70%"
      />
      {/* La pieza con la curva abajo necesita más aire para el texto. */}
      <div
        className={cx(
          "p-6 pb-8",
          programa.slug === "canto" && "pb-16 sm:pb-20",
        )}
      >
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

function PiezaBlanca({ programa }: { programa: Programa }) {
  return (
    <Revelar
      as="li"
      className="group relative rounded-foto bg-blanco p-6 transition-transform duration-300 hover:-translate-y-1.5"
    >
      <Pildora programa={programa} />
      <h3 className="mt-3 text-2xl">
        <Link
          href={`/programas/#${programa.slug}`}
          className="text-tinta no-underline group-hover:underline after:absolute after:inset-0 after:rounded-foto"
        >
          {programa.nombre}
        </Link>
      </h3>
      <p className="mt-2 text-base text-gris">{programa.resumen}</p>
    </Revelar>
  );
}

export function ProgramsGrid() {
  const t = inicio.programas;
  const fotos = conFoto.map(buscar).filter((p) => p !== undefined);
  const blancas = programas.filter((p) => !conFoto.includes(p.slug));

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
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {fotos.map((programa) => (
          <PiezaFoto key={programa.slug} programa={programa} />
        ))}
        <li className="sm:mt-14">
          <ul className="grid gap-5">
            {blancas.map((programa) => (
              <PiezaBlanca key={programa.slug} programa={programa} />
            ))}
          </ul>
        </li>
      </ul>
    </Section>
  );
}
