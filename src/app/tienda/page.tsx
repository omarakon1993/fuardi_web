import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Productos hechos por nuestros jóvenes. Cada compra apoya a la fundación.",
};

export default function TiendaPage() {
  return (
    <PageHeader
      titulo="Tienda"
      intro="Productos hechos por nuestros jóvenes. Cada compra apoya a la fundación."
    />
  );
}
