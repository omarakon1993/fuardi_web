"use client";

import { useState } from "react";
import { paginas } from "@/data/paginas";
import type { Producto } from "@/lib/types";
import { FiltroOpciones } from "@/components/ui/FiltroOpciones";
import { TarjetaProducto } from "./TarjetaProducto";

export function Catalogo({ productos }: { productos: Producto[] }) {
  const t = paginas.tienda;
  const [categoria, setCategoria] = useState("todas");
  const categorias = [...new Set(productos.map((p) => p.categoria))].sort();
  const lista = productos.filter(
    (p) => categoria === "todas" || p.categoria === categoria,
  );

  return (
    <div>
      {categorias.length > 1 ? (
        <FiltroOpciones
          leyenda={t.filtro}
          nombre="categoria"
          opciones={[
            { valor: "todas", texto: t.todas },
            ...categorias.map((c) => ({ valor: c, texto: c })),
          ]}
          valor={categoria}
          onCambio={setCategoria}
        />
      ) : null}
      <p aria-live="polite" className="mt-4 text-gris">
        {lista.length === 1 ? "1 producto" : `${lista.length} productos`}
      </p>
      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {lista.map((producto) => (
          <li key={producto.id}>
            <TarjetaProducto producto={producto} />
          </li>
        ))}
      </ul>
    </div>
  );
}
