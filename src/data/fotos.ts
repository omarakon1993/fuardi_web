import type { Foto } from "@/lib/types";

// Fotos reales de la fundación que se reutilizan en portadas y bloques.
// TODO(contenido): cambiar por fotos propias de cada página cuando las haya.

export const fotos = {
  grupoTambores: {
    src: "/images/hero/grupo-tambores-conectate.webp",
    alt: "Nuestros artistas con vestuario blanco, pañoleta roja y sombrero vueltiao, junto a sus tambores en una plaza de Bogotá",
    ancho: 1600,
    alto: 1204,
  },
  grupoNavidad: {
    src: "/images/galeria/grupo-gaitas-tambores-navidad.webp",
    alt: "Grupo de gaitas y tambores con vestuario tradicional, penachos y polleras, junto a sus tambores",
    ancho: 1600,
    alto: 1200,
  },
  danza: {
    src: "/images/galeria/danza-polleras-sombrero-vueltiao.webp",
    alt: "Parejas de baile con pollera roja y blanca, y camisa blanca con sombrero vueltiao, al terminar su presentación",
    ancho: 1280,
    alto: 960,
  },
  cantoTarima: {
    src: "/images/galeria/canto-gaita-tarima.webp",
    alt: "Profesor cantando con maraca junto a jóvenes que tocan la gaita y la maraca en tarima",
    ancho: 725,
    alto: 1600,
  },
  playland: {
    src: "/images/galeria/salida-playland.webp",
    alt: "Estudiantes con la sudadera azul de la fundación posando felices en una salida a Playland",
    ancho: 1152,
    alto: 864,
  },
  bolos: {
    src: "/images/galeria/salida-bolos.webp",
    alt: "Estudiantes con la sudadera de la fundación sosteniendo bolas de bolos en una salida",
    ancho: 1599,
    alto: 1200,
  },
} satisfies Record<string, Foto>;
