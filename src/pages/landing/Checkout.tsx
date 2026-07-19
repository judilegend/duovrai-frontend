import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedPlan = location.state?.plan || "essentiel";
  const formData = location.state?.formData || null;
  const isPremium = selectedPlan === "premium";

  const planName = isPremium ? "Premium" : "Essentiel";
  const planPrice = isPremium ? 19.9 : 9.9;
  const planPriceLabel = planPrice.toFixed(2).replace(".", ",");

  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    void startCheckout();
  }, []);

  const startCheckout = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/stripe/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData?.email || "",
          partner1_name: formData?.prenom1 || "",
          partner1_birthdate: formData?.date1 || "",
          partner2_name: formData?.prenom2 || "",
          partner2_birthdate: formData?.date2 || "",
          plan_type: isPremium ? "PREMIUM" : "ESSENTIEL",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.detail || "Impossible de lancer le paiement Stripe.",
        );
      }

      if (data?.checkout_url) {
        window.location.assign(data.checkout_url);
        return;
      }

      throw new Error("La réponse Stripe ne contient pas d'URL de paiement.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      setIsProcessing(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#F9F3E3] flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a1 1 0 00.86 1.5h17.64a1 1 0 00.86-1.5L13.71 3.86a1 1 0 00-1.72 0z"
              />
            </svg>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-bold text-[#1A5C52] mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Paiement impossible
          </h2>
          <p
            className="text-gray-600 mb-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Une erreur est survenue au démarrage du paiement Stripe. Vous pouvez
            réessayer ou revenir à la sélection de formule.
          </p>
          <button
            onClick={() => navigate("/pricing-page")}
            className="w-full bg-[#1A5C52] text-white py-3 rounded-lg font-medium hover:bg-[#14473e] transition-colors"
          >
            Revenir à la sélection
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans">
      {/* Left side: Order Summary */}
      <div className="md:w-1/2 bg-[#F9F3E3] p-8 md:p-12 lg:p-20 flex flex-col justify-between border-r border-[#E8F2F0]">
        <div>
          <Link
            to="/"
            className="inline-flex items-center text-[#1A5C52] hover:underline mb-12"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Retour
          </Link>

          <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">
            Ton Cosmos • DuoVrai
          </p>
          <h1
            className="text-3xl sm:text-4xl text-[#1A5C52] mb-8"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
            }}
          >
            Analyse de Compatibilité
          </h1>

          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  Formule {planName}
                </h3>
                <p className="text-gray-500 text-sm mt-1">Paiement unique</p>
              </div>
              <div className="text-xl font-medium text-gray-900">
                {planPriceLabel} €
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center text-xl">
            <span className="font-semibold text-gray-900">Total à payer</span>
            <span className="font-bold text-gray-900">{planPriceLabel} €</span>
          </div>
        </div>
      </div>

      {/* Right side: Payment Form */}
      <div className="md:w-1/2 p-8 md:p-12 lg:p-20 bg-white">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-medium mb-6 text-gray-900">
            Paiement sécurisé
          </h2>

          <div className="rounded-2xl border border-[#E8F2F0] bg-[#F9F3E3]/60 p-6 space-y-4">
            <p className="text-sm text-gray-600">
              Vous allez être redirigé vers Stripe Checkout pour valider votre
              paiement en toute sécurité.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <svg
                className="w-4 h-4 text-[#1A5C52]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Paiement hébergé par Stripe — aucune saisie de carte dans
              l’application.
            </div>
            <button
              type="button"
              onClick={() => void startCheckout()}
              disabled={isProcessing}
              className="w-full bg-[#1A5C52] text-white py-4 rounded-lg font-medium text-lg hover:bg-[#14473e] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Lancement du paiement...
                </>
              ) : (
                `Payer ${planPriceLabel} € avec Stripe`
              )}
            </button>
          </div>

          {error ? <p className="text-sm text-red-600 mt-4">{error}</p> : null}

          <p className="text-xs text-gray-400 text-center mt-6">
            En mode test, Stripe renverra un tunnel de paiement mock si la clé
            secrète de test n’est pas encore configurée.
          </p>
        </div>
      </div>
    </div>
  );
}
