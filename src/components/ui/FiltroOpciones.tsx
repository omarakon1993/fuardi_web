"use client";

import { cx } from "@/lib/colores";

export interface OpcionFiltro<T extends string> {
  valor: T;
  texto: string;
}

interface FiltroOpcionesProps<T extends string> {
  leyenda: string;
  nombre: string;
  opciones: OpcionFiltro<T>[];
  valor: T;
  onCambio: (valor: T) => void;
  className?: string;
}

/** Grupo de radios nativos con aspecto de pastillas. Funciona con flechas. */
export function FiltroOpciones<T extends string>({
  leyenda,
  nombre,
  opciones,
  valor,
  onCambio,
  className,
}: FiltroOpcionesProps<T>) {
  return (
    <fieldset className={cx("flex flex-wrap items-center gap-2", className)}>
      <legend className="mb-2 w-full text-lg font-bold">{leyenda}</legend>
      {opciones.map((opcion) => {
        const activo = opcion.valor === valor;
        return (
          <label
            key={opcion.valor}
            className={cx(
              "relative inline-flex min-h-11 cursor-pointer items-center rounded-full border-2 px-4 font-bold",
              "has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-amarillo",
              activo
                ? "border-azul bg-azul text-blanco"
                : "border-azul bg-blanco text-azul hover:bg-niebla",
            )}
          >
            <input
              type="radio"
              name={nombre}
              value={opcion.valor}
              checked={activo}
              onChange={() => onCambio(opcion.valor)}
              className="sr-only"
            />
            {opcion.texto}
          </label>
        );
      })}
    </fieldset>
  );
}
