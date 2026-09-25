import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";

export default function InicioPage() {
  return (
    <Container className="py-16">
      <h1 className="text-5xl">{site.lema}</h1>
    </Container>
  );
}
