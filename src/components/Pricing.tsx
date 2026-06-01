import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"

const essentialFeatures = [
  "Rapport PDF détaillé (8 pages)",
  "Score de compatibilité global",
  "Analyse Connexion émotionnelle",
  "Dynamique de communication",
  "Alchimie physique & énergie",
  "Points forts et points de vigilance",
  "Conseil final personnalisé",
]

const premiumFeatures = [
  "Tout le contenu de l'offre Essentiel",
  "Rapport enrichi (12 pages)",
  "Analyse des cycles de vie (numérologie)",
  "Périodes favorables des 12 prochains mois",
  "3 rituels de couple personnalisés",
  "Message d'intention co-rédigé par l'IA",
]

function StarBullet({ color = "#1A5C52" }: { color?: string }) {
  return (
    <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" viewBox="0 0 14 14" fill={color}>
      <path d="M7 0L8.3 5.7L14 7L8.3 8.3L7 14L5.7 8.3L0 7L5.7 5.7L7 0Z" />
    </svg>
  )
}

export function Pricing() {
  const navigate = useNavigate();

  // const handleSelectPlan = (plan: 'essentiel' | 'premium') => {
  //   navigate('/checkout', { state: { plan } });
  // };

  return (
    <section id="pricing" className="py-20 sm:py-24 bg-[#F9F3E3]">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="duovrai-label text-[12px] mb-4"
          >
            Nos offres
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-[28px] sm:text-[30px] mb-4"
          >
            Choisissez votre niveau de profondeur
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[15px] sm:text-[16px]"
          >
            Deux offres pensées pour vous éclairer. Paiement unique, aucun abonnement caché.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">

          {/* ── Essentiel ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[6px] border border-[#E8F2F0] p-7 sm:p-8 flex flex-col"
          >
            <p className="duovrai-label text-[11px] mb-2">Formule</p>
            <h3 className="text-[22px] text-[#1A5C52] mb-1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700 }}>
              Essentiel
            </h3>
            <p className="text-[14px] mb-6">L'analyse fondamentale de votre couple</p>

            <p className="mb-6">
              <span
                className="text-[40px] leading-none"
                style={{ fontFamily: "'Montserrat', Arial, sans-serif", fontWeight: 600, color: "#1A5C52" }}
              >
                9,90
              </span>
              <span className="text-[16px] text-[#B8962E] ml-1" style={{ fontFamily: "'Montserrat', Arial, sans-serif", fontWeight: 500 }}>
                EUR
              </span>
            </p>

            <ul className="space-y-3 mb-8 flex-1">
              {essentialFeatures.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[14px]" style={{ fontFamily: "'Inter', Calibri, sans-serif", color: "#555555" }}>
                  <StarBullet />
                  {item}
                </li>
              ))}
            </ul>

 
          </motion.div>

          {/* ── Premium ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#1A5C52] rounded-[6px] p-7 sm:p-8 flex flex-col relative"
          >
            {/* Badge populaire */}
            <div className="absolute top-0 right-6 -translate-y-1/2">
              <span
                className="bg-[#B8962E] text-white text-[10px] py-1 px-3 rounded-[6px] shadow-md flex items-center gap-1.5"
                style={{ fontFamily: "'Montserrat', Arial, sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}
              >
                <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="currentColor">
                  <path d="M5 0L6 4L10 5L6 6L5 10L4 6L0 5L4 4L5 0Z" />
                </svg>
                Le plus populaire
              </span>
            </div>

            <p className="text-[11px] mb-2" style={{ fontFamily: "'Montserrat', Arial, sans-serif", fontWeight: 300, textTransform: "uppercase", letterSpacing: "0.15em", color: "#B8962E" }}>
              Formule
            </p>
            <h3
              className="text-[22px] text-white mb-1"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700 }}
            >
              Premium
            </h3>
            <p className="text-[14px] text-white/80 mb-6" style={{ fontFamily: "'Inter', Calibri, sans-serif" }}>
              L'expérience la plus complète et spirituelle
            </p>

            <p className="mb-6">
              <span
                className="text-[40px] leading-none text-white"
                style={{ fontFamily: "'Montserrat', Arial, sans-serif", fontWeight: 600 }}
              >
                19,90
              </span>
              <span className="text-[16px] text-[#B8962E] ml-1" style={{ fontFamily: "'Montserrat', Arial, sans-serif", fontWeight: 500 }}>
                EUR
              </span>
            </p>

            <ul className="space-y-3 mb-8 flex-1">
              {premiumFeatures.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[14px] text-white/90" style={{ fontFamily: "'Inter', Calibri, sans-serif" }}>
                  <StarBullet color="#B8962E" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
