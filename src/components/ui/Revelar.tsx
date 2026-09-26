"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMovimientoReducido } from "@/lib/useMovimientoReducido";

interface RevelarProps {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "div" | "li";
}

/**
 * Hace aparecer su contenido al entrar en pantalla. Lo que ya se ve al cargar
 * no se anima, y con movimiento reducido (o sin JavaScript) todo queda
 * visible. El estado va en data-revelar (ver globals.css).
 */
export function Revelar({
  children,
  className,
  id,
  as: Etiqueta = "div",
}: RevelarProps) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const reducido = useMovimientoReducido();

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento || reducido) return;
    if (elemento.getBoundingClientRect().top < window.innerHeight) return;

    elemento.dataset.revelar = "oculto";
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        elemento.dataset.revelar = "visto";
        observador.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observador.observe(elemento);
    return () => {
      observador.disconnect();
      elemento.dataset.revelar = "visto";
    };
  }, [reducido]);

  return (
    <Etiqueta ref={ref} id={id} className={className}>
      {children}
    </Etiqueta>
  );
}
