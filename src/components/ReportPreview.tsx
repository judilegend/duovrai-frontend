import { motion } from "framer-motion"

export function ReportPreview() {
  return (
    <section className="py-20 sm:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* ── Left: PDF Mockup ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative order-2 lg:order-1"
        >
          {/* Lueur décorative */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[#E8F2F0] rounded-full -z-10 blur-[80px] opacity-40"
            aria-hidden="true"
          />

          {/* Pages empilées */}
          <div className="relative w-full max-w-[340px] mx-auto">
            <div className="absolute top-3 left-3 right-3 h-full bg-white rounded-[6px] shadow-lg border border-[#E8F2F0] rotate-[2deg] opacity-50" aria-hidden="true" />
            <div className="absolute top-1.5 left-1.5 right-1.5 h-full bg-white rounded-[6px] shadow-lg border border-[#E8F2F0] rotate-[0.8deg] opacity-70" aria-hidden="true" />

            {/* Page principale */}
            <div className="relative bg-white rounded-[6px] shadow-xl border border-[#E8F2F0] p-6 sm:p-8 aspect-[1/1.41] flex flex-col z-10">
              {/* En-tête PDF */}
              <div className="flex items-center justify-center mb-5">
                <img src="/logo.jpg" alt="" className="h-6 w-auto opacity-80" />
              </div>

              <h4 className="text-center text-[18px] mb-0.5">Analyse de Compatibilité</h4>
              <p className="duovrai-label text-center text-[11px] mb-6">Emma & Lucas</p>

              {/* Jauge de compatibilité */}
              <div className="bg-[#E8F2F0] rounded-[6px] p-5 text-center mb-5">
                <p className="duovrai-label text-[10px] mb-2">Score Global</p>
                <p
                  className="text-[48px] leading-none mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700, color: "#1A5C52" }}
                >
                  92<span className="text-[24px] text-[#B8962E]">%</span>
                </p>
                <div className="w-full bg-white h-1.5 mt-3 rounded-full overflow-hidden">
                  <div className="h-full bg-[#1A5C52] rounded-full" style={{ width: "92%" }} />
                </div>
              </div>

              {/* Lignes de texte simulées */}
              <div className="space-y-2.5 flex-1">
                <div className="h-3 bg-[#E8F2F0] rounded w-[70%]" />
                <div className="h-3 bg-[#E8F2F0] rounded w-full" />
                <div className="h-3 bg-[#E8F2F0] rounded w-[85%]" />
                <div className="h-3 bg-[#F9F3E3] rounded w-full" />
                <div className="h-3 bg-[#E8F2F0] rounded w-[60%]" />
              </div>

              <div className="mt-auto pt-3 border-t border-[#E8F2F0] flex justify-between text-[10px] text-[#555555]/50" style={{ fontFamily: "'Inter', Calibri, sans-serif" }}>
                <span>Généré par IA</span>
                <span>Page 1 / 12</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Right: Content ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start gap-5 order-1 lg:order-2"
        >
          <p className="duovrai-label text-[12px]">Votre rapport personnalisé</p>

          <h2 className="text-[28px] sm:text-[30px] leading-tight">
            Un miroir d'une rare précision sur votre couple.
          </h2>

          <p className="text-[15px] sm:text-[16px] leading-relaxed max-w-lg">
            Grâce à l'intelligence artificielle combinée aux principes ancestraux de l'astrologie,
            nous générons un rapport unique, magnifiquement mis en page, qui se lit comme un livre
            écrit spécialement pour vous deux.
          </p>

          <ul className="space-y-3 mt-2 w-full">
            {[
              "Mise en page premium aux couleurs Duovrai",
              "Entre 8 et 12 pages selon la formule choisie",
              "Graphiques de compatibilité intuitifs",
              "Disponible immédiatement par e-mail",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[15px]" style={{ fontFamily: "'Inter', Calibri, sans-serif", color: "#555555" }}>
                {/* Étoile dorée comme puce */}
                <svg className="w-4 h-4 text-[#B8962E] shrink-0 mt-0.5" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

      </div>
    </section>
  )
}
