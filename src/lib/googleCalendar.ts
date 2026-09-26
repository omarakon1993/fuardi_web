import { site } from "@/data/site";
import type { Evento, Fecha, Hora, TipoEvento } from "@/lib/types";

/*
 * Agenda desde un Google Calendar público. Los profesores agregan eventos
 * desde la app de Google Calendar y el sitio los muestra sin volver a
 * publicarse. Instrucciones en docs/agenda-google-calendar.md.
 *
 * Se lee dos veces: al compilar (para que el HTML ya traiga las fechas) y en
 * el navegador al abrir la página (para que siempre estén al día).
 */

const CALENDARIO = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID;
const CLAVE = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

/** true si están las dos variables de .env.local. */
export const calendarioConectado = Boolean(CALENDARIO && CLAVE);

/** Enlace para que cualquiera siga la agenda en su propio Google Calendar. */
export const enlaceSeguirCalendario = CALENDARIO
  ? `https://calendar.google.com/calendar/u/0?cid=${btoa(CALENDARIO)}`
  : undefined;

interface MomentoGoogle {
  /** Eventos de todo el día: "2026-11-14". */
  date?: string;
  /** Eventos con hora: "2026-11-14T15:00:00-05:00". */
  dateTime?: string;
}

interface EventoGoogle {
  id: string;
  status?: string;
  summary?: string;
  description?: string;
  location?: string;
  start: MomentoGoogle;
  end: MomentoGoogle;
}

const formatoBogota = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Bogota",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/** Fecha y hora en Bogotá de un instante ISO. */
function enBogota(iso: string): { fecha: Fecha; hora: Hora } {
  const p = Object.fromEntries(
    formatoBogota.formatToParts(new Date(iso)).map((x) => [x.type, x.value]),
  );
  return {
    fecha: `${p.year}-${p.month}-${p.day}`,
    hora: `${p.hour}:${p.minute}`,
  };
}

function diaAnterior(fecha: Fecha): Fecha {
  const d = new Date(`${fecha}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

/** Google permite HTML en la descripción: se deja solo el texto. */
function textoPlano(html = "") {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

// El profesor puede escribir en la descripción una línea "Tipo: festival".
const LINEA_TIPO = /^\s*tipo\s*:\s*(.+)$/im;
const TIPOS: [TipoEvento, RegExp][] = [
  ["festival", /festival/i],
  ["colecta", /colecta/i],
  ["actividad", /actividad|taller|jornada|salida|reuni[oó]n/i],
  ["presentacion", /presentaci[oó]n|concierto|toque/i],
];

function tipoDe(descripcion: string, titulo: string): TipoEvento {
  const indicado = descripcion.match(LINEA_TIPO)?.[1] ?? titulo;
  return (
    TIPOS.find(([, patron]) => patron.test(indicado))?.[0] ?? "presentacion"
  );
}

/** Convierte un evento de Google al formato de la agenda. */
export function aEvento(e: EventoGoogle): Evento | null {
  if (e.status === "cancelled" || !e.summary) return null;
  const texto = textoPlano(e.description);

  let fecha: Fecha;
  let fechaFin: Fecha | undefined;
  let horaInicio: Hora | undefined;
  let horaFin: Hora | undefined;

  if (e.start.dateTime) {
    const inicio = enBogota(e.start.dateTime);
    fecha = inicio.fecha;
    horaInicio = inicio.hora;
    if (e.end.dateTime) {
      const fin = enBogota(e.end.dateTime);
      horaFin = fin.hora;
      if (fin.fecha !== fecha) fechaFin = fin.fecha;
    }
  } else if (e.start.date) {
    fecha = e.start.date;
    // En los eventos de todo el día, Google da el fin como el día siguiente.
    const ultimo = e.end.date ? diaAnterior(e.end.date) : fecha;
    if (ultimo !== fecha) fechaFin = ultimo;
  } else {
    return null;
  }

  return {
    id: e.id,
    titulo: e.summary.trim(),
    tipo: tipoDe(texto, e.summary),
    fecha,
    fechaFin,
    horaInicio,
    horaFin,
    lugar: e.location?.replace(/,?\s*Colombia$/i, "").trim() ?? "",
    descripcion: texto.replace(LINEA_TIPO, "").trim(),
  };
}

/**
 * Eventos del último año y los que vienen. Devuelve null si el calendario no
 * está configurado o Google no responde, para usar el respaldo local.
 */
export async function cargarEventosGoogle(): Promise<Evento[] | null> {
  if (!CALENDARIO || !CLAVE) return null;

  const desde = new Date();
  desde.setFullYear(desde.getFullYear() - 1);
  const parametros = new URLSearchParams({
    key: CLAVE,
    singleEvents: "true",
    orderBy: "startTime",
    timeMin: desde.toISOString(),
    maxResults: "250",
  });
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDARIO)}/events?${parametros}`;

  try {
    const respuesta = await fetch(url, {
      // La clave solo acepta pedidos desde el dominio del sitio. Al compilar
      // no hay navegador, así que se envía ese dominio a mano.
      headers:
        typeof window === "undefined" ? { Referer: `${site.url}/` } : undefined,
    });
    if (!respuesta.ok) return null;
    const datos: { items?: EventoGoogle[] } = await respuesta.json();
    return (datos.items ?? [])
      .map(aEvento)
      .filter((e): e is Evento => e !== null);
  } catch {
    return null;
  }
}

/**
 * Eventos para el HTML compilado. Con el calendario conectado, los de
 * src/data/eventos.ts ya no se usan (evita mostrar ejemplos); si Google no
 * responde al compilar, la página los trae luego en el navegador.
 */
export async function eventosAlCompilar(locales: Evento[]): Promise<Evento[]> {
  if (!calendarioConectado) return locales;
  return (await cargarEventosGoogle()) ?? [];
}
