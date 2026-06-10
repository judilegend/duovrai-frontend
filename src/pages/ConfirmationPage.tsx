import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../context/FormDataContext";
import { useStripeCheckout } from "../hooks/useStripeCheckout";
import { Button } from "../components/ui/button";
import { ArrowLeft, ArrowRight, Loader2, Check, Edit2 } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Stepper } from "../components/Stepper";

export function ConfirmationPage() {
  const navigate = useNavigate();
  const { formData, setFormData } = useFormData();
  const { loadingPlan, error, handleSelectPlan } = useStripeCheckout();
  const [isEditing, setIsEditing] = useState(false);
  const [localData, setLocalData] = useState(
    formData || {
      prenom1: "",
      date1: "",
      prenom2: "",
      date2: "",
      email: "",
      offre: "essentiel" as const,
    },
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
    setIsEditing(false);
  };

  const handleProceed = () => {
    // Save any edits, then trigger Stripe checkout
    setFormData(localData);
    sessionStorage.setItem("userFormData", JSON.stringify(localData));
    handleSelectPlan(localData.offre);
  };

  const getPriceDisplay = () => {
    return localData.offre === "premium" ? "19,90€" : "9,90€";
  };

  // const getOfferName = () => {
  //   return localData.offre === "premium" ? "Premium" : "Essentiel";
  // };

  return (
    <>
      <Navbar />
      <Stepper currentStep={3} />
      <section className="min-h-screen flex flex-col bg-gradient-to-br from-[#F5FAF9] to-[#E8F2F0] px-4 py-4 sm:px-6 sm:py-6">
        <div className="flex-1 flex items-center justify-center w-full">
          <div className="w-full max-w-2xl">
            {/* Main Card - Minimal */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
              {/* Header with Edit Button */}
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-gray-100">
                <h2 className="text-lg sm:text-xl font-semibold text-[#1A5C52]">
                  {isEditing ? "Modifier" : "Recapitulatif"}
                </h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs sm:text-sm font-medium text-[#1A5C52] bg-[#1A5C52]/5 hover:bg-[#1A5C52]/10 rounded transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                    Modifier
                  </button>
                )}
              </div>

              {/* Info Fields */}
              <div className="p-5 sm:p-6">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                  {/* Prénom 1 */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Prenom 1
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-[#1A5C52]"
                        value={localData.prenom1}
                        onChange={(e) =>
                          handleChange("prenom1", e.target.value)
                        }
                      />
                    ) : (
                      <p className="text-sm font-medium text-gray-800">
                        {localData.prenom1 || "-"}
                      </p>
                    )}
                  </div>

                  {/* Date 1 */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Date naissance 1
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-[#1A5C52]"
                        value={localData.date1}
                        onChange={(e) => handleChange("date1", e.target.value)}
                      />
                    ) : (
                      <p className="text-sm font-medium text-gray-800">
                        {localData.date1
                          ? new Date(localData.date1).toLocaleDateString(
                              "fr-FR",
                            )
                          : "-"}
                      </p>
                    )}
                  </div>

                  {/* Prénom 2 */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Prenom 2
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-[#1A5C52]"
                        value={localData.prenom2}
                        onChange={(e) =>
                          handleChange("prenom2", e.target.value)
                        }
                      />
                    ) : (
                      <p className="text-sm font-medium text-gray-800">
                        {localData.prenom2 || "-"}
                      </p>
                    )}
                  </div>

                  {/* Date 2 */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Date naissance 2
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-[#1A5C52]"
                        value={localData.date2}
                        onChange={(e) => handleChange("date2", e.target.value)}
                      />
                    ) : (
                      <p className="text-sm font-medium text-gray-800">
                        {localData.date2
                          ? new Date(localData.date2).toLocaleDateString(
                              "fr-FR",
                            )
                          : "-"}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-[#1A5C52]"
                      value={localData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  ) : (
                    <p className="text-sm font-medium text-gray-800">
                      {localData.email || "-"}
                    </p>
                  )}
                </div>

                {/* Offer Selection */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Offre
                  </label>
                  <div className="flex gap-2">
                    {["essentiel", "premium"].map((offer) => (
                      <button
                        key={offer}
                        onClick={() => {
                          if (isEditing) handleChange("offre", offer as any);
                        }}
                        className={`flex-1 px-3 py-2 text-xs sm:text-sm font-medium rounded transition-all ${
                          localData.offre === offer
                            ? "bg-[#1A5C52] text-white"
                            : isEditing
                              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              : "bg-gray-50 text-gray-500"
                        }`}
                      >
                        {offer === "premium"
                          ? "Premium 19,90€"
                          : "Essentiel 9,90€"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-400 rounded text-red-800 text-xs sm:text-sm">
                Erreur: {error}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2">
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 border border-[#1A5C52] text-[#1A5C52] hover:bg-[#E8F2F0] py-2 text-sm font-medium"
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={handleSaveEdits}
                    className="flex-1 bg-[#1A5C52] text-white hover:bg-[#164D45] py-2 text-sm font-semibold"
                  >
                    Valider
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/generation")}
                    className="flex-1 border border-[#1A5C52] text-[#1A5C52] hover:bg-[#E8F2F0] py-2 text-sm font-medium"
                  >
                    Retour
                  </Button>
                  <Button
                    onClick={handleProceed}
                    disabled={!!loadingPlan}
                    className="flex-1 bg-[#1A5C52] text-white hover:bg-[#164D45] disabled:opacity-60 py-2 text-sm font-semibold"
                  >
                    {loadingPlan ? "Redirection..." : "Payer"}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ConfirmationPage;
