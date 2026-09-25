import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Agenda",
  description: "Próximas presentaciones y actividades de la fundación.",
};

export default function AgendaPage() {
  return (
    <PageHeader
      titulo="Agenda"
      intro="Próximas presentaciones y actividades de la fundación."
    />
  );
}
