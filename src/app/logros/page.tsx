import type { Metadata } from "next";
import { metadatos } from "@/lib/metadatos";
import { logros, notaTrayectoria } from "@/data/logros";
import { fotos } from "@/data/fotos";
import { paginas } from "@/data/paginas";
import { videos } from "@/data/videos";
import { LineaTiempo } from "@/components/logros/LineaTiempo";
import { AccionesPrincipales, PageHeader } from "@/components/ui/PageHeader";
import { EncabezadoSeccion, Section } from "@/components/ui/Section";
import { YouTubeLite } from "@/components/ui/YouTubeLite";

const t = paginas.logros;

export const metadata: Metadata = metadatos(
  t.titulo,
  "Reconocimientos, galardones y participaciones del grupo de gaitas y tambores de la Fundación Armonía Diversa desde 2016.",
  "/logros/",
);

export default function LogrosPage() {
  const notasMedios = videos.filter((v) => v.esMedios);

  return (
    <>
      <PageHeader
        titulo={t.titulo}
        etiqueta={t.etiqueta}
        intro={t.intro}
        foto={fotos.cantoTarima}
        acciones={<AccionesPrincipales />}
        atajos={[
          { texto: t.lineaTiempo, href: "#linea-de-tiempo" },
          ...(notasMedios.length > 0
            ? [{ texto: t.medios, href: "#medios" }]
            : []),
        ]}
      />

      <Section tituloId="linea-titulo" id="linea-de-tiempo" capa>
        <EncabezadoSeccion
          id="linea-titulo"
          antetitulo={t.lineaTiempo}
          titulo={t.lineaTiempoTitulo}
        />
        <LineaTiempo logros={logros} />
        <p className="mt-10 medida text-lg">{notaTrayectoria}</p>
      </Section>

      {notasMedios.length > 0 ? (
        <Section tituloId="medios-titulo" id="medios" fondo="tinta" capa>
          <EncabezadoSeccion
            id="medios-titulo"
            antetitulo={t.medios}
            titulo={t.mediosTitulo}
            intro={t.mediosIntro}
            claro
          />
          <ul className="mt-12 grid gap-x-6 gap-y-10 lg:grid-cols-2">
            {notasMedios.map((video) => (
              <li key={video.id}>
                <figure>
                  <YouTubeLite id={video.id} titulo={video.titulo} />
                  <figcaption className="mt-3">
                    <span className="block text-xl font-bold">
                      {video.titulo}
                    </span>
                    <span className="text-blanco/80">
                      {video.descripcion ?? video.canal}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </>
  );
}
