"use client";

import { useState } from "react";
import { paginas } from "@/data/paginas";
import type { Presentacion } from "@/lib/types";
import { cx } from "@/lib/colores";
import { FiltroOpciones } from "@/components/ui/FiltroOpciones";
import { Icon } from "@/components/ui/Icon";
import { Lightbox } from "@/components/ui/Lightbox";

type Filtro = "todas" | Presentacion["tipo"];

const opciones: { valor: Filtro; texto: string }[] = [
  { valor: "todas", texto: "Todas" },
  { valor: "presentacion", texto: "Presentaciones" },
  { valor: "salida", texto: "Salidas" },
];

const nombreTipo: Record<Presentacion["tipo"], string> = {
  presentacion: "Presentación",
  salida: "Salida",
};

export function ListaPresentaciones({
  presentaciones,
}: {
  presentaciones: Presentacion[];
}) {
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const t = paginas.presentaciones;

  const lista = presentaciones.filter(
    (p) => filtro === "todas" || p.tipo === filtro,
  );
  const anios = [...new Set(lista.map((p) => p.anio))].sort((a, b) => b - a);

  return (
    <div className="mt-8">
      <FiltroOpciones
        leyenda={t.filtro}
        nombre="tipo-presentacion"
        opciones={opciones}
        valor={filtro}
        onCambio={setFiltro}
      />
      <p aria-live="polite" className="mt-4 text-gris">
        {lista.length === 1 ? "1 resultado" : `${lista.length} resultados`}
      </p>

      {lista.length === 0 ? (
        <p className="mt-6 text-xl">{t.vacio}</p>
      ) : (
        <div className="mt-6 space-y-10">
          {anios.map((anio) => (
            <section key={anio} aria-labelledby={`anio-${anio}`}>
              <h3
                id={`anio-${anio}`}
                className="border-b-4 border-rojo pb-2 text-3xl"
              >
                {anio}
              </h3>
              <ul className="mt-4 grid gap-4 md:grid-cols-2">
                {lista
                  .filter((p) => p.anio === anio)
                  .map((p) => (
                    <li
                      key={p.id}
                      className="rounded-panel border-2 border-cana bg-blanco p-5"
                    >
                      <p
                        className={cx(
                          "inline-block rounded px-2 py-0.5 text-sm font-bold",
                          p.tipo === "salida"
                            ? "bg-magenta text-blanco"
                            : "bg-tinta text-blanco",
                        )}
                      >
                        {nombreTipo[p.tipo]}
                      </p>
                      <h4 className="mt-2 text-xl">{p.titulo}</h4>
                      {p.lugar ? (
                        <p className="mt-1 flex items-center gap-2 text-gris">
                          <Icon nombre="ubicacion" tamano={20} />
                          {p.lugar}
                        </p>
                      ) : null}
                      {p.descripcion ? (
                        <p className="mt-2">{p.descripcion}</p>
                      ) : null}
                      {p.fotos.length > 0 ? (
                        <Lightbox
                          fotos={p.fotos}
                          titulo={p.titulo}
                          className="mt-4 grid-cols-3! lg:grid-cols-3!"
                        />
                      ) : null}
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
