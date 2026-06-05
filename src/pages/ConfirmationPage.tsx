import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../context/FormDataContext";
import { useStripeCheckout } from "../hooks/useStripeCheckout";
import { Button } from "../components/ui/button";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function ConfirmationPage() {
  const navigate = useNavigate();
  const { formData, setFormData } = useFormData();
  const { loadingPlan, error, handleSelectPlan } = useStripeCheckout();
  const [localData, setLocalData] = useState(
    formData || {
      prenom1: "",
      date1: "",
      prenom2: "",
      date2: "",
      email: "",
      offre: "essentiel" as const,
    }
  );

  // If formData is missing, redirect to the entry form
  if (!formData) {
    navigate("/");
    return null;
  }

  const handleChange = (field: keyof typeof localData, value: any) => {
    setLocalData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveEdits = () => {
    // Save edited data back to context + sessionStorage
    setFormData(localData);
    sessionStorage.setItem("userFormData", JSON.stringify(localData));
  };

  const handleProceed = () => {
    // Save any edits, then trigger Stripe checkout
    setFormData(localData);
    sessionStorage.setItem("userFormData", JSON.stringify(localData));
    handleSelectPlan(localData.offre);
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen flex flex-col items-center justify-center bg-[#F5FAF9] py-12">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-[#1A5C52] mb-6 text-center">
            Confirmation des informations
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm text-center">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 mb-6">
            {/* Prénom 1 */}
            <div className="flex justify-between items-center">
              <span className="font-medium text-[#555555]">Prénom 1 :</span>
              <input
                className="border-b border-gray-300 focus:outline-none flex-1 ml-2"
                value={localData.prenom1}
                onChange={(e) => handleChange("prenom1", e.target.value)}
              />
            </div>
            {/* Date de naissance 1 */}
            <div className="flex justify-between items-center">
              <span className="font-medium text-[#555555]">
                Date de naissance 1 :
              </span>
              <input
                type="date"
                className="border-b border-gray-300 focus:outline-none flex-1 ml-2"
                value={localData.date1}
                onChange={(e) => handleChange("date1", e.target.value)}
              />
            </div>
            {/* Prénom 2 */}
            <div className="flex justify-between items-center">
              <span className="font-medium text-[#555555]">Prénom 2 :</span>
              <input
                className="border-b border-gray-300 focus:outline-none flex-1 ml-2"
                value={localData.prenom2}
                onChange={(e) => handleChange("prenom2", e.target.value)}
              />
            </div>
            {/* Date de naissance 2 */}
            <div className="flex justify-between items-center">
              <span className="font-medium text-[#555555]">
                Date de naissance 2 :
              </span>
              <input
                type="date"
                className="border-b border-gray-300 focus:outline-none flex-1 ml-2"
                value={localData.date2}
                onChange={(e) => handleChange("date2", e.target.value)}
              />
            </div>
            {/* Email */}
            <div className="flex justify-between items-center">
              <span className="font-medium text-[#555555]">E‑mail :</span>
              <input
                type="email"
                className="border-b border-gray-300 focus:outline-none flex-1 ml-2"
                value={localData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            {/* Offre */}
            <div className="flex justify-between items-center">
              <span className="font-medium text-[#555555]">
                Offre choisie :
              </span>
              <select
                className="border-b border-gray-300 focus:outline-none flex-1 ml-2"
                value={localData.offre}
                onChange={(e) =>
                  handleChange("offre", e.target.value as any)
                }
              >
                <option value="essentiel">Essentiel — 9,90€</option>
                <option value="premium">Premium — 19,90€</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              variant="outline"
              onClick={handleSaveEdits}
              className="flex items-center gap-2 border-[#1A5C52] text-[#1A5C52] hover:bg-[#E8F2F0]"
            >
              <ArrowLeft className="w-4 h-4" /> Sauvegarder
            </Button>
            <Button
              onClick={handleProceed}
              disabled={!!loadingPlan}
              className="bg-[#1A5C52] text-white hover:bg-[#1A5C52]/90 flex items-center gap-2"
            >
              {loadingPlan ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Redirection...
                </>
              ) : (
                <>
                  Confirmer &amp; Payer
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ConfirmationPage;
