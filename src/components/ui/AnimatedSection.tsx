import React, { useEffect, useRef, useState } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeIn" | "slideUp" | "slideDown" | "scaleIn" | "none";
  delay?: number;
}

export function AnimatedSection({
  children,
  className = "",
  animation = "fadeIn",
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const animationClasses = {
    fadeIn: isVisible ? "animate-fade-in" : "opacity-0",
    slideUp: isVisible ? "animate-slide-up" : "opacity-0 translate-y-6",
    slideDown: isVisible ? "animate-slide-down" : "opacity-0 -translate-y-6",
    scaleIn: isVisible ? "animate-scale-in" : "opacity-0 scale-95",
    none: "",
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${animationClasses[animation]} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
