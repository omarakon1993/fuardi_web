import type { NombreIcono } from "@/components/ui/Icon";

export type MotivoContacto =
  | "inscripcion"
  | "aporte"
  | "voluntariado"
  | "presentacion"
  | "alianza"
  | "otro";

export interface FormaDeAyudar {
  id: string;
  titulo: string;
  resumen: string;
  detalle: string[];
  icono: NombreIcono;
  boton: string;
  href: string;
}

export const formasDeAyudar: FormaDeAyudar[] = [
  {
    id: "donar",
    titulo: "Dona dinero",
    resumen:
      "Tu aporte sostiene las clases, los instrumentos y las salidas a festivales.",
    detalle: [
      "Con tu donación compramos y reparamos instrumentos, pagamos transporte a festivales y sostenemos las clases.",
    ],
    icono: "corazon",
    boton: "Quiero donar",
    href: "/contacto/?motivo=aporte",
  },
  {
    id: "especie",
    titulo: "Dona en especie",
    resumen: "Instrumentos, vestuario, materiales o alimentos.",
    detalle: [
      "Recibimos instrumentos, vestuario, materiales para los talleres y otros elementos. Escríbenos antes para coordinar la entrega.",
    ],
    icono: "paquete",
    boton: "Ofrecer una donación",
    href: "/contacto/?motivo=aporte",
  },
  {
    id: "voluntariado",
    titulo: "Sé voluntario",
    resumen: "Comparte tu tiempo y lo que sabes hacer.",
    detalle: [
      "Si sabes de música, danza, pedagogía, comunicación o cualquier oficio, tu tiempo puede hacer la diferencia.",
    ],
    icono: "personas",
    boton: "Quiero ser voluntario",
    href: "/contacto/?motivo=voluntariado",
  },
  {
    id: "presentacion",
    titulo: "Contrata una presentación",
    resumen: "Llevamos gaitas y tambores a tu evento, colegio o empresa.",
    detalle: [
      "Nuestro grupo de gaitas y tambores se presenta en eventos, colegios, empresas y celebraciones. Es una forma de disfrutar la música tradicional y apoyar a nuestros artistas.",
    ],
    icono: "musica",
    boton: "Pedir una presentación",
    href: "/contacto/?motivo=presentacion",
  },
  {
    id: "alianza",
    titulo: "Haz una alianza",
    resumen: "Empresas e instituciones que quieren sumar a largo plazo.",
    detalle: [
      "Buscamos empresas e instituciones que quieran apoyar la inclusión a través del arte: patrocinio de festivales, empleo para nuestros jóvenes, compra de productos o programas de voluntariado corporativo.",
    ],
    icono: "empresa",
    boton: "Proponer una alianza",
    href: "/contacto/?motivo=alianza",
  },
];

/** Las cuatro que se muestran en la página de inicio. */
export const ayudasInicio = [
  "donar",
  "voluntariado",
  "presentacion",
  "alianza",
];
