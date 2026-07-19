import { motion } from "framer-motion";
import { Check } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Entrez vos prénoms & dates",
    description:
      "Renseignez les informations de base des deux personnes : prénom et date de naissance.",
  },
  {
    number: "02",
    title: "Choisissez votre formule",
    description:
      "Sélectionnez l'offre Essentiel (8 pages) ou Premium (12 pages) selon votre niveau de profondeur souhaité.",
  },
  {
    number: "03",
    title: "Paiement sécurisé",
    description:
      "Réglez en toute sécurité via Stripe. Aucun abonnement, aucune carte enregistrée.",
  },
  {
    number: "04",
    title: "Rapport livré instantanément",
    description:
      "Notre IA génère votre analyse personnalisée et vous l'envoie par e-mail en quelques minutes.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="processus"
      className="relative py-24 sm:py-32 bg-[#F9F3E3] overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute top-0 right-[-10%] w-[50%] h-[60%] bg-[#B8962E] mix-blend-multiply filter blur-[200px] opacity-[0.05] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="duovrai-label text-[12px] mb-4"
          >
            Processus
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-[36px] sm:text-[44px] mb-4 leading-[1.2]"
          >
            Comment ça marche ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[15px] sm:text-[16px] text-[#555555]"
          >
            Un processus simple et transparent, du formulaire à la réception de
            votre rapport.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.6, ease: "easeOut" }}
              className="group relative bg-white rounded-[24px] border border-[#E8F2F0] p-6 shadow-[0_8px_30px_-16px_rgba(26,92,82,0.2)] hover:shadow-[0_16px_40px_-20px_rgba(26,92,82,0.3)] transition-all duration-500 hover:-translate-y-1"
            >
              {/* Connector line (all except last) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-6 h-px bg-[#B8962E]/30 z-10 -translate-y-px" />
              )}

              {/* Number Badge */}
              <div className="w-10 h-10 rounded-full bg-[#1A5C52]/10 flex items-center justify-center mb-5">
                <span
                  className="text-[13px] font-bold text-[#1A5C52]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {step.number}
                </span>
              </div>

              <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-3 leading-snug">
                {step.title}
              </h3>
              <p className="text-[13px] text-[#555555] leading-relaxed">
                {step.description}
              </p>

              {/* Completed check (decorative) */}
              <div className="mt-5 flex items-center gap-2 text-[11px] text-[#1A5C52]/60 font-medium uppercase tracking-wider">
                <Check size={12} className="text-[#B8962E]" />
                Étape {index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
