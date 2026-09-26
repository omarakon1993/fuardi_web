import Image from "next/image";
import { inicio } from "@/data/inicio";
import { testimonios } from "@/data/testimonios";
import { EncabezadoSeccion, Section } from "@/components/ui/Section";

/** No se renderiza mientras no haya testimonios reales. */
export function Testimonials() {
  if (testimonios.length === 0) return null;

  return (
    <Section tituloId="testimonios-titulo" capa>
      <EncabezadoSeccion
        id="testimonios-titulo"
        titulo={inicio.testimonios.titulo}
      />
      <ul className="mt-10 grid gap-8 md:grid-cols-2">
        {testimonios.map((t) => (
          <li key={t.id}>
            <figure className="border-l-8 border-magenta pl-6">
              <blockquote className="font-display text-2xl leading-snug font-bold">
                <p>«{t.texto}»</p>
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                {t.foto ? (
                  <Image
                    src={t.foto.src}
                    alt={t.foto.alt}
                    width={56}
                    height={56}
                    className="size-14 rounded-full object-cover"
                  />
                ) : null}
                <span>
                  <strong>{t.autor}</strong>, {t.relacion}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
