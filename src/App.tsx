import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { ReportPreview } from "./components/ReportPreview";
import { Pricing } from "./components/Pricing";
import { FormulaireSaisie } from "./components/FormulaireSaisie";
import { Footer } from "./components/Footer";
import { Success } from "./pages/Success";
import { Cancel } from "./pages/Cancel";
import { AdminDashboard } from "./pages/AdminDashboard";
import { PricingPage } from "./pages/PricingPage";
import { ConfirmationPage } from "./pages/ConfirmationPage";

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
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/success" element={<Success />} />
          <Route path="/retry" element={<Cancel />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/pricing-page" element={<PricingPage />} />
          <Route path="/confirm" element={<ConfirmationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
