/** Fecha de calendario en formato "YYYY-MM-DD", interpretada en America/Bogota. */
export type Fecha = string;

/** Hora en formato 24 h "HH:MM". */
export type Hora = string;

export type ColorMarca =
  "tinta" | "rojo" | "verde" | "magenta" | "amarillo" | "naranja";

export interface Foto {
  /** Ruta dentro de public/, por ejemplo "/images/galeria/tarima-2019.webp". */
  src: string;
  /** Describe la acción, no el diagnóstico. */
  alt: string;
  ancho: number;
  alto: number;
}

export interface Enlace {
  texto: string;
  href: string;
}

export interface Anuncio {
  id: string;
  tipo: "convocatoria" | "colecta" | "evento" | "aviso";
  titulo: string;
  texto: string;
  enlace?: Enlace;
  /** Vigente desde este día (incluido). */
  desde: Fecha;
  /** Vigente hasta este día (incluido). */
  hasta: Fecha;
  /** Se muestra en la barra superior de todas las páginas. */
  mostrarEnBarra: boolean;
  /**
   * Es la campaña que se resalta en inicio y en Apóyanos. Solo se muestra una
   * a la vez: la primera vigente de la lista.
   */
  destacado: boolean;
  /** Texto más largo para el bloque destacado (la barra usa `texto`). */
  detalle?: string;
  foto?: Foto;
  /** Campaña en vaki.co: se muestra su avance, leído al compilar. */
  vaki?: {
    /** Lo que va después de vaki.co/vaki/ en el enlace. */
    slug: string;
    /**
     * Porcentaje desde el que se muestran el monto y la barra. Antes solo se
     * muestran los donantes y la meta, para no desanimar con una barra vacía.
     */
    avanceVisibleDesde: number;
  };
  /** Contenido de muestra. Bórralo cuando haya uno real. */
  ejemplo?: boolean;
}

export type TipoEvento = "presentacion" | "festival" | "actividad" | "colecta";

export interface Evento {
  id: string;
  titulo: string;
  tipo: TipoEvento;
  fecha: Fecha;
  /** Para eventos de varios días. */
  fechaFin?: Fecha;
  horaInicio?: Hora;
  horaFin?: Hora;
  /** Sitio o dirección. En Google Calendar es el campo "Ubicación". */
  lugar: string;
  ciudad?: string;
  descripcion: string;
  enlace?: Enlace;
  ejemplo?: boolean;
}

export type TipoLogro =
  "reconocimiento" | "galardon" | "participacion" | "medios";

export interface Logro {
  id: string;
  anio: number;
  titulo: string;
  detalle?: string;
  lugar?: string;
  tipo: TipoLogro;
  /** Aparece en la página de inicio. */
  destacado?: boolean;
  /** Foto del diploma, medalla o momento. */
  foto?: Foto;
  /** ID de YouTube relacionado, si existe. */
  videoId?: string;
}

export interface Presentacion {
  id: string;
  titulo: string;
  anio: number;
  fecha?: Fecha;
  lugar?: string;
  /** "salida" = viaje fuera de Bogotá. */
  tipo: "presentacion" | "salida";
  descripcion?: string;
  fotos: Foto[];
}

export interface Video {
  /** ID de YouTube. */
  id: string;
  titulo: string;
  canal: string;
  descripcion?: string;
  tieneSubtitulos?: boolean;
  /** Nota de prensa o televisión sobre la fundación. */
  esMedios?: boolean;
}

export interface Programa {
  slug: string;
  nombre: string;
  /** Rótulo corto de la píldora de color (por ejemplo "Música"). */
  etiqueta: string;
  color: ColorMarca;
  resumen: string;
  descripcion: string[];
  dirigidoA?: string;
  horarios?: string;
  edades?: string;
  foto?: Foto;
}

export interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  /** En pesos colombianos. Sin precio se muestra "Consultar precio". */
  precio?: number;
  disponible: boolean;
  historia?: string;
  foto?: Foto;
  ejemplo?: boolean;
}

export interface Testimonio {
  id: string;
  texto: string;
  /** Solo nombre de pila, con autorización. */
  autor: string;
  relacion: string;
  foto?: Foto;
}

export interface PreguntaFrecuente {
  pregunta: string;
  respuesta: string;
  /** La fundación aún no ha entregado la respuesta definitiva. */
  pendiente?: boolean;
}

export interface MiembroEquipo {
  nombre: string;
  cargo: string;
  descripcion?: string;
  foto?: Foto;
}

export interface Aliado {
  nombre: string;
  url?: string;
  logo?: Foto;
}

export type NombreRed = "facebook" | "instagram" | "tiktok" | "youtube";

export interface RedSocial {
  red: NombreRed;
  etiqueta: string;
  /** Nombre de usuario tal como aparece en la red. */
  usuario: string;
  url: string;
}

export interface CifraImpacto {
  valor: string;
  texto: string;
}

export interface CuentaDonacion {
  medio: string;
  titular: string;
  numero: string;
  tipo?: string;
}

export interface SiteConfig {
  nombre: string;
  sigla: string;
  lema: string;
  descripcion: string;
  /** Frase corta del hero. */
  presentacion: string;
  /** URL pública sin barra final. */
  url: string;
  director: string;
  telefono: string;
  /** Número para wa.me, con indicativo y sin signos. */
  whatsapp: string;
  correo: string;
  direccion: {
    calle: string;
    localidad: string;
    ciudad: string;
    region: string;
    pais: string;
  };
  mapa: {
    embedUrl: string;
    url: string;
  };
  redes: RedSocial[];
  canalWhatsApp?: string;
  nit?: string;
  horarioAtencion?: string;
  donaciones: {
    cuentas: CuentaDonacion[];
    qr?: Foto;
  };
  documentos: Enlace[];
  heroFoto?: Foto;
  /** Foto de la sección de historia en Nosotros. */
  historiaFoto?: Foto;
  cifras: CifraImpacto[];
  mision: string;
  vision: string;
  /** Misión y visión aún no aprobadas por la fundación. */
  misionVisionTemporales: boolean;
  resenaCorta: string;
  historia: string[];
  objetivos: string[];
}
