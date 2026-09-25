import { inicio } from "@/data/inicio";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";

export function ImpactStats() {
  return (
    <section
      aria-labelledby="cifras-titulo"
      className="bg-blanco py-10 md:py-12"
    >
      <Container>
        <h2 id="cifras-titulo" className="sr-only">
          {inicio.cifras.titulo}
        </h2>
        <dl className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x-2 lg:divide-niebla">
          {site.cifras.map((cifra) => (
            <div
              key={cifra.texto}
              className="flex items-baseline gap-3 lg:flex-col lg:gap-1 lg:px-8 lg:first:pl-0"
            >
              <dt className="order-2 text-lg text-gris lg:order-2">
                {cifra.texto}
              </dt>
              <dd className="order-1 font-display text-4xl font-extrabold text-azul">
                {cifra.valor}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
