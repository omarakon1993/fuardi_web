"use client";

import { useEffect, useState } from "react";
import { calendarioConectado, cargarEventosGoogle } from "@/lib/googleCalendar";
import type { Evento } from "@/lib/types";

/**
 * Parte de los eventos que trae el HTML y, si hay Google Calendar conectado,
 * los reemplaza por los actuales al abrir la página. Así un evento nuevo se
 * ve enseguida, sin volver a publicar el sitio.
 */
export function useEventos(iniciales: Evento[]): Evento[] {
  const [eventos, setEventos] = useState(iniciales);

  useEffect(() => {
    if (!calendarioConectado) return;
    let vigente = true;
    cargarEventosGoogle().then((actuales) => {
      if (vigente && actuales) setEventos(actuales);
    });
    return () => {
      vigente = false;
    };
  }, []);

  return eventos;
}
