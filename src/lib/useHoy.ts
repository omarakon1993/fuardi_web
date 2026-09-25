"use client";

import { useSyncExternalStore } from "react";
import { hoyBogota } from "@/lib/fechas";
import type { Fecha } from "@/lib/types";

const sinSuscripcion = () => () => {};

/**
 * Día actual en Bogotá.
 *
 * El HTML se genera al compilar, así que en el servidor y durante la
 * hidratación se usa `hoyCompilacion` (el mismo valor en ambos lados, sin
 * errores de hidratación). Justo después, React vuelve a renderizar con la
 * fecha real del visitante y los filtros quedan al día.
 */
export function useHoy(hoyCompilacion: Fecha): Fecha {
  return useSyncExternalStore(sinSuscripcion, hoyBogota, () => hoyCompilacion);
}
