import Image from "next/image";
import Link from "next/link";
import { formasDeAyudar } from "@/data/apoyo";
import { fotos } from "@/data/fotos";
import { inicio } from "@/data/inicio";
import { pie } from "@/data/pie";
import { site } from "@/data/site";
import { BotonEnlace } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Revelar } from "@/components/ui/Revelar";

/** Tarjeta de Apóyanos: foto con el destino del aporte y las formas de ayudar. */
export function HowToHelp() {
  const t = inicio.ayudar;
  const foto = fotos.bolos;
  // Donar es el botón principal; las demás formas van como chips.
  const otras = formasDeAyudar.filter((f) => f.id !== "donar");

  return (
    <section
      aria-labelledby="ayudar-titulo"
      className="bg-blanco pb-28 md:pb-32"
    >
      <Container className="px-2 sm:px-4 lg:px-5">
        <Revelar className="grid overflow-hidden rounded-[3rem] bg-cana lg:grid-cols-2">
          <div className="relative min-h-80 lg:min-h-full">
            <Image
              src={foto.src}
              alt={foto.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <p className="absolute right-6 bottom-6 left-6 max-w-sm rounded-panel bg-blanco p-5 shadow-xl">
              <span className="block text-sm font-bold text-rojo">
                {t.destinoTitulo}
              </span>
              <span className="mt-1 block font-display text-2xl leading-tight font-extrabold font-stretch-90%">
                {t.destino}
              </span>
            </p>
          </div>

          <div className="p-8 sm:p-12 lg:p-16">
            <p className="antetitulo text-rojo">{t.antetitulo}</p>
            <h2 id="ayudar-titulo" className="mt-4 text-seccion">
              {t.titulo}
            </h2>
            <p className="mt-6 medida text-entrada">{t.intro}</p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {otras.map((forma) => (
                <li key={forma.id}>
                  <Link
                    href={`/apoyanos/#${forma.id}`}
                    className="inline-flex min-h-11 items-center rounded-full bg-blanco px-4 font-bold text-tinta no-underline transition-colors duration-300 hover:bg-tinta hover:text-blanco"
                  >
                    {forma.titulo}
                  </Link>
                </li>
              ))}
            </ul>
            <BotonEnlace href="/apoyanos/#donar" className="mt-8">
              {t.donar}
            </BotonEnlace>
            {site.nit ? (
              <p className="mt-5 text-base text-gris">
                {pie.sinAnimo} · NIT {site.nit}
              </p>
            ) : null}
          </div>
        </Revelar>
      </Container>
    </section>
  );
}
