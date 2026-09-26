import { inicio } from "@/data/inicio";
import { logros, nombresTipoLogro } from "@/data/logros";
import { IconoLogro } from "@/components/logros/IconoLogro";
import { BotonEnlace } from "@/components/ui/Button";
import { EncabezadoSeccion, Section } from "@/components/ui/Section";

export function AchievementsPreview() {
  const destacados = logros
    .filter((l) => l.destacado)
    .sort((a, b) => b.anio - a.anio)
    .slice(0, 4);

  return (
    <Section tituloId="logros-titulo">
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <EncabezadoSeccion
            id="logros-titulo"
            titulo={inicio.logros.titulo}
            intro={inicio.logros.intro}
          />
          <BotonEnlace href="/logros/" variante="secundario" className="mt-8">
            {inicio.logros.enlace}
          </BotonEnlace>
        </div>
        <ul className="divide-y-2 divide-niebla border-y-2 border-niebla">
          {destacados.map((logro) => (
            <li
              key={logro.id}
              className="grid gap-2 py-7 sm:grid-cols-[7rem_1fr] sm:gap-8"
            >
              <p className="condensada text-5xl leading-none font-extrabold text-rojo">
                {logro.anio}
              </p>
              <div>
                <p className="flex items-center gap-2 text-base font-bold text-gris">
                  <IconoLogro tipo={logro.tipo} className="size-8" />
                  {nombresTipoLogro[logro.tipo]}
                </p>
                <h3 className="mt-2 text-2xl">{logro.titulo}</h3>
                {logro.detalle || logro.lugar ? (
                  <p className="mt-2">
                    {[logro.detalle, logro.lugar].filter(Boolean).join(" ")}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
