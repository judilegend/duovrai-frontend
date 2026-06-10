import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";
import { FormField } from "./ui/FormField";
import { useFormData } from "../context/FormDataContext";
import { SectionLabel } from "./ui/SectionLabel";
interface FormData {
  prenom1: string;
  date1: string;
  prenom2: string;
  date2: string;
  email: string;
  offre: "essentiel" | "premium";
}

interface FieldErrors {
  prenom1?: string;
  date1?: string;
  prenom2?: string;
  date2?: string;
  email?: string;
}

/**
 * Valide une date ISO (AAAA-MM-JJ)
 */
function validateDate(value: string): string | undefined {
  if (!value) return "Ce champ est requis";

  // Le format de l'input type="date" est AAAA-MM-JJ
  const dateObj = new Date(value + "T00:00:00Z");

  // Vérifier si la date est valide
  if (isNaN(dateObj.getTime())) return "Date invalide";

  // Vérifier la plage d'années
  const year = dateObj.getUTCFullYear();
  if (year < 1900 || year > new Date().getFullYear()) return "Année invalide";

  return undefined;
}

function validateEmail(value: string): string | undefined {
  if (!value) return "Ce champ est requis";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "E-mail invalide";
  return undefined;
}

function validatePrenom(value: string): string | undefined {
  if (!value.trim()) return "Ce champ est requis";
  if (value.trim().length < 2) return "Minimum 2 caractères";
  return undefined;
}

export function FormulaireSaisie() {
  const { formData, setFormData } = useFormData();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>(
    formData || {
      prenom1: "",
      date1: "",
      prenom2: "",
      date2: "",
      email: "",
      offre: "premium",
    },
  );

  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      validateField(field, value);
    }
  }

  function handleBlur(field: keyof FormData) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, form[field]);
  }

  function validateField(field: keyof FormData, value: string) {
    let error: string | undefined;
    if (field === "prenom1" || field === "prenom2")
      error = validatePrenom(value);
    if (field === "date1" || field === "date2") error = validateDate(value);
    if (field === "email") error = validateEmail(value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: FieldErrors = {
      prenom1: validatePrenom(form.prenom1),
      date1: validateDate(form.date1),
      prenom2: validatePrenom(form.prenom2),
      date2: validateDate(form.date2),
      email: validateEmail(form.email),
    };
    setErrors(newErrors);
    setTouched({
      prenom1: true,
      date1: true,
      prenom2: true,
      date2: true,
      email: true,
    });

    const hasErrors = Object.values(newErrors).some((e) => e !== undefined);
    if (!hasErrors) {
      setFormData(form);
      sessionStorage.setItem("userFormData", JSON.stringify(form));
      navigate("/pricing-page");
    }
  }

  return (
    <section id="formulaire" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
          {/* Left: Text Section */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="order-2 flex flex-col gap-6 lg:order-1"
          >
            <div>
              <SectionLabel>Découvrez votre alchimie</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1A5C52] mb-4 leading-tight">
                Prêt à explorer votre destinée ensemble ?
              </h2>
              <p className="text-base text-gray-600 leading-relaxed sm:text-lg">
                En quelques clics, lancez l’analyse intelligente de votre
                couple. Notre système révèle les harmonies cachées et les défis
                à transformer en forces, avec un rendu clair et premium.
              </p>
            </div>

            <div className="space-y-3 mt-6">
              {[
                "Analyse personnalisée en temps réel",
                "Rapport PDF de 8–12 pages",
                "Conseils astrologiques pointus",
                "Accès immédiat après paiement",
              ].map((item, i) => (
                <div
                  key={i}
                  className="stagger-item flex items-start gap-3 animate-slide-up"
                >
                  <svg
                    className="w-5 h-5 text-[#B8962E] shrink-0 mt-0.5"
                    viewBox="0 0 12 12"
                    fill="currentColor"
                  >
                    <path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8L6 0Z" />
                  </svg>
                  <span className="text-sm sm:text-base text-gray-600">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
            className="order-1 w-full lg:order-2"
          >
            <div className="mb-6 text-center">
              <SectionLabel>Votre analyse</SectionLabel>
              <h3 className="mt-3 text-2xl font-bold text-[#1A5C52] sm:text-3xl">
                Démarrez maintenant
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Un formulaire simple, lisible et optimisé pour mobile.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-[28px] border border-[#E8F2F0] bg-white/95 p-5 shadow-[0_18px_50px_-30px_rgba(26,92,82,0.45)] backdrop-blur sm:p-7"
              noValidate
            >
              {/* Personne 1 */}
              <fieldset className="space-y-4">
                <legend className="text-xs uppercase tracking-widest font-semibold text-[#1A5C52] flex items-center gap-2 mb-2">
                  <svg
                    className="w-3 h-3 text-[#B8962E]"
                    viewBox="0 0 12 12"
                    fill="currentColor"
                  >
                    <path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8L6 0Z" />
                  </svg>
                  Personne 1
                </legend>
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    label="Prénom"
                    placeholder="Ex : Emma"
                    value={form.prenom1}
                    error={errors.prenom1}
                    touched={touched.prenom1}
                    onChange={(val) => handleChange("prenom1", val)}
                    onBlur={() => handleBlur("prenom1")}
                    required
                  />
                  <FormField
                    label="Date de naissance"
                    type="date"
                    value={form.date1}
                    error={errors.date1}
                    touched={touched.date1}
                    onChange={(val) => handleChange("date1", val)}
                    onBlur={() => handleBlur("date1")}
                    required
                  />
                </div>
              </fieldset>

              {/* Personne 2 */}
              <fieldset className="space-y-4">
                <legend className="text-xs uppercase tracking-widest font-semibold text-[#1A5C52] flex items-center gap-2 mb-2">
                  <svg
                    className="w-3 h-3 text-[#B8962E]"
                    viewBox="0 0 12 12"
                    fill="currentColor"
                  >
                    <path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8L6 0Z" />
                  </svg>
                  Personne 2
                </legend>
                <div className="grid sm:grid-cols-2 gap-4 ">
                  <FormField
                    label="Prénom"
                    placeholder="Ex : Lucas"
                    value={form.prenom2}
                    error={errors.prenom2}
                    touched={touched.prenom2}
                    onChange={(val) => handleChange("prenom2", val)}
                    onBlur={() => handleBlur("prenom2")}
                    required
                  />
                  <FormField
                    label="Date de naissance"
                    type="date"
                    value={form.date2}
                    error={errors.date2}
                    touched={touched.date2}
                    onChange={(val) => handleChange("date2", val)}
                    onBlur={() => handleBlur("date2")}
                    required
                  />
                </div>
              </fieldset>

              {/* Email */}
              <FormField
                label="Adresse e-mail (pour recevoir le PDF)"
                type="email"
                placeholder="votre@email.com"
                value={form.email}
                error={errors.email}
                touched={touched.email}
                onChange={(val) => handleChange("email", val)}
                onBlur={() => handleBlur("email")}
                required
              />

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="duovrai-btn group max-md:mt-5 h-12 w-full bg-[#1A5C52] text-base font-semibold text-white shadow-lg shadow-[#1A5C52]/10 transition-all hover:-translate-y-0.5 hover:bg-[#173F39] sm:h-14"
              >
                Procéder au paiement
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#E8F2F0] bg-[#F9FCFB] px-3 py-2 text-xs text-gray-600 sm:text-sm">
                <ShieldCheck className="h-4 w-4 text-[#B8962E]" />
                Paiement sécurisé par Stripe · Aucun abonnement.
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
