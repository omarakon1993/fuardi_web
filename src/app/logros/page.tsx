import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Logros",
  description: "Reconocimientos y participaciones de nuestro grupo desde 2016.",
};

export default function LogrosPage() {
  return (
    <PageHeader
      titulo="Logros"
      intro="Reconocimientos y participaciones de nuestro grupo desde 2016."
    />
  );
}
