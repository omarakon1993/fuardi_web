"use client";

import Image from "next/image";
import { inicio } from "@/data/inicio";
import { cx } from "@/lib/colores";
import { formatFecha, vigentes } from "@/lib/fechas";
import type { Anuncio, Fecha } from "@/lib/types";
import { useHoy } from "@/lib/useHoy";
import type { AvancePublico } from "@/lib/vaki";
import { BotonEnlace } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Revelar } from "@/components/ui/Revelar";

interface CampanaDestacadaProps {
  anuncios: Anuncio[];
  hoyCompilacion: Fecha;
  /** Avance leído de Vaki al compilar; null si no se pudo leer. */
  avance: AvancePublico | null;
  /** En Apóyanos va como primera capa y sin foto (la portada ya tiene una). */
  enApoyanos?: boolean;
}

/**
 * La única campaña que se resalta en este momento: la primera vigente con
 * `destacado` en src/data/anuncios.ts. Se vuelve a filtrar en el navegador,
 * así que desaparece sola cuando termina.
 */
export function CampanaDestacada({
  anuncios,
  hoyCompilacion,
  avance,
  enApoyanos,
}: CampanaDestacadaProps) {
  const t = inicio.campana;
  const hoy = useHoy(hoyCompilacion);
  const campana = vigentes(
    anuncios.filter((a) => a.destacado && !a.ejemplo),
    hoy,
  )[0];
  if (!campana) return null;

  const porcentaje = avance?.porcentaje ?? 0;
  const conAvance =
    avance !== null &&
    campana.vaki !== undefined &&
    porcentaje >= campana.vaki.avanceVisibleDesde;
  const foto = enApoyanos ? undefined : campana.foto;
  const compartir = campana.enlace
    ? `https://wa.me/?text=${encodeURIComponent(
        t.mensajeCompartir(campana.titulo, campana.enlace.href),
      )}`
    : undefined;

  return (
    <section
      aria-labelledby="campana-titulo"
      className={cx(
        "bg-blanco",
        enApoyanos
          ? "relative -mt-14 rounded-t-capa pt-10 pb-28 md:pt-12"
          : "pt-12 md:pt-16",
      )}
    >
      <Container className="px-2 sm:px-4 lg:px-5">
        <Revelar
          className={cx(
            "grid overflow-hidden rounded-foto bg-rojo text-blanco",
            foto && "md:grid-cols-[0.8fr_1.6fr]",
          )}
        >
          {foto ? (
            <div className="relative min-h-48 md:min-h-full">
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                sizes="(min-width: 768px) 35vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}

          <div className="p-6 sm:p-8 lg:px-10">
            <p className="antetitulo text-blanco/85">{t.antetitulo}</p>
            <h2 id="campana-titulo" className="mt-2 text-4xl sm:text-5xl">
              {campana.titulo}
            </h2>
            <p className="mt-3 medida">{campana.detalle ?? campana.texto}</p>

            {avance ? (
              // Sin valores en dinero: solo donantes y porcentaje de la meta.
              <div
                className={cx(
                  "mt-5 rounded-panel bg-rojo-hondo/70 px-5 py-3",
                  conAvance ? "max-w-md" : "w-fit",
                )}
              >
                <dl className={cx("grid gap-x-6", conAvance && "grid-cols-2")}>
                  <div>
                    <dt className="text-sm font-bold text-blanco/85">
                      {t.donantes}
                    </dt>
                    <dd className="condensada text-3xl leading-tight font-extrabold">
                      {avance.donantes}
                    </dd>
                  </div>
                  {conAvance ? (
                    <div>
                      <dt className="text-sm font-bold text-blanco/85">
                        {t.avance}
                      </dt>
                      <dd className="condensada text-3xl leading-tight font-extrabold">
                        {Math.floor(porcentaje)} %
                      </dd>
                    </div>
                  ) : null}
                </dl>
                {conAvance ? (
                  <span
                    aria-hidden="true"
                    className="mt-3 block h-3 overflow-hidden rounded-full bg-blanco/25"
                  >
                    <span
                      className="block h-full rounded-full bg-blanco"
                      style={{ width: `${Math.min(porcentaje, 100)}%` }}
                    />
                  </span>
                ) : null}
              </div>
            ) : null}

            <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
              {campana.enlace ? (
                <BotonEnlace
                  href={campana.enlace.href}
                  variante="blanco"
                  tamano="compacto"
                  icono="corazon"
                >
                  {campana.enlace.texto}
                </BotonEnlace>
              ) : null}
              {compartir ? (
                <BotonEnlace
                  href={compartir}
                  variante="claro"
                  tamano="compacto"
                  icono="whatsapp"
                >
                  {t.compartir}
                </BotonEnlace>
              ) : null}
            </div>

            {avance ? (
              <p className="mt-3 text-sm text-blanco/85">
                {t.fuente(formatFecha(avance.leido))}
              </p>
            ) : null}
          </div>
        </Revelar>
      </Container>
    </section>
  );
}
