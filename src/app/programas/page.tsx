import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Programas",
  description:
    "Formación académica, música tradicional, danza, canto y emprendimientos.",
};

export default function ProgramasPage() {
  return (
    <PageHeader
      titulo="Programas"
      intro="Formación académica, música tradicional, danza, canto y emprendimientos."
    />
  );
}
