import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "subtle";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", className, children, ...props }, ref) => {
    const variantStyles = {
      default:
        "bg-white border border-[#E8F2F0] rounded-lg shadow-sm hover:shadow-md transition-shadow",
      elevated:
        "bg-white border border-[#E8F2F0] rounded-lg shadow-lg hover:shadow-xl transition-shadow",
      subtle: "bg-[#E8F2F0]/30 border border-[#E8F2F0] rounded-lg",
    };

    return (
      <div
        ref={ref}
        className={`${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
