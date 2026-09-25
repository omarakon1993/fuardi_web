import type { Enlace } from "@/lib/types";

export const menuPrincipal: Enlace[] = [
  { texto: "Inicio", href: "/" },
  { texto: "Nosotros", href: "/nosotros/" },
  { texto: "Programas", href: "/programas/" },
  { texto: "Presentaciones", href: "/presentaciones/" },
  { texto: "Logros", href: "/logros/" },
  { texto: "Agenda", href: "/agenda/" },
  { texto: "Tienda", href: "/tienda/" },
];

export const botonesDestacados = {
  apoyar: { texto: "Apóyanos", href: "/apoyanos/" },
  inscribirse: { texto: "Inscríbete", href: "/contacto/?motivo=inscripcion" },
} satisfies Record<string, Enlace>;

export const enlacesPie: Enlace[] = [
  ...menuPrincipal.slice(1),
  { texto: "Apóyanos", href: "/apoyanos/" },
  { texto: "Contacto", href: "/contacto/" },
];

export const enlacesLegales: Enlace[] = [
  { texto: "Política de tratamiento de datos", href: "/politica-de-datos/" },
];
