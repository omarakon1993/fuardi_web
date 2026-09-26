import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/lib/colores";
import type { Enlace, Foto } from "@/lib/types";
import { Container } from "./Container";
import { PatternBand } from "./PatternBand";

const fondos = {
  azul: "bg-azul text-blanco",
  tinta: "bg-tinta text-blanco",
} as const;

interface PageHeaderProps {
  titulo: string;
  intro?: ReactNode;
  /** Foto grande a la derecha, como en un cartel. */
  foto?: Foto;
  /** Botones principales de la página. */
  acciones?: ReactNode;
  /** Accesos directos a las secciones de la página. */
  atajos?: Enlace[];
  fondo?: keyof typeof fondos;
  children?: ReactNode;
}

/**
 * Portada de las páginas internas, con el único h1 de la página. Cada página
 * abre como un cartel: titular grande, intro, acciones y una foto del grupo.
 */
export function PageHeader({
  titulo,
  intro,
  foto,
  acciones,
  atajos,
  fondo = "azul",
  children,
}: PageHeaderProps) {
  return (
    <>
      <div className={fondos[fondo]}>
        <Container
          className={cx(
            "grid gap-10 py-14 md:py-20",
            foto && "lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14",
          )}
        >
          <div className="motion-safe:animate-entrada">
            <h1 className="text-titular">{titulo}</h1>
            {intro ? (
              <p className="mt-6 medida text-entrada text-blanco/90">{intro}</p>
            ) : null}
            {acciones ? (
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {acciones}
              </div>
            ) : null}
            {children}
          </div>
          {foto ? (
            <Image
              src={foto.src}
              alt={foto.alt}
              width={foto.ancho}
              height={foto.alto}
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-4/3 w-full rounded-foto object-cover lg:aspect-5/4"
            />
          ) : null}
        </Container>
      </div>
      <PatternBand tono="rojo" />
      {atajos && atajos.length > 0 ? (
        <nav aria-label="En esta página" className="border-b-2 border-niebla">
          <Container>
            <ul className="flex flex-wrap gap-2 py-4">
              {atajos.map((atajo) => (
                <li key={atajo.href}>
                  <Link
                    href={atajo.href}
                    className="inline-flex min-h-11 items-center rounded-full bg-niebla px-5 font-bold text-tinta no-underline hover:bg-azul hover:text-blanco"
                  >
                    {atajo.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      ) : null}
    </>
  );
}
