import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Apóyanos",
  description:
    "Dona, sé voluntario, contrata una presentación o haz una alianza con nosotros.",
};

export default function ApoyanosPage() {
  return (
    <PageHeader
      titulo="Apóyanos"
      intro="Dona, sé voluntario, contrata una presentación o haz una alianza con nosotros."
    />
  );
}
