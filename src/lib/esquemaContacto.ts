import { z } from "zod";

const requerido = (campo: string) => ({ error: `Escribe ${campo}.` });

const comunes = {
  nombre: z
    .string()
    .trim()
    .min(2, requerido("tu nombre"))
    .max(100, { error: "El nombre es demasiado largo." }),
  correo: z
    .string()
    .trim()
    .min(1, requerido("tu correo"))
    .pipe(
      z.email({ error: "Escribe un correo válido, como nombre@correo.com." }),
    ),
  telefono: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length >= 7, {
      error: "Escribe un teléfono de al menos 7 números.",
    }),
  mensaje: z.string().trim().max(2000, {
    error: "El mensaje es demasiado largo (máximo 2000 caracteres).",
  }),
  autorizacion: z.literal(true, {
    error: "Debes autorizar el tratamiento de datos para enviar el mensaje.",
  }),
};

const mensajeObligatorio = comunes.mensaje.min(10, {
  error: "Cuéntanos un poco más (mínimo 10 caracteres).",
});

export const esquemaContacto = z.discriminatedUnion("motivo", [
  z.object({
    motivo: z.literal("inscripcion"),
    ...comunes,
    estudianteNombre: z
      .string()
      .trim()
      .min(2, requerido("el nombre de la persona")),
    estudianteEdad: z.coerce
      .number({ error: "Escribe la edad en números." })
      .int({ error: "Escribe la edad en números enteros." })
      .min(1, { error: "Escribe la edad en números." })
      .max(99, { error: "Revisa la edad." }),
    programa: z.string().min(1, { error: "Elige un programa o «Aún no sé»." }),
    discapacidad: z.string().trim().max(200).optional(),
    comoNosConocio: z.string().trim().max(200).optional(),
  }),
  z
    .object({
      motivo: z.literal("aporte"),
      ...comunes,
      mensaje: comunes.mensaje,
      tipoAporte: z.enum(["dinero", "especie", "tiempo"], {
        error: "Elige qué quieres aportar.",
      }),
      aportante: z.enum(["persona", "empresa"], {
        error: "Elige si aportas como persona o empresa.",
      }),
      empresa: z.string().trim().optional(),
    })
    .refine((d) => d.aportante !== "empresa" || (d.empresa ?? "").length >= 2, {
      error: "Escribe el nombre de la empresa.",
      path: ["empresa"],
    }),
  z.object({
    motivo: z.literal("voluntariado"),
    ...comunes,
    mensaje: mensajeObligatorio,
  }),
  z.object({
    motivo: z.literal("presentacion"),
    ...comunes,
    fechaTentativa: z.string().min(1, { error: "Elige una fecha tentativa." }),
    lugar: z.string().trim().min(2, requerido("el lugar o la ciudad")),
    tipoEvento: z.string().trim().min(2, requerido("el tipo de evento")),
  }),
  z.object({
    motivo: z.literal("alianza"),
    ...comunes,
    empresa: z.string().trim().min(2, requerido("el nombre de la empresa")),
    cargo: z.string().trim().min(2, requerido("tu cargo")),
    mensaje: mensajeObligatorio,
  }),
  z.object({
    motivo: z.literal("otro"),
    ...comunes,
    mensaje: mensajeObligatorio,
  }),
]);

export type DatosContacto = z.infer<typeof esquemaContacto>;
