import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, Lock, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

interface UserFormData {
  prenom1: string;
  date1: string;
  prenom2: string;
  date2: string;
  email: string;
  offre: "essentiel" | "premium";
}

export function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState<UserFormData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Retrieve plan from navigation state or default to essential
  const selectedPlan: "essentiel" | "premium" =
    location.state?.plan || "essentiel";

  const price = selectedPlan === "premium" ? 19.90 : 9.90;

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    // Retrieve form data from sessionStorage
    const stored = sessionStorage.getItem("userFormData");
    if (!stored) {
      // If no birth info exists, user needs to fill out the form first
      navigate("/", { replace: true });
    } else {
      setFormData(JSON.parse(stored));
    }
  }, [navigate]);

  const handlePayment = async () => {
    if (!formData) return;
    setLoading(true);
    setError(null);

    const payload = {
      email: formData.email,
      partner1_name: formData.prenom1,
      partner1_birthdate: formData.date1,
      partner2_name: formData.prenom2,
      partner2_birthdate: formData.date2,
      plan_type: selectedPlan.toUpperCase(), // Backend expects uppercase enum
    };

    try {
      const response = await fetch("http://localhost:8000/api/v1/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Erreur de communication avec le serveur.");
      }

      const data = await response.json();
      if (data.checkout_url) {
        // Clear session storage since we are proceeding to checkout
        sessionStorage.removeItem("userFormData");
        // Redirect to Stripe checkout (mock or real)
        window.location.href = data.checkout_url;
      } else {
        throw new Error("URL de paiement non reçue.");
      }
    } catch (err: any) {
      console.error("Payment initiation failed:", err);
      setError(err.message || "Une erreur est survenue lors de l'initialisation du paiement.");
    } finally {
      setLoading(false);
    }
  };

  if (!formData) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F3E3]">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-x-2 text-sm text-[#1A5C52]/70 font-medium hover:text-[#1A5C52] transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft size={16} />
            Retour aux offres
          </button>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[12px] border border-[#E8F2F0] p-8 sm:p-10 shadow-sm"
          >
            <div className="text-center mb-8 border-b border-[#E8F2F0] pb-6">
              <span className="text-[10px] tracking-widest text-[#B8962E] font-bold uppercase mb-2 block">
                Paiement Sécurisé
              </span>
              <h2
                className="text-[32px] text-[#1A5C52] leading-tight mb-2"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 700,
                }}
              >
                Finalisez votre commande
              </h2>
              <p className="text-[14px] text-gray-500">
                Veuillez vérifier vos informations avant de procéder au paiement.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-[6px] text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-wider text-[#1A5C52] font-semibold mb-4">
                  Informations de l'analyse
                </h3>
                <div className="space-y-3 bg-[#E8F2F0]/20 rounded-[6px] p-4 border border-[#E8F2F0]/50">
                  <div className="flex justify-between py-2 border-b border-[#E8F2F0]/40 text-sm">
                    <span className="text-gray-500">Partenaire 1</span>
                    <span className="font-semibold text-[#1A5C52]">
                      {formData.prenom1} ({new Date(formData.date1).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })})
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E8F2F0]/40 text-sm">
                    <span className="text-gray-500">Partenaire 2</span>
                    <span className="font-semibold text-[#1A5C52]">
                      {formData.prenom2} ({new Date(formData.date2).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })})
                    </span>
                  </div>
                  <div className="flex justify-between py-2 text-sm">
                    <span className="text-gray-500">Destinataire (Email)</span>
                    <span className="font-semibold text-[#1A5C52]">{formData.email}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-wider text-[#1A5C52] font-semibold mb-4">
                  Formule sélectionnée
                </h3>
                <div className="flex items-center justify-between p-4 border border-[#E8F2F0] rounded-[6px]">
                  <div>
                    <h4 className="font-bold text-[#1A5C52] capitalize">
                      Formule {selectedPlan}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {selectedPlan === "premium"
                        ? "Analyse amoureuse approfondie 12 pages, cycles de vie et rituels"
                        : "Rapport de compatibilité fondamental 8 pages"}
                    </p>
                  </div>
                  <span className="font-semibold text-lg text-[#1A5C52]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {price.toFixed(2)} €
                  </span>
                </div>
              </div>

              <div className="border-t border-[#E8F2F0] pt-6 flex justify-between items-center">
                <span className="font-bold text-[#1A5C52]">Total à payer</span>
                <span className="font-bold text-2xl text-[#B8962E]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {price.toFixed(2)} €
                </span>
              </div>

              <Button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-[#1A5C52] text-white hover:bg-[#1A5C52]/90 h-14 text-[15px] font-medium rounded-[6px] shadow-md transition-all flex items-center justify-center gap-2 mt-8"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Traitement en cours...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Payer {price.toFixed(2)} €
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-gray-500 mt-4">
                Paiement 100% sécurisé via Stripe. Facturation unique sans engagement.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
