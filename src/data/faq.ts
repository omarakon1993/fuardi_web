import type { PreguntaFrecuente } from "@/lib/types";

const respuestaPendiente =
  "Estamos actualizando esta información. Escríbenos por WhatsApp al 320 829 8137 y te respondemos.";

export const preguntasFrecuentes: PreguntaFrecuente[] = [
  {
    pregunta: "¿A quién atiende la fundación?",
    respuesta:
      "A niños, niñas, jóvenes y adultos con discapacidad: síndrome de Down, discapacidad cognitiva e hipoacusia.",
  },
  {
    pregunta: "¿Dónde queda la fundación?",
    respuesta: "En la Calle 134 #101b-20, localidad de Suba, Bogotá.",
  },
  {
    pregunta: "¿Cómo inscribo a mi hijo o hija?",
    respuesta:
      "Llena el formulario de contacto eligiendo «Inscripción», o escríbenos por WhatsApp. Te contamos los pasos y te invitamos a conocer la sede.",
  },
  // TODO(contenido): respuestas reales a estas cuatro preguntas.
  {
    pregunta: "¿Qué edades reciben?",
    respuesta: respuestaPendiente,
    pendiente: true,
  },
  {
    pregunta: "¿Qué requisitos hay para entrar?",
    respuesta: respuestaPendiente,
    pendiente: true,
  },
  {
    pregunta: "¿Cuánto cuesta y cuáles son los horarios?",
    respuesta: respuestaPendiente,
    pendiente: true,
  },
  {
    pregunta: "¿Tienen transporte?",
    respuesta: respuestaPendiente,
    pendiente: true,
  },
];
