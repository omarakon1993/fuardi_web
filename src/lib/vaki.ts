/*
 * Avance de una campaña de Vaki (vaki.co). Vaki no tiene una API pública y no
 * deja leer sus páginas desde otro sitio en el navegador, así que el avance se
 * lee al compilar, de los datos que la página de la campaña trae incrustados.
 * Se actualiza cada vez que se publica el sitio. Si Vaki cambia su página o
 * no responde, se devuelve null y el sitio simplemente no muestra cifras.
 */

import { hoyBogota } from "@/lib/fechas";
import type { Anuncio } from "@/lib/types";

export interface AvanceVaki {
  /** Pesos colombianos recaudados. */
  recaudado: number;
  /** Meta en pesos colombianos. */
  meta: number;
  donantes: number;
  /** Fecha de la lectura, "YYYY-MM-DD". */
  leido: string;
}

interface EstadoVaki {
  [clave: string]: unknown;
}

export async function leerAvanceVaki(slug: string): Promise<AvanceVaki | null> {
  try {
    const respuesta = await fetch(`https://vaki.co/vaki/${slug}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (sitio de la Fundacion Armonia Diversa)",
      },
    });
    if (!respuesta.ok) return null;
    const html = await respuesta.text();
    const bloque = html.match(
      /<script id="ng-state" type="application\/json">([\s\S]*?)<\/script>/,
    )?.[1];
    if (!bloque) return null;

    const estado = JSON.parse(bloque) as EstadoVaki;
    const datos = estado[`vaki-data-${slug}`] as
      { collection_goals?: { amount?: number }[] } | undefined;
    const cifras = estado[`vaki-analytics-data-${slug}`] as
      { total_collected?: number; total_vakers?: number } | undefined;

    const meta = datos?.collection_goals?.[0]?.amount;
    if (!meta || !cifras) return null;

    return {
      recaudado: Math.round(cifras.total_collected ?? 0),
      meta,
      donantes: cifras.total_vakers ?? 0,
      leido: hoyBogota(),
    };
  } catch {
    return null;
  }
}

/** Lo que se publica en el sitio: sin montos en dinero, solo porcentaje. */
export interface AvancePublico {
  /** Porcentaje de la meta, de 0 a 100 o más. */
  porcentaje: number;
  donantes: number;
  leido: string;
}

/**
 * Avance de la campaña destacada, si es una Vaki. Los montos se quedan aquí,
 * al compilar: a la página solo llegan el porcentaje y los donantes.
 */
export async function avanceCampanaDestacada(
  anuncios: Anuncio[],
): Promise<AvancePublico | null> {
  const campana = anuncios.find((a) => a.destacado && a.vaki && !a.ejemplo);
  if (!campana?.vaki) return null;
  const avance = await leerAvanceVaki(campana.vaki.slug);
  if (!avance) return null;
  return {
    porcentaje: (avance.recaudado / avance.meta) * 100,
    donantes: avance.donantes,
    leido: avance.leido,
  };
}
