@AGENTS.md

# Fundación Armonía Diversa (FUARDI) — sitio web

Sitio informativo de una fundación sin ánimo de lucro en Suba, Bogotá, que funciona como colegio y escuela artística para niños, jóvenes y adultos con discapacidad (síndrome de Down, discapacidad cognitiva, hipoacusia). Tiene grupo de música tradicional (gaitas y tambores), danza, canto y emprendimientos.

Lema: "La Música Rompe Barreras".

Objetivo del sitio: visibilizar positivamente a los jóvenes y mostrar sus capacidades. Tiene dos audiencias:

- Familias que buscan dónde inscribir a sus hijos.
- Personas, empresas y aliados que quieren aportar.

Todo el contenido real está en `docs/contenido.md`. El plan de trabajo está en `docs/prompts-fase-1.md`.

## Stack y restricciones (Fase 1)

- Next.js 16 (App Router, carpeta `src/`), React 19, TypeScript estricto, Tailwind CSS v4, zod.
- **Exportación estática** (`output: "export"` en next.config.ts). `npm run build` genera `out/`, que se sube a public_html en Conexcol. Por eso:
  - No hay API routes, Server Actions, middleware, cookies/headers, ISR ni revalidate.
  - `next/image` se usa con `unoptimized`. Las fotos deben ir ya optimizadas en `public/`: WebP, máximo 1600 px de ancho y idealmente menos de 300 KB.
  - `useSearchParams` solo dentro de un componente cliente envuelto en `<Suspense>`.
  - `sitemap.ts` y `robots.ts` deben ser estáticos. Verifica en la documentación de `node_modules/next/dist/docs/`.
- Sin base de datos. El contenido vive en `src/data/*.ts`, tipado desde `src/lib/types.ts`. Actualizar el sitio = editar un archivo de datos, no un componente.
- **Fechas.** El HTML se genera al compilar, así que todo lo que dependa de "hoy" se filtra también en el cliente al montar, para que no quede desactualizado entre despliegues. Aplica a próximos eventos, anuncios vigentes y colectas activas. Evita errores de hidratación. Zona horaria: America/Bogota. Las fechas se guardan como `"YYYY-MM-DD"` y se formatean con `Intl` en `es-CO`.
- Formulario: envío desde el cliente a Web3Forms (`NEXT_PUBLIC_WEB3FORMS_KEY` en `.env.local`). Si no hay clave, se muestra como alternativa WhatsApp y correo.
- No agregar dependencias sin justificarlo. Preferir componentes propios pequeños a librerías pesadas (carrusel, lightbox, calendario).

## Estructura

```
src/
  app/
    layout.tsx  page.tsx  not-found.tsx  globals.css  sitemap.ts  robots.ts
    nosotros/  programas/  presentaciones/  logros/  agenda/
    tienda/  apoyanos/  contacto/  politica-de-datos/      (cada una con page.tsx)
  components/
    layout/   Header, MobileMenu, Footer, AnnouncementBar, WhatsAppFloat,
              SkipLink, AccessibilityControls
    home/     Hero, ImpactStats, AboutPreview, ProgramsGrid, CampaignBanner,
              UpcomingEvents, PerformancesPreview, AchievementsPreview,
              ShopPreview, HowToHelp, Testimonials, SocialBlock, ContactCta
    ui/       Container, Section, Button, PatternBand, PhotoPlaceholder,
              YouTubeLite, Lightbox, MapEmbed
    forms/    ContactForm
  data/       site.ts navegacion.ts anuncios.ts eventos.ts logros.ts
              presentaciones.ts videos.ts programas.ts productos.ts
              testimonios.ts faq.ts equipo.ts aliados.ts
  lib/        types.ts fechas.ts whatsapp.ts
public/
  images/{logo,hero,galeria,logros,productos,programas,equipo,aliados}/
  .htaccess
```

## Navegación

Menú: Inicio · Nosotros · Programas · Presentaciones · Logros · Agenda · Tienda.

Botones destacados:

- **Apóyanos** (secundario) → `/apoyanos/`
- **Inscríbete** (primario) → `/contacto/?motivo=inscripcion`

En móvil hay menú desplegable accesible y los dos botones siguen visibles. El botón flotante de WhatsApp aparece en todas las páginas.

## Dirección de diseño: "Tarima y tambor"

El sitio debe sentirse como el grupo en tarima: vestuario blanco, pañoleta roja, el azul del árbol del logo y los colores del rompecabezas identificando cada programa.

**Paleta** (ajustar tonos al logo real cuando esté en `public/images/logo/`):

| Token      | Hex       | Uso                                                                      |
| ---------- | --------- | ------------------------------------------------------------------------ |
| `tinta`    | `#14213D` | Texto principal                                                          |
| `azul`     | `#1D4E9E` | Color de marca, enlaces, header. Blanco encima cumple AA                 |
| `rojo`     | `#C1272D` | Botón primario y acentos, como la pañoleta. Blanco encima cumple AA      |
| `verde`    | `#2E7D32` | Color de programa                                                        |
| `magenta`  | `#A61E6E` | Color de programa                                                        |
| `amarillo` | `#F2B705` | Solo fondo, con texto `tinta` encima (nunca texto amarillo sobre blanco) |
| `naranja`  | `#E9730C` | Solo fondo, con texto `tinta` encima                                     |
| `blanco`   | `#FFFFFF` | Base                                                                     |
| `niebla`   | `#F1F4F9` | Secciones alternas                                                       |

**Tipografía:**

- Cuerpo: Atkinson Hyperlegible Next, diseñada para baja visión (si no existe en `next/font/google`, usa Atkinson Hyperlegible).
- Títulos: Bricolage Grotesque en peso alto.
- Base de 18 px y líneas de menos de 75 caracteres.

**Elemento distintivo único:** una franja con patrón geométrico inspirado en las "pintas" del sombrero vueltiao, hecha como SVG repetible (`PatternBand`). Se usa bajo el hero, como separador entre bloques grandes y arriba del footer. No agregar otra decoración.

**Hero:** foto a sangre del grupo tocando en tarima, con el lema grande alineado a la izquierda. El degradado oscuro va solo donde está el texto, para dar contraste. Un único momento de animación al cargar, y ninguno si el usuario prefiere movimiento reducido.

**Evitar:**

- Etiquetas en MAYÚSCULAS sobre cada título.
- Numeración 01/02/03 (solo se permite en la línea de tiempo de logros, que sí es una secuencia).
- Tarjetas idénticas con la misma sombra en todo el sitio.
- Animaciones fade-in en cada sección.
- Flechas "→" en todos los enlaces.
- Modo oscuro automático en la Fase 1.

## Accesibilidad (obligatorio, WCAG 2.1 AA)

- HTML semántico, un solo `h1` por página, jerarquía de encabezados correcta y enlace "Saltar al contenido".
- Contraste AA, foco visible en todo, objetivos táctiles de al menos 44 px y navegación completa con teclado (incluye menú móvil, lightbox y carrusel).
- `alt` descriptivo en todas las fotos: describe la acción, no el diagnóstico. Por ejemplo: "Jóvenes del grupo tocando tambores en tarima".
- Videos con título accesible. Se prefieren los que tienen subtítulos.
- Respetar `prefers-reduced-motion`. Nada se reproduce solo con sonido.
- `AccessibilityControls`: tamaño de texto (A−/A+) y alto contraste, guardados en `localStorage` y aplicados con atributos en `<html>`, con un script inline para evitar parpadeo.
- Formularios con `label` visible, errores asociados (`aria-describedby`) y mensajes de estado con `aria-live`.
- Mantener `eslint-plugin-jsx-a11y` sin advertencias.

## Lenguaje y ética

- Decir "personas/jóvenes con discapacidad", "nuestros artistas", "nuestros estudiantes". Nunca "sufren de", "padecen", "pobrecitos" ni "especiales".
- El tono es de orgullo y logro, no de lástima.
- No publicar nombres completos de menores. En fotos, solo nombre de pila y únicamente si hay autorización.
- Español de Colombia, trato de "tú", frases cortas y lenguaje claro. Los botones dicen exactamente lo que hacen ("Enviar mensaje", "Pedir por WhatsApp").

## Convenciones

- Server Components por defecto. `"use client"` solo donde haya interacción o fechas.
- Imports con `@/`. Componentes en PascalCase y datos en camelCase en español.
- Enlaces internos con barra final (`trailingSlash: true`).
- Todo texto visible que pueda cambiar vive en `src/data/`, no dentro de los componentes.
- Donde falte contenido real, usar `PhotoPlaceholder` o un texto marcado con `// TODO(contenido):`. Nunca inventar datos, cifras, testimonios ni logros.
- Prettier + ESLint antes de terminar cada tarea.

## Comandos

- `npm run dev` para desarrollo en http://localhost:3000.
- `npm run lint`.
- `npm run build` debe terminar sin errores y generar `out/`.

## Definición de terminado (cada tarea)

1. `npm run lint` y `npm run build` pasan.
2. Se revisó en 375 px, 768 px y 1280 px.
3. Funciona solo con teclado.
4. No quedan textos de create-next-app ni datos inventados.
5. Resumen corto de lo hecho, más los `TODO(contenido)` pendientes.
