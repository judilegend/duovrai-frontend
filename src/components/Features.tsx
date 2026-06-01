import { motion } from "framer-motion"

const features = [
  {
    // Anneaux entrelacés — lien et union
    icon: (
      <svg className="w-8 h-8 text-[#B8962E]" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="16" r="8" />
        <circle cx="20" cy="16" r="8" />
      </svg>
    ),
    title: "Connexion Émotionnelle",
    description:
      "Découvrez comment vos sensibilités s'accordent, vos besoins profonds et comment cultiver une harmonie durable au quotidien.",
  },
  {
    // Constellation — dimension cosmique
    icon: (
      <svg className="w-8 h-8 text-[#B8962E]" viewBox="0 0 32 32" fill="currentColor">
        <circle cx="8" cy="8" r="1.5" />
        <circle cx="24" cy="6" r="1.5" />
        <circle cx="16" cy="16" r="2" />
        <circle cx="6" cy="24" r="1.5" />
        <circle cx="26" cy="26" r="1.5" />
        <line x1="8" y1="8" x2="16" y2="16" stroke="currentColor" strokeWidth="0.6" />
        <line x1="24" y1="6" x2="16" y2="16" stroke="currentColor" strokeWidth="0.6" />
        <line x1="6" y1="24" x2="16" y2="16" stroke="currentColor" strokeWidth="0.6" />
        <line x1="26" y1="26" x2="16" y2="16" stroke="currentColor" strokeWidth="0.6" />
      </svg>
    ),
    title: "Dynamique de Communication",
    description:
      "Analysez vos styles d'échange respectifs pour déjouer les malentendus et renforcer votre complicité intellectuelle.",
  },
  {
    // Étoile à 4 branches — alchimie, révélation
    icon: (
      <svg className="w-8 h-8 text-[#B8962E]" viewBox="0 0 32 32" fill="currentColor">
        <path d="M16 2L18.5 13.5L30 16L18.5 18.5L16 30L13.5 18.5L2 16L13.5 13.5L16 2Z" />
      </svg>
    ),
    title: "Alchimie & Énergie",
    description:
      "Explorez votre magnétisme naturel, vos désirs cachés et la force de votre attraction mutuelle selon les astres.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-24 bg-[#E8F2F0]">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="duovrai-label text-[12px] mb-4"
          >
            Ce que révèle le rapport
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-[28px] sm:text-[30px] mb-4"
          >
            Trois dimensions clés de votre couple
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[15px] sm:text-[16px] leading-relaxed"
          >
            Une analyse profonde et nuancée, allant bien au-delà des horoscopes traditionnels.
          </motion.p>
        </div>

        {/* 3 Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-[6px] border border-[#E8F2F0] hover:shadow-[0_8px_30px_rgba(26,92,82,0.08)] transition-shadow duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-[#F9F3E3] flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              {/* H3 — Montserrat Semi-bold — Noir — 20px */}
              <h3 className="text-[20px] mb-3">{feature.title}</h3>
              {/* Corps — Inter Regular — Gris — 15px */}
              <p className="text-[15px] leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
