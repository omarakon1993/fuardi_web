import { site } from "@/data/site";
import { cx } from "@/lib/colores";
import { Icon } from "@/components/ui/Icon";

interface RedesSocialesProps {
  /** "grande" muestra el nombre de la red junto al ícono. */
  tamano?: "normal" | "grande";
  claro?: boolean;
  className?: string;
}

export function RedesSociales({
  tamano = "normal",
  claro,
  className,
}: RedesSocialesProps) {
  if (site.redes.length === 0) return null;
  const grande = tamano === "grande";

  return (
    <ul className={cx("flex flex-wrap gap-3", className)}>
      {site.redes.map((red) => (
        <li key={red.red}>
          <a
            href={red.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cx(
              "inline-flex min-h-11 min-w-11 items-center justify-center gap-3 rounded-lg border-2 font-bold no-underline",
              grande ? "px-5 py-3 text-xl" : "px-2",
              claro
                ? "border-blanco/60 text-blanco hover:bg-blanco hover:text-tinta"
                : "border-azul text-azul hover:bg-azul hover:text-blanco",
            )}
          >
            <Icon nombre={red.red} tamano={grande ? 32 : 24} />
            <span className={grande ? undefined : "sr-only"}>
              {red.etiqueta}
            </span>
            <span className="sr-only"> (se abre en una pestaña nueva)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
