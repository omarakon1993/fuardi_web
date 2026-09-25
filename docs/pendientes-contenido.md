# Contenido pendiente por página

Lista de lo que falta pedirle a la fundación. Cada punto tiene un `TODO(contenido)` en el código; al completarlo, borra el comentario.

Antes de publicar el sitio, confirma los puntos marcados con ⚠️.

## Todo el sitio

- ⚠️ **Dominio definitivo.** Se usa en el sitemap, en la URL canónica y en la imagen para redes. → `src/data/site.ts` (`url`)
- **Redes sociales:** Facebook, Instagram y TikTok. YouTube ya está. → `src/data/site.ts` (`redes`)
- **Canal de WhatsApp.** Mientras no esté, el bloque de inicio muestra «Escríbenos por WhatsApp». → `src/data/site.ts` (`canalWhatsApp`)
- **NIT.** Aparece en el pie de página, en Nosotros y en la política de datos. → `src/data/site.ts` (`nit`)
- ⚠️ **Anuncio de ejemplo.** Reemplázalo por una convocatoria o colecta real, o bórralo. → `src/data/anuncios.ts`
- **Logo en alta resolución** (SVG o PNG con fondo transparente). El actual se sacó del brochure y es pequeño. → `public/images/logo/fuardi-logo.png`, `src/app/icon.png` y `public/og.png`
- **Autorizaciones de uso de imagen** firmadas por los acudientes antes de subir cualquier foto de los estudiantes.

## Inicio

- **Foto principal**: el grupo tocando en tarima. → `public/images/hero/` y `src/data/site.ts` (`heroFoto`)
- ⚠️ **Cifras**: confirmar 25 jóvenes, +12 festivales y 4 departamentos. → `src/data/site.ts` (`cifras`)
- **Testimonios de familias**, con autorización y solo nombre de pila. La sección aparece sola cuando hay al menos uno. → `src/data/testimonios.ts`
- Foto de la pieza de música en el mosaico de programas. → `src/data/programas.ts` (`foto` de `musica`)

## Nosotros

- ⚠️ **Misión y visión definitivas.** Las actuales son temporales. Cuando estén aprobadas, cambia `misionVisionTemporales` a `false`. → `src/data/site.ts`
- **Equipo**: docentes y equipo de trabajo, con foto si autorizan. → `src/data/equipo.ts`
- **Transparencia**: certificado de existencia y representación legal y otros documentos (PDF en `public/documentos/`). → `src/data/site.ts` (`documentos`)
- Foto del grupo con el pendón de la fundación.

## Programas

- Descripción detallada de **formación académica, danza, canto y emprendimientos**. → `src/data/programas.ts`
- **Horarios y edades** de cada programa. → `src/data/programas.ts` (`horarios`, `edades`)
- Confirmar **a quién va dirigido** cada programa. → `src/data/programas.ts` (`dirigidoA`)
- Una foto por programa. → `src/data/programas.ts` (`foto`)
- **Preguntas frecuentes**: edades, requisitos, costos, horarios y transporte. → `src/data/faq.ts` (quitar `pendiente: true` al responder)

## Presentaciones

- **Fotos** de las presentaciones: aparecen en la galería con visor. → `src/data/presentaciones.ts` (`fotos`) y `public/images/galeria/`
- Fechas exactas de cada presentación (hoy solo tienen año). → `src/data/presentaciones.ts` (`fecha`)
- Lugar de: SERES Circuito de Artes (2018), 9ª Gala de Exaltación (2019) y «Danzando con el Sol» (2024), y si esta última fue salida. → `src/data/presentaciones.ts`

## Logros

- **Fotos de diplomas y medallas** de los reconocimientos y del galardón. → `src/data/logros.ts` (`foto`) y `public/images/logros/`

## Agenda

- ⚠️ **Eventos reales.** Borra los dos de ejemplo. → `src/data/eventos.ts`
- Opcional: calendario público de Google para insertarlo en la página. → `src/data/site.ts` (`googleCalendarEmbedUrl`)

## Tienda

- **Productos**: nombre, precio, fotos, historia y disponibilidad. Hoy solo están «Pocillos» y «Camisetas», sin precio. → `src/data/productos.ts` y `public/images/productos/`

## Apóyanos

- **Datos para donar**: cuenta bancaria, Nequi, Daviplata y código QR. → `src/data/site.ts` (`donaciones`)
- **Aliados** y empresas que apoyan. → `src/data/aliados.ts`

## Contacto

- ⚠️ **Clave de Web3Forms** en `.env.local`. Sin ella, el formulario muestra solo WhatsApp y correo.
- **Horario de atención.** → `src/data/site.ts` (`horarioAtencion`)

## Política de datos

- ⚠️ La fundación debe **revisar y aprobar** la política, idealmente con asesoría legal. Después, quita el aviso de borrador. → `src/data/politica.ts` (`aviso`)
