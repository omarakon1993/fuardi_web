import type { MotivoContacto } from "./apoyo";

export const motivos: { valor: MotivoContacto; texto: string }[] = [
  { valor: "inscripcion", texto: "Inscripción" },
  { valor: "aporte", texto: "Aporte o donación" },
  { valor: "voluntariado", texto: "Voluntariado" },
  { valor: "presentacion", texto: "Contratar una presentación" },
  { valor: "alianza", texto: "Alianza empresarial" },
  { valor: "otro", texto: "Otro" },
];

export const textosFormulario = {
  motivo: "¿Sobre qué nos escribes?",
  nombre: "Tu nombre",
  correo: "Correo electrónico",
  telefono: "Teléfono o WhatsApp",
  telefonoAyuda: "Te llamamos o escribimos a este número.",
  mensaje: "Mensaje",
  mensajeAyuda: "Cuéntanos lo que necesites.",

  estudianteNombre: "Nombre de la persona que quieres inscribir",
  estudianteNombreAyuda: "Solo el nombre de pila es suficiente.",
  estudianteEdad: "Edad",
  programa: "Programa de interés",
  programaNoSe: "Aún no sé",
  discapacidad: "Tipo de discapacidad (opcional)",
  discapacidadAyuda:
    "Es opcional. Solo lo usamos para preparar la atención y el acompañamiento. Es un dato sensible y lo cuidamos según nuestra política de datos.",
  comoNosConocio: "¿Cómo nos conociste? (opcional)",

  tipoAporte: "¿Qué quieres aportar?",
  tiposAporte: [
    { valor: "dinero", texto: "Dinero" },
    {
      valor: "especie",
      texto: "En especie (instrumentos, vestuario, materiales…)",
    },
    { valor: "tiempo", texto: "Tiempo" },
  ],
  aportante: "Aportas como",
  aportantes: [
    { valor: "persona", texto: "Persona" },
    { valor: "empresa", texto: "Empresa" },
  ],
  empresa: "Nombre de la empresa",
  cargo: "Tu cargo",

  fechaTentativa: "Fecha tentativa del evento",
  lugar: "Lugar o ciudad del evento",
  tipoEvento: "Tipo de evento",
  tipoEventoAyuda: "Por ejemplo: evento empresarial, colegio, celebración.",

  autorizacion: "Autorizo el tratamiento de mis datos personales según la",
  autorizacionEnlace: "política de tratamiento de datos",

  enviar: "Enviar mensaje",
  enviando: "Enviando…",
  obligatorio: "obligatorio",
  errores: "Revisa los campos marcados. Hay {n} por corregir.",
  exito:
    "¡Gracias! Recibimos tu mensaje. Te responderemos en los próximos días hábiles al correo o teléfono que nos diste.",
  error:
    "No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp o correo.",
  sinClave:
    "El formulario todavía no está activo. Mientras tanto, escríbenos por WhatsApp o correo.",
  cargando: "Cargando formulario…",
  otroMensaje: "Enviar otro mensaje",
};
