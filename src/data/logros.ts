import type { Logro } from "@/lib/types";

// TODO(contenido): fotos de diplomas y medallas en public/images/logros/.
export const logros: Logro[] = [
  {
    id: "2016-alcaldia-suba",
    anio: 2016,
    titulo: "Reconocimiento de la Alcaldía Local de Suba",
    lugar: "Suba, Bogotá",
    tipo: "reconocimiento",
  },
  {
    id: "2016-san-jacinto",
    anio: 2016,
    titulo: "Festival Nacional Autóctono de Gaitas de San Jacinto",
    detalle:
      "Reconocimiento por generar espacios de inclusión artística y social para las personas con discapacidad.",
    lugar: "San Jacinto, Bolívar",
    tipo: "reconocimiento",
    destacado: true,
  },
  {
    id: "2017-gaitas-capital",
    anio: 2017,
    titulo: "Festival Gaitas en la Capital",
    lugar: "Bogotá",
    tipo: "participacion",
  },
  {
    id: "2018-san-jacinto",
    anio: 2018,
    titulo: "Festival Nacional Autóctono de Gaitas de San Jacinto",
    detalle: "Reconocimiento a la inclusión artística y social.",
    lugar: "San Jacinto, Bolívar",
    tipo: "reconocimiento",
  },
  {
    id: "2018-suba-es-lo-nuestro",
    anio: 2018,
    titulo: "Segunda versión del Festival Suba es lo Nuestro",
    detalle: "Reconocimiento a su participación.",
    lugar: "Suba, Bogotá",
    tipo: "reconocimiento",
  },
  {
    id: "2018-seres",
    anio: 2018,
    titulo: "SERES Circuito de Artes",
    detalle: "Reconocimiento y acompañamiento en formación artística.",
    tipo: "reconocimiento",
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
  },
  {
    id: "2019-gaitas-capital",
    anio: 2019,
    titulo: "Festival Gaitas en la Capital",
    lugar: "Bogotá",
    tipo: "participacion",
  },
  {
    id: "2019-gala-exaltacion",
    anio: 2019,
    titulo:
      "9ª Gala de Exaltación y Reconocimientos a Personas con Discapacidad",
    detalle: "Galardón a la Práctica Artística en Música.",
    tipo: "galardon",
    destacado: true,
  },
  {
    id: "2021-gaitas-capital",
    anio: 2021,
    titulo: "VI Festival de Gaitas en la Capital",
    lugar: "Bogotá",
    tipo: "participacion",
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
    id: "2023-sincelejo",
    anio: 2023,
    titulo: "XII Encuentro de Gaitas, Pitos y Tambores",
    lugar: "Sincelejo, Sucre",
    tipo: "participacion",
    destacado: true,
  },
  {
    id: "2024-danzando-con-el-sol",
    anio: 2024,
    titulo: "XIX Encuentro Nacional de Danza Folclórica «Danzando con el Sol»",
    tipo: "participacion",
    destacado: true,
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
