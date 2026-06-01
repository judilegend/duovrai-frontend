import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "./ui/button"

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-72px)] flex items-center justify-center bg-white overflow-hidden">

      {/* ── Decorative Background — subtle celestial circles ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Grand cercle céleste Vert très pâle */}
        {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[700px] sm:h-[700px] lg:w-[800px] lg:h-[800px] rounded-full border border-[#1A5C52]/[0.06]" /> */}
        {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] lg:w-[580px] lg:h-[580px] rounded-full border border-[#B8962E]/[0.08]" /> */}
        {/* Étoile à 4 branches subtile — référence au logo */}
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-[#B8962E] opacity-30"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" />
        </svg>
        {/* Petites étoiles cardinales */}
        <svg className="absolute top-[18%] right-[22%] w-2 h-2 text-[#B8962E] opacity-20" viewBox="0 0 8 8" fill="currentColor">
          <path d="M4 0L4.8 3.2L8 4L4.8 4.8L4 8L3.2 4.8L0 4L3.2 3.2L4 0Z" />
        </svg>
        <svg className="absolute bottom-[20%] left-[18%] w-3 h-3 text-[#1A5C52] opacity-15" viewBox="0 0 8 8" fill="currentColor">
          <path d="M4 0L4.8 3.2L8 4L4.8 4.8L4 8L3.2 4.8L0 4L3.2 3.2L4 0Z" />
        </svg>
        {/* Lueur diffuse */}
        <div className="absolute top-[30%] left-[15%] w-60 h-60 bg-[#E8F2F0] rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-[20%] right-[10%] w-48 h-48 bg-[#F9F3E3] rounded-full blur-[80px] opacity-50" />
      </div>

      {/* ── Contenu principal — centré ── */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 sm:py-20 flex flex-col items-center text-center max-w-3xl">

        {/* Tagline — Montserrat Light · Caps · Espacement large */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="duovrai-label text-[13px] mb-8"
        >
          Analyse de compatibilité par Intelligence Artificielle
        </motion.p>

        {/* Titre H1 — Cormorant Garamond Bold — 36–44px */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[36px] sm:text-[40px] lg:text-[60px] mb-6 font-bold"
        >
          Découvrez l'alchimie{" "}
          <br className="hidden sm:block" />
          de votre relation
        </motion.h1>

        {/* Sous-titre — Inter Regular — Gris — 16–17px */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[15px] sm:text-[16px] max-w-xl mb-10 leading-relaxed"
        >
          Deux prénoms. Une analyse. Des révélations.
          Obtenez un rapport PDF personnalisé de 8 à 12 pages, révélant les forces,
          les défis et l'alchimie unique de votre couple.
        </motion.p>

        {/* CTA — Bouton Vert #1A5C52 · texte blanc · border-radius 6px */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Button
            size="lg"
            className="duovrai-btn bg-[#1A5C52] text-white hover:bg-[#1A5C52]/90 px-8 h-[52px] text-[15px] shadow-md group"
          >
            Commencer l'analyse
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <a
            href="#features"
            className="duovrai-nav text-[#1A5C52] hover:text-[#1A5C52]/80 transition-colors flex items-center gap-1"
          >
            En savoir plus
          </a>
        </motion.div>

        {/* Indicateurs de confiance — Montserrat Light Caps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-14 pt-6 border-t border-[#E8F2F0]"
        >
          {[
            "Rapport 8–12 pages",
            "100% confidentiel",
            "Livraison instantanée",
          ].map((item) => (
            <span key={item} className="duovrai-label text-[11px] flex items-center gap-2">
              {/* Étoile à 4 branches comme puce */}
              <svg className="w-3 h-3 text-[#B8962E]" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8L6 0Z" />
              </svg>
              {item}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
