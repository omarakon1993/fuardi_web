import { site } from "./site";

export interface SeccionPolitica {
  id: string;
  titulo: string;
  parrafos?: string[];
  lista?: string[];
  cierre?: string[];
}

// TODO(contenido): la fundación debe revisar y aprobar esta política (idealmente con asesoría legal).
export const politica = {
  titulo: "Política de tratamiento de datos personales",
  aviso:
    "Borrador pendiente de revisión por la fundación. Mientras tanto, puedes escribirnos si tienes preguntas sobre tus datos.",
  vigencia: "2026-09-24",
  intro: `En la ${site.nombre} cuidamos los datos personales que nos compartes. Esta política explica, en lenguaje claro, qué datos recogemos, para qué los usamos y cómo puedes ejercer tus derechos, según la Ley 1581 de 2012 y el Decreto 1377 de 2013 (compilado en el Decreto 1074 de 2015).`,
  secciones: [
    {
      id: "responsable",
      titulo: "Quién es responsable de tus datos",
      lista: [
        `Nombre: ${site.nombre} (${site.sigla}).`,
        site.nit ? `NIT: ${site.nit}.` : "NIT: pendiente de publicación.",
        `Dirección: ${site.direccion.calle}, ${site.direccion.localidad}, ${site.direccion.ciudad}`,
        `Correo: ${site.correo}.`,
        `Teléfono y WhatsApp: ${site.telefono}.`,
      ],
    },
    {
      id: "datos",
      titulo: "Qué datos recogemos",
      parrafos: [
        "Solo pedimos los datos necesarios para atender tu solicitud:",
      ],
      lista: [
        "Datos de contacto: nombre, correo electrónico y teléfono o WhatsApp.",
        "En inscripciones: nombre y edad de la persona que se quiere inscribir, programa de interés y cómo nos conociste.",
        "En aportes, presentaciones o alianzas: nombre de la empresa, cargo, fecha y lugar del evento.",
        "El mensaje que nos escribes.",
      ],
      cierre: [
        "El tipo de discapacidad es un dato sensible. Es opcional: puedes no darlo. Si lo das, solo lo usamos para preparar la atención y el acompañamiento de la persona.",
      ],
    },
    {
      id: "finalidades",
      titulo: "Para qué usamos tus datos",
      lista: [
        "Responder tus mensajes y solicitudes.",
        "Gestionar inscripciones: contactarte, darte información de los programas y coordinar una visita.",
        "Recibir y gestionar donaciones y aportes, y enviarte la información o certificados que correspondan.",
        "Coordinar voluntariado, presentaciones del grupo y alianzas.",
        "Enviarte información de la fundación, solo si nos autorizas.",
      ],
      cierre: [
        "No vendemos ni alquilamos tus datos. Tampoco los usamos para fines distintos a los que te contamos aquí.",
      ],
    },
    {
      id: "menores",
      titulo: "Datos de niñas, niños y adolescentes",
      parrafos: [
        "Tratamos los datos de menores de edad solo con autorización de su madre, padre o acudiente, respetando su interés superior y sus derechos fundamentales. Los formularios del sitio deben ser llenados por una persona adulta.",
      ],
    },
    {
      id: "imagen",
      titulo: "Uso de la imagen de nuestros estudiantes",
      parrafos: [
        "Publicamos fotos y videos de nuestros estudiantes para mostrar su trabajo y sus logros. Solo lo hacemos con autorización escrita de su acudiente.",
      ],
      lista: [
        "En fotos solo usamos el nombre de pila, nunca nombres completos de menores.",
        "Las fotos muestran lo que hacen (tocar, bailar, cantar), no su diagnóstico.",
        "El acudiente puede retirar la autorización cuando quiera. En ese caso quitamos las fotos del sitio en un plazo razonable.",
      ],
    },
    {
      id: "derechos",
      titulo: "Tus derechos",
      parrafos: ["Como titular de los datos tienes derecho a:"],
      lista: [
        "Conocer, actualizar y rectificar tus datos.",
        "Pedir prueba de la autorización que nos diste.",
        "Saber cómo hemos usado tus datos.",
        "Revocar la autorización o pedir que borremos tus datos, cuando no exista un deber legal de conservarlos.",
        "Consultar tus datos de forma gratuita.",
        "Presentar quejas ante la Superintendencia de Industria y Comercio, después de haber hecho tu consulta o reclamo ante nosotros.",
      ],
    },
    {
      id: "canal",
      titulo: "Cómo ejercer tus derechos",
      parrafos: [
        `Escríbenos a ${site.correo} con el asunto «Datos personales». Cuéntanos tu nombre, qué necesitas y cómo te respondemos.`,
      ],
      lista: [
        "Consultas: respondemos en máximo 10 días hábiles. Si no podemos hacerlo, te avisamos y respondemos en máximo 5 días hábiles más.",
        "Reclamos (corregir, actualizar, borrar o revocar): respondemos en máximo 15 días hábiles. Si no podemos hacerlo, te avisamos y respondemos en máximo 8 días hábiles más.",
      ],
    },
    {
      id: "seguridad",
      titulo: "Cómo protegemos tus datos",
      parrafos: [
        "Los mensajes del formulario llegan al correo de la fundación a través del servicio Web3Forms. Solo las personas de la fundación que atienden cada solicitud tienen acceso a ellos. Guardamos los datos mientras sean necesarios para la finalidad por la que los recogimos.",
      ],
    },
    {
      id: "cambios",
      titulo: "Cambios a esta política",
      parrafos: [
        "Si cambiamos esta política, publicaremos la nueva versión en esta página con su fecha de vigencia.",
      ],
    },
  ] satisfies SeccionPolitica[],
};
