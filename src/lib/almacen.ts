"use client";

import { useCallback, useSyncExternalStore } from "react";

const EVENTO = "fuardi:almacen";

function suscribir(avisar: () => void) {
  window.addEventListener("storage", avisar);
  window.addEventListener(EVENTO, avisar);
  return () => {
    window.removeEventListener("storage", avisar);
    window.removeEventListener(EVENTO, avisar);
  };
}

export function leer(clave: string): string | null {
  try {
    return window.localStorage.getItem(clave);
  } catch {
    return null;
  }
}

export function guardar(clave: string, valor: string | null) {
  try {
    if (valor === null) window.localStorage.removeItem(clave);
    else window.localStorage.setItem(clave, valor);
  } catch {
    // Navegación privada o almacenamiento bloqueado: se ignora.
  }
  window.dispatchEvent(new Event(EVENTO));
}

/**
 * Valor de localStorage sincronizado entre componentes y pestañas.
 * En el servidor y durante la hidratación devuelve `null`.
 */
export function useAlmacen(clave: string) {
  const valor = useSyncExternalStore(
    suscribir,
    () => leer(clave),
    () => null,
  );
  const cambiar = useCallback(
    (nuevo: string | null) => guardar(clave, nuevo),
    [clave],
  );
  return [valor, cambiar] as const;
}
