"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cx } from "@/lib/colores";
import { Icon } from "./Icon";

interface DesplegableProps {
  /** Contenido visible del botón. */
  etiqueta: ReactNode;
  children: ReactNode;
  claseBoton?: string;
  clasePanel?: string;
  /** Lado hacia el que se alinea el panel. */
  alinear?: "izquierda" | "derecha";
  /** Se cierra al elegir un enlace del panel. */
  cerrarAlElegir?: boolean;
}

/**
 * Botón que muestra y oculta un panel (patrón de divulgación). Esc lo cierra
 * y devuelve el foco al botón; también se cierra con un clic afuera o cuando
 * el foco sale del panel.
 */
export function Desplegable({
  etiqueta,
  children,
  claseBoton,
  clasePanel,
  alinear = "izquierda",
  cerrarAlElegir,
}: DesplegableProps) {
  const [abierto, setAbierto] = useState(false);
  const contenedor = useRef<HTMLDivElement>(null);
  const boton = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!abierto) return;
    function alTocar(evento: PointerEvent) {
      if (!contenedor.current?.contains(evento.target as Node)) {
        setAbierto(false);
      }
    }
    function alTeclear(evento: KeyboardEvent) {
      if (evento.key !== "Escape") return;
      setAbierto(false);
      boton.current?.focus();
    }
    function alEnfocar(evento: FocusEvent) {
      if (!contenedor.current?.contains(evento.target as Node)) {
        setAbierto(false);
      }
    }
    document.addEventListener("pointerdown", alTocar);
    document.addEventListener("keydown", alTeclear);
    document.addEventListener("focusin", alEnfocar);
    return () => {
      document.removeEventListener("pointerdown", alTocar);
      document.removeEventListener("keydown", alTeclear);
      document.removeEventListener("focusin", alEnfocar);
    };
  }, [abierto]);

  return (
    <div ref={contenedor} className="relative">
      <button
        ref={boton}
        type="button"
        aria-expanded={abierto}
        aria-controls={panelId}
        onClick={() => setAbierto(!abierto)}
        className={cx("cursor-pointer", claseBoton)}
      >
        {etiqueta}
        <Icon
          nombre="abajo"
          tamano={18}
          className={cx("transition-transform", abierto && "rotate-180")}
        />
      </button>
      {/* Clic en un enlace del panel: navega y cierra. */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        id={panelId}
        hidden={!abierto}
        onClick={(evento) => {
          if (cerrarAlElegir && (evento.target as HTMLElement).closest("a")) {
            setAbierto(false);
          }
        }}
        className={cx(
          "absolute top-full z-50 mt-2 rounded-panel bg-blanco p-2 text-tinta shadow-2xl ring-1 ring-tinta/10",
          alinear === "derecha" ? "right-0" : "left-0",
          clasePanel,
        )}
      >
        {children}
      </div>
    </div>
  );
}
