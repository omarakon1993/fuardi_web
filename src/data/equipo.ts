import type { MiembroEquipo } from "@/lib/types";

export const equipo: MiembroEquipo[] = [
  {
    nombre: "Daniel Hurtado Yepes",
    cargo: "Director",
    foto: {
      src: "/images/equipo/daniel-hurtado.webp",
      alt: "Daniel Hurtado Yepes, director de la fundación, con la chaqueta del grupo, sonriendo en la sede",
      ancho: 814,
      alto: 831,
    },
  },
  {
    nombre: "Shirley Berrío González",
    cargo: "Coordinadora y maestra",
    foto: {
      src: "/images/equipo/shirley-berrio.webp",
      alt: "Shirley Berrío González, coordinadora y maestra de la fundación, con un collar de cuentas rojas, sonriendo",
      ancho: 800,
      alto: 800,
    },
  },
  // TODO(contenido): docentes y equipo de trabajo.
];

/** Quien creó y administra este sitio web. Va en una fila aparte y más pequeña. */
export const creadorWeb: MiembroEquipo = {
  nombre: "Omar Andrés Gutiérrez",
  cargo: "Creador y administrador del sitio web",
  correo: "omarandresx2@outlook.com",
  foto: {
    src: "/images/equipo/omar-gutierrez.webp",
    alt: "Omar Andrés Gutiérrez, creador y administrador del sitio web, con sudadera negra, sonriendo",
    ancho: 600,
    alto: 600,
  },
};
