import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Política de tratamiento de datos",
  description: "Cómo cuidamos los datos personales que nos compartes.",
};

export default function PoliticaDeDatosPage() {
  return (
    <PageHeader
      titulo="Política de tratamiento de datos"
      intro="Cómo cuidamos los datos personales que nos compartes."
    />
  );
}
