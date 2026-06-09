import { Input } from "./Input";

interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  error?: string;
  touched?: boolean;
  onChange: (value: string) => void;
  onBlur?: () => void;
  required?: boolean;
}

export function FormField({
  label,
  type = "text",
  placeholder,
  value,
  error,
  touched,
  onChange,
  onBlur,
  required,
}: FormFieldProps) {
  return (
    <div className="w-full">
      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        error={error}
        touched={touched}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className="w-full"
      />
    </div>
  );
}
