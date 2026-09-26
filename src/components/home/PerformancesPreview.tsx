import Image from "next/image";
import { inicio } from "@/data/inicio";
import { galeriaGeneral } from "@/data/presentaciones";
import { cx } from "@/lib/colores";
import { BotonEnlace } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Revelar } from "@/components/ui/Revelar";

// Anchos y formas que se van alternando en la galería.
const formas = [
  "w-[min(85vw,35rem)] rounded-foto",
  "w-[min(70vw,22.5rem)] rounded-t-full rounded-b-foto",
  "w-[min(85vw,30rem)] rounded-[2rem_2rem_7.5rem_2rem]",
  "w-[min(70vw,24rem)] rounded-foto",
];

export function PerformancesPreview() {
  const t = inicio.presentaciones;
  // La foto del hero ya se vio arriba: la galería empieza por las demás.
  const fotos = [...galeriaGeneral.slice(1), galeriaGeneral[0]];

  return (
    <section
      aria-labelledby="tarima-titulo"
      className="relative -mt-14 rounded-t-capa bg-tinta pt-16 pb-28 text-blanco md:pt-20 md:pb-32"
    >
      <Container>
        <Revelar className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div>
            <p className="antetitulo text-cana">{t.antetitulo}</p>
            <h2 id="tarima-titulo" className="mt-4 text-seccion">
              {t.titulo}
            </h2>
          </div>
          <p className="medida text-entrada text-blanco/90">{t.intro}</p>
        </Revelar>
      </Container>

      {/*
       * Una zona que se desplaza debe poder recibir el foco para moverla con
       * las flechas del teclado (WCAG 2.1.1), aunque no sea un control.
       */}
      {/* eslint-disable jsx-a11y/no-noninteractive-tabindex */}
      <div
        role="region"
        aria-label={t.galeria}
        tabIndex={0}
        className="mt-12 flex snap-x snap-mandatory scrollbar-thin gap-5 overflow-x-auto scroll-smooth px-4 pb-4 sm:px-6 lg:px-[max(2rem,calc((100vw_-_80rem)/2_+_2rem))]"
      >
        {fotos.map((foto, i) => (
          <Image
            key={foto.src}
            src={foto.src}
            alt={foto.alt}
            width={foto.ancho}
            height={foto.alto}
            sizes="36rem"
            className={cx(
              "h-80 shrink-0 snap-start object-cover sm:h-100",
              formas[i % formas.length],
            )}
          />
        ))}
      </div>
      {/* eslint-enable jsx-a11y/no-noninteractive-tabindex */}

      <Container className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <BotonEnlace href="/contacto/?motivo=presentacion" variante="blanco">
          {t.contratar}
        </BotonEnlace>
        <BotonEnlace href="/presentaciones/" variante="claro">
          {t.enlace}
        </BotonEnlace>
      </Container>
    </section>
  );
}
