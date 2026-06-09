import React from "react";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
  children?: React.ReactNode;
}

export function SectionHeader({
  label,
  title,
  description,
  centered = true,
  children,
}: SectionHeaderProps) {
  const containerClass = centered ? "text-center max-w-2xl mx-auto" : "";

  return (
    <div className={`mb-16 sm:mb-24 ${containerClass} animate-fade-in`}>
      {label && (
        <div className="flex items-center justify-center gap-3 mb-6">
          {centered && <div className="h-px w-8 bg-[#B8962E]/50" />}
          <p className="text-xs sm:text-sm uppercase tracking-widest font-semibold text-[#B8962E]">
            {label}
          </p>
          {centered && <div className="h-px w-8 bg-[#B8962E]/50" />}
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A5C52] mb-4 leading-tight">
        {title}
      </h2>

      {description && (
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed mt-6">
          {description}
        </p>
      )}

      {children}
    </div>
  );
}
