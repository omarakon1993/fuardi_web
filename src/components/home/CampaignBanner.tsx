"use client";

import Image from "next/image";
import { useEffect, useState, type KeyboardEvent } from "react";
import { nombresTipoAnuncio } from "@/data/anuncios";
import { inicio } from "@/data/inicio";
import { formatFecha, vigentes } from "@/lib/fechas";
import { useHoy } from "@/lib/useHoy";
import { useMovimientoReducido } from "@/lib/useMovimientoReducido";
import type { Anuncio, Fecha } from "@/lib/types";
import { BotonEnlace } from "@/components/ui/Button";
import { EtiquetaEjemplo } from "@/components/ui/EtiquetaEjemplo";
import { Icon } from "@/components/ui/Icon";
import { EncabezadoSeccion, Section } from "@/components/ui/Section";

const INTERVALO = 8000;

function Tarjeta({ anuncio }: { anuncio: Anuncio }) {
  return (
    <article className="grid overflow-hidden rounded-xl bg-azul text-blanco md:grid-cols-[2fr_3fr]">
      {anuncio.foto ? (
        <Image
          src={anuncio.foto.src}
          alt={anuncio.foto.alt}
          width={anuncio.foto.ancho}
          height={anuncio.foto.alto}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="hidden items-center justify-center bg-azul-hondo md:flex"
        >
          <Icon nombre="musica" tamano={96} className="text-blanco/40" />
        </div>
      )}
      <div className="p-6 sm:p-10">
        <p className="flex flex-wrap items-center gap-2 font-bold text-amarillo">
          {nombresTipoAnuncio[anuncio.tipo]}
          {anuncio.ejemplo ? <EtiquetaEjemplo /> : null}
        </p>
        <h3 className="mt-2 text-3xl">{anuncio.titulo}</h3>
        <p className="mt-4 medida text-xl">{anuncio.texto}</p>
        <p className="mt-2 text-blanco/90">
          Hasta el {formatFecha(anuncio.hasta)}
        </p>
        {anuncio.enlace ? (
          <BotonEnlace
            href={anuncio.enlace.href}
            variante="claro"
            className="mt-6"
          >
            {anuncio.enlace.texto}
          </BotonEnlace>
        ) : null}
      </div>
    </article>
  );
}

/**
 * Carrusel propio: rota solo si la persona no pidió movimiento reducido, se
 * detiene con el botón de pausa, al pasar el mouse o al entrar con el teclado,
 * y responde a las flechas izquierda y derecha.
 */
function Carrusel({ anuncios }: { anuncios: Anuncio[] }) {
  const [indice, setIndice] = useState(0);
  // null = sin elección: rota salvo que la persona prefiera menos movimiento.
  const [eleccion, setEleccion] = useState<boolean | null>(null);
  const [enfocado, setEnfocado] = useState(false);
  const reducido = useMovimientoReducido();
  const total = anuncios.length;
  const automatico = eleccion ?? !reducido;
  const rotando = automatico && !enfocado;

  useEffect(() => {
    if (!rotando) return;
    const id = window.setInterval(
      () => setIndice((i) => (i + 1) % total),
      INTERVALO,
    );
    return () => window.clearInterval(id);
  }, [rotando, total]);

  const ir = (nuevo: number) => setIndice((nuevo + total) % total);

  function alTeclear(evento: KeyboardEvent<HTMLDivElement>) {
    if (evento.key === "ArrowRight") {
      evento.preventDefault();
      ir(indice + 1);
    } else if (evento.key === "ArrowLeft") {
      evento.preventDefault();
      ir(indice - 1);
    }
  }

  const botonControl =
    "inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-azul bg-blanco px-3 font-bold text-azul hover:bg-niebla";

  return (
    // Las flechas son un atajo extra; todos los controles son botones.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      role="region"
      aria-roledescription="carrusel"
      aria-label={inicio.campanas.titulo}
      onKeyDown={alTeclear}
      onMouseEnter={() => setEnfocado(true)}
      onMouseLeave={() => setEnfocado(false)}
      onFocus={() => setEnfocado(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setEnfocado(false);
      }}
      className="mt-10"
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setEleccion(!automatico)}
          className={botonControl}
        >
          <Icon nombre={automatico ? "pausa" : "reproducir"} />
          <span>{automatico ? "Pausar" : "Reanudar"}</span>
          <span className="sr-only"> el cambio automático</span>
        </button>
        <button
          type="button"
          onClick={() => ir(indice - 1)}
          className={botonControl}
        >
          <Icon nombre="izquierda" />
          <span className="sr-only">Anterior</span>
        </button>
        <button
          type="button"
          onClick={() => ir(indice + 1)}
          className={botonControl}
        >
          <Icon nombre="derecha" />
          <span className="sr-only">Siguiente</span>
        </button>
        <p className="ml-2 font-bold" aria-hidden="true">
          {indice + 1} de {total}
        </p>
      </div>

      <div aria-live={rotando ? "off" : "polite"}>
        {anuncios.map((anuncio, i) => (
          <div
            key={anuncio.id}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`${i + 1} de ${total}`}
            hidden={i !== indice}
          >
            <Tarjeta anuncio={anuncio} />
          </div>
        ))}
      </div>
    </div>
  );
}

interface CampaignBannerProps {
  anuncios: Anuncio[];
  hoyCompilacion: Fecha;
}

export function CampaignBanner({
  anuncios,
  hoyCompilacion,
}: CampaignBannerProps) {
  const hoy = useHoy(hoyCompilacion);
  const lista = vigentes(
    anuncios.filter((a) => a.destacado),
    hoy,
  );
  if (lista.length === 0) return null;

  return (
    <Section tituloId="campanas-titulo" fondo="niebla">
      <EncabezadoSeccion id="campanas-titulo" titulo={inicio.campanas.titulo} />
      {lista.length === 1 ? (
        <div className="mt-10">
          <Tarjeta anuncio={lista[0]} />
        </div>
      ) : (
        <Carrusel anuncios={lista} />
      )}
    </Section>
  );
}
