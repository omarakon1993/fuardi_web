"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { cx } from "@/lib/colores";
import { Icon } from "./Icon";

interface YouTubeLiteProps {
  id: string;
  titulo: string;
  className?: string;
}

/**
 * Fachada de YouTube: muestra la miniatura y solo carga el reproductor
 * (youtube-nocookie) cuando la persona lo pide. Nada suena solo.
 */
export function YouTubeLite({ id, titulo, className }: YouTubeLiteProps) {
  const [activo, setActivo] = useState(false);
  const marco = useRef<HTMLIFrameElement>(null);

  return (
    <div
      className={cx(
        "relative aspect-video overflow-hidden rounded-lg bg-tinta",
        className,
      )}
    >
      {activo ? (
        <iframe
          ref={marco}
          onLoad={() => marco.current?.focus()}
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&cc_load_policy=1&hl=es`}
          title={titulo}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActivo(true)}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <Image
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <span className="absolute inset-0 bg-tinta/30 transition-colors group-hover:bg-tinta/10" />
          <span className="absolute top-1/2 left-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-rojo px-5 py-3 font-bold text-blanco shadow-lg group-hover:bg-rojo-hondo">
            <Icon nombre="reproducir" className="fill-current" />
            <span>
              Ver video<span className="sr-only">: {titulo}</span>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
