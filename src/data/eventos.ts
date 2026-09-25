import type { Evento } from "@/lib/types";

export const eventos: Evento[] = [
  {
    // TODO(contenido): eventos reales. Borrar los dos de ejemplo.
    id: "ejemplo-presentacion-noviembre",
    titulo: "Evento de ejemplo: presentación del grupo",
    tipo: "presentacion",
    fecha: "2026-11-14",
    horaInicio: "15:00",
    horaFin: "17:00",
    lugar: "Sede de la fundación",
    ciudad: "Bogotá",
    descripcion:
      "Así se verá un evento próximo. Cambia el título, la fecha y el lugar en src/data/eventos.ts.",
    ejemplo: true,
  },
  {
    id: "ejemplo-actividad-agosto",
    titulo: "Evento de ejemplo: jornada con familias",
    tipo: "actividad",
    fecha: "2026-08-22",
    lugar: "Sede de la fundación",
    ciudad: "Bogotá",
    descripcion:
      "Así se verá un evento que ya pasó. Aparece en la pestaña «Pasados» de la agenda.",
    ejemplo: true,
  },
];

export const nombresTipoEvento = {
  presentacion: "Presentación",
  festival: "Festival",
  actividad: "Actividad",
  colecta: "Colecta",
} as const;
