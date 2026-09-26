import { inicio } from "@/data/inicio";
import { productos } from "@/data/productos";
import { TarjetaProducto } from "@/components/tienda/TarjetaProducto";
import { BotonEnlace } from "@/components/ui/Button";
import { EncabezadoSeccion, Section } from "@/components/ui/Section";

export function ShopPreview() {
  const lista = productos.filter((p) => p.disponible).slice(0, 4);
  if (lista.length === 0) return null;

  return (
    <Section tituloId="tienda-titulo" fondo="niebla">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <EncabezadoSeccion
          id="tienda-titulo"
          titulo={inicio.tienda.titulo}
          intro={inicio.tienda.intro}
        />
        <BotonEnlace href="/tienda/" variante="secundario">
          {inicio.tienda.enlace}
        </BotonEnlace>
      </div>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {lista.map((producto) => (
          <li key={producto.id}>
            <TarjetaProducto producto={producto} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
