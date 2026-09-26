import Image from "next/image";
import { inicio } from "@/data/inicio";
import { site } from "@/data/site";
import { cx } from "@/lib/colores";
import { BotonEnlace } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Revelar } from "@/components/ui/Revelar";

/** Etiqueta visible solo en desarrollo para recordar que el texto no es final. */
export function EtiquetaTemporal() {
  if (process.env.NODE_ENV !== "development" || !site.misionVisionTemporales)
    return null;
  return (
    <span className="ml-2 inline-block rounded bg-amarillo px-2 py-0.5 align-middle font-sans text-sm font-bold text-tinta">
      Temporal
    </span>
  );
}

export function AboutPreview() {
  const t = inicio.nosotros;
  const foto = site.historiaFoto;

  return (
    <section
      aria-labelledby="nosotros-titulo"
      className="bg-blanco pt-14 pb-28 md:pt-20 md:pb-32"
    >
      <Container>
        {/* Las cifras de la fundación, dichas como una frase. */}
        <Revelar>
          <p className="max-w-4xl font-display text-frase font-bold font-stretch-85%">
            {t.frase.map((trozo) => (
              <span
                key={trozo.texto}
                className={cx(trozo.resaltado && "text-rojo")}
              >
                {trozo.texto}
              </span>
            ))}
          </p>
        </Revelar>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {foto ? (
            <Revelar>
              <Image
                src={foto.src}
                alt={foto.alt}
                width={foto.ancho}
                height={foto.alto}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-4/3 w-full rounded-[2rem_2rem_2rem_10rem] object-cover"
              />
            </Revelar>
          ) : null}
          <Revelar>
            <p className="antetitulo text-rojo">{t.antetitulo}</p>
            <h2 id="nosotros-titulo" className="mt-4 text-seccion">
              {t.titulo}
            </h2>
            <p className="mt-6 medida text-entrada text-gris">
              {site.resenaCorta}
            </p>
            <div className="mt-8 rounded-panel bg-cana p-6 sm:p-7">
              <h3 className="antetitulo text-rojo font-stretch-100%">
                {t.mision}
                <EtiquetaTemporal />
              </h3>
              <p className="mt-3">{site.mision}</p>
            </div>
            <BotonEnlace href="/nosotros/" variante="texto" className="mt-6">
              {t.enlace}
            </BotonEnlace>
          </Revelar>
        </div>
      </Container>
    </section>
  );
}
