# Fundación Armonía Diversa (FUARDI) — sitio web

Sitio informativo de la Fundación Armonía Diversa, de Suba, Bogotá. Lema: «La Música Rompe Barreras».

Está hecho con Next.js 16, React 19, TypeScript y Tailwind CSS 4. Se exporta como sitio estático (carpeta `out/`), así que se puede subir a cualquier hosting sin Node.js, como Conexcol.

## Correr el proyecto

Necesitas Node.js 20.9 o superior.

```bash
npm install        # la primera vez
npm run dev        # http://localhost:3000
```

Otros comandos:

| Comando          | Qué hace                                                |
| ---------------- | ------------------------------------------------------- |
| `npm run lint`   | Revisa el código, incluidas las reglas de accesibilidad |
| `npm run format` | Ordena el formato del código con Prettier               |
| `npm run build`  | Genera el sitio final en `out/`                         |

## Editar el contenido

Todo el texto y los datos viven en `src/data/`. Para actualizar el sitio se edita un archivo de datos, no un componente. Los tipos de cada dato están en `src/lib/types.ts`: si te equivocas en un campo, `npm run build` te lo avisa.

| Archivo                                                     | Qué contiene                                                                                                       |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `site.ts`                                                   | Datos generales: nombre, contacto, dirección, redes, NIT, donaciones, cifras, misión, visión, historia y objetivos |
| `anuncios.ts`                                               | Barra amarilla superior y carrusel de campañas de inicio. Se muestran solo entre `desde` y `hasta`                 |
| `eventos.ts`                                                | Agenda. Los eventos pasan solos de «Próximos» a «Pasados» según la fecha                                           |
| `logros.ts`                                                 | Línea de tiempo de logros. `destacado: true` los muestra en inicio                                                 |
| `presentaciones.ts`                                         | Presentaciones y salidas, con sus fotos                                                                            |
| `videos.ts`                                                 | Videos de YouTube (el `id` es lo que va después de `watch?v=`)                                                     |
| `programas.ts`                                              | Los cinco programas, con horarios y edades                                                                         |
| `productos.ts`                                              | Tienda. Sin `precio` se muestra «Consultar precio»                                                                 |
| `testimonios.ts`                                            | Testimonios de familias. Si está vacío, la sección no aparece                                                      |
| `faq.ts`                                                    | Preguntas frecuentes de la página Programas                                                                        |
| `equipo.ts`                                                 | Director y docentes                                                                                                |
| `aliados.ts`                                                | Aliados y empresas                                                                                                 |
| `apoyo.ts`                                                  | Formas de ayudar (página Apóyanos e inicio)                                                                        |
| `politica.ts`                                               | Política de tratamiento de datos                                                                                   |
| `inicio.ts`, `paginas.ts`, `formulario.ts`, `navegacion.ts` | Títulos, textos cortos, etiquetas del formulario y menú                                                            |

**Fechas.** Siempre como `"AAAA-MM-DD"`, por ejemplo `"2026-11-14"`. Las horas van como `"15:00"`. Todo se interpreta en hora de Bogotá.

**Contenido de ejemplo.** Lo que tiene `ejemplo: true` se muestra con la etiqueta amarilla «Ejemplo». Bórralo cuando haya contenido real.

**Pendientes.** La lista de lo que falta pedirle a la fundación está en [`docs/pendientes-contenido.md`](docs/pendientes-contenido.md). En el código cada pendiente está marcado con `TODO(contenido)`.

## Agregar fotos

1. **Formato:** WebP, máximo 1600 px de ancho e idealmente menos de 300 KB. Puedes convertirlas gratis en [squoosh.app](https://squoosh.app).
2. **Carpeta** dentro de `public/images/`:
   - `hero/`: foto principal de inicio
   - `galeria/`: presentaciones
   - `logros/`: diplomas y medallas
   - `programas/`: una por programa
   - `productos/`: tienda
   - `equipo/`: personas del equipo
   - `aliados/`: logos de aliados
3. **Regístrala** en el archivo de datos que corresponda con este formato:

   ```ts
   foto: {
     src: "/images/galeria/sincelejo-2023.webp",
     alt: "Jóvenes del grupo tocando tambores en tarima",
     ancho: 1600,
     alto: 1067,
   }
   ```

   - El `alt` describe lo que pasa en la foto, no el diagnóstico.
   - `ancho` y `alto` son las medidas reales de la foto en píxeles.

4. **Autorización:** solo publica fotos de estudiantes con autorización escrita de su acudiente. Nunca pongas nombres completos de menores.

## Formulario de contacto (Web3Forms)

Un sitio estático no tiene servidor para enviar correos, así que el formulario usa [Web3Forms](https://web3forms.com):

1. Entra a web3forms.com y crea una clave con el **correo de la fundación**. Ahí es donde llegarán los mensajes.
2. Copia `.env.example` como `.env.local` y pega la clave:

   ```
   NEXT_PUBLIC_WEB3FORMS_KEY=tu-clave
   ```

3. Vuelve a ejecutar `npm run dev` o `npm run build`. La clave queda incluida en el sitio al compilar.

Los correos llegan con asuntos como `[FUARDI] Inscripción — Nombre`, para que puedas filtrarlos por motivo. Sin clave, el formulario muestra un aviso con WhatsApp y correo.

## Desplegar en Conexcol

1. Ejecuta `npm run build`. Se crea la carpeta `out/`.
2. En cPanel, entra a **Administrador de archivos → `public_html`** y haz una copia de lo que haya.
3. Sube el **contenido** de `out/`, no la carpeta, incluido el archivo oculto `.htaccess`. Lo más fácil es comprimir el contenido en un .zip, subirlo y extraerlo en `public_html`.
4. Revisa que funcionen:
   - el dominio con `https`,
   - las páginas internas,
   - la página 404 (prueba con una dirección inventada),
   - el envío del formulario.

El `.htaccess` fuerza https, usa la página 404 propia, agrega la barra final a las rutas y configura caché y compresión.

## Accesibilidad

El sitio apunta a WCAG 2.1 AA:

- Enlace «Saltar al contenido» y foco visible en todo.
- Navegación completa con teclado, incluidos el menú móvil, el visor de fotos, el carrusel y el calendario.
- Botones para cambiar el tamaño del texto y activar alto contraste. Se recuerdan en el navegador.
- Se respeta la preferencia de movimiento reducido.

Antes de terminar un cambio, `npm run lint` debe pasar sin advertencias.

## Estructura

```
src/app/          páginas (una carpeta por ruta)
src/components/   layout/, home/, ui/, forms/, agenda/, logros/, presentaciones/, tienda/
src/data/         contenido editable
src/lib/          tipos, fechas, WhatsApp, calendario, validación del formulario
public/           imágenes, .htaccess e imagen para redes (og.png)
docs/             contenido fuente, plan de trabajo y pendientes
```
