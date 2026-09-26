import type { Metadata } from "next";
import Link from "next/link";
import { paginasSitio } from "@/data/navegacion";
import { mensajesWhatsApp } from "@/data/site";
import { enlaceWhatsApp } from "@/lib/whatsapp";
import { BotonEnlace } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <div className="bg-tinta pb-28 text-blanco">
        <Container className="pt-16 md:pt-24">
          <p className="antetitulo text-cana">Error 404</p>
          <h1 className="mt-4 text-titular">Esta página se salió del compás</h1>
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
      <div className="relative -mt-14 rounded-t-capa bg-blanco pt-16 pb-28">
        <Container>
          <h2 className="text-2xl">Quizás buscabas</h2>
          <ul className="mt-4 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {paginasSitio.map((enlace) => (
              <li key={enlace.href}>
                <Link
                  href={enlace.href}
                  className="inline-flex min-h-11 items-center text-lg font-bold text-tinta underline decoration-2 underline-offset-4"
                >
                  {enlace.texto}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </>
  );
}
