import { inicio } from "@/data/inicio";
import { site } from "@/data/site";
import { cx } from "@/lib/colores";
import { Container } from "@/components/ui/Container";

// Cada cifra toma un color del rompecabezas del logo (todos cumplen AA sobre blanco).
const colores = ["text-azul", "text-rojo", "text-verde", "text-magenta"];

export function ImpactStats() {
  return (
    <section
      aria-labelledby="cifras-titulo"
      className="bg-blanco py-14 md:py-20"
    >
      <Container>
        <h2 id="cifras-titulo" className="sr-only">
          {inicio.cifras.titulo}
        </h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {site.cifras.map((cifra, i) => (
            <div key={cifra.texto} className="flex flex-col">
              <dt className="order-2 mt-2 max-w-[22ch] text-lg text-gris">
                {cifra.texto}
              </dt>
              <dd
                className={cx(
                  "order-1 condensada text-seccion font-extrabold",
                  colores[i % colores.length],
                )}
              >
                {cifra.valor}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
