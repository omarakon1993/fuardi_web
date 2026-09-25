import type { Producto } from "@/lib/types";

// TODO(contenido): nombre, precio, fotos e historia de cada producto.
export const productos: Producto[] = [
  {
    id: "pocillos",
    nombre: "Pocillos",
    categoria: "Hogar",
    disponible: true,
  },
  {
    id: "camisetas",
    nombre: "Camisetas",
    categoria: "Ropa",
    disponible: true,
  },
];

export const textoTienda = {
  hechoPor: "Hecho por nuestros jóvenes",
  apoyo:
    "Cada compra apoya los programas de la fundación. No hay carrito: pides por WhatsApp y acordamos contigo el pago y la entrega.",
};
