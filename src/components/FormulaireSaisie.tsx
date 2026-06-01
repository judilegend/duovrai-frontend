import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
interface FormData {
  prenom1: string
  date1: string
  prenom2: string
  date2: string
  email: string
  offre: "essentiel" | "premium"
}

interface FieldErrors {
  prenom1?: string
  date1?: string
  prenom2?: string
  date2?: string
  email?: string
}

/**
 * Valide une date au format JJ/MM/AAAA
 */
function validateDate(value: string): string | undefined {
  if (!value) return "Ce champ est requis"
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!match) return "Format attendu : JJ/MM/AAAA"
  const [, dd, mm, yyyy] = match
  const day = parseInt(dd, 10)
  const month = parseInt(mm, 10)
  const year = parseInt(yyyy, 10)
  if (month < 1 || month > 12) return "Mois invalide"
  if (day < 1 || day > 31) return "Jour invalide"
  if (year < 1900 || year > new Date().getFullYear()) return "Année invalide"
  // Check if valid date
  const d = new Date(year, month - 1, day)
  if (d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) {
    return "Date invalide"
  }
  return undefined
}

function validateEmail(value: string): string | undefined {
  if (!value) return "Ce champ est requis"
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "E-mail invalide"
  return undefined
}

function validatePrenom(value: string): string | undefined {
  if (!value.trim()) return "Ce champ est requis"
  if (value.trim().length < 2) return "Minimum 2 caractères"
  return undefined
}

/**
 * Formate automatiquement la saisie de date : ajoute les / après JJ et MM
 */
function formatDateInput(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

export function FormulaireSaisie() {
  const [form, setForm] = useState<FormData>({
    prenom1: "",
    date1: "",
    prenom2: "",
    date2: "",
    email: "",
    offre: "premium",
  })

  const [errors, setErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const navigate = useNavigate()
  function handleChange(field: keyof FormData, value: string) {
    if (field === "date1" || field === "date2") {
      value = formatDateInput(value)
    }
    setForm((prev) => ({ ...prev, [field]: value }))
    // Inline validation on change after field has been touched
    if (touched[field]) {
      validateField(field, value)
    }
  }

  function handleBlur(field: keyof FormData) {
    setTouched((prev) => ({ ...prev, [field]: true }))
    validateField(field, form[field])
  }

  function validateField(field: keyof FormData, value: string) {
    let error: string | undefined
    if (field === "prenom1" || field === "prenom2") error = validatePrenom(value)
    if (field === "date1" || field === "date2") error = validateDate(value)
    if (field === "email") error = validateEmail(value)
    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Validate all fields
    const newErrors: FieldErrors = {
      prenom1: validatePrenom(form.prenom1),
      date1: validateDate(form.date1),
      prenom2: validatePrenom(form.prenom2),
      date2: validateDate(form.date2),
      email: validateEmail(form.email),
    }
    setErrors(newErrors)
    setTouched({ prenom1: true, date1: true, prenom2: true, date2: true, email: true })

    const hasErrors = Object.values(newErrors).some((e) => e !== undefined)
    if (!hasErrors) {
      // Redirect to Stripe Checkout
      console.log("Form valid, proceeding to checkout:", form)
      navigate('/checkout');
    }
  }

  return (
    <section id="formulaire" className="py-20 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-xl">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="duovrai-label text-[12px] mb-4">Votre analyse</p>
          <h2 className="text-[28px] sm:text-[30px] mb-3">
            Démarrez votre analyse
          </h2>
          <p className="text-[15px]">
            Remplissez les informations ci-dessous pour recevoir votre rapport personnalisé.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-[#E8F2F0]/30 border border-[#E8F2F0] rounded-[6px] p-6 sm:p-8 space-y-8"
          noValidate
        >

          {/* ── Personne 1 ── */}
          <fieldset className="space-y-4">
            <legend className="duovrai-label text-[11px] flex items-center gap-2 mb-1">
              <svg className="w-3 h-3 text-[#B8962E]" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8L6 0Z" />
              </svg>
              Personne 1
            </legend>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="prenom1" className="block text-[13px] text-[#555555] mb-1.5" style={{ fontFamily: "'Montserrat', Arial, sans-serif", fontWeight: 500 }}>
                  Prénom
                </label>
                <input
                  id="prenom1"
                  type="text"
                  value={form.prenom1}
                  onChange={(e) => handleChange("prenom1", e.target.value)}
                  onBlur={() => handleBlur("prenom1")}
                  placeholder="Ex : Emma"
                  className={`w-full h-11 px-4 rounded-[6px] border bg-white text-[15px] outline-none transition-colors focus:ring-2 focus:ring-[#1A5C52]/20 ${
                    errors.prenom1 && touched.prenom1 ? "border-red-400" : "border-[#E8F2F0] focus:border-[#1A5C52]"
                  }`}
                  style={{ fontFamily: "'Inter', Calibri, sans-serif" }}
                />
                {errors.prenom1 && touched.prenom1 && (
                  <p className="text-red-500 text-[12px] mt-1" style={{ fontFamily: "'Inter', Calibri, sans-serif" }}>{errors.prenom1}</p>
                )}
              </div>
              <div>
                <label htmlFor="date1" className="block text-[13px] text-[#555555] mb-1.5" style={{ fontFamily: "'Montserrat', Arial, sans-serif", fontWeight: 500 }}>
                  Date de naissance
                </label>
                <input
                  id="date1"
                  type="text"
                  inputMode="numeric"
                  value={form.date1}
                  onChange={(e) => handleChange("date1", e.target.value)}
                  onBlur={() => handleBlur("date1")}
                  placeholder="JJ/MM/AAAA"
                  maxLength={10}
                  className={`w-full h-11 px-4 rounded-[6px] border bg-white text-[15px] outline-none transition-colors focus:ring-2 focus:ring-[#1A5C52]/20 ${
                    errors.date1 && touched.date1 ? "border-red-400" : "border-[#E8F2F0] focus:border-[#1A5C52]"
                  }`}
                  style={{ fontFamily: "'Inter', Calibri, sans-serif" }}
                />
                {errors.date1 && touched.date1 && (
                  <p className="text-red-500 text-[12px] mt-1" style={{ fontFamily: "'Inter', Calibri, sans-serif" }}>{errors.date1}</p>
                )}
              </div>
            </div>
          </fieldset>

          {/* ── Personne 2 ── */}
          <fieldset className="space-y-4">
            <legend className="duovrai-label text-[11px] flex items-center gap-2 mb-1">
              <svg className="w-3 h-3 text-[#B8962E]" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8L6 0Z" />
              </svg>
              Personne 2
            </legend>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="prenom2" className="block text-[13px] text-[#555555] mb-1.5" style={{ fontFamily: "'Montserrat', Arial, sans-serif", fontWeight: 500 }}>
                  Prénom
                </label>
                <input
                  id="prenom2"
                  type="text"
                  value={form.prenom2}
                  onChange={(e) => handleChange("prenom2", e.target.value)}
                  onBlur={() => handleBlur("prenom2")}
                  placeholder="Ex : Lucas"
                  className={`w-full h-11 px-4 rounded-[6px] border bg-white text-[15px] outline-none transition-colors focus:ring-2 focus:ring-[#1A5C52]/20 ${
                    errors.prenom2 && touched.prenom2 ? "border-red-400" : "border-[#E8F2F0] focus:border-[#1A5C52]"
                  }`}
                  style={{ fontFamily: "'Inter', Calibri, sans-serif" }}
                />
                {errors.prenom2 && touched.prenom2 && (
                  <p className="text-red-500 text-[12px] mt-1" style={{ fontFamily: "'Inter', Calibri, sans-serif" }}>{errors.prenom2}</p>
                )}
              </div>
              <div>
                <label htmlFor="date2" className="block text-[13px] text-[#555555] mb-1.5" style={{ fontFamily: "'Montserrat', Arial, sans-serif", fontWeight: 500 }}>
                  Date de naissance
                </label>
                <input
                  id="date2"
                  type="text"
                  inputMode="numeric"
                  value={form.date2}
                  onChange={(e) => handleChange("date2", e.target.value)}
                  onBlur={() => handleBlur("date2")}
                  placeholder="JJ/MM/AAAA"
                  maxLength={10}
                  className={`w-full h-11 px-4 rounded-[6px] border bg-white text-[15px] outline-none transition-colors focus:ring-2 focus:ring-[#1A5C52]/20 ${
                    errors.date2 && touched.date2 ? "border-red-400" : "border-[#E8F2F0] focus:border-[#1A5C52]"
                  }`}
                  style={{ fontFamily: "'Inter', Calibri, sans-serif" }}
                />
                {errors.date2 && touched.date2 && (
                  <p className="text-red-500 text-[12px] mt-1" style={{ fontFamily: "'Inter', Calibri, sans-serif" }}>{errors.date2}</p>
                )}
              </div>
            </div>
          </fieldset>

          {/* ── E-mail ── */}
          <div>
            <label htmlFor="email" className="block text-[13px] text-[#555555] mb-1.5" style={{ fontFamily: "'Montserrat', Arial, sans-serif", fontWeight: 500 }}>
              Adresse e-mail (pour recevoir le PDF)
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              placeholder="votre@email.com"
              className={`w-full h-11 px-4 rounded-[6px] border bg-white text-[15px] outline-none transition-colors focus:ring-2 focus:ring-[#1A5C52]/20 ${
                errors.email && touched.email ? "border-red-400" : "border-[#E8F2F0] focus:border-[#1A5C52]"
              }`}
              style={{ fontFamily: "'Inter', Calibri, sans-serif" }}
            />
            {errors.email && touched.email && (
              <p className="text-red-500 text-[12px] mt-1" style={{ fontFamily: "'Inter', Calibri, sans-serif" }}>{errors.email}</p>
            )}
          </div>

   
          {/* ── Submit ── */}
          <Button
            type="submit"
            size="lg"
            className="duovrai-btn w-full bg-[#1A5C52] text-white hover:bg-[#1A5C52]/90 h-[52px] text-[15px] shadow-md group"
          >
            Procéder au paiement
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          <p className="text-center text-[12px] text-[#555555]/60" style={{ fontFamily: "'Inter', Calibri, sans-serif" }}>
            Paiement sécurisé par Stripe. Aucun abonnement.
          </p>

        </motion.form>

      </div>
    </section>
  )
}
