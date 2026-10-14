import type { Foto, Presentacion } from "@/lib/types";

// Tomadas del brochure y de los certificados de trayectoria. "salida" = viaje fuera de Bogotá.
// TODO(contenido): fotos de cada presentación (public/images/galeria/).
export const presentaciones: Presentacion[] = [
  {
    id: "2016-san-jacinto",
    titulo: "XXV Festival Nacional Autóctono de Gaitas",
    anio: 2016,
    lugar: "San Jacinto, Bolívar",
    tipo: "salida",
    fotos: [],
  },
  {
    id: "2017-gaitas-capital",
    titulo: "II Encuentro de Gaitas en la Capital",
    anio: 2017,
    lugar: "Bogotá",
    tipo: "presentacion",
    fotos: [],
  },
  {
    id: "2018-san-jacinto",
    titulo: "XXVII Festival Nacional Autóctono de Gaitas",
    anio: 2018,
    lugar: "San Jacinto, Bolívar",
    tipo: "salida",
    fotos: [],
  },
  {
    id: "2018-suba-es-lo-nuestro",
    titulo: "Festival Suba es lo Nuestro",
    anio: 2018,
    lugar: "Suba, Bogotá",
    tipo: "presentacion",
    descripcion: "Participamos en la primera y la segunda versión.",
    fotos: [],
  },
  {
    id: "2018-seres",
    titulo: "SERES Circuito de Arte",
    anio: 2018,
    lugar: "Bogotá",
    tipo: "presentacion",
    fotos: [],
  },
  {
    id: "2019-san-jacinto",
    titulo: "Festival Nacional Autóctono de Gaitas",
    anio: 2019,
    lugar: "San Jacinto, Bolívar",
    tipo: "salida",
    fotos: [],
  },
  {
    id: "2019-gaitas-capital",
    titulo: "IV Encuentro de Gaitas en la Capital",
    anio: 2019,
    lugar: "Bogotá",
    tipo: "presentacion",
    descripcion: "Del 13 al 15 de diciembre.",
    fotos: [],
  },
  {
    id: "2019-dia-blanco-gachancipa",
    titulo: "Celebración del Día Blanco",
    anio: 2019,
    lugar: "Gachancipá, Cundinamarca",
    tipo: "salida",
    descripcion: "8 de noviembre.",
    fotos: [],
  },
  {
    id: "2019-gala-exaltacion",
    titulo:
      "9ª Gala de Exaltación y Reconocimiento de las Personas con Discapacidad",
    anio: 2019,
    // TODO(contenido): lugar.
    tipo: "presentacion",
    fotos: [],
  },
  {
    id: "2021-gaitas-capital",
    titulo: "VI Festival de Gaitas en la Capital",
    anio: 2021,
    lugar: "Bogotá",
    tipo: "presentacion",
    fotos: [],
  },
  {
    id: "2022-dia-blanco-gacheta",
    titulo: "Celebración del Día Blanco",
    anio: 2022,
    lugar: "Gachetá, Cundinamarca",
    tipo: "salida",
    fotos: [],
  },
  {
    id: "2022-dia-blanco-granada",
    titulo: "Celebración del Día Blanco",
    anio: 2022,
    lugar: "Granada, Cundinamarca",
    tipo: "salida",
    fotos: [],
  },
  {
    id: "2022-compartiendo-lo-construido",
    titulo: "Feria «Compartiendo lo Construido»",
    anio: 2022,
    lugar: "Bosa, Bogotá",
    tipo: "presentacion",
    descripcion: "11 de junio. Componente «Arte Con-Sentidos».",
    fotos: [],
  },
  {
    id: "2023-carnaval-ronda-del-rio",
    titulo: "Carnaval de la Ronda del Río",
    anio: 2023,
    // TODO(contenido): lugar.
    tipo: "presentacion",
    descripcion: "Participamos como colectivo invitado.",
    fotos: [],
  },
  {
    id: "2023-melodias-de-antano",
    titulo: "Melodías de Antaño",
    anio: 2023,
    // TODO(contenido): lugar.
    tipo: "presentacion",
    descripcion:
      "Espacio para la difusión de la música colombiana y latinoamericana.",
    fotos: [],
  },
  {
    id: "2023-sincelejo",
    titulo: "XII Encuentro de Gaitas, Pitos y Tambores",
    anio: 2023,
    lugar: "Sincelejo, Sucre",
    tipo: "salida",
    descripcion: "Del 28 al 30 de septiembre.",
    fotos: [],
  },
  {
    id: "2024-danzando-con-el-sol",
    titulo: "XIX Encuentro Nacional de Danza Folclórica «Danzando con el Sol»",
    anio: 2024,
    lugar: "Anapoima, Cundinamarca",
    tipo: "salida",
    descripcion: "Del 10 al 12 de mayo.",
    fotos: [],
  },
  {
    id: "2024-semilla-fest",
    titulo: "III Festival Semilla Fest",
    anio: 2024,
    lugar: "Bogotá",
    tipo: "presentacion",
    fotos: [],
  },
  {
    id: "2025-colombia-diversa-mesetas",
    titulo: "Así suena Colombia Diversa",
    anio: 2025,
    lugar: "Mesetas, Meta",
    tipo: "salida",
    descripcion: "14 y 15 de agosto.",
    fotos: [
      {
        src: "/images/galeria/salida-mesetas-meta-2025.webp",
        alt: "Jóvenes de la fundación y sus profesores posando juntos, con credenciales amarillas, en Mesetas, Meta",
        ancho: 1200,
        alto: 1600,
      },
    ],
  },
];

/**
 * Fotos de la galería que no están ligadas a una presentación concreta.
 * TODO(contenido): si se sabe de qué evento es cada una, moverla a su presentación.
 */
export const galeriaGeneral: Foto[] = [
  {
    src: "/images/galeria/tarima-grupo-plaza-vestuario.webp",
    alt: "Grupo de gaitas y tambores con vestuario blanco, pañoleta roja y polleras de colores posando en una plaza",
    ancho: 1600,
    alto: 1200,
  },
  {
    src: "/images/galeria/tarima-media-torta.webp",
    alt: "Grupo tocando tambores y gaitas en el escenario de la Media Torta, con luces y pantalla gigante",
    ancho: 1599,
    alto: 899,
  },
  {
    src: "/images/galeria/tarima-danzando-con-el-sol.webp",
    alt: "Grupo de música y baile en un escenario iluminado durante el Encuentro «Danzando con el Sol»",
    ancho: 1600,
    alto: 1002,
  },
  {
    src: "/images/galeria/grupo-vestuarios-salon.webp",
    alt: "Jóvenes del grupo con trajes tradicionales, polleras y penachos posando juntos en un salón",
    ancho: 1600,
    alto: 1200,
  },
  {
    src: "/images/galeria/tarima-danza-encuentro-capital.webp",
    alt: "Pareja de baile con pollera rosada y sombrero vueltiao en un encuentro al aire libre, con el grupo de gaitas detrás",
    ancho: 1600,
    alto: 1200,
  },
  {
    src: "/images/galeria/musica-grupo-tambores-calle.webp",
    alt: "Jóvenes con vestuario blanco, sombrero vueltiao y polleras de colores junto a sus tambores en una calle",
    ancho: 1280,
    alto: 960,
  },
  {
    src: "/images/hero/grupo-tambores-conectate.webp",
    alt: "Nuestros artistas con vestuario blanco, pañoleta roja y sombrero vueltiao, junto a sus tambores en una plaza",
    ancho: 1600,
    alto: 1204,
  },
  {
    src: "/images/galeria/grupo-gaitas-tambores-navidad.webp",
    alt: "Grupo de gaitas y tambores con vestuario tradicional, penachos y polleras, junto a sus tambores",
    ancho: 1600,
    alto: 1200,
  },
  {
    src: "/images/galeria/danza-polleras-sombrero-vueltiao.webp",
    alt: "Parejas de baile con pollera roja y blanca, y camisa blanca con sombrero vueltiao, al terminar su presentación",
    ancho: 1280,
    alto: 960,
  },
  {
    src: "/images/galeria/canto-gaita-tarima.webp",
    alt: "Profesor cantando con maraca junto a jóvenes que tocan la gaita y la maraca en tarima",
    ancho: 725,
    alto: 1600,
  },
];

/** Todas las fotos de la galería: primero las de cada presentación. */
export const fotosGaleria: Foto[] = [
  ...presentaciones.flatMap((p) => p.fotos),
  ...galeriaGeneral,
];

/** Qué debe mostrar cada foto pendiente de la galería. */
export const fotosPendientesGaleria = [
  "Grupo posando con vestuario blanco y sombrero vueltiao",
  "Jóvenes tocando tambores en tarima",
  "Grupo en el escenario del festival de gaitas",
  "Jóvenes del grupo con el pendón de la fundación",
  "Presentación de danza folclórica",
  "Ensayo en la sede de la fundación",
];
