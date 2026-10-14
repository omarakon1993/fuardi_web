import type { Foto, Programa } from "@/lib/types";

// TODO(contenido): confirmar a quién va dirigido cada programa.
const poblacion =
  "Niños, niñas, jóvenes y adultos con discapacidad (síndrome de Down, discapacidad cognitiva, hipoacusia).";

const foto = (src: string, alt: string, ancho: number, alto: number): Foto => ({
  src: `/images/galeria/${src}.webp`,
  alt,
  ancho,
  alto,
});

// La inscripción es una sola: la fundación ofrece un proceso de formación que
// incluye todos los programas. Por eso aquí no hay enlace por programa.
export const programas: Programa[] = [
  {
    slug: "musica",
    nombre: "Música",
    etiqueta: "Música",
    color: "rojo",
    resumen: "Cumbia, puya, gaita y porro, con gaitas, tambores y canto.",
    descripcion: [
      "Nuestro grupo de gaitas y tambores nace en 2016. Interpreta los ritmos de la cumbia, la puya, la gaita y el porro, y rescata desde el interior del país la música tradicional de los Montes de María.",
      "El lenguaje musical fortalece habilidades cognitivas, comunicativas, sociales, afectivas y emocionales. El grupo se presenta en festivales locales, distritales y nacionales.",
    ],
    dirigidoA: poblacion,
    foto: foto(
      "musica-grupo-tambores-calle",
      "Jóvenes con vestuario blanco, sombrero vueltiao y polleras de colores junto a sus tambores en una calle",
      1280,
      960,
    ),
    fotosExtra: [
      foto(
        "musica-ensayo-tambores",
        "Jóvenes y su profesor tocando tambores durante un ensayo en la sede",
        1600,
        1200,
      ),
    ],
  },
  {
    slug: "danza",
    nombre: "Danza",
    etiqueta: "Danza",
    color: "magenta",
    resumen: "Bailamos folclor en tarimas y encuentros nacionales.",
    descripcion: [
      "Nuestro grupo de danza participa en encuentros nacionales, como el XIX Encuentro Nacional de Danza Folclórica «Danzando con el Sol» (2024).",
    ],
    dirigidoA: poblacion,
    foto: foto(
      "danza-polleras-rosadas-tarima",
      "Dos jóvenes con polleras rosadas abiertas bailando en una tarima, junto a compañeros con vestuario blanco",
      1000,
      723,
    ),
    fotosExtra: [
      foto(
        "danza-ensayo-pasillo",
        "Jóvenes con polleras rosadas ensayando una coreografía en el pasillo de la sede",
        834,
        626,
      ),
      foto(
        "danza-ensayo-sede",
        "Jóvenes bailando con polleras rosadas y sombreros durante un ensayo",
        1599,
        899,
      ),
      foto(
        "danza-trajes-indigenas",
        "Jóvenes con trajes y penachos de colores posando antes de una presentación de danza",
        1600,
        1067,
      ),
    ],
  },
  {
    slug: "artes-plasticas",
    nombre: "Artes plásticas",
    etiqueta: "Artes plásticas",
    color: "tinta",
    resumen: "Pintamos, dibujamos y creamos en el taller.",
    descripcion: [
      "En el taller de artes plásticas nuestros jóvenes pintan, dibujan y crean con distintos materiales.",
    ],
    dirigidoA: poblacion,
    foto: foto(
      "artes-pintando-mesa",
      "Jóvenes pintando con pincel sobre una mesa en el taller de artes plásticas",
      738,
      553,
    ),
    fotosExtra: [
      foto(
        "artes-dibujos-piso",
        "Jóvenes observando sus dibujos extendidos en el piso del salón",
        1200,
        1600,
      ),
      foto(
        "artes-pintando-pincel",
        "Joven concentrado pintando con pincel sobre una pieza amarilla",
        1200,
        1600,
      ),
      foto(
        "artes-taller-sede",
        "Estudiantes dibujando en grupo en un salón decorado con banderines",
        770,
        578,
      ),
    ],
  },
  {
    slug: "deportes",
    nombre: "Deportes",
    etiqueta: "Deportes",
    color: "verde",
    resumen: "Baloncesto y ejercicio al aire libre.",
    descripcion: [
      "Nuestros jóvenes practican baloncesto y ejercicio al aire libre, en equipo y a su ritmo.",
    ],
    dirigidoA: poblacion,
    foto: foto(
      "deportes-baloncesto-parque",
      "Jóvenes jugando con balones de baloncesto en una cancha de un parque",
      840,
      630,
    ),
    fotosExtra: [
      foto(
        "deportes-baloncesto-silla-ruedas",
        "Joven en silla de ruedas y su compañero jugando baloncesto en una cancha",
        574,
        934,
      ),
      foto(
        "deportes-ejercicio-cancha",
        "Jóvenes con sudadera azul haciendo ejercicio en círculo en una cancha",
        871,
        1419,
      ),
    ],
  },
  {
    slug: "emprendimientos",
    nombre: "Emprendimientos",
    etiqueta: "Emprendimientos",
    color: "naranja",
    resumen: "Pocillos y camisetas hechos por nuestros jóvenes.",
    descripcion: [
      "Nuestros jóvenes hacen productos como pocillos personalizados y camisetas. Puedes pedirlos en nuestra tienda.",
    ],
    dirigidoA: poblacion,
    foto: {
      src: "/images/productos/pocillos-personalizados-1.webp",
      alt: "Tres pocillos personalizados con diseños de colores, hechos por nuestros jóvenes",
      ancho: 674,
      alto: 506,
    },
    fotosExtra: [
      {
        src: "/images/productos/pocillos-dibujos-2.webp",
        alt: "Dos pocillos blancos decorados con dibujos hechos a mano",
        ancho: 672,
        alto: 505,
      },
      {
        src: "/images/productos/pocillos-dia-del-padre-3.webp",
        alt: "Dos pocillos personalizados para el Día del Padre, con mensajes y dibujos",
        ancho: 663,
        alto: 497,
      },
      {
        src: "/images/productos/pocillos-fotos-4.webp",
        alt: "Tres pocillos personalizados con fotos y mensajes",
        ancho: 660,
        alto: 495,
      },
    ],
  },
  {
    slug: "salidas-pedagogicas",
    nombre: "Salidas pedagógicas",
    etiqueta: "Salidas",
    color: "rojo",
    resumen: "Paseos para aprender, compartir y divertirnos.",
    descripcion: [
      "Salimos de la sede para conocer nuevos lugares, practicar la vida en comunidad y compartir en grupo.",
    ],
    dirigidoA: poblacion,
    foto: foto(
      "salida-bolos-grupo",
      "Estudiantes sosteniendo bolas de bolos y celebrando en una pista de bolos",
      1080,
      808,
    ),
    fotosExtra: [
      foto(
        "salida-rueda-de-la-fortuna",
        "Estudiantes con sudadera posando frente a una gran rueda de la fortuna",
        1072,
        740,
      ),
      foto(
        "salida-gala-premios",
        "Cuatro asistentes con traje oscuro posando en la alfombra roja de una gala",
        1080,
        658,
      ),
    ],
  },
];
