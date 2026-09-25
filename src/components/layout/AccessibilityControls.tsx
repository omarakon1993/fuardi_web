"use client";

import { useAlmacen } from "@/lib/almacen";
import {
  CLAVE_CONTRASTE,
  CLAVE_TEXTO,
  TEXTO_MAX,
  TEXTO_MIN,
} from "@/lib/preferencias";
import { cx } from "@/lib/colores";
import { Icon } from "@/components/ui/Icon";

const boton =
  "inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center gap-1.5 rounded-md px-2 font-bold disabled:cursor-not-allowed disabled:opacity-50";
const normal = "text-tinta hover:bg-blanco";

/** Tamaño de texto (A− / A+) y alto contraste, recordados en el navegador. */
export function AccessibilityControls({ className }: { className?: string }) {
  const [textoGuardado, setTexto] = useAlmacen(CLAVE_TEXTO);
  const [contrasteGuardado, setContraste] = useAlmacen(CLAVE_CONTRASTE);
  const nivel = Number(textoGuardado ?? 0) || 0;
  const alto = contrasteGuardado === "alto";

  // Se aplica directo en <html> al hacer clic. Al cargar lo aplica el
  // script en línea del layout, antes de pintar.
  function aplicar(atributo: string, valor: string | null) {
    const html = document.documentElement;
    if (valor === null) html.removeAttribute(atributo);
    else html.setAttribute(atributo, valor);
  }

  const cambiarTexto = (delta: number) => {
    const nuevo = Math.min(TEXTO_MAX, Math.max(TEXTO_MIN, nivel + delta));
    const valor = nuevo === 0 ? null : String(nuevo);
    setTexto(valor);
    aplicar("data-texto", valor);
  };

  const cambiarContraste = () => {
    const valor = alto ? null : "alto";
    setContraste(valor);
    aplicar("data-contraste", valor);
  };

  return (
    <div
      role="group"
      aria-label="Opciones de lectura"
      className={cx("flex flex-wrap items-center gap-1", className)}
    >
      <span className="mr-1 text-sm font-bold text-gris" aria-hidden="true">
        Texto
      </span>
      <button
        type="button"
        onClick={() => cambiarTexto(-1)}
        disabled={nivel <= TEXTO_MIN}
        className={cx(boton, normal)}
      >
        <span aria-hidden="true">A−</span>
        <span className="sr-only">Reducir tamaño del texto</span>
      </button>
      <button
        type="button"
        onClick={() => cambiarTexto(1)}
        disabled={nivel >= TEXTO_MAX}
        className={cx(boton, normal, "text-xl")}
      >
        <span aria-hidden="true">A+</span>
        <span className="sr-only">Aumentar tamaño del texto</span>
      </button>
      {nivel !== 0 ? (
        <button
          type="button"
          onClick={() => {
            setTexto(null);
            aplicar("data-texto", null);
          }}
          className={cx(boton, normal, "text-sm underline")}
        >
          Normal
          <span className="sr-only"> (tamaño de texto original)</span>
        </button>
      ) : null}
      <button
        type="button"
        aria-pressed={alto}
        onClick={cambiarContraste}
        className={cx(
          boton,
          "ml-2",
          alto && "bg-tinta text-blanco hover:bg-tinta",
        )}
      >
        <Icon nombre="contraste" tamano={20} />
        <span>Alto contraste</span>
      </button>
    </div>
  );
}
