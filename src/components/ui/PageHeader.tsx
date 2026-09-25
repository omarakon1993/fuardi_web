import type { ReactNode } from "react";
import { Container } from "./Container";
import { PatternBand } from "./PatternBand";

interface PageHeaderProps {
  titulo: string;
  intro?: ReactNode;
  children?: ReactNode;
}

/** Encabezado de las páginas internas, con el único h1 de la página. */
export function PageHeader({ titulo, intro, children }: PageHeaderProps) {
  return (
    <>
      <div className="bg-azul text-blanco">
        <Container className="py-12 md:py-16">
          <h1 className="text-4xl sm:text-5xl">{titulo}</h1>
          {intro ? <p className="mt-4 medida text-xl">{intro}</p> : null}
          {children}
        </Container>
      </div>
      <PatternBand tono="rojo" />
    </>
  );
}
