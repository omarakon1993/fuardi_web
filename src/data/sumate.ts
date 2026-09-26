import type { ColorMarca, Enlace } from "@/lib/types";
import { mensajesWhatsApp, site } from "./site";
import { enlaceWhatsApp } from "@/lib/whatsapp";

// Bloque de cierre de las páginas internas: los tres caminos para sumarse.

interface Camino extends Enlace {
  id: string;
  quien: string;
  detalle: string;
  color: ColorMarca;
}

export const sumate = {
  titulo: "Súmate a la tarima",
  intro:
    "Cada persona que llega hace que el grupo suene más fuerte. Elige cómo quieres acompañarnos.",
  caminos: [
    {
      id: "familias",
      quien: "Familias",
      detalle:
        "Conoce los programas y visita la sede en Suba. Te contamos cómo inscribir a tu hijo o hija.",
      texto: "Quiero inscribir a alguien",
      href: "/contacto/?motivo=inscripcion",
      color: "rojo",
    },
    {
      id: "aliados",
      quien: "Personas y empresas",
      detalle:
        "Dona, sé voluntario, contrata una presentación o haz una alianza con la fundación.",
      texto: "Ver cómo apoyar",
      href: "/apoyanos/",
      color: "amarillo",
    },
    {
      id: "comunidad",
      quien: "Comunidad",
      detalle:
        "Únete al canal de WhatsApp y entérate de cada presentación, convocatoria y colecta.",
      texto: site.canalWhatsApp ? "Unirme al canal" : "Escribir por WhatsApp",
      href: site.canalWhatsApp ?? enlaceWhatsApp(mensajesWhatsApp.general),
      color: "verde",
    },
  ] satisfies Camino[],
};
