import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useFormData } from "@/context/FormDataContext";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import { Edit2, Lock, ArrowLeft, Loader2, ShieldCheck, AlertTriangle } from "lucide-react";
import HeaderSection from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Stepper } from "@/components/Stepper";
import ScrollToTop from "@/components/ScrollToTop";

const navLinks = [
  { label: "Accueil", href: "/#hero" },
  { label: "Contenu", href: "/#contenu" },
  { label: "Processus", href: "/#processus" },
  { label: "Commander", href: "/#commander" },
];

const PLAN_LABELS = {
  essentiel: "Essentiel",
  premium: "Premium",
};

const PLAN_PRICES = {
  essentiel: "9,90",
  premium: "19,90",
};



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

  // Redirect if no form data
  if (!formData) {
    navigate("/");
    return null;
  }

  const handleChange = (field: keyof typeof localData, value: string) => {
    setLocalData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveEdits = () => {
    setFormData(localData as any);
    sessionStorage.setItem("userFormData", JSON.stringify(localData));
    setIsEditing(false);
  };

  const handleProceed = () => {
    setFormData(localData as any);
    sessionStorage.setItem("userFormData", JSON.stringify(localData));
    handleSelectPlan(localData.offre as "essentiel" | "premium");
  };

  const priceLabel = PLAN_PRICES[localData.offre as keyof typeof PLAN_PRICES] || "9,90";

  const fields = [
    { label: "Prénom 1", field: "prenom1", type: "text", value: localData.prenom1 },
    {
      label: "Date de naissance 1",
      field: "date1",
      type: "date",
      value: localData.date1,
      display: localData.date1
        ? new Date(localData.date1).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
        : "—",
    },
    { label: "Prénom 2", field: "prenom2", type: "text", value: localData.prenom2 },
    {
      label: "Date de naissance 2",
      field: "date2",
      type: "date",
      value: localData.date2,
      display: localData.date2
        ? new Date(localData.date2).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
        : "—",
    },
    { label: "Adresse e-mail", field: "email", type: "email", value: localData.email },
  ];

  return (
    <main className="relative min-h-screen bg-white overflow-x-hidden">
      <ScrollToTop />
      <HeaderSection navLinks={navLinks} />

      {/* Stepper */}
      <div className="pt-20">
        <Stepper currentStep={3} />
      </div>

      {/* Page body */}
      <div className="max-w-2xl mx-auto pt-14 pb-24 px-5">

        {/* ── Summary Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-[#E8F2F0] bg-[#FAFCFB] p-6 sm:p-8 mb-6"
        >
          {/* Card header */}
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-[18px] font-bold text-[#1A5C52]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {isEditing ? "Modifier vos informations" : "Récapitulatif"}
            </h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[12px] font-semibold text-[#1A5C52] bg-[#E8F2F0] hover:bg-[#D4EAE5] rounded-full transition-colors cursor-pointer"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <Edit2 size={13} className="stroke-[2]" />
                Modifier
              </button>
            )}
          </div>

          {/* Fields list */}
          <div className="space-y-0">
            {fields.map((item) => (
              <div
                key={item.field}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-6 py-3.5 border-b border-[#E8F2F0] last:border-0"
              >
                <span
                  className="text-[13px] text-[#888] shrink-0"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.label}
                </span>

                {isEditing ? (
                  <input
                    type={item.type}
                    value={item.value}
                    onChange={(e) => handleChange(item.field as keyof typeof localData, e.target.value)}
                    className="sm:text-right text-[14px] text-[#1A1A1A] bg-white border border-[#E8F2F0] rounded-lg px-3 py-1.5 w-full sm:max-w-[260px] focus:outline-none focus:ring-2 focus:ring-[#1A5C52]/30 focus:border-[#1A5C52]/50"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                ) : (
                  <span
                    className="text-[14px] font-medium text-[#1A1A1A] sm:text-right sm:max-w-[260px] break-words"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {(item.display ?? item.value) || "—"}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Offer selection */}
          <div className="mt-5">
            <p
              className="text-[12px] uppercase tracking-wider text-[#888] font-semibold mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Formule choisie
            </p>
            <div className="flex gap-2.5">
              {(["essentiel", "premium"] as const).map((offer) => {
                const isSelected = localData.offre === offer;
                return (
                  <button
                    key={offer}
                    onClick={() => { if (isEditing) handleChange("offre", offer); }}
                    disabled={!isEditing}
                    className={`flex-1 px-4 py-3 rounded-xl text-[13px] font-semibold border transition-all ${
                      isSelected
                        ? "bg-[#1A5C52] text-white border-[#1A5C52] shadow-sm"
                        : isEditing
                          ? "bg-white text-[#888] border-[#E8F2F0] hover:border-[#1A5C52]/30 cursor-pointer"
                          : "bg-white text-[#CCC] border-[#E8F2F0] cursor-default"
                    }`}
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {PLAN_LABELS[offer]} · {PLAN_PRICES[offer]}€
                  </button>
                );
              })}
            </div>
          </div>

          {/* Total row */}
          <div className="mt-6 pt-5 border-t border-[#E8F2F0] flex items-end justify-between">
            <span
              className="text-[14px] font-semibold text-[#1A1A1A]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Total
            </span>
            <span
              className="text-[28px] font-bold text-[#B8962E] leading-none"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {priceLabel}€
            </span>
          </div>
        </motion.div>

        {/* ── Error Alert ── */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-[13px] text-red-700"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <AlertTriangle size={16} className="shrink-0 mt-0.5 text-red-500" />
            {error}
          </motion.div>
        )}

        {/* ── Action Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-between gap-4"
        >
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 text-[13px] font-medium text-[#888] hover:text-[#555] transition-colors cursor-pointer"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <ArrowLeft size={16} />
                Annuler
              </button>
              <button
                onClick={handleSaveEdits}
                className="px-8 py-3.5 bg-[#1A5C52] text-white text-[14px] font-semibold rounded-full hover:bg-[#164D45] transition-all cursor-pointer shadow-md"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Enregistrer
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-[13px] font-medium text-[#888] hover:text-[#555] transition-colors cursor-pointer"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <ArrowLeft size={16} />
                Retour
              </button>
              <button
                onClick={handleProceed}
                disabled={!!loadingPlan}
                className="group inline-flex items-center gap-3 px-10 py-3.5 bg-[#B8962E] text-white text-[14px] font-semibold rounded-full hover:bg-[#a18225] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-md"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {loadingPlan ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Redirection...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 stroke-[2]" />
                    Payer {priceLabel}€
                  </>
                )}
              </button>
            </>
          )}
        </motion.div>

        {/* ── Trust badge ── */}
        <div className="flex items-center justify-center gap-2 mt-7 text-[12px] text-[#AAA]" style={{ fontFamily: "'Inter', sans-serif" }}>
          <ShieldCheck size={14} className="text-[#B8962E]" />
          Paiement 100% sécurisé par Stripe · Aucun abonnement
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default ConfirmationPage;
