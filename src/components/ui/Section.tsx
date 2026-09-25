import type { ReactNode } from "react";
import { cx } from "@/lib/colores";
import { Container } from "./Container";

const fondos = {
  blanco: "bg-blanco text-tinta",
  niebla: "bg-niebla text-tinta",
  cana: "bg-cana text-tinta",
  azul: "bg-azul text-blanco",
  tinta: "bg-tinta text-blanco",
} as const;

interface SectionProps {
  /** Id del encabezado que nombra la sección (aria-labelledby). */
  tituloId: string;
  id?: string;
  fondo?: keyof typeof fondos;
  children: ReactNode;
  className?: string;
  /** Sin Container interno, para bloques a sangre. */
  sinContenedor?: boolean;
}

export function Section({
  tituloId,
  id,
  fondo = "blanco",
  children,
  className,
  sinContenedor,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={tituloId}
      className={cx("scroll-mt-4 py-16 md:py-24", fondos[fondo], className)}
    >
      {sinContenedor ? children : <Container>{children}</Container>}
    </section>
  );
}

interface EncabezadoProps {
  id: string;
  titulo: string;
  intro?: ReactNode;
  className?: string;
  /** Color del texto de la intro sobre fondos oscuros. */
  claro?: boolean;
}

/** Título h2 + entrada de una sección. */
export function EncabezadoSeccion({
  id,
  titulo,
  intro,
  className,
  claro,
}: EncabezadoProps) {
  return (
    <div className={cx("medida", className)}>
      <h2 id={id} className="text-3xl sm:text-4xl">
        {titulo}
      </h2>
      {intro ? (
        <p className={cx("mt-4 text-lg", claro ? "text-blanco" : "text-gris")}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}
