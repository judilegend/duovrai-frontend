import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="bg-[#1A5C52] pt-14 pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.jpg" alt="Duovrai" className="h-12 w-auto " />
            </div>
            <p className="text-white/60 text-[14px] leading-relaxed max-w-xs" style={{ fontFamily: "'Inter', Calibri, sans-serif" }}>
              Votre analyse de compatibilité amoureuse propulsée par l'intelligence artificielle. Découvrez ce que les astres révèlent de votre couple.
            </p>
          </div>

          {/* Liens */}
          <div>
            <h4
              className="text-[12px] mb-4"
              style={{
                fontFamily: "'Montserrat', Arial, sans-serif",
                fontWeight: 300,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "#B8962E",
              }}
            >
              Liens utiles
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "#features", label: "Comment ça marche" },
                { href: "#pricing", label: "Nos offres" },
                { href: "/contact", label: "Nous contacter" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-[14px]"
                    style={{ fontFamily: "'Inter', Calibri, sans-serif" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h4
              className="text-[12px] mb-4"
              style={{
                fontFamily: "'Montserrat', Arial, sans-serif",
                fontWeight: 300,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "#B8962E",
              }}
            >
              Légal
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/mentions-legales", label: "Mentions légales" },
                { href: "/confidentialite", label: "Politique de confidentialité" },
                { href: "/cgv", label: "CGV" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/60 hover:text-white transition-colors text-[14px]"
                    style={{ fontFamily: "'Inter', Calibri, sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div
          className="pt-6 border-t border-white/10 text-center text-white/40 text-[13px]"
          style={{ fontFamily: "'Inter', Calibri, sans-serif" }}
        >
          &copy; {new Date().getFullYear()} Duovrai — JVN Lab. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
