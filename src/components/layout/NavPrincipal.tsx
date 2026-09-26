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
                  "flex min-h-11 items-center font-bold no-underline",
                  columna
                    ? "rounded-panel px-4 py-3 font-display text-3xl [font-stretch:85%]"
                    : "rounded-full px-3 py-2 text-base",
                  actual
                    ? "bg-azul text-blanco"
                    : "text-tinta hover:bg-niebla hover:text-azul",
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
