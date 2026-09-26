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
      className="relative isolate flex min-h-[min(92vh,58rem)] items-end overflow-hidden bg-azul-hondo text-blanco"
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

      {/* Degradado solo donde va el texto: abajo y, en escritorio, también a la izquierda. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-tinta/95 via-tinta/80 via-55% to-tinta/0 to-90%"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-linear-to-r from-tinta/90 via-tinta/65 via-40% to-tinta/0 to-65% lg:block"
      />

      <Container className="pt-40 pb-14 lg:pb-20">
        <div className="motion-safe:animate-entrada">
          <h1 id="hero-titulo" className="max-w-[10ch] text-cartel">
            {site.lema}
          </h1>
          <p className="mt-7 max-w-[38ch] text-entrada text-blanco/95">
            {site.presentacion}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <BotonEnlace href="/contacto/?motivo=inscripcion">
              {inicio.hero.inscribir}
            </BotonEnlace>
            <BotonEnlace href="/apoyanos/" variante="blanco">
              {inicio.hero.apoyar}
            </BotonEnlace>
          </div>
        </div>
      </Container>
    </section>
  );
}
