import Image from "next/image";
import { inicio } from "@/data/inicio";
import { site } from "@/data/site";
import { BotonEnlace } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

export function Hero() {
  const foto = site.heroFoto;

  return (
    <section
      aria-labelledby="hero-titulo"
      className="relative isolate flex min-h-[min(85vh,48rem)] items-end overflow-hidden bg-azul-hondo text-blanco lg:items-center"
    >
      {foto ? (
        <Image
          src={foto.src}
          alt={foto.alt}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
      ) : (
        <PhotoPlaceholder
          descripcion={inicio.hero.fotoPendiente}
          proporcion="libre"
          tono="oscuro"
          className="absolute inset-0 -z-20 h-full items-end! justify-start! p-6! pt-10!"
        />
      )}

      {/* Degradado solo donde va el texto: abajo en móvil, a la izquierda en escritorio. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-tinta/95 via-tinta/70 to-tinta/0 lg:bg-linear-to-r lg:from-tinta/90 lg:via-tinta/60 lg:via-45% lg:to-tinta/0 lg:to-70%"
      />

      <Container className="py-16 lg:py-24">
        <div className="max-w-2xl motion-safe:animate-entrada">
          <p className="font-display text-xl font-bold text-amarillo">
            {site.nombre}
          </p>
          <h1
            id="hero-titulo"
            className="mt-3 text-5xl leading-[0.95] sm:text-7xl"
          >
            {site.lema}
          </h1>
          <p className="mt-6 medida text-xl sm:text-2xl">{site.presentacion}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BotonEnlace href="/contacto/?motivo=inscripcion">
              {inicio.hero.inscribir}
            </BotonEnlace>
            <BotonEnlace href="/apoyanos/" variante="claro">
              {inicio.hero.apoyar}
            </BotonEnlace>
          </div>
        </div>
      </Container>
    </section>
  );
}
