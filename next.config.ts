import type { NextConfig } from "next";

// Fase 1: sitio informativo estático.
// `npm run build` genera la carpeta `out/` lista para subir a public_html (Conexcol)
// o desplegar en Cloudflare Pages.
// Fase 2 (con base de datos): borra estas tres líneas y publica en un hosting con Node.js.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
