"use client";

import Link from "next/link";
import { useAlmacen } from "@/lib/almacen";
import { vigentes } from "@/lib/fechas";
import { useHoy } from "@/lib/useHoy";
import type { Anuncio, Fecha } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { EtiquetaEjemplo } from "@/components/ui/EtiquetaEjemplo";
import { Icon } from "@/components/ui/Icon";

const CLAVE = "fuardi:anuncio-cerrado";

interface AnnouncementBarProps {
  anuncios: Anuncio[];
  hoyCompilacion: Fecha;
}

/** Barra superior con el anuncio vigente. Se puede cerrar y se recuerda. */
export function AnnouncementBar({
  anuncios,
  hoyCompilacion,
}: AnnouncementBarProps) {
  const hoy = useHoy(hoyCompilacion);
  const [cerrado, setCerrado] = useAlmacen(CLAVE);
  const anuncio = vigentes(
    anuncios.filter((a) => a.mostrarEnBarra),
    hoy,
  )[0];

  if (!anuncio || cerrado === anuncio.id) return null;

  return (
    <aside aria-label="Anuncio" className="bg-amarillo text-tinta">
      <Container className="flex items-center gap-3 py-2">
        <p className="flex-1 py-1 text-base">
          {anuncio.ejemplo ? (
            <>
              <EtiquetaEjemplo />{" "}
            </>
          ) : null}
          <strong>{anuncio.titulo}.</strong> {anuncio.texto}{" "}
          {anuncio.enlace ? (
            <Link
              href={anuncio.enlace.href}
              className="font-bold whitespace-nowrap underline decoration-2"
            >
              {anuncio.enlace.texto}
            </Link>
          ) : null}
        </p>
        <button
          type="button"
          onClick={() => setCerrado(anuncio.id)}
          className="inline-flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center rounded-md hover:bg-tinta/10"
        >
          <Icon nombre="cerrar" />
          <span className="sr-only">Cerrar anuncio</span>
        </button>
      </Container>
    </aside>
  );
}
