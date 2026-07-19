import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  BookOpen,
  Compass,
  Calendar,
  Heart,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Wind,
  Sun,
  Flame,
  CheckCircle2,
} from "lucide-react";

/* ── page content definitions (no emojis) ── */
const pages = [
  {
    id: "cover",
    tabLabel: "Page de Garde",
    icon: BookOpen,
    title: "Le Livre de votre Union",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-[#1A5C52]">
        {/* Icon ring */}
        <div className="w-16 h-16 rounded-full border border-[#B8962E]/40 bg-gradient-to-br from-[#F9F3E3] to-[#E8F2F0] flex items-center justify-center mb-5 shadow-[0_0_0_6px_rgba(184,150,46,0.07)]">
          <Sparkles className="w-7 h-7 text-[#B8962E] stroke-[1.3]" />
        </div>
        {/* Label */}
        <span
          className="text-[10px] uppercase tracking-[0.25em] font-bold mb-2"
          style={{ fontFamily: "'Montserrat', sans-serif", color: "#B8962E" }}
        >
          DUOVRAI PRÉSENTE
        </span>
        {/* Title */}
        <h3
          className="text-[28px] text-center font-bold mb-3 leading-tight text-[#1A5C52]"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          L'Alchimie de
          <br />
          <span className="italic text-[#B8962E]">Emma & Lucas</span>
        </h3>
        {/* Divider ornement */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#B8962E]/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#B8962E]" />
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#B8962E]/60" />
        </div>
        <p
          className="text-[10px] uppercase tracking-widest text-[#1A5C52]/70 font-semibold"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Livre d'Harmonie Relationnelle
        </p>
        <p className="text-[10px] text-[#555]/60 mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
          Généré avec précision par notre IA
        </p>
      </div>
    ),
  },
  {
    id: "resonance",
    tabLabel: "Résonance",
    icon: Compass,
    title: "Résonance Cosmique",
    content: (
      <div className="flex flex-col justify-between h-full">
        <div className="bg-gradient-to-br from-[#F9F3E3]/50 to-white rounded-[14px] p-5 text-center border border-[#B8962E]/20 shadow-xs">
          <p
            className="text-[9px] uppercase tracking-widest text-[#1A5C52]/80 font-bold mb-1"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Compatibilité Globale
          </p>
          <div className="flex items-end justify-center gap-1 my-1">
            <span
              className="text-[56px] font-bold leading-none text-[#1A5C52]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              92
            </span>
            <span className="text-[22px] text-[#B8962E] font-bold mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              %
            </span>
          </div>
          <div className="w-full bg-[#1A5C52]/10 h-[6px] rounded-full overflow-hidden mt-1">
            <motion.div
              className="h-full bg-gradient-to-r from-[#B8962E] to-[#d4b043] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "92%" }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5 mt-4">
          {[
            { label: "Émotionnel", value: "95%", icon: Heart },
            { label: "Mental", value: "88%", icon: TrendingUp },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="bg-[#F8FBFA] border border-[#E8F2F0] rounded-[10px] p-3 text-center flex flex-col items-center gap-1">
                <Icon size={14} className="text-[#B8962E] stroke-[1.5]" />
                <span className="text-[10px] text-[#555]/80 block font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {item.label}
                </span>
                <span
                  className="text-[17px] font-bold text-[#1A5C52]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    ),
  },
  {
    id: "cycles",
    tabLabel: "Prévisions",
    icon: Calendar,
    title: "Cycles & Périodes Favorables",
    content: (
      <div className="flex flex-col justify-between h-full">
        <p
          className="text-[9px] font-bold uppercase tracking-wider text-[#B8962E] mb-3"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Prévisions · 12 prochains mois
        </p>
        <div className="space-y-2.5 flex-1">
          {[
            {
              icon: Wind,
              period: "Période d'Harmonie · Automne",
              desc: "Transit planétaire favorisant la communication sincère.",
              accent: "#1A5C52",
            },
            {
              icon: Flame,
              period: "Créativité & Passion · Été",
              desc: "Alignement de Vénus parfait pour les projets communs.",
              accent: "#B8962E",
            },
            {
              icon: Sun,
              period: "Renouveau · Printemps",
              desc: "Période idéale pour les nouveaux commencements.",
              accent: "#1A5C52",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.period}
                className="flex items-start gap-3 bg-[#F8FBFA] p-3 rounded-[10px] border border-[#E8F2F0]"
                style={{ borderLeft: `2px solid ${item.accent}` }}
              >
                <div
                  className="mt-0.5 w-6 h-6 shrink-0 rounded-full flex items-center justify-center"
                  style={{ background: `${item.accent}15` }}
                >
                  <Icon size={12} style={{ color: item.accent }} className="stroke-[1.5]" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#1A1A1A] leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {item.period}
                  </p>
                  <p className="text-[10px] text-[#555]/70 mt-0.5 leading-snug" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-center text-[9px] text-[#555]/50 italic font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
          Extrait · Formule Premium (Page 10/12)
        </p>
      </div>
    ),
  },
  {
    id: "rituals",
    tabLabel: "Rituels",
    icon: Heart,
    title: "Rituels de Couple Recommandés",
    content: (
      <div className="flex flex-col justify-between h-full">
        <p
          className="text-[9px] font-bold uppercase tracking-wider text-[#1A5C52] mb-3"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Rituel Cosmique Personnalisé
        </p>
        <div className="bg-[#F9F3E3]/50 border border-[#B8962E]/20 rounded-[14px] p-4 flex-1 flex flex-col justify-center gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1A5C52]/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#B8962E] stroke-[1.3]" />
            </div>
            <div>
              <p
                className="text-[14px] font-bold text-[#1A5C52] leading-snug"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Le Dialogue en Pleine Conscience
              </p>
              <p
                className="text-[10px] text-[#555]/70 mt-0.5"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                15 minutes · Rituel 1 sur 3
              </p>
            </div>
          </div>
          <p
            className="text-[11px] text-[#555]/80 leading-relaxed border-t border-[#B8962E]/15 pt-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Un exercice pour s'exprimer sans filtre, en activant l'élément Feu de
            votre thème astral commun. Pratiquer le soir, à deux.
          </p>
        </div>
        <div className="mt-3 flex items-center gap-2 text-[9px] text-[#1A5C52]/70 font-semibold uppercase tracking-widest" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          <CheckCircle2 size={12} className="text-[#B8962E] stroke-[1.5]" />
          <span>Connexion Intime</span>
          <span className="ml-auto text-[#B8962E]">+ 2 rituels inclus</span>
        </div>
      </div>
    ),
  },
];

/* ── Page-flip variants ── */
const flipEnter = {
  initial: { rotateY: -90, opacity: 0, transformOrigin: "left center" },
  animate: { rotateY: 0,  opacity: 1, transformOrigin: "left center" },
  exit:    { rotateY:  90, opacity: 0, transformOrigin: "right center" },
};

export default function ReportPreview() {
  const [activeTab, setActiveTab] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  // Start auto-cycling when section enters view
  useEffect(() => {
    if (isInView && !isAutoPlaying) {
      setIsAutoPlaying(true);
    }
  }, [isInView, isAutoPlaying]);

  // Auto-advance pages when section is in view
  useEffect(() => {
    if (!isAutoPlaying) return;
    const id = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % pages.length);
    }, 3200);
    return () => clearInterval(id);
  }, [isAutoPlaying]);

  const currentPage = pages[activeTab];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[#1A5C52] overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute top-1/2 left-[15%] -translate-y-1/2 w-[700px] h-[700px] bg-[#B8962E] mix-blend-screen filter blur-[220px] opacity-[0.14] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-black mix-blend-multiply filter blur-[150px] opacity-50 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ─── LEFT : text + tab selectors ─── */}
          <motion.div
            className="lg:col-span-5 flex flex-col items-start gap-6 text-left text-white"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Section badge */}
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#B8962E]" />
              <p
                className="text-[11px] uppercase tracking-[0.25em] text-[#B8962E] font-bold"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Aperçu Interactif
              </p>
            </div>

            <h2
              className="text-[36px] sm:text-[48px] leading-[1.1] text-white font-bold"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Feuilletez votre{" "}
              <br className="hidden sm:block" />
              <span className="text-[#B8962E] italic">Livre d'Harmonie</span>
            </h2>

            <p
              className="text-[15px] sm:text-[16px] leading-relaxed text-white/70 font-light max-w-xl"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Naviguez entre les pages réelles de votre rapport. Notre algorithme
              associe numérologie et astrologie pour des révélations nuancées et
              personnalisées.
            </p>

            {/* Tab buttons */}
            <div className="flex flex-col gap-2 w-full mt-2">
              {pages.map((page, idx) => {
                const Icon = page.icon;
                const isActive = idx === activeTab;
                return (
                  <button
                    key={page.id}
                    onClick={() => { setActiveTab(idx); setIsAutoPlaying(false); }}
                    className={`
                      w-full flex items-center justify-between px-5 py-3.5 rounded-[12px] border text-left
                      transition-all duration-300 group cursor-pointer
                      ${isActive
                        ? "bg-white text-[#1A5C52] border-white shadow-lg scale-[1.01]"
                        : "bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20"}
                    `}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`
                          p-2 rounded-lg transition-colors
                          ${isActive ? "bg-[#1A5C52]/10 text-[#1A5C52]" : "bg-white/5 text-white/80 group-hover:text-white"}
                        `}
                      >
                        <Icon size={16} className="stroke-[1.5]" />
                      </div>
                      <div>
                        <p
                          className="text-[12px] font-bold tracking-wide"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {page.tabLabel}
                        </p>
                        <p
                          className={`text-[10px] leading-none mt-0.5 ${isActive ? "text-[#555]" : "text-white/50"}`}
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {page.title}
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      size={15}
                      className={`
                        transition-all duration-300 stroke-[1.5]
                        ${isActive ? "text-[#1A5C52] translate-x-1" : "text-white/25 group-hover:text-white/50"}
                      `}
                    />
                  </button>
                );
              })}
            </div>

            {/* Page indicator dots */}
            <div className="flex items-center gap-2 mt-1">
              {pages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setActiveTab(idx); setIsAutoPlaying(false); }}
                  className={`
                    rounded-full transition-all duration-400 cursor-pointer
                    ${idx === activeTab ? "w-5 h-1.5 bg-[#B8962E]" : "w-1.5 h-1.5 bg-white/25 hover:bg-white/40"}
                  `}
                />
              ))}
            </div>
          </motion.div>

          {/* ─── RIGHT : animated PDF mockup ─── */}
          <motion.div
            className="lg:col-span-7 flex justify-center items-center relative w-full"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            style={{ perspective: 1200 }}
          >
            {/* Halo doré */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[65%] bg-[#B8962E] rounded-full -z-10 blur-[120px] opacity-25 pointer-events-none"
              animate={{ opacity: [0.2, 0.35, 0.2], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />

            {/* Book wrapper */}
            <div className="relative w-full max-w-[400px] group" style={{ perspective: 1200 }}>
              {/* Layer 3 — deepest back page */}
              <motion.div
                className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-[20px] border border-white/10"
                initial={{ rotate: -4, translateX: -14, translateY: 8, opacity: 0 }}
                whileInView={{ rotate: -4, translateX: -14, translateY: 8, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                aria-hidden="true"
              />
              {/* Layer 2 — mid page */}
              <motion.div
                className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-[20px] border border-white/20"
                initial={{ rotate: 2, translateX: 10, translateY: -5, opacity: 0 }}
                whileInView={{ rotate: 2, translateX: 10, translateY: -5, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.25 }}
                aria-hidden="true"
              />

              {/* Layer 1 — front page card */}
              <motion.div
                className="relative w-full bg-white/95 backdrop-blur-2xl rounded-[20px] shadow-[0_30px_70px_rgba(0,0,0,0.45)] border border-white flex flex-col overflow-hidden"
                style={{ minHeight: 480 }}
                initial={{ opacity: 0, scale: 0.93, rotateY: -8 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
              >
                {/* Card header */}
                <div className="flex items-center justify-between px-7 py-4 border-b border-[#E8F2F0]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#1A5C52]" />
                    <span
                      className="text-[9px] tracking-[0.2em] font-bold text-[#1A5C52] uppercase"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Duovrai · Rapport
                    </span>
                  </div>
                  <span
                    className="text-[9px] tracking-[0.2em] font-bold text-[#B8962E] uppercase"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Aperçu · Formule Premium
                  </span>
                </div>

                {/* Animated page content — page flip effect */}
                <div className="flex-1 px-7 py-6 overflow-hidden" style={{ perspective: 1000 }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPage.id}
                      variants={flipEnter}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                      className="h-full flex flex-col"
                    >
                      {/* Page title tag */}
                      <p
                        className="text-[9px] uppercase tracking-[0.22em] text-[#B8962E] font-bold mb-4"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {currentPage.title}
                      </p>

                      {/* Dynamic content */}
                      <div className="flex-1 flex flex-col justify-center">
                        {currentPage.content}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Card footer */}
                <div className="flex items-center justify-between px-7 py-3 border-t border-[#E8F2F0]">
                  <span
                    className="text-[9px] uppercase tracking-widest text-[#1A5C52]/50 font-semibold"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Confidentiel & Personnel
                  </span>
                  <div className="flex items-center gap-1.5">
                    {pages.map((_, idx) => (
                      <div
                        key={idx}
                        className={`rounded-full transition-all duration-300 ${
                          idx === activeTab
                            ? "w-4 h-1 bg-[#B8962E]"
                            : "w-1 h-1 bg-[#1A5C52]/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
