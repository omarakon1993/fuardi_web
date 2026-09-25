import type { Anuncio } from "@/lib/types";

export const anuncios: Anuncio[] = [
  {
    // TODO(contenido): reemplazar por la convocatoria o colecta real y borrar `ejemplo`.
    id: "ejemplo-convocatoria",
    tipo: "convocatoria",
    titulo: "Anuncio de ejemplo",
    texto:
      "Aquí va la convocatoria, colecta o noticia vigente de la fundación.",
    enlace: { texto: "Escríbenos", href: "/contacto/" },
    desde: "2026-09-01",
    hasta: "2026-12-31",
    mostrarEnBarra: true,
    destacado: true,
    ejemplo: true,
  },
];

export const nombresTipoAnuncio = {
  convocatoria: "Convocatoria",
  colecta: "Colecta",
  evento: "Evento",
  aviso: "Aviso",
} as const;
