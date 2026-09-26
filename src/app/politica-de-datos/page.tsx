import type { Metadata } from "next";
import { metadatos } from "@/lib/metadatos";
import { politica } from "@/data/politica";
import { formatFecha } from "@/lib/fechas";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = metadatos(
  "Política de tratamiento de datos",
  "Cómo la Fundación Armonía Diversa trata los datos personales, según la Ley 1581 de 2012.",
  "/politica-de-datos/",
);

export default function PoliticaDeDatosPage() {
  return (
    <>
      <PageHeader titulo={politica.titulo} />
      <div className="relative -mt-14 rounded-t-capa bg-blanco pt-16 pb-28 md:pt-20 md:pb-32">
        <Container>
          <div className="max-w-3xl">
            <p
              role="note"
              className="flex gap-3 rounded-panel border-2 border-amarillo bg-amarillo/15 p-5 text-lg"
            >
              <Icon nombre="alerta" className="mt-1 shrink-0" />
              <span>{politica.aviso}</span>
            </p>

            <p className="mt-8 text-xl">{politica.intro}</p>

            <nav aria-labelledby="indice-politica" className="mt-8">
              <h2 id="indice-politica" className="text-xl">
                Contenido
              </h2>
              <ul className="mt-3 space-y-1">
                {politica.secciones.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="inline-flex min-h-11 items-center text-tinta underline decoration-2 underline-offset-4"
                    >
                      {s.titulo}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {politica.secciones.map((s) => (
              <section
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-titulo`}
                className="mt-12 scroll-mt-4"
              >
                <h2 id={`${s.id}-titulo`} className="text-3xl">
                  {s.titulo}
                </h2>
                {"parrafos" in s && s.parrafos
                  ? s.parrafos.map((p) => (
                      <p key={p.slice(0, 30)} className="mt-4 text-lg">
                        {p}
                      </p>
                    ))
                  : null}
                {"lista" in s && s.lista ? (
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-lg marker:text-rojo">
                    {s.lista.map((item) => (
                      <li key={item.slice(0, 30)}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {"cierre" in s && s.cierre
                  ? s.cierre.map((p) => (
                      <p key={p.slice(0, 30)} className="mt-4 text-lg">
                        {p}
                      </p>
                    ))
                  : null}
              </section>
            ))}

            <p className="mt-12 text-gris">
              Vigente desde el {formatFecha(politica.vigencia)}.
            </p>
          </div>
        </Container>
      </div>
    </>
  );
}
