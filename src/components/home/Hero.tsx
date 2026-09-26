import Image from "next/image";
import { fotos } from "@/data/fotos";
import { inicio } from "@/data/inicio";
import { site } from "@/data/site";
import { BotonEnlace } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

/** Separa el lema alrededor de la palabra que va resaltada. */
function partesLema() {
  const { lema } = site;
  const palabra = inicio.hero.lemaResaltado;
  const i = lema.indexOf(palabra);
  if (i < 0) return { antes: lema, palabra: "", despues: "" };
  return {
    antes: lema.slice(0, i).trim(),
    palabra,
    despues: lema.slice(i + palabra.length),
  };
}

export function Hero() {
  const foto = site.heroFoto;
  const { antes, palabra, despues } = partesLema();
  const { cifra } = inicio.hero;

  return (
    <section
      aria-labelledby="hero-titulo"
      className="overflow-hidden bg-tinta pt-12 pb-24 text-blanco md:pt-16 lg:pb-32"
    >
      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
        <div className="motion-safe:animate-entrada">
          <p className="inline-flex items-center gap-2.5 rounded-full bg-blanco/10 px-4 py-1.5 text-base font-bold">
            <span aria-hidden="true" className="size-2 rounded-full bg-rojo" />
            {inicio.hero.etiqueta}
          </p>
          <h1 id="hero-titulo" className="mt-6 text-cartel">
            <span className="block">{antes}</span>
            {palabra ? (
              <em className="mr-[0.1em] text-cana italic">{palabra}</em>
            ) : null}
            {despues}
          </h1>
          <p className="mt-7 max-w-136 text-entrada text-blanco/90">
            {site.presentacion}
          </p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
            <BotonEnlace href="/contacto/?motivo=inscripcion" variante="blanco">
              {inicio.hero.inscribir}
            </BotonEnlace>
            <BotonEnlace href="/apoyanos/" variante="textoClaro">
              {inicio.hero.apoyar}
            </BotonEnlace>
          </div>
        </div>

        <div className="relative pb-10 pl-6 sm:pl-12 lg:pl-8">
          {foto ? (
            <Image
              src={foto.src}
              alt={foto.alt}
              width={foto.ancho}
              height={foto.alto}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-5/4 w-full rounded-[10rem_2rem_2rem_2rem] object-cover sm:rounded-[15rem_2rem_2rem_2rem]"
            />
          ) : (
            <PhotoPlaceholder
              descripcion={inicio.hero.fotoPendiente}
              proporcion="4/3"
              tono="oscuro"
              className="rounded-[15rem_2rem_2rem_2rem]"
            />
          )}
          <Image
            src={fotos.danza.src}
            alt={fotos.danza.alt}
            width={fotos.danza.ancho}
            height={fotos.danza.alto}
            sizes="15rem"
            className="absolute bottom-0 left-0 size-36 rounded-full border-8 border-tinta object-cover sm:size-56"
          />
          <p className="absolute -top-5 right-0 rounded-panel bg-rojo px-5 py-4 shadow-2xl sm:-right-2">
            <span className="block condensada text-5xl leading-none font-extrabold">
              {cifra.valor}
            </span>
            <span className="mt-1 block text-base font-bold">
              {cifra.texto}
            </span>
          </p>
        </div>
      </Container>
    </section>
  );
}
