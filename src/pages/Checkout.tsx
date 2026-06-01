import { useLocation, useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function Checkout() {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Default to Essentiel if navigated directly without state
  const selectedPlan = location.state?.plan || 'essentiel'
  const isPremium = selectedPlan === 'premium'
  
  const planName = isPremium ? "Premium" : "Essentiel"
  const planPrice = isPremium ? "19,90" : "9,90"
  
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
    }, 2000)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#F9F3E3] flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A5C52] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Paiement réussi !</h2>
          <p className="text-gray-600 mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
            Merci pour votre commande. Vous allez recevoir un email contenant les instructions pour remplir votre formulaire et obtenir votre analyse.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-[#1A5C52] text-white py-3 rounded-lg font-medium hover:bg-[#14473e] transition-colors"
          >
            Retour à l'accueil
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans">
      
      {/* Left side: Order Summary */}
      <div className="md:w-1/2 bg-[#F9F3E3] p-8 md:p-12 lg:p-20 flex flex-col justify-between border-r border-[#E8F2F0]">
        <div>
          <Link to="/" className="inline-flex items-center text-[#1A5C52] hover:underline mb-12">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour
          </Link>
          
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">Ton Cosmos • DuoVrai</p>
          <h1 className="text-3xl sm:text-4xl text-[#1A5C52] mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 }}>
            Analyse de Compatibilité
          </h1>
          
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">Formule {planName}</h3>
                <p className="text-gray-500 text-sm mt-1">Paiement unique</p>
              </div>
              <div className="text-xl font-medium text-gray-900">{planPrice} €</div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center text-xl">
            <span className="font-semibold text-gray-900">Total à payer</span>
            <span className="font-bold text-gray-900">{planPrice} €</span>
          </div>
        </div>
      </div>

      {/* Right side: Payment Form */}
      <div className="md:w-1/2 p-8 md:p-12 lg:p-20 bg-white">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-medium mb-6 text-gray-900">Coordonnées</h2>
          
          <form onSubmit={handlePayment} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                required 
                className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-[#1A5C52] focus:border-[#1A5C52] outline-none transition-all"
                placeholder="votre@email.com"
              />
            </div>
            
            <h2 className="text-xl font-medium pt-4 mb-2 text-gray-900">Paiement</h2>
            
            <div className="bg-gray-50 p-4 rounded border border-gray-200 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Paiement sécurisé simulé (Stripe)
              </div>
              <div className="flex gap-1">
                <div className="w-8 h-5 bg-blue-600 rounded text-[8px] font-bold text-white flex items-center justify-center">VISA</div>
                <div className="w-8 h-5 bg-red-500 rounded text-[8px] font-bold text-white flex items-center justify-center">MC</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de carte</label>
                <input 
                  type="text" 
                  required 
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-[#1A5C52] focus:border-[#1A5C52] outline-none transition-all"
                  placeholder="0000 0000 0000 0000"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date d'expiration</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-[#1A5C52] focus:border-[#1A5C52] outline-none transition-all"
                    placeholder="MM/AA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-[#1A5C52] focus:border-[#1A5C52] outline-none transition-all"
                    placeholder="123"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom sur la carte</label>
                <input 
                  type="text" 
                  required 
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-[#1A5C52] focus:border-[#1A5C52] outline-none transition-all"
                  placeholder="Titulaire de la carte"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isProcessing}
              className="w-full bg-[#1A5C52] text-white py-4 mt-6 rounded-lg font-medium text-lg hover:bg-[#14473e] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Traitement...
                </>
              ) : (
                `Payer ${planPrice} €`
              )}
            </button>
          </form>
          
          <p className="text-xs text-gray-400 text-center mt-6">
            Ceci est une simulation pour le développement. Aucune carte n'est débitée.
          </p>
        </div>
      </div>
    </div>
  )
}
