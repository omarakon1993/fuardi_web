import type { Metadata } from "next";
import Image from "next/image";
import { formasDeAyudar } from "@/data/apoyo";
import { paginas } from "@/data/paginas";
import { site } from "@/data/site";
import { cx } from "@/lib/colores";
import { BotonEnlace } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { PatternBand } from "@/components/ui/PatternBand";

const t = paginas.apoyanos;

export const metadata: Metadata = {
  title: t.titulo,
  description:
    "Apoya a la Fundación Armonía Diversa: dona, sé voluntario, contrata una presentación del grupo de gaitas y tambores o haz una alianza.",
};

function DatosDonacion() {
  const { cuentas, qr } = site.donaciones;
  return (
    <div className="mt-6 rounded-xl bg-blanco p-6 ring-1 ring-tinta/10">
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
      <PageHeader titulo={t.titulo} intro={t.intro} />

      <section aria-labelledby="formas-titulo">
        <h2 id="formas-titulo" className="sr-only">
          {t.formas}
        </h2>
        {formasDeAyudar.map((forma, i) => (
          <div
            key={forma.id}
            id={forma.id}
            className={cx(
              "scroll-mt-4 py-14 md:py-20",
              i % 2 === 0 ? "bg-blanco" : "bg-niebla",
            )}
          >
            <Container className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-10">
              <span
                aria-hidden="true"
                className="inline-flex size-20 items-center justify-center rounded-full bg-rojo text-blanco"
              >
                <Icon nombre={forma.icono} tamano={40} />
              </span>
              <div className="medida">
                <h3 className="text-3xl sm:text-4xl">{forma.titulo}</h3>
                <p className="mt-3 text-xl font-bold">{forma.resumen}</p>
                {forma.detalle.map((p) => (
                  <p key={p.slice(0, 30)} className="mt-3 text-lg">
                    {p}
                  </p>
                ))}
                {forma.id === "donar" ? <DatosDonacion /> : null}
                <BotonEnlace href={forma.href} className="mt-6">
                  {forma.boton}
                </BotonEnlace>
              </div>
            </Container>
          </div>
        ))}
      </section>

      <PatternBand />

      <section
        aria-labelledby="transparencia-titulo"
        className="bg-cana py-14 md:py-20"
      >
        <Container className="medida">
          <h2 id="transparencia-titulo" className="text-3xl">
            {t.transparencia}
          </h2>
          <p className="mt-3 text-lg">{t.transparenciaTexto}</p>
          <BotonEnlace
            href="/nosotros/#transparencia"
            variante="secundario"
            className="mt-6"
          >
            {t.transparenciaEnlace}
          </BotonEnlace>
        </Container>
      </section>
    </>
  );
}
