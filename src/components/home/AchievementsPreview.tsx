import { inicio } from "@/data/inicio";
import { logros } from "@/data/logros";
import { cx } from "@/lib/colores";
import { BotonEnlace } from "@/components/ui/Button";
import { Revelar } from "@/components/ui/Revelar";
import { EncabezadoSeccion, Section } from "@/components/ui/Section";

// Color del borde de cada punto de la línea de tiempo.
const puntos = [
  "border-rojo",
  "border-tinta",
  "border-verde",
  "border-magenta",
];

/** Línea de tiempo horizontal con los cuatro logros destacados más recientes. */
export function AchievementsPreview() {
  const t = inicio.logros;
  const destacados = logros
    .filter((l) => l.destacado)
    .sort((a, b) => b.anio - a.anio)
    .slice(0, 4)
    .reverse();

  return (
    <Section tituloId="logros-titulo" capa>
      <EncabezadoSeccion
        id="logros-titulo"
        antetitulo={t.antetitulo}
        titulo={t.titulo}
      />
      {/* La línea que une los puntos (::before) solo aparece cuando van en fila. */}
      <ol className="relative mt-12 grid gap-10 before:absolute before:inset-x-0 before:top-3 before:hidden before:h-0.5 before:bg-tinta/15 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:before:block">
        {destacados.map((logro, i) => (
          <Revelar
            as="li"
            key={logro.id}
            className={cx("relative pt-12", i % 2 === 1 && "lg:mt-10")}
          >
            <span
              aria-hidden="true"
              className={cx(
                "absolute top-0 left-0 size-6 rounded-full border-4 bg-blanco",
                i % 2 === 1 && "lg:-top-10",
                puntos[i % puntos.length],
              )}
            />
            <p className="condensada text-5xl leading-none font-extrabold">
              {logro.anio}
            </p>
            <h3 className="mt-3 font-sans text-lg leading-snug font-bold font-stretch-100%">
              {logro.titulo}
            </h3>
            {logro.lugar ? (
              <p className="mt-2 text-base text-gris">{logro.lugar}</p>
            ) : null}
          </Revelar>
        ))}
      </ol>
      <BotonEnlace href="/logros/" variante="texto" className="mt-10">
        {t.enlace}
      </BotonEnlace>
    </Section>
  );
}
