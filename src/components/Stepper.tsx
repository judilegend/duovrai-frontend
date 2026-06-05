import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface StepperProps {
  currentStep: number; // 1-indexed: 1=Formulaire, 2=Formule, 3=Confirmation, 4=Paiement, 5=Génération
}

const steps = [
  { label: "Formulaire", shortLabel: "Saisie" },
  { label: "Choix formule", shortLabel: "Formule" },
  { label: "Confirmation", shortLabel: "Confirmer" },
  { label: "Paiement", shortLabel: "Payer" },
  { label: "Génération", shortLabel: "Rapport" },
];

export function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;
          const isPending = stepNumber > currentStep;

          return (
            <div key={step.label} className="flex flex-col items-center relative z-10 flex-1">
              {/* Connector line (before this step) */}
              {index > 0 && (
                <div
                  className="absolute top-[18px] right-1/2 h-[3px] w-full -z-10"
                  style={{ transform: "translateX(-0%)" }}
                >
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isCompleted || isActive ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full origin-left"
                    style={{
                      backgroundColor: isCompleted || isActive ? "#1A5C52" : "#D1D5DB",
                    }}
                  />
                  {/* Background line */}
                  <div
                    className="absolute inset-0 -z-10"
                    style={{ backgroundColor: "#E5E7EB" }}
                  />
                </div>
              )}

              {/* Circle */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                className="relative flex items-center justify-center rounded-full transition-all duration-300"
                style={{
                  width: 36,
                  height: 36,
                  backgroundColor: isCompleted
                    ? "#1A5C52"
                    : isActive
                    ? "#B8962E"
                    : "#E5E7EB",
                  boxShadow: isActive
                    ? "0 0 0 4px rgba(184, 150, 46, 0.25)"
                    : isCompleted
                    ? "0 0 0 4px rgba(26, 92, 82, 0.15)"
                    : "none",
                }}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                  >
                    <Check className="w-5 h-5 text-white" strokeWidth={3} />
                  </motion.div>
                ) : (
                  <span
                    className="text-sm font-semibold"
                    style={{
                      color: isActive ? "#FFFFFF" : "#9CA3AF",
                      fontFamily: "'Montserrat', Arial, sans-serif",
                    }}
                  >
                    {stepNumber}
                  </span>
                )}

                {/* Active pulse ring */}
                {isActive && (
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.4, 0, 0.4],
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 rounded-full border-2 border-[#B8962E]"
                  />
                )}
              </motion.div>

              {/* Label */}
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="mt-2 text-center leading-tight"
                style={{
                  fontSize: "11px",
                  fontFamily: "'Inter', Calibri, sans-serif",
                  fontWeight: isActive ? 600 : isCompleted ? 500 : 400,
                  color: isCompleted
                    ? "#1A5C52"
                    : isActive
                    ? "#B8962E"
                    : "#9CA3AF",
                }}
              >
                {/* Show short label on small screens */}
                <span className="hidden sm:inline">{step.label}</span>
                <span className="sm:hidden">{step.shortLabel}</span>
              </motion.span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Stepper;
