"use client";

import { useSyncExternalStore } from "react";

const CONSULTA = "(prefers-reduced-motion: reduce)";

function suscribir(avisar: () => void) {
  const medio = window.matchMedia(CONSULTA);
  medio.addEventListener("change", avisar);
  return () => medio.removeEventListener("change", avisar);
}

/** true si la persona pidió reducir el movimiento. En el servidor asume que sí. */
export function useMovimientoReducido() {
  return useSyncExternalStore(
    suscribir,
    () => window.matchMedia(CONSULTA).matches,
    () => true,
  );
}
