import type { Fecha, Hora } from "@/lib/types";

export const ZONA_HORARIA = "America/Bogota";
const LOCALE = "es-CO";

/** Día actual en Bogotá como "YYYY-MM-DD". */
export function hoyBogota(ahora: Date = new Date()): Fecha {
  // en-CA formatea como YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: ZONA_HORARIA,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(ahora);
}

/**
 * Convierte "YYYY-MM-DD" en un Date al mediodía UTC. Así el día no se corre
 * al formatear en ninguna zona horaria.
 */
export function parseFecha(fecha: Fecha): Date {
  const [anio, mes, dia] = fecha.split("-").map(Number);
  return new Date(Date.UTC(anio, mes - 1, dia, 12));
}

/** Convierte un Date (tomado como día de calendario UTC) en "YYYY-MM-DD". */
export function aFecha(fecha: Date): Fecha {
  return fecha.toISOString().slice(0, 10);
}

export function formatFecha(
  fecha: Fecha,
  opciones: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
): string {
  return new Intl.DateTimeFormat(LOCALE, {
    ...opciones,
    timeZone: "UTC",
  }).format(parseFecha(fecha));
}

/** "sábado, 14 de noviembre de 2026" */
export function formatFechaLarga(fecha: Fecha): string {
  return formatFecha(fecha, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Partes para mostrar una fecha tipo calendario: día, mes corto y año. */
export function partesFecha(fecha: Fecha) {
  const d = parseFecha(fecha);
  const formato = (o: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(LOCALE, { ...o, timeZone: "UTC" }).format(d);
  return {
    dia: formato({ day: "numeric" }),
    mes: formato({ month: "short" }).replace(".", ""),
    anio: formato({ year: "numeric" }),
  };
}

/** "3:00 p. m." */
export function formatHora(hora: Hora): string {
  const [h, m] = hora.split(":").map(Number);
  return new Intl.DateTimeFormat(LOCALE, {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(2000, 0, 1, h, m)));
}

export function rangoHoras(inicio?: Hora, fin?: Hora): string | undefined {
  if (!inicio) return undefined;
  return fin
    ? `${formatHora(inicio)} a ${formatHora(fin)}`
    : formatHora(inicio);
}

interface ConVigencia {
  desde: Fecha;
  hasta: Fecha;
}

export function estaVigente(item: ConVigencia, hoy: Fecha): boolean {
  return item.desde <= hoy && hoy <= item.hasta;
}

export function vigentes<T extends ConVigencia>(items: T[], hoy: Fecha): T[] {
  return items.filter((item) => estaVigente(item, hoy));
}

interface ConFecha {
  fecha: Fecha;
  fechaFin?: Fecha;
}

/** Eventos de hoy en adelante, del más cercano al más lejano. */
export function proximos<T extends ConFecha>(items: T[], hoy: Fecha): T[] {
  return items
    .filter((item) => (item.fechaFin ?? item.fecha) >= hoy)
    .sort((a, b) => a.fecha.localeCompare(b.fecha));
}

/** Eventos que ya terminaron, del más reciente al más antiguo. */
export function pasados<T extends ConFecha>(items: T[], hoy: Fecha): T[] {
  return items
    .filter((item) => (item.fechaFin ?? item.fecha) < hoy)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
}
