"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { botonesDestacados } from "@/data/navegacion";
import { mensajesWhatsApp, site } from "@/data/site";
import { enlaceWhatsApp } from "@/lib/whatsapp";
import { cx } from "@/lib/colores";
import { BotonEnlace } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { AccessibilityControls } from "./AccessibilityControls";
import { NavPrincipal } from "./NavPrincipal";
import { RedesSociales } from "./RedesSociales";

const ENFOCABLES =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Menú desplegable para pantallas pequeñas. Usa <dialog> modal: el resto de la
 * página queda inerte, Esc lo cierra y el foco vuelve al botón que lo abrió.
 * Además, Tab y Shift+Tab dan la vuelta dentro del panel.
 */
export function MobileMenu({ className }: { className?: string }) {
  const [abierto, setAbierto] = useState(false);
  const dialogo = useRef<HTMLDialogElement>(null);
  const boton = useRef<HTMLButtonElement>(null);

  function abrir() {
    dialogo.current?.showModal();
    setAbierto(true);
  }

  function cerrar() {
    dialogo.current?.close();
  }

  function alCerrar() {
    setAbierto(false);
    boton.current?.focus();
  }

  function atraparFoco(evento: KeyboardEvent<HTMLDialogElement>) {
    if (evento.key !== "Tab" || !dialogo.current) return;
    const enfocables = Array.from(
      dialogo.current.querySelectorAll<HTMLElement>(ENFOCABLES),
    );
    if (enfocables.length === 0) return;
    const primero = enfocables[0];
    const ultimo = enfocables[enfocables.length - 1];
    if (evento.shiftKey && document.activeElement === primero) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      primero.focus();
    }
  }

  return (
    <div className={className}>
      <button
        ref={boton}
        type="button"
        onClick={abrir}
        aria-expanded={abierto}
        aria-controls="menu-movil"
        className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-blanco/50 px-3 font-bold text-blanco hover:bg-blanco hover:text-tinta"
      >
        <Icon nombre="menu" />
        <span className="sr-only sm:not-sr-only">Menú</span>
      </button>

      {/* El <dialog> nativo ya maneja Esc; onKeyDown solo cicla el foco. */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <dialog
        ref={dialogo}
        id="menu-movil"
        aria-label="Menú principal"
        onClose={alCerrar}
        onKeyDown={atraparFoco}
        className={cx(
          "fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-dvh w-full max-w-sm overflow-y-auto bg-blanco p-0 text-tinta shadow-2xl",
          "backdrop:bg-tinta/70",
        )}
      >
        <div className="flex min-h-full flex-col gap-6 p-5">
          <div className="flex items-center justify-between">
            <p className="font-display text-xl font-extrabold text-tinta">
              {site.sigla}
            </p>
            <button
              type="button"
              onClick={cerrar}
              className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-tinta px-3 font-bold hover:bg-cana"
            >
              <Icon nombre="cerrar" />
              <span>Cerrar menú</span>
            </button>
          </div>

          <AccessibilityControls className="rounded-panel bg-cana p-2" />

          <NavPrincipal disposicion="columna" alNavegar={cerrar} />

          <div className="mt-auto grid gap-3 border-t-2 border-cana pt-6">
            <BotonEnlace
              href={botonesDestacados.inscribirse.href}
              onClick={cerrar}
            >
              {botonesDestacados.inscribirse.texto}
            </BotonEnlace>
            <BotonEnlace
              href={botonesDestacados.apoyar.href}
              variante="secundario"
              onClick={cerrar}
            >
              {botonesDestacados.apoyar.texto}
            </BotonEnlace>
            <BotonEnlace
              href={enlaceWhatsApp(mensajesWhatsApp.general)}
              variante="whatsapp"
              icono="whatsapp"
            >
              Escríbenos por WhatsApp
            </BotonEnlace>
            <RedesSociales className="mt-2" />
          </div>
        </div>
      </dialog>
    </div>
  );
}
