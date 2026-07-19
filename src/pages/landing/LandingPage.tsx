import ContentSection from '@/components/landing/ContentSection';
import FAQSection from '@/components/landing/FAQSection';
import Footer from '@/components/landing/Footer';
import HeaderSection from '@/components/landing/Header';
import HeroSection from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import OrderForm from '@/components/landing/OrderForm';
import PlanSection from '@/components/landing/Plan';
import ReportPreview from '@/components/landing/ReportPreview';

const navLinks = [
    { label: 'Accueil', href: '#hero' },
    { label: 'Contenu', href: '#contenu' },
    { label: 'Processus', href: '#processus' },
    { label: 'Commander', href: '#commander' },
];

export default function LandingPage() {
    return (
        <main className="relative min-h-screen bg-white overflow-x-hidden">
            <HeaderSection navLinks={navLinks} />
            <HeroSection />

            <div className="mx-auto max-w-5xl px-6">
                <div className="h-px bg-[rgba(26,92,82,0.06)]" />
            </div>

            <ContentSection />

            <div className="mx-auto max-w-5xl px-4">
                <div className="h-px bg-linear-to-r from-transparent via-[#1A5C52]/8 to-transparent" />
            </div>

            <HowItWorks />

            <div className="mx-auto max-w-5xl px-6">
                <div className="h-px bg-[rgba(26,92,82,0.06)]" />
            </div>

            <ReportPreview />

            <div className="mx-auto max-w-5xl px-6">
                <div className="h-px bg-[rgba(26,92,82,0.06)]" />
            </div>

            <PlanSection />

            <OrderForm />

            <div className="mx-auto max-w-5xl px-6">
                <div className="h-px bg-[rgba(26,92,82,0.06)]" />
            </div>

            <FAQSection />

            <Footer />
        </main>
    );
}
