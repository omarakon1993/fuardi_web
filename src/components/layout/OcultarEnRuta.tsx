"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { esRutaActual } from "./NavPrincipal";

interface OcultarEnRutaProps {
  /** Ruta donde no se muestra, por ejemplo "/contacto/". */
  ruta: string;
  children: ReactNode;
  /** Lo que se muestra en su lugar en esa ruta. */
  alternativa?: ReactNode;
}

/** Oculta un bloque en una página donde repetiría lo que ya dice. */
export function OcultarEnRuta({
  ruta,
  children,
  alternativa = null,
}: OcultarEnRutaProps) {
  const pathname = usePathname();
  return esRutaActual(pathname, ruta) ? alternativa : children;
}
