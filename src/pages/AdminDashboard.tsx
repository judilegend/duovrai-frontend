import { Link } from "react-router-dom"

const recentOrders = [
  {
    id: "# 31",
    date: "1er juin 2026",
    time: "12:13",
    client: "ttt*****@gmail.com",
    plan: "Essentiel",
    amount: "9,90 €",
    status: "Attente Paiement",
  },
]

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-white font-sans relative overflow-hidden text-[#1A5C52]">

      <div className=" max-w-[1400px] mx-auto relative z-10 flex flex-col min-h-screen">
        {/* Top Navbar - Glassmorphic */}
        <nav className="sticky top-0 z-50 bg-white px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="font-bold text-2xl text-[#1A5C52] tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Duovrai</span>
            <span className="text-[10px] tracking-widest text-[#B8962E] font-medium ml-1 uppercase">Admin</span>
          </div>

          <div className="flex items-center gap-6">
            <button className="px-4 py-2 bg-white/50 backdrop-blur-sm text-[#1A5C52] rounded-lg text-sm font-medium flex items-center gap-2 border border-white/60 shadow-sm transition-all hover:bg-white/70">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Tableau de bord
            </button>
            <button className="text-sm font-medium text-[#1A5C52]/70 hover:text-[#1A5C52] flex items-center gap-2 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              Commandes
            </button>
            <button className="text-sm font-medium text-[#1A5C52]/70 hover:text-[#1A5C52] flex items-center gap-2 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Paramètres
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 bg-white/50 backdrop-blur-sm rounded-full border border-white/60 text-[#1A5C52]/70 hover:text-[#1A5C52] hover:bg-white/70 transition-all shadow-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
            <button className="flex items-center gap-2 text-sm text-red-500/80 hover:text-red-600 font-medium transition-colors bg-white/40 px-3 py-1.5 rounded-lg border border-white/60 shadow-sm backdrop-blur-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Déconnexion
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-10 w-full flex-1 relative z-10">
          
          {/* Header Section */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <div className="flex items-center gap-2 text-[10px] tracking-widest text-[#B8962E] font-bold mb-3 uppercase">
                <span className="w-2 h-2 rounded-full bg-[#B8962E] shadow-[0_0_8px_rgba(184,150,46,0.6)]"></span>
                Session Active
              </div>
              <h1 className="text-4xl text-[#1A5C52] font-bold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Tableau de bord</h1>
              <p className="text-[#1A5C52]/70 text-sm font-medium">
                Ravi de vous revoir, <span className="font-bold text-[#1A5C52]">Joseph</span>.
              </p>
            </div>
            
            <Link to="/" className="px-5 py-2.5 bg-white/40 backdrop-blur-md border border-white/60 rounded-xl text-sm font-medium text-[#1A5C52] hover:bg-white/60 transition-all shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Voir le site
            </Link>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            
            {/* Card 1 */}
            <div className="bg-white/40 backdrop-blur-lg border border-white/60 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(26,92,82,0.05)] transition-transform hover:-translate-y-1">
              <div className="flex justify-between items-start text-sm text-[#1A5C52]/70 font-medium mb-4">
                <span>CA Aujourd'hui</span>
                <span className="w-8 h-8 rounded-full bg-[#1A5C52]/5 flex items-center justify-center text-[#1A5C52]">€</span>
              </div>
              <div className="text-3xl text-[#1A5C52] font-bold mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>0,00€</div>
              <div className="text-xs text-[#1A5C52]/60 font-medium">0,00 € cette semaine</div>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white/40 backdrop-blur-lg border border-white/60 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(26,92,82,0.05)] transition-transform hover:-translate-y-1">
              <div className="flex justify-between items-start text-sm text-[#1A5C52]/70 font-medium mb-4">
                <span>CA Global</span>
                <span className="w-8 h-8 rounded-full bg-[#1A5C52]/5 flex items-center justify-center text-[#1A5C52]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </span>
              </div>
              <div className="text-3xl text-[#1A5C52] font-bold mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>0,00€</div>
              <div className="text-xs text-[#1A5C52]/60 font-medium">Total : 99,30 €</div>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white/40 backdrop-blur-lg border border-white/60 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(26,92,82,0.05)] transition-transform hover:-translate-y-1">
              <div className="flex justify-between items-start text-sm text-[#1A5C52]/70 font-medium mb-4">
                <span>En cours</span>
                <span className="w-8 h-8 rounded-full bg-[#1A5C52]/5 flex items-center justify-center text-[#1A5C52]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
              </div>
              <div className="text-3xl text-[#1A5C52] font-bold mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>0</div>
              <div className="text-xs text-[#1A5C52]/60 font-medium">7 ventes totales</div>
            </div>
            
            {/* Card 4 */}
            <div className="bg-white/40 backdrop-blur-lg border border-white/60 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(26,92,82,0.05)] transition-transform hover:-translate-y-1">
              <div className="flex justify-between items-start text-sm text-[#1A5C52]/70 font-medium mb-4">
                <span>Taux de livraison</span>
                <span className="w-8 h-8 rounded-full bg-[#1A5C52]/5 flex items-center justify-center text-[#1A5C52]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </span>
              </div>
              <div className="text-3xl text-[#1A5C52] font-bold mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>87,5%</div>
              <div className="text-xs text-red-500 font-medium">1 erreur(s) technique(s)</div>
            </div>

          </div>

          {/* Recent Orders Table */}
          <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(26,92,82,0.05)]">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-[#1A5C52] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Commandes récentes</h2>
                <p className="text-sm text-[#1A5C52]/70 font-medium">Consultez et gérez les dernières transactions effectuées sur votre boutique en temps réel.</p>
              </div>
              <button className="px-5 py-2.5 bg-[#1A5C52] text-white rounded-xl text-sm font-medium hover:bg-[#14473e] transition-colors shadow-lg shadow-[#1A5C52]/20">
                Voir tout
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-[11px] text-[#1A5C52]/50 uppercase font-bold tracking-wider border-b border-white/50">
                  <tr>
                    <th className="pb-4 px-4">#</th>
                    <th className="pb-4 px-4">Date</th>
                    <th className="pb-4 px-4">Client</th>
                    <th className="pb-4 px-4">Formule</th>
                    <th className="pb-4 px-4">Montant</th>
                    <th className="pb-4 px-4 text-right">Statut</th>
                  </tr>
                </thead>
                <tbody className="text-[#1A5C52]/80 font-medium">
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="border-b border-white/30 hover:bg-white/30 transition-colors">
                      <td className="py-5 px-4 font-bold text-[#1A5C52]">{order.id}</td>
                      <td className="py-5 px-4">
                        <div className="text-[#1A5C52] font-semibold mb-0.5">{order.date}</div>
                        <div className="text-xs text-[#1A5C52]/60">{order.time}</div>
                      </td>
                      <td className="py-5 px-4">{order.client}</td>
                      <td className="py-5 px-4">
                        <span className="inline-block px-3 py-1 bg-green-100/50 text-[#1A5C52] border border-green-200/50 rounded-lg text-xs font-bold shadow-sm backdrop-blur-sm">
                          {order.plan}
                        </span>
                      </td>
                      <td className="py-5 px-4 text-[#1A5C52] font-bold">{order.amount}</td>
                      <td className="py-5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5 text-[#B8962E] font-semibold bg-[#B8962E]/10 px-3 py-1 rounded-lg border border-[#B8962E]/20 backdrop-blur-sm">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {order.status}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}
