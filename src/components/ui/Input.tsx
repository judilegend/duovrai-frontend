import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  touched?: boolean;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, touched, icon, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full px-4 py-2.5 rounded-lg border transition-all duration-200 outline-none focus:ring-2 focus:ring-[#1A5C52]/20 text-base ${
              icon ? "pl-10" : ""
            } ${
              error && touched
                ? "border-red-400 bg-red-50"
                : "border-[#E8F2F0] bg-white focus:border-[#1A5C52]"
            } ${className}`}
            {...props}
          />
        </div>
        {error && touched && (
          <p className="text-red-500 text-xs mt-1.5">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
