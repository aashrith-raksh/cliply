import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export default function Section({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mt-6 rounded-xl flex-1 flex flex-col", className)}>
      {children}
    </section>
  );
}
