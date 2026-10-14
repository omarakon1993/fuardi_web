import type { Anuncio } from "@/lib/types";
import { fotos } from "./fotos";

// Solo se resalta una campaña a la vez: la primera vigente con `destacado`.
// Cuando termine una, agrega la siguiente aquí.
export const anuncios: Anuncio[] = [
  {
    id: "vaki-sede-propia",
    tipo: "colecta",
    titulo: "¡Ayúdanos a construir nuestro sueño!",
    texto:
      "Soñamos con una sede propia, digna, segura y accesible. ¡Construyamos juntos nuestra sede!",
    detalle:
      "Soñamos con una sede propia, digna, segura y accesible, donde nuestros jóvenes con discapacidad puedan aprender, crear y desarrollar sus talentos. Queremos llegar a más personas. Cada aporte nos acerca a hacerlo realidad. Durante nuestra trayectoria hemos formado a más de 100 jóvenes con discapacidad y participado en diferentes eventos culturales a nivel nacional. ¡Construyamos juntos nuestra sede!",
    enlace: {
      texto: "Donar en Vaki",
      href: "https://vaki.co/vaki/sede-para-la-fundacion",
    },
    desde: "2026-09-24",
    // Cierre de la Vaki: 16 de septiembre de 2027.
    hasta: "2027-09-16",
    mostrarEnBarra: true,
    destacado: true,
    foto: fotos.grupoNavidad,
    vaki: { slug: "sede-para-la-fundacion", avanceVisibleDesde: 5 },
  },
];

export const nombresTipoAnuncio = {
  convocatoria: "Convocatoria",
  colecta: "Colecta",
  evento: "Evento",
  aviso: "Aviso",
} as const;
