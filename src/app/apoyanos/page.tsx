import type { Metadata } from "next";
import { metadatos } from "@/lib/metadatos";
import Image from "next/image";
import { formasDeAyudar } from "@/data/apoyo";
import { paginas } from "@/data/paginas";
import { fotos } from "@/data/fotos";
import { mensajesWhatsApp, site } from "@/data/site";
import { enlaceWhatsApp } from "@/lib/whatsapp";
import { clasesColor, cx } from "@/lib/colores";
import type { ColorMarca } from "@/lib/types";
import { BotonEnlace } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { PatternBand } from "@/components/ui/PatternBand";

const t = paginas.apoyanos;

// Cada forma de ayudar lleva un color del rompecabezas, igual que en el inicio.
const colores: ColorMarca[] = ["rojo", "amarillo", "verde", "magenta", "azul"];

export const metadata: Metadata = metadatos(
  t.titulo,
  "Apoya a la Fundación Armonía Diversa: dona, sé voluntario, contrata una presentación del grupo de gaitas y tambores o haz una alianza.",
  "/apoyanos/",
);

function DatosDonacion() {
  const { cuentas, qr } = site.donaciones;
  return (
    <div className="mt-8 rounded-panel bg-blanco p-6 ring-1 ring-tinta/10">
      <h3 className="text-xl">{t.datosDonacion}</h3>
      {cuentas.length === 0 && !qr ? (
        // TODO(contenido): cuentas, Nequi, Daviplata y QR en site.ts.
        <p className="mt-2">{t.datosPendientes}</p>
      ) : (
        <div className="mt-4 flex flex-wrap gap-8">
          <dl className="space-y-4">
            {cuentas.map((c) => (
              <div key={c.medio + c.numero}>
                <dt className="font-bold">{c.medio}</dt>
                <dd>
                  {c.tipo ? `${c.tipo} ` : ""}
                  <span className="font-mono text-xl">{c.numero}</span>
                  <br />A nombre de {c.titular}
                </dd>
              </div>
            ))}
          </dl>
          {qr ? (
            <Image
              src={qr.src}
              alt={qr.alt}
              width={qr.ancho}
              height={qr.alto}
              className="size-48"
            />
          ) : null}
        </div>
      )}
    </div>
  );
}

export default function ApoyanosPage() {
  return (
    <>
      <PageHeader
        titulo={t.titulo}
        intro={t.intro}
        foto={fotos.playland}
        acciones={
          <>
            <BotonEnlace href={formasDeAyudar[0].href}>
              {formasDeAyudar[0].boton}
            </BotonEnlace>
            <BotonEnlace
              href={enlaceWhatsApp(mensajesWhatsApp.donacion)}
              variante="blanco"
              icono="whatsapp"
            >
              {t.whatsapp}
            </BotonEnlace>
          </>
        }
        atajos={formasDeAyudar.map((f) => ({
          texto: f.titulo,
          href: `#${f.id}`,
        }))}
      />

      <section aria-labelledby="formas-titulo">
        <h2 id="formas-titulo" className="sr-only">
          {t.formas}
        </h2>
        {formasDeAyudar.map((forma, i) => {
          const color = clasesColor[colores[i % colores.length]];
          return (
            <div
              key={forma.id}
              id={forma.id}
              className={cx(
                "scroll-mt-4 py-16 md:py-24",
                i % 2 === 0 ? "bg-blanco" : "bg-niebla",
              )}
            >
              <Container className="grid gap-8 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-16">
                <div
                  className={cx(
                    "flex min-h-64 flex-col justify-between gap-10 rounded-foto p-8 sm:p-10",
                    color.fondo,
                    color.sobreFondo,
                  )}
                >
                  <Icon nombre={forma.icono} tamano={48} />
                  <h3 className="text-5xl [font-stretch:78%] sm:text-6xl">
                    {forma.titulo}
                  </h3>
                </div>
                <div className="medida">
                  <p className="text-entrada font-bold">{forma.resumen}</p>
                  {forma.detalle.map((p) => (
                    <p key={p.slice(0, 30)} className="mt-4 text-xl">
                      {p}
                    </p>
                  ))}
                  {forma.id === "donar" ? <DatosDonacion /> : null}
                  <BotonEnlace href={forma.href} className="mt-8">
                    {forma.boton}
                  </BotonEnlace>
                </div>
              </Container>
            </div>
          );
        })}
      </section>

      <PatternBand />

      <section
        aria-labelledby="transparencia-titulo"
        className="bg-cana py-20 md:py-28"
      >
        <Container>
          <h2 id="transparencia-titulo" className="max-w-3xl text-seccion">
            {t.transparencia}
          </h2>
          <p className="mt-5 medida text-entrada">{t.transparenciaTexto}</p>
          <BotonEnlace
            href="/nosotros/#transparencia"
            variante="secundario"
            className="mt-8"
          >
            {t.transparenciaEnlace}
          </BotonEnlace>
        </Container>
      </section>
    </>
  );
}
