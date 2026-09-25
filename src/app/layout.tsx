import type { Metadata } from "next";
import {
  Atkinson_Hyperlegible_Next,
  Bricolage_Grotesque,
} from "next/font/google";
import { anuncios } from "@/data/anuncios";
import { site } from "@/data/site";
import { hoyBogota } from "@/lib/fechas";
import { imagenOg } from "@/lib/metadatos";
import { scriptPreferencias } from "@/lib/preferencias";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import "./globals.css";

const atkinson = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  // next/font no tiene métricas de esta fuente para generar el respaldo.
  adjustFontFallback: false,
  fallback: ["Atkinson Hyperlegible", "system-ui", "sans-serif"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    template: `%s | ${site.nombre}`,
    default: `${site.nombre} | ${site.lema}`,
  },
  description: site.descripcion,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: site.nombre,
    title: `${site.nombre} | ${site.lema}`,
    description: site.descripcion,
    url: "/",
    images: [imagenOg],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: site.nombre,
  alternateName: site.sigla,
  slogan: site.lema,
  description: site.descripcion,
  url: site.url,
  logo: `${site.url}/images/logo/fuardi-logo.png`,
  image: `${site.url}/og.png`,
  telephone: `+57 ${site.telefono}`,
  email: site.correo,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.direccion.calle,
    addressLocality: `${site.direccion.localidad}, Bogotá`,
    addressRegion: site.direccion.region,
    addressCountry: site.direccion.pais,
  },
  ...(site.nit ? { taxID: site.nit } : {}),
  sameAs: site.redes.map((r) => r.url),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: el script de preferencias agrega atributos
    // a <html> antes de que React hidrate.
    <html
      lang="es-CO"
      className={`${atkinson.variable} ${bricolage.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptPreferencias }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <SkipLink />
        <AnnouncementBar anuncios={anuncios} hoyCompilacion={hoyBogota()} />
        <Header />
        <main
          id="contenido"
          tabIndex={-1}
          className="flex-1 focus-visible:shadow-none focus-visible:outline-none"
        >
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
