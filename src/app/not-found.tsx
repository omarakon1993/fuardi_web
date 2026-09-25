import type { Metadata } from "next";
import Link from "next/link";
import { enlacesPie } from "@/data/navegacion";
import { mensajesWhatsApp } from "@/data/site";
import { enlaceWhatsApp } from "@/lib/whatsapp";
import { BotonEnlace } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PatternBand } from "@/components/ui/PatternBand";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <div className="bg-azul text-blanco">
        <Container className="py-16 md:py-24">
          <p className="font-display text-xl font-bold text-amarillo">
            Error 404
          </p>
          <h1 className="mt-2 text-4xl sm:text-6xl">
            Esta página se salió del compás
          </h1>
          <p className="mt-5 medida text-xl">
            No encontramos lo que buscabas. Puede que la dirección haya cambiado
            o tenga un error.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BotonEnlace href="/">Ir al inicio</BotonEnlace>
            <BotonEnlace
              href={enlaceWhatsApp(mensajesWhatsApp.general)}
              variante="claro"
              icono="whatsapp"
            >
              Escríbenos por WhatsApp
            </BotonEnlace>
          </div>
        </Container>
      </div>
      <PatternBand tono="rojo" />
      <Container className="py-12">
        <h2 className="text-2xl">Quizás buscabas</h2>
        <ul className="mt-4 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {enlacesPie.map((enlace) => (
            <li key={enlace.href}>
              <Link
                href={enlace.href}
                className="inline-flex min-h-11 items-center text-lg font-bold text-azul underline decoration-2 underline-offset-4"
              >
                {enlace.texto}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
