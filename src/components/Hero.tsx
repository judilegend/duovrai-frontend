import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-72px)] flex items-center justify-center bg-white overflow-hidden">
      {/* ── Decorative Background — subtle celestial circles + tile texture ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 16% 22%, rgba(232,242,240,0.55), transparent 28%), radial-gradient(circle at 82% 20%, rgba(249,243,227,0.35), transparent 30%), radial-gradient(circle at 50% 80%, rgba(26,92,82,0.08), transparent 28%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-[28%] mx-auto h-[300px] max-w-3xl rounded-[32px] opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 19%, rgba(26,92,82,0.08) 19%, rgba(26,92,82,0.08) 20%, rgba(255,255,255,0) 20%, rgba(255,255,255,0) 39%, rgba(26,92,82,0.08) 39%, rgba(26,92,82,0.08) 40%, rgba(255,255,255,0) 40%), linear-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,0) 19%, rgba(26,92,82,0.08) 19%, rgba(26,92,82,0.08) 20%, rgba(255,255,255,0) 20%, rgba(255,255,255,0) 39%, rgba(26,92,82,0.08) 39%, rgba(26,92,82,0.08) 40%, rgba(255,255,255,0) 40%)",
            backgroundSize: "40px 40px, 40px 40px",
          }}
        />
        <div className="absolute left-8 top-16 w-24 h-24 rounded-full bg-[#E8F2F0]/70 blur-[40px]" />
        <div className="absolute right-10 top-[22%] w-32 h-32 rounded-full bg-[#F9F3E3]/75 blur-[48px]" />
        {/* <svg
          className="absolute left-[14%] top-[18%] w-24 h-24 text-[#B8962E]/40 opacity-90"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="2.5" fill="currentColor" />
          <circle cx="52" cy="18" r="2.5" fill="currentColor" />
          <circle cx="38" cy="46" r="2.5" fill="currentColor" />
          <circle cx="16" cy="42" r="2.5" fill="currentColor" />
          <path d="M12 12L38 46M52 18L38 46M12 12L16 42" />
        </svg> */}
        <svg
          className="absolute right-[18%] bottom-[22%] w-24 h-24 text-[#1A5C52]/30 opacity-90"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="22" cy="32" r="12" />
          <circle cx="42" cy="32" r="12" />
          <path d="M24 28L32 20L40 28" />
          <path d="M24 36L32 44L40 36" />
        </svg>
        <svg
          className="absolute bottom-[20%] left-[12%] w-28 h-28 text-[#1A5C52]/20"
          viewBox="0 0 80 80"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M10 60C24 36 38 28 52 16" />
          <path d="M18 58C32 42 46 34 62 24" />
          <path d="M14 66C22 54 36 48 46 38" />
        </svg>
        {/* Étoile à 4 branches subtile — référence au logo */}
        <img
          src="/flower (1).png"
          alt="flower "
          className="w-20 h-20 blur-[5px] max-md:hidden absolute lg:top-[15%] lg:left-[20%] left-[15%] top-[15%]  opacity-60 "
        />
        <img
          src="/flower (1).png"
          alt="flower "
          className="w-20 h-20 blur-[5px] absolute  max-md:hidden lg:top-[25%] lg:left-[25%] left-[15%] top-[15%]  opacity-30 "
        />
        {/* Petites étoiles cardinales */}
        <svg
          className="absolute top-[18%] right-[22%] w-2 h-2 text-[#B8962E] opacity-20"
          viewBox="0 0 8 8"
          fill="currentColor"
        >
          <path d="M4 0L4.8 3.2L8 4L4.8 4.8L4 8L3.2 4.8L0 4L3.2 3.2L4 0Z" />
        </svg>
        <svg
          className="absolute bottom-[20%] left-[18%] w-3 h-3 text-[#1A5C52] opacity-15"
          viewBox="0 0 8 8"
          fill="currentColor"
        >
          <path d="M4 0L4.8 3.2L8 4L4.8 4.8L4 8L3.2 4.8L0 4L3.2 3.2L4 0Z" />
        </svg>
        <img
          src="/flower (2).png"
          alt="flower "
          className="w-20 h-20 blur-[5px] absolute top-[25%] right-[25%] opacity-30"
        />
        {/* Lueur diffuse */}
        <div className="absolute top-[30%] left-[15%] w-60 h-60 bg-[#E8F2F0] rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-[20%] right-[10%] w-48 h-48 bg-[#F9F3E3] rounded-full blur-[80px] opacity-50" />
      </div>

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

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[36px] sm:text-[40px] lg:text-[60px] mb-6 font-extrabold "
        >
          Découvrez l'alchimie <br className="hidden sm:block" />
          de votre relation
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[15px] sm:text-[16px] max-w-xl mb-10 leading-relaxed"
        >
          Deux prénoms. Une analyse. Des révélations. Obtenez un rapport PDF
          personnalisé de 8 à 12 pages, révélant les forces, les défis et
          l'alchimie unique de votre couple.
        </motion.p>

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
            <a href="#formulaire">Commencer l'analyse</a>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <a
            href="#features"
            className="duovrai-nav text-[#1A5C52] hover:text-[#1A5C52]/80 transition-colors flex items-center gap-1"
          >
            En savoir plus
          </a>
        </motion.div>

        {/* Indicateurs de confiance — cartes plus visibles */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14"
        >
          {[
            "Rapport 8–12 pages",
            "100% confidentiel",
            "Livraison instantanée",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[28px] border border-[#E8F2F0] bg-white/90 px-5 py-4 shadow-[0_24px_60px_-44px_rgba(26,92,82,0.45)]"
            >
              <span className="duovrai-label block text-[13px] font-semibold uppercase tracking-[0.18em] text-[#1A5C52] text-center">
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
