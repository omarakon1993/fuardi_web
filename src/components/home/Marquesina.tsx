"use client";

import { Fragment, useState } from "react";
import { inicio } from "@/data/inicio";
import { cx } from "@/lib/colores";
import { useMovimientoReducido } from "@/lib/useMovimientoReducido";
import { Icon } from "@/components/ui/Icon";

function Tira() {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {inicio.marquesina.map((palabra) => (
        <Fragment key={palabra}>
          <span className="whitespace-nowrap">{palabra}</span>
          <span className="text-2xl">✦</span>
        </Fragment>
      ))}
    </div>
  );
}

/**
 * Franja roja inclinada con los ritmos y lugares del grupo. Es decorativa
 * (los lectores de pantalla la omiten). Se mueve sola solo si la persona no
 * pidió menos movimiento, y tiene un botón para detenerla.
 */
export function Marquesina() {
  const reducido = useMovimientoReducido();
  const [pausada, setPausada] = useState(false);
  const moviendo = !reducido && !pausada;

  return (
    <div className="relative z-10 -mt-12 overflow-hidden py-6">
      <div className="-mx-8 flex -rotate-[1.5deg] items-center bg-rojo py-4 text-blanco shadow-xl">
        <div
          aria-hidden="true"
          className={cx(
            "flex w-max condensada text-[1.75rem] leading-none font-extrabold",
            moviendo && "animate-marquesina",
          )}
        >
          <Tira />
          <Tira />
        </div>
      </div>
      {reducido ? null : (
        <button
          type="button"
          onClick={() => setPausada(!pausada)}
          className="absolute right-4 bottom-0 inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full bg-tinta text-blanco shadow-lg hover:bg-blanco hover:text-tinta sm:right-8"
        >
          <Icon nombre={pausada ? "reproducir" : "pausa"} tamano={18} />
          <span className="sr-only">
            {pausada ? inicio.marquesinaReanudar : inicio.marquesinaPausar}
          </span>
        </button>
      )}
    </div>
  );
}
