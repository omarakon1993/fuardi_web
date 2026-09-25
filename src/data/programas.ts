import type { Programa } from "@/lib/types";

// TODO(contenido): confirmar a quién va dirigido cada programa.
const poblacion =
  "Niños, niñas, jóvenes y adultos con discapacidad (síndrome de Down, discapacidad cognitiva, hipoacusia).";

export const programas: Programa[] = [
  {
    slug: "formacion",
    nombre: "Formación académica",
    color: "azul",
    resumen: "La fundación funciona como colegio para nuestros estudiantes.",
    // TODO(contenido): detalle del programa de formación académica.
    descripcion: [
      "La fundación funciona como colegio para nuestros estudiantes.",
    ],
    dirigidoA: poblacion,
    // TODO(contenido): horarios y edades.
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
