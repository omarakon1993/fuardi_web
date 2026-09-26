import { botonesDestacados } from "@/data/navegacion";
import { sumate } from "@/data/sumate";
import { cx } from "@/lib/colores";
import { BotonEnlace } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { RedesSociales } from "./RedesSociales";

const bordes = {
  rojo: "border-rojo",
  amarillo: "border-amarillo",
  verde: "border-verde",
  azul: "border-blanco",
  magenta: "border-magenta",
  naranja: "border-naranja",
} as const;

/**
 * Cierre de cada página interna: la invitación a sumarse, con un camino para
 * familias, otro para quienes aportan y otro para la comunidad.
 */
export function Sumate() {
  return (
    <section
      aria-labelledby="sumate-titulo"
      className="bg-azul py-20 text-blanco md:py-28"
    >
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <h2 id="sumate-titulo" className="text-titular">
            {sumate.titulo}
          </h2>
          <p className="mt-6 medida text-entrada text-blanco/90">
            {sumate.intro}
          </p>
          <RedesSociales claro className="mt-8" />
        </div>
        <ul className="grid gap-8">
          {sumate.caminos.map((camino) => (
            <li
              key={camino.id}
              className={cx(
                "grid gap-4 border-t-4 pt-6 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-8",
                bordes[camino.color],
              )}
            >
              <div>
                <h3 className="text-3xl">{camino.quien}</h3>
                <p className="mt-2 medida text-lg text-blanco/90">
                  {camino.detalle}
                </p>
              </div>
              <BotonEnlace href={camino.href} variante="blanco">
                {camino.texto}
              </BotonEnlace>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** Los dos botones principales del sitio, para las portadas de las páginas. */
export function AccionesPrincipales() {
  return (
    <>
      <BotonEnlace href={botonesDestacados.inscribirse.href}>
        {botonesDestacados.inscribirse.texto}
      </BotonEnlace>
      <BotonEnlace href={botonesDestacados.apoyar.href} variante="blanco">
        {botonesDestacados.apoyar.texto}
      </BotonEnlace>
    </>
  );
}
