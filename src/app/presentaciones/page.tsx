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
import { ListaPresentaciones } from "@/components/presentaciones/ListaPresentaciones";
import { Lightbox } from "@/components/ui/Lightbox";
import { AccionesPrincipales, PageHeader } from "@/components/ui/PageHeader";
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
  // Las notas de televisión viven en Logros; aquí solo el grupo en escena.
  const delGrupo = videos.filter((v) => !v.esMedios);

  return (
    <>
      <PageHeader
        titulo={t.titulo}
        etiqueta={t.etiqueta}
        intro={t.intro}
        foto={fotosSitio.grupoNavidad}
        acciones={<AccionesPrincipales />}
        atajos={[
          { texto: t.galeria, href: "#galeria" },
          { texto: t.videos, href: "#videos" },
          { texto: t.trayectoria, href: "#trayectoria" },
        ]}
      />

      <Section tituloId="galeria-titulo" id="galeria" capa>
        <EncabezadoSeccion
          id="galeria-titulo"
          antetitulo={t.galeria}
          titulo={t.galeriaTitulo}
          intro={fotos.length === 0 ? t.galeriaPendiente : undefined}
        />
        {fotos.length > 0 ? (
          <Lightbox fotos={fotos} titulo={t.galeria} className="mt-10" />
        ) : (
          // TODO(contenido): fotos de presentaciones en presentaciones.ts.
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
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

      <Section tituloId="videos-titulo" id="videos" fondo="tinta" capa>
        <EncabezadoSeccion
          id="videos-titulo"
          antetitulo={t.videos}
          titulo={t.videosTitulo}
          claro
        />
        <ul className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-2">
          {delGrupo.map((video) => (
            <li key={video.id}>
              <figure>
                <YouTubeLite id={video.id} titulo={video.titulo} />
                <figcaption className="mt-3 text-lg font-bold">
                  {video.titulo}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Section>

      <Section tituloId="trayectoria-titulo" id="trayectoria" fondo="cana" capa>
        <EncabezadoSeccion
          id="trayectoria-titulo"
          antetitulo={t.trayectoria}
          titulo={t.trayectoriaTitulo}
        />
        <ListaPresentaciones presentaciones={presentaciones} />
      </Section>
    </>
  );
}
