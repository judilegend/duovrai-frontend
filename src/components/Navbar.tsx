import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "#features", label: "Comment ça marche" },
  { href: "#pricing", label: "Nos offres" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full overflow-hidden sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-[#E8F2F0] shadow-[0_1px_3px_rgba(26,92,82,0.06)]">
      <div className=" max-w-[1200px] mx-auto px-4 sm:px-6 h-[80px] flex items-center justify-between">
        {/* Logo — zone de protection respectée */}
        <Link to="/" className="flex items-center shrink-0">
          <img
            src="/logo.jpg"
            alt="Duovrai — Découvrez l'alchimie de votre relation"
            className="h-[120px]"
          />
        </Link>

        {/* Navigation Desktop — Montserrat Medium */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Navigation principale"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="duovrai-nav text-[#555555] hover:text-[#1A5C52] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Button className="duovrai-btn bg-[#1A5C52] text-white hover:bg-[#1A5C52]/90 shadow-sm">
            <a href="#formulaire">Commencer</a>
          </Button>
        </div>

        {/* Hamburger Mobile */}
        <button
          type="button"
          className="md:hidden p-2 text-[#1A5C52]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#E8F2F0] pb-4">
          <nav
            className="flex flex-col px-6 pt-2 gap-1"
            aria-label="Navigation mobile"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="duovrai-nav text-[#555555] hover:text-[#1A5C52] py-3 border-b border-[#E8F2F0] last:border-0 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="px-6 pt-4 flex flex-col gap-2">
            <Button className="duovrai-btn w-full bg-[#1A5C52] text-white hover:bg-[#1A5C52]/90">
              <a href="#formulaire">Commencer</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
