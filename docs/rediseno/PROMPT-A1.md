# Rediseño de Inicio — Propuesta A1 «Fluido»

> Pega este archivo completo en el chat de tu asistente en VS Code (Claude Code, Copilot Chat o Cursor) con el proyecto `fuardi_web` abierto. Adjunta también `Inicio A1 - Fluido.dc.html` como referencia visual (ábrelo en el navegador).

---

## Prompt para el asistente

Implementa el rediseño de la página de inicio según la referencia `Inicio A1 - Fluido.dc.html` y las especificaciones de abajo. Reglas:

1. **No cambies el contenido**: todos los textos siguen saliendo de `src/data/` (`site.ts`, `inicio.ts`, `programas.ts`, `logros.ts`, `apoyo.ts`). Si falta un texto nuevo (p. ej. el titular de Apóyanos), agrégalo a `src/data/inicio.ts`.
2. **Usa Tailwind 4 y los tokens de `src/app/globals.css`**. No uses colores hexadecimales sueltos en los componentes.
3. **Mantén la accesibilidad actual**: SkipLink, foco visible, alto contraste, A−/A+, `alt` en fotos y `useMovimientoReducido` para todas las animaciones. `npm run lint` debe pasar.
4. Trabaja componente por componente en `src/components/home/` y en `src/components/layout/Header.tsx` / `Footer.tsx`. Al terminar cada uno, muéstrame el cambio.

---

## 1. Paleta unificada

Un solo azul en todo el sitio: **`tinta` #14213d**. Se usa en el menú, en la sección «En tarima», en «Contacto» y en el pie de página.

| Uso                                                 | Token                                          |
| --------------------------------------------------- | ---------------------------------------------- |
| Azul oscuro único (menú, secciones oscuras, footer) | `tinta`                                        |
| Botones de acción (Apóyanos, Quiero donar)          | `rojo` / hover `rojo-hondo`                    |
| Fondo claro cálido                                  | `cana`                                         |
| Fondo base                                          | `blanco`                                       |
| Texto secundario                                    | `gris`                                         |
| WhatsApp                                            | `verde`                                        |
| Etiquetas de programa (solo acentos pequeños)       | `rojo`, `magenta`, `verde`, `naranja`, `tinta` |

- En la página de inicio **deja de usarse** `azul` (#00518b) y `azul-hondo`. Cambia a `tinta` las variantes de botón y los enlaces que los usen.
- `amarillo` ya no se usa como fondo de sección.

## 2. Tipografía (sin cambios de familia)

- Titulares: Bricolage Grotesque 800, `font-stretch:78%`, `letter-spacing:-0.02em`.
  - Hero: `clamp(56px, 7.4vw, 120px)`, `line-height:.86`.
  - Sección: `clamp(40px, 4.4vw, 68px)`, `line-height:.95`.
- Antetítulos: 15px, 700, mayúsculas, `tracking .08em`, color `rojo` (o `cana` sobre fondo oscuro).
- Texto: Atkinson 18–19px, `line-height:1.6`.

## 3. Formas y ritmo

- **Secciones apiladas**: esquinas superiores de `56px` (`rounded-t-[3.5rem]`) y `-mt-14` sobre la sección anterior, para que se superpongan como capas (Programas → En tarima → Logros; Contacto).
- Fotos con **radios asimétricos**, por ejemplo `rounded-[240px_32px_32px_32px]`, `rounded-[32px_32px_32px_160px]`, `rounded-t-[120px]` y círculos.
- Botones en píldora (`rounded-full`), con alto mínimo de 52px (44px en el menú).
- Contenedor: `max-w-[1280px] px-8`.

## 4. Estructura de la página (`src/app/page.tsx`)

Orden nuevo. Se quitan de inicio `ImpactStats` (se integra en Nosotros), `CampaignBanner`, `UpcomingEvents`, `Testimonials`, `ShopPreview` y `SocialBlock`; siguen existiendo en sus páginas.

1. **Header fijo** (`Header.tsx`)
   - `fixed inset-x-0 top-0 z-50 bg-tinta text-blanco`. Logo en un recuadro blanco `rounded-[14px]` + nombre en dos líneas.
   - Navegación en píldoras: `px-3.5 py-2 rounded-full hover:bg-blanco/10`, en una sola línea (`whitespace-nowrap overflow-x-auto`).
   - Un solo botón rojo «Apóyanos».
   - La barra superior de redes y accesibilidad se mueve **dentro** del header o al footer (decídelo conmigo).
   - ⚠️ El header antes no era fijo a propósito, porque con zoom alto tapaba contenido. Solución: cuando `data-texto` sea 2 o 3, vuelve a `position: static` con CSS en `globals.css`.
   - Agrega `scroll-padding-top: 80px` a `html`.
2. **Hero** (`Hero.tsx`), `bg-tinta`, en dos columnas (`grid auto-fit minmax(440px,1fr)`):
   - Izquierda: píldora «Suba, Bogotá · Desde 2016» (`bg-blanco/10`, punto rojo), h1 `site.lema` con «Rompe» en cursiva color `cana`, `site.presentacion`, botón blanco «Inscribe a tu hijo o hija» y enlace de texto «Quiero apoyar →».
   - Derecha: `site.heroFoto` con `rounded-[240px_32px_32px_32px]`, una foto circular superpuesta abajo a la izquierda (borde de 8px color `tinta`) y una tarjeta roja flotante «+12 festivales».
3. **Franja marquesina** (reemplaza `PatternBand` rojo):
   - `bg-rojo`, `-rotate-[1.5deg]`, `-mt-7`, texto Bricolage 800 de 28px: «Cumbia ✦ Puya ✦ Gaita ✦ Porro ✦ San Jacinto ✦ Sincelejo ✦ Anapoima ✦ Suba».
   - Animación `translateX` infinita (contenido duplicado). Si el usuario prefiere movimiento reducido, queda estática. Nuevo componente `Marquesina.tsx`.
4. **Nosotros** (`AboutPreview.tsx`), fondo blanco:
   - Frase grande (Bricolage 700, `clamp(30px,3.4vw,52px)`) con las cifras de `site.cifras` resaltadas en `rojo` dentro del texto.
   - Debajo, en dos columnas: foto `historiaFoto` (`rounded-[32px_32px_32px_160px]`) y a la derecha antetítulo + h2 + reseña + tarjeta `bg-cana rounded-3xl` con la misión + enlace.
5. **Programas** (`ProgramsGrid.tsx`), `bg-cana rounded-t-[3.5rem]`:
   - Cuatro columnas escalonadas (las columnas 2 y 4 con `mt-14`).
   - Fotos con degradado `from-tinta/95` y una etiqueta en píldora con el color del programa.
   - La primera tarjeta lleva `rounded-t-[120px]` y la tercera `rounded-b-[120px]`.
   - La cuarta columna apila dos tarjetas blancas (Formación académica y Emprendimientos).
   - Hover: `-translate-y-1.5`.
6. **En tarima** (`PerformancesPreview.tsx`), `bg-tinta rounded-t-[3.5rem] -mt-14`:
   - Encabezado en dos columnas.
   - Galería horizontal deslizable (`flex overflow-x-auto snap-x snap-mandatory`) con fotos de 400px de alto, anchos y radios distintos.
   - Botones «Contrata una presentación» (blanco) y «Ver presentaciones» (borde).
7. **Logros** (`AchievementsPreview.tsx`), `bg-blanco rounded-t-[3.5rem] -mt-14`:
   - Línea de tiempo horizontal: una línea de 2px y puntos de 24px con borde de color.
   - Los elementos pares van desplazados hacia abajo (zigzag).
   - Solo los logros con `destacado: true`, máximo 4.
8. **Apóyanos** (`HowToHelp.tsx`, reemplaza el bloque amarillo): tarjeta `bg-cana rounded-[48px]` en dos columnas.
   - Izquierda: foto con una tarjeta blanca encima: «Tu aporte se convierte en: Instrumentos, transporte a festivales y clases».
   - Derecha: antetítulo, h2 «Ayúdanos a que suban a la tarima», texto, chips blancos con `formasDeAyudar` (hover `bg-tinta text-blanco`), botón rojo «Quiero donar» y «Entidad sin ánimo de lucro · NIT …».
9. **Contacto + Footer** (`ContactCta.tsx` + `Footer.tsx`), `bg-tinta rounded-t-[3.5rem]`:
   - h2 «Ven a conocernos» de hasta 96px, botones de WhatsApp (verde) y Maps (borde).
   - Rejilla 2×2 con dirección, teléfono, correo y redes.
   - Línea inferior con © y NIT, y enlace a la política de datos.
   - Se elimina `PatternBand` antes del footer.

## 5. Animaciones

- Nuevo hook `useRevelar()` o componente `<Revelar>`: con `IntersectionObserver` pasa de `opacity-0 translate-y-8` a `opacity-100 translate-y-0` en 0.9s `cubic-bezier(.2,.7,.2,1)`. Se aplica a los encabezados y tarjetas de cada sección.
- Se desactiva con `useMovimientoReducido`, y los elementos que ya están visibles al cargar no se animan.
- Los enlaces y tarjetas tienen `transition` de 0.3s en `transform` y colores.

## 6. Checklist final

- [ ] Ningún `bg-azul` / `text-azul` en inicio, header ni footer.
- [ ] Header fijo, pero estático con texto grande.
- [ ] La marquesina y la aparición al hacer scroll respetan el movimiento reducido.
- [ ] Contraste AA en todos los textos sobre foto (degradado `from-tinta/95`).
- [ ] Todo se reacomoda en una columna a menos de 640px.
- [ ] `npm run lint` y `npm run build` sin errores.
