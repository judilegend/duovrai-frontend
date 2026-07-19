import { motion } from "framer-motion";

const features = [
  {
    badge: "01",
    chip: "Émotion",
    icon: (
      <svg
        className="w-10 h-10 text-[#B8962E]"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <circle cx="16" cy="20" r="10" />
        <circle cx="24" cy="20" r="10" />
        <path
          d="M16 10 A 10 10 0 0 1 16 30"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 2"
          opacity="0.5"
        />
      </svg>
    ),
    title: "Connexion Émotionnelle",
    description:
      "Plongez dans les profondeurs de vos âmes. Découvrez comment vos sensibilités s'accordent et comment cultiver une intimité inébranlable.",
  },
  {
    badge: "02",
    chip: "Astrologie",
    icon: (
      <svg
        className="w-10 h-10 text-[#B8962E]"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <circle cx="20" cy="20" r="14" strokeDasharray="4 4" opacity="0.4" />
        <circle cx="20" cy="20" r="6" />
        <circle cx="20" cy="6" r="2" fill="currentColor" />
        <circle cx="34" cy="20" r="2" fill="currentColor" />
        <circle cx="20" cy="34" r="2" fill="currentColor" />
        <circle cx="6" cy="20" r="2" fill="currentColor" />
        <line x1="20" y1="8" x2="20" y2="14" opacity="0.5" />
        <line x1="20" y1="26" x2="20" y2="32" opacity="0.5" />
        <line x1="8" y1="20" x2="14" y2="20" opacity="0.5" />
        <line x1="26" y1="20" x2="32" y2="20" opacity="0.5" />
      </svg>
    ),
    title: "Dynamique Céleste",
    description:
      "Vos cartes astrales entrelacées révèlent la fluidité de vos échanges. Déjouez les malentendus et élevez votre communication.",
  },
  {
    badge: "03",
    chip: "Croissance",
    icon: (
      <svg
        className="w-10 h-10 text-[#B8962E]"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M20 36 V12" />
        <path d="M20 24 C 28 20, 30 14, 30 14 C 30 14, 25 10, 20 16" />
        <path d="M20 30 C 12 26, 10 20, 10 20 C 10 20, 15 16, 20 22" />
        <path d="M20 16 C 26 12, 26 6, 26 6 C 26 6, 22 4, 20 10" />
      </svg>
    ),
    title: "Alchimie & Croissance",
    description:
      "Explorez votre magnétisme naturel et laissez l'énergie de votre union vous élever mutuellement vers votre plein potentiel.",
  },
];

export default function ContentSection() {
  return (
    <section
      id="contenu"
      className="relative py-24 sm:py-36 bg-white overflow-hidden"
    >
      <div className="absolute top-0 right-[-10%] w-[60%] h-[60%] bg-[#B8962E] mix-blend-multiply filter blur-[180px] opacity-[0.05] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#1A5C52] mix-blend-multiply filter blur-[150px] opacity-[0.08] pointer-events-none" />

      <div className="container relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 flex justify-center"
          >
            <p className="duovrai-label text-[12px]">Ce que révèle le rapport</p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[36px] sm:text-[44px] mb-6 leading-[1.2]"
          >
            Trois dimensions{" "}
            <span className="text-[#B8962E] italic font-normal">sacrées</span>{" "}
            de votre couple
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[16px] sm:text-[17px] text-[#555555] leading-[1.65]"
          >
            Une analyse profonde et nuancée, allant bien au-delà des horoscopes
            traditionnels, pour éclairer la véritable nature de votre lien.
          </motion.p>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.15,
                duration: 0.8,
                ease: "easeOut",
              }}
              className="group relative overflow-hidden rounded-[28px] border border-[#E8F2F0] bg-[linear-gradient(180deg,#ffffff_0%,#fbfdfd_100%)] p-6 shadow-[0_18px_40px_-24px_rgba(26,92,82,0.35)] transition-all duration-500 hover:-translate-y-1 hover:border-[#B8962E]/40 hover:shadow-[0_28px_52px_-30px_rgba(26,92,82,0.45)] sm:p-8"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-linear-to-r from-transparent via-[#B8962E]/70 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#B8962E]/8 blur-2xl transition duration-500 group-hover:scale-110" />
              <div className="absolute -bottom-8 -left-6 h-24 w-24 rounded-full bg-[#1A5C52]/8 blur-2xl transition duration-500 group-hover:scale-110" />

              <div className="relative z-10 flex h-full flex-col gap-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="inline-flex items-center rounded-full border border-[#E8F2F0] bg-[#F8FBFA] px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-[#1A5C52] shadow-sm">
                    {feature.chip}
                  </div>
                  <span className="text-sm font-semibold text-[#B8962E]">
                    {feature.badge}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#B8962E]/20 bg-gradient-to-br from-[#F9F3E3] via-white to-[#E8F2F0] shadow-[0_10px_18px_-12px_rgba(184,150,46,0.55)] transition duration-500 group-hover:-translate-y-0.5">
                    {feature.icon}
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#B8962E]/30 via-transparent to-transparent" />
                </div>

                <div>
                  <h3 className="mb-3 text-[20px] leading-[1.25] tracking-[0.01em] sm:text-[21px]">
                    {feature.title}
                  </h3>

                  <p className="text-[14px] leading-[1.6] text-[#555555] sm:text-[15px]">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between rounded-2xl border border-[#E8F2F0] bg-[#F8FBFA] px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-[#1A5C52]">
                  <span>Insight premium</span>
                  <span className="text-[#B8962E]">+ profondeur</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
