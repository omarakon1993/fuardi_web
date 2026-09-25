import Image from "next/image";
import { inicio } from "@/data/inicio";
import { fotosPendientesGaleria, presentaciones } from "@/data/presentaciones";
import { videos } from "@/data/videos";
import { BotonEnlace } from "@/components/ui/Button";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { EncabezadoSeccion, Section } from "@/components/ui/Section";
import { YouTubeLite } from "@/components/ui/YouTubeLite";

export function PerformancesPreview() {
  const fotos = presentaciones.flatMap((p) => p.fotos).slice(0, 4);
  const video = videos.find((v) => !v.esMedios) ?? videos[0];

  return (
    <Section tituloId="tarima-titulo" fondo="tinta">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <EncabezadoSeccion
          id="tarima-titulo"
          titulo={inicio.presentaciones.titulo}
          intro={inicio.presentaciones.intro}
          claro
        />
        <BotonEnlace
          href="/presentaciones/"
          variante="texto"
          className="text-blanco! hover:decoration-amarillo"
        >
          {inicio.presentaciones.enlace}
        </BotonEnlace>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {video ? (
          <figure>
            <YouTubeLite id={video.id} titulo={video.titulo} />
            <figcaption className="mt-3 text-lg">{video.titulo}</figcaption>
          </figure>
        ) : null}
        <ul className="grid grid-cols-2 gap-4">
          {fotos.length > 0
            ? fotos.map((foto) => (
                <li key={foto.src}>
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    width={foto.ancho}
                    height={foto.alto}
                    className="aspect-[4/3] w-full rounded-lg object-cover"
                  />
                </li>
              ))
            : fotosPendientesGaleria.slice(0, 4).map((descripcion) => (
                <li key={descripcion}>
                  <PhotoPlaceholder
                    descripcion={descripcion}
                    tono="oscuro"
                    className="rounded-lg"
                  />
                </li>
              ))}
        </ul>
      </div>
    </Section>
  );
}
