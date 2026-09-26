import type { ReactNode } from "react";
import { cx } from "@/lib/colores";
import { Container } from "./Container";
import { Revelar } from "./Revelar";

const fondos = {
  blanco: "bg-blanco text-tinta",
  cana: "bg-cana text-tinta",
  tinta: "bg-tinta text-blanco",
} as const;

export type FondoSeccion = keyof typeof fondos;

interface SectionProps {
  /** Id del encabezado que nombra la sección (aria-labelledby). */
  tituloId: string;
  id?: string;
  fondo?: FondoSeccion;
  /**
   * Se monta sobre la sección anterior con esquinas superiores redondeadas,
   * como capas apiladas.
   */
  capa?: boolean;
  children: ReactNode;
  className?: string;
  /** Sin Container interno, para bloques a sangre. */
  sinContenedor?: boolean;
}

export function Section({
  tituloId,
  id,
  fondo = "blanco",
  capa,
  children,
  className,
  sinContenedor,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={tituloId}
      className={cx(
        "pt-16 pb-28 md:pt-20 md:pb-32",
        capa && "relative -mt-14 rounded-t-capa",
        fondos[fondo],
        className,
      )}
    >
      {sinContenedor ? children : <Container>{children}</Container>}
    </section>
  );
}

interface EncabezadoProps {
  id: string;
  titulo: string;
  /** Texto corto en mayúsculas sobre el titular. */
  antetitulo?: string;
  intro?: ReactNode;
  className?: string;
  /** Colores para fondos oscuros. */
  claro?: boolean;
}

/** Antetítulo + h2 + entrada de una sección. Aparece al hacer scroll. */
export function EncabezadoSeccion({
  id,
  titulo,
  antetitulo,
  intro,
  className,
  claro,
}: EncabezadoProps) {
  return (
    <Revelar className={cx("max-w-3xl", className)}>
      {antetitulo ? (
        <p className={cx("mb-4 antetitulo", claro ? "text-cana" : "text-rojo")}>
          {antetitulo}
        </p>
      ) : null}
      <h2 id={id} className="text-seccion">
        {titulo}
      </h2>
      {intro ? (
        <p
          className={cx(
            "mt-5 medida text-entrada",
            claro ? "text-blanco/90" : "text-gris",
          )}
        >
          {intro}
        </p>
      ) : null}
    </Revelar>
  );
}
