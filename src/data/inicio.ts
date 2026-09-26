// Textos de la página de inicio.
import { site } from "./site";

const [jovenes, grupo, festivales, departamentos] = site.cifras;

/** Trozo de una frase; los resaltados van en rojo. */
export interface TrozoFrase {
  texto: string;
  resaltado?: boolean;
}

export const inicio = {
  hero: {
    etiqueta: `${site.direccion.localidad}, Bogotá · Desde ${grupo.valor}`,
    /** Palabra del lema que va en cursiva color caña. */
    lemaResaltado: "Rompe",
    inscribir: "Inscribe a tu hijo o hija",
    apoyar: "Quiero apoyar",
    fotoPendiente: "el grupo tocando gaitas y tambores en tarima",
    cifra: festivales,
  },
  /** Ritmos y lugares de la franja roja. */
  marquesina: [
    "Cumbia",
    "Puya",
    "Gaita",
    "Porro",
    "San Jacinto",
    "Sincelejo",
    "Anapoima",
    "Suba",
  ],
  marquesinaPausar: "Pausar la franja",
  marquesinaReanudar: "Mover la franja",
  nosotros: {
    frase: [
      { texto: "Somos " },
      { texto: `${jovenes.valor} jóvenes`, resaltado: true },
      { texto: " y, desde " },
      { texto: grupo.valor, resaltado: true },
      { texto: ", llevamos la música de los Montes de María a tarimas de " },
      { texto: `${departamentos.valor} departamentos`, resaltado: true },
      { texto: "." },
    ] satisfies TrozoFrase[],
    antetitulo: "Quiénes somos",
    titulo: "La discapacidad tiene muchas capacidades",
    mision: "Nuestra misión",
    enlace: "Conoce nuestra historia",
  },
  programas: {
    antetitulo: "Nuestros programas",
    titulo: "Cinco piezas, un mismo rompecabezas",
    enlace: "Ver todos los programas",
  },
  campanas: {
    titulo: "Convocatorias y campañas",
  },
  presentaciones: {
    antetitulo: "En tarima",
    titulo: "Así suenan nuestros jóvenes",
    intro:
      "Vestuario blanco, sombrero vueltiao y pañoleta roja. Desliza para verlos en escena.",
    galeria: "Fotos del grupo en tarima",
    contratar: "Contrata una presentación",
    enlace: "Ver presentaciones",
  },
  agenda: {
    antetitulo: "Agenda",
    titulo: "Próximas fechas",
    intro:
      "Ven a vernos en tarima. Estas son nuestras próximas presentaciones y actividades.",
    enlace: "Ver toda la agenda",
    vacio:
      "Pronto publicaremos nuevas fechas. Únete al canal de WhatsApp y te avisamos.",
    canal: "Unirme al canal de WhatsApp",
  },
  logros: {
    antetitulo: "Logros y reconocimientos",
    titulo: "De Suba a los festivales del país",
    enlace: "Ver toda la trayectoria",
  },
  ayudar: {
    antetitulo: "Apóyanos",
    titulo: "Ayúdanos a que suban a la tarima",
    intro:
      "Cada aporte, grande o pequeño, sostiene un proceso que cambia cómo la comunidad ve a nuestros jóvenes. Elige cómo quieres sumarte:",
    destinoTitulo: "Tu aporte se convierte en",
    destino: "Instrumentos, transporte a festivales y clases",
    donar: "Quiero donar",
  },
  testimonios: {
    titulo: "Lo que dicen las familias",
  },
};
