import { motion } from "framer-motion";

const features = [
  {
    icon: (
      // Anneaux entrelacés fins (lien et union)
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
    icon: (
      // Constellation céleste
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
    icon: (
      // Végétal délicat (croissance, nature)
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

export function Features() {
  return (
    <section
      id="features"
      className="relative py-24 sm:py-36 bg-white overflow-hidden"
    >
      {/* Ambient background glows (Adaptés pour fond clair) */}
      <div className="absolute top-0 right-[-10%] w-[60%] h-[60%] bg-[#B8962E] mix-blend-multiply filter blur-[180px] opacity-[0.05] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#1A5C52] mix-blend-multiply filter blur-[150px] opacity-[0.08] pointer-events-none" />

      {/* Subtle organic texture */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 sm:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-[#B8962E]/50" />
            {/* Utilisation de ta classe duovrai-label */}
            <p className="duovrai-label">Ce que révèle le rapport</p>
            <div className="h-px w-8 bg-[#B8962E]/50" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            // {/* H2 — Vert Sapin (#1A5C52) — Cormorant Garamond Bold (font-bold = 700) */
            className="text-[36px] sm:text-[44px] text-[#1A5C52] font-bold mb-6 leading-[1.2]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
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
            // {/* Paragraphe — Gris (#555555) — Inter Regular */}
            className="text-[16px] sm:text-[17px] text-[#555555] leading-[1.65]"
            style={{
              fontFamily: "'Inter', Calibri, sans-serif",
              fontWeight: 400,
            }}
          >
            Une analyse profonde et nuancée, allant bien au-delà des horoscopes
            traditionnels, pour éclairer la véritable nature de votre lien.
          </motion.p>
        </div>

        {/* 3 Feature Cards */}
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
              // {/* Ajustement du fond des cartes pour du Light Mode avec ombre douce */}
              className="relative group p-10 rounded-[24px] bg-white border border-[#B8962E]/10 hover:border-[#B8962E]/40 transition-all duration-500 overflow-hidden shadow-2xl hover:shadow-[0_20px_40px_rgba(26,92,82,0.1)]"
            >
              {/* Inner ambient glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#B8962E]/0 to-[#B8962E]/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* Pastille de l'icône modifiée pour s'accorder au fond clair (Vert opacité légère en fond) */}
                <div className="mb-8 w-16 h-16 inline-flex items-center justify-center rounded-full bg-[#1A5C52]/5 border border-[#B8962E]/20 shadow-[0_4px_10px_rgba(184,150,46,0.08)] group-hover:shadow-[0_4px_20px_rgba(184,150,46,0.2)] transition-all duration-500">
                  {feature.icon}
                </div>

                {/* H3 — Noir Profond (#1A1A1A) — Montserrat Semi-bold (font-semibold = 600) */}
                <h3
                  className="text-[21px] text-[#1A1A1A] font-semibold mb-4 tracking-wide leading-[1.3]"
                  style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}
                >
                  {feature.title}
                </h3>

                {/* Paragraphe de carte — Gris (#555555) — Inter Regular */}
                <p
                  className="text-[15px] text-[#555555] leading-[1.65]"
                  style={{
                    fontFamily: "'Inter', Calibri, sans-serif",
                    fontWeight: 400,
                  }}
                >
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
