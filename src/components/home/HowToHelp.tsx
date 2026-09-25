import Link from "next/link";
import { ayudasInicio, formasDeAyudar } from "@/data/apoyo";
import { inicio } from "@/data/inicio";
import { Icon } from "@/components/ui/Icon";
import { EncabezadoSeccion, Section } from "@/components/ui/Section";

// Donar lleva a /apoyanos, donde están los datos para hacerlo.
const destino = (id: string, href: string) =>
  id === "donar" ? "/apoyanos/#donar" : href;

export function HowToHelp() {
  const formas = ayudasInicio
    .map((id) => formasDeAyudar.find((f) => f.id === id))
    .filter((f) => f !== undefined);

  return (
    <Section tituloId="ayudar-titulo" fondo="cana">
      <EncabezadoSeccion
        id="ayudar-titulo"
        titulo={inicio.ayudar.titulo}
        intro={inicio.ayudar.intro}
      />
      <ul className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
        {formas.map((forma) => (
          <li key={forma.id} className="flex gap-5">
            <span
              aria-hidden="true"
              className="inline-flex size-16 shrink-0 items-center justify-center rounded-full bg-rojo text-blanco"
            >
              <Icon nombre={forma.icono} tamano={30} />
            </span>
            <div>
              <h3 className="text-2xl">{forma.titulo}</h3>
              <p className="mt-2">{forma.resumen}</p>
              <Link
                href={destino(forma.id, forma.href)}
                className="mt-2 inline-flex min-h-11 items-center font-bold text-azul underline decoration-2 underline-offset-4 hover:decoration-rojo"
              >
                {forma.boton}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
