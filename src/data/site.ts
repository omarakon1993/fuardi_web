import type { SiteConfig } from "@/lib/types";

export const site: SiteConfig = {
  nombre: "Fundación Armonía Diversa",
  sigla: "FUARDI",
  lema: "La Música Rompe Barreras",
  descripcion:
    "Fundación sin ánimo de lucro de Suba, Bogotá, que ofrece formación académica y artística a niños, niñas, jóvenes y adultos con discapacidad. Nuestro grupo de gaitas y tambores lleva la música de los Montes de María a tarimas de todo el país.",
  presentacion:
    "Somos una fundación de Suba, Bogotá. Formamos a niños, jóvenes y adultos con discapacidad en música, danza y canto, y los acompañamos hasta la tarima.",
  // TODO(contenido): dominio definitivo de la fundación.
  url: "https://fuardi.org",
  director: "Daniel Hurtado Yepes",
  telefono: "320 829 8137",
  whatsapp: "573208298137",
  correo: "fuardi18@gmail.com",
  direccion: {
    calle: "Calle 134 #101b-20",
    localidad: "Suba",
    ciudad: "Bogotá D.C.",
    region: "Bogotá D.C.",
    pais: "CO",
  },
  mapa: {
    embedUrl:
      "https://maps.google.com/maps?q=Calle%20134%20%23101b-20%2C%20Suba%2C%20Bogot%C3%A1&z=16&output=embed",
    url: "https://www.google.com/maps/search/?api=1&query=Calle%20134%20%23101b-20%2C%20Suba%2C%20Bogot%C3%A1",
  },
  redes: [
    {
      red: "youtube",
      etiqueta: "YouTube",
      url: "https://www.youtube.com/@fundacionarmoniadiversa5451",
    },
    // TODO(contenido): enlaces de Facebook, Instagram y TikTok.
  ],
  // TODO(contenido): enlace al canal de WhatsApp.
  canalWhatsApp: undefined,
  // TODO(contenido): NIT de la fundación.
  nit: undefined,
  // TODO(contenido): horario de atención.
  horarioAtencion: undefined,
  // TODO(contenido): URL de inserción del Google Calendar público, si lo crean.
  googleCalendarEmbedUrl: undefined,
  donaciones: {
    // TODO(contenido): cuenta bancaria, Nequi y Daviplata.
    cuentas: [],
    // TODO(contenido): código QR para donar.
    qr: undefined,
  },
  // TODO(contenido): certificado de existencia y demás documentos (PDF en public/documentos/).
  documentos: [],
  // TODO(contenido): foto del grupo tocando en tarima (public/images/hero/).
  heroFoto: undefined,
  // TODO(contenido): confirmar las cifras con la fundación antes de publicar.
  cifras: [
    { valor: "25", texto: "jóvenes en formación" },
    { valor: "2016", texto: "nace nuestro grupo de gaitas y tambores" },
    { valor: "+12", texto: "festivales y encuentros" },
    {
      valor: "4",
      texto: "departamentos: Bogotá, Bolívar, Cundinamarca y Sucre",
    },
  ],
  // TODO(contenido): misión y visión definitivas.
  mision:
    "Somos una fundación sin ánimo de lucro de Suba, Bogotá, que ofrece formación académica y artística (música tradicional colombiana, danza y canto) a niños, jóvenes y adultos con discapacidad. Fortalecemos sus habilidades y su identidad cultural para que la sociedad los reconozca por sus capacidades.",
  vision:
    "Ser un referente en Colombia de inclusión a través del arte, con un grupo de música y danza reconocido a nivel nacional y emprendimientos que aporten a la autonomía de nuestros jóvenes.",
  misionVisionTemporales: true,
  resenaCorta:
    "Trabajamos con niños, niñas, jóvenes y adultos con discapacidad en la localidad de Suba. Creemos que la música y la danza fortalecen habilidades cognitivas, comunicativas, sociales y emocionales, y que la discapacidad tiene muchas capacidades.",
  historia: [
    "La Fundación Armonía Diversa trabaja con niños, niñas, jóvenes y adultos con discapacidad (síndrome de Down, discapacidad cognitiva, hipoacusia) en la localidad de Suba. Hoy acompaña a 25 jóvenes y la dirige Daniel Hurtado Yepes.",
    "Partimos de una convicción: el lenguaje musical y la práctica artística fortalecen habilidades cognitivas, comunicativas, sociales, afectivas y emocionales. Además, aportan a la construcción de la identidad cultural y folclórica del país y de cada participante.",
    "En 2016 nace nuestro grupo de gaitas y tambores. Interpreta aires de cumbia, puya, gaita y porro, y rescata desde el interior del país la música tradicional de los Montes de María.",
    "Al ver los buenos resultados, decidimos dar a conocer nuestro trabajo para motivar a otras familias que tienen personas con discapacidad. Nos guía una idea sencilla: la discapacidad tiene muchas capacidades, y los talleres artísticos eliminan barreras sociales.",
  ],
  objetivos: [
    "Romper barreras sociales, para que la muestra artística contribuya al reconocimiento y la resignificación de los participantes por parte de su comunidad, sus familias y cuidadores, y demás agentes relacionados con la discapacidad.",
    "Garantizar el derecho de las personas con discapacidad al reconocimiento y al apoyo de su identidad cultural.",
    "Garantizar el reconocimiento y la formación necesaria para que las personas con discapacidad participen en actividades culturales de manera eficiente y productiva.",
    "Realizar procesos de formación artística, como música y danza, que fortalezcan habilidades y destrezas artísticas con un acercamiento a la identidad cultural.",
    "Lograr el ensamble de una presentación de calidad que evidencie el desarrollo de las habilidades artísticas musicales de los participantes, sustentada en lo técnico y en el saber propio de este lenguaje artístico.",
    "Conservar el acervo cultural del país y sus raíces, dando continuidad a la participación de las personas con discapacidad en el ámbito cultural.",
  ],
};

/** Mensajes prellenados de WhatsApp. */
export const mensajesWhatsApp = {
  general: "Hola, quiero más información sobre la Fundación Armonía Diversa.",
  inscripcion:
    "Hola, quiero información para inscribir a una persona en la Fundación Armonía Diversa.",
  presentacion: "Hola, quiero contratar una presentación del grupo de FUARDI.",
  donacion: "Hola, quiero hacer un aporte a la Fundación Armonía Diversa.",
  producto: (nombre: string) =>
    `Hola, me interesa ${nombre} de la tienda de FUARDI`,
};
