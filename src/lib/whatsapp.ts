import { site } from "@/data/site";

/** Enlace wa.me con mensaje prellenado opcional. */
export function enlaceWhatsApp(mensaje?: string, numero = site.whatsapp) {
  const base = `https://wa.me/${numero}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}

export function enlaceCorreo(correo = site.correo, asunto?: string) {
  return asunto
    ? `mailto:${correo}?subject=${encodeURIComponent(asunto)}`
    : `mailto:${correo}`;
}
