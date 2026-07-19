import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import HeaderSection from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Stepper } from "@/components/Stepper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormData } from "@/context/FormDataContext";

const navLinks = [
  { label: "Accueil", href: "/#hero" },
  { label: "Contenu", href: "/#contenu" },
  { label: "Processus", href: "/#processus" },
  { label: "Commander", href: "/#commander" },
];

const essentialFeatures = [
  "Rapport PDF détaillé (8 pages)",
  "Score de compatibilité global",
  "Analyse Connexion émotionnelle",
  "Dynamique de communication",
  "Alchimie physique & énergie",
  "Points forts et points de vigilance",
  "Conseil final personnalisé",
];

const premiumFeatures = [
  "Tout le contenu de l'offre Essentiel",
  "Rapport enrichi (12 pages)",
  "Analyse des cycles de vie (numérologie)",
  "Périodes favorables des 12 prochains mois",
  "3 rituels de couple personnalisés",
  "Message d'intention co-rédigé par l'IA",
];

function StarBullet({ color = "#1A5C52" }: { color?: string }) {
  return (
    <svg
      className="w-3.5 h-3.5 shrink-0 mt-0.5"
      viewBox="0 0 14 14"
      fill={color}
    >
      <path d="M7 0L8.3 5.7L14 7L8.3 8.3L7 14L5.7 8.3L0 7L5.7 5.7L7 0Z" />
    </svg>
  );
}

export function PricingPage() {
  const navigate = useNavigate();
  const { formData, setFormData } = useFormData();

  const handleSelectPlan = (plan: "essentiel" | "premium") => {
    // Save selected plan to context and sessionStorage, then go to confirmation
    const updated = { ...formData, offre: plan };
    setFormData(updated as any);
    sessionStorage.setItem("userFormData", JSON.stringify(updated));
    navigate("/confirm");
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white pt-20">
      <HeaderSection navLinks={navLinks} />
      <Stepper currentStep={2} />

      <main className="flex-1 py-2 sm:py-3 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 w-full">
          <div className="text-center max-w-2xl mx-auto mb-5">
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-[32px] sm:text-[40px] mb-1 text-[#1A5C52] leading-tight"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 700,
              }}
            >
              Choisissez votre formule
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[15px] sm:text-[16px] text-gray-700 max-w-xl mx-auto"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Pour finaliser votre commande et accéder au paiement de votre
              analyse personnalisée, choisissez le niveau de profondeur
              souhaité.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* ── Essentiel ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[12px] border border-[#E8F2F0] p-8 sm:p-10 flex flex-col shadow-sm transition-all hover:shadow-md"
            >
              <p className="duovrai-label text-[11px] mb-2 text-[#1A5C52]/70">
                Formule
              </p>
              <h3
                className="text-[26px] text-[#1A5C52] mb-1"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 700,
                }}
              >
                Essentiel
              </h3>
              <p className="text-[14px] mb-6 text-gray-500">
                L'analyse fondamentale de votre couple
              </p>

              <p className="mb-8">
                <span
                  className="text-[44px] leading-none"
                  style={{
                    fontFamily: "'Montserrat', Arial, sans-serif",
                    fontWeight: 600,
                    color: "#1A5C52",
                  }}
                >
                  9,90
                </span>
                <span
                  className="text-[16px] text-[#B8962E] ml-1"
                  style={{
                    fontFamily: "'Montserrat', Arial, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  EUR
                </span>
              </p>

              <ul className="space-y-4 mb-10 flex-1">
                {essentialFeatures.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[14px]"
                    style={{
                      fontFamily: "'Inter', Calibri, sans-serif",
                      color: "#444",
                    }}
                  >
                    <StarBullet />
                    {item}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleSelectPlan("essentiel")}
                variant="outline"
                size="lg"
                className="w-full border-2 border-[#1A5C52] text-[#1A5C52] hover:bg-[#1A5C52] hover:text-white h-14 text-[15px] font-medium rounded-[8px] transition-all flex items-center justify-center gap-2"
              >
                Choisir la formule Essentiel
              </Button>
            </motion.div>

            {/* ── Premium ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#1A5C52] rounded-[12px] p-8 sm:p-10 flex flex-col relative shadow-lg"
            >
              <div className="absolute top-0 right-6 -translate-y-1/2">
                <span
                  className="bg-[#B8962E] text-white text-[10px] py-1.5 px-3.5 rounded-full shadow-md flex items-center gap-1.5"
                  style={{
                    fontFamily: "'Montserrat', Arial, sans-serif",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 10 10"
                    fill="currentColor"
                  >
                    <path d="M5 0L6 4L10 5L6 6L5 10L4 6L0 5L4 4L5 0Z" />
                  </svg>
                  Le choix le plus populaire
                </span>
              </div>

              <p
                className="text-[11px] mb-2"
                style={{
                  fontFamily: "'Montserrat', Arial, sans-serif",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "#B8962E",
                }}
              >
                Formule
              </p>
              <h3
                className="text-[26px] text-white mb-1"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 700,
                }}
              >
                Premium
              </h3>
              <p
                className="text-[14px] text-white/80 mb-6"
                style={{ fontFamily: "'Inter', Calibri, sans-serif" }}
              >
                L'expérience la plus complète et spirituelle
              </p>

              <p className="mb-8">
                <span
                  className="text-[44px] leading-none text-white"
                  style={{
                    fontFamily: "'Montserrat', Arial, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  19,90
                </span>
                <span
                  className="text-[16px] text-[#B8962E] ml-1"
                  style={{
                    fontFamily: "'Montserrat', Arial, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  EUR
                </span>
              </p>

              <ul className="space-y-4 mb-10 flex-1">
                {premiumFeatures.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[14px] text-white/90"
                    style={{ fontFamily: "'Inter', Calibri, sans-serif" }}
                  >
                    <StarBullet color="#B8962E" />
                    {item}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleSelectPlan("premium")}
                size="lg"
                className="w-full bg-[#B8962E] text-white hover:bg-[#a18225] h-14 text-[15px] font-medium rounded-[8px] shadow-md transition-all border-none flex items-center justify-center gap-2"
              >
                Choisir la formule Premium
              </Button>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
