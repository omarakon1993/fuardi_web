# Plan de implementación — Fase 1

Cada bloque es una sesión de Claude Code en VS Code. Todos asumen que `CLAUDE.md` y `docs/contenido.md` ya están en el repositorio.

**Flujo por sesión:**

1. Abre una conversación nueva.
2. Pon el modo en **Plan**.
3. Pega el prompt.
4. Revisa y comenta el plan.
5. Aprueba el plan.
6. Revisa en `localhost:3000`.
7. Haz commit.

---

## Prompt 1 — Base del sitio

```
Lee CLAUDE.md, docs/contenido.md y la documentación de Next en node_modules/next/dist/docs/ que aplique (App Router, static export, fonts, metadata).

Construye la base del sitio:

1. globals.css: tokens de la paleta y la tipografía de CLAUDE.md con @theme de Tailwind v4. Quita el modo oscuro automático. Agrega estilos base: foco visible y soporte para los atributos de tamaño de texto y alto contraste.
2. layout.tsx:
   - Fuentes Atkinson Hyperlegible Next y Bricolage Grotesque con next/font.
   - lang="es-CO".
   - metadata base con título plantilla "%s | Fundación Armonía Diversa".
   - SkipLink, AnnouncementBar, Header, main, Footer y WhatsAppFloat.
3. src/lib/types.ts con tipos para: Anuncio, Evento, Logro, Presentacion, Video, Programa, Producto, Testimonio, PreguntaFrecuente, MiembroEquipo, Aliado, SiteConfig.
4. src/data/*.ts llenos con el contenido real de docs/contenido.md. Lo que falte va como TODO; no inventes nada. Incluye 1 anuncio y 2 eventos de ejemplo marcados claramente con `ejemplo: true`.
5. src/lib/fechas.ts (parseo "YYYY-MM-DD" en America/Bogota, formato es-CO, filtros de vigencia) y src/lib/whatsapp.ts (construye enlaces wa.me con mensaje prellenado).
6. Componentes ui: Container, Section, Button (variantes primario/secundario/texto), PatternBand (SVG inspirado en las pintas del sombrero vueltiao) y PhotoPlaceholder.
7. Componentes layout:
   - Header con el menú y los dos botones destacados.
   - MobileMenu accesible: trampa de foco, se cierra con Esc y devuelve el foco al abrir/cerrar.
   - Footer con datos, redes, enlaces y política de datos.
   - AnnouncementBar: cliente, cerrable, lee el anuncio vigente con `mostrarEnBarra`.
   - WhatsAppFloat.
8. Páginas vacías con su h1 y metadata para todas las rutas del menú, además de /apoyanos, /contacto y /politica-de-datos, para que la navegación funcione.
9. Borra los SVG de ejemplo de public/ y crea las carpetas de public/images/.

Termina cumpliendo la "Definición de terminado".
```

## Prompt 2 — Página de inicio

```
Implementa la página de inicio (src/app/page.tsx) con los componentes de src/components/home/, en este orden:

1. Hero: foto a sangre (PhotoPlaceholder si no hay foto), el lema como h1, una frase corta de quiénes somos y dos botones: "Inscribe a tu hijo o hija" y "Quiero apoyar". Único momento animado del sitio, respetando reduced-motion.
2. PatternBand.
3. ImpactStats: cifras desde data. No uses el patrón genérico de número gigante con degradado; intégralas como una franja sobria.
4. AboutPreview: reseña corta, misión y visión (mostrar la etiqueta "Temporal" solo en desarrollo) y enlace a /nosotros.
5. ProgramsGrid: los 5 programas, cada uno con su color. Evita que parezcan 5 tarjetas SaaS idénticas.
6. CampaignBanner: convocatorias, eventos y colectas destacadas y vigentes. Carrusel accesible propio (pausable, con flechas y teclado). Si solo hay uno, se muestra estático; si no hay ninguno, no se renderiza.
7. UpcomingEvents: los 3 próximos (filtrados en cliente) y enlace a /agenda.
8. PerformancesPreview: 4 a 6 fotos y un video con YouTubeLite (fachada con miniatura que carga youtube-nocookie al hacer clic).
9. AchievementsPreview: los 4 logros más destacados y enlace a /logros.
10. ShopPreview: 3 o 4 productos con "Pedir por WhatsApp".
11. HowToHelp: donar, voluntariado, contratar una presentación y alianza empresarial, cada uno con enlace a /apoyanos o a /contacto?motivo=...
12. Testimonials: no se renderiza si no hay testimonios reales.
13. SocialBlock: redes grandes y un bloque destacado "Únete a nuestro canal de WhatsApp".
14. ContactCta: frase, botón a /contacto y MapEmbed (Google Maps embed de la dirección, con carga diferida y title).

Revisa el resultado a 375, 768 y 1280 px y aplica la "Definición de terminado".
```

## Prompt 3 — Nosotros, Programas y Política de datos

```
Implementa:

- /nosotros:
  - Historia (reseña completa).
  - Misión y visión.
  - Objetivos: los 6, como lista legible, no como tarjetas numeradas.
  - Equipo: director y TODO para docentes.
  - Transparencia: NIT, certificado y documentos como TODO con enlaces preparados.
- /programas:
  - Una sección por programa con ancla (#musica, etc.), su color, descripción, "a quién va dirigido", horarios y edades como TODO.
  - Un botón "Inscribirme a este programa" que lleva a /contacto?motivo=inscripcion&programa=<slug>.
  - Al final, las preguntas frecuentes para familias (acordeón accesible con <details>/<summary>) desde faq.ts.
- /politica-de-datos: política de tratamiento de datos personales según la Ley 1581 de 2012, redactada en lenguaje claro para la fundación como responsable (datos de contacto desde site.ts). Incluye:
  - Finalidades: responder solicitudes, inscripciones y donaciones.
  - Derechos del titular.
  - Canal para ejercerlos.
  - Una sección sobre uso de imagen de estudiantes con autorización de sus acudientes.
  - Nota visible de que debe ser revisada por la fundación.

Aplica la "Definición de terminado".
```

## Prompt 4 — Presentaciones y Logros

```
Implementa:

- /presentaciones:
  - Presentaciones y salidas desde presentaciones.ts, agrupadas por año, con filtro por tipo (Todas / Presentaciones / Salidas).
  - Galería con Lightbox propio y accesible: teclado, Esc, flechas, foco controlado, contador "3 de 12".
  - Sección de videos con todos los de videos.ts usando YouTubeLite.
- /logros:
  - Línea de tiempo vertical por año con los logros de logros.ts. Es el único lugar donde se permite numeración o marcadores de secuencia.
  - Íconos distintos por tipo: reconocimiento, galardón, participación, medios.
  - Espacio para foto del diploma o medalla (PhotoPlaceholder).
  - Una sección "En los medios" con la nota de Canal Capital.
  - Filtro por tipo.

Aplica la "Definición de terminado".
```

## Prompt 5 — Agenda y Tienda

```
Implementa:

- /agenda (componente cliente para el filtrado por fecha):
  - Vista de lista con pestañas "Próximos" y "Pasados".
  - Vista de calendario mensual propia y accesible (tabla con encabezados de día, navegación entre meses, días con eventos marcados y detalle al seleccionar).
  - Botón "Agregar a mi calendario" que genera un .ics en el cliente, o un enlace a Google Calendar si el .ics no es viable en export estático.
  - Si site.ts tiene `googleCalendarEmbedUrl`, ofrecer además el iframe embebido.
- /tienda:
  - Catálogo desde productos.ts con filtro por categoría.
  - Precio en COP con Intl (si no hay precio: "Consultar precio").
  - Estado disponible o agotado.
  - Línea "Hecho por nuestros jóvenes" con la historia del producto.
  - Botón "Pedir por WhatsApp" con mensaje prellenado: "Hola, me interesa <producto> de la tienda de FUARDI".
  - Aclarar que las compras apoyan a la fundación.
  - No hay carrito.

Aplica la "Definición de terminado".
```

## Prompt 6 — Apóyanos y Contacto

```
Implementa:

- /apoyanos:
  - Formas de ayudar: donación en dinero (datos de cuenta y QR como TODO), donación en especie, voluntariado, contratar una presentación del grupo (para eventos, colegios y empresas) y alianzas empresariales.
  - Cada una con un botón a /contacto?motivo=<motivo>.
  - Bloque de transparencia enlazado a /nosotros#transparencia.
- /contacto con ContactForm (cliente, dentro de <Suspense> por useSearchParams):
  - Selector de motivo con estas opciones: inscripcion, aporte, voluntariado, presentacion, alianza, otro. Se preselecciona desde ?motivo= y ?programa=.
  - Campos comunes: nombre, correo, teléfono/WhatsApp y mensaje.
  - Campos por motivo:
    - inscripcion: nombre del estudiante, edad, programa de interés, tipo de discapacidad (opcional, con texto que explique para qué se usa) y cómo nos conoció.
    - aporte: tipo de aporte (dinero, especie, tiempo), persona o empresa y nombre de la empresa.
    - presentacion: fecha tentativa, lugar y tipo de evento.
    - alianza: empresa y cargo.
  - Validación con un esquema zod discriminado por motivo; errores en español junto a cada campo.
  - Casilla obligatoria de autorización de tratamiento de datos, con enlace a /politica-de-datos.
  - Honeypot antispam ("botcheck").
  - Envío con fetch a https://api.web3forms.com/submit usando NEXT_PUBLIC_WEB3FORMS_KEY. El asunto dinámico es "[FUARDI] <Motivo> — <nombre>" para que la fundación filtre los correos.
  - Estados: enviando, éxito (mensaje claro de qué pasa después) y error (con alternativa de WhatsApp y correo), anunciados con aria-live.
  - Si no hay clave configurada, el formulario muestra un aviso y las alternativas.
  - Crea .env.example con la variable.
- Al lado del formulario: teléfono, correo, dirección, mapa y horario de atención (TODO).

Aplica la "Definición de terminado".
```

## Prompt 7 — Accesibilidad, SEO, pulido y build

```
Cierra la Fase 1:

1. AccessibilityControls en el Header (A−, A+, alto contraste) persistidos en localStorage, con script inline anti-parpadeo en layout.
2. SEO:
   - metadata y Open Graph por página, con imagen OG por defecto en public/.
   - sitemap.ts y robots.ts estáticos con la URL base desde site.ts.
   - JSON-LD de tipo NGO con nombre, dirección, teléfono, correo y redes.
   - favicon con el logo cuando esté disponible.
3. not-found.tsx con enlaces útiles.
4. public/.htaccess para Apache (Conexcol): ErrorDocument 404 hacia /404.html, forzar https, cache para /_next/static e imágenes, y compresión si está disponible.
5. Auditoría:
   - Recorre todas las páginas con teclado.
   - Revisa contrastes, alt, títulos y enlaces rotos.
   - Busca y elimina textos de create-next-app.
   - Lista todos los TODO(contenido) en un archivo docs/pendientes-contenido.md agrupado por página.
6. README.md en español: cómo correr el proyecto, cómo editar cada archivo de src/data, cómo agregar fotos (formato, tamaño y carpeta), cómo configurar Web3Forms y cómo desplegar en Conexcol.
7. npm run lint y npm run build limpios. Confirma que out/ contiene todas las rutas.
```

---

## Despliegue en Conexcol (manual)

1. `npm run build`.
2. Entra a cPanel → Administrador de archivos → `public_html`. Haz una copia de lo que haya antes.
3. Sube el **contenido** de `out/`, no la carpeta, incluyendo `.htaccess`. Puedes subir un .zip y extraerlo ahí.
4. Revisa el dominio, las rutas internas, el 404 y el envío del formulario.
