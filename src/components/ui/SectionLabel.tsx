import type { ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <p
      className={`inline-flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-[#B8962E] ${className}`}
    >
      <span className="h-px w-6 bg-[#B8962E]/70" />
      {children}
      <span className="h-px w-6 bg-[#B8962E]/70" />
    </p>
  );
}
