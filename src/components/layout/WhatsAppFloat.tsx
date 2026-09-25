import { mensajesWhatsApp } from "@/data/site";
import { enlaceWhatsApp } from "@/lib/whatsapp";
import { Icon } from "@/components/ui/Icon";

export function WhatsAppFloat() {
  return (
    <a
      href={enlaceWhatsApp(mensajesWhatsApp.general)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-4 z-40 inline-flex min-h-14 min-w-14 items-center justify-center gap-2 rounded-full border-2 border-blanco bg-verde px-4 font-bold text-blanco no-underline shadow-lg hover:bg-tinta sm:right-6 sm:bottom-6"
    >
      <Icon nombre="whatsapp" tamano={28} />
      <span className="sr-only sm:not-sr-only">Escríbenos</span>
      <span className="sr-only">
        {" "}
        por WhatsApp (se abre en una pestaña nueva)
      </span>
    </a>
  );
}
