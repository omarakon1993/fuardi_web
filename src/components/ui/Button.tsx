import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/colores";
import { Icon, type NombreIcono } from "./Icon";

const variantes = {
  primario:
    "bg-rojo text-blanco hover:bg-rojo-hondo border-2 border-transparent",
  secundario: "bg-blanco text-azul border-2 border-azul hover:bg-niebla",
  /** Para fondos oscuros (azul, tinta o fotos). */
  claro:
    "bg-transparent text-blanco border-2 border-blanco hover:bg-blanco hover:text-tinta",
  whatsapp: "bg-verde text-blanco border-2 border-transparent hover:bg-tinta",
  texto:
    "text-azul underline decoration-2 underline-offset-4 hover:decoration-rojo px-0!",
} as const;

export type VarianteBoton = keyof typeof variantes;

const tamanos = {
  normal: "min-h-12 px-5 py-2 text-lg",
  compacto: "min-h-11 px-4 py-1.5 text-base",
} as const;

function clasesBoton(
  variante: VarianteBoton,
  tamano: keyof typeof tamanos,
  className?: string,
) {
  return cx(
    "inline-flex items-center justify-center gap-2 rounded-lg font-bold leading-tight transition-colors",
    variante === "texto" ? "min-h-11" : tamanos[tamano],
    variante !== "texto" && "no-underline",
    variantes[variante],
    className,
  );
}

interface ComunesBoton {
  children: ReactNode;
  variante?: VarianteBoton;
  tamano?: keyof typeof tamanos;
  icono?: NombreIcono;
  className?: string;
}

interface BotonEnlaceProps extends ComunesBoton {
  href: string;
  /** Abre en una pestaña nueva y lo anuncia a lectores de pantalla. */
  externo?: boolean;
  onClick?: () => void;
}

/** Enlace con aspecto de botón. Internos con next/link; externos con <a>. */
export function BotonEnlace({
  href,
  externo,
  children,
  variante = "primario",
  tamano = "normal",
  icono,
  className,
  onClick,
}: BotonEnlaceProps) {
  const clases = clasesBoton(variante, tamano, className);
  const contenido = (
    <>
      {icono ? <Icon nombre={icono} tamano={22} /> : null}
      <span>{children}</span>
    </>
  );

  const esExterno = externo || /^(https?:|mailto:|tel:)/.test(href);

  if (esExterno) {
    const nuevaPestana = externo ?? href.startsWith("http");
    return (
      <a
        href={href}
        className={clases}
        onClick={onClick}
        {...(nuevaPestana
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {contenido}
        {nuevaPestana ? (
          <span className="sr-only"> (se abre en una pestaña nueva)</span>
        ) : null}
      </a>
    );
  }

  return (
    <Link href={href} className={clases} onClick={onClick}>
      {contenido}
    </Link>
  );
}

interface BotonProps
  extends
    ComunesBoton,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> {}

export function Boton({
  children,
  variante = "primario",
  tamano = "normal",
  icono,
  className,
  type = "button",
  ...props
}: BotonProps) {
  return (
    <button
      type={type}
      className={clasesBoton(
        variante,
        tamano,
        cx(
          "cursor-pointer disabled:cursor-not-allowed disabled:opacity-60",
          className,
        ),
      )}
      {...props}
    >
      {icono ? <Icon nombre={icono} tamano={22} /> : null}
      <span>{children}</span>
    </button>
  );
}
