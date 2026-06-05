import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Mail, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F3E3]">
      <Navbar />

      <main className="flex-1 py-16 sm:py-24 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 max-w-xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[12px] border border-[#E8F2F0] p-8 sm:p-12 shadow-sm"
          >
            {/* Success Icon Animation */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                  className="bg-[#1A5C52] p-4 rounded-full text-white"
                >
                  <Check className="w-10 h-10" strokeWidth={3} />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="absolute inset-0 border-2 border-[#1A5C52] rounded-full"
                />
              </div>
            </div>

            <span className="text-[10px] tracking-widest text-[#B8962E] font-bold uppercase mb-2 block">
              Paiement Réussi
            </span>
            
            <h2
              className="text-[32px] sm:text-[36px] text-[#1A5C52] leading-tight mb-4"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 700,
              }}
            >
              Merci pour votre commande
            </h2>

            <p className="text-[15px] text-gray-600 leading-relaxed mb-8 max-w-md mx-auto">
              Votre paiement a été validé avec succès. Notre intelligence artificielle s'occupe de générer votre portrait et analyse de compatibilité amoureuse premium.
            </p>

            <div className="rounded-[6px] border border-[#E8F2F0] bg-[#E8F2F0]/20 p-6 mb-8 text-left flex items-start gap-4">
              <Mail className="w-6 h-6 text-[#B8962E] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-[#1A5C52] mb-1">
                  Vérifiez votre boîte mail
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Votre rapport PDF personnalisé de 8 à 12 pages vous a été envoyé par e-mail. 
                  L'envoi prend généralement entre 1 et 3 minutes. Pensez également à vérifier votre dossier de courrier indésirable (spams).
                </p>
              </div>
            </div>

            <Button
              onClick={() => navigate("/")}
              className="w-full bg-[#1A5C52] text-white hover:bg-[#1A5C52]/90 h-12 text-[14px] font-medium rounded-[6px] shadow-sm transition-all flex items-center justify-center gap-2 group"
            >
              Retourner à l'accueil
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
