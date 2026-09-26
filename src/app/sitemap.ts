import type { MetadataRoute } from "next";
import { enlacesLegales, paginasSitio } from "@/data/navegacion";
import { site } from "@/data/site";

// Exportación estática: se genera una sola vez al compilar.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutas = [
    ...paginasSitio.map((e) => e.href),
    ...enlacesLegales.map((e) => e.href),
  ];
  const hoy = new Date();

  return rutas.map((ruta) => ({
    url: `${site.url}${ruta}`,
    lastModified: hoy,
    changeFrequency: ruta === "/" || ruta === "/agenda/" ? "weekly" : "monthly",
    priority: ruta === "/" ? 1 : 0.7,
  }));
}
