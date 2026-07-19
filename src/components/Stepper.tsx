import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface StepperProps {
  currentStep: number; // 1=Formulaire, 2=Formule, 3=Confirmation, 4=Paiement, 5=Génération
}

const steps = [
  { label: "Saisie", shortLabel: "Saisie" },
  { label: "Formule", shortLabel: "Formule" },
  { label: "Confirmation", shortLabel: "Confirmer" },
  { label: "Paiement", shortLabel: "Payer" },
  { label: "Rapport", shortLabel: "Rapport" },
];

export function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="w-full bg-white border-b border-[#E8F2F0]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isActive = stepNumber === currentStep;
            const isLast = index === steps.length - 1;

            return (
              <div key={step.label} className="flex items-center flex-1 last:flex-none">
                {/* Step indicator */}
                <div className="flex flex-col items-center relative">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                    className="relative flex items-center justify-center rounded-full"
                    style={{
                      width: 32,
                      height: 32,
                      backgroundColor: isCompleted
                        ? "#1A5C52"
                        : isActive
                          ? "#B8962E"
                          : "transparent",
                      border: isCompleted || isActive
                        ? "none"
                        : "1.5px solid #D1D5DB",
                    }}
                  >
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 320, delay: 0.08 }}
                      >
                        <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
                      </motion.div>
                    ) : (
                      <span
                        className="text-[12px] font-semibold"
                        style={{
                          color: isActive ? "#fff" : "#9CA3AF",
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        {stepNumber}
                      </span>
                    )}

                    {/* Active pulsing ring */}
                    {isActive && (
                      <motion.div
                        animate={{ scale: [1, 1.55, 1], opacity: [0.35, 0, 0.35] }}
                        transition={{ repeat: Infinity, duration: 2.2 }}
                        className="absolute inset-0 rounded-full"
                        style={{ border: "2px solid #B8962E" }}
                      />
                    )}
                  </motion.div>

                  {/* Label */}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.08 + 0.2 }}
                    className="mt-1.5 text-center text-[10px] leading-tight hidden sm:block"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: isActive ? 600 : isCompleted ? 500 : 400,
                      color: isCompleted ? "#1A5C52" : isActive ? "#B8962E" : "#9CA3AF",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {step.label}
                  </motion.span>
                </div>

                {/* Connector */}
                {!isLast && (
                  <div className="flex-1 mx-2 h-[2px] bg-[#E5E7EB] relative overflow-hidden" style={{ minWidth: 12 }}>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isCompleted ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="absolute inset-0 origin-left"
                      style={{ backgroundColor: "#1A5C52" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Stepper;
