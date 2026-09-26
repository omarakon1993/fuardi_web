"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import type { Foto } from "@/lib/types";
import { cx } from "@/lib/colores";
import { Icon } from "./Icon";

interface LightboxProps {
  fotos: Foto[];
  /** Nombre del conjunto, para el título del visor. */
  titulo: string;
  className?: string;
}

const botonVisor =
  "inline-flex min-h-12 min-w-12 cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-blanco bg-tinta/80 px-3 font-bold text-blanco hover:bg-blanco hover:text-tinta";

/**
 * Galería con visor propio. El visor es un <dialog> modal: Esc lo cierra,
 * las flechas cambian de foto, Tab se queda dentro y al cerrar el foco
 * vuelve a la miniatura de la foto que se estaba viendo.
 */
export function Lightbox({ fotos, titulo, className }: LightboxProps) {
  const [indice, setIndice] = useState(0);
  const dialogo = useRef<HTMLDialogElement>(null);
  const miniaturas = useRef<Array<HTMLButtonElement | null>>([]);
  const total = fotos.length;
  const foto = fotos[indice];

  function abrir(i: number) {
    setIndice(i);
    dialogo.current?.showModal();
  }

  function cerrar() {
    dialogo.current?.close();
  }

  const ir = (nuevo: number) => setIndice((nuevo + total) % total);

  function alTeclear(evento: KeyboardEvent<HTMLDialogElement>) {
    if (evento.key === "ArrowRight") {
      evento.preventDefault();
      ir(indice + 1);
    } else if (evento.key === "ArrowLeft") {
      evento.preventDefault();
      ir(indice - 1);
    } else if (evento.key === "Tab" && dialogo.current) {
      const enfocables = Array.from(
        dialogo.current.querySelectorAll<HTMLElement>("button"),
      );
      const primero = enfocables[0];
      const ultimo = enfocables[enfocables.length - 1];
      if (evento.shiftKey && document.activeElement === primero) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primero.focus();
      }
    }
  }

  if (total === 0) return null;

  return (
    <>
      <ul
        className={cx(
          "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
          className,
        )}
      >
        {fotos.map((f, i) => (
          <li key={f.src}>
            <button
              ref={(el) => {
                miniaturas.current[i] = el;
              }}
              type="button"
              onClick={() => abrir(i)}
              className="group relative block w-full cursor-zoom-in overflow-hidden rounded-panel"
            >
              <Image
                src={f.src}
                alt={f.alt}
                width={f.ancho}
                height={f.alto}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="aspect-4/3 w-full object-cover transition-transform group-hover:scale-105"
              />
              <span className="sr-only">
                {" "}
                (ampliar foto {i + 1} de {total})
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* El <dialog> nativo maneja Esc; onKeyDown agrega flechas y ciclo de foco. */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <dialog
        ref={dialogo}
        aria-label={`${titulo}: visor de fotos`}
        onKeyDown={alTeclear}
        onClose={() => miniaturas.current[indice]?.focus()}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-tinta/95 p-0 text-blanco backdrop:bg-tinta/80"
      >
        {foto ? (
          <div className="flex h-full flex-col gap-3 p-3 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="font-bold" aria-live="polite">
                {indice + 1} de {total}
              </p>
              <button type="button" onClick={cerrar} className={botonVisor}>
                <Icon nombre="cerrar" />
                <span>Cerrar</span>
              </button>
            </div>
            <figure className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3">
              <Image
                src={foto.src}
                alt={foto.alt}
                width={foto.ancho}
                height={foto.alto}
                sizes="100vw"
                className="min-h-0 w-auto max-w-full flex-1 object-contain"
              />
              <figcaption className="medida text-center text-lg">
                {foto.alt}
              </figcaption>
            </figure>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => ir(indice - 1)}
                className={botonVisor}
              >
                <Icon nombre="izquierda" />
                <span>Anterior</span>
              </button>
              <button
                type="button"
                onClick={() => ir(indice + 1)}
                className={botonVisor}
              >
                <span>Siguiente</span>
                <Icon nombre="derecha" />
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
