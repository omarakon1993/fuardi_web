import Image from "next/image";
import { creadorWeb } from "@/data/equipo";
import { paginas } from "@/data/paginas";
import { BotonEnlace } from "./Button";

const t = paginas.creador;

/**
 * Crédito de quien creó y administra el sitio, con su correo para quien quiera
 * un sitio web. «fila» es la versión pequeña de Nosotros; «tarjeta» es la
 * versión destacada de Contacto.
 */
export function CreadorWeb({
  variante = "fila",
}: {
  variante?: "fila" | "tarjeta";
}) {
  const { foto, nombre, cargo, correo } = creadorWeb;
  const enlace = correo
    ? `mailto:${correo}?subject=${encodeURIComponent(t.asunto)}`
    : undefined;

  if (variante === "fila") {
    return (
      <div className="mt-10 flex items-center gap-5 border-t-2 border-cana pt-8">
        {foto ? (
          <Image
            src={foto.src}
            alt={foto.alt}
            width={foto.ancho}
            height={foto.alto}
            className="size-24 shrink-0 rounded-full object-cover"
          />
        ) : null}
        <div>
          <h3 className="text-xl">{nombre}</h3>
          <p className="text-gris">{cargo}</p>
          {enlace ? (
            <>
              <p className="mt-2 text-sm text-gris">{t.invitacion}</p>
              <a
                href={enlace}
                className="mt-1 inline-flex min-h-11 items-center font-bold break-all text-rojo underline underline-offset-4"
              >
                {correo}
              </a>
            </>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="creador-titulo"
      className="rounded-foto bg-tinta p-6 text-blanco sm:p-8"
    >
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        {foto ? (
          <Image
            src={foto.src}
            alt={foto.alt}
            width={foto.ancho}
            height={foto.alto}
            className="size-32 shrink-0 rounded-full border-4 border-blanco/20 object-cover"
          />
        ) : null}
        <div className="flex-1">
          <p className="antetitulo text-cana">{t.antetitulo}</p>
          <h2 id="creador-titulo" className="mt-1 text-3xl">
            {nombre}
          </h2>
          <p className="text-blanco/85">{cargo}</p>
          <p className="mt-3 medida">{t.invitacion}</p>
        </div>
        {enlace ? (
          <BotonEnlace href={enlace} variante="blanco" icono="correo">
            {t.boton}
          </BotonEnlace>
        ) : null}
      </div>
    </section>
  );
}
