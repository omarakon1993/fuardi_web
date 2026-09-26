import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { inicio } from "@/data/inicio";
import { botonesDestacados } from "@/data/navegacion";
import { cx } from "@/lib/colores";
import type { Enlace, Foto } from "@/lib/types";
import { BotonEnlace } from "./Button";
import { Container } from "./Container";

interface PageHeaderProps {
  titulo: string;
  /** Píldora corta sobre el titular. */
  etiqueta?: string;
  intro?: ReactNode;
  /** Foto grande a la derecha. */
  foto?: Foto;
  /** Botones principales de la página. */
  acciones?: ReactNode;
  /** Accesos directos a las secciones de la página. */
  atajos?: Enlace[];
  children?: ReactNode;
}

/**
 * Portada de las páginas internas, con el único h1 de la página. Misma
 * silueta que el inicio: fondo tinta, titular grande y foto con esquina
 * amplia. La primera sección de la página se monta encima como capa.
 */
export function PageHeader({
  titulo,
  etiqueta,
  intro,
  foto,
  acciones,
  atajos,
  children,
}: PageHeaderProps) {
  return (
    <div className="overflow-hidden bg-tinta pt-12 pb-28 text-blanco md:pt-16 lg:pb-32">
      <Container
        className={cx(
          "grid items-center gap-12",
          foto && "lg:grid-cols-[1.1fr_1fr] lg:gap-14",
        )}
      >
        <div className="motion-safe:animate-entrada">
          {etiqueta ? (
            <p className="mb-6 inline-flex items-center gap-2.5 rounded-full bg-blanco/10 px-4 py-1.5 text-base font-bold">
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-rojo"
              />
              {etiqueta}
            </p>
          ) : null}
          <h1 className="text-titular">{titulo}</h1>
          {intro ? (
            <p className="mt-6 medida text-entrada text-blanco/90">{intro}</p>
          ) : null}
          {acciones ? (
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
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
            className="aspect-5/4 w-full rounded-[2rem_8rem_2rem_2rem] object-cover sm:rounded-[2rem_12rem_2rem_2rem]"
          />
        ) : null}
      </Container>

      {atajos && atajos.length > 0 ? (
        <Container>
          <nav aria-label="En esta página" className="mt-10">
            <ul className="flex flex-wrap gap-2">
              {atajos.map((atajo) => (
                <li key={atajo.href}>
                  <Link
                    href={atajo.href}
                    className="inline-flex min-h-11 items-center rounded-full bg-blanco/10 px-4 font-bold text-blanco no-underline transition-colors duration-300 hover:bg-blanco hover:text-tinta"
                  >
                    {atajo.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      ) : null}
    </div>
  );
}

/** Inscribir (botón blanco) y apoyar (enlace), como en el inicio. */
export function AccionesPrincipales() {
  return (
    <>
      <BotonEnlace href={botonesDestacados.inscribirse.href} variante="blanco">
        {inicio.hero.inscribir}
      </BotonEnlace>
      <BotonEnlace href={botonesDestacados.apoyar.href} variante="textoClaro">
        {inicio.hero.apoyar}
      </BotonEnlace>
    </>
  );
}
