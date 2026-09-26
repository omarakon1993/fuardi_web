import type { Metadata } from "next";
import Image from "next/image";
import { formasDeAyudar } from "@/data/apoyo";
import { fotos } from "@/data/fotos";
import { paginas } from "@/data/paginas";
import { mensajesWhatsApp, site } from "@/data/site";
import { clasesColor, cx } from "@/lib/colores";
import { metadatos } from "@/lib/metadatos";
import type { ColorMarca } from "@/lib/types";
import { enlaceWhatsApp } from "@/lib/whatsapp";
import { BotonEnlace } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { Revelar } from "@/components/ui/Revelar";
import { EncabezadoSeccion, Section } from "@/components/ui/Section";

const t = paginas.apoyanos;

// Color del ícono de cada forma de ayudar (después de donar).
const colores: ColorMarca[] = ["naranja", "verde", "magenta", "tinta"];

export const metadata: Metadata = metadatos(
  t.titulo,
  "Apoya a la Fundación Armonía Diversa: dona, sé voluntario, contrata una presentación del grupo de gaitas y tambores o haz una alianza.",
  "/apoyanos/",
);

function DatosDonacion() {
  const { cuentas, qr } = site.donaciones;
  return (
    <div className="mt-6 rounded-panel bg-blanco/10 p-6">
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
  const [donar, ...otras] = formasDeAyudar;

  return (
    <>
      <PageHeader
        titulo={t.titulo}
        etiqueta={t.etiqueta}
        intro={t.intro}
        foto={fotos.playland}
        acciones={
          <>
            <BotonEnlace href={donar.href}>{donar.boton}</BotonEnlace>
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

      <Section tituloId="formas-titulo" capa>
        <EncabezadoSeccion
          id="formas-titulo"
          antetitulo={t.formas}
          titulo={t.formasTitulo}
        />
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Revelar
            as="li"
            id={donar.id}
            className="flex flex-col rounded-foto bg-tinta p-8 text-blanco sm:p-10 md:col-span-2"
          >
            <span
              aria-hidden="true"
              className="inline-flex size-14 items-center justify-center rounded-full bg-rojo"
            >
              <Icon nombre={donar.icono} tamano={28} />
            </span>
            <h3 className="mt-6 text-4xl font-stretch-78% sm:text-5xl">
              {donar.titulo}
            </h3>
            <p className="mt-3 text-entrada font-bold">{donar.resumen}</p>
            {donar.detalle.map((p) => (
              <p key={p.slice(0, 30)} className="mt-3 text-blanco/90">
                {p}
              </p>
            ))}
            <DatosDonacion />
            <BotonEnlace
              href={donar.href}
              variante="blanco"
              className="mt-8 self-start"
            >
              {donar.boton}
            </BotonEnlace>
          </Revelar>

          {otras.map((forma, i) => {
            const color = clasesColor[colores[i % colores.length]];
            return (
              <Revelar
                as="li"
                key={forma.id}
                id={forma.id}
                className="flex flex-col rounded-foto bg-cana p-8"
              >
                <span
                  aria-hidden="true"
                  className={cx(
                    "inline-flex size-12 items-center justify-center rounded-full",
                    color.fondo,
                    color.sobreFondo,
                  )}
                >
                  <Icon nombre={forma.icono} tamano={24} />
                </span>
                <h3 className="mt-5 text-3xl">{forma.titulo}</h3>
                <p className="mt-2 font-bold">{forma.resumen}</p>
                {forma.detalle.map((p) => (
                  <p key={p.slice(0, 30)} className="mt-2 text-base text-gris">
                    {p}
                  </p>
                ))}
                <div className="mt-auto pt-6">
                  <BotonEnlace href={forma.href} variante="secundario">
                    {forma.boton}
                  </BotonEnlace>
                </div>
              </Revelar>
            );
          })}
        </ul>

        <Revelar className="mt-12 flex flex-col gap-4 rounded-foto border-2 border-cana p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h3 className="text-2xl">{t.transparencia}</h3>
            <p className="mt-1 text-gris">
              {t.transparenciaTexto}
              {site.nit ? ` NIT ${site.nit}.` : null}
            </p>
          </div>
          <BotonEnlace
            href="/nosotros/#transparencia"
            variante="texto"
            className="shrink-0"
          >
            {t.transparenciaEnlace}
          </BotonEnlace>
        </Revelar>
      </Section>
    </>
  );
}
