import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function HeaderSection({
    navLinks,
}: {
    navLinks: { label: string; href: string }[];
}) {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-[#E8F2F0] shadow-sm' : 'bg-transparent'}`}
        >
            <div className="mx-auto max-w-6xl px-6">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <a href="/" className="flex items-center shrink-0">
                        <img
                            src="/logo.jpg"
                            alt="Duovrai — Découvrez l'alchimie de votre relation"
                            className="h-[70px]"
                        />
                    </a>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className={`text-sm transition-colors duration-300 tracking-wide duovrai-nav ${location.hash === link.href ? 'text-[#1A5C52]' : 'text-[#555555] hover:text-[#1A5C52]'}`}
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="#formulaire"
                            className="px-4 py-2.5 rounded-sm text-sm bg-[#1A5C52] hover:bg-[#1A5C52]/90 text-white font-medium cursor-pointer transition-all duovrai-btn"
                        >
                            Commencer l'analyse
                        </a>
                    </div>

                    {/* Mobile controls */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="flex items-center justify-center text-[#1A5C52] p-2"
                            aria-label="Menu"
                        >
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-[#E8F2F0] transition-all">
                    <div className="px-6 py-6 space-y-1">
                        {navLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className={`block py-3 text-base transition-colors duovrai-nav ${location.hash === link.href ? 'text-[#1A5C52]' : 'text-[#555555] hover:text-[#1A5C52]'}`}
                                onClick={() => setMobileOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="#formulaire"
                            className="block mt-4 px-4 py-3 rounded-sm text-sm bg-[#1A5C52] text-white font-medium text-center transition-all duovrai-btn"
                            onClick={() => setMobileOpen(false)}
                        >
                            Commencer l'analyse
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
