import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Nuestra historia, misión, objetivos y equipo.",
};

export default function NosotrosPage() {
  return (
    <PageHeader
      titulo="Nosotros"
      intro="Nuestra historia, misión, objetivos y equipo."
    />
  );
}
