import type { Presentacion } from "@/lib/types";

// Tomadas de la trayectoria del brochure. "salida" = viaje fuera de Bogotá.
// TODO(contenido): fechas exactas y fotos de cada presentación (public/images/galeria/).
export const presentaciones: Presentacion[] = [
  {
    id: "2016-san-jacinto",
    titulo: "Festival Nacional Autóctono de Gaitas",
    anio: 2016,
    lugar: "San Jacinto, Bolívar",
    tipo: "salida",
    fotos: [],
  },
  {
    id: "2017-gaitas-capital",
    titulo: "Festival Gaitas en la Capital",
    anio: 2017,
    lugar: "Bogotá",
    tipo: "presentacion",
    fotos: [],
  },
  {
    id: "2018-san-jacinto",
    titulo: "Festival Nacional Autóctono de Gaitas",
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
    fotos: [],
  },
  {
    id: "2018-seres",
    titulo: "SERES Circuito de Artes",
    anio: 2018,
    // TODO(contenido): lugar.
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
    titulo: "Festival Gaitas en la Capital",
    anio: 2019,
    lugar: "Bogotá",
    tipo: "presentacion",
    fotos: [],
  },
  {
    id: "2019-gala-exaltacion",
    titulo:
      "9ª Gala de Exaltación y Reconocimientos a Personas con Discapacidad",
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
    id: "2023-sincelejo",
    titulo: "XII Encuentro de Gaitas, Pitos y Tambores",
    anio: 2023,
    lugar: "Sincelejo, Sucre",
    tipo: "salida",
    fotos: [],
  },
  {
    id: "2024-danzando-con-el-sol",
    titulo: "XIX Encuentro Nacional de Danza Folclórica «Danzando con el Sol»",
    anio: 2024,
    // TODO(contenido): lugar y si fue salida.
    tipo: "presentacion",
    fotos: [],
  },
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
