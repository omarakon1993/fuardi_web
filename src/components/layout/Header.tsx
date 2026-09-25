import Image from "next/image";
import Link from "next/link";
import { botonesDestacados } from "@/data/navegacion";
import { BotonEnlace } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "./MobileMenu";
import { NavPrincipal } from "./NavPrincipal";

/*
 * El encabezado no es fijo a propósito: con zoom alto, un header pegajoso
 * ocupa media pantalla y puede tapar el elemento con foco.
 */
export function Header() {
  const botones = (
    <>
      <BotonEnlace
        href={botonesDestacados.apoyar.href}
        variante="secundario"
        tamano="compacto"
      >
        {botonesDestacados.apoyar.texto}
      </BotonEnlace>
      <BotonEnlace href={botonesDestacados.inscribirse.href} tamano="compacto">
        {botonesDestacados.inscribirse.texto}
      </BotonEnlace>
    </>
  );

  return (
    <header className="border-b-2 border-niebla bg-blanco">
      <Container className="flex items-center gap-3 py-3">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 rounded-md no-underline"
        >
          <Image
            src="/images/logo/fuardi-logo.png"
            alt=""
            width={247}
            height={233}
            priority
            className="h-14 w-auto"
          />
          <span className="font-display text-lg leading-tight font-extrabold text-azul">
            Fundación
            <br />
            Armonía Diversa
            <span className="sr-only">, ir al inicio</span>
          </span>
        </Link>

        <NavPrincipal className="ml-auto hidden xl:block" />

        <div className="ml-auto hidden items-center gap-2 sm:flex xl:ml-2">
          {botones}
        </div>

        <MobileMenu className="ml-auto sm:ml-0 xl:hidden" />
      </Container>

      {/* En móvil los dos botones siguen visibles, en una segunda fila. */}
      <div className="grid grid-cols-2 gap-2 px-4 pb-3 sm:hidden">
        {botones}
      </div>
    </header>
  );
}
