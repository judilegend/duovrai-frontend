import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Mail,
  AlertTriangle,
  Loader2,
  Sparkles,
  FileText,
  Send,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Stepper } from "../components/Stepper";
import { useReportPolling } from "../hooks/useReportPolling";
import { buildReportDownloadUrl } from "../lib/reportDownload";

// Progress messages that rotate based on elapsed time
function getProgressMessage(elapsed: number): {
  icon: React.ReactNode;
  text: string;
  subtext: string;
} {
  if (elapsed < 15) {
    return {
      icon: <Sparkles className="w-6 h-6" />,
      text: "Notre IA analyse la compatibilité de votre couple...",
      subtext: "Lecture des énergies vibratoires et des chemins de vie",
    };
  }
  if (elapsed < 40) {
    return {
      icon: <FileText className="w-6 h-6" />,
      text: "Claude rédige votre rapport personnalisé...",
      subtext: "Analyse émotionnelle, communication et alchimie intime",
    };
  }
  if (elapsed < 70) {
    return {
      icon: <FileText className="w-6 h-6" />,
      text: "Mise en page de votre PDF premium...",
      subtext: "Application du design Duovrai et des graphiques visuels",
    };
  }
  return {
    icon: <Send className="w-6 h-6" />,
    text: "Envoi de votre rapport par e-mail...",
    subtext: "Dernières vérifications et livraison sécurisée",
  };
}

export function GenerationPage() {
  const navigate = useNavigate();

  // Retrieve order_id from sessionStorage (saved before Stripe redirect)
  const orderId = sessionStorage.getItem("duovrai_order_id");

  const { elapsedSeconds, isComplete, isFailed, isTimeout, isPolling, error } =
    useReportPolling(orderId);

  // Calculate remaining seconds for the countdown timer
  const remainingSeconds = Math.max(0, 90 - elapsedSeconds);
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  // Progress bar percentage
  const progressPercent = isComplete
    ? 100
    : Math.min((elapsedSeconds / 90) * 100, 95);

  // Rotating progress messages
  const progressInfo = useMemo(
    () => getProgressMessage(elapsedSeconds),
    [elapsedSeconds],
  );

  // Determine stepper step
  const stepperStep = isComplete ? 5 : 5; // Step 5 is always active/completed on this page

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle download
  const handleDownload = () => {
    if (!orderId) return;
    window.open(buildReportDownloadUrl(orderId), "_blank");
  };

  // If no order_id, redirect to home
  if (!orderId) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F9F3E3]">
        <Navbar />
        <main className="flex-1 flex items-start justify-center">
          <div className="text-center p-8">
            <p className="text-gray-600 mb-4">Aucune commande en cours.</p>
            <Button
              onClick={() => navigate("/")}
              className="bg-[#1A5C52] text-white"
            >
              Retour à l'accueil
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F3E3]">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        {/* Stepper */}
        <Stepper currentStep={stepperStep} />

        <div className="container mx-auto px-4 sm:px-6 max-w-2xl mt-6">
          <AnimatePresence mode="wait">
            {/* ── GENERATING STATE ── */}
            {isPolling && !isComplete && !isFailed && !isTimeout && (
              <motion.div
                key="generating"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-[12px] border border-[#E8F2F0] p-8 sm:p-12 shadow-sm"
              >
                {/* Spinner */}
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "linear",
                      }}
                      className="w-20 h-20 rounded-full border-4 border-[#E8F2F0] border-t-[#1A5C52] border-r-[#B8962E]"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="text-[#B8962E]"
                      >
                        {progressInfo.icon}
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Label */}
                <div className="text-center mb-8">
                  <span
                    className="text-[10px] tracking-widest text-[#B8962E] font-bold uppercase mb-2 block"
                    style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}
                  >
                    Génération en cours
                  </span>
                  <h2
                    className="text-[24px] sm:text-[28px] text-[#1A5C52] leading-tight mb-2"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: 700,
                    }}
                  >
                    Votre rapport prend forme
                  </h2>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={progressInfo.text}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.4 }}
                    >
                      <p
                        className="text-[14px] text-gray-700 mb-1"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {progressInfo.text}
                      </p>
                      <p className="text-[12px] text-gray-400 italic">
                        {progressInfo.subtext}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Progress bar */}
                <div className="mb-6">
                  <div className="h-2 bg-[#E8F2F0] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: "linear-gradient(90deg, #1A5C52, #B8962E)",
                      }}
                      initial={{ width: "0%" }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Timer */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-[#F5FAF9] rounded-full px-5 py-2.5">
                    <Loader2 className="w-4 h-4 text-[#1A5C52] animate-spin" />
                    <span
                      className="text-[14px] text-[#1A5C52] font-medium"
                      style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}
                    >
                      {minutes}:{seconds.toString().padStart(2, "0")}
                    </span>
                    <span className="text-[12px] text-gray-400">restantes</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── COMPLETED STATE ── */}
            {isComplete && (
              <motion.div
                key="completed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-[12px] border border-[#E8F2F0] p-8 sm:p-12 shadow-sm"
              >
                {/* Success animation */}
                <div className="flex justify-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="relative"
                  >
                    <div className="bg-[#1A5C52] p-5 rounded-full">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ repeat: Infinity, duration: 2.5 }}
                      className="absolute inset-0 border-2 border-[#1A5C52] rounded-full"
                    />
                  </motion.div>
                </div>

                <div className="text-center mb-8">
                  <span
                    className="text-[10px] tracking-widest text-[#B8962E] font-bold uppercase mb-2 block"
                    style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}
                  >
                    Rapport Prêt
                  </span>
                  <h2
                    className="text-[28px] sm:text-[32px] text-[#1A5C52] leading-tight mb-3"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: 700,
                    }}
                  >
                    Votre analyse est terminée !
                  </h2>
                  <p className="text-[14px] text-gray-600 max-w-md mx-auto">
                    Votre rapport de compatibilité amoureuse personnalisé est
                    prêt. Téléchargez-le dès maintenant ou retrouvez-le dans
                    votre boîte mail.
                  </p>
                </div>

                {/* Download button */}
                <div className="flex flex-col gap-4 max-w-sm mx-auto">
                  <Button
                    onClick={handleDownload}
                    size="lg"
                    className="w-full bg-[#1A5C52] text-white hover:bg-[#1A5C52]/90 h-14 text-[15px] font-medium rounded-[8px] shadow-md transition-all flex items-center justify-center gap-3"
                  >
                    <Download className="w-5 h-5" />
                    Télécharger le PDF
                  </Button>
                </div>

                {/* Email reminder */}
                <div className="mt-6 rounded-[8px] border border-[#E8F2F0] bg-[#F5FAF9] p-5 flex items-start gap-4">
                  <Mail className="w-5 h-5 text-[#B8962E] shrink-0 mt-0.5" />
                  <div>
                    <h4
                      className="font-semibold text-sm text-[#1A5C52] mb-1"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Également envoyé par e-mail
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Votre rapport PDF a été envoyé à l'adresse indiquée. Le
                      lien de téléchargement expire dans 24 heures. Pensez à
                      vérifier vos spams.
                    </p>
                  </div>
                </div>

                {/* Return home */}
                <div className="text-center mt-6">
                  <button
                    onClick={() => {
                      sessionStorage.removeItem("duovrai_order_id");
                      navigate("/");
                    }}
                    className="text-[13px] text-gray-400 hover:text-[#1A5C52] underline transition-colors"
                  >
                    Retour à l'accueil
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── FAILED / TIMEOUT STATE ── */}
            {(isFailed || isTimeout || error) && !isComplete && (
              <motion.div
                key="failed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[12px] border border-red-200 p-8 sm:p-12 shadow-sm"
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-red-50 p-4 rounded-full">
                    <AlertTriangle className="w-10 h-10 text-red-500" />
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h2
                    className="text-[24px] text-red-700 mb-2"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: 700,
                    }}
                  >
                    {isTimeout
                      ? "Délai de génération dépassé"
                      : "Erreur lors de la génération"}
                  </h2>
                  <p className="text-[14px] text-gray-600 max-w-md mx-auto">
                    {isTimeout
                      ? "La génération de votre rapport prend plus de temps que prévu. Ne vous inquiétez pas, votre paiement est sécurisé."
                      : error ||
                        "Une erreur est survenue lors de la génération de votre rapport."}
                  </p>
                </div>

                <div className="flex flex-col gap-3 max-w-sm mx-auto">
                  <p className="text-[13px] text-gray-500 text-center">
                    Votre rapport sera tout de même envoyé à votre adresse
                    e-mail dès qu'il sera prêt. Si le problème persiste,
                    contactez-nous à{" "}
                    <a
                      href="mailto:support@duovrai.com"
                      className="text-[#1A5C52] underline"
                    >
                      support@duovrai.com
                    </a>
                  </p>
                  <Button
                    onClick={() => navigate("/")}
                    variant="outline"
                    className="w-full border-[#1A5C52] text-[#1A5C52] hover:bg-[#E8F2F0]"
                  >
                    Retour à l'accueil
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default GenerationPage;
