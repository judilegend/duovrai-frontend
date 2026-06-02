import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function ReportPreview() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            // smooth scroll to center the section every time it becomes visible
            node.scrollIntoView({ behavior: "smooth", block: "center" });
          } else {
            setInView(false);
          }
        });
      },
      { threshold: 0.5 },
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return (
    <section className="relative py-24 sm:py-36 bg-[#1A5C52] overflow-hidden">
      {/* Background Ambience - Warm/Gold intimately lit */}
      <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-[800px] h-[800px] bg-[#B8962E] mix-blend-screen filter blur-[200px] opacity-[0.18] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-black mix-blend-multiply filter blur-[150px] opacity-60 pointer-events-none" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.98, y: 12 }}
        animate={
          inView
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.98, y: 12 }
        }
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="container relative z-10 mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
      >
        {/* ── Left: Glassmorphic PDF Mockup ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative order-2 lg:order-1"
          style={{ perspective: 1000 }}
        >
          {/* Lueur dorée intime (bougie) derrière le rapport */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-[#B8962E] rounded-full -z-10 blur-[100px] opacity-40 animate-pulse"
            style={{ animationDuration: "4s" }}
            aria-hidden="true"
          />

          {/* Pages empilées - Le 10% de blanc qui respire */}
          <div className="relative w-full max-w-[400px] mx-auto group">
            {/* Pages de fond transparentes */}
            <div
              className="absolute top-6 -left-4 right-4 h-full bg-white/20 backdrop-blur-md rounded-[16px] shadow-2xl border border-white/30 rotate-[-4deg] transition-transform duration-700 group-hover:rotate-[-6deg]"
              aria-hidden="true"
            />
            <div
              className="absolute top-3 -left-2 right-2 h-full bg-white/40 backdrop-blur-md rounded-[16px] shadow-2xl border border-white/40 rotate-[-2deg] transition-transform duration-700 group-hover:rotate-[-3deg]"
              aria-hidden="true"
            />

            {/* Page principale (Verre dépoli premium) */}
            <div className="relative bg-white/95 backdrop-blur-2xl rounded-[16px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white p-10 sm:p-12 aspect-[1/1.41] flex flex-col z-10 overflow-hidden transition-transform duration-700 group-hover:translate-y-[-5px]">
              {/* Ornement filigrane sacré */}
              <div className="absolute top-0 right-0 w-40 h-40 opacity-[0.03] pointer-events-none">
                <svg
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="#1A5C52"
                  strokeWidth="0.5"
                >
                  <circle cx="50" cy="50" r="40" />
                  <circle cx="50" cy="10" r="10" />
                  <circle cx="50" cy="90" r="10" />
                  <circle cx="10" cy="50" r="10" />
                  <circle cx="90" cy="50" r="10" />
                </svg>
              </div>

              {/* En-tête PDF */}
              <div className="flex items-center justify-center mb-8">
                <span
                  className="font-bold text-2xl text-[#1A5C52]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Duovrai
                </span>
              </div>

              <h4
                className="text-center text-[24px] mb-2 text-[#1A5C52]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Livre d'Harmonie
              </h4>
              <p className="text-center text-[11px] uppercase tracking-[0.3em] text-[#B8962E] mb-10 font-medium">
                Emma & Lucas
              </p>

              {/* Jauge de compatibilité or */}
              <div className="bg-gradient-to-br from-[#F9F3E3] to-white rounded-[12px] p-6 text-center mb-8 border border-[#B8962E]/20 shadow-[inset_0_2px_10px_rgba(184,150,46,0.05)]">
                <p className="text-[10px] uppercase tracking-widest text-[#1A5C52]/70 mb-2">
                  Résonance Cosmique
                </p>
                <p
                  className="text-[56px] leading-none mb-4"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 700,
                    color: "#1A5C52",
                  }}
                >
                  92<span className="text-[24px] text-[#B8962E]">%</span>
                </p>
                <div className="w-full bg-[#1A5C52]/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#B8962E] to-[#d4b043] rounded-full relative"
                    style={{ width: "92%" }}
                  >
                    <div className="absolute top-0 right-0 bottom-0 w-6 bg-white/50 blur-[2px]" />
                  </div>
                </div>
              </div>

              {/* Lignes de texte élégantes */}
              <div className="space-y-4 flex-1 opacity-70">
                <div className="h-2 bg-gradient-to-r from-[#1A5C52]/20 to-transparent rounded-full w-[80%]" />
                <div className="h-2 bg-gradient-to-r from-[#1A5C52]/10 to-transparent rounded-full w-full" />
                <div className="h-2 bg-gradient-to-r from-[#1A5C52]/10 to-transparent rounded-full w-[90%]" />
                <div className="h-2 bg-gradient-to-r from-[#B8962E]/20 to-transparent rounded-full w-[60%]" />
              </div>

              <div className="mt-auto pt-6 border-t border-[#1A5C52]/10 flex justify-between text-[10px] uppercase tracking-wider text-[#1A5C52]/50 font-medium">
                <span>Révélation Stellaire</span>
                <span>Chapitre 1 / 12</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Right: Content ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-start gap-6 order-1 lg:order-2"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-[#B8962E]" />
            <p className="text-[12px] uppercase tracking-[0.25em] text-[#B8962E] font-bold">
              Votre grimoire moderne
            </p>
          </div>

          <h2
            className="text-[40px] sm:text-[52px] leading-[1.1] text-white"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Un miroir d'une rare{" "}
            <span className="text-[#B8962E] italic">précision</span> sur votre
            couple.
          </h2>

          <p className="text-[16px] sm:text-[18px] leading-relaxed text-white/70 font-light max-w-xl">
            Imprégnez-vous d'une lecture intimiste. Notre intelligence
            artificielle, guidée par des principes astrologiques millénaires,
            compose un rapport de 12 pages qui se dévoile comme un livre écrit à
            la lueur d'une bougie, spécialement pour vous deux.
          </p>

          <ul className="space-y-6 mt-6 w-full">
            {[
              "Une esthétique premium qui flatte l'œil et l'âme",
              "12 pages de révélations sur votre dynamique secrète",
              "Des visualisations claires et poétiques",
              "Instantanément vôtre, livré en toute intimité",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-5 text-[17px] text-white/80 font-light"
              >
                {/* Cœur stylisé / motif doux (gold) */}
                <div className="mt-1 w-6 h-6 shrink-0 rounded-full border border-[#B8962E]/40 bg-[#B8962E]/10 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#B8962E] rounded-full shadow-[0_0_8px_#B8962E]" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
