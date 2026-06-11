import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { ReportPreview } from "./components/ReportPreview";
import { Pricing } from "./components/Pricing";
import { FormulaireSaisie } from "./components/FormulaireSaisie";
import { Footer } from "./components/Footer";
import { Checkout } from "./pages/Checkout";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminLogin } from "./pages/AdminLogin";
import { PricingPage } from "./pages/PricingPage";
import { Success } from "./pages/Success";
import ConfirmationPage from "./pages/ConfirmationPage";
import GenerationPage from "./pages/GenerationPage";
import { NotFound } from "./pages/NotFound";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { ScrollToTopButton } from "./components/ui/ScrollToTopButton";

function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <ReportPreview />
        <Pricing />
        <FormulaireSaisie />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AdminAuthProvider>
      <Router>
        <div className="min-h-screen bg-white flex flex-col">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route
              path="/admin"
              element={<Navigate to="/admin/login" replace />}
            />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/pricing-page" element={<PricingPage />} />
            <Route path="/confirm" element={<ConfirmationPage />} />
            <Route path="/generation" element={<GenerationPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ScrollToTopButton />
        </div>
      </Router>
    </AdminAuthProvider>
  );
}

export default App;
