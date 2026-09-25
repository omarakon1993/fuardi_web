import type { Foto, Logro } from "@/lib/types";

/** Foto del diploma o placa en public/images/logros/<id>.webp. */
function diploma(id: string, alt: string, ancho: number, alto: number): Foto {
  return { src: `/images/logros/${id}.webp`, alt, ancho, alto };
}

// Datos tomados de los certificados de experiencia y trayectoria de la fundación.
export const logros: Logro[] = [
  {
    id: "2016-alcaldia-suba",
    anio: 2016,
    titulo: "Reconocimiento de la Alcaldía Local de Suba",
    detalle:
      "Por nuestro compromiso para que la población con discapacidad venza barreras y seamos más incluyentes.",
    lugar: "Suba, Bogotá",
    tipo: "reconocimiento",
    foto: diploma(
      "2016-alcaldia-suba",
      "Diploma de reconocimiento de la Alcaldía Local de Suba al Grupo Armonía Diversa",
      306,
      410,
    ),
  },
  {
    id: "2016-san-jacinto",
    anio: 2016,
    titulo:
      "Mención de honor en el XXV Festival Nacional Autóctono de Gaitas de San Jacinto",
    detalle:
      "Por nuestro esfuerzo, organización, dedicación y excelente participación.",
    lugar: "San Jacinto, Bolívar",
    tipo: "reconocimiento",
    destacado: true,
    foto: diploma(
      "2016-san-jacinto",
      "Diploma de mención de honor de la Corporación Folclórica y Artesanal de San Jacinto",
      419,
      315,
    ),
  },
  {
    id: "2017-gaitas-capital",
    anio: 2017,
    titulo: "II Encuentro de Gaitas en la Capital",
    lugar: "Bogotá",
    tipo: "participacion",
    foto: diploma(
      "2017-gaitas-capital",
      "Certificado de participación de Armonía Diversa en el II Encuentro de Gaitas en la Capital",
      443,
      328,
    ),
  },
  {
    id: "2018-san-jacinto",
    anio: 2018,
    titulo: "XXVII Festival Nacional Autóctono de Gaitas de San Jacinto",
    detalle: "Reconocimiento a la inclusión artística y social.",
    lugar: "San Jacinto, Bolívar",
    tipo: "reconocimiento",
    foto: diploma(
      "2018-san-jacinto",
      "Certificado de la Corporación Folclórica y Artesanal de San Jacinto por la participación en el festival",
      329,
      249,
    ),
  },
  {
    id: "2018-suba-es-lo-nuestro",
    anio: 2018,
    titulo: "Festival Suba es lo Nuestro",
    detalle:
      "Certificado de la Corporación Suba al Aire por participar en la primera y la segunda versión.",
    lugar: "Suba, Bogotá",
    tipo: "reconocimiento",
    foto: diploma(
      "2018-suba-es-lo-nuestro",
      "Carta de certificación de la Corporación para la Comunicación y la Educación Suba al Aire",
      325,
      448,
    ),
  },
  {
    id: "2018-seres",
    anio: 2018,
    titulo: "SERES Circuito de Arte",
    detalle:
      "Proceso de formación en gestión cultural con la Alcaldía Mayor de Bogotá, Idartes y la Corporación El Eje.",
    lugar: "Bogotá",
    tipo: "reconocimiento",
    foto: diploma(
      "2018-seres",
      "Certificado rojo del circuito de arte SERES a nombre de la Fundación Armonía Diversa",
      473,
      379,
    ),
  },
  {
    id: "2018-canal-capital",
    anio: 2018,
    titulo: "Nota en Canal Capital, programa «Gente de mi barrio»",
    detalle: "Con tambores, jóvenes superan las barreras de la discapacidad.",
    tipo: "medios",
    videoId: "W4rQxP0HGak",
  },
  {
    id: "2019-san-jacinto",
    anio: 2019,
    titulo: "Festival Nacional Autóctono de Gaitas de San Jacinto",
    detalle: "Reconocimiento a la inclusión artística y social.",
    lugar: "San Jacinto, Bolívar",
    tipo: "reconocimiento",
    // TODO(contenido): foto del diploma de 2019.
  },
  {
    id: "2019-dia-blanco-gachancipa",
    anio: 2019,
    titulo: "Agradecimiento de la Alcaldía de Gachancipá",
    detalle:
      "Por nuestra participación en la celebración del Día Blanco, el 8 de noviembre de 2019.",
    lugar: "Gachancipá, Cundinamarca",
    tipo: "reconocimiento",
    foto: diploma(
      "2019-dia-blanco-gachancipa",
      "Carta de agradecimiento de la Administración Municipal de Gachancipá a la fundación",
      401,
      356,
    ),
  },
  {
    id: "2019-gaitas-capital",
    anio: 2019,
    titulo: "IV Encuentro de Gaitas en la Capital",
    detalle:
      "Reconocimiento por nuestra participación, del 13 al 15 de diciembre.",
    lugar: "Bogotá",
    tipo: "reconocimiento",
    foto: diploma(
      "2019-gaitas-capital",
      "Diploma de reconocimiento del IV Encuentro de Gaitas en la Capital a la Fundación Armonía Diversa",
      381,
      294,
    ),
  },
  {
    id: "2019-gala-exaltacion",
    anio: 2019,
    titulo:
      "9ª Gala de Exaltación y Reconocimiento de las Personas con Discapacidad",
    detalle:
      "Galardón a la Práctica Artística en Música, entregado por la Alcaldía Mayor de Bogotá.",
    tipo: "galardon",
    destacado: true,
    foto: diploma(
      "2019-gala-exaltacion",
      "Galardón de cristal de la 9ª Gala de Exaltación a la Fundación Armonía Diversa",
      360,
      270,
    ),
  },
  {
    id: "2021-artifices",
    anio: 2021,
    titulo: "Artífices: formación en gestión artística y cultural comunitaria",
    detalle:
      "Reconocimiento del Instituto Distrital de las Artes (Idartes) por participar del 13 de febrero al 25 de marzo.",
    lugar: "Bogotá",
    tipo: "reconocimiento",
    foto: diploma(
      "2021-artifices",
      "Diploma de reconocimiento de Idartes por la participación en Artífices",
      350,
      249,
    ),
  },
  {
    id: "2021-gaitas-capital",
    anio: 2021,
    titulo: "VI Festival de Gaitas en la Capital",
    lugar: "Bogotá",
    tipo: "participacion",
  },
  {
    id: "2022-compartiendo-lo-construido",
    anio: 2022,
    titulo: "Feria «Compartiendo lo Construido»",
    detalle:
      "Participamos con una gran muestra de talento en el componente «Arte Con-Sentidos», de la Casa de la Cultura Juvenil El Rincón e Idartes.",
    lugar: "Bosa, Bogotá",
    tipo: "participacion",
    foto: diploma(
      "2022-compartiendo-lo-construido",
      "Certificado de participación de la agrupación de música y danza Armonía Diversa en la feria",
      412,
      320,
    ),
  },
  {
    id: "2022-dia-blanco-gacheta",
    anio: 2022,
    titulo: "Celebración del Día Blanco",
    lugar: "Gachetá, Cundinamarca",
    tipo: "participacion",
  },
  {
    id: "2022-dia-blanco-granada",
    anio: 2022,
    titulo: "Celebración del Día Blanco",
    lugar: "Granada, Cundinamarca",
    tipo: "participacion",
  },
  {
    id: "2023-carnaval-ronda-del-rio",
    anio: 2023,
    titulo: "Carnaval de la Ronda del Río",
    detalle:
      "Certificado de la Alcaldía Local de Suba: participamos como colectivo invitado, representando con orgullo al sector cultural y artístico de Suba.",
    tipo: "reconocimiento",
    foto: diploma(
      "2023-carnaval-ronda-del-rio",
      "Certificado de la Alcaldía Local de Suba por la participación en el Carnaval de la Ronda del Río",
      396,
      306,
    ),
  },
  {
    id: "2023-melodias-de-antano",
    anio: 2023,
    titulo: "Melodías de Antaño",
    detalle:
      "Tejedores de Sociedad resaltó nuestro talento y profesionalismo como artistas de Suba en este espacio de música colombiana y latinoamericana.",
    tipo: "reconocimiento",
    foto: diploma(
      "2023-melodias-de-antano",
      "Certificado de Tejedores de Sociedad por la participación en Melodías de Antaño",
      608,
      540,
    ),
  },
  {
    id: "2023-sincelejo",
    anio: 2023,
    titulo: "XII Encuentro de Gaitas, Pitos y Tambores",
    detalle: "Del 28 al 30 de septiembre.",
    lugar: "Sincelejo, Sucre",
    tipo: "participacion",
    destacado: true,
    foto: diploma(
      "2023-sincelejo",
      "Certificado de participación en el XII Encuentro de Gaitas, Pitos y Tambores de Sincelejo",
      397,
      312,
    ),
  },
  {
    id: "2024-semilla-fest",
    anio: 2024,
    titulo: "III Festival Semilla Fest",
    detalle:
      "Certificado de Tejedores de Sociedad y la Casa de la Cultura Juvenil El Rincón por ser arte y parte del festival.",
    lugar: "Bogotá",
    tipo: "reconocimiento",
    foto: diploma(
      "2024-semilla-fest",
      "Certificado del Festival Semilla Fest 2024 a nombre de Armonía Diversa",
      419,
      305,
    ),
  },
  {
    id: "2024-danzando-con-el-sol",
    anio: 2024,
    titulo: "XIX Encuentro Nacional de Danza Folclórica «Danzando con el Sol»",
    detalle: "Reconocimiento a la agrupación participante.",
    lugar: "Anapoima, Cundinamarca",
    tipo: "reconocimiento",
    destacado: true,
    foto: diploma(
      "2024-danzando-con-el-sol",
      "Placa de reconocimiento del XIX Encuentro Nacional de Danza Folclórica en Anapoima",
      242,
      507,
    ),
  },
  {
    id: "2025-diversific-arte",
    anio: 2025,
    titulo:
      "Proyecto «Diversific-Arte», ganador de la beca Más Cultura Local Suba 2025",
    detalle:
      "Beca para la creación y formación artística. Certificado de participación del 9 de agosto de 2025.",
    lugar: "Suba, Bogotá",
    tipo: "participacion",
    destacado: true,
    foto: diploma(
      "2025-diversific-arte",
      "Certificado de participación de la Fundación Armonía Diversa en el proyecto Diversific-Arte",
      1200,
      889,
    ),
  },
];

export const nombresTipoLogro = {
  reconocimiento: "Reconocimiento",
  galardon: "Galardón",
  participacion: "Participación",
  medios: "En los medios",
} as const;

export const notaTrayectoria =
  "También hemos participado en festivales locales, presentaciones en colegios y celebraciones diversas.";
