import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Presentaciones",
  description:
    "Nuestro grupo en tarima: festivales, encuentros y salidas por Colombia.",
};

export default function PresentacionesPage() {
  return (
    <PageHeader
      titulo="Presentaciones"
      intro="Nuestro grupo en tarima: festivales, encuentros y salidas por Colombia."
    />
  );
}
