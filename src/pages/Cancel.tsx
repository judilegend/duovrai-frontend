import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function Cancel() {
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
            <div className="flex justify-center mb-6">
              <div className="bg-red-50 p-4 rounded-full text-red-500 border border-red-100">
                <AlertCircle className="w-10 h-10" />
              </div>
            </div>

            <span className="text-[10px] tracking-widest text-[#B8962E] font-bold uppercase mb-2 block">
              Paiement Annulé
            </span>
            
            <h2
              className="text-[32px] text-[#1A5C52] leading-tight mb-4"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 700,
              }}
            >
              Transaction non finalisée
            </h2>

            <p className="text-[15px] text-gray-600 leading-relaxed mb-8 max-w-md mx-auto">
              Vous avez annulé la procédure de paiement ou celle-ci n'a pas pu aboutir. Aucun montant ne vous a été débité.
            </p>

            <div className="space-y-4">
              <Button
                onClick={() => navigate("/pricing-page")}
                className="w-full bg-[#1A5C52] text-white hover:bg-[#1A5C52]/90 h-12 text-[14px] font-medium rounded-[6px] shadow-sm transition-all"
              >
                Retourner aux formules de prix
              </Button>
              
              <button
                onClick={() => navigate("/")}
                className="flex items-center justify-center gap-x-2 text-xs text-[#1A5C52]/70 font-semibold hover:text-[#1A5C52] transition-colors w-full cursor-pointer"
              >
                <ArrowLeft size={14} />
                Retourner à l'accueil
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
