import type { Metadata } from "next";
import { metadatos } from "@/lib/metadatos";
import { fotos as fotosSitio } from "@/data/fotos";
import { paginas } from "@/data/paginas";
import {
  fotosGaleria,
  fotosPendientesGaleria,
  presentaciones,
} from "@/data/presentaciones";
import { videos } from "@/data/videos";
import { AccionesPrincipales, Sumate } from "@/components/layout/Sumate";
import { ListaPresentaciones } from "@/components/presentaciones/ListaPresentaciones";
import { Lightbox } from "@/components/ui/Lightbox";
import { PageHeader } from "@/components/ui/PageHeader";
import { PatternBand } from "@/components/ui/PatternBand";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { EncabezadoSeccion, Section } from "@/components/ui/Section";
import { YouTubeLite } from "@/components/ui/YouTubeLite";

const t = paginas.presentaciones;

export const metadata: Metadata = metadatos(
  t.titulo,
  "Presentaciones y salidas del grupo de gaitas y tambores de la Fundación Armonía Diversa: festivales en Bogotá, Bolívar, Cundinamarca y Sucre.",
  "/presentaciones/",
);

export default function PresentacionesPage() {
  const fotos = fotosGaleria;

  return (
    <>
      <PageHeader
        titulo={t.titulo}
        intro={t.intro}
        foto={fotosSitio.grupoNavidad}
        acciones={<AccionesPrincipales />}
        atajos={[
          { texto: t.videos, href: "#videos" },
          { texto: t.galeria, href: "#galeria" },
          { texto: t.trayectoria, href: "#trayectoria" },
        ]}
      />

      <Section tituloId="videos-titulo" id="videos" fondo="tinta">
        <EncabezadoSeccion id="videos-titulo" titulo={t.videos} claro />
        <ul className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-2">
          {videos.map((video, i) => (
            <li key={video.id} className={i === 0 ? "md:col-span-2" : ""}>
              <figure>
                <YouTubeLite id={video.id} titulo={video.titulo} />
                <figcaption className="mt-3">
                  <span className="block text-xl font-bold">
                    {video.titulo}
                  </span>
                  <span className="text-blanco/90">{video.canal}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Section>

      <Section tituloId="galeria-titulo" id="galeria">
        <EncabezadoSeccion
          id="galeria-titulo"
          titulo={t.galeria}
          intro={fotos.length === 0 ? t.galeriaPendiente : undefined}
        />
        {fotos.length > 0 ? (
          <Lightbox fotos={fotos} titulo={t.galeria} className="mt-8" />
        ) : (
          // TODO(contenido): fotos de presentaciones en presentaciones.ts.
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {fotosPendientesGaleria.map((descripcion) => (
              <li key={descripcion}>
                <PhotoPlaceholder
                  descripcion={descripcion}
                  className="rounded-panel"
                />
              </li>
            ))}
          </ul>
        )}
      </Section>

      <PatternBand />

      <Section tituloId="trayectoria-titulo" id="trayectoria" fondo="niebla">
        <EncabezadoSeccion id="trayectoria-titulo" titulo={t.trayectoria} />
        <ListaPresentaciones presentaciones={presentaciones} />
      </Section>

      <Sumate />
    </>
  );
}
