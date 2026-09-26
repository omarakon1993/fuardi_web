import { pie } from "@/data/pie";
import { site } from "@/data/site";
import { cx } from "@/lib/colores";
import type { NombreRed } from "@/lib/types";
import { Icon, type NombreIcono } from "@/components/ui/Icon";

/** Color de cada red en la versión grande. Todos llevan texto blanco (AA). */
const fondosRed: Record<NombreRed, string> = {
  instagram: "bg-magenta",
  tiktok: "bg-tinta",
  facebook: "bg-tinta",
  youtube: "bg-rojo",
};

interface RedesSocialesProps {
  /** "grande" muestra fichas con el nombre de la red y el usuario. */
  tamano?: "normal" | "pequeno" | "grande";
  claro?: boolean;
  /** Agrega el canal de WhatsApp como un ícono más. */
  conCanal?: boolean;
  className?: string;
}

export function RedesSociales({
  tamano = "normal",
  claro,
  conCanal,
  className,
}: RedesSocialesProps) {
  if (site.redes.length === 0) return null;

  if (tamano === "grande") {
    return (
      <ul className={cx("grid gap-3 sm:grid-cols-2", className)}>
        {site.redes.map((red) => (
          <li key={red.red}>
            <a
              href={red.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cx(
                "flex min-h-11 items-center gap-4 rounded-panel p-5 text-blanco no-underline transition-transform hover:-translate-y-0.5",
                fondosRed[red.red],
              )}
            >
              <Icon nombre={red.red} tamano={34} className="shrink-0" />
              <span className="min-w-0">
                <span className="block text-xl font-bold">{red.etiqueta}</span>
                <span className="block truncate text-base text-blanco/90">
                  {red.usuario}
                </span>
              </span>
              <span className="sr-only"> (se abre en una pestaña nueva)</span>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  const pequeno = tamano === "pequeno";
  const enlaces: {
    clave: string;
    icono: NombreIcono;
    etiqueta: string;
    url: string;
  }[] = [
    ...site.redes.map((red) => ({
      clave: red.red,
      icono: red.red,
      etiqueta: red.etiqueta,
      url: red.url,
    })),
    ...(conCanal && site.canalWhatsApp
      ? [
          {
            clave: "canal",
            icono: "whatsapp" as const,
            etiqueta: pie.canal,
            url: site.canalWhatsApp,
          },
        ]
      : []),
  ];

  return (
    <ul className={cx("flex flex-wrap gap-2", className)}>
      {enlaces.map((red) => (
        <li key={red.clave}>
          <a
            href={red.url}
            target="_blank"
            rel="noopener noreferrer"
            title={red.etiqueta}
            className={cx(
              "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full no-underline",
              pequeno ? "" : "size-12 border-2",
              claro
                ? "border-blanco/50 text-blanco hover:bg-blanco hover:text-tinta"
                : "border-tinta/30 text-tinta hover:bg-tinta hover:text-blanco",
            )}
          >
            <Icon nombre={red.icono} tamano={pequeno ? 20 : 22} />
            <span className="sr-only">
              {red.etiqueta} (se abre en una pestaña nueva)
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
