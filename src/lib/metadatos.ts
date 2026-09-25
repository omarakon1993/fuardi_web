import type { Metadata } from "next";
import { site } from "@/data/site";

export const imagenOg = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${site.nombre}: ${site.lema}`,
};

/** Metadatos de una página con Open Graph y URL canónica. */
export function metadatos(
  titulo: string,
  descripcion: string,
  ruta: string,
): Metadata {
  return {
    title: titulo,
    description: descripcion,
    alternates: { canonical: ruta },
    openGraph: {
      type: "website",
      locale: "es_CO",
      siteName: site.nombre,
      title: `${titulo} | ${site.nombre}`,
      description: descripcion,
      url: ruta,
      images: [imagenOg],
    },
  };
}
