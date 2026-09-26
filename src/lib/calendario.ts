import { site } from "@/data/site";
import { aFecha, parseFecha } from "@/lib/fechas";
import type { Evento, Fecha, Hora } from "@/lib/types";

/** Lugar y ciudad en una sola línea, sin comas sobrantes. */
export function lugarEvento(evento: Evento) {
  return [evento.lugar, evento.ciudad].filter(Boolean).join(", ");
}

// Bogotá está en UTC−5 todo el año (sin horario de verano).
const DESFASE_BOGOTA_HORAS = 5;

function sinGuiones(fecha: Fecha) {
  return fecha.replaceAll("-", "");
}

/** "2026-11-14" + "15:00" (hora de Bogotá) → "20261114T200000Z" */
function aUtc(fecha: Fecha, hora: Hora) {
  const [h, m] = hora.split(":").map(Number);
  const d = parseFecha(fecha);
  d.setUTCHours(h + DESFASE_BOGOTA_HORAS, m, 0, 0);
  return d
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

function diaSiguiente(fecha: Fecha) {
  const d = parseFecha(fecha);
  d.setUTCDate(d.getUTCDate() + 1);
  return aFecha(d);
}

/** Inicio y fin en los formatos que esperan iCalendar y Google Calendar. */
function rango(evento: Evento) {
  if (evento.horaInicio) {
    const inicio = aUtc(evento.fecha, evento.horaInicio);
    const fin = evento.horaFin
      ? aUtc(evento.fechaFin ?? evento.fecha, evento.horaFin)
      : aUtc(evento.fecha, evento.horaInicio);
    return { todoElDia: false, inicio, fin };
  }
  // Todo el día: el fin es exclusivo.
  return {
    todoElDia: true,
    inicio: sinGuiones(evento.fecha),
    fin: sinGuiones(diaSiguiente(evento.fechaFin ?? evento.fecha)),
  };
}

function escaparIcs(texto: string) {
  return texto
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export function generarIcs(evento: Evento): string {
  const { todoElDia, inicio, fin } = rango(evento);
  const ahora = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
  const lineas = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${site.sigla}//Agenda//ES`,
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${evento.id}@${new URL(site.url).hostname}`,
    `DTSTAMP:${ahora}`,
    todoElDia ? `DTSTART;VALUE=DATE:${inicio}` : `DTSTART:${inicio}`,
    todoElDia ? `DTEND;VALUE=DATE:${fin}` : `DTEND:${fin}`,
    `SUMMARY:${escaparIcs(evento.titulo)}`,
    `DESCRIPTION:${escaparIcs(evento.descripcion)}`,
    `LOCATION:${escaparIcs(lugarEvento(evento))}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lineas.join("\r\n");
}

/** Descarga el .ics en el navegador. */
export function descargarIcs(evento: Evento) {
  const blob = new Blob([generarIcs(evento)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = `${evento.id}.ics`;
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
  URL.revokeObjectURL(url);
}

export function enlaceGoogleCalendar(evento: Evento): string {
  const { inicio, fin } = rango(evento);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: evento.titulo,
    dates: `${inicio}/${fin}`,
    details: evento.descripcion,
    location: lugarEvento(evento),
    ctz: "America/Bogota",
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}
