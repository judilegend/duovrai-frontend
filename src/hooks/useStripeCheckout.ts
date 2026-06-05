import { useState } from "react";
import { useNavigate } from "react-router-dom";

export type PlanType = "essentiel" | "premium";

export function useStripeCheckout() {
  const navigate = useNavigate();
  const [loadingPlan, setLoadingPlan] = useState<PlanType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelectPlan = async (plan: PlanType) => {
    setError(null);
    const stored = sessionStorage.getItem("userFormData");
    
    if (!stored) {
      setError("Veuillez d'abord remplir le formulaire de compatibilité amoureuse sur la page d'accueil.");
      setTimeout(() => {
        navigate("/");
      }, 3000);
      return;
    }

    const formData = JSON.parse(stored);
    setLoadingPlan(plan);

    const payload = {
      email: formData.email,
      partner1_name: formData.prenom1,
      partner1_birthdate: formData.date1,
      partner2_name: formData.prenom2,
      partner2_birthdate: formData.date2,
      plan_type: plan.toUpperCase(),
    };

    try {
      // API call to backend checkout initiation
      const response = await fetch("http://localhost:8000/api/v1/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Erreur lors de la communication avec le serveur.");
      }

      const data = await response.json();
      if (data.checkout_url) {
        sessionStorage.removeItem("userFormData");
        // Instant redirection to Stripe
        window.location.href = data.checkout_url;
      } else {
        throw new Error("URL de paiement Stripe non reçue.");
      }
    } catch (err: any) {
      console.error("Stripe checkout initiation failed:", err);
      // Give a highly specific, clean message about configuration/mock mode
      let msg = err.message || "Une erreur est survenue lors de l'initialisation du paiement.";
      if (msg.includes("No such price")) {
        msg = `Erreur Stripe : L'identifiant de prix (Price ID) n'existe pas sur votre compte Stripe. Veuillez vérifier vos identifiants STRIPE_PRICE_ESSENTIEL et STRIPE_PRICE_PREMIUM dans le fichier .env ou utiliser le mode Stripe MOCK en configurant STRIPE_SECRET_KEY=sk_test_mock_123.`;
      }
      setError(msg);
      setLoadingPlan(null);
    }
  };

  return {
    loadingPlan,
    error,
    handleSelectPlan,
  };
}
