import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/colores";
import { Icon, type NombreIcono } from "./Icon";

const variantes = {
  primario:
    "bg-rojo text-blanco hover:bg-rojo-hondo border-2 border-transparent",
  /** Borde tinta sobre fondos claros. */
  secundario:
    "bg-transparent text-tinta border-2 border-tinta hover:bg-tinta hover:text-blanco",
  /** Botón blanco macizo para fondos oscuros o de color. */
  blanco:
    "bg-blanco text-tinta border-2 border-blanco hover:bg-cana hover:border-cana",
  /** Borde blanco para fondos oscuros (tinta o fotos). */
  claro:
    "bg-transparent text-blanco border-2 border-blanco/50 hover:bg-blanco hover:text-tinta hover:border-blanco",
  whatsapp:
    "bg-verde text-blanco border-2 border-transparent hover:bg-blanco hover:text-tinta",
  /** Enlace de texto con flecha, sobre fondos claros. */
  texto:
    "group/flecha text-tinta underline decoration-2 underline-offset-4 hover:text-rojo px-0!",
  /** Enlace de texto con flecha, sobre fondos oscuros. */
  textoClaro:
    "group/flecha text-blanco underline decoration-2 underline-offset-4 hover:text-cana px-0!",
} as const;

const esTexto = (variante: VarianteBoton) =>
  variante === "texto" || variante === "textoClaro";

export type VarianteBoton = keyof typeof variantes;

const tamanos = {
  normal: "min-h-13 px-7 py-2.5 text-lg",
  compacto: "min-h-11 px-5 py-1.5 text-base",
} as const;

function clasesBoton(
  variante: VarianteBoton,
  tamano: keyof typeof tamanos,
  className?: string,
) {
  return cx(
    "inline-flex items-center justify-center gap-2 rounded-full font-bold leading-tight transition-colors duration-300",
    esTexto(variante) ? "min-h-11" : tamanos[tamano],
    !esTexto(variante) && "no-underline",
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
      {esTexto(variante) ? (
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover/flecha:translate-x-1"
        >
          →
        </span>
      ) : null}
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
