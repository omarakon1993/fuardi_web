import Link from "next/link";
import { ayudasInicio, formasDeAyudar } from "@/data/apoyo";
import { inicio } from "@/data/inicio";
import { clasesColor, cx } from "@/lib/colores";
import type { ColorMarca } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { EncabezadoSeccion, Section } from "@/components/ui/Section";

// Donar lleva a /apoyanos, donde están los datos para hacerlo.
const destino = (id: string, href: string) =>
  id === "donar" ? "/apoyanos/#donar" : href;

// Cada forma de ayudar es una pieza de color del rompecabezas.
const colores: ColorMarca[] = ["rojo", "amarillo", "verde", "magenta", "azul"];

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
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {formas.map((forma, i) => {
          const color = clasesColor[colores[i % colores.length]];
          const principal = i === 0;
          return (
            <li
              key={forma.id}
              className={cx(
                "group relative flex flex-col rounded-foto p-7 sm:p-8",
                color.fondo,
                color.sobreFondo,
                principal && "sm:col-span-2 lg:p-10",
              )}
            >
              <Icon nombre={forma.icono} tamano={principal ? 48 : 36} />
              <h3
                className={cx(
                  "mt-6",
                  principal ? "text-4xl sm:text-5xl" : "text-3xl",
                )}
              >
                {forma.titulo}
              </h3>
              <p className={cx("mt-3", principal ? "text-xl" : "text-lg")}>
                {forma.resumen}
              </p>
              <Link
                href={destino(forma.id, forma.href)}
                className="mt-auto inline-flex min-h-11 items-center self-start pt-6 font-bold underline decoration-2 underline-offset-4 group-hover:decoration-4 after:absolute after:inset-0 after:rounded-foto"
              >
                {forma.boton}
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
