import type { Enlace } from "@/lib/types";

/** Grupo del menú que se despliega con varias páginas. */
export interface GrupoMenu {
  texto: string;
  enlaces: Enlace[];
}

export type ItemMenu = Enlace | GrupoMenu;

export const esGrupo = (item: ItemMenu): item is GrupoMenu => "enlaces" in item;

// El logo lleva al inicio, así que "Inicio" no ocupa lugar en el menú.
export const menuPrincipal: ItemMenu[] = [
  {
    texto: "Nosotros",
    enlaces: [
      { texto: "Quiénes somos", href: "/nosotros/" },
      { texto: "Logros", href: "/logros/" },
    ],
  },
  { texto: "Programas", href: "/programas/" },
  {
    texto: "Presentaciones",
    enlaces: [
      { texto: "Fotos y videos", href: "/presentaciones/" },
      { texto: "Agenda", href: "/agenda/" },
    ],
  },
  { texto: "Tienda", href: "/tienda/" },
  { texto: "Contacto", href: "/contacto/" },
];

export const botonesDestacados = {
  apoyar: { texto: "Apóyanos", href: "/apoyanos/" },
  inscribirse: { texto: "Inscríbete", href: "/contacto/?motivo=inscripcion" },
} satisfies Record<string, Enlace>;

/** Todas las páginas principales, en el orden del menú. */
export const paginasSitio: Enlace[] = [
  { texto: "Inicio", href: "/" },
  ...menuPrincipal.flatMap((item) => (esGrupo(item) ? item.enlaces : [item])),
  botonesDestacados.apoyar,
];

export const enlacesLegales: Enlace[] = [
  { texto: "Política de tratamiento de datos", href: "/politica-de-datos/" },
];
