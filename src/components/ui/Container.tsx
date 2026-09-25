import type { ElementType, ReactNode } from "react";
import { cx } from "@/lib/colores";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export function Container({
  children,
  className,
  as: Etiqueta = "div",
}: ContainerProps) {
  return (
    <Etiqueta
      className={cx("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
    >
      {children}
    </Etiqueta>
  );
}
