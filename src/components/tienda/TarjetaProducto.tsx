import Image from "next/image";
import { mensajesWhatsApp } from "@/data/site";
import { textoTienda } from "@/data/productos";
import { enlaceWhatsApp } from "@/lib/whatsapp";
import type { Producto } from "@/lib/types";
import { BotonEnlace } from "@/components/ui/Button";
import { EtiquetaEjemplo } from "@/components/ui/EtiquetaEjemplo";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { cx } from "@/lib/colores";

const formatoPesos = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function precioProducto(producto: Producto) {
  return producto.precio === undefined
    ? "Consultar precio"
    : formatoPesos.format(producto.precio);
}

interface TarjetaProductoProps {
  producto: Producto;
  nivel?: "h3" | "h4";
}

export function TarjetaProducto({
  producto,
  nivel: Titulo = "h3",
}: TarjetaProductoProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border-2 border-niebla bg-blanco">
      {producto.foto ? (
        <Image
          src={producto.foto.src}
          alt={producto.foto.alt}
          width={producto.foto.ancho}
          height={producto.foto.alto}
          className={cx(
            "aspect-square w-full object-cover",
            !producto.disponible && "grayscale",
          )}
        />
      ) : (
        <PhotoPlaceholder
          descripcion={producto.nombre.toLowerCase()}
          proporcion="1/1"
        />
      )}
      <div className="flex flex-1 flex-col p-5">
        <p className="flex flex-wrap items-center gap-2 text-base font-bold">
          <span className="rounded bg-naranja px-2 py-0.5 text-tinta">
            {textoTienda.hechoPor}
          </span>
          {producto.ejemplo ? <EtiquetaEjemplo /> : null}
        </p>
        <Titulo className="mt-3 text-2xl">{producto.nombre}</Titulo>
        {producto.historia ? <p className="mt-2">{producto.historia}</p> : null}
        <p className="mt-3 text-xl font-bold">{precioProducto(producto)}</p>
        <p
          className={cx(
            "mt-1 text-base font-bold",
            producto.disponible ? "text-verde" : "text-rojo",
          )}
        >
          {producto.disponible ? "Disponible" : "Agotado"}
        </p>
        <div className="mt-auto pt-5">
          {producto.disponible ? (
            <BotonEnlace
              href={enlaceWhatsApp(mensajesWhatsApp.producto(producto.nombre))}
              variante="whatsapp"
              icono="whatsapp"
              className="w-full"
            >
              Pedir por WhatsApp
            </BotonEnlace>
          ) : null}
        </div>
      </div>
    </article>
  );
}
