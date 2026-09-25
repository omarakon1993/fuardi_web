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
          <BotonEnlace href="/logros/" variante="texto" className="mt-6">
            {inicio.logros.enlace}
          </BotonEnlace>
        </div>
        <ul className="divide-y-2 divide-niebla border-y-2 border-niebla">
          {destacados.map((logro) => (
            <li key={logro.id} className="flex gap-5 py-6">
              <IconoLogro tipo={logro.tipo} />
              <div>
                <p className="text-base font-bold text-gris">
                  {logro.anio} · {nombresTipoLogro[logro.tipo]}
                </p>
                <h3 className="mt-1 text-2xl">{logro.titulo}</h3>
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
