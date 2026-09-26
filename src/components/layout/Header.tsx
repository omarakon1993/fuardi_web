import Image from "next/image";
import Link from "next/link";
import { botonesDestacados } from "@/data/navegacion";
import { BotonEnlace } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "./MobileMenu";
import { NavPrincipal } from "./NavPrincipal";

/*
 * Menú fijo arriba. Con la letra muy agrandada (A+ nivel 2 o 3) vuelve a su
 * lugar normal para no tapar media pantalla: ver .menu-fijo en globals.css.
 */
export function Header() {
  return (
    <header className="menu-fijo fixed inset-x-0 top-0 z-50 bg-tinta text-blanco shadow-[0_1px_0_rgb(255_255_255/0.08)]">
      <Container className="flex h-menu items-center gap-3 lg:gap-5">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 rounded-2xl text-blanco no-underline"
        >
          <span className="flex rounded-[0.875rem] bg-blanco p-1">
            <Image
              src="/images/logo/fuardi-logo.png"
              alt=""
              width={247}
              height={233}
              priority
              className="h-10 w-auto"
            />
          </span>
          <span className="font-display text-lg leading-[1.05] font-extrabold font-stretch-85%">
            <span className="sr-only sm:not-sr-only">
              Fundación
              <br />
              Armonía Diversa
            </span>
            <span className="sr-only">, ir al inicio</span>
          </span>
        </Link>

        <NavPrincipal className="nav-escritorio ml-auto hidden xl:block" />

        <BotonEnlace
          href={botonesDestacados.apoyar.href}
          tamano="compacto"
          className="ml-auto shrink-0 xl:ml-0"
        >
          {botonesDestacados.apoyar.texto}
        </BotonEnlace>

        <MobileMenu className="menu-compacto xl:hidden" />
      </Container>
    </header>
  );
}
