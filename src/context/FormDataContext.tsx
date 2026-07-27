import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface FormData {
  prenom1: string;
  date1: string;
  prenom2: string;
  date2: string;
  email: string;
  offre: "essentiel" | "premium";
}

interface FormDataContextProps {
  formData: FormData | null;
  setFormData: (data: FormData) => void;
}

const FormDataContext = createContext<FormDataContextProps | undefined>(
  undefined,
);

const parseStoredFormData = (): FormData | null => {
  if (typeof window === "undefined") return null;
  const stored = sessionStorage.getItem("userFormData");
  if (!stored) return null;

  try {
    return JSON.parse(stored) as FormData;
  } catch {
    return null;
  }
};

export const FormDataProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormDataState] = useState<FormData | null>(parseStoredFormData);

  const setFormData = (data: FormData) => {
    setFormDataState(data);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("userFormData", JSON.stringify(data));
    }
  };

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error("useFormData must be used within a FormDataProvider");
  }
  return context;
};
