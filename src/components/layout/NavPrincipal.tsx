"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { esGrupo, menuPrincipal } from "@/data/navegacion";
import { cx } from "@/lib/colores";
import { Desplegable } from "@/components/ui/Desplegable";

/** Compara rutas ignorando la barra final. */
export function esRutaActual(pathname: string, href: string) {
  const limpiar = (ruta: string) => ruta.replace(/\/+$/, "") || "/";
  return limpiar(pathname) === limpiar(href);
}

interface NavPrincipalProps {
  /** "fila" en el menú fijo oscuro, "columna" dentro del menú móvil. */
  disposicion?: "fila" | "columna";
  alNavegar?: () => void;
  className?: string;
}

const pildora =
  "flex min-h-11 items-center gap-1.5 rounded-full px-3.5 py-2 font-bold whitespace-nowrap no-underline transition-colors duration-300";

export function NavPrincipal({
  disposicion = "fila",
  alNavegar,
  className,
}: NavPrincipalProps) {
  const pathname = usePathname();
  const actual = (href: string) => esRutaActual(pathname, href);

  if (disposicion === "columna") {
    // En el menú móvil los grupos se muestran abiertos, con su nombre encima.
    return (
      <nav aria-label="Principal" className={className}>
        <ul className="space-y-5">
          {menuPrincipal.map((item) => (
            <li key={item.texto}>
              {esGrupo(item) ? (
                <>
                  <p className="px-4 antetitulo text-rojo" aria-hidden="true">
                    {item.texto}
                  </p>
                  <ul aria-label={item.texto} className="mt-1">
                    {item.enlaces.map((enlace) => (
                      <li key={enlace.href}>
                        <EnlaceColumna
                          href={enlace.href}
                          texto={enlace.texto}
                          actual={actual(enlace.href)}
                          alNavegar={alNavegar}
                        />
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <EnlaceColumna
                  href={item.href}
                  texto={item.texto}
                  actual={actual(item.href)}
                  alNavegar={alNavegar}
                />
              )}
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav aria-label="Principal" className={className}>
      <ul className="flex items-center gap-1">
        {menuPrincipal.map((item) => (
          <li key={item.texto}>
            {esGrupo(item) ? (
              <Desplegable
                etiqueta={item.texto}
                cerrarAlElegir
                claseBoton={cx(
                  pildora,
                  item.enlaces.some((e) => actual(e.href))
                    ? "bg-blanco/15 text-blanco"
                    : "text-blanco hover:bg-blanco/10",
                )}
                clasePanel="min-w-56"
              >
                <ul>
                  {item.enlaces.map((enlace) => (
                    <li key={enlace.href}>
                      <Link
                        href={enlace.href}
                        aria-current={actual(enlace.href) ? "page" : undefined}
                        className={cx(
                          "flex min-h-11 items-center rounded-2xl px-4 py-2 font-bold no-underline",
                          actual(enlace.href)
                            ? "bg-tinta text-blanco"
                            : "text-tinta hover:bg-cana",
                        )}
                      >
                        {enlace.texto}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Desplegable>
            ) : (
              <Link
                href={item.href}
                aria-current={actual(item.href) ? "page" : undefined}
                className={cx(
                  pildora,
                  actual(item.href)
                    ? "bg-blanco text-tinta"
                    : "text-blanco hover:bg-blanco/10",
                )}
              >
                {item.texto}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

function EnlaceColumna({
  href,
  texto,
  actual,
  alNavegar,
}: {
  href: string;
  texto: string;
  actual: boolean;
  alNavegar?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={alNavegar}
      aria-current={actual ? "page" : undefined}
      className={cx(
        "flex min-h-11 items-center rounded-panel px-4 py-2 font-display text-3xl font-extrabold font-stretch-85% no-underline",
        actual ? "bg-tinta text-blanco" : "text-tinta hover:bg-cana",
      )}
    >
      {texto}
    </Link>
  );
}
