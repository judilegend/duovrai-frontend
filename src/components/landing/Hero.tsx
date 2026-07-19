import { motion } from "framer-motion";
import { ArrowRight, Stars, FileText, Lock, Zap } from "lucide-react";

export default function HeroSection() {
  const trustBadges = [
    { label: "Rapport 8–12 pages", icon: FileText },
    { label: "100% confidentiel", icon: Lock },
    { label: "Livraison instantanée", icon: Zap },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden"
    >
      {/* ── Decorative Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 16% 22%, rgba(232,242,240,0.55), transparent 28%), radial-gradient(circle at 82% 20%, rgba(249,243,227,0.35), transparent 30%), radial-gradient(circle at 50% 80%, rgba(26,92,82,0.08), transparent 28%)",
          }}
        />
        <div className="absolute left-8 top-16 w-24 h-24 rounded-full bg-[#E8F2F0]/70 blur-[40px]" />
        <div className="absolute right-10 top-[22%] w-32 h-32 rounded-full bg-[#F9F3E3]/75 blur-[48px]" />
        <img
          src="/flower (1).png"
          alt=""
          className="w-20 h-20 blur-[5px] max-md:hidden absolute lg:top-[15%] lg:left-[20%] left-[15%] top-[15%] opacity-60"
        />
        <img
          src="/flower (1).png"
          alt=""
          className="w-20 h-20 blur-[5px] absolute max-md:hidden lg:top-[25%] lg:left-[25%] left-[15%] top-[15%] opacity-30"
        />
        <img
          src="/flower (2).png"
          alt=""
          className="w-20 h-20 blur-[5px] absolute top-[25%] right-[25%] opacity-30"
        />
        <div className="absolute top-[30%] left-[15%] w-60 h-60 bg-[#E8F2F0] rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-[20%] right-[10%] w-48 h-48 bg-[#F9F3E3] rounded-full blur-[80px] opacity-50" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-32 sm:py-36 flex flex-col items-center text-center max-w-3xl">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-8"
        >
          <Stars className="w-3.5 h-3.5 text-[#B8962E]" />
          <p className="duovrai-label text-[12px]">
            Analyse de compatibilité par Intelligence Artificielle
          </p>
          <Stars className="w-3.5 h-3.5 text-[#B8962E]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[40px] sm:text-[52px] lg:text-[64px] mb-6 font-extrabold leading-[1.1]"
        >
          Découvrez l'alchimie <br className="hidden sm:block" />
          de votre{" "}
          <span
            className="text-[#B8962E] italic"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700 }}
          >
            relation
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[16px] sm:text-[17px] max-w-xl mb-10 leading-relaxed text-[#555555]"
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
          <a
            href="#formulaire"
            className="duovrai-btn inline-flex items-center gap-2 bg-[#1A5C52] text-white hover:bg-[#1A5C52]/90 px-8 h-[52px] text-[15px] shadow-md group rounded-[6px] transition-all"
          >
            Commencer l'analyse
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#features"
            className="duovrai-nav text-[#1A5C52] hover:text-[#1A5C52]/80 transition-colors flex items-center gap-1"
          >
            En savoir plus
          </a>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14 w-full max-w-xl"
        >
          {trustBadges.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-[28px] border border-[#E8F2F0] bg-white/90 px-5 py-4 shadow-[0_24px_60px_-44px_rgba(26,92,82,0.45)] flex flex-col items-center justify-center gap-1.5"
              >
                <Icon size={20} className="text-[#B8962E] stroke-[1.5]" />
                <span className="duovrai-label block text-[11px] font-semibold text-[#1A5C52] text-center">
                  {item.label}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
