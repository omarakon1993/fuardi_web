"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuPrincipal } from "@/data/navegacion";
import { cx } from "@/lib/colores";

/** Compara rutas ignorando la barra final. */
export function esRutaActual(pathname: string, href: string) {
  const limpiar = (ruta: string) => ruta.replace(/\/+$/, "") || "/";
  return limpiar(pathname) === limpiar(href);
}

interface NavPrincipalProps {
  /** "fila" en escritorio, "columna" dentro del menú móvil. */
  disposicion?: "fila" | "columna";
  alNavegar?: () => void;
  className?: string;
}

export function NavPrincipal({
  disposicion = "fila",
  alNavegar,
  className,
}: NavPrincipalProps) {
  const pathname = usePathname();
  const columna = disposicion === "columna";

  return (
    <nav aria-label="Principal" className={className}>
      <ul
        className={cx(
          "flex",
          columna ? "flex-col gap-1" : "items-center gap-1",
        )}
      >
        {menuPrincipal.map((item) => {
          const actual = esRutaActual(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={alNavegar}
                aria-current={actual ? "page" : undefined}
                className={cx(
                  "flex min-h-11 items-center rounded-md font-bold text-tinta hover:text-azul",
                  columna ? "px-3 py-3 text-2xl" : "px-2.5 py-2 text-base",
                  actual
                    ? "underline decoration-rojo decoration-4 underline-offset-8"
                    : "no-underline hover:underline",
                )}
              >
                {item.texto}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
