"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { paginas } from "@/data/paginas";
import { pasados, proximos } from "@/lib/fechas";
import { useHoy } from "@/lib/useHoy";
import type { Evento, Fecha } from "@/lib/types";
import { cx } from "@/lib/colores";
import { FiltroOpciones } from "@/components/ui/FiltroOpciones";
import { AgregarCalendario } from "./AgregarCalendario";
import { CalendarioMensual } from "./CalendarioMensual";
import { TarjetaEvento } from "./TarjetaEvento";

type Vista = "lista" | "calendario";
type Pestana = "proximos" | "pasados";

const PESTANAS: Pestana[] = ["proximos", "pasados"];

interface AgendaProps {
  eventos: Evento[];
  hoyCompilacion: Fecha;
}

export function Agenda({ eventos, hoyCompilacion }: AgendaProps) {
  const t = paginas.agenda;
  const hoy = useHoy(hoyCompilacion);
  const [vista, setVista] = useState<Vista>("lista");
  const [pestana, setPestana] = useState<Pestana>("proximos");
  const refs = useRef<Record<Pestana, HTMLButtonElement | null>>({
    proximos: null,
    pasados: null,
  });

  const listas = {
    proximos: proximos(eventos, hoy),
    pasados: pasados(eventos, hoy),
  };
  const textos = {
    proximos: { nombre: t.proximos, vacio: t.sinProximos },
    pasados: { nombre: t.pasados, vacio: t.sinPasados },
  };

  // Pestañas según el patrón ARIA: flechas, Inicio y Fin mueven y activan.
  function alTeclear(evento: KeyboardEvent<HTMLButtonElement>) {
    const i = PESTANAS.indexOf(pestana);
    let siguiente: Pestana | undefined;
    if (evento.key === "ArrowRight")
      siguiente = PESTANAS[(i + 1) % PESTANAS.length];
    else if (evento.key === "ArrowLeft")
      siguiente = PESTANAS[(i - 1 + PESTANAS.length) % PESTANAS.length];
    else if (evento.key === "Home") siguiente = PESTANAS[0];
    else if (evento.key === "End") siguiente = PESTANAS[PESTANAS.length - 1];
    if (!siguiente) return;
    evento.preventDefault();
    setPestana(siguiente);
    refs.current[siguiente]?.focus();
  }

  return (
    <div>
      <FiltroOpciones
        leyenda={t.vista}
        nombre="vista-agenda"
        opciones={[
          { valor: "lista", texto: "Lista" },
          { valor: "calendario", texto: "Calendario" },
        ]}
        valor={vista}
        onCambio={setVista}
      />

      {vista === "lista" ? (
        <div className="mt-8">
          <div
            role="tablist"
            aria-label="Eventos"
            className="flex gap-2 border-b-4 border-niebla"
          >
            {PESTANAS.map((p) => {
              const activa = p === pestana;
              return (
                <button
                  key={p}
                  ref={(el) => {
                    refs.current[p] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`pestana-${p}`}
                  aria-selected={activa}
                  aria-controls={`panel-${p}`}
                  tabIndex={activa ? 0 : -1}
                  onClick={() => setPestana(p)}
                  onKeyDown={alTeclear}
                  className={cx(
                    "-mb-1 min-h-12 cursor-pointer border-b-4 px-5 text-xl font-bold",
                    activa
                      ? "border-rojo text-tinta"
                      : "border-transparent text-gris hover:text-tinta",
                  )}
                >
                  {textos[p].nombre}{" "}
                  <span className="text-base font-normal">
                    ({listas[p].length})
                  </span>
                </button>
              );
            })}
          </div>

          {PESTANAS.map((p) => (
            <div
              key={p}
              role="tabpanel"
              id={`panel-${p}`}
              aria-labelledby={`pestana-${p}`}
              hidden={p !== pestana}
              className="pt-8"
            >
              {listas[p].length === 0 ? (
                <p className="text-xl">{textos[p].vacio}</p>
              ) : (
                <ul className="grid gap-10 md:grid-cols-2">
                  {listas[p].map((evento) => (
                    <li key={evento.id}>
                      <TarjetaEvento
                        evento={evento}
                        nivel="h3"
                        pasado={p === "pasados"}
                      >
                        {p === "proximos" ? (
                          <AgregarCalendario evento={evento} />
                        ) : null}
                      </TarjetaEvento>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 max-w-2xl">
          <CalendarioMensual eventos={eventos} hoy={hoy} />
        </div>
      )}
    </div>
  );
}
