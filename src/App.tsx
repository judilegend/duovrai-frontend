import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { Features } from "./components/Features"
import { ReportPreview } from "./components/ReportPreview"
import { Pricing } from "./components/Pricing"
import { FormulaireSaisie } from "./components/FormulaireSaisie"
import { Footer } from "./components/Footer"

function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <ReportPreview />
      <Pricing />
      <FormulaireSaisie />
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
