import type { Metadata } from "next";
import { metadatos } from "@/lib/metadatos";
import { paginas } from "@/data/paginas";
import { productos, textoTienda } from "@/data/productos";
import { Catalogo } from "@/components/tienda/Catalogo";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

const t = paginas.tienda;

export const metadata: Metadata = metadatos(
  t.titulo,
  "Productos hechos por los jóvenes de la Fundación Armonía Diversa. Pídelos por WhatsApp: cada compra apoya a la fundación.",
  "/tienda/",
);

export default function TiendaPage() {
  return (
    <>
      <PageHeader titulo={t.titulo} etiqueta={t.etiqueta} intro={t.intro} />
      <Section tituloId="catalogo-titulo" capa>
        <h2 id="catalogo-titulo" className="sr-only">
          {t.productos}
        </h2>
        <p className="mb-10 flex medida gap-3 rounded-panel bg-cana p-6 text-lg">
          <Icon nombre="corazon" className="mt-1 shrink-0 text-rojo" />
          <span>{textoTienda.apoyo}</span>
        </p>
        <Catalogo productos={productos} />
      </Section>
    </>
  );
}
