# Agenda con Google Calendar

La agenda del sitio (la sección «Próximas fechas» del inicio y la página **Agenda**) puede leerse desde un Google Calendar público. Así, un profesor de la fundación sube los eventos desde el celular, y el sitio los muestra sin que nadie tenga que volver a publicarlo.

Este documento tiene dos partes:

1. **Configuración inicial.** La hace una sola vez la persona que administra el sitio.
2. **Guía para profesores.** Cómo agregar, cambiar o quitar un evento.

---

## 1. Configuración inicial (una sola vez)

Necesitas la cuenta de Google de la fundación (por ejemplo, fuardi18@gmail.com) y acceso al proyecto del sitio.

### a) Crear el calendario

1. Entra a [calendar.google.com](https://calendar.google.com) con la cuenta de la fundación.
2. A la izquierda, en **Otros calendarios**, pulsa **+** y luego **Crear calendario**.
3. Ponle de nombre «Agenda FUARDI», elige la zona horaria **(GMT-05:00) Bogotá** y pulsa **Crear calendario**.
4. Abre la configuración del calendario nuevo. En **Permisos de acceso a eventos**, marca **Poner a disposición del público** con la opción **Ver todos los detalles del evento**.
   - Todo lo que se publique en este calendario lo puede ver cualquier persona. Úsalo solo para eventos públicos.
5. Más abajo, en **Integrar el calendario**, copia el **ID del calendario**. Se ve como `abc123…@group.calendar.google.com`.

### b) Dar permiso a los profesores

En la misma configuración, en **Compartir con determinadas personas o grupos**, agrega el correo de cada profesor con el permiso **Hacer cambios en eventos**. Para quitarle el acceso a alguien, bórralo de esa lista.

### c) Crear la clave de Google (gratis)

1. Entra a [console.cloud.google.com](https://console.cloud.google.com) con la cuenta de la fundación y crea un proyecto llamado «Sitio FUARDI».
2. En **APIs y servicios → Biblioteca**, busca **Google Calendar API** y pulsa **Habilitar**.
3. En **APIs y servicios → Credenciales**, pulsa **Crear credenciales → Clave de API** y copia la clave.
4. Abre la clave y restríngela. Así nadie puede usarla fuera del sitio:
   - **Restricciones de aplicaciones:** «Sitios web». Agrega el dominio real del sitio, por ejemplo `https://fuardi.org/*` y `https://www.fuardi.org/*`. Para probar en tu computador agrega también `http://localhost:3000/*`.
   - **Restricciones de API:** «Restringir clave» y elige solo **Google Calendar API**.
   - El dominio debe coincidir con `url` en `src/data/site.ts`: al compilar, el sitio se identifica con ese dominio.

### d) Conectar el sitio

1. En `.env.local` (cópialo de `.env.example` si no existe), pega los dos datos:

   ```
   NEXT_PUBLIC_GOOGLE_CALENDAR_ID=abc123…@group.calendar.google.com
   NEXT_PUBLIC_GOOGLE_API_KEY=tu-clave
   ```

2. Ejecuta `npm run build` y sube el contenido de `out/` a Conexcol, como siempre. Esta es la última vez que hace falta publicar por la agenda.
3. Revisa el sitio: la agenda debe mostrar los eventos del calendario. Con el calendario conectado, los eventos de `src/data/eventos.ts` (incluidos los de ejemplo) ya no se usan.

La página **Agenda** también muestra el enlace «Seguir la agenda en mi Google Calendar», para que las familias agreguen el calendario al suyo.

### Si algo falla

- **La agenda sale vacía.** Revisa que el calendario sea público, que el ID esté bien copiado y que el dominio de la restricción sea el mismo del sitio (con `https://` y `/*` al final).
- **Probando en tu computador no aparece nada.** Agrega `http://localhost:3000/*` a la restricción de la clave.
- **Google no responde.** Al compilar, la página queda sin eventos, pero cada visitante los carga al abrirla.

---

## 2. Guía para profesores

Usa la app **Google Calendar** en el celular o entra a calendar.google.com. Siempre elige el calendario **Agenda FUARDI**.

### Agregar un evento

1. Pulsa **+** y luego **Evento**.
2. Llena los datos:
   - **Título:** lo que verá la gente. Por ejemplo, «Presentación en el Festival de Suba».
   - **Fecha y hora:** de inicio y fin. Si dura todo el día o varios días, activa **Todo el día**.
   - **Ubicación:** el lugar y la ciudad. Por ejemplo, «Parque Fontanar del Río, Bogotá».
   - **Descripción:** una o dos frases para el público.
3. Revisa que arriba diga **Agenda FUARDI** y no tu calendario personal.
4. Pulsa **Guardar**.

El evento aparece en el sitio la próxima vez que alguien abra la página. Si ya la tenías abierta, recárgala.

### Tipo de evento

El sitio muestra una etiqueta con el tipo: Presentación, Festival, Actividad o Colecta. Para elegirlo, escribe en la descripción una línea así:

```
Tipo: festival
```

Si no la escribes, el sitio lo deduce del título: «festival», «colecta», «taller», «jornada» o «salida». Si no encuentra ninguna de esas palabras, lo muestra como **Presentación**.

### Cambiar o cancelar un evento

- **Cambiar:** abre el evento, pulsa el lápiz, corrige y guarda.
- **Cancelar:** abre el evento y pulsa **Eliminar**. Desaparece del sitio.

Los eventos que ya pasaron quedan solos en la pestaña «Pasados» de la agenda durante un año.

### Recuerda

- Todo lo que pongas en este calendario es **público**.
- No escribas nombres completos de estudiantes, teléfonos personales ni datos de salud.
