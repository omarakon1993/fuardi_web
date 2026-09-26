@AGENTS.md

# Fundación Armonía Diversa (FUARDI) — sitio web

Sitio informativo de una fundación sin ánimo de lucro en Suba, Bogotá, que funciona como institución educativa y escuela artística para niños, jóvenes y adultos con discapacidad (síndrome de Down, discapacidad cognitiva, hipoacusia). Tiene grupo de música tradicional (gaitas y tambores), danza, canto y emprendimientos.

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
- Agenda: si hay `NEXT_PUBLIC_GOOGLE_CALENDAR_ID` y `NEXT_PUBLIC_GOOGLE_API_KEY`, los eventos salen de Google Calendar (`src/lib/googleCalendar.ts`): se leen al compilar y otra vez en el navegador (`useEventos`). Sin ellas se usa `src/data/eventos.ts`. Guía en `docs/agenda-google-calendar.md`.
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
    layout/   Header, NavPrincipal, MobileMenu, Footer, AnnouncementBar,
              WhatsAppFloat, SkipLink, AccessibilityControls, RedesSociales
    home/     Hero, Marquesina, AboutPreview, ProgramsGrid, PerformancesPreview,
              AchievementsPreview, CampaignBanner, HowToHelp, Testimonials
    ui/       Container, Section, Button, PageHeader, Revelar, Desplegable,
              PhotoPlaceholder, YouTubeLite, Lightbox, MapEmbed
    forms/    ContactForm
  data/       site.ts navegacion.ts inicio.ts paginas.ts pie.ts fotos.ts
              anuncios.ts eventos.ts logros.ts presentaciones.ts videos.ts
              programas.ts productos.ts testimonios.ts faq.ts equipo.ts apoyo.ts
  lib/        types.ts fechas.ts whatsapp.ts colores.ts
public/
  images/{logo,hero,galeria,logros,productos,equipo,aliados}/
  .htaccess
```

## Navegación

Menú agrupado (el logo lleva al inicio):
Nosotros ▾ (Quiénes somos, Logros) · Programas · Presentaciones ▾ (Fotos y videos, Agenda) · Tienda · Contacto.

- Un solo botón rojo **Apóyanos** → `/apoyanos/`. Inscribirse va en las portadas («Inscribe a tu hijo o hija» → `/contacto/?motivo=inscripcion`) y en el menú móvil.
- Opciones de lectura (A−/A+ y alto contraste) solo dentro del menú móvil (decisión de la fundación: no van en el menú de escritorio ni en el pie).
- El menú es **fijo**. Con A+ en nivel 2 o 3 vuelve a su lugar normal (`.menu-fijo` en `globals.css`) para no tapar media pantalla.
- En móvil hay menú desplegable accesible (`<dialog>`) con los grupos abiertos. El botón flotante de WhatsApp aparece en todas las páginas.
- Inicio es un resumen que lleva a las demás páginas: de la agenda solo va el resumen de próximas fechas, y no se repiten tienda, redes ni contacto (el pie de todas las páginas ya tiene «Ven a conocernos» con los datos y las redes).

## Dirección de diseño: A1 «Fluido»

El sitio se siente como el grupo en tarima: vestuario blanco, pañoleta roja, un azul oscuro de noche y los colores del rompecabezas identificando cada programa.

**Paleta:** un solo azul.

| Token        | Hex       | Uso                                                              |
| ------------ | --------- | ---------------------------------------------------------------- |
| `tinta`      | `#14213D` | Texto, menú, secciones oscuras («En tarima», portadas) y pie     |
| `rojo`       | `#C1272D` | Botones de acción (Apóyanos, Quiero donar), antetítulos, acentos |
| `rojo-hondo` | `#9C1F24` | Hover del rojo                                                   |
| `cana`       | `#F6EFDC` | Fondo claro cálido                                               |
| `blanco`     | `#FFFFFF` | Base                                                             |
| `gris`       | `#4A5568` | Texto secundario                                                 |
| `verde`      | `#2E7D32` | WhatsApp y color de programa                                     |
| `magenta`    | `#A61E6E` | Color de programa                                                |
| `naranja`    | `#E9730C` | Color de programa, con texto `tinta` encima                      |
| `amarillo`   | `#F2B705` | Solo anuncios y foco, con texto `tinta` encima                   |

No se usa ningún otro azul.

**Tipografía:**

- Cuerpo: Atkinson Hyperlegible Next, 17 px, líneas de menos de 75 caracteres.
- Titulares: Bricolage Grotesque 800 condensada (`font-stretch: 78%`), escalas `text-cartel`, `text-titular` y `text-seccion` en `globals.css`.
- Antetítulos: utilidad `antetitulo` (mayúsculas cortas en `rojo`, o `cana` sobre fondo oscuro) sobre los titulares de sección.

**Formas y ritmo:**

- Secciones apiladas como capas: `<Section capa>` sube `-mt-14` con esquinas superiores `rounded-t-capa` sobre la anterior. Las portadas (`PageHeader`) y el pie usan la misma silueta.
- Fotos con radios asimétricos (`rounded-[2rem_8rem_2rem_2rem]`, `rounded-t-full`, círculos). Botones en píldora, de 52 px de alto (44 px en el menú).
- Elemento distintivo: la franja roja inclinada con ritmos y lugares (`Marquesina`), solo en inicio. Tiene botón para detenerla y no se mueve con movimiento reducido.

**Animación:** `Revelar` hace aparecer encabezados y tarjetas al entrar en pantalla. No anima lo que ya se ve al cargar y respeta `prefers-reduced-motion`. Hay un único momento de entrada en la portada.

**Evitar:**

- Numeración 01/02/03 (solo en la línea de tiempo de logros, que sí es una secuencia).
- Flechas "→" en botones: solo en los enlaces de texto (variantes `texto` y `textoClaro`).
- Repetir en una página lo que ya dicen el menú o el pie.
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
