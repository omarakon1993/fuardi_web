import type { Programa } from "@/lib/types";

// TODO(contenido): confirmar a quién va dirigido cada programa.
const poblacion =
  "Niños, niñas, jóvenes y adultos con discapacidad (síndrome de Down, discapacidad cognitiva, hipoacusia).";

export const programas: Programa[] = [
  {
    slug: "formacion",
    nombre: "Formación académica",
    color: "azul",
    resumen:
      "La fundación funciona como institución educativa para nuestros estudiantes.",
    // TODO(contenido): detalle del programa de formación académica.
    descripcion: [
      "La fundación funciona como institución educativa para nuestros estudiantes.",
    ],
    dirigidoA: poblacion,
    // TODO(contenido): horarios y edades.
    foto: {
      src: "/images/galeria/salida-bolos.webp",
      alt: "Estudiantes con la sudadera de la fundación sosteniendo bolas de bolos en una salida",
      ancho: 1599,
      alto: 1200,
    },
  },
  {
    slug: "musica",
    nombre: "Música tradicional: gaitas y tambores",
    color: "rojo",
    resumen:
      "Desde 2016 tocamos cumbia, puya, gaita y porro, la música de los Montes de María.",
    descripcion: [
      "Nuestro grupo de gaitas y tambores nace en 2016. Interpreta aires de cumbia, puya, gaita y porro, y rescata desde el interior del país la música tradicional de los Montes de María.",
      "El lenguaje musical fortalece habilidades cognitivas, comunicativas, sociales, afectivas y emocionales. El grupo se presenta en festivales locales, distritales y nacionales.",
    ],
    dirigidoA: poblacion,
    // TODO(contenido): horarios y edades.
    foto: {
      src: "/images/galeria/grupo-gaitas-tambores-navidad.webp",
      alt: "Grupo de gaitas y tambores con vestuario tradicional, penachos y polleras, junto a sus tambores",
      ancho: 1600,
      alto: 1200,
    },
  },
  {
    slug: "danza",
    nombre: "Danza folclórica",
    color: "magenta",
    resumen: "Bailamos en encuentros nacionales de danza folclórica.",
    // TODO(contenido): detalle del programa de danza.
    descripcion: [
      "Nuestro grupo de danza participa en encuentros nacionales, como el XIX Encuentro Nacional de Danza Folclórica «Danzando con el Sol» (2024).",
    ],
    dirigidoA: poblacion,
    // TODO(contenido): horarios y edades.
    foto: {
      src: "/images/galeria/danza-polleras-sombrero-vueltiao.webp",
      alt: "Parejas de baile con pollera roja y blanca, y camisa blanca con sombrero vueltiao, al terminar su presentación",
      ancho: 1280,
      alto: 960,
    },
  },
  {
    slug: "canto",
    nombre: "Canto",
    color: "verde",
    resumen: "Formación en canto para nuestros estudiantes.",
    // TODO(contenido): detalle del programa de canto.
    descripcion: ["Formación en canto para nuestros estudiantes."],
    dirigidoA: poblacion,
    // TODO(contenido): horarios y edades.
    foto: {
      src: "/images/programas/canto-gaita-tarima.webp",
      alt: "Profesor cantando con maraca junto a un joven que toca la gaita en tarima",
      ancho: 725,
      alto: 544,
    },
  },
  {
    slug: "emprendimientos",
    nombre: "Emprendimientos",
    color: "naranja",
    resumen: "Nuestros jóvenes hacen productos como pocillos y camisetas.",
    // TODO(contenido): detalle del programa de emprendimientos.
    descripcion: [
      "Nuestros jóvenes hacen productos como pocillos y camisetas. Puedes pedirlos en nuestra tienda.",
    ],
    dirigidoA: poblacion,
    // TODO(contenido): horarios y edades.
  },
];
