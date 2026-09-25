import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbenos para inscripciones, aportes, presentaciones o alianzas.",
};

export default function ContactoPage() {
  return (
    <PageHeader
      titulo="Contacto"
      intro="Escríbenos para inscripciones, aportes, presentaciones o alianzas."
    />
  );
}
