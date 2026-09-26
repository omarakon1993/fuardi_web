import type { Anuncio } from "@/lib/types";
import { fotos } from "./fotos";

// Solo se resalta una campaña a la vez: la primera vigente con `destacado`.
// Cuando termine una, agrega la siguiente aquí.
export const anuncios: Anuncio[] = [
  {
    id: "vaki-sede-propia",
    tipo: "colecta",
    titulo: "Construyamos nuestra sede propia",
    texto:
      "Súmate a nuestra Vaki: queremos una sede digna para atender a más jóvenes.",
    detalle:
      "Queremos una sede propia, digna, segura y accesible, donde nuestros jóvenes puedan aprender, crear y compartir, y donde podamos recibir a más niños, jóvenes y adultos con discapacidad. Cada aporte, grande o pequeño, nos acerca a esa meta.",
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
