"use client";

import Image from "next/image";
import { useState } from "react";
import { nombresTipoLogro } from "@/data/logros";
import { paginas } from "@/data/paginas";
import type { Logro, TipoLogro } from "@/lib/types";
import { FiltroOpciones } from "@/components/ui/FiltroOpciones";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { IconoLogro } from "./IconoLogro";

type Filtro = "todos" | TipoLogro;

const opciones: { valor: Filtro; texto: string }[] = [
  { valor: "todos", texto: "Todos" },
  ...(Object.keys(nombresTipoLogro) as TipoLogro[]).map((tipo) => ({
    valor: tipo,
    texto: nombresTipoLogro[tipo],
  })),
];

// Solo estos tipos llevan diploma o medalla.
const conDiploma: TipoLogro[] = ["reconocimiento", "galardon"];

/** Línea de tiempo vertical por año. Único lugar del sitio con marcadores de secuencia. */
export function LineaTiempo({ logros }: { logros: Logro[] }) {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const t = paginas.logros;

  const lista = logros.filter((l) => filtro === "todos" || l.tipo === filtro);
  const anios = [...new Set(lista.map((l) => l.anio))].sort((a, b) => a - b);

  return (
    <div className="mt-8">
      <FiltroOpciones
        leyenda={t.filtro}
        nombre="tipo-logro"
        opciones={opciones}
        valor={filtro}
        onCambio={setFiltro}
      />
      <p aria-live="polite" className="mt-4 text-gris">
        {lista.length === 1 ? "1 logro" : `${lista.length} logros`}
      </p>

      <ol className="relative mt-10 border-l-4 border-tinta pl-8 sm:ml-12 sm:pl-12">
        {anios.map((anio) => (
          <li key={anio} className="relative pb-12 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute top-1 -left-[2.9rem] size-6 rounded-full border-4 border-blanco bg-rojo ring-4 ring-tinta sm:-left-[3.9rem]"
            />
            <h3 className="text-6xl text-tinta font-stretch-78%">{anio}</h3>
            <ul className="mt-4 space-y-4">
              {lista
                .filter((l) => l.anio === anio)
                .map((logro) => (
                  <li
                    key={logro.id}
                    className="flex flex-col gap-4 rounded-panel bg-cana p-6 sm:flex-row"
                  >
                    <IconoLogro tipo={logro.tipo} />
                    <div className="flex-1">
                      <p className="text-base font-bold text-gris">
                        {nombresTipoLogro[logro.tipo]}
                      </p>
                      <h4 className="mt-1 text-xl">{logro.titulo}</h4>
                      {logro.detalle ? (
                        <p className="mt-2">{logro.detalle}</p>
                      ) : null}
                      {logro.lugar ? (
                        <p className="mt-1 text-gris">{logro.lugar}</p>
                      ) : null}
                    </div>
                    {logro.foto ? (
                      <Image
                        src={logro.foto.src}
                        alt={logro.foto.alt}
                        width={logro.foto.ancho}
                        height={logro.foto.alto}
                        className="aspect-4/3 w-full rounded-md object-cover sm:w-40"
                      />
                    ) : conDiploma.includes(logro.tipo) ? (
                      // TODO(contenido): foto del diploma o medalla en logros.ts.
                      <PhotoPlaceholder
                        descripcion={t.fotoPendiente}
                        compacto
                        className="w-32 rounded-md sm:w-40"
                      />
                    ) : null}
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
