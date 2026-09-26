import Image from "next/image";
import { inicio } from "@/data/inicio";
import { fotosGaleria, fotosPendientesGaleria } from "@/data/presentaciones";
import { videos } from "@/data/videos";
import { BotonEnlace } from "@/components/ui/Button";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { EncabezadoSeccion, Section } from "@/components/ui/Section";
import { YouTubeLite } from "@/components/ui/YouTubeLite";

export function PerformancesPreview() {
  const fotos = fotosGaleria.slice(1, 3);
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
        <BotonEnlace href="/presentaciones/" variante="claro">
          {inicio.presentaciones.enlace}
        </BotonEnlace>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-12">
        {video ? (
          <figure className="lg:col-span-8">
            <YouTubeLite id={video.id} titulo={video.titulo} />
            <figcaption className="mt-4 text-lg text-blanco/90">
              {video.titulo}
            </figcaption>
          </figure>
        ) : null}
        <ul className="grid grid-cols-2 gap-5 lg:col-span-4 lg:grid-cols-1 lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]">
          {fotos.length > 0
            ? fotos.map((foto) => (
                <li key={foto.src}>
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    width={foto.ancho}
                    height={foto.alto}
                    sizes="(min-width: 1024px) 30vw, 50vw"
                    className="aspect-4/3 h-full w-full rounded-panel object-cover lg:aspect-auto"
                  />
                </li>
              ))
            : fotosPendientesGaleria.slice(0, 2).map((descripcion) => (
                <li key={descripcion}>
                  <PhotoPlaceholder
                    descripcion={descripcion}
                    tono="oscuro"
                    className="rounded-panel"
                  />
                </li>
              ))}
        </ul>
      </div>
    </Section>
  );
}
