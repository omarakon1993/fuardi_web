"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { MotivoContacto } from "@/data/apoyo";
import { motivos, textosFormulario as t } from "@/data/formulario";
import { programas } from "@/data/programas";
import { mensajesWhatsApp, site } from "@/data/site";
import { cx } from "@/lib/colores";
import { esquemaContacto } from "@/lib/esquemaContacto";
import { enlaceCorreo, enlaceWhatsApp } from "@/lib/whatsapp";
import { Boton, BotonEnlace } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const CLAVE = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const URL_ENVIO = "https://api.web3forms.com/submit";

type Valores = Record<string, string | boolean>;
type Errores = Record<string, string>;
type Estado = "inicial" | "enviando" | "exito" | "error";

const CAMPOS_VACIOS: Valores = Object.fromEntries(
  [
    "nombre",
    "correo",
    "telefono",
    "mensaje",
    "estudianteNombre",
    "estudianteEdad",
    "programa",
    "discapacidad",
    "comoNosConocio",
    "tipoAporte",
    "aportante",
    "empresa",
    "fechaTentativa",
    "lugar",
    "tipoEvento",
    "cargo",
  ].map((campo) => [campo, ""]),
);

const esMotivo = (v: string | null): v is MotivoContacto =>
  motivos.some((m) => m.valor === v);

/* ---------- Campos ---------- */

const claseControl =
  "mt-2 block w-full rounded-lg border-2 border-tinta/40 bg-blanco px-4 py-3 text-lg text-tinta aria-invalid:border-rojo";

interface CampoProps {
  nombre: string;
  etiqueta: string;
  ayuda?: string;
  error?: string;
  requerido?: boolean;
  children: (props: {
    id: string;
    "aria-describedby"?: string;
    "aria-invalid"?: boolean;
    "aria-required"?: boolean;
  }) => ReactNode;
}

function Campo({
  nombre,
  etiqueta,
  ayuda,
  error,
  requerido,
  children,
}: CampoProps) {
  const base = useId();
  const id = `${base}-${nombre}`;
  const idAyuda = ayuda ? `${id}-ayuda` : undefined;
  const idError = error ? `${id}-error` : undefined;
  const describedby = [idAyuda, idError].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id} className="block text-lg font-bold">
        {etiqueta}
        {requerido ? (
          <span className="font-normal text-gris"> ({t.obligatorio})</span>
        ) : null}
      </label>
      {ayuda ? (
        <p id={idAyuda} className="mt-1 text-base text-gris">
          {ayuda}
        </p>
      ) : null}
      {children({
        id,
        "aria-describedby": describedby,
        "aria-invalid": error ? true : undefined,
        "aria-required": requerido || undefined,
      })}
      {error ? (
        <p
          id={idError}
          className="mt-2 flex items-start gap-2 font-bold text-rojo"
        >
          <Icon nombre="alerta" tamano={20} className="mt-0.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

/* ---------- Alternativas ---------- */

function Alternativas() {
  return (
    <div className="mt-4 flex flex-wrap gap-3">
      <BotonEnlace
        href={enlaceWhatsApp(mensajesWhatsApp.general)}
        variante="whatsapp"
        icono="whatsapp"
      >
        Escribir por WhatsApp
      </BotonEnlace>
      <BotonEnlace
        href={enlaceCorreo(site.correo, "Mensaje desde el sitio web")}
        variante="secundario"
        icono="correo"
      >
        Escribir un correo
      </BotonEnlace>
    </div>
  );
}

/* ---------- Formulario ---------- */

function Formulario({
  motivoInicial,
  programaInicial,
}: {
  motivoInicial: MotivoContacto;
  programaInicial: string;
}) {
  const [valores, setValores] = useState<Valores>({
    motivo: motivoInicial,
    programa: programaInicial,
    aportante: "persona",
    autorizacion: false,
    botcheck: false,
  });
  const [errores, setErrores] = useState<Errores>({});
  const [estado, setEstado] = useState<Estado>("inicial");
  const formulario = useRef<HTMLFormElement>(null);
  const resumen = useRef<HTMLDivElement>(null);
  const estadoRef = useRef<HTMLDivElement>(null);

  const motivo = valores.motivo as MotivoContacto;
  const v = (campo: string) => (valores[campo] as string | undefined) ?? "";

  function cambiar(campo: string, valor: string | boolean) {
    setValores((previo) => ({ ...previo, [campo]: valor }));
    if (errores[campo]) {
      setErrores((previos) => {
        const resto = { ...previos };
        delete resto[campo];
        return resto;
      });
    }
  }

  const texto = (campo: string) => ({
    value: v(campo),
    onChange: (e: { target: { value: string } }) =>
      cambiar(campo, e.target.value),
  });

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (estado === "enviando") return;

    // Los campos sin tocar llegan como "" para que zod dé mensajes en español.
    const resultado = esquemaContacto.safeParse({
      ...CAMPOS_VACIOS,
      ...valores,
    });
    if (!resultado.success) {
      const nuevos: Errores = {};
      for (const issue of resultado.error.issues) {
        const campo = String(issue.path[0] ?? "formulario");
        nuevos[campo] ??= issue.message;
      }
      setErrores(nuevos);
      // Llevar el foco al resumen de errores para que se anuncie.
      requestAnimationFrame(() => resumen.current?.focus());
      return;
    }
    setErrores({});

    // Honeypot: los bots suelen marcarlo. Se finge éxito sin enviar nada.
    if (valores.botcheck) {
      setEstado("exito");
      return;
    }

    const datos = resultado.data;
    const nombreMotivo =
      motivos.find((m) => m.valor === datos.motivo)?.texto ?? datos.motivo;
    const nombrePrograma =
      "programa" in datos
        ? (programas.find((p) => p.slug === datos.programa)?.nombre ??
          t.programaNoSe)
        : undefined;

    const cuerpo: Record<string, string | number | boolean | undefined> = {
      access_key: CLAVE,
      subject: `[FUARDI] ${nombreMotivo} — ${datos.nombre}`,
      from_name: `Sitio web ${site.sigla}`,
      botcheck: false,
      Motivo: nombreMotivo,
      Nombre: datos.nombre,
      email: datos.correo,
      "Teléfono / WhatsApp": datos.telefono,
      ...(datos.motivo === "inscripcion"
        ? {
            "Persona a inscribir": datos.estudianteNombre,
            Edad: datos.estudianteEdad,
            Programa: nombrePrograma,
            "Tipo de discapacidad": datos.discapacidad || undefined,
            "Cómo nos conoció": datos.comoNosConocio || undefined,
          }
        : {}),
      ...(datos.motivo === "aporte"
        ? {
            "Tipo de aporte": t.tiposAporte.find(
              (a) => a.valor === datos.tipoAporte,
            )?.texto,
            "Aporta como": datos.aportante,
            Empresa: datos.empresa || undefined,
          }
        : {}),
      ...(datos.motivo === "presentacion"
        ? {
            "Fecha tentativa": datos.fechaTentativa,
            Lugar: datos.lugar,
            "Tipo de evento": datos.tipoEvento,
          }
        : {}),
      ...(datos.motivo === "alianza"
        ? { Empresa: datos.empresa, Cargo: datos.cargo }
        : {}),
      Mensaje: datos.mensaje || undefined,
      "Autorizó tratamiento de datos": "Sí",
    };

    setEstado("enviando");
    try {
      const respuesta = await fetch(URL_ENVIO, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(cuerpo),
      });
      const json = (await respuesta.json().catch(() => ({}))) as {
        success?: boolean;
      };
      setEstado(respuesta.ok && json.success ? "exito" : "error");
    } catch {
      setEstado("error");
    }
    requestAnimationFrame(() => estadoRef.current?.focus());
  }

  if (estado === "exito") {
    return (
      <div
        ref={estadoRef}
        tabIndex={-1}
        role="status"
        className="rounded-xl border-4 border-verde bg-blanco p-6 focus-visible:outline-none"
      >
        <p className="flex items-start gap-3 text-xl font-bold">
          <Icon
            nombre="verificado"
            className="mt-1 shrink-0 text-verde"
            strokeWidth={3}
          />
          {t.exito}
        </p>
        <Boton
          variante="secundario"
          className="mt-6"
          onClick={() => {
            setValores({
              motivo,
              programa: "",
              aportante: "persona",
              autorizacion: false,
              botcheck: false,
            });
            setEstado("inicial");
          }}
        >
          {t.otroMensaje}
        </Boton>
      </div>
    );
  }

  const numErrores = Object.keys(errores).length;
  const campos: Array<keyof typeof errores> = Object.keys(errores);

  return (
    <form ref={formulario} onSubmit={enviar} noValidate className="space-y-6">
      <div ref={resumen} tabIndex={-1} className="focus-visible:outline-none">
        {numErrores > 0 ? (
          <div
            role="alert"
            className="rounded-lg border-2 border-rojo bg-blanco p-4"
          >
            <p className="font-bold text-rojo">
              {t.errores.replace("{n}", String(numErrores))}
            </p>
            <ul className="mt-2 list-disc pl-6">
              {campos.map((campo) => (
                <li key={campo}>{errores[campo]}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <Campo
        nombre="motivo"
        etiqueta={t.motivo}
        requerido
        error={errores.motivo}
      >
        {(props) => (
          <select {...props} {...texto("motivo")} className={claseControl}>
            {motivos.map((m) => (
              <option key={m.valor} value={m.valor}>
                {m.texto}
              </option>
            ))}
          </select>
        )}
      </Campo>

      <div className="grid gap-6 md:grid-cols-2">
        <Campo
          nombre="nombre"
          etiqueta={t.nombre}
          requerido
          error={errores.nombre}
        >
          {(props) => (
            <input
              {...props}
              {...texto("nombre")}
              type="text"
              autoComplete="name"
              className={claseControl}
            />
          )}
        </Campo>
        <Campo
          nombre="telefono"
          etiqueta={t.telefono}
          ayuda={t.telefonoAyuda}
          requerido
          error={errores.telefono}
        >
          {(props) => (
            <input
              {...props}
              {...texto("telefono")}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className={claseControl}
            />
          )}
        </Campo>
      </div>

      <Campo
        nombre="correo"
        etiqueta={t.correo}
        requerido
        error={errores.correo}
      >
        {(props) => (
          <input
            {...props}
            {...texto("correo")}
            type="email"
            autoComplete="email"
            className={claseControl}
          />
        )}
      </Campo>

      {motivo === "inscripcion" ? (
        <fieldset className="space-y-6 rounded-xl border-2 border-azul/30 p-5">
          <legend className="px-2 text-xl font-bold">
            Datos de la inscripción
          </legend>
          <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
            <Campo
              nombre="estudianteNombre"
              etiqueta={t.estudianteNombre}
              ayuda={t.estudianteNombreAyuda}
              requerido
              error={errores.estudianteNombre}
            >
              {(props) => (
                <input
                  {...props}
                  {...texto("estudianteNombre")}
                  type="text"
                  className={claseControl}
                />
              )}
            </Campo>
            <Campo
              nombre="estudianteEdad"
              etiqueta={t.estudianteEdad}
              requerido
              error={errores.estudianteEdad}
            >
              {(props) => (
                <input
                  {...props}
                  {...texto("estudianteEdad")}
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={99}
                  className={claseControl}
                />
              )}
            </Campo>
          </div>
          <Campo
            nombre="programa"
            etiqueta={t.programa}
            requerido
            error={errores.programa}
          >
            {(props) => (
              <select
                {...props}
                {...texto("programa")}
                className={claseControl}
              >
                <option value="">Elige un programa</option>
                {programas.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.nombre}
                  </option>
                ))}
                <option value="no-se">{t.programaNoSe}</option>
              </select>
            )}
          </Campo>
          <Campo
            nombre="discapacidad"
            etiqueta={t.discapacidad}
            ayuda={t.discapacidadAyuda}
            error={errores.discapacidad}
          >
            {(props) => (
              <input
                {...props}
                {...texto("discapacidad")}
                type="text"
                className={claseControl}
              />
            )}
          </Campo>
          <Campo
            nombre="comoNosConocio"
            etiqueta={t.comoNosConocio}
            error={errores.comoNosConocio}
          >
            {(props) => (
              <input
                {...props}
                {...texto("comoNosConocio")}
                type="text"
                className={claseControl}
              />
            )}
          </Campo>
        </fieldset>
      ) : null}

      {motivo === "aporte" ? (
        <fieldset className="space-y-6 rounded-xl border-2 border-azul/30 p-5">
          <legend className="px-2 text-xl font-bold">Datos del aporte</legend>
          <GrupoRadios
            nombre="tipoAporte"
            leyenda={t.tipoAporte}
            opciones={t.tiposAporte}
            valor={v("tipoAporte")}
            error={errores.tipoAporte}
            onCambio={(valor) => cambiar("tipoAporte", valor)}
          />
          <GrupoRadios
            nombre="aportante"
            leyenda={t.aportante}
            opciones={t.aportantes}
            valor={v("aportante")}
            error={errores.aportante}
            onCambio={(valor) => cambiar("aportante", valor)}
          />
          {v("aportante") === "empresa" ? (
            <Campo
              nombre="empresa"
              etiqueta={t.empresa}
              requerido
              error={errores.empresa}
            >
              {(props) => (
                <input
                  {...props}
                  {...texto("empresa")}
                  type="text"
                  autoComplete="organization"
                  className={claseControl}
                />
              )}
            </Campo>
          ) : null}
        </fieldset>
      ) : null}

      {motivo === "presentacion" ? (
        <fieldset className="space-y-6 rounded-xl border-2 border-azul/30 p-5">
          <legend className="px-2 text-xl font-bold">Datos del evento</legend>
          <div className="grid gap-6 md:grid-cols-2">
            <Campo
              nombre="fechaTentativa"
              etiqueta={t.fechaTentativa}
              requerido
              error={errores.fechaTentativa}
            >
              {(props) => (
                <input
                  {...props}
                  {...texto("fechaTentativa")}
                  type="date"
                  className={claseControl}
                />
              )}
            </Campo>
            <Campo
              nombre="lugar"
              etiqueta={t.lugar}
              requerido
              error={errores.lugar}
            >
              {(props) => (
                <input
                  {...props}
                  {...texto("lugar")}
                  type="text"
                  className={claseControl}
                />
              )}
            </Campo>
          </div>
          <Campo
            nombre="tipoEvento"
            etiqueta={t.tipoEvento}
            ayuda={t.tipoEventoAyuda}
            requerido
            error={errores.tipoEvento}
          >
            {(props) => (
              <input
                {...props}
                {...texto("tipoEvento")}
                type="text"
                className={claseControl}
              />
            )}
          </Campo>
        </fieldset>
      ) : null}

      {motivo === "alianza" ? (
        <fieldset className="space-y-6 rounded-xl border-2 border-azul/30 p-5">
          <legend className="px-2 text-xl font-bold">
            Datos de la empresa
          </legend>
          <div className="grid gap-6 md:grid-cols-2">
            <Campo
              nombre="empresa"
              etiqueta={t.empresa}
              requerido
              error={errores.empresa}
            >
              {(props) => (
                <input
                  {...props}
                  {...texto("empresa")}
                  type="text"
                  autoComplete="organization"
                  className={claseControl}
                />
              )}
            </Campo>
            <Campo
              nombre="cargo"
              etiqueta={t.cargo}
              requerido
              error={errores.cargo}
            >
              {(props) => (
                <input
                  {...props}
                  {...texto("cargo")}
                  type="text"
                  autoComplete="organization-title"
                  className={claseControl}
                />
              )}
            </Campo>
          </div>
        </fieldset>
      ) : null}

      <Campo
        nombre="mensaje"
        etiqueta={t.mensaje}
        ayuda={t.mensajeAyuda}
        requerido={["voluntariado", "alianza", "otro"].includes(motivo)}
        error={errores.mensaje}
      >
        {(props) => (
          <textarea
            {...props}
            {...texto("mensaje")}
            rows={5}
            className={claseControl}
          />
        )}
      </Campo>

      {/* Honeypot antispam: invisible para personas, lo llenan los bots. */}
      <div aria-hidden="true" className="hidden">
        <label>
          No llenar
          <input
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            checked={valores.botcheck === true}
            onChange={(e) => cambiar("botcheck", e.target.checked)}
          />
        </label>
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="autorizacion"
            type="checkbox"
            checked={valores.autorizacion === true}
            onChange={(e) => cambiar("autorizacion", e.target.checked)}
            aria-invalid={errores.autorizacion ? true : undefined}
            aria-describedby={
              errores.autorizacion ? "autorizacion-error" : undefined
            }
            aria-required
            className="mt-1 size-6 shrink-0 cursor-pointer accent-azul"
          />
          <label htmlFor="autorizacion" className="text-lg">
            {t.autorizacion}{" "}
            <Link
              href="/politica-de-datos/"
              className="font-bold text-azul underline"
              target="_blank"
            >
              {t.autorizacionEnlace}
              <span className="sr-only"> (se abre en una pestaña nueva)</span>
            </Link>
            . <span className="text-gris">({t.obligatorio})</span>
          </label>
        </div>
        {errores.autorizacion ? (
          <p
            id="autorizacion-error"
            className="mt-2 flex items-start gap-2 font-bold text-rojo"
          >
            <Icon nombre="alerta" tamano={20} className="mt-0.5 shrink-0" />
            {errores.autorizacion}
          </p>
        ) : null}
      </div>

      <Boton
        type="submit"
        disabled={estado === "enviando"}
        className="w-full sm:w-auto"
      >
        {estado === "enviando" ? t.enviando : t.enviar}
      </Boton>

      <div
        ref={estadoRef}
        tabIndex={-1}
        aria-live="assertive"
        className="focus-visible:outline-none"
      >
        {estado === "enviando" ? <p className="sr-only">{t.enviando}</p> : null}
        {estado === "error" ? (
          <div className="rounded-lg border-2 border-rojo bg-blanco p-5">
            <p className="flex items-start gap-2 text-lg font-bold text-rojo">
              <Icon nombre="alerta" className="mt-0.5 shrink-0" />
              {t.error}
            </p>
            <Alternativas />
          </div>
        ) : null}
      </div>
    </form>
  );
}

interface GrupoRadiosProps {
  nombre: string;
  leyenda: string;
  opciones: { valor: string; texto: string }[];
  valor: string;
  error?: string;
  onCambio: (valor: string) => void;
}

function GrupoRadios({
  nombre,
  leyenda,
  opciones,
  valor,
  error,
  onCambio,
}: GrupoRadiosProps) {
  const idError = `${nombre}-error`;
  return (
    <fieldset aria-describedby={error ? idError : undefined}>
      <legend className="text-lg font-bold">
        {leyenda}{" "}
        <span className="font-normal text-gris">({t.obligatorio})</span>
      </legend>
      <div className="mt-2 space-y-2">
        {opciones.map((o) => (
          <label
            key={o.valor}
            className="flex min-h-11 cursor-pointer items-center gap-3 text-lg"
          >
            <input
              type="radio"
              name={nombre}
              value={o.valor}
              checked={valor === o.valor}
              onChange={() => onCambio(o.valor)}
              className="size-5 cursor-pointer accent-azul"
            />
            {o.texto}
          </label>
        ))}
      </div>
      {error ? (
        <p
          id={idError}
          className="mt-2 flex items-start gap-2 font-bold text-rojo"
        >
          <Icon nombre="alerta" tamano={20} className="mt-0.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

/* ---------- Entrada ---------- */

/** Lee ?motivo= y ?programa=. Debe ir dentro de <Suspense>. */
export function ContactForm() {
  const params = useSearchParams();
  const motivo = params.get("motivo");
  const programa = params.get("programa") ?? "";

  if (!CLAVE) {
    return (
      <div
        role="note"
        className="rounded-xl border-2 border-amarillo bg-blanco p-6"
      >
        <p className="flex items-start gap-3 text-lg font-bold">
          <Icon nombre="alerta" className="mt-0.5 shrink-0" />
          {t.sinClave}
        </p>
        <Alternativas />
      </div>
    );
  }

  return (
    <Formulario
      // Si cambia la URL (por ejemplo, desde el botón «Inscríbete»), se reinicia.
      key={params.toString()}
      motivoInicial={esMotivo(motivo) ? motivo : "otro"}
      programaInicial={
        programas.some((p) => p.slug === programa) ? programa : ""
      }
    />
  );
}

export function ContactFormCargando() {
  return <p className={cx("rounded-xl bg-blanco p-6 text-lg")}>{t.cargando}</p>;
}
