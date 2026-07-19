import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Comment fonctionne l'analyse de compatibilité ?",
    answer:
      "Notre intelligence artificielle combine des principes de numérologie, d'astrologie et d'analyse psychologique pour créer un portrait détaillé de votre dynamique de couple. En utilisant vos prénoms et dates de naissance, elle génère un rapport PDF entièrement personnalisé de 8 à 12 pages.",
  },
  {
    question: "Combien de temps faut-il pour recevoir le rapport ?",
    answer:
      "Après le paiement, votre rapport est généralement prêt en 1 à 3 minutes. Vous le recevrez par e-mail et pourrez également le télécharger directement depuis la page de confirmation.",
  },
  {
    question: "Quelle est la différence entre les formules Essentiel et Premium ?",
    answer:
      "La formule Essentiel (9,90€) comprend un rapport de 8 pages couvrant la connexion émotionnelle, la dynamique de communication et l'alchimie physique. La formule Premium (19,90€) ajoute 4 pages avec l'analyse des cycles de vie, les périodes favorables des 12 prochains mois et 3 rituels de couple personnalisés.",
  },
  {
    question: "Mes données sont-elles sécurisées et confidentielles ?",
    answer:
      "Absolument. Nous n'utilisons vos données que pour générer votre rapport. Elles ne sont jamais revendues ou partagées avec des tiers. Le paiement est intégralement traité par Stripe, leader mondial de la sécurité des paiements en ligne.",
  },
  {
    question: "Puis-je obtenir un remboursement si je ne suis pas satisfait ?",
    answer:
      "Étant donné la nature numérique et instantanée du produit, nous ne proposons pas de remboursement une fois le rapport généré et envoyé. Si vous rencontrez un problème technique, contactez-nous à support@duovrai.com et nous ferons tout pour vous aider.",
  },
  {
    question: "Le rapport fonctionne-t-il pour tous les types de couples ?",
    answer:
      "Oui, entièrement. Notre analyse est inclusive et s'adapte à tous les types de relations : romantique, amical, familial ou professionnel. L'alchimie entre deux personnes dépasse les catégories.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="duovrai-label text-[12px] mb-4"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-[36px] sm:text-[44px] mb-4 leading-[1.2]"
          >
            Questions fréquentes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[15px] sm:text-[16px] text-[#555555]"
          >
            Tout ce que vous devez savoir avant de commencer votre analyse.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="border border-[#E8F2F0] rounded-[16px] overflow-hidden bg-white shadow-[0_2px_12px_-6px_rgba(26,92,82,0.12)]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-[#F9FCFB] transition-colors"
              >
                <span
                  className="text-[15px] font-semibold text-[#1A1A1A] leading-snug"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-[#B8962E] shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="px-6 pb-5 text-[14px] text-[#555555] leading-relaxed border-t border-[#F0F7F5]"
                >
                  <p className="pt-4">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
