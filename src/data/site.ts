import type { SiteConfig } from "@/lib/types";

export const site: SiteConfig = {
  nombre: "Fundación Armonía Diversa",
  sigla: "FUARDI",
  lema: "La Música Rompe Barreras",
  descripcion:
    "Fundación sin ánimo de lucro de Bogotá que promueve el desarrollo, la inclusión y la participación de niñas, niños, jóvenes y adultos con discapacidad a través de la formación artística en música y danza. Nuestro grupo de gaitas y tambores lleva la música de los Montes de María a tarimas de todo el país.",
  presentacion:
    "Somos una fundación sin ánimo de lucro que promueve el desarrollo, la inclusión y la participación de niñas, niños, jóvenes y adultos con discapacidad, a través de procesos de formación artística en música y danza. Estamos ubicados en la ciudad de Bogotá, Colombia.",
  url: "https://www.fuardi.com",
  director: "Daniel Hurtado Yepes",
  // Solo se publica en la política de datos (lo exige la ley). En el resto
  // del sitio se usa el enlace a WhatsApp.
  telefono: "320 829 8137",
  whatsapp: "573208298137",
  correo: "fuardi18@gmail.com",
  direccion: {
    calle: "Calle 135 A #109-21",
    localidad: "Suba",
    ciudad: "Bogotá D.C.",
    region: "Bogotá D.C.",
    pais: "CO",
  },
  mapa: {
    embedUrl:
      "https://maps.google.com/maps?q=Calle%20135A%20%23109-21%2C%20Suba%2C%20Bogot%C3%A1&z=16&output=embed",
    url: "https://www.google.com/maps/search/?api=1&query=Calle%20135A%20%23109-21%2C%20Suba%2C%20Bogot%C3%A1",
  },
  redes: [
    {
      red: "instagram",
      etiqueta: "Instagram",
      usuario: "@fuardi18",
      url: "https://www.instagram.com/fuardi18/",
    },
    {
      red: "tiktok",
      etiqueta: "TikTok",
      usuario: "@fundacionarmoniadiversa",
      url: "https://www.tiktok.com/@fundacionarmoniadiversa",
    },
    {
      red: "facebook",
      etiqueta: "Facebook",
      usuario: "Fundación Armonía Diversa",
      url: "https://www.facebook.com/share/1EXRCRd7UB/",
    },
    {
      red: "youtube",
      etiqueta: "YouTube",
      usuario: "@fundacionarmoniadiversa5451",
      url: "https://www.youtube.com/@fundacionarmoniadiversa5451",
    },
  ],
  canalWhatsApp: "https://whatsapp.com/channel/0029Vb8jtSW47XeH2HQew525",
  nit: "901.138.083-3",
  // TODO(contenido): horario de atención.
  horarioAtencion: undefined,
  donaciones: {
    // TODO(contenido): cuenta bancaria, Nequi y Daviplata.
    cuentas: [],
    // TODO(contenido): código QR para donar.
    qr: undefined,
  },
  // TODO(contenido): certificado de existencia y demás documentos (PDF en public/documentos/).
  documentos: [],
  heroFoto: {
    src: "/images/hero/grupo-carpa-sombreros.webp",
    alt: "Nuestros artistas con vestuario blanco, pañoleta roja y sombrero vueltiao, sentados junto a sus profesores bajo una carpa",
    ancho: 865,
    alto: 649,
  },
  historiaFoto: {
    src: "/images/galeria/historia-grupo-vestuario-blanco.webp",
    alt: "Jóvenes del grupo con vestuario blanco, pañoleta roja y polleras de colores posando en un salón",
    ancho: 1080,
    alto: 623,
  },
  /** Foto de «Quiénes somos» en la página de inicio. */
  quienesSomosFoto: {
    src: "/images/galeria/grupo-sudadera-azul-plaza.webp",
    alt: "Estudiantes con la sudadera azul de la fundación sentados juntos y sonriendo en una plaza",
    ancho: 1600,
    alto: 1200,
  },
  // TODO(contenido): confirmar las cifras con la fundación antes de publicar.
  cifras: [
    { valor: "35", texto: "jóvenes en formación" },
    { valor: "2016", texto: "nace nuestro grupo de gaitas y tambores" },
    { valor: "+12", texto: "festivales y encuentros" },
    {
      valor: "4",
      texto: "departamentos: Bogotá, Bolívar, Cundinamarca y Sucre",
    },
  ],
  // Textos oficiales de la sede (se corrigieron tildes y mayúsculas).
  mision:
    "Fortalecer y mostrar los diferentes talentos de los niños y jóvenes con discapacidad a través de actividades artísticas, desarrollando habilidades intelectuales y adaptativas para eliminar barreras sociales, ayudando a sus familias al reconocimiento dentro de la sociedad.",
  vision:
    "A futuro, la Fundación Armonía Diversa será reconocida por desarrollar habilidades intelectuales y adaptativas en niños y jóvenes con discapacidad, por medio de actividades artísticas, específicamente de música y danza, para la eliminación de barreras, siendo partícipes de la sociedad mostrando sus capacidades.",
  misionVisionTemporales: false,
  resenaCorta:
    "Trabajamos con niños, niñas, jóvenes y adultos con discapacidad en la localidad de Suba. Creemos que la música y la danza fortalecen habilidades cognitivas, comunicativas, sociales y emocionales, y que la discapacidad tiene muchas capacidades.",
  historia: [
    "La Fundación Armonía Diversa trabaja con niños, niñas, jóvenes y adultos con discapacidad (síndrome de Down, discapacidad cognitiva, hipoacusia) en la localidad de Suba. Iniciamos como fundación en 2017. Hoy acompaña a 35 jóvenes y la dirige Daniel Hurtado Yepes.",
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
