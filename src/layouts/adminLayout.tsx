import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import ScrollToTop from '@/components/ScrollToTop';

const ADMIN_DASHBOARD_PATH = '/admin/dashboard';
const LOGIN_PATH = '/admin/login';

export default function AdminLayout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const navLinks = [
        {
            name: 'Tableau de bord',
            path: ADMIN_DASHBOARD_PATH,
            icon: LayoutDashboard,
        },
    ];

    const isActive = (path: string) => location.pathname === path;

    const { logout } = useAdminAuth();

    const handleLogout = () => {
        logout();
        navigate(LOGIN_PATH, { replace: true });
    };

    return (
        <main className="relative min-h-screen w-full bg-[#F9F3E3]">
            <ScrollToTop />
            {/* Navbar */}
            <header className="w-full sticky top-0 bg-white/90 backdrop-blur-md border-b border-[#E8F2F0] shadow-sm transition-colors duration-300 z-50">
                <div className="max-w-7xl mx-auto h-[72px] px-4 sm:px-6 flex items-center justify-between">
                    {/* Logo & Brand */}
                    <div className="flex items-center gap-3 group shrink-0">
                        <img src="/logo.jpg" alt="Duovrai" className="h-12 w-auto" />
                        <span className="text-[10px] uppercase tracking-widest text-[#B8962E] font-bold">
                            Admin
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`
                                flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                                ${
                                    isActive(link.path)
                                        ? 'bg-[#1A5C52]/10 text-[#1A5C52]'
                                        : 'text-[#555555] hover:text-[#1A5C52] hover:bg-[#E8F2F0]'
                                }
                            `}
                            >
                                <link.icon size={16} />
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="relative flex items-center gap-2 sm:gap-4">
                        <button
                            onClick={handleLogout}
                            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-red-500/80 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer group"
                        >
                            <LogOut
                                size={16}
                                className="group-hover:-translate-x-1 transition-transform"
                            />
                            <span>Déconnexion</span>
                        </button>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-[#555555] hover:text-[#1A5C52] hover:bg-[#E8F2F0] rounded-lg transition-colors"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                <div
                    className={`absolute top-[72px] left-0 w-full bg-white border-b border-[#E8F2F0] md:hidden transition-all duration-300 ease-in-out overflow-hidden shadow-xl ${
                        isMenuOpen
                            ? 'max-h-96 opacity-100'
                            : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                >
                    <nav className="flex flex-col p-4 gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`
                                flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors
                                ${
                                    isActive(link.path)
                                        ? 'bg-[#1A5C52]/10 text-[#1A5C52]'
                                        : 'text-[#555555] hover:bg-[#E8F2F0]'
                                }
                            `}
                            >
                                <link.icon size={20} />
                                {link.name}
                            </Link>
                        ))}
                        <div className="h-px bg-[#E8F2F0] my-2" />
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-red-500/80 hover:bg-red-50 transition-colors"
                        >
                            <LogOut size={20} />
                            Déconnexion
                        </button>
                    </nav>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-5 py-8">
                <Outlet />
            </div>
        </main>
    );
}
